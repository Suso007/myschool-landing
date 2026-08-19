import React from "react";
import Link from "next/link";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { Permanent_Marker, Kalam } from "next/font/google";
import Header from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import type { LegalHeading } from "@/lib/legal";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

export function LegalPageShell({
    title,
    effectiveDate,
    lastUpdated,
    headings,
    children,
}: {
    title: string;
    effectiveDate: string | null;
    lastUpdated: string | null;
    headings: LegalHeading[];
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen flex-col" style={{ backgroundColor: "#f9faf8" }}>
            <Header />

            <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/"
                        className={`${handwrittenFont.className} inline-flex items-center gap-2 text-slate-600 font-bold hover:text-[#d81b60] transition-colors mb-8`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>

                    {/* Title block */}
                    <div className="mb-12 max-w-3xl">
                        <h1 className={`${markerFont.className} text-4xl md:text-6xl text-slate-900 mb-4`}>{title}</h1>
                        {(effectiveDate || lastUpdated) && (
                            <div className={`${handwrittenFont.className} flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-600 font-bold`}>
                                {effectiveDate && (
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarClock className="w-4 h-4 text-[#d81b60]" />
                                        Effective {effectiveDate}
                                    </span>
                                )}
                                {lastUpdated && lastUpdated !== effectiveDate && (
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarClock className="w-4 h-4 text-blue-700" />
                                        Last updated {lastUpdated}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
                        {/* Table of contents */}
                        {headings.length > 0 && (
                            <nav aria-label="Table of contents" className="hidden lg:block">
                                <div className="sticky top-28">
                                    <h2 className={`${markerFont.className} text-lg text-slate-900 mb-3`}>On this page</h2>
                                    <ul className="space-y-2 border-l-2 border-dashed border-slate-300 pl-4">
                                        {headings.map((h) => (
                                            <li key={h.slug}>
                                                <a
                                                    href={`#${h.slug}`}
                                                    className={`${handwrittenFont.className} text-sm text-slate-600 hover:text-[#d81b60] leading-snug block transition-colors`}
                                                >
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </nav>
                        )}

                        <article>{children}</article>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
