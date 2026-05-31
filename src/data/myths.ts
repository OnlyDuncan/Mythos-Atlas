import type { MythEntry } from "@/types";

export const myths: MythEntry[] = [
  {
    id: "medusa",
    title: "Medusa",
    category: "greek",
    origin: "Ancient Greece",
    summary: "A Gorgon whose gaze turns the living to stone.",
    description:
      "Once a beautiful mortal priestess, Medusa was transformed into a monster by Athena after being defiled in her temple by Poseidon. Her gaze became lethal — anyone who met her eyes directly was petrified. She was slain by Perseus, who used a mirrored shield to avoid her direct gaze.",
    tags: ["fear", "curse", "gaze", "transformation", "mirror", "snake", "death"],
    emotionTags: ["fear", "dread"],
    symbolTags: ["snake", "mirror", "transformation", "curse", "gaze", "death"],
    relatedIds: ["baba-yaga", "la-llorona", "hydra", "ouroboros"],
    ambientStyle: "dark",
    accentColor: "#7c3aed",
  },
  {
    id: "ouroboros",
    title: "Ouroboros",
    category: "greek",
    origin: "Ancient Egypt / Greece",
    summary: "The serpent that devours its own tail — a symbol of eternity.",
    description:
      "The Ouroboros depicts a serpent or dragon eating its own tail, forming a circle with no beginning or end. It represents the cyclic nature of existence, eternal return, and the unity of opposites. It appears in Norse, Egyptian, and Gnostic traditions.",
    tags: ["infinity", "rebirth", "snake", "wonder", "transformation", "mystery"],
    emotionTags: ["wonder", "awe", "mystery"],
    symbolTags: ["snake", "infinity", "rebirth", "transformation"],
    relatedIds: ["medusa", "jormungandr", "yggdrasil"],
    ambientStyle: "ethereal",
    accentColor: "#0ea5e9",
  },
  {
    id: "jormungandr",
    title: "Jörmungandr",
    category: "norse",
    origin: "Norse Scandinavia",
    summary: "The World Serpent that encircles Midgard, biting its own tail.",
    description:
      "Child of Loki and the giantess Angrboða, Jörmungandr is so vast it wraps around the world and grasps its own tail. At Ragnarök, it releases its tail and rises from the ocean, flooding the earth. Thor slays it but dies from its venom after nine steps.",
    tags: ["death", "snake", "infinity", "water", "transformation", "dread"],
    emotionTags: ["dread", "awe"],
    symbolTags: ["snake", "infinity", "water", "death", "transformation"],
    relatedIds: ["ouroboros", "yggdrasil", "fenrir"],
    ambientStyle: "dark",
    accentColor: "#16a34a",
  },
  {
    id: "yggdrasil",
    title: "Yggdrasil",
    category: "norse",
    origin: "Norse Scandinavia",
    summary: "The immense sacred tree connecting the nine worlds.",
    description:
      "Yggdrasil is an immense mythical tree that connects the nine realms of Norse cosmology. Its branches reach into the heavens; its roots delve into the realm of the dead, the land of giants, and the well of wisdom. It is both the axis of the world and a living cosmic map.",
    tags: ["wonder", "forest", "death", "rebirth", "infinity", "light"],
    emotionTags: ["wonder", "awe"],
    symbolTags: ["forest", "infinity", "rebirth", "death", "light"],
    relatedIds: ["jormungandr", "fenrir", "odin"],
    ambientStyle: "ethereal",
    accentColor: "#84cc16",
  },
  {
    id: "fenrir",
    title: "Fenrir",
    category: "norse",
    origin: "Norse Scandinavia",
    summary: "The monstrous wolf bound by the gods, destined to break free at Ragnarök.",
    description:
      "Fenrir is an enormous wolf, son of Loki. The gods feared his power and bound him with a magical ribbon called Gleipnir. At Ragnarök he breaks free and swallows Odin himself. He represents the chaos that cannot be contained forever — the inevitable breaking of order.",
    tags: ["wolf", "rage", "dread", "death", "shadow", "transformation"],
    emotionTags: ["dread", "rage", "fear"],
    symbolTags: ["wolf", "shadow", "death", "transformation"],
    relatedIds: ["jormungandr", "yggdrasil"],
    ambientStyle: "dark",
    accentColor: "#dc2626",
  },
  {
    id: "baba-yaga",
    title: "Baba Yaga",
    category: "celtic",
    origin: "Slavic Eastern Europe",
    summary: "A wild crone witch who lives in a hut on chicken legs deep in the forest.",
    description:
      "Baba Yaga is a supernatural being in Slavic folklore who appears as a ferocious old woman. She lives in a hut that spins on chicken legs, surrounded by a fence of human skulls. She may help or hinder heroes who seek her wisdom — she embodies the terrifying wisdom of the deep forest.",
    tags: ["fear", "forest", "shadow", "mystery", "death", "transformation"],
    emotionTags: ["fear", "mystery", "dread"],
    symbolTags: ["forest", "shadow", "death", "transformation"],
    relatedIds: ["medusa", "la-llorona"],
    ambientStyle: "dark",
    accentColor: "#b45309",
  },
  {
    id: "la-llorona",
    title: "La Llorona",
    category: "urban-legend",
    origin: "Mexico / Latin America",
    summary: "The Weeping Woman who drowned her children and now haunts rivers wailing.",
    description:
      "La Llorona is a ghost who drowned her children in a river after her lover abandoned her, and now wanders waterways weeping endlessly, calling for them. Hearing her cry is an omen of death. She is a warning spirit and a symbol of grief, betrayal, and maternal sorrow.",
    tags: ["sorrow", "water", "death", "grief", "fear", "curse"],
    emotionTags: ["sorrow", "grief", "fear"],
    symbolTags: ["water", "death", "curse"],
    relatedIds: ["medusa", "baba-yaga", "kuchisake-onna"],
    ambientStyle: "dark",
    accentColor: "#0284c7",
  },
  {
    id: "kuchisake-onna",
    title: "Kuchisake-onna",
    category: "japanese",
    origin: "Japan",
    summary: "The Slit-Mouthed Woman who asks if you find her beautiful — before revealing her true face.",
    description:
      "A malevolent spirit from Japanese urban legend. She wears a surgical mask and asks passers-by 'Am I beautiful?' If you say yes, she removes the mask to reveal a mouth slit ear to ear and asks again. There is no safe answer. She embodies vanity, disfigurement, and the terror of forced intimacy.",
    tags: ["fear", "dread", "gaze", "curse", "mirror", "death"],
    emotionTags: ["fear", "dread"],
    symbolTags: ["gaze", "mirror", "curse", "death"],
    relatedIds: ["la-llorona", "medusa", "the-backrooms"],
    ambientStyle: "surreal",
    accentColor: "#e11d48",
  },
  {
    id: "the-backrooms",
    title: "The Backrooms",
    category: "creepypasta",
    origin: "Internet (2019)",
    summary: "An infinite labyrinth of empty office space you fall into by \"noclipping\" out of reality.",
    description:
      "The Backrooms began as a 4chan image post in 2019 and became a mythology of its own. If you noclip out of reality in just the right way, you end up in a vast, impossibly large space of yellow wallpaper and buzzing fluorescent lights. There is no escape — only deeper levels, each more disturbing than the last.",
    tags: ["dread", "void", "mystery", "door", "shadow", "fear", "infinity"],
    emotionTags: ["dread", "fear", "mystery"],
    symbolTags: ["void", "door", "shadow", "infinity"],
    relatedIds: ["kuchisake-onna", "scp-106"],
    ambientStyle: "surreal",
    accentColor: "#ca8a04",
  },
  {
    id: "scp-106",
    title: "SCP-106 — The Old Man",
    category: "creepypasta",
    origin: "SCP Foundation Wiki",
    summary: "An elderly humanoid that phases through matter and drags victims into a pocket dimension of decay.",
    description:
      "SCP-106, nicknamed 'The Old Man' or 'Radical Larry', is a humanoid entity that can pass through solid matter, leaving corrosive black fluid behind. It stalks and captures living subjects, dragging them into its personal pocket dimension — a reality of rot and suffering. It cannot be permanently destroyed.",
    tags: ["dread", "void", "shadow", "death", "fear", "darkness"],
    emotionTags: ["dread", "fear"],
    symbolTags: ["void", "shadow", "death", "darkness"],
    relatedIds: ["the-backrooms"],
    ambientStyle: "dark",
    accentColor: "#374151",
  },
  {
    id: "hydra",
    title: "The Lernaean Hydra",
    category: "greek",
    origin: "Ancient Greece",
    summary: "A serpentine water monster that grows two heads for every one cut off.",
    description:
      "The Hydra was a serpentine water monster in Greek mythology with multiple heads. When one head was severed, two more grew in its place. Heracles slew it as his second labour by cauterizing each stump before it could regrow. It represents the futility of fighting self-regenerating problems.",
    tags: ["water", "snake", "death", "transformation", "rebirth", "fear"],
    emotionTags: ["fear", "dread"],
    symbolTags: ["water", "snake", "death", "transformation", "rebirth"],
    relatedIds: ["medusa", "ouroboros", "jormungandr"],
    ambientStyle: "dark",
    accentColor: "#0f766e",
  },
  {
    id: "mirror-symbol",
    title: "The Mirror",
    category: "dream-symbol",
    origin: "Universal",
    summary: "In dreams, mirrors reveal truth, distortion, or the hidden self.",
    description:
      "The mirror is one of the most potent symbols in both mythology and dream analysis. It may show you your true self, your shadow, or something entirely other. Breaking a mirror is bad luck in many cultures. In Jungian psychology, the mirror represents the confrontation with the unconscious — the thing you most fear to see.",
    tags: ["mirror", "shadow", "mystery", "transformation", "gaze", "light"],
    emotionTags: ["mystery", "dread", "wonder"],
    symbolTags: ["mirror", "shadow", "gaze", "light", "transformation"],
    relatedIds: ["medusa", "kuchisake-onna"],
    ambientStyle: "ethereal",
    accentColor: "#6366f1",
  },
  {
    id: "water-symbol",
    title: "Water",
    category: "dream-symbol",
    origin: "Universal",
    summary: "In dreams, water represents the unconscious, emotion, and the unknown depths.",
    description:
      "Water in dreams signifies the unconscious mind, emotional states, and hidden depths. Calm water suggests peace; turbulent water, inner turmoil; drowning, being overwhelmed; still dark water, the unknown. Across cultures, water is both life-giving and consuming — the source of creation and of monsters.",
    tags: ["water", "wonder", "mystery", "sorrow", "rebirth", "transformation"],
    emotionTags: ["wonder", "mystery", "sorrow"],
    symbolTags: ["water", "rebirth", "transformation"],
    relatedIds: ["la-llorona", "jormungandr", "hydra"],
    ambientStyle: "oceanic",
    accentColor: "#0ea5e9",
  },
  {
    id: "odin",
    title: "Odin — The Allfather",
    category: "norse",
    origin: "Norse Scandinavia",
    summary: "The one-eyed king of the Norse gods who sacrificed himself to gain cosmic wisdom.",
    description:
      "Odin hung himself from Yggdrasil for nine days and nights, stabbed by his own spear, to gain the knowledge of the runes. He sacrificed one eye to drink from the Well of Mimir and gain infinite wisdom. He is a god of war, death, poetry, and magic — and he knows Ragnarök is coming and prepares for it anyway.",
    tags: ["death", "mystery", "eye", "shadow", "wonder", "awe", "grief"],
    emotionTags: ["awe", "mystery", "grief"],
    symbolTags: ["eye", "death", "shadow", "light"],
    relatedIds: ["yggdrasil", "fenrir"],
    ambientStyle: "celestial",
    accentColor: "#a78bfa",
  },
];

export function getMythById(id: string): MythEntry | undefined {
  return myths.find((m) => m.id === id);
}

export function getMythsByCategory(category: string): MythEntry[] {
  return myths.filter((m) => m.category === category);
}

export function getRelatedMyths(myth: MythEntry): MythEntry[] {
  return myth.relatedIds
    .map((id) => getMythById(id))
    .filter(Boolean) as MythEntry[];
}

export const ALL_CATEGORIES = [
  "greek",
  "norse",
  "japanese",
  "urban-legend",
  "creepypasta",
  "dream-symbol",
  "celtic",
  "egyptian",
] as const;

export const ALL_EMOTION_TAGS = [
  "fear", "wonder", "sorrow", "rage", "love",
  "awe", "dread", "hope", "grief", "mystery",
] as const;

export const ALL_SYMBOL_TAGS = [
  "water", "fire", "snake", "mirror", "forest", "moon",
  "death", "rebirth", "transformation", "curse", "gaze",
  "shadow", "wolf", "eye", "infinity", "blood", "light",
  "darkness", "spider", "door", "void",
] as const;
