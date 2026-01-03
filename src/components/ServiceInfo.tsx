// src/components/ServiceInfo.tsx

'use client';

import { useEffect, useState } from 'react';

import CTABanner from '@/components/CTABanner';
import RecentHostsList from '@/components/stats/RecentHostsList';
import ServiceUsageChart from '@/components/stats/ServiceUsageChart';
import { RecentHost, StatsSummary, TimeSeriesData } from '@/types';

interface AnalyticsData {
    recentUniqueHosts: RecentHost[];
    timeSeriesData: TimeSeriesData[];
    summary: StatsSummary;
}

export default function ServiceInfo() {
    const [loading, setLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        async function fetchAnalyticsData() {
            try {
                setLoading(true);
                const response = await fetch('/api/stats');
                const data = await response.json();

                if (data.success) {
                    setAnalyticsData(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAnalyticsData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 mt-6 mb-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-700">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                                <span className="icon-[ix--about-filled] text-emerald-400 mr-2"></span>
                                <span>About This Domain Checker</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">What We Check</h3>
                        <ul className="space-y-2 text-stone-300">
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--dns] text-emerald-500 mt-0.5"></span>
                                <span>
                                    <strong>Domain Availability</strong> - Real-time DNS queries to check registration status
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--domain] text-emerald-500 mt-0.5"></span>
                                <span>
                                    <strong>Multiple TLDs</strong> - Check popular, country-specific, and niche extensions
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--speedometer] text-emerald-500 mt-0.5"></span>
                                <span>
                                    <strong>Bulk Checking</strong> - Check hundreds of domains simultaneously
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--filter] text-emerald-500 mt-0.5"></span>
                                <span>
                                    <strong>Smart Filtering</strong> - Filter results by availability and TLD type
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">How It Works</h3>
                        <ul className="space-y-2 text-stone-300">
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--search-web] text-emerald-500 mt-0.5"></span>
                                <span>Enter your desired domain name without extension</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--api] text-emerald-500 mt-0.5"></span>
                                <span>Select TLD categories {`you're`} interested in</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--chart-box] text-emerald-500 mt-0.5"></span>
                                <span>Get instant results with available domains highlighted</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="icon-[mdi--shield-check] text-emerald-500 mt-0.5"></span>
                                <span>All checks are performed securely and privately</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-stone-700">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Privacy & Usage</h3>
                    <p className="text-stone-300">
                        This tool is free to use for analyzing website health. Analysis results are stored anonymously for
                        aggregate statistics and service improvement. No personally identifiable information is stored. Perfect
                        for web developers, system administrators, and SEO professionals.
                    </p>
                </div>
            </div>

            <div className="mt-4 mb-12">
                <CTABanner variant="service" message="Not sure what to search?" className="mt-2" />
            </div>

            <RecentHostsList loading={loading} recentHosts={analyticsData?.recentUniqueHosts || []} />
            <ServiceUsageChart
                loading={loading}
                timeSeriesData={analyticsData?.timeSeriesData || []}
                stats={analyticsData?.summary}
            />
        </div>
    );
}
