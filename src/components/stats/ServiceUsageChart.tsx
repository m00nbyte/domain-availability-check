// src/components/stats/ServiceUsageChart.tsx

'use client';

import moment from 'moment';

import ChartJSLineChart from '@/components/stats/ChartJSLineChart';
import { StatsSummary, TimeSeriesData } from '@/types';

interface ServiceUsageChartProps {
    loading: boolean;
    timeSeriesData: TimeSeriesData[];
    stats: StatsSummary | null | undefined;
}

export default function ServiceUsageChart({ loading, timeSeriesData, stats }: ServiceUsageChartProps) {
    return (
        <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-700">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                            <span className="icon-[mdi--chart-line] text-emerald-400 mr-2"></span>
                            <span>Service Usage</span>
                        </h2>
                    </div>
                </div>
                {stats && <div className="text-sm text-stone-400">{stats.totalChecks.toLocaleString()} total checks</div>}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <span className="icon-[gg--spinner] animate-spin"></span>
                        Loading analytics...
                    </div>
                </div>
            ) : stats?.totalChecks === 0 || timeSeriesData.length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                    <p>No domains checked yet</p>
                    <p className="text-sm mt-2">Be the first to check a domain!</p>
                </div>
            ) : (
                <>
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700">
                                <div className="text-sm text-stone-400 mb-1">Today</div>
                                <div className="text-2xl font-bold text-white">{stats.todayCount.toLocaleString()}</div>
                                <div className="text-xs text-stone-500 mt-1">
                                    {stats.todayCount > stats.yesterdayCount ? '📈' : '📉'}
                                    {stats.yesterdayCount > 0
                                        ? ` ${Math.abs(
                                              Math.round(
                                                  ((stats.todayCount - stats.yesterdayCount) / stats.yesterdayCount) * 100
                                              )
                                          )}% from yesterday`
                                        : ' First check today'}
                                </div>
                            </div>
                            <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700">
                                <div className="text-sm text-stone-400 mb-1">Daily Average</div>
                                <div className="text-2xl font-bold text-white">{stats.dailyAverage.toLocaleString()}</div>
                                <div className="text-xs text-stone-500 mt-1">Last 30 days</div>
                            </div>
                            <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700">
                                <div className="text-sm text-stone-400 mb-1">Peak Day</div>
                                <div className="text-2xl font-bold text-white">{stats.peakDay.count.toLocaleString()}</div>
                                <div className="text-xs text-stone-500 mt-1">
                                    {moment(stats.peakDay.date).format('D. MMM YYYY')}
                                </div>
                            </div>
                            <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700">
                                <div className="text-sm text-stone-400 mb-1">Weekly Growth</div>
                                <div className="text-2xl font-bold text-white">
                                    {stats.weeklyGrowth > 0 ? '+' : ''}
                                    {stats.weeklyGrowth}%
                                </div>
                                <div className="text-xs text-stone-500 mt-1">This week vs last week</div>
                            </div>
                        </div>
                    )}

                    <div className="h-64">
                        <ChartJSLineChart data={timeSeriesData} />
                    </div>
                </>
            )}
        </div>
    );
}
