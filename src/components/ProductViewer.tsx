import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GLBoundary, webglAvailable } from "../three/glSupport";
import PremiumButton from "./PremiumButton";
import { SPIRITS } from "../data/spirits";

const ProductScene = lazy(() => import("../three/ProductScene"));

/**
 * Interactive product showcase. Leads with the real bottle photography and lets
 * visitors switch spirits via swatches; an optional "Spin in 3D" toggle drops in
 * a drag-to-rotate real-time bottle (when WebGL is available).
 */
export default function ProductViewer() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"photo" | "3d">("photo");
  const [gl, setGl] = useState(false);

  useEffect(() => {
    setGl(webglAvailable());
  }, []);

  const spirit = SPIRITS[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      {/* Stage */}
      <div className="relative">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl glass">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(193,122,63,0.22),transparent_70%)]"
          />

          {mode === "3d" && gl ? (
            <GLBoundary
              fallback={
                <PhotoStage spirit={spirit} reduced={reduced} key="fallback" />
              }
            >
              <Suspense fallback={null}>
                <Canvas
                  className="!absolute inset-0"
                  dpr={[1, 1.6]}
                  gl={{ antialias: true, alpha: false }}
                  camera={{ position: [0, 0.4, 6], fov: 32 }}
                >
                  <ProductScene
                    liquid={spirit.liquid}
                    label={spirit.category}
                    reduced={reduced}
                  />
                </Canvas>
              </Suspense>
            </GLBoundary>
          ) : (
            <AnimatePresence mode="wait">
              <PhotoStage spirit={spirit} reduced={reduced} key={spirit.slug} />
            </AnimatePresence>
          )}

          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest2 text-cream-muted">
            {mode === "3d" ? "Drag to rotate" : "Georgia-made, small batch"}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {SPIRITS.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`View ${s.name}`}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all ${
                i === active
                  ? "border-gold-light/70 bg-charcoal-600/60 text-cream"
                  : "border-copper/25 text-cream-muted hover:border-copper/60 hover:text-cream"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: s.liquid, boxShadow: `0 0 8px ${s.accent}` }}
              />
              {s.category}
            </button>
          ))}
          {gl && (
            <button
              onClick={() => setMode((m) => (m === "3d" ? "photo" : "3d"))}
              className="rounded-full border border-copper/40 px-4 py-2 text-xs uppercase tracking-widest2 text-gold-light transition-colors hover:border-gold-light"
            >
              {mode === "3d" ? "View Photo" : "Spin in 3D"}
            </button>
          )}
        </div>
      </div>

      {/* Details */}
      <div>
        <p className="eyebrow">{spirit.category}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {spirit.name}
        </h3>
        <p className="mt-4 leading-relaxed text-cream-dim">{spirit.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {spirit.tastingNotes.map((n) => (
            <li
              key={n}
              className="rounded-full border border-copper/25 px-3 py-1 text-xs text-cream-dim"
            >
              {n}
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-2xl border border-copper/20 bg-charcoal-800/50 p-4 text-sm text-cream-dim">
          <span className="text-copper-light">Source · </span>
          {spirit.source}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <PremiumButton to="/where-to-buy" size="sm">
            Find Near You
          </PremiumButton>
          <PremiumButton to={`/spirits#${spirit.slug}`} variant="outline" size="sm">
            Full Profile
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}

function PhotoStage({
  spirit,
  reduced,
}: {
  spirit: (typeof SPIRITS)[number];
  reduced: boolean;
}) {
  return (
    <motion.img
      src={spirit.image}
      alt={`${spirit.name} bottle`}
      loading="lazy"
      decoding="async"
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute inset-0 h-full w-full object-contain p-8 drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
    />
  );
}
