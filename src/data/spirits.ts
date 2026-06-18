// Spirit lineup. Descriptions focus on flavor, ingredients, craft, origin, and
// process only — no health, mood, status, ABV, pricing, or award claims.
// Sourcing facts (Dickey Farms peaches, Penland Farms apples, "first vodka made
// from peaches", Georgia Grown designation) are drawn from public reporting.

export interface Spirit {
  slug: string;
  name: string;
  category: string;
  // Short, punchy line for cards.
  tagline: string;
  // Longer premium description.
  description: string;
  tastingNotes: string[];
  ingredients: string[];
  source: string;
  cocktail: { name: string; note: string };
  badges: string[];
  // Liquid color for the generated SVG bottle art.
  liquid: string;
  accent: string;
  // Optional real photo — drop a file at this path and it replaces the art.
  image: string;
}

export const SPIRITS: Spirit[] = [
  {
    slug: "peach-grain-vodka",
    name: "Vodka from Peaches & Grains",
    category: "Vodka",
    tagline: "Over fifty Georgia peaches in every bottle.",
    description:
      "Distilled from Georgia produce and grain — not flavored with syrup or additives. Each bottle carries more than fifty peaches grown at Dickey Farms in Musella, leaving the faintest nose and finish of fresh fruit in a clean, dry pour. Bright, smooth, and built for crisp cocktails or easy sipping over a single rock.",
    tastingNotes: ["Faint fresh peach", "Clean grain", "Dry, soft finish"],
    ingredients: ["Georgia peaches", "Georgia grain"],
    source: "Dickey Farms · Musella, GA",
    cocktail: {
      name: "Garden Mule",
      note: "Peach-grain vodka, ginger beer, lime, fresh mint.",
    },
    badges: ["Georgia ingredients", "Small batch", "Cocktail friendly"],
    liquid: "#eef1ef",
    accent: "#e8c074",
    image: "/images/spirits/peach-grain-vodka.jpg",
  },
  {
    slug: "smoked-apple-brandy",
    name: "Smoked Apple Brandy",
    category: "Brandy",
    tagline: "Mountain apples, charred oak, slow smoke.",
    description:
      "Made with apples grown at Penland Farms in Ellijay and coaxed over a low smoke before resting on oak. Warm and orchard-sweet up front, with a curl of campfire and barrel spice on the back. A spirit for cool evenings, neat or stirred into something brown and bitter.",
    tastingNotes: ["Baked apple", "Wood smoke", "Oak & spice"],
    ingredients: ["North Georgia apples", "Charred oak"],
    source: "Penland Farms · Ellijay, GA",
    cocktail: {
      name: "Orchard Old Fashioned",
      note: "Smoked apple brandy, demerara, aromatic bitters, orange peel.",
    },
    badges: ["Georgia ingredients", "Barrel-rested", "Small batch"],
    liquid: "#a8551f",
    accent: "#d8995a",
    image: "/images/spirits/smoked-apple-brandy.jpg",
  },
  {
    slug: "gullah-geechee-gin",
    name: "Gullah Geechee Gin",
    category: "Gin",
    tagline: "Coastal botanicals with Lowcountry soul.",
    description:
      "A gin rooted in the botanicals and foodways of the Gullah Geechee coast — juniper led, but layered with garden herbs and warm spice. Bright and aromatic, it lifts a martini and stands tall in a Negroni without losing its Southern accent.",
    tastingNotes: ["Juniper", "Garden herbs", "Warm spice"],
    ingredients: ["Juniper", "Georgia botanicals"],
    source: "Botanicals grown & gathered in Georgia",
    cocktail: {
      name: "Lowcountry Negroni",
      note: "Gullah Geechee gin, sweet vermouth, bitter aperitivo, orange.",
    },
    badges: ["Botanical", "Small batch", "Cocktail friendly"],
    liquid: "#dfe7d6",
    accent: "#bcd08f",
    image: "/images/spirits/gullah-geechee-gin.jpg",
  },
  {
    slug: "amaro-georgiano",
    name: "Amaro Georgiano",
    category: "Amaro",
    tagline: "A Georgia answer to the Italian digestivo.",
    description:
      "Our bittersweet amaro, built from botanicals planted and gathered across Georgia. Layers of root, bark, citrus peel, and dark herbs settle into a long, gentle bitterness. Pour it neat after dinner, over ice with an orange twist, or splashed into a stirred cocktail.",
    tastingNotes: ["Bittersweet root", "Dark herbs", "Citrus peel"],
    ingredients: ["Georgia botanicals", "Citrus", "Roots & barks"],
    source: "Botanicals grown in Georgia",
    cocktail: {
      name: "Georgiano Spritz",
      note: "Amaro Georgiano, sparkling wine, soda, orange wheel.",
    },
    badges: ["Botanical", "After-dinner", "Limited release"],
    liquid: "#5e1f12",
    accent: "#c17a3f",
    image: "/images/spirits/amaro-georgiano.jpg",
  },
];

export const getSpirit = (slug: string) =>
  SPIRITS.find((s) => s.slug === slug);
