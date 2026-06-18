interface Props {
  variant?: "full" | "wordmark" | "mark";
  className?: string;
  /** Accessible name; set "" when a nearby text label already names it. */
  title?: string;
}

const LOGO_SRC = "/images/logo.png";

/**
 * Simple Man Distillery identity. Uses the real brand logo (a bottle-and-hands
 * seal over the wordmark). Because the artwork is drawn for light backgrounds,
 * the emblem is presented on a cream "seal" badge so it stays crisp and legible
 * on the site's dark surfaces, paired with a cream text wordmark.
 */
export default function Logo({
  variant = "full",
  className = "",
  title = "Simple Man Distillery",
}: Props) {
  // Circular cream badge cropped to the emblem (top of the portrait artwork).
  const badge = (
    <span className="block aspect-square h-full overflow-hidden rounded-full bg-cream shadow-[0_0_0_1px_rgba(216,153,90,0.4),0_6px_20px_-8px_rgba(0,0,0,0.7)]">
      <img
        src={LOGO_SRC}
        alt={title || ""}
        width={455}
        height={652}
        className="block w-full"
        style={{ marginTop: "-4%" }}
      />
    </span>
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

  if (variant === "mark") return <span className={className}>{badge}</span>;
  if (variant === "wordmark") return <span className={className}>{wordmark}</span>;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {badge}
      {wordmark}
    </span>
  );
}
