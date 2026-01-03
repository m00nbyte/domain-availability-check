// src/utils/session-storage.ts

import { DomainResult, SessionData, SessionInitData } from '@/types';

const sessionResults = new Map<string, SessionData>();

export function initSession(sessionId: string, data: SessionInitData): void {
    sessionResults.set(sessionId, {
        results: [],
        totalChecked: 0,
        availableCount: 0,
        unavailableCount: 0,
        startTime: data.startTime,
        keyword: data.keyword,
        batchSize: data.batchSize,
        tldOption: data.tldOption
    });

    setTimeout(() => {
        sessionResults.delete(sessionId);
    }, 10 * 60 * 1000);
}

export function addBatchResults(sessionId: string, batchResults: DomainResult[]): SessionData | null {
    const session = sessionResults.get(sessionId);
    if (!session) return null;

    const validBatchResults = batchResults.filter(
        (result) => result && result.domain && typeof result.available === 'boolean' && result.status
    );

    session.results.push(...validBatchResults);
    session.totalChecked += validBatchResults.length;

    validBatchResults.forEach((result) => {
        if (result.available === true || result.status === 'available') {
            session.availableCount++;
        } else if (result.available === false || result.status === 'unavailable') {
            session.unavailableCount++;
        }
    });

    return session;
}

export function getSession(sessionId: string): SessionData | undefined {
    return sessionResults.get(sessionId);
}

export function completeSession(sessionId: string): SessionData | null {
    const session = sessionResults.get(sessionId);
    if (!session) return null;

    const finalSession = { ...session };
    sessionResults.delete(sessionId);
    return finalSession;
}

export function cleanupExpiredSessions(): void {
    const now = Date.now();
    const maxAge = 10 * 60 * 1000;

    for (const [sessionId, session] of sessionResults.entries()) {
        if (now - session.startTime > maxAge) {
            sessionResults.delete(sessionId);
        }
    }
}

export function getActiveSessions(): Array<{ sessionId: string; data: SessionData }> {
    return Array.from(sessionResults.entries()).map(([sessionId, data]) => ({
        sessionId,
        data
    }));
}
