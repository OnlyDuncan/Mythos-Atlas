import type { DreamEntry, MythEntry } from "@/types";
import { myths } from "@/data/myths";

const SYMBOL_KEYWORDS: Record<string, string[]> = {
  water: ["water", "ocean", "sea", "river", "lake", "flood", "rain", "swimming", "drowning", "wave"],
  fire: ["fire", "flame", "burning", "heat", "smoke", "ash", "inferno"],
  snake: ["snake", "serpent", "viper", "cobra", "python", "slither"],
  mirror: ["mirror", "reflection", "glass", "reflected", "see myself"],
  forest: ["forest", "woods", "trees", "jungle", "dense", "thicket", "branches"],
  moon: ["moon", "lunar", "moonlight", "crescent", "full moon"],
  death: ["death", "dying", "dead", "grave", "coffin", "skeleton", "skull", "corpse"],
  rebirth: ["reborn", "rebirth", "alive again", "resurrection", "new life"],
  transformation: ["transform", "change", "shifting", "morphing", "becoming", "turning into"],
  curse: ["cursed", "curse", "hex", "spell", "damned"],
  gaze: ["stare", "staring", "eyes", "watching", "gaze", "looked at me"],
  shadow: ["shadow", "darkness", "silhouette", "dark figure", "dark shape"],
  wolf: ["wolf", "wolves", "howling", "pack", "werewolf"],
  eye: ["eye", "eyes", "third eye", "all-seeing", "watching"],
  infinity: ["endless", "infinite", "forever", "loop", "cycle", "repeating"],
  blood: ["blood", "bleeding", "wound", "red", "crimson"],
  light: ["light", "glow", "glowing", "bright", "radiant", "shining"],
  darkness: ["dark", "darkness", "black", "pitch black", "void"],
  spider: ["spider", "spiders", "web", "cobweb", "arachnid"],
  door: ["door", "doorway", "gate", "threshold", "entrance", "portal"],
  void: ["void", "nothingness", "empty", "abyss", "nothing", "blank"],
};

const EMOTION_KEYWORDS: Record<string, string[]> = {
  fear: ["scared", "terrified", "fear", "afraid", "horror", "panic", "dread", "frightened"],
  wonder: ["amazed", "wonder", "beautiful", "breathtaking", "incredible", "awe", "magical"],
  sorrow: ["sad", "sorrow", "grief", "crying", "weeping", "mourning", "loss"],
  rage: ["angry", "rage", "furious", "screaming", "violence", "attack"],
  love: ["love", "warmth", "embrace", "together", "connection"],
  awe: ["vast", "enormous", "overwhelming", "ancient", "cosmic", "infinite"],
  dread: ["dread", "impending", "approaching", "inescapable", "doom", "inevitable"],
  hope: ["hope", "light ahead", "escape", "safe", "warmth", "dawn"],
  grief: ["lost", "missing", "gone", "mourning", "alone", "left behind"],
  mystery: ["strange", "unknown", "mysterious", "unexplained", "hidden", "secret"],
};

export function extractSymbols(text: string): string[] {
  const lower = text.toLowerCase();
  return Object.entries(SYMBOL_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([symbol]) => symbol);
}

export function extractEmotions(text: string): string[] {
  const lower = text.toLowerCase();
  return Object.entries(EMOTION_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([emotion]) => emotion);
}

export function matchMythsFromDream(
  symbolTags: string[],
  emotionTags: string[]
): MythEntry[] {
  const allTags = new Set([...symbolTags, ...emotionTags]);
  return myths
    .map((myth) => {
      const mythTags = new Set(myth.tags);
      const overlap = [...allTags].filter((t) => mythTags.has(t));
      return { myth, score: overlap.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ myth }) => myth);
}

export function classifyDream(text: string): Omit<DreamEntry, "id" | "timestamp" | "title"> {
  const symbolTags = extractSymbols(text) as DreamEntry["symbolTags"];
  const emotionTags = extractEmotions(text) as DreamEntry["emotionTags"];
  const matched = matchMythsFromDream(symbolTags, emotionTags);
  return {
    text,
    symbolTags,
    emotionTags,
    extractedMythIds: matched.map((m) => m.id),
  };
}
