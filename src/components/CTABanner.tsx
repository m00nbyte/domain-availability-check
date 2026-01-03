// src/components/cta/CTABanner.tsx
'use client';

import Link from 'next/link';

interface CTABannerProps {
    variant?: 'small' | 'large' | 'inline' | 'error' | 'service' | 'float';
    message?: string;
    className?: string;
}

export default function CTABanner({ variant = 'large', message, className = '' }: CTABannerProps) {
    const baseMessage = 'Need help with domains, DNS, or online presence?';
    const displayMessage = message || baseMessage;
    const contactUrl = 'https://moonbyte.at/';

    if (variant === 'inline') {
        return (
            <div className={`text-sm text-stone-400 ${className}`}>
                <span>{displayMessage} </span>
                <Link
                    href={contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                >
                    Get domain assistance
                    <span className="icon-[mdi--arrow-right] text-xs"></span>
                </Link>
            </div>
        );
    }

    if (variant === 'error') {
        return (
            <div className="mt-2 pt-2 border-t border-rose-800">
                <p className="flex flex-col text-sm text-stone-300">
                    <span>{displayMessage}</span>
                    <Link
                        href={contactUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                    >
                        Get DNS troubleshooting help
                        <span className="icon-[mdi--arrow-right] text-xs"></span>
                    </Link>
                </p>
            </div>
        );
    }

    if (variant === 'service') {
        return (
            <div className="bg-stone-800/50 border border-stone-700 rounded-lg p-4">
                <div className="flex items-center gap-4">
                    <span className="icon-[mdi--domain] text-emerald-500 text-lg"></span>
                    <div>
                        <p className="flex flex-col text-stone-300">
                            {displayMessage}
                            <a
                                href={contactUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                            >
                                Get domain management solutions
                                <span className="icon-[mdi--arrow-right] text-xs"></span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'small') {
        return (
            <div className={`bg-stone-900/50 border border-stone-700 rounded-lg p-4 ${className}`}>
                <div className="flex items-center gap-3">
                    <span className="icon-[mdi--domain] text-emerald-500 text-lg mt-0.5"></span>
                    <div className="flex-1">
                        <p className="text-sm text-stone-300 mb-1">{displayMessage}</p>
                        <Link
                            href={contactUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                        >
                            Contact for domain help
                            <span className="icon-[mdi--arrow-right] text-xs"></span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'float') {
        return (
            <Link
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 animate-fade-in group cursor-pointer"
            >
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-full pl-3 pr-4 py-2 shadow-lg border border-emerald-700">
                    <div className="flex items-center gap-2 text-white font-medium group-hover:text-emerald-100 transition-colors ">
                        <span className="icon-[mdi--help-circle-outline] text-lg"></span>
                        <span className="hidden sm:inline text-sm">{displayMessage}</span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className="mt-16 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900"></div>

            <div className="relative p-8 md:p-12 text-center">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-100 mb-4">Professional Domain Services</h3>
                    <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                        Need help registering domains, setting up DNS, or managing your online presence? Get complete domain
                        management solutions with expert support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={contactUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-8 py-4 bg-stone-100 text-emerald-900 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-100 to-stone-200"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                <span className="icon-[icon-park-outline--external-transmission] w-5 h-5"></span>
                                Contact Me
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
