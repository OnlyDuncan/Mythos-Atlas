"use client";

import { useState } from "react";
// import { myths } from "@/data/myths";
import { MythCategory } from "@/types";
import Link from "next/link";

// Approximate geographic regions with coordinates (as % of the map container)
const REGION_MAP: Partial<Record<MythCategory, { x: number; y: number; label: string; color: string }>> = {
    greek:             { x: 52, y: 33, label: "Greece",                     color: "#7c3aed" },
    norse:             { x: 50, y: 20, label: "Scandinavia",                color: "#0ea5e9" },
    celtic:            { x: 46, y: 27, label: "Celtic Isles",               color: "#10b981" },
    egyptian:          { x: 54, y: 42, label: "Egypt",                      color: "#f59e0b" },
    african:           { x: 47, y: 55, label: "Sub-Saharan Africa",         color: "#d97706" },
    mesoamerican:      { x: 18, y: 45, label: "Mesoamerica",                color: "#65a30d" },
    "native-american": { x: 15, y: 28, label: "North America (Indigenous)", color: "#f87171" },
    japanese:          { x: 84, y: 34, label: "Japan",                      color: "#ec4899" },
    chinese:           { x: 78, y: 36, label: "China",                      color: "#d97706" },
    korean:            { x: 81, y: 31, label: "Korea",                      color: "#16a34a" },
    hindu:             { x: 68, y: 42, label: "India",                      color: "#f97316" },
    mesopotamian:      { x: 60, y: 37, label: "Mesopotamia",                color: "#a16207" },
    slavic:            { x: 55, y: 25, label: "Slavic Europe",              color: "#818cf8" },
    polynesian:        { x: 88, y: 62, label: "Polynesia",                  color: "#0891b2" },
    persian:           { x: 63, y: 36, label: "Persia",                     color: "#b45309" },
    aboriginal:        { x: 80, y: 68, label: "Australia (Aboriginal)",     color: "#ea580c" },
    tibetan:           { x: 72, y: 36, label: "Tibet",                      color: "#7c3aed" },
    inuit:             { x: 18, y: 12, label: "Arctic (Inuit)",              color: "#7dd3fc" },
    vodou:             { x: 24, y: 45, label: "Haiti",                       color: "#991b1b" },
    vietnamese:        { x: 80, y: 44, label: "Vietnam",                     color: "#dc2626" },
    thai:              { x: 77, y: 46, label: "Thailand",                    color: "#d97706" },
};

const CATEGORY_COLORS: Partial<Record<MythCategory, string>> = {
    greek:             "#7c3aed",
    norse:             "#0ea5e9",
    celtic:            "#10b981",
    egyptian:          "#f59e0b",
    african:           "#d97706",
    mesoamerican:      "#65a30d",
    "native-american": "#f87171",
    japanese:          "#ec4899",
    chinese:           "#d97706",
    korean:            "#16a34a",
    hindu:             "#f97316",
    mesopotamian:      "#a16207",
    slavic:            "#818cf8",
    polynesian:        "#0891b2",
    persian:           "#b45309",
    aboriginal:        "#ea580c",
    tibetan:           "#7c3aed",
    inuit:             "#7dd3fc",
    vodou:             "#991b1b",
    vietnamese:        "#dc2626",
    thai:              "#d97706",
    "urban-legend":    "#f97316",
    creepypasta:       "#6366f1",
    "dream-symbol":    "#8b5cf6",
};

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState<MythCategory | null>(null);
  const [hoveredMyth, setHoveredMyth] = useState<string | null>(null);

//   const filteredMyths = activeCategory
//     ? myths.filter((m) => m.category === activeCategory)
//     : myths;

  const regions = (
    Object.entries(REGION_MAP) as [MythCategory, NonNullable<(typeof REGION_MAP)[MythCategory]>][]
  ).filter(([, region]) => region !== undefined);

  return (
    <div className="ambient-dark min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-extrabold text-white">Myth Map</h1>
        <p className="mb-8 text-slate-400">
          Explore myths by their cultural origin. Click a region to filter.
        </p>

        {/* Category legend / filter pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              activeCategory === null
                ? "bg-violet-600 text-white"
                : "border border-white/10 text-slate-400 hover:border-violet-500/50 hover:text-violet-300"
            }`}
          >
            All Regions
          </button>
          {regions.map(([cat, region]) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition`}
              style={
                activeCategory === cat
                  ? { backgroundColor: region.color, color: "#fff" }
                  : {
                      border: `1px solid ${region.color}40`,
                      color: region.color,
                    }
              }
            >
              {region.label}
            </button>
          ))}
        </div>

        {/* Map + sidebar layout */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ── Stylised Map ── */}
          <div className="relative h-105 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1a] lg:flex-1">
            {/* Grid lines */}
            <svg
              className="absolute inset-0 h-full w-full opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Decorative "land masses" */}
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 420"
            >
              {/* North America */}
              <ellipse cx="160" cy="130" rx="110" ry="80" fill="#1e1b4b" />
              {/* South America */}
              <ellipse cx="200" cy="270" rx="60" ry="80" fill="#1e1b4b" />
              {/* Europe */}
              <ellipse cx="410" cy="120" rx="60" ry="50" fill="#1e1b4b" />
              {/* Africa */}
              <ellipse cx="430" cy="260" rx="70" ry="90" fill="#1e1b4b" />
              {/* Asia */}
              <ellipse cx="620" cy="140" rx="130" ry="80" fill="#1e1b4b" />
              {/* Oceania */}
              <ellipse cx="680" cy="310" rx="55" ry="35" fill="#1e1b4b" />
            </svg>

            {/* Region pins */}
            {regions.map(([cat, region]) => {
              const isActive = activeCategory === cat || activeCategory === null;
            //   const mythCount = myths.filter((m) => m.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                  className="group absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                >
                  {/* Pulse ring */}
                  {activeCategory === cat && (
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-40"
                      style={{ backgroundColor: region.color }}
                    />
                  )}
                  {/* Pin dot */}
                  <span
                    className="relative flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-lg ring-2 ring-white/20 transition-opacity"
                    style={{
                      backgroundColor: region.color,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  >
                    {/* {mythCount} */}
                  </span>
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {region.label}
                  </span>
                </button>
              );
            })}

            {/* Compass rose */}
            <div className="absolute bottom-4 right-4 text-2xl opacity-20 select-none">
              🧭
            </div>
          </div>

          {/* ── Myth list sidebar ── */}
          <div className="flex w-full flex-col gap-3 lg:w-80 xl:w-96">
            {/* <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {activeCategory
                ? `${REGION_MAP[activeCategory]?.label ?? activeCategory} — ${filteredMyths.length} entries`
                : `All regions — ${filteredMyths.length} entries`}
            </p> */}
            {/* <div className="flex max-h-95 flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
              {filteredMyths.map((myth) => (
                <Link
                  key={myth.id}
                  href={`/myth/${myth.id}`}
                  onMouseEnter={() => setHoveredMyth(myth.id)}
                  onMouseLeave={() => setHoveredMyth(null)}
                  className={`group flex items-start gap-3 rounded-xl border p-3 transition ${
                    hoveredMyth === myth.id
                      ? "border-violet-500/50 bg-violet-600/10"
                      : "border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[myth.category as MythCategory] ?? "#7c3aed",
                    }}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {myth.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-400">
                      {myth.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
