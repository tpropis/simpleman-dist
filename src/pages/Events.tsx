import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import EventCard from "../components/EventCard";
import PremiumButton from "../components/PremiumButton";
import CtaBanner from "../components/CtaBanner";
import { EVENT_TYPES } from "../data/events";
import { SITE } from "../data/site";

export default function Events() {
  return (
    <>
      <Seo
        title="Events"
        description="Guided tastings, cocktail nights, live music, private events, and seasonal releases at Simple Man Distillery, Cumming City Center. Adult evenings, enjoyed responsibly. Must be 21+."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="What's on"
        title={
          <>
            Gather. Taste.{" "}
            <span className="text-gradient-gold">Stay a while.</span>
          </>
        }
        subtitle="Tastings, cocktail nights, live music, and private events — adult evenings built around good spirits and good company."
        image="/images/bar/event.jpg"
        fallbackClassName="bg-gradient-to-br from-burgundy-deep via-charcoal-800 to-charcoal-900"
      />

      <section className="section">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Ways to join us"
            title="There's always a reason to come in"
            intro="No two nights look the same. Reach out and we'll help you find — or build — the right one."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((e, i) => (
              <AnimatedSection key={e.slug} delay={i * 0.06}>
                <EventCard event={e} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Private events CTA */}
      <section className="section grain relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(193,122,63,0.16),transparent_70%)]"
        />
        <AnimatedSection className="container-tight relative rounded-3xl glass p-8 text-center sm:p-12">
          <p className="eyebrow">Planning something?</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Tell us the occasion — we'll shape the night around it
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-dim">
            Birthdays, work gatherings, or a quiet table in the speakeasy. Book
            the barrel room or a private booth and leave the details to us.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PremiumButton href={SITE.social.facebook}>
              Ask About Events
            </PremiumButton>
            <PremiumButton to="/visit" variant="outline">
              Visit & Contact
            </PremiumButton>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest2 text-cream-muted">
            All events are for guests 21+ · Please enjoy responsibly
          </p>
        </AnimatedSection>
      </section>

      <CtaBanner />
    </>
  );
}
