"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="ambient-dark min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 flex flex-col items-center gap-6 w-full max-w-sm">

        {/* App name / logo */}
        <h1 className="text-2xl font-extrabold text-white">Mythos Atlas</h1>
        <p className="text-sm text-slate-400 text-center">
          Sign in to keep your dream journal and explore mythological parallels.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dream-journal" })}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Demo account */}
        <button
          onClick={() => signIn("demo", { callbackUrl: "/dream-journal" })}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-violet-500/40 bg-violet-600/10 px-5 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-600/20 hover:border-violet-500/60"
        >
          ✦ Continue as Demo
        </button>
        <p className="text-xs text-slate-500 text-center -mt-3">
          Explore the full app as a pre-made account — no sign-up required.
        </p>

      </div>
    </div>
  );
}

