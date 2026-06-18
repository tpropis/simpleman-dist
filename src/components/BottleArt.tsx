interface Props {
  liquid: string;
  accent: string;
  label?: string;
  /** Short product type shown large on the label, e.g. "Vodka". */
  category?: string;
  className?: string;
}

/**
 * Generated SVG bottle silhouette with a tinted "liquid" fill and a copper
 * glow. Used as the default premium product visual so no photography is
 * required; a real photo (Spirit.image) overrides it where available.
 */
export default function BottleArt({
  liquid,
  accent,
  label,
  category,
  className = "",
}: Props) {
  const id = (label || liquid).replace(/[^a-z0-9]/gi, "");
  return (
    <svg
      viewBox="0 0 120 320"
      role="img"
      aria-label={label ? `${label} bottle illustration` : "Bottle illustration"}
      className={className}
    >
      <defs>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={liquid} stopOpacity="0.9" />
          <stop offset="1" stopColor={liquid} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.55" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`body-${id}`}>
          <path d="M40 92 q0 -10 5 -16 l3 -18 q0.5 -3 -1 -6 V36 h26 v16 q-1.5 3 -1 6 l3 18 q5 6 5 16 V300 q0 8 -8 8 H48 q-8 0 -8 -8 Z" />
        </clipPath>
      </defs>

      {/* copper glow behind */}
      <ellipse cx="60" cy="220" rx="70" ry="110" fill={`url(#glow-${id})`} />

      {/* liquid (lower portion, clipped to bottle body) */}
      <g clipPath={`url(#body-${id})`}>
        <rect x="30" y="150" width="60" height="170" fill={`url(#liq-${id})`} />
        {/* subtle surface line */}
        <rect x="30" y="150" width="60" height="3" fill="#ffffff" opacity="0.25" />
      </g>

      {/* glass outline + sheen */}
      <path
        d="M40 92 q0 -10 5 -16 l3 -18 q0.5 -3 -1 -6 V36 h26 v16 q-1.5 3 -1 6 l3 18 q5 6 5 16 V300 q0 8 -8 8 H48 q-8 0 -8 -8 Z"
        fill={`url(#glass-${id})`}
        stroke={accent}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      {/* cap */}
      <rect x="46" y="18" width="28" height="20" rx="3" fill={accent} opacity="0.9" />
      <rect x="48" y="36" width="24" height="6" rx="2" fill="#8c5126" opacity="0.8" />

      {/* branded label */}
      <rect
        x="36"
        y="172"
        width="48"
        height="74"
        rx="3"
        fill="#14100c"
        opacity="0.62"
        stroke={accent}
        strokeOpacity="0.55"
      />
      <rect x="40" y="176" width="40" height="66" rx="2" fill="none" stroke={accent} strokeOpacity="0.25" />
      <text x="60" y="190" textAnchor="middle" fill={accent} fontFamily='"Inter", sans-serif' fontSize="6.5" fontWeight="600" letterSpacing="1.6">
        SIMPLE MAN
      </text>
      <line x1="46" y1="195" x2="74" y2="195" stroke={accent} strokeOpacity="0.5" />
      <text x="60" y="214" textAnchor="middle" fill="#f3e8d6" fontFamily='"Playfair Display", Georgia, serif' fontSize="13" fontWeight="700">
        {(category || "Spirit").toUpperCase()}
      </text>
      <text x="60" y="230" textAnchor="middle" fill="#cdbfa9" fontFamily='"Inter", sans-serif' fontSize="5" letterSpacing="1.4">
        SMALL BATCH
      </text>
      <text x="60" y="238" textAnchor="middle" fill={accent} fontFamily='"Inter", sans-serif' fontSize="4.5" letterSpacing="2">
        GEORGIA · EST. 2023
      </text>

      {/* highlight streak */}
      <rect x="44" y="100" width="4" height="190" rx="2" fill="#fff" opacity="0.12" />
    </svg>
  );
}
