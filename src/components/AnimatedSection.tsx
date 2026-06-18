import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Stagger index for sequential reveals. */
  delay?: number;
  as?: "section" | "div" | "li" | "article";
}

/**
 * Scroll-reveal wrapper. Fades + lifts content into view once, and collapses to
 * an instant, static render when the user prefers reduced motion.
 */
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
