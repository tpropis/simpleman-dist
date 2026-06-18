import AnimatedSection from "./AnimatedSection";

interface Step {
  key: string;
  label: string;
  title: string;
  body: string;
  image: string;
  fallback: string;
}

const STEPS: Step[] = [
  {
    key: "field",
    label: "Field",
    title: "It starts in Georgia soil",
    body: "We partner with single-family Georgia farms — peaches from Dickey Farms in Musella, apples from Penland Farms in Ellijay, and botanicals grown across the state. Real ground, real growers.",
    image: "/images/farm/field.jpg",
    fallback: "from-[#3a2e16] via-[#27200f] to-charcoal-900",
  },
  {
    key: "harvest",
    label: "Harvest",
    title: "Picked at the peak of season",
    body: "Fruit and grain come in when they're ready, not when it's convenient. Over fifty peaches go into a single bottle of vodka — whole fruit, never syrup or additives.",
    image: "/images/farm/harvest.jpg",
    fallback: "from-[#5a3a18] via-[#3a2611] to-charcoal-900",
  },
  {
    key: "still",
    label: "Still",
    title: "Distilled small-batch in copper",
    body: "In-house, in small batches, over copper. We smoke the apples low and slow for the brandy and rest spirits on charred oak. Patience is the only shortcut we take.",
    image: "/images/distillery/still.jpg",
    fallback: "from-[#6e3a1f] via-[#3a2212] to-charcoal-900",
  },
  {
    key: "glass",
    label: "Glass",
    title: "Poured with Southern hospitality",
    body: "It lands in your glass at the bar — neat, on a rock, or built into a craft cocktail — served with the kind of welcome you only get from neighbors.",
    image: "/images/bar/cocktail-pour.jpg",
    fallback: "from-[#6e2230] via-[#3a1620] to-charcoal-900",
  },
];

export default function FieldToGlassTimeline() {
  return (
    <div className="relative mt-14">
      {/* vertical spine */}
      <div
        aria-hidden
        className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-copper/10 via-copper/50 to-copper/10 md:left-1/2"
      />

      <ol className="space-y-14 md:space-y-24">
        {STEPS.map((step, i) => {
          const flip = i % 2 === 1;
          return (
            <AnimatedSection as="li" key={step.key} delay={0.05}>
              <div
                className={`relative grid gap-6 md:grid-cols-2 md:items-center ${
                  flip ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* node marker */}
                <span
                  aria-hidden
                  className="absolute left-[11px] top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-gold-light shadow-glow-sm md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-charcoal-900" />
                </span>

                {/* media */}
                <div className="ml-10 md:ml-0 md:[direction:ltr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl glass">
                    <ImageOrFallback image={step.image} fallback={step.fallback} />
                    <span className="absolute left-4 top-4 rounded-full bg-charcoal-900/70 px-3 py-1 text-[10px] uppercase tracking-widest2 text-gold-light">
                      {step.label}
                    </span>
                  </div>
                </div>

                {/* copy */}
                <div
                  className={`ml-10 md:ml-0 md:[direction:ltr] ${
                    flip ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="eyebrow">
                    0{i + 1} · {step.label}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream-dim">
                    {step.body}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </ol>
    </div>
  );
}

function ImageOrFallback({
  image,
  fallback,
}: {
  image: string;
  fallback: string;
}) {
  // Photo overrides the gradient when present; onError reveals the gradient.
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${fallback}`} />
      <div className="absolute inset-0 grain opacity-60" aria-hidden />
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </>
  );
}
