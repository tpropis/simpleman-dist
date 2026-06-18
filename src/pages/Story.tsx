import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import PressStrip from "../components/PressStrip";
import CtaBanner from "../components/CtaBanner";
import { SITE } from "../data/site";

const PILLARS = [
  {
    title: "Georgia first",
    body: "Ingredients sourced from single-family Georgia farms, designated Georgia Grown by the state's Department of Agriculture.",
  },
  {
    title: "Whole, real, honest",
    body: "Over fifty whole peaches in a bottle of vodka — never syrup or additives. What's on the label is what's in the glass.",
  },
  {
    title: "Built like a speakeasy",
    body: "A working distillery, a barrel room, and a mid-century tasting bar where the welcome is as Southern as the spirits.",
  },
];

export default function Story() {
  return (
    <>
      <Seo
        title="Our Story & Press"
        description="The story of Simple Man Distillery — founder Justin Douglas, Georgia farm partners, and a farm-to-glass distillery at Cumming City Center. Press coverage included. Must be 21+."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="Our story"
        title={
          <>
            Crafted from the farms, flavors, and{" "}
            <span className="text-gradient-gold">stories of the South</span>
          </>
        }
        subtitle="Simple Man Distillery was built on a simple idea: make world-class spirits from real Georgia ingredients, and pour them like you mean it."
        image="/images/distillery/founder.jpg"
        fallbackClassName="bg-gradient-to-br from-[#2a2316] via-charcoal-800 to-charcoal-900"
      />

      {/* Narrative */}
      <section className="section">
        <div className="container-tight grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <AnimatedSection>
            <p className="eyebrow">How it started</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              A distiller, a state full of farms, and a lot of peaches
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-cream-dim">
              <p>
                Founded by distiller {SITE.founder}, Simple Man set out to do
                something Georgia hadn't quite seen: a true farm-to-glass
                distillery that treats local produce as the headline, not a
                garnish. The result is a lineup rooted in the orchards and fields
                of the state — including a vodka built from whole Georgia peaches
                and grain rather than flavoring.
              </p>
              <p>
                In {SITE.founded}, the distillery opened its doors at{" "}
                {SITE.location.venue}, bringing the still, the barrel room, and a
                speakeasy-style tasting bar together under one roof. Today it
                partners with single-family Georgia farms across the state, naming
                its growers proudly and pouring the results across the bar.
              </p>
              <p>
                The philosophy hasn't changed: real ingredients, real people, real
                Georgia. Made by neighbors, poured for neighbors.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="space-y-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl glass p-6">
                <h3 className="font-display text-xl text-gold-light">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                  {p.body}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="section grain relative scroll-mt-24 overflow-hidden">
        <div className="container-tight">
          <SectionHeading
            eyebrow="In the press"
            title="What's being written"
            intro="A selection of outlets that have covered Simple Man Distillery. We link straight to the source — read it in their words."
          />
          <div className="mt-10">
            <PressStrip />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
