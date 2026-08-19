/**
 * Turns heading text into a URL-safe anchor id, e.g. "9. Cookies and local storage"
 * -> "9-cookies-and-local-storage". Pure — safe to import from client or server code.
 *
 * Kept deterministic (not github-slugger) so anchors like /privacy#11-security in
 * Footer.tsx stay predictable. If a legal doc's heading text changes, re-check any
 * hardcoded anchors that point at it.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
