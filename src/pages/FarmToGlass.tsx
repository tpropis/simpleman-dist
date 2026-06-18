import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import FieldToGlassTimeline from "../components/FieldToGlassTimeline";
import CtaBanner from "../components/CtaBanner";
import { FARMS } from "../data/site";

export default function FarmToGlass() {
  return (
    <>
      <Seo
        title="Farm to Glass"
        description="Simple Man Distillery partners with single-family Georgia farms — peaches from Dickey Farms, apples from Penland Farms, and botanicals grown statewide. From field, to still, to glass."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="From field, to still, to glass"
        title={
          <>
            We start where the{" "}
            <span className="text-gradient-gold">food</span> starts
          </>
        }
        subtitle="Farm-to-glass isn't a slogan here — it's the supply chain. Real Georgia farms, real seasonal ingredients, distilled small-batch in-house."
        image="/images/farm/orchard.jpg"
        fallbackClassName="bg-gradient-to-br from-[#3a2e16] via-charcoal-800 to-charcoal-900"
      />

      <section className="section">
        <div className="container-tight">
          <SectionHeading
            align="center"
            eyebrow="The journey"
            title="Follow a Georgia peach into your glass"
            className="mx-auto"
          />
          <FieldToGlassTimeline />
        </div>
      </section>

      {/* Farm partners */}
      <section className="section grain relative overflow-hidden">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Our growers"
            title="Made by neighbors. Poured for neighbors."
            intro="We work with single-family Georgia farms and name them proudly — because the people behind the produce are half the story."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FARMS.map((f, i) => (
              <AnimatedSection key={f.name} delay={i * 0.08}>
                <div className="flex items-center gap-5 rounded-2xl glass p-7">
                  <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-copper/40 font-display text-2xl text-gold-light">
                    {f.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-cream">{f.name}</h3>
                    <p className="text-sm text-cream-dim">{f.place}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-copper-light">
                      {f.crop}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8">
            <p className="max-w-2xl text-sm text-cream-muted">
              Our spirits are designated <span className="text-cream">Georgia Grown</span>{" "}
              by the Georgia Department of Agriculture — a mark of ingredients
              sourced from Georgia farms.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
