import { useStore } from "./store";
import { PROCESS_STEPS } from "./layout";
import Reveal from "./Reveal";

/**
 * Sticky text overlay for the Field → Still → Glass section. The 3D stage
 * carries the visuals (grain field, copper still, glass) so this stays clean
 * type — and avoids leaning on any low-res photography.
 */
export default function ProcessLabels() {
  const n = PROCESS_STEPS.length;
  const idx = useStore((s) =>
    Math.min(n - 1, Math.max(0, Math.floor(s.processProgress * n)))
  );
  const step = PROCESS_STEPS[idx];

  return (
    <div className="sticky top-0 flex h-screen items-center">
      <div className="container-tight px-5 sm:px-8">
        <div className="max-w-md">
          <p className="eyebrow">From field, to still, to glass</p>
          <div key={step.key}>
            <Reveal as="span" className="mt-3 block font-display text-7xl text-gradient-ember">
              {step.n}
            </Reveal>
            <Reveal as="h2" delay={60} className="mt-2 block text-4xl text-cream sm:text-5xl">
              {step.title}
            </Reveal>
            <Reveal as="p" delay={120} className="mt-5 block text-lg leading-relaxed text-muted-foreground">
              {step.body}
            </Reveal>
          </div>
          <div className="mt-8 flex gap-2">
            {PROCESS_STEPS.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-gold" : "w-2 bg-cream/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
