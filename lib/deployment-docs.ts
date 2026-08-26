import fs from "node:fs";
import path from "node:path";
import { slugify } from "@/lib/slug";

/**
 * Loads the vendored deployment runbook from content/internal/deployment.md.
 *
 * Source of truth is `~/Projects/School/DEPLOYMENT.md` (a sibling-repo-spanning doc, one
 * level above every checkout — it isn't part of any single repo). Vendored in here the same
 * way content/legal/ vendors from nextorg-legal, so this site still builds standalone.
 * Re-sync after the source changes:
 *
 *   cp ../DEPLOYMENT.md content/internal/deployment.md
 *
 * Rendered at /admin/deployment (password-gated, see lib/docs-auth.ts) via this file +
 * components/admin-docs/.
 */

const DOC_PATH = path.join(process.cwd(), "content", "internal", "deployment.md");

export interface DeploymentDocHeading {
  depth: 2 | 3;
  text: string;
  slug: string;
}

export interface DeploymentDoc {
  title: string;
  /** Markdown body with the H1 title stripped out (the page renders its own title). */
  body: string;
  headings: DeploymentDocHeading[];
  lastUpdated: Date;
}

export function loadDeploymentDoc(): DeploymentDoc {
  const raw = fs.readFileSync(DOC_PATH, "utf8");
  const stat = fs.statSync(DOC_PATH);

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const body = raw.replace(/^#\s+.+\n/, "").trim();

  // Only ## and ### become TOC entries — #### (e.g. inside collapsed <details> blocks) would
  // clutter a sidebar meant for skimming, not the whole outline.
  const headings: DeploymentDocHeading[] = [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => {
    const text = m[2].trim();
    return { depth: m[1].length as 2 | 3, text, slug: slugify(text) };
  });

  return {
    title: titleMatch ? titleMatch[1].trim() : "Deployment",
    body,
    headings,
    lastUpdated: stat.mtime,
  };
}
