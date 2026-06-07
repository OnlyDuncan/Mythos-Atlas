import type { MythEntry } from "@/types";

// export function getMythById(id: string): MythEntry | undefined {
//   return myths.find((m) => m.id === id);
// }

// export function getMythsByCategory(category: string): MythEntry[] {
//   return myths.filter((m) => m.category === category);
// }

// export function getRelatedMyths(myth: MythEntry): MythEntry[] {
//   return myth.relatedIds
//     .map((id) => getMythById(id))
//     .filter(Boolean) as MythEntry[];
// }

// export const ALL_CATEGORIES = [
//   "greek",
//   "norse",
//   "japanese",
//   "chinese",
//   "korean",
//   "african",
//   "mesoamerican",
//   "native-american",
//   "hindu",
//   "mesopotamian",
//   "slavic",
//   "polynesian",
//   "persian",
//   "dream-symbol",
//   "celtic",
//   "egyptian",
//   "aboriginal",
//   "tibetan",
//   "inuit",
//   "vodou",
//   "vietnamese",
//   "thai",
// ] as const;

// export const ALL_EMOTION_TAGS = [
//   "fear", "wonder", "sorrow", "rage", "love",
//   "awe", "dread", "hope", "grief", "mystery",
// ] as const;

// export const ALL_SYMBOL_TAGS = [
//   "water", "fire", "snake", "mirror", "forest", "moon",
//   "death", "rebirth", "transformation", "curse", "gaze",
//   "shadow", "wolf", "eye", "infinity", "blood", "light",
//   "darkness", "spider", "door", "void",
// ] as const;

// export const mythTitles = [
//   "medusa",
//   "perseus",
//   "ouroboros",
//   "jormungandr",
//   "yggdrasil",
//   "fenrir",
//   "ouroboros-in-gnostic-creation",
//   "jormungandr-and-thor-at-ragnarok",
// ]