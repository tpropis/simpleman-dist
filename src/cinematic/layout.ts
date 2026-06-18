import type { Key } from "./range";

// Vertical world position of each scene group. The camera dollies DOWN this
// column as you scroll — that vertical travel is the cinematic path.
export const ANCHOR = {
  hero: 0,
  spirits: -24,
  process: -50,
  outro: -74,
} as const;

// Camera Y keyframes against global scroll (0..1).
export const CAMERA_KEYS: Key[] = [
  { s: 0.0, y: ANCHOR.hero },
  { s: 0.08, y: ANCHOR.hero },
  { s: 0.24, y: ANCHOR.spirits },
  { s: 0.4, y: ANCHOR.spirits },
  { s: 0.52, y: ANCHOR.process },
  { s: 0.68, y: ANCHOR.process },
  { s: 0.8, y: ANCHOR.outro },
  { s: 1.0, y: ANCHOR.outro },
];

// Scroll past this and the canvas fades for the DOM break (bar / events / visit).
export const CANVAS_FADE_START = 0.74;

// Drives Nav highlight + reduced-motion camera snapping.
export const SECTIONS = [
  "hero",
  "spirits",
  "process",
  "bar",
  "events",
  "visit",
] as const;
export type SectionId = (typeof SECTIONS)[number];

export const SECTION_ANCHOR: Record<SectionId, number> = {
  hero: ANCHOR.hero,
  spirits: ANCHOR.spirits,
  process: ANCHOR.process,
  bar: ANCHOR.outro,
  events: ANCHOR.outro,
  visit: ANCHOR.outro,
};

// --- Content ----------------------------------------------------------------

export const HERO = {
  eyebrow: "Cumming City Center · Must be 21+",
  lines: ["Georgia", "in a"],
  accentWord: "glass.",
  subtext:
    "Small-batch spirits, Southern food, and a cocktail bar built around real Georgia ingredients — from field, to still, to glass.",
};

export const PROCESS_STEPS = [
  {
    key: "field",
    n: "01",
    label: "Field",
    title: "It starts in Georgia soil",
    body: "Peaches from Dickey Farms. Apples from Penland Farms. Botanicals grown across the state. Real ground, real growers.",
  },
  {
    key: "still",
    n: "02",
    label: "Still",
    title: "Distilled small-batch in copper",
    body: "In-house, in small runs, over copper. We smoke the apples low and rest spirits on charred oak. Patience is the only shortcut.",
  },
  {
    key: "glass",
    n: "03",
    label: "Glass",
    title: "Poured with Southern hospitality",
    body: "Neat, on a rock, or built into a craft cocktail — served at the bar like you're a neighbor.",
  },
] as const;
