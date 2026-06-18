interface Props {
  /** 0–1 overall intensity */
  intensity?: number;
  className?: string;
}

/**
 * Pure-CSS drifting smoke / mist. No image asset required. Sits absolutely
 * inside a relatively-positioned parent. Honors prefers-reduced-motion via the
 * global CSS reset that neutralizes animations.
 */
export default function SmokeOverlay({ intensity = 0.5, className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute -inset-1/4 animate-drift blur-3xl"
        style={{
          background:
            "radial-gradient(40% 50% at 30% 40%, rgba(193,122,63,0.35), transparent 70%), radial-gradient(35% 45% at 70% 60%, rgba(110,34,48,0.30), transparent 70%)",
        }}
      />
      <div
        className="absolute -inset-1/4 animate-drift blur-3xl"
        style={{
          animationDelay: "-12s",
          background:
            "radial-gradient(45% 40% at 60% 30%, rgba(224,168,95,0.22), transparent 70%)",
        }}
      />
    </div>
  );
}
