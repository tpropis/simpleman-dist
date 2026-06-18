import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { GLBoundary, webglAvailable } from "../three/glSupport";
import FieldToGlassTimeline from "./FieldToGlassTimeline";
import SectionHeading from "./SectionHeading";

const ScrollStoryScene = lazy(() => import("../three/ScrollStoryScene"));

const ACTS = [
  {
    n: "01",
    label: "Field",
    title: "It starts in Georgia soil",
    body: "Peaches from Dickey Farms. Apples from Penland Farms. Botanicals grown across the state. Real ground, real growers.",
    range: [0, 0.05, 0.25, 0.32],
  },
  {
    n: "02",
    label: "Still",
    title: "Distilled small-batch in copper",
    body: "In-house, in small runs, over copper. We smoke the apples low and rest spirits on charred oak. Patience is the only shortcut.",
    range: [0.36, 0.44, 0.58, 0.66],
  },
  {
    n: "03",
    label: "Glass",
    title: "Poured with Southern hospitality",
    body: "It lands in your glass at the bar — neat, on a rock, or built into a craft cocktail — served like you're a neighbor.",
    range: [0.7, 0.78, 0.93, 1],
  },
] as const;

function ActText({
  act,
  progress,
}: {
  act: (typeof ACTS)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [...act.range], [0, 1, 1, 0]);
  const y = useTransform(progress, [act.range[0], act.range[1]], [40, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex items-center"
    >
      <div className="container-tight px-5 sm:px-8">
        <div className="max-w-md">
          <p className="eyebrow">
            {act.n} · {act.label}
          </p>
          <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-shadow-deep sm:text-5xl md:text-6xl">
            {act.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-cream-dim sm:text-lg">
            {act.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Scroll-driven 3D narrative: a sticky WebGL canvas whose camera, lighting, and
 * mood shift through three acts (Field → Still → Glass) as the user scrolls a
 * tall section. Falls back to the static timeline when WebGL is unavailable or
 * the user prefers reduced motion.
 */
export default function ScrollStory() {
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"pending" | "gl" | "flat">("pending");
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    setMode(!reduced && webglAvailable() ? "gl" : "flat");
  }, [reduced]);

  // Flat fallback (also the initial render to avoid any flash of empty canvas).
  if (mode !== "gl") {
    return (
      <section className="section grain relative overflow-hidden">
        <div className="container-tight relative">
          <SectionHeading
            align="center"
            eyebrow="Field → Still → Glass"
            title="Follow a Georgia peach into your glass"
            intro="Every pour has a path. Here's the one ours takes — from the orchard to the bar."
            className="mx-auto"
          />
          <FieldToGlassTimeline />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[340vh] bg-charcoal-900"
      aria-label="From field to glass — scroll story"
    >
      <div className="sticky top-0 h-screen overflow-hidden grain">
        <GLBoundary
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-[#1b1107] via-charcoal-800 to-charcoal-900" />
          }
        >
          <Suspense fallback={null}>
            <Canvas
              className="!absolute inset-0"
              shadows
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              camera={{ position: [0, 1.25, 6.6], fov: 32 }}
            >
              <ScrollStoryScene progress={progressRef} reduced={false} />
            </Canvas>
          </Suspense>
        </GLBoundary>

        {/* left-side legibility scrim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,7,0.9)_0%,rgba(13,10,7,0.4)_45%,transparent_75%)]"
        />

        {ACTS.map((a) => (
          <ActText key={a.n} act={a} progress={scrollYProgress} />
        ))}

        {/* act progress rail */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {ACTS.map((a, i) => (
            <Rail key={a.n} index={i} progress={scrollYProgress} label={a.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Rail({
  index,
  progress,
  label,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  label: string;
}) {
  const start = index / 3;
  const end = (index + 1) / 3;
  const opacity = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0.3, 1, 1, 0.3]);
  return (
    <motion.span style={{ opacity }} className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
      <span className="text-[10px] uppercase tracking-widest2 text-cream-dim">
        {label}
      </span>
    </motion.span>
  );
}
