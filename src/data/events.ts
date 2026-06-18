// Event formats offered at the distillery. These describe the *types* of
// experiences — no specific dates are invented. When real dates are confirmed,
// add a `date` field and surface it on the card.

export interface EventType {
  slug: string;
  title: string;
  cadence: string;
  description: string;
  icon: "tasting" | "cocktail" | "private" | "music" | "release";
}

export const EVENT_TYPES: EventType[] = [
  {
    slug: "tastings",
    title: "Guided Tastings",
    cadence: "Reserve ahead",
    description:
      "Walk the lineup with someone who knows it — peach-grain vodka, smoked apple brandy, gin, and amaro, poured in measured tasting pours with the farm stories behind each one.",
    icon: "tasting",
  },
  {
    slug: "cocktail-nights",
    title: "Cocktail Nights",
    cadence: "Select evenings",
    description:
      "The bar leans into its speakeasy side: seasonal craft cocktails, low light, and a menu built around what's coming off Georgia farms right now.",
    icon: "cocktail",
  },
  {
    slug: "private-events",
    title: "Private Events",
    cadence: "By arrangement",
    description:
      "The barrel room and private booths host birthdays, gatherings, and corporate evenings. Tell us the occasion and we'll shape the experience around it.",
    icon: "private",
  },
  {
    slug: "live-music",
    title: "Live Music",
    cadence: "Select evenings",
    description:
      "Southern sound to match the room — acoustic sets and local players woven into cocktail nights through the season.",
    icon: "music",
  },
  {
    slug: "seasonal-releases",
    title: "Seasonal Releases",
    cadence: "As the harvest allows",
    description:
      "Small, limited batches tied to the Georgia growing calendar. Join the list to hear when a new release is poured for the first time.",
    icon: "release",
  },
];
