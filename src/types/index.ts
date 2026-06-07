export type MythCategory =
  | "greek"
  | "norse"
  | "japanese"
  | "chinese"
  | "korean"
  | "african"
  | "mesoamerican"
  | "native-american"
  | "hindu"
  | "mesopotamian"
  | "slavic"
  | "polynesian"
  | "persian"
  | "celtic"
  | "egyptian"
  | "aboriginal"
  | "tibetan"
  | "inuit"
  | "vodou"
  | "vietnamese"
  | "thai"
  | "urban-legend"
  | "creepypasta"
  | "dream-symbol";

export type EmotionTag =
  | "fear"
  | "wonder"
  | "sorrow"
  | "rage"
  | "love"
  | "awe"
  | "dread"
  | "hope"
  | "grief"
  | "mystery";

export type SymbolTag =
  | "water"
  | "fire"
  | "snake"
  | "mirror"
  | "forest"
  | "moon"
  | "death"
  | "rebirth"
  | "transformation"
  | "curse"
  | "gaze"
  | "shadow"
  | "wolf"
  | "eye"
  | "infinity"
  | "blood"
  | "light"
  | "darkness"
  | "spider"
  | "door"
  | "void";

export type AmbientStyle = "dark" | "surreal" | "ethereal" | "infernal" | "oceanic" | "celestial";

export interface MythEntry {
  id: string;
  title: string;
  category: MythCategory;
  summary: string;
  description: string;
  tags: string[];            // emotion + symbol tags combined
  emotionTags: EmotionTag[];
  symbolTags: SymbolTag[];
  relatedIds: string[];      // explicit relationships
  origin: string;            // cultural/geographical origin
  ambientStyle: AmbientStyle;
  accentColor: string;       // hex colour for graph node + page accent
  imageAlt?: string;         // placeholder description for image
  sources?: string[];
}

export interface DreamEntry {
  id: string;
  text: string;
  emotionTags: EmotionTag[];
  symbolTags: SymbolTag[];
  extractedMythIds: string[]; // myths linked by classifier
  timestamp: number;
  title?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: "myth" | "symbol" | "dream";
  category?: MythCategory;
  accentColor: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  weight: number; // 1 = explicit, 0.5 = shared tag
}
