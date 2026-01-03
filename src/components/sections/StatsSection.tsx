// src/components/StatsSection.tsx

'use client';

import CTABanner from '@/components/CTABanner';
import { Stats } from '@/types';

interface StatsSectionProps {
    totalStats: Stats;
}

export default function StatsSection({ totalStats }: StatsSectionProps) {
    const totalAvailablePercent = totalStats.total > 0 ? (totalStats.available / totalStats.total) * 100 : 0;
    const totalUnavailablePercent = totalStats.total > 0 ? (totalStats.unavailable / totalStats.total) * 100 : 0;

    const displayAvailablePercent = totalAvailablePercent.toFixed(1);
    const displayUnavailablePercent = totalUnavailablePercent.toFixed(1);

    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
                <span className="icon-[icon-park-outline--chart-proportion] text-emerald-400 w-5 h-5"></span>
                <h3 className="text-2xl font-bold">Statistics Overview</h3>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-sky-700 rounded-2xl blur opacity-20 transition-opacity duration-300"></div>
                        <div className="relative bg-stone-900 border border-sky-800/50 rounded-2xl p-6 lg:p-8 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent mb-2">
                                        {totalStats.total}
                                    </div>
                                    <div className="text-lg font-semibold text-sky-300 mb-1 flex items-center gap-2">
                                        <span className="icon-[icon-park-outline--all-application] w-5 h-5"></span>
                                        Total TLDs
                                    </div>
                                    <div className="text-sm text-sky-400 opacity-75">All domains checked</div>
                                </div>
                                <div className="text-4xl">
                                    <span className="icon-[icon-park-outline--list-two] text-sky-500"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl blur opacity-20 transition-opacity duration-300"></div>
                        <div className="relative bg-stone-900 border border-emerald-800/50 rounded-2xl p-6 lg:p-8 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-2">
                                        {totalStats.available}
                                    </div>
                                    <div className="text-lg font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                                        <span className="icon-[icon-park-outline--check-one] w-5 h-5"></span>
                                        Available
                                    </div>
                                    <div className="text-sm text-emerald-400 opacity-75">
                                        {displayAvailablePercent}% of all domains
                                    </div>
                                </div>
                                <div className="text-4xl">
                                    <span className="icon-[icon-park-outline--check-one] text-emerald-500"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl blur opacity-20 transition-opacity duration-300"></div>
                        <div className="relative bg-stone-900 border border-rose-800/50 rounded-2xl p-6 lg:p-8 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-400 to-rose-300 bg-clip-text text-transparent mb-2">
                                        {totalStats.unavailable}
                                    </div>
                                    <div className="text-lg font-semibold text-rose-300 mb-1 flex items-center gap-2">
                                        <span className="icon-[icon-park-outline--close-one] w-5 h-5"></span>
                                        Taken
                                    </div>
                                    <div className="text-sm text-rose-400 opacity-75">
                                        {displayUnavailablePercent}% of all domains
                                    </div>
                                </div>
                                <div className="text-4xl">
                                    <span className="icon-[icon-park-outline--close-one] text-rose-500"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {totalStats.total > 0 && (
                    <div className="mt-10 p-6 bg-stone-800 border border-stone-700 rounded-2xl shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                                <h4 className="font-bold text-stone-200 text-lg">Overall Availability Ratio</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                                    <span className="text-sm font-medium text-stone-300">
                                        <span className="font-bold text-emerald-400">{displayAvailablePercent}%</span> available
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-400"></div>
                                    <span className="text-sm font-medium text-stone-300">
                                        <span className="font-bold text-rose-400">{displayUnavailablePercent}%</span> taken
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="h-4 bg-gradient-to-r from-stone-800 to-stone-900 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 absolute left-0 top-0 transition-all duration-700 ease-out shadow-md"
                                    style={{ width: `${totalAvailablePercent}%` }}
                                ></div>
                                <div
                                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 absolute top-0 transition-all duration-700 ease-out shadow-md"
                                    style={{
                                        width: `${totalUnavailablePercent}%`,
                                        left: `${totalAvailablePercent}%`
                                    }}
                                ></div>
                            </div>

                            <div className="flex justify-between mt-3 text-xs text-stone-500">
                                <span>0%</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CTABanner variant="small" />
        </div>
    );
}
