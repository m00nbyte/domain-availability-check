// src/utils/analysis-storage.ts

import dbConnect from '@/libs/mongodb';
import AnalysisResult from '@/models/AnalysisResult';
import { AnalysisData } from '@/types';

export async function saveAnalysisResult(data: AnalysisData): Promise<string> {
    try {
        await dbConnect();

        const saveData = {
            keyword: data.keyword,
            totalChecked: data.totalChecked,
            availableCount: data.availableCount,
            unavailableCount: data.unavailableCount,
            processingTime: data.processingTime,
            batchSize: data.batchSize,
            tldOption: data.tldOption
        };

        const analysis = new AnalysisResult(saveData);
        await analysis.save();

        return analysis._id.toString();
    } catch (error) {
        console.error('Error saving analysis result:', error);
        throw error;
    }
}

export async function getAnalysisTimeSeriesData(days: number = 30): Promise<{ date: string; count: number }[]> {
    try {
        await dbConnect();

        const now = new Date();
        const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
        const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - days + 1, 0, 0, 0, 0));

        const results = await AnalysisResult.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $addFields: {
                    dateOnly: {
                        $dateFromParts: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' },
                            day: { $dayOfMonth: '$createdAt' },
                            timezone: 'UTC'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$dateOnly',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$_id',
                            timezone: 'UTC'
                        }
                    },
                    count: 1
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        const dateMap = new Map(results.map((item: { date: string; count: number }) => [item.date, item.count]));

        const timeSeriesData: { date: string; count: number }[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const count = dateMap.get(dateStr) || 0;

            timeSeriesData.push({
                date: dateStr,
                count: count
            });

            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        return timeSeriesData;
    } catch (error) {
        console.error(error);

        if (process.env.NODE_ENV === 'development') {
            const timeSeriesData: { date: string; count: number }[] = [];
            const now = new Date();
            const endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);

            const startDate = new Date(now);
            startDate.setDate(startDate.getDate() - days + 1);
            startDate.setHours(0, 0, 0, 0);

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                const count = dateStr === now.toISOString().split('T')[0] ? 1 : 0;
                timeSeriesData.push({ date: dateStr, count });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return timeSeriesData;
        }

        const timeSeriesData: { date: string; count: number }[] = [];
        const now = new Date();
        const endDate = new Date(now);
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - days + 1);

        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            timeSeriesData.push({ date: dateStr, count: 0 });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return timeSeriesData;
    }
}

export async function getRecentUniqueHosts(limit: number = 30): Promise<
    {
        host: string;
        lastAnalysisDate: Date;
        count: number;
    }[]
> {
    try {
        await dbConnect();

        const recentChecks = await AnalysisResult.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: '$keyword',
                    lastAnalysisDate: { $first: '$createdAt' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { lastAnalysisDate: -1 }
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 0,
                    host: '$_id',
                    lastAnalysisDate: 1,
                    count: 1
                }
            }
        ]);

        return recentChecks;
    } catch (error) {
        console.error(error);
        return [];
    }
}
