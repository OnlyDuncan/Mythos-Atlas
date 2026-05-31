import { notFound } from "next/navigation";
import Link from "next/link";
import { myths, getMythById, getRelatedMyths } from "@/data/myths";
import TagPill from "@/components/TagPill";
import MythCard from "@/components/MythCard";

export function generateStaticParams() {
  return myths.map((m) => ({ id: m.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MythPage({ params }: Props) {
  const { id } = await params;
  const myth = getMythById(id);
  if (!myth) notFound();

  const related = getRelatedMyths(myth);

  return (
    <div className={`ambient-${myth.ambientStyle} min-h-screen`}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Back */}
        <Link
          href="/explore"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition"
        >
          ← Back to Explore
        </Link>

        {/* Header */}
        <div className="mb-2 flex items-center gap-3">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: myth.accentColor }}
          >
            {myth.category.replace("-", " ")}
          </span>
          <span className="text-xs text-slate-500">· {myth.origin}</span>
        </div>

        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white">
          {myth.title}
        </h1>

        {/* Accent bar */}
        <div
          className="mb-6 h-px w-24 rounded"
          style={{ background: myth.accentColor }}
        />

        <p className="mb-8 text-xl leading-relaxed text-slate-300">
          {myth.summary}
        </p>

        {/* Full description */}
        <div className="mb-10 rounded-xl border border-white/10 bg-white/5 p-8">
          <p className="text-base leading-8 text-slate-300">{myth.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">Themes & Symbols</p>
          <div className="flex flex-wrap gap-2">
            {myth.tags.map((tag) => (
              <Link key={tag} href={`/explore?symbol=${tag}`}>
                <TagPill tag={tag} className="cursor-pointer hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Graph link */}
        <Link
          href={`/graph?focus=${myth.id}`}
          className="mb-12 inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
          style={{ borderColor: myth.accentColor + "60", color: myth.accentColor }}
        >
          ⬡ View in Graph
        </Link>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-5 text-lg font-bold text-slate-300">Related Entries</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <MythCard key={r.id} myth={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
