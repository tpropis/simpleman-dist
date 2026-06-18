import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import PremiumButton from "../components/PremiumButton";
import CtaBanner from "../components/CtaBanner";
import { SITE } from "../data/site";

const WAYS = [
  {
    title: "At the Distillery",
    body: "The surest place to find every bottle — and to taste before you take one home — is our tasting room at Cumming City Center.",
    cta: { label: "Plan a Visit", to: "/visit" },
  },
  {
    title: "Ask Your Local Shop",
    body: "Look for Simple Man on Georgia shelves and behind local bars. Availability changes with each small batch, so it's always worth asking.",
    cta: { label: "Message Us to Check", href: SITE.social.facebook },
  },
];

export default function WhereToBuy() {
  return (
    <>
      <Seo
        title="Where to Buy"
        description="Find Simple Man Distillery's Georgia spirits at our Cumming City Center tasting room and select local retailers. Availability varies by batch. Must be 21+."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="Find near you"
        title={
          <>
            Find a bottle of{" "}
            <span className="text-gradient-gold">Simple Man</span>
          </>
        }
        subtitle="We're a small-batch distillery, so the best place to find us is close to home — starting with our own bar."
        image="/images/spirits/shelf.jpg"
        fallbackClassName="bg-gradient-to-br from-[#3a2412] via-charcoal-800 to-charcoal-900"
      />

      <section className="section">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Where to find us"
            title="Two reliable ways to get a pour"
            intro="We don't make availability promises we can't keep — batches are limited and seasonal. Here's where to look."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {WAYS.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl glass p-7">
                  <h3 className="font-display text-2xl text-cream">{w.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-cream-dim">
                    {w.body}
                  </p>
                  <div className="mt-6">
                    {"to" in w.cta ? (
                      <PremiumButton to={w.cta.to!} variant="outline" size="sm">
                        {w.cta.label}
                      </PremiumButton>
                    ) : (
                      <PremiumButton
                        href={w.cta.href!}
                        variant="outline"
                        size="sm"
                      >
                        {w.cta.label}
                      </PremiumButton>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10">
            <div className="rounded-2xl border border-copper/20 bg-charcoal-800/50 p-6 text-sm text-cream-muted">
              <p>
                <span className="text-copper-light">A note on buying online: </span>
                we don't run an online checkout or ship spirits from this site.
                Alcohol sales are regulated, so to buy you'll need to visit us or
                a licensed Georgia retailer in person. Must be 21+ with valid ID.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
