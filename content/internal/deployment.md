# Client deployment runbook — web app through mobile apps

Full steps to take a client from "backend is live" to "web app, staff app and student app are
all built and branded for them." Lives at the top of `~/Projects/School/` (not inside any single
repo — this directory isn't a git repo) because it spans four sibling checkouts:
`my-school-backend`, `my-school-frontend`, `my-school-staffapp`, `my-school-studentapp`.

**Scope:** this covers the web app deployment through the mobile app builds — the two legs that
have real tooling. It does **not** cover provisioning the client's cloud footprint (AWS/GCP,
Firebase, the backend's own `.env`) or getting the backend running on the shared box — that's a
separate, mostly-manual pipeline documented in full at
`my-school-backend/docs/client-onboarding.md`. Treat "the backend is already live at
`api<prefix>.nextorg.in`" as this document's precondition, checked in step 0.

Worked example throughout: **`myschool`** / **Silver Oak Public School** — a real run, done
2026-08-24, values shown are its actual output (not placeholders) unless marked otherwise.

---

## Overview

| Leg | Tool | Repo |
|---|---|---|
| 0. Backend cloud footprint + box deployment | `pnpm client:new` + manual steps | `my-school-backend` |
| 1. Web app (Vercel) | `pnpm deployment new` | `my-school-frontend` |
| 2. Staff app (Android, EAS) | `pnpm client:new` + `eas build` | `my-school-staffapp` |
| 3. Student app (Android, EAS) | `pnpm client:new` + `eas build` | `my-school-studentapp` |

Legs 1–3 are what this document walks through. Every step below assumes you're in the relevant
repo's root unless said otherwise.

---

## Step 0 — Confirm the backend is live

Before touching the frontend, the client's backend must already be answering at its own
subdomain (see `my-school-backend/docs/client-onboarding.md` for provisioning it — Terraform
apply, box container, DNS, nginx proxy host — none of that is repeated here).

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://api<prefix>.nextorg.in/health
# expect: 200
```

If this doesn't return `200`, stop — nothing past this point can succeed without it (the web
app's `.env` and both mobile apps' `.env` all point straight at this host).

---

## Step 1 — Deploy the web app to Vercel

```bash
cd my-school-frontend
pnpm deployment new --prefix <prefix>
```

One-time setup (already done in this checkout — only relevant if starting from a fresh clone):
`scripts/secrets.env` (gitignored) needs `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, `GITHUB_OWNER`,
`SOURCE_REPO`, `ROOT_DOMAIN` at minimum; `NEXT_PUBLIC_SENTRY_DSN`/`SENTRY_ORG`/`SENTRY_PROJECT`/
`SENTRY_AUTH_TOKEN` are optional (Sentry source-map upload just no-ops without them).

### What it asks / does, in order

The CLI is `collect → env → repo → project → envVars → deploy → domain → dns` (8 steps,
resumable — re-running with the same `--prefix` offers **Resume** instead of starting over).

1. **Client details** — prefix (DNS-label-safe: lowercase, starts with a letter, 2–20 chars, no
   `--`), then whether to deploy from the shared repo (`same` — one codebase, every client gets
   the next push) or a private per-client copy (`copy` — one commit, diverges from upstream).
   Derives everything else from the prefix: web domain `<prefix>.nextorg.in`, backend
   `api<prefix>.nextorg.in`, Vercel project `<prefix>-webapp`, S3 bucket
   `myschool-<prefix>.s3.ap-south-1.amazonaws.com` (confirmed against the backend's actual
   Terraform-created bucket in step 2 — override with `--s3-host` if it doesn't follow the
   convention, e.g. wrong region or a hand-created bucket).
2. **Env** — writes `.env` for the deployment (GraphQL endpoint, backend URL, school name
   fallback, S3 public host, Sentry).
3. **Repo** — creates or reuses the GitHub repo per the chosen repo mode.
4. **Project** — creates the Vercel project.
5. **Env vars** — pushes the `.env` values onto the Vercel project.
6. **Deploy** — triggers the build.
7. **Domain** — attaches `<prefix>.nextorg.in` to the Vercel project, requests the domain
   verification record.
8. **DNS** — writes `scripts/deployed/<prefix>/domain-setup.md` with the exact record to add.
   **DNS itself is manual** — this step never touches Cloudflare.

### Example output (myschool)

```
scripts/deployed/myschool/
├── deployment.json      # resumable state — status, ids, urls for every step above
├── .env                 # local record of what was pushed to Vercel (editing it does nothing)
├── domain-setup.md       # the DNS record to add, generated fresh each run
├── dns.txt
└── google-services.json  # dropped in by hand this run — see step 3 below
```

`domain-setup.md`'s actual content for myschool:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| CNAME | `myschool` | `eda64bc16a37edfb.vercel-dns-017.com.` | **DNS only** (grey cloud) |
| TXT | `_vercel.nextorg.in` | `vc-domain-verify=myschool.nextorg.in,...` | DNS only |

**The Cloudflare proxy must be off (grey cloud)** for the web app's CNAME — an orange-cloud
record blocks Vercel's ACME challenge and TLS issuance fails. This is the opposite of
`api<prefix>.nextorg.in`, which *is* proxied (orange cloud) — don't copy that setting over by
habit.

```bash
dig +short <prefix>.nextorg.in
curl -sSI https://<prefix>.nextorg.in | head -1
```

Propagation is usually under a minute on Cloudflare; Vercel issues the certificate automatically
once the record resolves and the project's Domains tab shows **Valid Configuration**.

### Other commands

```bash
pnpm deployment list --prefix <prefix>     # list this client's Vercel deployments
pnpm deployment delete --prefix <prefix>   # pick one and remove it (project deletion is a
                                            # separate, explicit follow-up question — never
                                            # implied by --yes)
```

---

## Step 2 — Gather the client's branding assets

Everything the mobile apps need that isn't already implied by the prefix:

| Asset | Where it comes from |
|---|---|
| `google-services.json` | Generated once, per client, by the backend's `pnpm client:new` (`my-school-backend/secrets/<prefix>/google-services.json`) — one file, covers both the staff and student Android app registrations. Back it up when it's generated; it isn't kept in this checkout's `secrets/` afterward. |
| `adaptive-icon.png`, `splash-icon-light.png` (1024×1024 PNG) | The client's logo. `splash-icon-dark.png` is optional — copied along if present, not currently wired into either app's `app.json` splash config. |
| School's full official name | Ask the client. Nothing else about the mobile onboarding needs guessing at real-world data — every other field in `lib/statics.ts` (registration number, school code, address, established year) is unused in both apps' UI today, confirmed by grep, so there's nothing else to chase down. |
| `adi-registration.properties` (optional at this stage) | Play Console's ownership-verification token for this client's app. **Doesn't exist yet for a brand-new client** — it's only issued once the client has a Play Console app listing (step 6), which itself needs a first build to exist. Skip it for now — `client:new` will ask (or take `--no-adi-registration`) and, told there's none yet, removes the plugin that requires it rather than shipping a previous client's stale one. See step 6. |

**Convenient drop point:** `my-school-frontend/scripts/deployed/<prefix>/` — both mobile apps'
`pnpm client:new --assets-dir` searches its target directory recursively for the three filenames
above, so dropping everything into that same per-client folder from step 1 (subfolder name
doesn't matter — `assets/`, a misspelled `asstes/`, whatever) means one `--assets-dir` argument
works for both apps with zero renaming.

---

## Step 3 — Configure + build the staff app

```bash
cd my-school-staffapp
pnpm client:new --prefix <prefix> --school-name "<Full School Name>" \
  --assets-dir /path/to/my-school-frontend/scripts/deployed/<prefix>
```

`pnpm client:new --help` for the full flag list (`--base-domain`, `--brand-color`,
`--skip-eas-init`, `--reinit-eas`, `--adi-token`, `--no-adi-registration`, `-y/--yes`). What it
does, in order — see `my-school-staffapp/CLAUDE.md`'s "White-labelling a school" section for the
full rationale:

1. Validates `--prefix` (lowercase, starts with a letter, ≤ 21 chars, not a Java/Kotlin
   reserved word — it becomes an Android package segment) and confirms `google-services.json`
   actually contains a client for the target package (`com.myschool.<prefix>.staff`) — a
   mismatch here fails Gradle later with "No matching client found," better caught now.
2. Resolves the Play Console ownership token (`adi-registration.properties`, see step 2 and
   step 6): found under `--assets-dir` → used as-is. Otherwise `--adi-token "<token>"` /
   `--no-adi-registration` say explicitly, or — running interactively with neither flag and no
   `--yes` — it asks. Going without one removes `withAdiRegistration` from `app.json`'s
   `plugins` rather than silently shipping a previous client's token; it's put back
   automatically the moment a real one is available.
3. Forks (or resumes) `client/<prefix>` off `main`. `main` always stays whatever client it was
   last configured for and remains buildable — onboarding a new client never touches it.
4. Copies the icon/splash PNGs into `assets/icons/`, `google-services.json` into
   `credentials/<prefix>/google-services.json`, and the resolved token (if any) into
   `assets/adi-registration.properties`.
5. Rewrites `app.json`: `name`, `slug` (`<prefix>-staff` — this is what names the EAS project),
   `scheme`, `android.package`/`ios.bundleIdentifier`, `android.googleServicesFile`, adaptive-icon
   and splash background color, the camera/location permission strings, the `plugins` array per
   step 2 above, and clears `extra.eas.projectId` (a stale id makes `eas init` short-circuit as
   "already linked").
6. Writes `.env`: per-client `EXPO_PUBLIC_GRAPHQL_ENDPOINT`/`EXPO_PUBLIC_BACKEND_URL`
   (`api<prefix>.nextorg.in/staff`, `.../` respectively — **each client has its own isolated
   backend**, this is never shared) and `EXPO_PUBLIC_SCHOOL_NAME`; carries over
   `EXPO_PUBLIC_SENTRY_DSN`/`SENTRY_AUTH_TOKEN` unchanged (one shared Sentry project across every
   client for this app).
7. Runs `eas init --non-interactive --force`, creating `@nextorg/<prefix>-staff` and writing the
   new project id back into `app.json` itself. Skipped automatically on a re-run once a project
   id is already recorded for that prefix (avoids accumulating duplicate EAS projects) — force
   one anyway with `--reinit-eas`.
8. **Pushes `.env` to EAS itself** (`eas env:push preview --path .env --force`, then
   `production`). This step is easy to assume is unnecessary and isn't: a cloud `eas build` runs
   on a fresh checkout on Expo's own infra — it never sees this repo's local `.env`. Metro only
   inlines `EXPO_PUBLIC_*` values at bundle time from what's set **on the EAS project**, per
   environment (`eas env:pull <environment>` to verify what's actually there). Skip this (or
   `--skip-eas-init`, which skips both this and `eas init`) and the built app talks to nothing —
   not the wrong client, just an undefined endpoint.

### Build

```bash
eas build --platform android --profile preview      # shareable APK, internal distribution/QR
eas build --platform android --profile production   # AAB, for the Play Store
```

Android only, in practice — EAS generates a keystore non-interactively for a new project, but
iOS needs existing Apple credentials it doesn't have yet (`MissingCredentialsNonInteractiveError`
without them). `ios.bundleIdentifier` is still set, ready for whenever that's wired up.

---

## Step 4 — Configure + build the student app

Identical shape, sibling repo, `student` instead of `staff` throughout:

```bash
cd my-school-studentapp
pnpm client:new --prefix <prefix> --school-name "<Full School Name>" \
  --assets-dir /path/to/my-school-frontend/scripts/deployed/<prefix>

eas build --platform android --profile preview
eas build --platform android --profile production
```

One difference worth knowing: this app's `expo-image-picker` permission strings already use
Expo's `$(PRODUCT_NAME)` placeholder rather than a hardcoded brand name, so the script has
nothing to template there (the staff app's do need templating, since they're hardcoded text).

---

## Step 5 — Review and commit

Neither `client:new` script commits anything. Review the diff in each repo — it mixes two kinds
of change the first time this runs for a brand-new `main`:

- **Durable tooling** (belongs on `main`): `lib/statics.ts`, `scripts/*`, `CLAUDE.md`, and in the
  student app `app/(auth)/login.tsx`/`app/(tabs)/support.tsx`.
- **This client's data** (belongs on the `client/<prefix>` branch): `app.json`,
  `assets/icons/*.png`, `credentials/<prefix>/`.

For a repo where the tooling is already on `main` (i.e. every run after the first), the
`client/<prefix>` branch diff is just the client-specific files — commit and push it directly:

```bash
git add -A
git commit -m "🔥 feat: onboard <prefix> (staff)"   # "(student)" in the other repo
git push -u origin client/<prefix>
```

`.env` and `credentials/` stay gitignored in both repos either way — confirmed, never at risk of
being committed by this flow.

---

## Step 6 — Distribute / Play Store (manual gate)

`eas build --profile preview` produces an internal-distribution APK with an install link/QR —
enough to hand a client a working app immediately, no store involved.

Getting onto the Play Store has a real manual step in the middle that nothing here automates:
Google's Play Developer API cannot publish to an app that has never had a manual upload, so the
**first** AAB for a new client has to be uploaded by hand once, through the Play Console, before
`eas submit` can ever be used for that app. See `MOBILE-APP-DEPLOYMENT-PLAN.md` (in
`my-school-frontend`) §2 and §9.2 for the full lifecycle and the exact checklist copy this
implies — that document also covers the not-yet-built `/apps` page that would eventually surface
build status and this checklist in the web app itself, which nothing in this runbook depends on.

One more thing worth knowing before running `eas submit` for real: `eas.json`'s
`submit.production.android.serviceAccountKeyPath` currently points at a placeholder path
(`./credentials/bass/play-store-service-account.json`) that isn't a real Play service-account
key — this is a real, still-open gap in both apps' `eas.json`, not something `client:new` sets up
per client.

**`assets/adi-registration.properties`** (both apps) is the other piece this unlocks. It's a
Google-issued ownership-verification token, copied into the native build by
`plugins/withAdiRegistration.js`, which throws if the file is *missing*. `client:new` resolves it
in step 3/4 — found under `--assets-dir` → used as-is; otherwise it asks (or takes `--adi-token`/
`--no-adi-registration`), and going without one *removes* the plugin from `app.json`'s `plugins`
rather than silently inheriting a previous client's real token. Once this client has its Play
Console listing and its own token: drop `adi-registration.properties` alongside the other assets
in `scripts/deployed/<prefix>/` and re-run `pnpm client:new` — it puts the plugin back and wires
the real token in.

---

## Verification checklist

- [ ] `https://api<prefix>.nextorg.in/health` → `200` (step 0)
- [ ] `https://<prefix>.nextorg.in` loads, shows the client's own logo/name, TLS valid
- [ ] Web app's org logo actually renders (not a placeholder icon) — confirms the S3 host
      convention held; if not, re-check `--s3-host`
- [ ] `expo.dev` project pages exist: `@nextorg/<prefix>-staff`, `@nextorg/<prefix>-student`
- [ ] `eas env:pull preview --path /tmp/check.env && cat /tmp/check.env` (each app) shows this
      client's own `EXPO_PUBLIC_GRAPHQL_ENDPOINT`/`EXPO_PUBLIC_SCHOOL_NAME`, not a previous
      client's or blank
- [ ] Preview APK installs and its login screen shows the client's own logo + school name
- [ ] Login actually authenticates against `api<prefix>.nextorg.in` (not another client's data —
      double-check `.env` if this fails silently)
- [ ] `main` in both mobile repos still builds the *previous* client untouched

---

## Command reference (everything above, in one place)

```bash
# 0 — backend already live (my-school-backend/docs/client-onboarding.md)
curl -sS -o /dev/null -w "%{http_code}\n" https://api<prefix>.nextorg.in/health

# 1 — web app
cd my-school-frontend
pnpm deployment new --prefix <prefix>
pnpm deployment list --prefix <prefix>
pnpm deployment delete --prefix <prefix>

# 2 — gather google-services.json + logo + school name into
#     my-school-frontend/scripts/deployed/<prefix>/

# 3 — staff app
cd ../my-school-staffapp
pnpm client:new --prefix <prefix> --school-name "<Full School Name>" \
  --assets-dir ../my-school-frontend/scripts/deployed/<prefix>
eas build --platform android --profile preview
eas build --platform android --profile production
git add -A && git commit -m "🔥 feat: onboard <prefix> (staff)" && git push -u origin client/<prefix>

# 4 — student app
cd ../my-school-studentapp
pnpm client:new --prefix <prefix> --school-name "<Full School Name>" \
  --assets-dir ../my-school-frontend/scripts/deployed/<prefix>
eas build --platform android --profile preview
eas build --platform android --profile production
git add -A && git commit -m "🔥 feat: onboard <prefix> (student)" && git push -u origin client/<prefix>
```
