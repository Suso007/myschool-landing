import fs from "node:fs";
import path from "node:path";
import { slugify } from "@/lib/slug";

/**
 * Loads vendored legal documents from content/legal/.
 *
 * Source of truth is the sibling `nextorg-legal` repo — these files are a vendored
 * copy so the site can render them without a cross-repo build dependency. Re-copy
 * from there (see content/legal/README.md) whenever the source docs change.
 *
 * Server-only (uses node:fs) — import this from Server Components/pages, never from
 * a "use client" file.
 */

export type LegalSlug = "privacy-policy" | "terms-of-service";

export interface LegalDoc {
  title: string;
  effectiveDate: string | null;
  lastUpdated: string | null;
  /** Markdown body with the H1 title and effective/last-updated lines stripped out. */
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "legal");

export function loadLegalDoc(slug: LegalSlug): LegalDoc {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const effectiveMatch = raw.match(/^\*\*Effective date:\*\*\s*(.+)$/m);
  const lastUpdatedMatch = raw.match(/^\*\*Last updated:\*\*\s*(.+)$/m);

  const body = raw
    .replace(/^#\s+.+\n/, "")
    .replace(/^\*\*Effective date:\*\*.*\n/m, "")
    .replace(/^\*\*Last updated:\*\*.*\n/m, "")
    .trim();

  return {
    title: titleMatch ? titleMatch[1].trim() : slug,
    effectiveDate: effectiveMatch ? effectiveMatch[1].trim() : null,
    lastUpdated: lastUpdatedMatch ? lastUpdatedMatch[1].trim() : null,
    body,
  };
}

export interface LegalHeading {
  text: string;
  slug: string;
}

/** Top-level (`## `) section headings, for a "jump to section" table of contents. */
export function extractHeadings(body: string): LegalHeading[] {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => ({ text: m[1].trim(), slug: slugify(m[1].trim()) }));
}
