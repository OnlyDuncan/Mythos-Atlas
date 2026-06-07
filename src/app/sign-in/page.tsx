// TODO: this needs to be a client component — add the directive

// TODO: import signIn from the CLIENT-side next-auth package (next-auth/react)

export default function SignInPage() {
  return (
    <div className="ambient-dark min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 flex flex-col items-center gap-6 w-full max-w-sm">

        {/* App name / logo */}
        <h1 className="text-2xl font-extrabold text-white">Mythos Atlas</h1>
        <p className="text-sm text-slate-400 text-center">
          Sign in to keep your dream journal and explore mythological parallels.
        </p>

        {/* TODO: add a button that calls signIn with:
              - "google" as the first argument (the provider)
              - an options object with callbackUrl set to "/dream-journal"
        */}
        <button
          onClick={() => {/* your signIn call goes here */}}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {/* TODO: optionally add a Google icon here */}
          Sign in with Google
        </button>

      </div>
    </div>
  );
}
