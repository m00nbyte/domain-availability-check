// src/app/guide/page.tsx

'use client';

import Link from 'next/link';

import CTABanner from '@/components/CTABanner';
import CTAFloating from '@/components/CTAFloating';

export default function DomainNameGuidePage() {
    return (
        <div className="container mx-auto bg-stone-900 text-white p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <header className="text-left mb-8">
                    <div className="flex items-center gap-3 mb-2 cursor-pointer">
                        <span className="icon-[icon-park-outline--book] text-3xl text-emerald-500"></span>
                        <h1 className="text-3xl font-bold">Domain Name Guide</h1>
                    </div>
                    <p className="text-stone-400">
                        Everything you need to know about choosing, registering, and managing domain names for your business.
                    </p>
                </header>

                <div className="mb-10">
                    <Link
                        href="/"
                        className="w-fit group pl-4 pr-6 py-3 bg-gradient-to-r from-stone-800 to-stone-900 text-stone-300 font-medium rounded-xl hover:from-stone-700 hover:to-stone-800 transition-all shadow-lg hover:shadow-emerald-500/10 border border-stone-700 hover:border-stone-600 flex items-center gap-3"
                    >
                        <span className="icon-[icon-park-outline--left] w-5 h-5 transition-transform group-hover:-translate-x-1 text-emerald-400"></span>
                        Back to Domain Checker
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-gradient-to-b from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-stone-800 p-6">
                            <h2 className="text-xl font-bold text-stone-100 mb-6 flex items-center gap-3">
                                <span className="icon-[icon-park-outline--list] text-emerald-500 w-5 h-5"></span>
                                Quick Navigation
                            </h2>
                            <nav className="space-y-2">
                                {[
                                    {
                                        id: 'choosing',
                                        label: 'Choosing a Domain',
                                        icon: 'icon-[icon-park-outline--brain]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'tlds',
                                        label: 'Understanding TLDs',
                                        icon: 'icon-[icon-park-outline--earth]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'registration',
                                        label: 'Registration Tips',
                                        icon: 'icon-[icon-park-outline--shield]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'seo',
                                        label: 'SEO Best Practices',
                                        icon: 'icon-[icon-park-outline--chart-line]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'branding',
                                        label: 'Branding Considerations',
                                        icon: 'icon-[icon-park-outline--trademark]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'security',
                                        label: 'Domain Security',
                                        icon: 'icon-[iconoir--safe]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'management',
                                        label: 'Domain Management',
                                        icon: 'icon-[icon-park-outline--setting]',
                                        color: 'text-emerald-400'
                                    },
                                    {
                                        id: 'faq',
                                        label: 'FAQ',
                                        icon: 'icon-[icon-park-outline--help]',
                                        color: 'text-emerald-400'
                                    }
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-900/30 hover:to-emerald-800/30 text-stone-300 hover:text-emerald-300 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-emerald-800/50"
                                    >
                                        <span className={`${item.icon} ${item.color} w-4 h-4`}></span>
                                        <span className="font-medium">{item.label}</span>
                                        <span className="icon-[icon-park-outline--right] w-4 h-4 text-stone-600 ml-auto group-hover:text-emerald-400 transition-transform group-hover:translate-x-1"></span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section
                            id="choosing"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--brain] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Choosing the Perfect Domain Name</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">Key Principles</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--check-correct] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-emerald-300 text-lg">{`Do's`}</h4>
                                                </div>
                                                <ul className="space-y-3 text-emerald-200">
                                                    {[
                                                        {
                                                            text: 'Keep it short and memorable (6-14 characters)',
                                                            icon: 'icon-[icon-park-outline--check-one]'
                                                        },
                                                        {
                                                            text: 'Use keywords relevant to your niche',
                                                            icon: 'icon-[icon-park-outline--check-one]'
                                                        },
                                                        {
                                                            text: 'Make it easy to spell and pronounce',
                                                            icon: 'icon-[icon-park-outline--check-one]'
                                                        },
                                                        {
                                                            text: 'Consider brandability and future growth',
                                                            icon: 'icon-[icon-park-outline--check-one]'
                                                        }
                                                    ].map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <span
                                                                className={`${item.icon} text-emerald-400 w-5 h-5 mt-0.5 flex-shrink-0`}
                                                            ></span>
                                                            <span>{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-br from-rose-900/40 to-rose-800/40 border border-rose-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--close-one] text-rose-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-rose-300 text-lg">{`Don't`}s</h4>
                                                </div>
                                                <ul className="space-y-3 text-rose-200">
                                                    {[
                                                        {
                                                            text: 'Avoid hyphens and numbers',
                                                            icon: 'icon-[icon-park-outline--close-one]'
                                                        },
                                                        {
                                                            text: "Don't use trademarked terms",
                                                            icon: 'icon-[icon-park-outline--close-one]'
                                                        },
                                                        {
                                                            text: 'Avoid confusing spellings',
                                                            icon: 'icon-[icon-park-outline--close-one]'
                                                        },
                                                        {
                                                            text: "Don't make it too long (>20 characters)",
                                                            icon: 'icon-[icon-park-outline--close-one]'
                                                        }
                                                    ].map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <span
                                                                className={`${item.icon} text-rose-400 w-5 h-5 mt-0.5 flex-shrink-0`}
                                                            ></span>
                                                            <span>{item.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 border border-emerald-800">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="icon-[icon-park-outline--light] text-emerald-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-emerald-100 text-lg">Pro Tip: Length Matters</h4>
                                            </div>
                                            <p className="text-emerald-200 leading-relaxed">
                                                The ideal domain length is 6-14 characters. Shorter domains are 63% more
                                                memorable, easier to type, and share. According to industry studies, domains
                                                under 8 characters have 40% higher brand recall and 25% more direct traffic.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="tlds"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--earth] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Understanding Domain Extensions (TLDs)</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">TLD Categories</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="group bg-gradient-to-br from-stone-900 to-stone-950 border border-emerald-900/50 rounded-2xl p-6 hover:border-emerald-700 hover:shadow-emerald-500/10 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--globe] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-stone-200">Generic TLDs</h4>
                                                </div>
                                                <ul className="space-y-2 text-stone-300">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .com - Commercial
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .org - Organizations
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .net - Network
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .info - Information
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .biz - Business
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="group bg-gradient-to-br from-stone-900 to-stone-950 border border-emerald-900/50 rounded-2xl p-6 hover:border-emerald-700 hover:shadow-emerald-500/10 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--local] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-stone-200">Country Code TLDs</h4>
                                                </div>
                                                <ul className="space-y-2 text-stone-300">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .us - United States
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .uk - United Kingdom
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .ca - Canada
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .au - Australia
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .de - Germany
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="group bg-gradient-to-br from-stone-900 to-stone-950 border border-emerald-900/50 rounded-2xl p-6 hover:border-emerald-700 hover:shadow-emerald-500/10 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--category-management] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-stone-200">New TLDs</h4>
                                                </div>
                                                <ul className="space-y-2 text-stone-300">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .app - Applications
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .tech - Technology
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .store - E-commerce
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .blog - Blogging
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        .io - Tech startups
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 border border-amber-800">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="icon-[icon-park-outline--attention] text-amber-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-amber-100 text-lg">
                                                    Important Note on TLD Selection
                                                </h4>
                                            </div>
                                            <p className="text-amber-200 leading-relaxed">
                                                While .com is still the most recognized TLD (used by 48% of all websites), newer
                                                extensions offer better availability and niche relevance. Consider registering
                                                multiple TLDs to protect your brand. Premium TLDs like .ai and .io have seen
                                                300% growth in adoption among tech startups.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="registration"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--shield] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Domain Registration Tips</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">
                                            Best Practices for Registration
                                        </h3>

                                        <div className="space-y-4 mb-8">
                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--calendar] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">
                                                        Register for Multiple Years
                                                    </h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Register your domain for 2-5 years to prevent accidental expiration and
                                                        secure better renewal rates. This shows search engines long-term
                                                        commitment and can improve SEO rankings by 15-20%.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--lock] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Enable Auto-Renewal</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Always enable auto-renewal with a valid payment method. Domain
                                                        expiration causes 73% of brand-related cyber attacks. Set calendar
                                                        reminders 60 days before expiration as a backup.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--user] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">WHOIS Privacy Protection</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Opt for WHOIS privacy to hide personal information from public
                                                        databases. Without protection, you may receive 50+ spam emails daily and
                                                        risk targeted phishing attacks.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 border border-emerald-800">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="icon-[icon-park-outline--attention] text-emerald-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-emerald-100 text-lg">Registrar Selection Tips</h4>
                                            </div>
                                            <ul className="space-y-2 text-emerald-200">
                                                <li className="flex items-center gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 text-emerald-300"></span>
                                                    Choose ICANN-accredited registrars only
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 text-emerald-300"></span>
                                                    Compare renewal prices (not just first-year discounts)
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 text-emerald-300"></span>
                                                    Check transfer policies and hidden fees
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 text-emerald-300"></span>
                                                    Look for 24/7 customer support with live chat
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="seo"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--chart-line] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Domain Names & SEO</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">SEO Impact Factors</h3>

                                        <div className="space-y-4 mb-8">
                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--ranking] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Keyword in Domain</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Exact-match domains provide a 3-5% SEO boost but prioritize
                                                        brandability.
                                                        {`Google's`} E-A-T algorithm values brand signals 40% more than exact
                                                        keywords.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--history] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Domain Age</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Domains older than 2 years have 25% higher trust signals. However,
                                                        quality content and backlinks outweigh age alone in modern SEO.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--link] text-emerald-400"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">TLD and SEO</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Google treats most TLDs equally. Country-specific TLDs (.uk, .ca) may
                                                        boost local rankings by 15-20% but limit global reach.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 border border-emerald-800">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="icon-[icon-park-outline--light] text-emerald-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-emerald-100 text-lg">
                                                    SEO Pro Tip: HTTPS Matters
                                                </h4>
                                            </div>
                                            <p className="text-emerald-200 leading-relaxed">
                                                Always use HTTPS with an SSL certificate. Google Chrome marks HTTP sites as{' '}
                                                {`"Not
                                            Secure,"`}{' '}
                                                causing 85% of users to abandon the site. HTTPS also provides a minor SEO
                                                ranking boost and is essential for E-A-T signals.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="branding"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--trademark] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Branding Considerations</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">
                                            Building a Strong Brand Identity
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--like] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-emerald-300 text-lg">
                                                        Brand-Friendly Domains
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3 text-emerald-200">
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Memorable and easy to spell
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Reflective of your brand personality
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Pronounceable in meetings and podcasts
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Works across different cultures/languages
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-br from-rose-900/40 to-rose-800/40 border border-rose-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--protect] text-rose-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-rose-300 text-lg">Brand Protection</h4>
                                                </div>
                                                <ul className="space-y-3 text-rose-200">
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-rose-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Register common misspellings
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-rose-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Secure multiple TLDs (.com, .net, .org)
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-rose-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Consider country-specific versions
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-rose-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Monitor for trademark infringements
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-6 border border-stone-700">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center backdrop-blur-sm border border-emerald-800/50">
                                                    <span className="icon-[icon-park-outline--light] text-emerald-300 w-5 h-5"></span>
                                                </div>
                                                <h4 className="font-bold text-emerald-100 text-lg">
                                                    Brand Evolution Considerations
                                                </h4>
                                            </div>
                                            <p className="text-stone-300 leading-relaxed">
                                                Choose a domain that allows your brand to evolve. Avoid being too specific to
                                                one product or service. For example, {`"BestWidgets.com"`} limits you to
                                                widgets, while
                                                {`"InnovateLabs.com"`} allows expansion into broader technology offerings.
                                                Consider future pivots and market trends.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="security"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[iconoir--safe] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Domain Security</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">
                                            Protecting Your Digital Asset
                                        </h3>

                                        <div className="space-y-4 mb-8">
                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[ic--round-password] text-emerald-400 w-5 h-5"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Strong Account Security</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Use 16+ character passwords with symbols, numbers, and mixed case.
                                                        Enable two-factor authentication (2FA) on all registrar accounts. Never
                                                        reuse passwords across platforms.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--lock] text-emerald-400 w-5 h-5"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Registrar Lock</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Always enable registrar lock (domain lock). This prevents unauthorized
                                                        transfers and hijacking attempts. Domain hijacking costs businesses an
                                                        average of $15,000 in recovery expenses.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-stone-800 to-stone-900 rounded-xl hover:from-emerald-900/40 hover:to-emerald-800/40 transition-all duration-300 border border-stone-700">
                                                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                                                    <span className="icon-[icon-park-outline--mail] text-emerald-400 w-5 h-5"></span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-200 mb-2">Email Security</h4>
                                                    <p className="text-stone-400 leading-relaxed">
                                                        Use a dedicated, secure email for domain registration with 2FA enabled.
                                                        This email receives renewal notices and transfer codes. Monitor it
                                                        regularly for security alerts.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-rose-900 to-rose-800 rounded-2xl p-6 border border-rose-800">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="icon-[ic--round-warning] text-rose-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-rose-100 text-lg">Security Red Flags</h4>
                                            </div>
                                            <ul className="space-y-2 text-rose-200">
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--close-one] w-4 h-4 mt-0.5 flex-shrink-0 text-rose-300"></span>
                                                    Emails asking to verify domain details (common phishing)
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--close-one] w-4 h-4 mt-0.5 flex-shrink-0 text-rose-300"></span>
                                                    Unsolicited transfer authorization codes
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--close-one] w-4 h-4 mt-0.5 flex-shrink-0 text-rose-300"></span>
                                                    Unexpected renewal notices from unknown companies
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--close-one] w-4 h-4 mt-0.5 flex-shrink-0 text-rose-300"></span>
                                                    Pressure to act immediately on domain-related matters
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="management"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--setting] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Domain Management</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-200 mb-4">
                                            Effective Domain Portfolio Management
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--cloud-storage] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-emerald-300 text-lg">DNS Management</h4>
                                                </div>
                                                <ul className="space-y-3 text-emerald-200">
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Understand A, CNAME, MX, and TXT records
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Use reliable DNS providers (Cloudflare, AWS Route 53)
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Set appropriate TTL values for flexibility
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border border-emerald-800/50 rounded-2xl p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="icon-[icon-park-outline--calendar] text-emerald-400 w-5 h-5"></span>
                                                    <h4 className="font-bold text-emerald-300 text-lg">Renewal Management</h4>
                                                </div>
                                                <ul className="space-y-3 text-emerald-200">
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Create a domain renewal calendar
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Consolidate domains with fewer registrars
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="icon-[icon-park-outline--check-one] text-emerald-400 w-4 h-4 mt-0.5 flex-shrink-0"></span>
                                                        Review portfolio annually for unused domains
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-6 border border-stone-700">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="icon-[mdi--database] text-emerald-300 w-5 h-5"></span>
                                                <h4 className="font-bold text-emerald-100 text-lg">
                                                    Domain Portfolio Audit Checklist
                                                </h4>
                                            </div>
                                            <ul className="space-y-2 text-stone-300">
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-300"></span>
                                                    Verify all domains point to active websites or services
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-300"></span>
                                                    Check that auto-renewal is enabled for critical domains
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-300"></span>
                                                    Update contact information for all domains quarterly
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-300"></span>
                                                    Review and remove unused domains to save costs
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="icon-[icon-park-outline--check-one] w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-300"></span>
                                                    Ensure DNS records are properly configured
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="faq"
                            className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-950 rounded-2xl shadow-2xl border border-emerald-900/50 p-6 sm:p-8"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-900 to-emerald-800 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="icon-[icon-park-outline--help] text-emerald-400 w-6 h-6"></span>
                                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {
                                            question: 'How long does it take to register a domain?',
                                            answer: 'Domain registration is typically instant. Once you complete the registration process with a domain registrar, your domain is usually active within minutes. DNS propagation may take 24-48 hours to fully complete globally.'
                                        },
                                        {
                                            question: 'How much does a domain name cost?',
                                            answer: 'Domain prices vary by TLD and registrar. Common extensions like .com typically cost $10-$15 per year for registration, with renewals at $15-$20. Premium domains or newer TLDs may cost $20-$100+ per year. Watch for first-year discounts that increase on renewal.'
                                        },
                                        {
                                            question: 'Can I transfer my domain to another registrar?',
                                            answer: 'Yes, domains can be transferred between ICANN-accredited registrars. You must: 1) Unlock the domain, 2) Obtain authorization code, 3) Initiate transfer with new registrar, 4) Approve via email. Transfers typically take 5-7 days and extend registration by 1 year.'
                                        },
                                        {
                                            question: 'What is domain privacy protection?',
                                            answer: "Domain privacy (WHOIS privacy) protects your personal contact information from being publicly visible in the WHOIS database. It replaces your details with the registrar's proxy information. It's essential for preventing spam, scams, and identity theft."
                                        },
                                        {
                                            question: 'How long can I register a domain for?',
                                            answer: 'Domains can typically be registered for 1-10 years at a time, depending on the registrar and TLD. We recommend 2-3 year registrations for balance between commitment and flexibility. Some TLDs have maximum registration periods.'
                                        },
                                        {
                                            question: 'What happens when my domain expires?',
                                            answer: 'After expiration: 1) 0-30 days: Grace period (renew at standard rate), 2) 30-60 days: Redemption period (renew with additional fee), 3) 60+ days: Available for public registration. Enable auto-renewal to avoid this.'
                                        },
                                        {
                                            question: 'Can I change my domain name after registration?',
                                            answer: 'No, you cannot change an existing domain name. You must register a new domain and redirect the old one. Consider this during initial selection. You can update DNS settings, contact info, and nameservers anytime.'
                                        },
                                        {
                                            question: 'What are nameservers and DNS records?',
                                            answer: 'Nameservers tell the internet where your DNS records are stored. DNS records include: A (IP address), CNAME (alias), MX (email), TXT (verification). These control where your domain points and how email is routed.'
                                        }
                                    ].map((faq, index) => (
                                        <div
                                            key={index}
                                            className="group border border-stone-700 rounded-2xl overflow-hidden hover:border-emerald-700 transition-all duration-300"
                                        >
                                            <details className="group/open">
                                                <summary className="flex items-center justify-between p-5 cursor-pointer bg-stone-800 hover:bg-emerald-900/20 transition-all duration-300">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 flex items-center justify-center group-open:from-emerald-900 group-open:to-emerald-800 transition-all duration-300">
                                                            <span className="icon-[icon-park-outline--help] text-emerald-400 w-4 h-4 group-open:text-emerald-200 transition-all duration-300"></span>
                                                        </div>
                                                        <h3 className="font-semibold text-stone-200 group-open:text-emerald-300 transition-colors duration-300">
                                                            {faq.question}
                                                        </h3>
                                                    </div>
                                                    <span className="icon-[icon-park-outline--down] w-5 h-5 text-stone-400 group-open:rotate-180 group-open:text-emerald-400 transition-all duration-300"></span>
                                                </summary>
                                                <div className="p-5 bg-stone-800 border-t border-stone-700">
                                                    <p className="text-stone-300 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <CTABanner />
                        <CTAFloating />
                    </div>
                </div>
            </div>
        </div>
    );
}
