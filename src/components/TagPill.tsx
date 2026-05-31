import clsx from "clsx";

const EMOTION_COLORS: Record<string, string> = {
  fear: "text-red-400 border-red-500/50",
  wonder: "text-sky-300 border-sky-400/50",
  sorrow: "text-blue-400 border-blue-500/50",
  rage: "text-orange-400 border-orange-500/50",
  love: "text-pink-400 border-pink-500/50",
  awe: "text-violet-300 border-violet-400/50",
  dread: "text-red-600 border-red-700/50",
  hope: "text-emerald-400 border-emerald-500/50",
  grief: "text-slate-400 border-slate-500/50",
  mystery: "text-purple-300 border-purple-400/50",
};

const SYMBOL_COLORS: Record<string, string> = {
  water: "text-cyan-400 border-cyan-500/50",
  fire: "text-orange-500 border-orange-600/50",
  snake: "text-green-400 border-green-500/50",
  mirror: "text-slate-300 border-slate-400/50",
  forest: "text-emerald-500 border-emerald-600/50",
  moon: "text-indigo-300 border-indigo-400/50",
  death: "text-slate-500 border-slate-600/50",
  rebirth: "text-teal-400 border-teal-500/50",
  transformation: "text-violet-400 border-violet-500/50",
  curse: "text-red-500 border-red-600/50",
  gaze: "text-yellow-400 border-yellow-500/50",
  shadow: "text-gray-500 border-gray-600/50",
  wolf: "text-amber-400 border-amber-500/50",
  eye: "text-yellow-300 border-yellow-400/50",
  infinity: "text-sky-400 border-sky-500/50",
  blood: "text-red-600 border-red-700/50",
  light: "text-yellow-200 border-yellow-300/50",
  darkness: "text-gray-700 border-gray-800/50",
  spider: "text-amber-600 border-amber-700/50",
  door: "text-orange-300 border-orange-400/50",
  void: "text-slate-600 border-slate-700/50",
};

interface TagPillProps {
  tag: string;
  className?: string;
}

export default function TagPill({ tag, className }: TagPillProps) {
  const color =
    EMOTION_COLORS[tag] ?? SYMBOL_COLORS[tag] ?? "text-slate-400 border-slate-500/50";
  return (
    <span className={clsx("tag-pill", color, className)}>{tag}</span>
  );
}
