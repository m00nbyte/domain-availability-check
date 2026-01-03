// src/components/ResultsSection.tsx

'use client';

import Link from 'next/link';

import { DomainResult } from '@/types';

interface ResultsSectionProps {
    results: DomainResult[];
    allResults: DomainResult[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filter: 'all' | 'available' | 'unavailable';
    setFilter: (filter: 'all' | 'available' | 'unavailable') => void;
}

export default function ResultsSection({
    results,
    allResults,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter
}: ResultsSectionProps) {
    const getStatusStyles = (status: DomainResult['status']) => {
        switch (status) {
            case 'available':
                return {
                    bg: 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border-emerald-800/50 hover:from-emerald-800/40 hover:to-emerald-700/40',
                    text: 'text-emerald-300',
                    icon: 'icon-[icon-park-outline--check-one]',
                    iconColor: 'text-emerald-400',
                    badge: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-stone-100',
                    badgeIcon: 'icon-[icon-park-outline--check]',
                    badgeIconColor: 'text-emerald-600',
                    glow: 'shadow-emerald-500/10 hover:shadow-emerald-500/20'
                };
            case 'unavailable':
                return {
                    bg: 'bg-gradient-to-br from-rose-900/30 to-rose-800/30 border-rose-800/50 hover:from-rose-800/40 hover:to-rose-700/40',
                    text: 'text-rose-300',
                    icon: 'icon-[icon-park-outline--close-one]',
                    iconColor: 'text-rose-400',
                    badge: 'bg-gradient-to-r from-rose-600 to-rose-700 text-stone-100',
                    badgeIcon: 'icon-[icon-park-outline--close]',
                    badgeIconColor: 'text-rose-600',
                    glow: 'shadow-rose-500/10 hover:shadow-rose-500/20'
                };
            case 'checking':
                return {
                    bg: 'bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-800/50 hover:from-amber-800/40 hover:to-amber-700/40',
                    text: 'text-amber-300',
                    icon: 'icon-[svg-spinners--270-ring]',
                    iconColor: 'text-amber-400',
                    badge: 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-100',
                    badgeIcon: 'icon-[svg-spinners--90-ring-with-bg]',
                    badgeIconColor: 'text-amber-600',
                    glow: 'shadow-amber-500/10 hover:shadow-amber-500/20'
                };
            default:
                return {
                    bg: 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border-emerald-800/50 hover:from-emerald-800/40 hover:to-emerald-700/40',
                    text: 'text-emerald-300',
                    icon: 'icon-[icon-park-outline--check-one]',
                    iconColor: 'text-emerald-400',
                    badge: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-stone-100',
                    badgeIcon: 'icon-[icon-park-outline--check]',
                    badgeIconColor: 'text-emerald-600',
                    glow: 'shadow-emerald-500/10 hover:shadow-emerald-500/20'
                };
        }
    };

    const getStatusText = (status: DomainResult['status']) => {
        switch (status) {
            case 'available':
                return 'Available';
            case 'unavailable':
                return 'Taken';
            case 'checking':
                return 'Checking...';
            default:
                return 'Available';
        }
    };

    const totalCount = allResults.length;
    const availableCount = allResults.filter((r) => r.status === 'available').length;
    const unavailableCount = allResults.filter((r) => r.status === 'unavailable').length;

    return (
        <div className="mt-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="icon-[icon-park-outline--list-view] text-emerald-400 w-5 h-5"></span>
                        <h3 className="text-2xl font-bold">Domain Results</h3>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative">
                        <div className="relative">
                            <span className="icon-[icon-park-outline--search] absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 w-4 h-4"></span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Filter domains..."
                                className="py-3 px-4 w-full lg:w-72 border-2 border-stone-700 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-stone-900 text-stone-100 placeholder:text-stone-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-1 bg-gradient-to-r from-stone-800 to-stone-900 p-1.5 rounded-xl shadow-inner border border-stone-700">
                        <button
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                filter === 'all'
                                    ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-stone-100 shadow-md'
                                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            }`}
                            onClick={() => setFilter('all')}
                        >
                            <span className="icon-[icon-park-outline--all-application] w-4 h-4"></span>
                            All ({totalCount})
                        </button>
                        <button
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                filter === 'available'
                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-stone-100 shadow-md'
                                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            }`}
                            onClick={() => setFilter('available')}
                        >
                            <span className="icon-[icon-park-outline--check] w-4 h-4"></span>
                            Available ({availableCount})
                        </button>
                        <button
                            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                filter === 'unavailable'
                                    ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-stone-100 shadow-md'
                                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            }`}
                            onClick={() => setFilter('unavailable')}
                        >
                            <span className="icon-[icon-park-outline--close] w-4 h-4"></span>
                            Taken ({unavailableCount})
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto p-3">
                    {results.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                            <span className="icon-[icon-park-outline--search] w-12 h-12 text-stone-700"></span>
                            <p className="text-xl font-bold text-stone-500 mb-3">No domains to display</p>
                            <p className="text-stone-600 max-w-md mx-auto">
                                Try adjusting your filters or check a new domain name
                            </p>
                        </div>
                    ) : (
                        results.map((result) => {
                            const styles = getStatusStyles(result.status);
                            return (
                                <div
                                    key={result.domain}
                                    className={`${styles.bg} border ${styles.glow} rounded-xl p-4 transition-all duration-300 flex items-center justify-between group`}
                                >
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center bg-stone-800/50 border border-stone-700`}
                                        >
                                            <span className={`${styles.icon} ${styles.iconColor} text-lg w-5 h-5`}></span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-semibold text-sm truncate mb-1" title={result.domain}>
                                                <Link
                                                    href={`http://${result.domain}`}
                                                    target="_blank"
                                                    className="hover:text-emerald-300 transition-colors duration-200 text-stone-200"
                                                >
                                                    {result.domain}
                                                </Link>
                                            </div>
                                            <div className="text-xs opacity-75 truncate text-stone-400" title={result.message}>
                                                {result.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.badge} px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 flex-shrink-0 ml-3 shadow-sm border border-stone-700`}
                                    >
                                        <span className="icon-[icon-park-outline--check] w-3 h-3"></span>
                                        <span>{getStatusText(result.status)}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
