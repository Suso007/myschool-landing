# Vendored legal content

`privacy-policy.md` and `terms-of-service.md` here are copies of the same-named
files in the sibling [`nextorg-legal`](../../../nextorg-legal) repo, which is the
**source of truth**. They're vendored in (rather than read cross-repo at build
time) so this site builds standalone on Vercel/CI without needing that private
repo checked out alongside it.

Rendered at `/privacy` and `/terms` via `lib/legal.ts` + `components/legal/`.

## Re-syncing after the source docs change

```bash
cp ../nextorg-legal/privacy-policy.md content/legal/privacy-policy.md
cp ../nextorg-legal/terms-of-service.md content/legal/terms-of-service.md
```

## Placeholder status (as of the last sync, August 19, 2026)

- Effective date / Last updated — resolved, set to August 19, 2026 on both documents.
- Grievance Officer (privacy-policy.md §13) — resolved: Mrinal Biswas, info@nextorg.in.
  Designation and Address were dropped from that block per owner direction (name/email only).

## If more legal docs get published later

Only `privacy-policy.md` and `terms-of-service.md` are wired up. If
`sub-processors.md`, `retention-schedule.md`, `dpa.md`, `msa.md`,
`pilot-mou.md`, or `parental-consent-form.md` are ever published here too:

1. Copy the file into this folder.
2. Add its slug to `LegalSlug` in `../../lib/legal.ts`.
3. Add a route under `app/legal/<slug>/page.tsx` (or `app/<slug>/page.tsx`), same
   pattern as `app/privacy/page.tsx`.
4. Add its entry to `INTERNAL_LINK_MAP` in `../../components/legal/LegalDocument.tsx`
   so cross-links between docs (e.g. Privacy Policy → Retention Schedule) turn
   into real links instead of plain text.

`issues.md` in `nextorg-legal` is internal-only and must never be published here.
