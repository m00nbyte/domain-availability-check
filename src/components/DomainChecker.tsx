// src/components/DomainChecker.tsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DomainCheckerProps {
    domain: string;
    setDomain: (domain: string) => void;
    checkAllDomains: () => void;
    isChecking: boolean;
}

function extractDomainName(input: string): string {
    let clean = input.replace(/^(https?:\/\/)?(www\.)?/, '');

    const firstDotIndex = clean.indexOf('.');
    if (firstDotIndex > -1) {
        clean = clean.substring(0, firstDotIndex);
    }

    clean = clean
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/^-+|-+$/g, '')
        .substring(0, 63);

    return clean;
}

export default function DomainChecker({ domain, setDomain, checkAllDomains, isChecking }: DomainCheckerProps) {
    const [inputValue, setInputValue] = useState(domain);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue(domain);
    }, [domain]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const extracted = extractDomainName(inputValue);
            setDomain(extracted);

            const isValidDomain =
                extracted.length > 0 && extracted.length <= 63 && /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(extracted);
            setIsValid(isValidDomain);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, setDomain]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isChecking && inputValue.trim() && isValid) {
            checkAllDomains();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCheckClick = () => {
        if (!isChecking && inputValue.trim() && isValid) {
            checkAllDomains();
        }
    };

    return (
        <div className="space-y-6 text-center">
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    <div className="flex items-center">
                        <div
                            className={`flex-1 relative ${
                                isFocused ? 'ring-2 ring-emerald-500/30 ring-offset-1 ring-offset-stone-950' : ''
                            } rounded-2xl transition-all duration-200`}
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter a keyword or your brand name"
                                className="relative w-full py-4 px-4 border-2 border-stone-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-lg outline-none transition-all duration-200 bg-stone-900 backdrop-blur-sm z-10 text-stone-100 placeholder:text-stone-500"
                                disabled={isChecking}
                            />
                        </div>
                    </div>

                    {!isValid && inputValue && (
                        <div className="mt-2 text-sm text-rose-400 flex items-center gap-1 justify-center">
                            <span className="icon-[icon-park-outline--attention] w-4 h-4"></span>
                            Please enter a valid domain name (letters, numbers, and hyphens only)
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                    onClick={handleCheckClick}
                    disabled={isChecking || !inputValue.trim() || !isValid}
                    className="pl-5 pr-6 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors cursor-pointer"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isChecking ? (
                            <>
                                <span className="icon-[svg-spinners--270-ring] w-5 h-5"></span>
                                Checking TLDs...
                            </>
                        ) : (
                            <>
                                <span className="icon-[icon-park-outline--search] w-5 h-5"></span>
                                Check Availability
                            </>
                        )}
                    </span>
                </button>

                <Link
                    href="/guide"
                    className="group relative w-full md:w-auto pl-6 pr-4 py-3 bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 text-emerald-300 font-medium rounded-xl hover:from-emerald-800/40 hover:to-emerald-700/40 transition-all duration-300 shadow-sm hover:shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer border border-emerald-800/50 hover:border-emerald-700/50"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="icon-[icon-park-outline--book] w-5 h-5"></span>
                        Domain Name Guide
                        <span className="icon-[icon-park-outline--right] w-4 h-4 transition-transform group-hover:translate-x-1"></span>
                    </span>
                </Link>
            </div>
        </div>
    );
}
