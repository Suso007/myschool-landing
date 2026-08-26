"use client";

import { useEffect, useState } from "react";
import { LayoutList, LockKeyhole, Rocket } from "lucide-react";
import type { DeploymentDocHeading } from "@/lib/deployment-docs";
import { lockAction } from "@/app/admin/deployment/actions";

function Toc({ headings, activeSlug }: { headings: DeploymentDocHeading[]; activeSlug: string | null }) {
    return (
        <ul className="space-y-0.5 border-l border-border pl-4">
            {headings.map((h) => (
                <li key={h.slug} className={h.depth === 3 ? "ml-3" : ""}>
                    <a
                        href={`#${h.slug}`}
                        className={`block truncate rounded-md py-1 pl-2.5 text-[13px] leading-snug transition-colors ${
                            activeSlug === h.slug
                                ? "-ml-px border-l-2 border-emerald-500 bg-emerald-500/[0.07] font-medium text-emerald-700 dark:text-emerald-400"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {h.text}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function DocsShell({
    title,
    headings,
    lastUpdated,
    children,
}: {
    title: string;
    headings: DeploymentDocHeading[];
    lastUpdated: string;
    children: React.ReactNode;
}) {
    const [activeSlug, setActiveSlug] = useState<string | null>(null);

    useEffect(() => {
        const targets = headings
            .map((h) => document.getElementById(h.slug))
            .filter((el): el is HTMLElement => el !== null);
        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // The heading closest to (but still above/at) the top of the viewport's
                // "reading line" wins — not just whichever fired last, which flickers when
                // several headings are visible in a short scroll.
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length === 0) return;
                const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
                setActiveSlug(top.target.id);
            },
            { rootMargin: "-72px 0px -70% 0px", threshold: 0 },
        );
        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, [headings]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5">
                    <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-md bg-emerald-500/10">
                            <Rocket className="size-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="font-mono text-sm font-medium">{title}</span>
                        <span className="hidden rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
                            internal
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                            updated {lastUpdated}
                        </span>
                        <form action={lockAction}>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
                            >
                                <LockKeyhole className="size-3.5" />
                                Lock
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-[1400px] items-start gap-10 px-5 py-10">
                <nav aria-label="Table of contents" className="sticky top-24 hidden w-56 shrink-0 xl:block">
                    <div className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <LayoutList className="size-3.5" />
                        On this page
                    </div>
                    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
                        <Toc headings={headings} activeSlug={activeSlug} />
                    </div>
                </nav>

                <main className="min-w-0 flex-1 pb-24">
                    {/* Mobile/tablet fallback — the sticky sidebar above is xl+ only. */}
                    {headings.length > 0 && (
                        <details className="mb-8 rounded-lg border border-border xl:hidden">
                            <summary className="cursor-pointer select-none px-4 py-2.5 text-sm font-medium">
                                On this page
                            </summary>
                            <div className="border-t border-border px-4 py-3">
                                <Toc headings={headings} activeSlug={activeSlug} />
                            </div>
                        </details>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
