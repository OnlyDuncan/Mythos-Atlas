import Link from "next/link";
import { myths } from "@/data/myths";
import MythCard from "@/components/MythCard";

const FEATURED_IDS = ["medusa", "ouroboros", "baba-yaga", "the-backrooms", "odin", "mirror-symbol"];

export default function Home() {
  const featured = FEATURED_IDS.map((id) => myths.find((m) => m.id === id)).filter(Boolean);

  return (
    <div className="ambient-dark min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <p className="mb-4 text-sm tracking-[0.3em] uppercase text-violet-400">
          Mythology · Urban Legends · Dream Symbolism
        </p>
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          Mythos{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #0ea5e9)" }}
          >
            Atlas
          </span>
        </h1>
        <p className="mb-10 max-w-xl text-lg text-slate-400">
          A living knowledge graph of myths, legends, and dream symbols — explore
          connections across cultures and the subconscious.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            Explore Myths
          </Link>
          <Link
            href="/graph"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Graph
          </Link>
          <Link
            href="/dream-journal"
            className="rounded-full border border-violet-500/40 px-8 py-3 text-sm font-semibold text-violet-300 transition-colors hover:bg-violet-500/10"
          >
            Dream Journal
          </Link>
        </div>
      </section>

      {/* Featured myths */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 text-xl font-bold tracking-wide text-slate-300">
          ✦ Featured Entries
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((myth) => myth && <MythCard key={myth.id} myth={myth} />)}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/explore"
            className="text-sm text-violet-400 underline underline-offset-4 hover:text-violet-300"
          >
            View all {myths.length} entries →
          </Link>
        </div>
      </section>

      {/* Theme pills */}
      <section className="border-t border-white/10 py-16 text-center">
        <p className="mb-6 text-sm tracking-widest uppercase text-slate-500">Explore by symbol</p>
        <div className="flex flex-wrap justify-center gap-3 px-6">
          {["water", "snake", "mirror", "forest", "wolf", "fire", "shadow", "void", "moon", "death", "rebirth", "eye"].map(
            (sym) => (
              <Link
                key={sym}
                href={`/explore?symbol=${sym}`}
                className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-300 transition-colors hover:border-violet-500/50 hover:text-violet-300"
              >
                {sym}
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}

