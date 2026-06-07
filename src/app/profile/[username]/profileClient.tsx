"use client";

import { useState } from "react";
import Link from "next/link";

// ── Mock data (replace with real DB/session data) ──────────────────────────
const MOCK_USER = {
  id: "usr_001",
  username: "onlyduncan",
  description: "Collector of myths, lucid dreamer, amateur folklorist.",
  profilePicture: null as string | null,
  city: "Edinburgh",
  country: "Scotland",
  ageRange: "AGE_18_24",
  gender: "PREFER_NOT_TO_SAY",
  joinedAt: new Date("2025-11-14"),
};

const MOCK_DREAMS = [
  {
    id: "d1",
    title: "The Mirrored Forest",
    content: "I walked through endless trees that reflected my own face…",
    createdAt: new Date("2026-05-28"),
    private: false,
    emotions: ["awe", "dread"],
    symbols: ["mirror", "forest"],
  },
  {
    id: "d2",
    title: "Serpent Crown",
    content: "A snake coiled around a golden crown, hissing softly…",
    createdAt: new Date("2026-05-21"),
    private: true,
    emotions: ["wonder", "fear"],
    symbols: ["snake", "death"],
  },
  {
    id: "d3",
    title: "The Void Door",
    content: "Standing before a door that led to absolute darkness…",
    createdAt: new Date("2026-05-10"),
    private: false,
    emotions: ["mystery", "dread"],
    symbols: ["door", "void"],
  },
];

const MOCK_FRIENDS = [
  { id: "f1", username: "lunara", city: "Oslo" },
  { id: "f2", username: "mythweaver", city: "Athens" },
  { id: "f3", username: "dreamdrift", city: "Kyoto" },
];

const AGE_RANGE_LABELS: Record<string, string> = {
  UNDER_18: "Under 18",
  AGE_18_24: "18–24",
  AGE_25_34: "25–34",
  AGE_35_49: "35–49",
  AGE_50_PLUS: "50+",
  PREFER_NOT_TO_SAY: "–",
};

const EMOTION_COLORS: Record<string, string> = {
  fear: "#ef4444",
  wonder: "#8b5cf6",
  sorrow: "#6366f1",
  rage: "#f97316",
  love: "#ec4899",
  awe: "#0ea5e9",
  dread: "#6b7280",
  hope: "#10b981",
  grief: "#7c3aed",
  mystery: "#a78bfa",
};

type Tab = "dreams" | "friends" | "stats";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("dreams");
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(MOCK_USER.description ?? "");

  const publicDreams = MOCK_DREAMS.filter((d) => !d.private);
  const totalDreams = MOCK_DREAMS.length;
  const totalSymbols = [...new Set(MOCK_DREAMS.flatMap((d) => d.symbols))].length;
  const topEmotion = "dread"; // computed from real data in production

  const initials = MOCK_USER.username.slice(0, 2).toUpperCase();

  return (
    <div className="ambient-dark min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* ── Header card ── */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

            {/* Avatar */}
            <div className="shrink-0">
              {MOCK_USER.profilePicture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={MOCK_USER.profilePicture}
                  alt={MOCK_USER.username}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-violet-500/40"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-700/40 text-2xl font-bold text-violet-200 ring-2 ring-violet-500/40">
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">
                  @{MOCK_USER.username}
                </h1>
                <span className="rounded-full bg-violet-600/20 px-3 py-0.5 text-xs font-semibold text-violet-300">
                  {AGE_RANGE_LABELS[MOCK_USER.ageRange]}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-400">
                📍 {MOCK_USER.city}, {MOCK_USER.country}
              </p>

              {editing ? (
                <div className="mt-3 flex flex-col gap-2">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 outline-none focus:border-violet-500/60 transition"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setBio(MOCK_USER.description ?? ""); setEditing(false); }}
                      className="rounded-lg border border-white/10 px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {bio || <span className="italic text-slate-500">No bio yet.</span>}
                </p>
              )}
            </div>

            {/* Edit button */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="self-start rounded-lg border border-white/10 px-4 py-1.5 text-xs font-semibold text-slate-400 hover:border-violet-500/50 hover:text-violet-300 transition"
              >
                Edit profile
              </button>
            )}
          </div>

          {/* Quick stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
            {[
              { label: "Dreams", value: totalDreams },
              { label: "Symbols found", value: totalSymbols },
              { label: "Friends", value: MOCK_FRIENDS.length },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-extrabold text-white">{value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1 w-fit">
          {(["dreams", "friends", "stats"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Dreams tab ── */}
        {activeTab === "dreams" && (
          <div className="flex flex-col gap-4">
            {MOCK_DREAMS.length === 0 && (
              <p className="text-sm text-slate-500 italic">No dreams logged yet.</p>
            )}
            {MOCK_DREAMS.map((dream) => (
              <div
                key={dream.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-violet-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-white truncate">
                        {dream.title}
                      </h3>
                      {dream.private && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {dream.content}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dream.emotions.map((e) => (
                        <span
                          key={e}
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white/90"
                          style={{ backgroundColor: `${EMOTION_COLORS[e] ?? "#7c3aed"}30`, border: `1px solid ${EMOTION_COLORS[e] ?? "#7c3aed"}60` }}
                        >
                          {e}
                        </span>
                      ))}
                      {dream.symbols.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="shrink-0 text-xs text-slate-600 whitespace-nowrap">
                    {dream.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/dream-journal"
              className="mt-2 flex items-center justify-center rounded-2xl border border-dashed border-white/10 py-4 text-sm text-slate-500 transition hover:border-violet-500/40 hover:text-violet-300"
            >
              + Log a new dream
            </Link>
          </div>
        )}

        {/* ── Friends tab ── */}
        {activeTab === "friends" && (
          <div className="flex flex-col gap-3">
            {MOCK_FRIENDS.length === 0 && (
              <p className="text-sm text-slate-500 italic">No friends yet.</p>
            )}
            {MOCK_FRIENDS.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-violet-500/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-700/30 text-sm font-bold text-violet-300">
                  {friend.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">@{friend.username}</p>
                  <p className="text-xs text-slate-500">📍 {friend.city}</p>
                </div>
                <button className="ml-auto rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:border-red-500/40 hover:text-red-400 transition">
                  Remove
                </button>
              </div>
            ))}

            {/* Add friend placeholder */}
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Find by username…"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/60 transition"
              />
              <button className="rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-500 transition">
                Add
              </button>
            </div>
          </div>
        )}

        {/* ── Stats tab ── */}
        {activeTab === "stats" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Top emotion */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Top emotion
              </p>
              <p
                className="text-3xl font-extrabold capitalize"
                style={{ color: EMOTION_COLORS[topEmotion] ?? "#7c3aed" }}
              >
                {topEmotion}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Appears in {MOCK_DREAMS.filter((d) => d.emotions.includes(topEmotion)).length} of {totalDreams} dreams
              </p>
            </div>

            {/* Most common symbol */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Most common symbol
              </p>
              <p className="text-3xl font-extrabold text-white capitalize">mirror</p>
              <p className="mt-1 text-xs text-slate-500">Linked to 2 myths</p>
            </div>

            {/* Public vs private */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Privacy split
              </p>
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-white">{publicDreams.length}</span>
                  <span className="text-[11px] text-slate-500">Public</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-white">
                    {totalDreams - publicDreams.length}
                  </span>
                  <span className="text-[11px] text-slate-500">Private</span>
                </div>
              </div>
            </div>

            {/* Member since */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Member since
              </p>
              <p className="text-xl font-bold text-white">
                {MOCK_USER.joinedAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {Math.floor(
                  (Date.now() - MOCK_USER.joinedAt.getTime()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days exploring Mythos Atlas
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
