"use client";

import { Link2 } from "lucide-react";

export function HeadingAnchor({ slug }: { slug: string }) {
    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${slug}`;
        navigator.clipboard?.writeText(url).catch(() => {});
        window.history.replaceState(null, "", `#${slug}`);
    }

    return (
        <a
            href={`#${slug}`}
            onClick={handleClick}
            aria-label="Copy link to this section"
            className="ml-2 inline-flex opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
            <Link2 className="size-4 text-muted-foreground/60 hover:text-foreground" />
        </a>
    );
}
