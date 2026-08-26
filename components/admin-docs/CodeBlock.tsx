"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard API can be unavailable (permissions, non-secure context) — the code is
            // still fully selectable/readable, so failing silently here is fine.
        }
    }

    return (
        <div className="group/code relative my-5 overflow-hidden rounded-xl border border-border bg-[#0d1117] shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/35">
                    {lang || "text"}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-white/45 opacity-0 transition-all hover:bg-white/10 hover:text-white/90 group-hover/code:opacity-100 focus-visible:opacity-100"
                >
                    {copied ? (
                        <>
                            <Check className="size-3.5 text-emerald-400" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="size-3.5" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
                <code className="font-mono text-white/85">{code}</code>
            </pre>
        </div>
    );
}
