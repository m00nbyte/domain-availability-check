// src/app/page.tsx

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DomainChecker from '@/components/DomainChecker';
import ProgressSection from '@/components/sections/ProgressSection';
import ResultsSection from '@/components/sections/ResultsSection';
import StatsSection from '@/components/sections/StatsSection';
import TldSelection, { TLDListType } from '@/components/sections/TldSelection';
import ServiceInfo from '@/components/ServiceInfo';
import { CheckBatchPayload, DomainResult, ProgressState } from '@/types';
import { ALL_TLDS, COMMON_TLDS, COUNTRY_TLDS, NEW_TLDS, TLD_CATEGORIES } from '@/utils/tlds';

export default function Home() {
    const abortControllerRef = useRef<AbortController | null>(null);
    const isMountedRef = useRef(true);
    const shouldStopRef = useRef(false);
    const cleanupRef = useRef(false);

    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<DomainResult[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [progress, setProgress] = useState<ProgressState>({ current: 0, total: 0 });
    const [filter, setFilter] = useState<'all' | 'available' | 'unavailable'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [hasCompletedCheck, setHasCompletedCheck] = useState(false);
    const [tldOption, setTldOption] = useState<TLDListType>('popular');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['GENERIC', 'MODERN_TECH']);

    const popularTlds = useMemo(() => {
        const allTlds = new Set<string>();

        TLD_CATEGORIES.GENERIC.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.NORTH_AMERICA.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.SOUTH_AMERICA.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.EUROPE.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.ASIA_PACIFIC.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.AFRICA.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.CITIES.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.TECHNOLOGY.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.BUSINESS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.FINANCE.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.LEGAL.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.MEDICAL.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.EDUCATION.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.ENTERTAINMENT.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.SPORTS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.FOOD_DRINK.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.TRAVEL.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.FASHION_BEAUTY.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.CREATIVE_ARTS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.REAL_ESTATE.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.AUTOMOTIVE.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.RETAIL_E_COMMERCE.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.TECH_BRANDS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.AUTO_BRANDS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.FASHION_BRANDS.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.MODERN_TECH.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.COMMUNITY.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.PERSONAL.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.GOVERNMENT.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.NONPROFIT.forEach((tld) => allTlds.add(tld));
        TLD_CATEGORIES.ADULT.forEach((tld) => allTlds.add(tld));

        return Array.from(allTlds);
    }, []);

    const getCustomTlds = useCallback(() => {
        const tlds = new Set<string>();
        selectedCategories.forEach((category) => {
            if (TLD_CATEGORIES[category as keyof typeof TLD_CATEGORIES]) {
                TLD_CATEGORIES[category as keyof typeof TLD_CATEGORIES].forEach((tld) => tlds.add(tld));
            }
        });
        return Array.from(tlds);
    }, [selectedCategories]);

    const getCurrentTlds = useCallback(() => {
        switch (tldOption) {
            case 'popular':
                return popularTlds;
            case 'common':
                return COMMON_TLDS;
            case 'country':
                return COUNTRY_TLDS;
            case 'new':
                return NEW_TLDS;
            case 'all':
                return ALL_TLDS;
            case 'custom':
                return getCustomTlds();
            default:
                return popularTlds;
        }
    }, [tldOption, popularTlds, getCustomTlds]);

    const getCurrentTldsWithCount = useCallback(() => {
        const tlds = getCurrentTlds();
        return {
            tlds,
            count: tlds.length
        };
    }, [getCurrentTlds]);

    const getBatchSize = useCallback((totalTlds: number) => {
        if (totalTlds <= 100) {
            return 10;
        } else if (totalTlds <= 600) {
            return 20;
        } else {
            return 50;
        }
    }, []);

    const checkDomainsBatchAPI = useCallback(
        async (
            domains: string[],
            batchSize: number,
            sessionId?: string,
            isFirstBatch?: boolean,
            isLastBatch?: boolean,
            keyword?: string,
            tldOption?: string,
            selectedCategories?: string[]
        ): Promise<Record<string, DomainResult>> => {
            try {
                const abortController = new AbortController();
                abortControllerRef.current = abortController;

                const payload: CheckBatchPayload = {
                    domains,
                    batchSize
                };

                if (sessionId) {
                    payload.sessionId = sessionId;
                    payload.isFirstBatch = isFirstBatch;
                    payload.isLastBatch = isLastBatch;
                    payload.keyword = keyword;
                    payload.tldOption = tldOption;
                    payload.selectedCategories = selectedCategories;
                }

                const response = await fetch('/api/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Batch-Size': batchSize.toString()
                    },
                    body: JSON.stringify(payload),
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();

                const results: Record<string, DomainResult> = {};
                for (const [domain, info] of Object.entries(data.results)) {
                    const result = info as {
                        domain: string;
                        available: boolean;
                        status: 'available' | 'unavailable' | 'checking' | 'error';
                        message: string;
                    };
                    results[domain] = {
                        domain,
                        available: result.available,
                        status: result.status,
                        message: result.message
                    };
                }

                return results;
            } catch (error: unknown) {
                const name = (error as { name: string }).name;

                if (name === 'AbortError') {
                    console.log('Request was aborted');
                    throw new Error('Check cancelled');
                }

                const fallbackResults: Record<string, DomainResult> = {};
                domains.forEach((domain) => {
                    fallbackResults[domain] = {
                        domain,
                        available: true,
                        status: 'available',
                        message: 'DNS error - assuming available'
                    };
                });
                return fallbackResults;
            }
        },
        []
    );

    const stopCheck = useCallback(() => {
        console.log('stopCheck called, abortControllerRef:', abortControllerRef.current);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        shouldStopRef.current = true;
        setIsChecking(false);
    }, []);

    const clearResults = useCallback(() => {
        console.log('clearResults called');
        stopCheck();
        setDomain('');
        setResults([]);
        setProgress({ current: 0, total: 0 });
        setFilter('all');
        setSearchTerm('');
        setHasCompletedCheck(false);
        shouldStopRef.current = false;
    }, [stopCheck]);

    const checkAllDomains = useCallback(async () => {
        console.log('checkAllDomains called');

        if (!domain.trim()) {
            alert('Please enter a domain name');
            return;
        }

        shouldStopRef.current = false;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        setIsChecking(true);
        setHasCompletedCheck(false);
        setResults([]);
        setProgress({ current: 0, total: 0 });

        const cleanDomain = domain
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9-]/g, '');

        if (!cleanDomain) {
            alert('Please enter a valid domain name');
            setIsChecking(false);
            abortControllerRef.current = null;
            return;
        }

        const { tlds: currentTlds, count: tldCount } = getCurrentTldsWithCount();

        if (tldCount === 0) {
            alert('Please select at least one TLD category');
            setIsChecking(false);
            abortControllerRef.current = null;
            return;
        }

        const dynamicBatchSize = getBatchSize(tldCount);
        console.log(`Checking ${tldCount} TLDs with batch size: ${dynamicBatchSize}`);

        const sessionId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);

        const initialResults: DomainResult[] = currentTlds.map((tld) => ({
            domain: `${cleanDomain}.${tld}`,
            available: false,
            status: 'checking' as const,
            message: 'Checking...'
        }));

        setResults(initialResults);
        setProgress({ current: 0, total: tldCount });

        try {
            for (let i = 0; i < currentTlds.length; i += dynamicBatchSize) {
                if (shouldStopRef.current || !isMountedRef.current || cleanupRef.current) {
                    console.log('Stopping check');
                    break;
                }

                const batchTLDs = currentTlds.slice(i, i + dynamicBatchSize);
                const batchDomains = batchTLDs.map((tld) => `${cleanDomain}.${tld}`);

                try {
                    const isFirstBatch = i === 0;
                    const isLastBatch = i + dynamicBatchSize >= currentTlds.length;

                    const batchResults = await checkDomainsBatchAPI(
                        batchDomains,
                        dynamicBatchSize,
                        sessionId,
                        isFirstBatch,
                        isLastBatch,
                        cleanDomain,
                        tldOption
                    );

                    if (!isMountedRef.current || cleanupRef.current) {
                        console.log('Component unmounted during check');
                        break;
                    }

                    setResults((prev) => {
                        const newResults = [...prev];
                        Object.values(batchResults).forEach((result) => {
                            const index = newResults.findIndex((r) => r.domain === result.domain);
                            if (index !== -1) {
                                newResults[index] = result;
                            }
                        });
                        return newResults;
                    });

                    const current = Math.min(i + dynamicBatchSize, currentTlds.length);
                    setProgress({ current, total: currentTlds.length });

                    if (current < currentTlds.length) {
                        await new Promise((resolve) => setTimeout(resolve, 50));
                    }
                } catch (error: unknown) {
                    const message = (error as { message: string }).message;

                    if (message === 'Check cancelled') {
                        console.log('Check cancelled');
                        break;
                    }

                    console.error('Error checking batch:', error);

                    setResults((prev) => {
                        const newResults = [...prev];
                        batchDomains.forEach((domain) => {
                            const index = newResults.findIndex((r) => r.domain === domain);
                            if (index !== -1) {
                                newResults[index] = {
                                    domain,
                                    available: true,
                                    status: 'available',
                                    message: 'DNS error - assuming available'
                                };
                            }
                        });
                        return newResults;
                    });

                    const current = Math.min(i + dynamicBatchSize, currentTlds.length);
                    setProgress({ current, total: currentTlds.length });

                    if (current < currentTlds.length) {
                        await new Promise((resolve) => setTimeout(resolve, 50));
                    }
                }
            }

            if (!shouldStopRef.current && isMountedRef.current && !cleanupRef.current) {
                setProgress({ current: currentTlds.length, total: currentTlds.length });
                setHasCompletedCheck(true);
            }
        } catch (error) {
            console.error('Error in checkAllDomains:', error);
        } finally {
            console.log('Finally block');
            if (isMountedRef.current && !cleanupRef.current) {
                setIsChecking(false);
            }
            abortControllerRef.current = null;
        }
    }, [domain, getCurrentTldsWithCount, getBatchSize, checkDomainsBatchAPI, tldOption]);

    const filteredResults = results.filter((result) => {
        if (filter === 'available' && result.status !== 'available') return false;
        if (filter === 'unavailable' && result.status !== 'unavailable') return false;
        if (searchTerm && !result.domain.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const showInputForm = !hasCompletedCheck && !isChecking && results.length === 0;
    const showResults = hasCompletedCheck || results.length > 0;

    useEffect(() => {
        console.log('Component mounted, resetting refs');

        isMountedRef.current = true;
        shouldStopRef.current = false;
        cleanupRef.current = false;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        return () => {
            console.log('Component unmounting, setting cleanup flag');
            cleanupRef.current = true;
            isMountedRef.current = false;
            shouldStopRef.current = true;

            if (abortControllerRef.current) {
                console.log('Aborting controller on unmount');
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="container mx-auto bg-stone-900 text-white p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <header className="text-left mb-8">
                    <div className="flex items-center gap-3 mb-2 cursor-pointer" onClick={clearResults}>
                        <span className="icon-[icon-park-outline--earth] text-3xl text-emerald-500"></span>
                        <h1 className="text-3xl font-bold">Domain Availability Checker</h1>
                    </div>
                    <p className="text-stone-400">Instantly check multiple TLDs for your perfect domain name</p>
                </header>

                {showInputForm && (
                    <div className="bg-stone-800 border border-stone-700 rounded-lg p-6 sm:p-8 shadow-xl">
                        <TldSelection
                            tldOption={tldOption}
                            getCustomTlds={getCustomTlds}
                            setTldOption={setTldOption}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            isChecking={isChecking}
                            popularTlds={popularTlds}
                        />

                        <DomainChecker
                            domain={domain}
                            setDomain={setDomain}
                            checkAllDomains={checkAllDomains}
                            isChecking={isChecking}
                        />
                    </div>
                )}

                {isChecking && <ProgressSection progress={progress} onStop={stopCheck} />}

                {showResults && !isChecking && (
                    <div className="flex mb-6">
                        <button
                            onClick={clearResults}
                            className="group px-6 py-3 bg-gradient-to-r from-stone-800 to-stone-900 text-stone-300 font-medium rounded-xl hover:from-stone-700 hover:to-stone-800 transition-all shadow-lg hover:shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer border border-stone-700 hover:border-stone-600"
                        >
                            <span className="icon-[icon-park-outline--clear] w-5 h-5 text-emerald-400"></span>
                            Clear & Start Over
                        </button>
                    </div>
                )}

                {showResults && results.length > 0 && (
                    <StatsSection
                        totalStats={{
                            available: results.filter((r) => r.status === 'available').length,
                            unavailable: results.filter((r) => r.status === 'unavailable').length,
                            total: results.length
                        }}
                    />
                )}

                {showResults && (
                    <ResultsSection
                        results={filteredResults}
                        allResults={results}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filter={filter}
                        setFilter={setFilter}
                    />
                )}

                {!showResults && <ServiceInfo />}
            </div>
        </div>
    );
}
