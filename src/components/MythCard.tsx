import Link from "next/link";
import type { MythEntry } from "@/types";
import TagPill from "@/components/TagPill";
import clsx from "clsx";

const CATEGORY_LABELS: Record<string, string> = {
  greek: "Greek",
  norse: "Norse",
  japanese: "Japanese",
  "urban-legend": "Urban Legend",
  creepypasta: "Creepypasta",
  "dream-symbol": "Dream Symbol",
  celtic: "Celtic / Slavic",
  egyptian: "Egyptian",
};

interface MythCardProps {
  myth: MythEntry;
  className?: string;
}

export default function MythCard({ myth, className }: MythCardProps) {
  return (
    <Link href={`/myth/${myth.id}`}>
      <article
        className={clsx(
          "myth-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 cursor-pointer hover:border-white/20",
          className
        )}
        style={{ "--accent": myth.accentColor } as React.CSSProperties}
      >
        {/* Accent glow strip */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: myth.accentColor, opacity: 0.7 }}
        />

        <div className="mb-2 flex items-center justify-between">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: myth.accentColor }}
          >
            {CATEGORY_LABELS[myth.category] ?? myth.category}
          </span>
          <span className="text-xs text-slate-500">{myth.origin}</span>
        </div>

        <h2 className="mb-2 text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
          {myth.title}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-3">
          {myth.summary}
        </p>

        <div className="flex flex-wrap gap-1">
          {myth.tags.slice(0, 6).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </article>
    </Link>
  );
}
