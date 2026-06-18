// Central brand + location facts.
// Every fact here is drawn from public, verifiable sources about Simple Man
// Distillery. Nothing about awards, pricing, ABV, distribution, or shipping is
// invented. Where a detail (exact street address, hours) is not verified, copy
// directs visitors to contact the distillery instead of stating a guess.

export const SITE = {
  name: "Simple Man Distillery",
  shortName: "Simple Man",
  tagline: "Georgia in a glass.",
  location: {
    venue: "Cumming City Center",
    city: "Cumming",
    state: "Georgia",
    region: "Metro Atlanta",
    // Exact suite + hours intentionally left to the contact flow rather than
    // guessed. Update these when confirmed.
    addressNote: "Cumming City Center · Cumming, Georgia",
  },
  founder: "Justin Douglas",
  founded: 2023,
  // Verified: spirits are designated "Georgia Grown" by the Georgia Department
  // of Agriculture.
  georgiaGrown: true,
  age: "Must be 21+",
  responsibility: "Please enjoy responsibly. Never drink and drive.",
  social: {
    facebook: "https://www.facebook.com/SimpleManDistillery/",
  },
  // House email is a placeholder pattern for the contact form mailto fallback.
  contactEmail: "hello@simplemandistillery.com",
} as const;

export const FARMS = [
  { name: "Dickey Farms", place: "Musella, GA", crop: "Peaches" },
  { name: "Penland Farms", place: "Ellijay, GA", crop: "Apples" },
] as const;
