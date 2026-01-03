// src/app/api/check/route.ts

import dns from 'dns/promises';
import { NextRequest, NextResponse } from 'next/server';

import { saveAnalysisResult } from '@/utils/analysis-storage';
import { addBatchResults, completeSession, initSession } from '@/utils/session-storage';

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) => {
            setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
        })
    ]);
};

async function checkDomainHasRecords(domain: string): Promise<boolean> {
    const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'];
    const TIMEOUT_MS = 1000;

    for (const type of recordTypes) {
        try {
            let hasValidRecords = false;

            switch (type) {
                case 'A': {
                    const records = await withTimeout(dns.resolve4(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'AAAA': {
                    const records = await withTimeout(dns.resolve6(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'MX': {
                    const records = await withTimeout(dns.resolveMx(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'TXT': {
                    const records = await withTimeout(dns.resolveTxt(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'NS': {
                    const records = await withTimeout(dns.resolveNs(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'CNAME': {
                    const records = await withTimeout(dns.resolveCname(domain), TIMEOUT_MS);
                    hasValidRecords = Array.isArray(records) && records.length > 0;
                    break;
                }
                case 'SOA': {
                    const record = await withTimeout(dns.resolveSoa(domain), TIMEOUT_MS);
                    hasValidRecords = record !== null && typeof record === 'object' && 'nsname' in record;
                    break;
                }
            }

            if (hasValidRecords) {
                return true;
            }
        } catch (error: unknown) {
            const message = (error as { message?: string }).message;

            if (message && message.includes('Timeout')) {
                continue;
            }
        }
    }

    return false;
}

async function checkMultipleDomains(domains: string[], batchSize: number = 20): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};

    for (let i = 0; i < domains.length; i += batchSize) {
        const batch = domains.slice(i, i + batchSize);
        const batchPromises = batch.map(async (domain) => {
            try {
                const cleanDomain = domain.replace(/^www\./, '');
                const hasRecords = await checkDomainHasRecords(cleanDomain);

                return {
                    domain,
                    result: {
                        available: !hasRecords,
                        status: hasRecords ? 'unavailable' : 'available',
                        message: hasRecords ? 'Domain is registered' : 'No DNS records found'
                    }
                };
            } catch (error: unknown) {
                const { code } = error as { code: string };

                return {
                    domain,
                    result: {
                        available: true,
                        status: 'available',
                        message: code === 'ENOTFOUND' ? 'No DNS records found' : `DNS error (${code})`
                    }
                };
            }
        });

        const batchResults = await Promise.all(batchPromises);
        batchResults.forEach(({ domain, result }) => {
            results[domain] = result;
        });
    }

    return results;
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const { domains, sessionId, isFirstBatch = false, isLastBatch = false, keyword, tldOption } = await request.json();

        const batchSizeHeader = request.headers.get('X-Batch-Size');
        const batchSize = batchSizeHeader ? parseInt(batchSizeHeader, 10) : 20;

        const safeBatchSize = Math.min(Math.max(batchSize, 10), 100);

        if (!domains || !Array.isArray(domains) || domains.length === 0) {
            return NextResponse.json({ error: 'Domains array required' }, { status: 400 });
        }

        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

        const validatedDomains = domains.map((domain) => {
            const cleanDomain = domain.replace(/^www\./, '');
            if (!domainRegex.test(cleanDomain)) {
                return {
                    domain,
                    result: {
                        available: true,
                        status: 'available',
                        message: 'Invalid format'
                    }
                };
            }
            return cleanDomain;
        });

        const validDomains = validatedDomains.filter((domain) => typeof domain === 'string');
        const invalidResults = validatedDomains
            .filter((item) => typeof item !== 'string')
            .reduce((acc, item: { domain: string; result: unknown }) => {
                acc[item.domain] = item.result;
                return acc;
            }, {} as Record<string, unknown>);

        const validResults = validDomains.length > 0 ? await checkMultipleDomains(validDomains, safeBatchSize) : {};
        const results = { ...invalidResults, ...validResults };

        const batchProcessingTime = Date.now() - startTime;

        const resultsArray = [];

        for (const domain of validDomains) {
            const result = results[domain];
            if (result && typeof result === 'object') {
                resultsArray.push({
                    domain,
                    available: result.available,
                    status: result.status,
                    message: result.message
                });
            }
        }

        for (const domain of Object.keys(invalidResults)) {
            const result = invalidResults[domain];
            if (result && typeof result === 'object') {
                resultsArray.push({
                    domain,
                    available: result.available,
                    status: result.status,
                    message: result.message
                });
            }
        }

        let sessionData = null;
        let savedAnalysisId = null;

        if (sessionId) {
            if (isFirstBatch) {
                initSession(sessionId, {
                    keyword: keyword || (validDomains.length > 0 ? validDomains[0].split('.')[0] : domains[0].split('.')[0]),
                    batchSize: safeBatchSize,
                    tldOption,
                    startTime
                });
            }

            const session = addBatchResults(sessionId, resultsArray);

            if (isLastBatch && session) {
                const completedSession = completeSession(sessionId);
                if (completedSession) {
                    const totalProcessingTime = Date.now() - completedSession.startTime;

                    try {
                        savedAnalysisId = await saveAnalysisResult({
                            keyword: completedSession.keyword.toLowerCase(),
                            totalChecked: completedSession.totalChecked,
                            availableCount: completedSession.availableCount,
                            unavailableCount: completedSession.unavailableCount,
                            processingTime: totalProcessingTime,
                            batchSize: completedSession.batchSize,
                            tldOption: completedSession.tldOption
                        });
                    } catch (dbError) {
                        console.error('Database save error:', dbError);
                    }
                }
            } else if (session) {
                sessionData = {
                    sessionId,
                    progress: {
                        current: session.totalChecked,
                        available: session.availableCount,
                        unavailable: session.unavailableCount
                    }
                };
            }
        }

        const batchAvailableCount = resultsArray.filter((r) => r.available === true || r.status === 'available').length;
        const batchUnavailableCount = resultsArray.filter((r) => r.available === false || r.status === 'unavailable').length;

        return NextResponse.json({
            results,
            batchSize: safeBatchSize,
            timestamp: new Date().toISOString(),
            analysisId: savedAnalysisId,
            session: sessionData,
            processingTime: batchProcessingTime,
            stats: {
                total: resultsArray.length,
                available: batchAvailableCount,
                unavailable: batchUnavailableCount
            }
        });
    } catch (error: unknown) {
        const message = (error as Error).message;

        return NextResponse.json(
            {
                error: message,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}
