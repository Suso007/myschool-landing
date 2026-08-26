"use server";

import { verifyPassword, grantSession, clearSession } from "@/lib/docs-auth";

export interface UnlockState {
  error?: string;
}

export async function unlockAction(_prevState: UnlockState, formData: FormData): Promise<UnlockState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter the password." };

  let valid: boolean;
  try {
    valid = verifyPassword(password);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Server misconfigured." };
  }

  if (!valid) return { error: "Wrong password." };

  await grantSession();
  return {};
}

export async function lockAction(): Promise<void> {
  await clearSession();
}
