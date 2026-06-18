export interface NavItem {
  label: string;
  to: string;
}

export const NAV: NavItem[] = [
  { label: "Spirits", to: "/spirits" },
  { label: "Bar & Cocktails", to: "/bar" },
  { label: "Farm to Glass", to: "/farm-to-glass" },
  { label: "Events", to: "/events" },
  { label: "Story", to: "/story" },
  { label: "Visit", to: "/visit" },
];

// Secondary links surfaced in the footer (kept out of the primary nav).
export const FOOTER_NAV: NavItem[] = [
  { label: "Where to Buy", to: "/where-to-buy" },
  { label: "Press", to: "/story#press" },
  { label: "Responsible Enjoyment", to: "/responsible-enjoyment" },
];
