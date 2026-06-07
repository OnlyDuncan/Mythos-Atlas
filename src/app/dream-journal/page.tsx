"use client";

import { useState } from "react";

// ─── Placeholder data (replace with real data later) ─────────────────────────

const MOCK_PROFILE = {
  name: "Duncan Payne",
  username: "@onlyduncan",
  avatar: null as null | string,
  totalDreams: 24,
  publicDreams: 11,
  privateDreams: 13,
  topEmotion: "Awe",
  topTheme: "Transformation",
  joinedDate: "March 2026",
};

const MOCK_FRIENDS = [
  { id: "1", name: "Mara S.", username: "@maras", dreams: 17, avatar: null },
  { id: "2", name: "Leo T.", username: "@leot", dreams: 9, avatar: null },
  { id: "3", name: "Yuki N.", username: "@yukin", dreams: 31, avatar: null },
  { id: "4", name: "Rowan C.", username: "@rowanc", dreams: 5, avatar: null },
];

const MOCK_ENTRIES = [
  {
    id: "1",
    title: "The Flooded City",
    date: "May 30, 2026",
    emotion: "Dread",
    theme: "Water",
    isPublic: false,
    excerpt: "The streets were submerged up to my waist and the buildings had no windows…",
  },
  {
    id: "2",
    title: "Silver Forest",
    date: "May 27, 2026",
    emotion: "Awe",
    theme: "Transformation",
    isPublic: true,
    excerpt: "Every tree was made of hammered silver and rang like a bell when the wind moved through them…",
  },
  {
    id: "3",
    title: "The Door at the End of the Hall",
    date: "May 22, 2026",
    emotion: "Fear",
    theme: "Shadow",
    isPublic: false,
    excerpt: "There was always one more door. I couldn't count them. The hall kept extending…",
  },
  {
    id: "4",
    title: "Burning Archive",
    date: "May 18, 2026",
    emotion: "Wonder",
    theme: "Fire",
    isPublic: true,
    excerpt: "The library was on fire but the books were untouched. Someone was reading in the middle of it…",
  },
  {
    id: "5",
    title: "The Second Moon",
    date: "May 10, 2026",
    emotion: "Awe",
    theme: "Infinity",
    isPublic: true,
    excerpt: "There were two moons. One was ours. The other was closer and slightly wrong…",
  },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const sizeClass = size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div className={`${sizeClass} flex items-center justify-center rounded-full bg-violet-700/60 font-bold text-violet-200 ring-2 ring-violet-500/30 shrink-0`}>
      {initials}
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-white/8 bg-white/5 px-4 py-3">
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DreamJournalPage() {
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");

  const filteredEntries = MOCK_ENTRIES.filter((e) => {
    if (filter === "public") return e.isPublic;
    if (filter === "private") return !e.isPublic;
    return true;
  });

  return (
    <div className="ambient-dark min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* ── Page header ── */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Dream Journal</h1>
            <p className="mt-1 text-slate-500">Your inner archive</p>
          </div>
          <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500">
            + New Dream
          </button>
        </div>

        {/* ── Three-column layout ── */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_260px]">

          {/* ── LEFT: Profile ── */}
          <aside className="flex flex-col gap-5">

            {/* Profile card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar name={MOCK_PROFILE.name} size="lg" />
                <h2 className="mt-3 text-base font-bold text-white">{MOCK_PROFILE.name}</h2>
                <p className="text-xs text-slate-500">{MOCK_PROFILE.username}</p>
                <p className="mt-1 text-xs text-slate-600">Joined {MOCK_PROFILE.joinedDate}</p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <StatBadge label="Total" value={MOCK_PROFILE.totalDreams} />
                <StatBadge label="Public" value={MOCK_PROFILE.publicDreams} />
                <StatBadge label="Private" value={MOCK_PROFILE.privateDreams} />
              </div>
            </div>

            {/* Top emotion & theme */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">Your Patterns</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Most common emotion</span>
                  <span className="rounded-full bg-violet-600/25 px-3 py-0.5 text-xs font-semibold text-violet-300">
                    {MOCK_PROFILE.topEmotion}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Most common theme</span>
                  <span className="rounded-full bg-indigo-600/25 px-3 py-0.5 text-xs font-semibold text-indigo-300">
                    {MOCK_PROFILE.topTheme}
                  </span>
                </div>
              </div>
            </div>

          </aside>

          {/* ── CENTRE: Dream entries ── */}
          <main className="flex flex-col gap-4">

            {/* Filter tabs */}
            <div className="flex gap-2 rounded-xl border border-white/10 bg-white/5 p-1 w-fit">
              {(["all", "public", "private"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold capitalize transition ${
                    filter === f
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Entry cards */}
            <div className="flex flex-col gap-3">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-500/40 hover:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">{entry.title}</h3>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          entry.isPublic
                            ? "bg-emerald-600/20 text-emerald-400"
                            : "bg-slate-700/40 text-slate-400"
                        }`}>
                          {entry.isPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{entry.date}</p>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{entry.excerpt}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="rounded-full bg-violet-600/20 px-2.5 py-0.5 text-xs text-violet-300">
                        {entry.emotion}
                      </span>
                      <span className="rounded-full bg-indigo-600/20 px-2.5 py-0.5 text-xs text-indigo-300">
                        {entry.theme}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredEntries.length === 0 && (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/10">
                  <p className="text-sm text-slate-600">No {filter} dreams yet</p>
                </div>
              )}
            </div>
          </main>

          {/* ── RIGHT: Friends ── */}
          <aside>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-slate-500">Friends</p>
                <button className="text-xs text-violet-400 hover:text-violet-300 transition">
                  + Add
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {MOCK_FRIENDS.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 cursor-pointer rounded-xl p-2 transition hover:bg-white/5"
                  >
                    <Avatar name={friend.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                      <p className="text-xs text-slate-500">{friend.dreams} dreams</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 h-px bg-white/5" />
              <button className="mt-3 w-full text-center text-xs text-slate-600 hover:text-slate-400 transition">
                See all friends
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
