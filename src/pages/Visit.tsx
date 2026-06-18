import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import AnimatedSection from "../components/AnimatedSection";
import VisitCard from "../components/VisitCard";
import JoinList from "../components/JoinList";
import PremiumButton from "../components/PremiumButton";
import { SITE } from "../data/site";

export default function Visit() {
  return (
    <>
      <Seo
        title="Visit & Contact"
        description="Visit Simple Man Distillery at Cumming City Center in Cumming, Georgia. Tasting room, speakeasy bar, and working distillery. Message us to plan your visit. Must be 21+."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow={SITE.location.addressNote}
        title={
          <>
            Come taste{" "}
            <span className="text-gradient-gold">Georgia in a glass</span>
          </>
        }
        subtitle="Find us at Cumming City Center — a working distillery, a speakeasy tasting room, and a Southern bar all under one roof."
        image="/images/distillery/exterior.jpg"
        fallbackClassName="bg-gradient-to-br from-[#2a2316] via-charcoal-800 to-charcoal-900"
      />

      <section className="section">
        <div className="container-tight grid gap-8 lg:grid-cols-2">
          <AnimatedSection>
            <VisitCard />
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <JoinList />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact + map */}
      <section className="section grain relative overflow-hidden">
        <div className="container-tight grid gap-8 md:grid-cols-2 md:items-center">
          <AnimatedSection>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Questions, bookings, or just saying hey
            </h2>
            <p className="mt-4 leading-relaxed text-cream-dim">
              The fastest way to reach us is a message on Facebook — we answer
              questions about hours, tastings, private events, and where to find
              our bottles. For the speakeasy, you'll want the password.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PremiumButton href={SITE.social.facebook}>
                Message on Facebook
              </PremiumButton>
              <PremiumButton
                href={`mailto:${SITE.contactEmail}`}
                variant="outline"
              >
                Email Us
              </PremiumButton>
            </div>
            <p className="mt-8 text-sm text-cream-muted">
              Please drink responsibly and never drink and drive. Bring your
              people, not your keys — designate a driver or plan a ride home.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900" />
              <div className="absolute inset-0 grain opacity-60" aria-hidden />
              {/* Drop a real map embed or photo at this path to replace the art. */}
              <img
                src="/images/distillery/map.jpg"
                alt=""
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-light/50 text-gold-light">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-7 w-7"
                    aria-hidden
                  >
                    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <p className="mt-4 font-display text-xl text-cream">
                  {SITE.location.venue}
                </p>
                <p className="text-sm text-cream-muted">
                  {SITE.location.city}, {SITE.location.state}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
