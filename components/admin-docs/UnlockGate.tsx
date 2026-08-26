"use client";

import { useActionState, useEffect, useRef } from "react";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";
import { unlockAction, type UnlockState } from "@/app/admin/deployment/actions";

const initialState: UnlockState = {};

export function UnlockGate() {
    const [state, formAction, pending] = useActionState(unlockAction, initialState);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.error) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [state.error]);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0c10] px-4 py-16">
            {/* Faint grid + glow — deliberately distinct from the marketing site's paper/desk
                theme: this is an internal tool, not a brand surface. */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

            <div className="relative w-full max-w-sm">
                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                        <Lock className="size-5 text-emerald-400" strokeWidth={1.75} />
                    </div>
                    <div>
                        <h1 className="font-mono text-lg font-medium tracking-tight text-white">
                            Deployment docs
                        </h1>
                        <p className="mt-1 text-sm text-white/40">Internal — password required</p>
                    </div>
                </div>

                <form action={formAction} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
                    <label htmlFor="password" className="mb-2 block font-mono text-xs uppercase tracking-wider text-white/40">
                        Password
                    </label>
                    <input
                        ref={inputRef}
                        id="password"
                        name="password"
                        type="password"
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                        disabled={pending}
                        aria-invalid={Boolean(state.error)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 aria-invalid:border-red-500/50 aria-invalid:ring-2 aria-invalid:ring-red-500/20"
                        placeholder="••••••••••••"
                    />

                    {state.error && (
                        <p role="alert" className="mt-2.5 text-sm text-red-400">
                            {state.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {pending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Checking…
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="size-4" />
                                Unlock
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center font-mono text-xs text-white/25">
                    my-school-backend · my-school-frontend · my-school-staffapp · my-school-studentapp
                </p>
            </div>
        </main>
    );
}
