import { useStore } from "./store";
import { PROCESS_STEPS } from "./layout";
import Reveal from "./Reveal";

const STEP_IMAGE: Record<string, string> = {
  field: "/images/farm/field.jpg",
  still: "/images/distillery/still.jpg",
  glass: "/images/bar/cocktail-pour.jpg",
};

/** Sticky overlay for the Field → Still → Glass section, scrubbed by scroll. */
export default function ProcessLabels() {
  const n = PROCESS_STEPS.length;
  const idx = useStore((s) =>
    Math.min(n - 1, Math.max(0, Math.floor(s.processProgress * n)))
  );
  const step = PROCESS_STEPS[idx];

  return (
    <div className="sticky top-0 flex h-screen items-center">
      <div className="container-tight grid w-full items-center gap-8 px-5 sm:px-8 md:grid-cols-2">
        <div className="hidden md:block">
          <div key={step.key} className="relative aspect-[4/5] max-h-[30rem] overflow-hidden rounded-3xl glass">
            <Reveal as="div" className="block h-full w-full">
              <img
                src={STEP_IMAGE[step.key]}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Reveal>
            <span className="absolute left-5 top-5 rounded-full bg-charcoal-900/70 px-3 py-1 text-[10px] uppercase tracking-widest2 text-gold-light">
              {step.label}
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow">From field, to still, to glass</p>
          <div key={step.key}>
            <Reveal as="span" className="mt-4 block font-display text-7xl font-bold text-gradient-gold">
              {step.n}
            </Reveal>
            <Reveal as="h2" delay={60} className="mt-2 block font-display text-3xl font-semibold sm:text-4xl">
              {step.title}
            </Reveal>
            <Reveal as="p" delay={120} className="mt-4 block max-w-md text-cream-dim">
              {step.body}
            </Reveal>
          </div>
          <div className="mt-7 flex gap-2">
            {PROCESS_STEPS.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-gold-light" : "w-2 bg-cream/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
