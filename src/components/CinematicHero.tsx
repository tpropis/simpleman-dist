import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import MediaBackground from "./MediaBackground";
import SmokeOverlay from "./SmokeOverlay";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional video path; falls back to gradient art if absent. */
  video?: string;
  image?: string;
  fallbackClassName?: string;
  children?: ReactNode;
  /** Full-screen homepage hero vs. shorter page header. */
  size?: "full" | "page";
  align?: "center" | "left";
}

/**
 * Cinematic hero with parallax background, drifting smoke, copper glow, grain,
 * and a vignette. Works with or without a real video — see MediaBackground.
 */
export default function CinematicHero({
  eyebrow,
  title,
  subtitle,
  video,
  image,
  fallbackClassName,
  children,
  size = "full",
  align = "center",
}: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.15]);

  const minH =
    size === "full"
      ? "min-h-[100svh]"
      : "min-h-[62vh] pt-28 pb-16 sm:min-h-[68vh]";
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-center text-left";

  return (
    <section
      className={`relative flex ${minH} grain overflow-hidden ${alignment}`}
    >
      {/* parallax media layer */}
      <motion.div style={{ y }} className="absolute inset-0">
        <MediaBackground
          video={video}
          image={image}
          fallbackClassName={fallbackClassName}
        />
      </motion.div>

      <SmokeOverlay intensity={0.55} />

      {/* vignette + bottom fade for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_30%,rgba(13,10,7,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal-900 to-transparent"
      />

      <motion.div
        style={{ opacity }}
        className={`container-tight relative z-10 px-5 sm:px-8 ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <div
          className={`${
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {eyebrow && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={`eyebrow mb-5 inline-flex items-center gap-3 ${
                align === "center" ? "justify-center" : ""
              }`}
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className={`text-shadow-deep font-display font-bold leading-[1.04] ${
              size === "full"
                ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                : "text-4xl sm:text-5xl md:text-6xl"
            }`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className={`mt-6 text-base leading-relaxed text-cream-dim sm:text-lg md:text-xl ${
                align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
              }`}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32 }}
              className="mt-9"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      {size === "full" && (
        <div
          aria-hidden
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream-muted"
        >
          <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
          <span className="h-10 w-px animate-flicker bg-gradient-to-b from-gold-light to-transparent" />
        </div>
      )}
    </section>
  );
}
