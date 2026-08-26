import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/slug";
import { CodeBlock } from "./CodeBlock";
import { HeadingAnchor } from "./HeadingAnchor";

function headingText(children: React.ReactNode): string {
    return React.Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");
}

const components: Components = {
    h2: ({ children }) => {
        const text = headingText(children);
        const slug = slugify(text);
        return (
            <h2 id={slug} className="group scroll-mt-24 border-b border-border pb-2.5 mt-14 mb-4 flex items-center text-2xl font-semibold tracking-tight text-foreground first:mt-0">
                {children}
                <HeadingAnchor slug={slug} />
            </h2>
        );
    },
    h3: ({ children }) => {
        const text = headingText(children);
        const slug = slugify(text);
        return (
            <h3 id={slug} className="group scroll-mt-24 mt-10 mb-3 flex items-center text-lg font-semibold tracking-tight text-foreground">
                {children}
                <HeadingAnchor slug={slug} />
            </h3>
        );
    },
    p: ({ children }) => <p className="mb-4 leading-7 text-[15px] text-foreground/85">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    ul: ({ children }) => <ul className="mb-4 ml-1 space-y-1.5 text-[15px] text-foreground/85">{children}</ul>,
    ol: ({ children }) => (
        <ol className="mb-4 ml-1 list-decimal space-y-2 pl-5 text-[15px] text-foreground/85 marker:font-mono marker:text-xs marker:text-emerald-600 dark:marker:text-emerald-400">
            {children}
        </ol>
    ),
    li: ({ children, className }) => {
        const isTask = typeof className === "string" && className.includes("task-list-item");
        return (
            <li className={isTask ? "flex items-start gap-2.5 pl-0 leading-7 [&>input]:mt-1.5" : "flex gap-2.5 pl-0 leading-7"}>
                {!isTask && <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-emerald-500/70" />}
                <span>{children}</span>
            </li>
        );
    },
    input: ({ checked, disabled }) => (
        <input
            type="checkbox"
            checked={Boolean(checked)}
            disabled={disabled}
            readOnly
            className="size-4 shrink-0 rounded border-border accent-emerald-600"
        />
    ),
    a: ({ href, children }) => {
        if (!href) return <>{children}</>;
        const external = /^https?:\/\//.test(href);
        return (
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-2 transition-colors hover:decoration-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:decoration-emerald-400"
            >
                {children}
            </a>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="my-5 rounded-r-lg border-l-2 border-emerald-500/60 bg-emerald-500/[0.06] py-2.5 pl-4 pr-4 text-[15px] text-foreground/80 [&>p]:mb-0">
            {children}
        </blockquote>
    ),
    hr: () => <hr className="my-10 border-border" />,
    code: ({ className, children }) => {
        const isBlock = typeof className === "string" && className.startsWith("language-");
        if (!isBlock) {
            return (
                <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                    {children}
                </code>
            );
        }
        const lang = className!.replace("language-", "");
        const text = String(children).replace(/\n$/, "");
        return <CodeBlock lang={lang} code={text} />;
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => (
        <div className="my-5 overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
    th: ({ children }) => (
        <th className="border-b border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="border-b border-border/60 px-4 py-2.5 align-top text-foreground/80 last:border-b-0 [tr:last-child_&]:border-b-0">
            {children}
        </td>
    ),
    tr: ({ children }) => <tr className="even:bg-muted/25">{children}</tr>,
};

export function MarkdownContent({ body }: { body: string }) {
    return (
        <div className="max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {body}
            </ReactMarkdown>
        </div>
    );
}
