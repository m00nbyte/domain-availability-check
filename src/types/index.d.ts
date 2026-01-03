// src/types/index.d.ts

// check
export interface CheckBatchPayload {
    domains: string[];
    batchSize?: number;
    sessionId?: string;
    isFirstBatch?: boolean;
    isLastBatch?: boolean;
    keyword?: string;
    tldOption?: string;
    selectedCategories?: string[];
}

export interface DomainResult {
    domain: string;
    available: boolean;
    status: 'available' | 'unavailable' | 'checking' | 'error';
    message?: string;
}

export interface ProgressState {
    current: number;
    total: number;
}

export interface Stats {
    available: number;
    unavailable: number;
    total: number;
}

// session
export interface SessionData {
    results: DomainResult[];
    totalChecked: number;
    availableCount: number;
    unavailableCount: number;
    startTime: number;
    keyword: string;
    batchSize: number;
    tldOption?: string;
}

export interface SessionInitData {
    keyword: string;
    batchSize: number;
    tldOption?: string;
    startTime: number;
}

// analyze
export interface AnalysisResult<T> {
    success: boolean;
    data: T | null;
    error?: string;
}

export interface AnalysisData {
    keyword: string;
    totalChecked: number;
    availableCount: number;
    unavailableCount: number;
    processingTime?: number;
    batchSize?: number;
    tldOption?: string;
}

export interface AnalysisItem {
    _id: string;
    host: string;
    createdAt: string;
    processingTime?: number;
}

// stats
export interface TimeSeriesData {
    date: string;
    count: number;
}

export interface RecentHost {
    host: string;
    lastAnalysisDate: string;
    count: number;
}

export interface StatsSummary {
    totalChecks: number;
    todayCount: number;
    yesterdayCount: number;
    dailyAverage: number;
    peakDay: {
        date: string;
        count: number;
    };
    weeklyGrowth: number;
}
