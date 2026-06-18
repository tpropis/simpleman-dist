interface Props {
  variant?: "full" | "wordmark" | "mark";
  className?: string;
  /** Accessible name; set "" when a nearby text label already names it. */
  title?: string;
}

/**
 * Simple Man Distillery identity — a copper seal emblem plus a serif wordmark.
 * Pure inline SVG: crisp at any size, themeable, and shipped as code (no asset
 * request). Used in the header, footer, age gate, and as the favicon source.
 */
export default function Logo({
  variant = "full",
  className = "",
  title = "Simple Man Distillery",
}: Props) {
  const mark = (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-auto flex-none"
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
    >
      <defs>
        <linearGradient id="smd-copper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8c074" />
          <stop offset="0.5" stopColor="#c17a3f" />
          <stop offset="1" stopColor="#8c5126" />
        </linearGradient>
        <path id="smd-top" d="M 18,60 A 42,42 0 0 1 102,60" fill="none" />
        <path id="smd-bottom" d="M 22,60 A 38,38 0 0 0 98,60" fill="none" />
      </defs>

      {/* rings */}
      <circle cx="60" cy="60" r="57" fill="none" stroke="url(#smd-copper)" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#smd-copper)" strokeWidth="0.8" opacity="0.7" />

      {/* arc text */}
      <text
        fill="url(#smd-copper)"
        fontFamily='"Playfair Display", Georgia, serif'
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="2.2"
      >
        <textPath href="#smd-top" startOffset="50%" textAnchor="middle">
          SIMPLE MAN
        </textPath>
      </text>
      <text
        fill="url(#smd-copper)"
        fontFamily='"Inter", system-ui, sans-serif'
        fontSize="6.2"
        fontWeight="500"
        letterSpacing="3"
      >
        <textPath href="#smd-bottom" startOffset="50%" textAnchor="middle">
          CUMMING CITY CENTER · GA
        </textPath>
      </text>

      {/* side diamonds */}
      <path d="M14 60l3-3 3 3-3 3z" fill="url(#smd-copper)" />
      <path d="M100 60l3-3 3 3-3 3z" fill="url(#smd-copper)" />

      {/* center: pot still motif */}
      <g stroke="url(#smd-copper)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* pot */}
        <path d="M49 66c0-6 5-9 11-9s11 3 11 9-5 9-11 9-11-3-11-9z" />
        {/* onion head */}
        <path d="M57 52c0-2 1.5-3 3-3s3 1 3 3-1.5 3.5-3 3.5-3-1.5-3-3.5z" />
        {/* swan neck */}
        <path d="M63 50c4 0 7 3 7 8v9" />
        {/* base */}
        <path d="M52 75h16" />
      </g>
      <text
        x="60"
        y="90"
        textAnchor="middle"
        fill="url(#smd-copper)"
        fontFamily='"Inter", system-ui, sans-serif'
        fontSize="6"
        fontWeight="600"
        letterSpacing="2.5"
      >
        EST. 2023
      </text>
    </svg>
  );

  const wordmark = (
    <span className="flex flex-col leading-none">
      <span className="font-display text-xl font-bold tracking-wide text-cream sm:text-2xl">
        Simple Man
      </span>
      <span className="mt-0.5 text-[10px] uppercase tracking-widest2 text-copper-light">
        Distillery
      </span>
    </span>
  );

  if (variant === "mark") return <span className={className}>{mark}</span>;
  if (variant === "wordmark") return <span className={className}>{wordmark}</span>;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {mark}
      {wordmark}
    </span>
  );
}
