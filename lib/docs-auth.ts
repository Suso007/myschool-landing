import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Password gate for /admin/deployment. Deliberately stateless — no session table, no user
 * accounts, just one shared secret in DEPLOYMENT_DOCS_PASSWORD (.env). The cookie holds an
 * HMAC derived from the *current* password rather than the password itself, so:
 *
 *   - the raw password is never written to a cookie, logged, or sent back to the browser.
 *   - changing the password in .env invalidates every existing unlocked session for free —
 *     old cookies stop verifying the moment the env var changes, with nothing to revoke.
 *
 * This is proportionate for an internal, low-value target (a deployment runbook, not user
 * data or credentials) — not meant to hold up as real multi-user auth.
 */

const COOKIE_NAME = "deployment_docs_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function requirePassword(): string {
  const pw = process.env.DEPLOYMENT_DOCS_PASSWORD;
  if (!pw) {
    throw new Error(
      "DEPLOYMENT_DOCS_PASSWORD is not set. Add it to .env before /admin/deployment can be unlocked.",
    );
  }
  return pw;
}

/** Fixed-length (sha256) comparison either way, so there's no length-based branch to time. */
function constantTimeEquals(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function sessionToken(password: string): string {
  return crypto.createHmac("sha256", password).update("deployment-docs-session-v1").digest("hex");
}

export function verifyPassword(candidate: string): boolean {
  return constantTimeEquals(candidate, requirePassword());
}

export async function isUnlocked(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  try {
    return constantTimeEquals(value, sessionToken(requirePassword()));
  } catch {
    return false; // DEPLOYMENT_DOCS_PASSWORD unset — never treat that as "unlocked".
  }
}

export async function grantSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(requirePassword()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
