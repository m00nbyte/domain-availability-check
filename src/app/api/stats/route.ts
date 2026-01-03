// src/app/api/stats/route.ts

import { NextResponse } from 'next/server';

import { getAnalysisTimeSeriesData, getRecentUniqueHosts } from '@/utils/analysis-storage';

export async function GET() {
    try {
        const timeSeriesData = await getAnalysisTimeSeriesData(30);
        const recentUniqueHosts = await getRecentUniqueHosts(30);

        const totalChecks = timeSeriesData.reduce((sum, day) => sum + day.count, 0);

        const today = new Date().toISOString().split('T')[0];
        const todayCount = timeSeriesData.find((day) => day.date === today)?.count || 0;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayCount = timeSeriesData.find((day) => day.date === yesterdayStr)?.count || 0;

        const daysWithData = timeSeriesData.filter((day) => day.date !== today);
        const dailyAverage =
            daysWithData.length > 0 ? daysWithData.reduce((sum, day) => sum + day.count, 0) / daysWithData.length : 0;

        const peakDay = timeSeriesData.reduce((max, day) => (day.count > max.count ? day : max), { date: '', count: 0 });

        const now = new Date();
        const thisWeekStart = new Date(now);
        thisWeekStart.setDate(now.getDate() - now.getDay());
        thisWeekStart.setHours(0, 0, 0, 0);

        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        const lastWeekEnd = new Date(thisWeekStart);
        lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);
        lastWeekEnd.setHours(23, 59, 59, 999);

        const thisWeekCount = timeSeriesData
            .filter((day) => new Date(day.date) >= thisWeekStart)
            .reduce((sum, day) => sum + day.count, 0);

        const lastWeekCount = timeSeriesData
            .filter((day) => {
                const date = new Date(day.date);
                return date >= lastWeekStart && date <= lastWeekEnd;
            })
            .reduce((sum, day) => sum + day.count, 0);

        const weeklyGrowth =
            lastWeekCount > 0 ? ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100 : thisWeekCount > 0 ? 100 : 0;

        return NextResponse.json({
            success: true,
            data: {
                timeSeriesData,
                recentUniqueHosts,
                summary: {
                    totalChecks,
                    todayCount,
                    yesterdayCount,
                    dailyAverage: Math.round(dailyAverage * 10) / 10,
                    peakDay: {
                        date: peakDay.date,
                        count: peakDay.count
                    },
                    thisWeekCount,
                    lastWeekCount,
                    weeklyGrowth: Math.round(weeklyGrowth * 10) / 10,
                    daysTracked: timeSeriesData.length
                }
            }
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch analysis statistics'
            },
            { status: 500 }
        );
    }
}
