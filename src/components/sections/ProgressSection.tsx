// src/components/ProgressSection.tsx

'use client';

import { useEffect, useRef, useState } from 'react';

import { ProgressState } from '@/types';

interface ProgressSectionProps {
    progress: ProgressState;
    onStop: () => void;
}

export default function ProgressSection({ progress, onStop }: ProgressSectionProps) {
    const percent = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
    const remaining = progress.total - progress.current;
    const estimatedTime = Math.max(Math.round(remaining * 0.5), 0);

    const [showNote, setShowNote] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastProgressRef = useRef(progress.current);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        const hasProgress = progress.current > lastProgressRef.current;
        lastProgressRef.current = progress.current;

        if (hasProgress) {
            setShowNote(false);
        }

        if (remaining > 0) {
            timerRef.current = setTimeout(() => {
                setShowNote(true);
            }, 5000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [progress, remaining]);

    return (
        <div className="mb-8 p-6 bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 rounded-2xl border border-emerald-800/50 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div className="space-y-1">
                    <h4 className="font-semibold text-stone-200 flex items-center gap-2">
                        <span className="icon-[svg-spinners--270-ring] text-emerald-400 w-5 h-5"></span>
                        Checking Domains...
                    </h4>
                    <div className="flex flex-wrap gap-4">
                        <p className="text-sm text-stone-400">
                            <span className="font-medium text-emerald-300">{progress.current}</span> of{' '}
                            <span className="font-medium text-emerald-300">{progress.total}</span> domains checked
                        </p>
                        {remaining > 0 && (
                            <p className="text-sm text-stone-400">
                                ~{estimatedTime} second{estimatedTime !== 1 ? 's' : ''} remaining
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-emerald-400">{percent}%</span>
                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#44403C"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="3"
                                strokeDasharray={`${percent}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="h-3 bg-stone-800 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300 ease-out shadow-inner"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            {showNote && remaining > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-amber-900/20 to-amber-800/20 border border-amber-800/50 rounded-lg flex items-start gap-3 animate-fadeIn">
                    <span className="icon-[icon-park-outline--attention] text-amber-400 w-5 h-5 mt-0.5 flex-shrink-0"></span>
                    <div className="flex-1">
                        <div className="font-medium text-amber-300">Note: Some DNS checks may take longer</div>
                        <div className="text-sm text-amber-200">
                            Certain TLDs or DNS servers might respond slower. The check will continue automatically.
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={onStop}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-stone-100 hover:from-rose-700 hover:to-rose-800 rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 border border-rose-800"
            >
                <span className="icon-[icon-park-outline--pause] w-4 h-4"></span>
                Stop Check
            </button>
        </div>
    );
}
