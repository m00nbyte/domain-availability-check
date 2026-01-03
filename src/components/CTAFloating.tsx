import Link from 'next/link';

export default function CTAFloating() {
    return (
        <Link
            href="https://moonbyte.at/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 animate-fade-in group cursor-pointer"
        >
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-full pl-3 pr-4 py-2 shadow-lg border border-emerald-700">
                <div className="flex items-center gap-2 text-white font-medium group-hover:text-emerald-100 transition-colors ">
                    <span className="icon-[mdi--help-circle-outline] text-lg"></span>
                    <span className="hidden sm:inline text-sm">Need Help?</span>
                </div>
            </div>
        </Link>
    );
}
