// Spirit lineup. Copy mirrors the brand's own factual descriptions (farms,
// process) — no invented ABV, pricing, or awards. Sourcing facts are drawn from
// the brand's published material.

export interface Spirit {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  ingredients: string[];
  source: string;
  cocktail: { name: string; note: string };
  badges: string[];
  liquid: string;
  accent: string;
  image: string;
}

export const SPIRITS: Spirit[] = [
  {
    slug: "peach-grain-vodka",
    name: "Vodka from Peaches & Grains",
    category: "Vodka",
    tagline: "Georgia peaches and wheat, distilled twelve times.",
    description:
      "Over twenty-two Dickey Farms peaches go into every bottle, mellowed with wheat and distilled twelve times. Not flavored — built from the fruit itself. Bright, clean, and seasonal, made for crisp cocktails and easy sipping.",
    tastingNotes: ["Faint fresh peach", "Clean wheat", "Dry, soft finish"],
    ingredients: ["Georgia peaches", "Wheat"],
    source: "Dickey Farms · Musella, GA",
    cocktail: {
      name: "Garden Mule",
      note: "Peach-grain vodka, ginger beer, lime, fresh mint.",
    },
    badges: ["Georgia Grown", "Seasonal", "Distilled 12x"],
    liquid: "#eef1ef",
    accent: "#e8c074",
    image: "/images/spirits/peach-grain-vodka.jpg",
  },
  {
    slug: "smoked-apple-brandy",
    name: "Smoked Apple Brandy",
    category: "Brandy",
    tagline: "Heirloom mountain apples, kissed with applewood smoke.",
    description:
      "Heirloom apples from Penland Orchard in Ellijay, smoked with applewood for a soft line of smoke over orchard sweetness. Warm and unhurried — a spirit for cool evenings, neat or stirred into something brown and bitter.",
    tastingNotes: ["Baked apple", "Applewood smoke", "Oak & spice"],
    ingredients: ["North Georgia apples", "Applewood smoke"],
    source: "Penland Orchard · Ellijay, GA",
    cocktail: {
      name: "Orchard Old Fashioned",
      note: "Smoked apple brandy, demerara, aromatic bitters, orange peel.",
    },
    badges: ["Georgia Grown", "Seasonal", "Smoked"],
    liquid: "#a8551f",
    accent: "#d8995a",
    image: "/images/spirits/smoked-apple-brandy.png",
  },
  {
    slug: "gullah-geechee-gin",
    name: "Gullah Geechee Gin",
    category: "Gin",
    tagline: "Organic botanicals with Lowcountry soul.",
    description:
      "Organic botanicals from Gilliard Farms in Gullah-Geechee country make a gin that's lush, fragrant, and juniper-forward. Bright and aromatic, it lifts a martini and stands tall in a Negroni without losing its Southern accent.",
    tastingNotes: ["Juniper", "Garden herbs", "Warm spice"],
    ingredients: ["Juniper", "Organic Georgia botanicals"],
    source: "Gilliard Farms · Brunswick, GA",
    cocktail: {
      name: "Lowcountry Negroni",
      note: "Gullah Geechee gin, sweet vermouth, bitter aperitivo, orange.",
    },
    badges: ["Georgia Grown", "Organic", "Seasonal"],
    liquid: "#dfe7d6",
    accent: "#bcd08f",
    image: "/images/spirits/gullah-geechee-gin.jpg",
  },
  {
    slug: "amaro-georgiano",
    name: "Amaro Georgiano",
    category: "Amaro",
    tagline: "An Italian-style digestivo, grown in Georgia.",
    description:
      "An Italian-style digestivo built from Georgia-grown roots, flowers, and botanicals. Layers of bittersweet bark, dark herbs, and citrus peel settle into a long, gentle finish. Pour it neat after dinner, over ice with an orange twist, or into a stirred cocktail.",
    tastingNotes: ["Bittersweet root", "Dark herbs", "Citrus peel"],
    ingredients: ["Georgia botanicals", "Roots & flowers", "Citrus"],
    source: "Botanicals grown in Georgia",
    cocktail: {
      name: "Georgiano Spritz",
      note: "Amaro Georgiano, sparkling wine, soda, orange wheel.",
    },
    badges: ["Georgia Grown", "Small Batch", "Digestivo"],
    liquid: "#5e1f12",
    accent: "#c17a3f",
    image: "/images/spirits/amaro-georgiano.jpg",
  },
];

export const getSpirit = (slug: string) => SPIRITS.find((s) => s.slug === slug);
