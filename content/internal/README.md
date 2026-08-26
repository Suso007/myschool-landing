# Vendored internal docs

`deployment.md` here is a copy of `~/Projects/School/DEPLOYMENT.md` — a doc that spans all four
sibling repos (backend, frontend, staffapp, studentapp), so it isn't part of any single one of
them and is vendored in the same way `content/legal/` vendors from `nextorg-legal`.

Rendered at `/admin/deployment` (password-gated, see `lib/docs-auth.ts`) via
`lib/deployment-docs.ts` + `components/admin-docs/`.

## Re-syncing after the source doc changes

```bash
cp ../DEPLOYMENT.md content/internal/deployment.md
```
