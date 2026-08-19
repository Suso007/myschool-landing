import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Permanent_Marker, Kalam } from "next/font/google";
import { slugify } from "@/lib/slug";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

/**
 * Internal cross-doc links found inside the vendored markdown (e.g.
 * `./terms-of-service.md`) get remapped to real routes here. Anything relative
 * that ISN'T in this map (dpa.md, retention-schedule.md, ...) isn't published on
 * the site yet, so it's rendered as plain text instead of a dead link.
 */
const INTERNAL_LINK_MAP: Record<string, string> = {
    "./privacy-policy.md": "/privacy",
    "./terms-of-service.md": "/terms",
};

function resolveHref(href: string): { href: string; external: boolean } | null {
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return { href, external: false };
    }
    if (/^https?:\/\//.test(href)) {
        return { href, external: true };
    }
    const mapped = INTERNAL_LINK_MAP[href];
    if (mapped) {
        return { href: mapped, external: false };
    }
    return null; // Not published — render as plain text, not a link.
}

function headingText(children: React.ReactNode): string {
    return React.Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");
}

const components: Components = {
    h1: ({ children }) => {
        const text = headingText(children);
        return (
            <h2 id={slugify(text)} className={`${markerFont.className} scroll-mt-28 text-3xl md:text-4xl text-slate-900 mt-12 mb-4`}>
                {children}
            </h2>
        );
    },
    h2: ({ children }) => {
        const text = headingText(children);
        return (
            <h2
                id={slugify(text)}
                className={`${markerFont.className} scroll-mt-28 text-2xl md:text-3xl text-slate-900 mt-12 mb-4 relative inline-block group`}
            >
                <a href={`#${slugify(text)}`} className="no-underline text-inherit">
                    {children}
                </a>
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-[#d81b60] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </h2>
        );
    },
    h3: ({ children }) => {
        const text = headingText(children);
        return (
            <h3 id={slugify(text)} className={`${markerFont.className} scroll-mt-28 text-xl md:text-2xl text-slate-800 mt-8 mb-3`}>
                {children}
            </h3>
        );
    },
    p: ({ children }) => (
        <p className={`${handwrittenFont.className} text-lg text-slate-700 leading-relaxed mb-5`}>{children}</p>
    ),
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => (
        <ul className={`${handwrittenFont.className} text-lg text-slate-700 leading-relaxed mb-5 ml-6 list-disc marker:text-[#d81b60] space-y-2`}>
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className={`${handwrittenFont.className} text-lg text-slate-700 leading-relaxed mb-5 ml-6 list-decimal marker:text-[#d81b60] marker:font-bold space-y-2`}>
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    a: ({ href, children }) => {
        if (!href) return <>{children}</>;
        const resolved = resolveHref(href);
        if (!resolved) {
            // Unpublished internal doc reference — keep the label, drop the link.
            return <span className="italic text-slate-600">{children}</span>;
        }
        return (
            <a
                href={resolved.href}
                target={resolved.external ? "_blank" : undefined}
                rel={resolved.external ? "noopener noreferrer" : undefined}
                className="text-[#d81b60] font-bold underline decoration-wavy hover:text-slate-900 transition-colors"
            >
                {children}
            </a>
        );
    },
    blockquote: ({ children }) => (
        <blockquote
            className={`${handwrittenFont.className} text-lg text-slate-800 leading-relaxed my-8 max-w-md bg-amber-50 border-2 border-slate-800 custom-wiggle-border shadow-md px-6 py-5 -rotate-1`}
        >
            {children}
        </blockquote>
    ),
    hr: () => <div className="w-full h-px bg-slate-800 border-b border-dashed border-slate-400 opacity-30 my-10" />,
    code: ({ children }) => (
        <code className="font-mono text-sm bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-slate-800">{children}</code>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto mb-6 border-2 border-slate-800 custom-wiggle-border">
            <table className={`${handwrittenFont.className} w-full text-left border-collapse text-base`}>{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-900 text-white">{children}</thead>,
    th: ({ children }) => <th className={`${markerFont.className} px-4 py-3 font-normal tracking-wide`}>{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 text-slate-700 border-t border-slate-200 align-top">{children}</td>,
};

export function LegalDocument({ body }: { body: string }) {
    return (
        <div className="max-w-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
                {body}
            </ReactMarkdown>
        </div>
    );
}
