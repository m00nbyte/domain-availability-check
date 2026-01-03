// src/components/stats/RecentHostsList.tsx

'use client';

import { RecentHost } from '@/types';

interface RecentHostsListProps {
    loading: boolean;
    recentHosts: RecentHost[];
}

export default function RecentHostsList({ loading, recentHosts }: RecentHostsListProps) {
    return (
        <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-700">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                            <span className="icon-[mdi--history] text-emerald-400 mr-2"></span>
                            <span>Recent Checks</span>
                        </h2>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <span className="icon-[gg--spinner] animate-spin"></span>
                        Loading recent checks...
                    </div>
                </div>
            ) : (
                <>
                    {recentHosts.length === 0 ? (
                        <div className="text-center py-8 text-stone-400">
                            <p>No domains checked yet</p>
                            <p className="text-sm mt-2">Be the first to check a domain!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {recentHosts.map((hostData, index) => (
                                <RecentHostItem key={`${hostData.host}-${index}`} hostData={hostData} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function RecentHostItem({ hostData }: { hostData: RecentHost }) {
    return (
        <div className="flex items-center gap-2 rounded-lg p-3 bg-stone-900/50 border border-stone-700 hover:border-stone-600 transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate pr-2 text-white">{hostData.host}</span>
                    <span className="text-xs text-stone-400 bg-stone-800 px-2 py-1 rounded">
                        {hostData.count} check{hostData.count !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                    Last checked: {new Date(hostData.lastAnalysisDate).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
