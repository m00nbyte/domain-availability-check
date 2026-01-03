// src/app/layout.tsx

import '@/styles/global.sass';

import type { Metadata } from 'next';
import { Fira_Mono, Fira_Sans } from 'next/font/google';
import Link from 'next/link';

import CTABanner from '@/components/CTABanner';

const firaSans = Fira_Sans({
    weight: '500',
    variable: '--font-fira-sans',
    subsets: ['latin']
});

const firaMono = Fira_Mono({
    weight: '500',
    variable: '--font-fira-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Domain Availability Check',
    description: 'Check domain availability across hundreds of TLDs instantly using DNS lookup',
    icons: {
        icon: [{ url: '/favicon.ico' }],
        apple: [{ url: '/apple-icon.png' }],
        other: [
            {
                rel: 'icon',
                url: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                rel: 'icon',
                url: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`bg-stone-900 text-stone-100 ${firaSans.className} ${firaMono.variable} h-full flex flex-col`}>
                <main className="flex-grow">{children}</main>
                <CTABanner variant="float" message="Need Help?" className="mt-2" />
                <footer className="bg-stone-900 border-t border-stone-800 py-8 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-400">
                        <p>
                            &copy; {new Date().getFullYear()} by{' '}
                            <Link
                                href="https://moonbyte.at/"
                                target="_blank"
                                className="underline text-emerald-400 hover:text-emerald-300"
                            >
                                m00nbyte
                            </Link>
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
