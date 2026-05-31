"use client";

import { useState } from "react";
import { classifyDream } from "@/lib/classifier";
import { getMythById } from "@/data/myths";
import type { DreamEntry } from "@/types";
import TagPill from "@/components/TagPill";
import MythCard from "@/components/MythCard";

let idCounter = 0;

export default function DreamJournalPage() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<DreamEntry | null>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const classified = classifyDream(text);
    const entry: DreamEntry = {
      ...classified,
      id: String(++idCounter),
      title: title.trim() || `Dream #${idCounter}`,
      timestamp: Date.now(),
    };
    setEntries((prev) => [entry, ...prev]);
    setActiveEntry(entry);
    setText("");
    setTitle("");
  };

  return (
    <div className="ambient-dark min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-extrabold text-white">Dream Journal</h1>
        <p className="mb-10 text-slate-400">
          Describe a dream. The system will extract symbols, emotions, and link it to mythological archetypes.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Input panel */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dream title (optional)"
              className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/60 transition"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Describe your dream in as much detail as you remember…"
              className="mb-4 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500/60 transition"
            />
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Interpret Dream →
            </button>

            {/* Past entries list */}
            {entries.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">Past entries</p>
                <div className="flex flex-col gap-2">
                  {entries.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setActiveEntry(e)}
                      className={`rounded-lg px-4 py-2 text-left text-sm transition ${
                        activeEntry?.id === e.id
                          ? "bg-violet-600/30 text-violet-200"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      {e.title}
                      <span className="ml-2 text-xs text-slate-600">
                        {new Date(e.timestamp).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result panel */}
          <div>
            {activeEntry ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-1 text-xl font-bold text-white">{activeEntry.title}</h2>
                <p className="mb-6 text-sm italic text-slate-500 line-clamp-3">
                  &ldquo;{activeEntry.text}&rdquo;
                </p>

                {activeEntry.emotionTags.length > 0 && (
                  <div className="mb-5">
                    <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">Emotions detected</p>
                    <div className="flex flex-wrap gap-2">
                      {activeEntry.emotionTags.map((t) => <TagPill key={t} tag={t} />)}
                    </div>
                  </div>
                )}

                {activeEntry.symbolTags.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">Symbols detected</p>
                    <div className="flex flex-wrap gap-2">
                      {activeEntry.symbolTags.map((t) => <TagPill key={t} tag={t} />)}
                    </div>
                  </div>
                )}

                {activeEntry.extractedMythIds.length > 0 ? (
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">
                      Mythological parallels
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeEntry.extractedMythIds.map((mid) => {
                        const myth = getMythById(mid);
                        return myth ? <MythCard key={mid} myth={myth} /> : null;
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No strong mythological parallels detected. Try adding more detail about what you saw or felt.
                  </p>
                )}
              </div>
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-white/10 border-dashed">
                <p className="text-slate-600">Your dream interpretation will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
