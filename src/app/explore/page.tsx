"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { myths, ALL_CATEGORIES, ALL_EMOTION_TAGS, ALL_SYMBOL_TAGS } from "@/data/myths";
import MythCard from "@/components/MythCard";
import Fuse from "fuse.js";

const fuse = new Fuse(myths, {
  keys: ["title", "summary", "description", "tags", "origin"],
  threshold: 0.35,
});

function ExploreInner() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get("symbol") ?? "";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>(
    initialSymbol ? [initialSymbol] : []
  );

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const results = useMemo(() => {
    let pool = query.trim()
      ? fuse.search(query).map((r) => r.item)
      : myths;

    if (activeCategory !== "all") {
      pool = pool.filter((m) => m.category === activeCategory);
    }

    if (activeTags.length > 0) {
      pool = pool.filter((m) =>
        activeTags.every((tag) => m.tags.includes(tag))
      );
    }

    return pool;
  }, [query, activeCategory, activeTags]);

  return (
    <div className="ambient-dark min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-extrabold text-white">Explore</h1>
        <p className="mb-8 text-slate-400">
          Search myths, legends, and symbols across cultures.
        </p>

        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, symbol, emotion…"
          className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-slate-500 outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
        />

        {/* Category filter */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              activeCategory === "all"
                ? "bg-violet-600 text-white"
                : "border border-white/10 text-slate-400 hover:border-violet-500/50 hover:text-violet-300"
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === cat
                  ? "bg-violet-600 text-white"
                  : "border border-white/10 text-slate-400 hover:border-violet-500/50 hover:text-violet-300"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">Filter by tag</p>
          <div className="flex flex-wrap gap-2">
            {[...ALL_EMOTION_TAGS, ...ALL_SYMBOL_TAGS].map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag-pill cursor-pointer transition ${
                  activeTags.includes(tag)
                    ? "bg-violet-600/30 text-violet-200 border-violet-400"
                    : "text-slate-400 border-slate-600 hover:text-violet-300 hover:border-violet-500"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="mt-3 text-xs text-slate-500 hover:text-red-400 underline"
            >
              Clear tags
            </button>
          )}
        </div>

        {/* Results */}
        <p className="mb-5 text-sm text-slate-500">
          {results.length} {results.length === 1 ? "entry" : "entries"} found
        </p>
        {results.length === 0 ? (
          <p className="py-20 text-center text-slate-500">No entries match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((myth) => (
              <MythCard key={myth.id} myth={myth} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen ambient-dark flex items-center justify-center text-slate-500">Loading…</div>}>
      <ExploreInner />
    </Suspense>
  );
}
