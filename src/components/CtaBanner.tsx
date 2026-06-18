import AnimatedSection from "./AnimatedSection";
import PremiumButton from "./PremiumButton";
import SmokeOverlay from "./SmokeOverlay";

/** Cinematic closing call-to-action reused across pages. */
export default function CtaBanner() {
  return (
    <section className="section grain relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900"
      />
      <SmokeOverlay intensity={0.5} />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_120%,rgba(193,122,63,0.28),transparent_70%)]"
      />
      <AnimatedSection className="container-tight relative text-center">
        <p className="eyebrow">Last call</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Come taste <span className="text-gradient-gold">Georgia in a glass.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-cream-dim">
          Small-batch spirits, Southern food, and a cocktail bar with a little
          speakeasy energy — all built around real Georgia ingredients.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PremiumButton to="/visit">Visit Simple Man</PremiumButton>
          <PremiumButton to="/spirits" variant="outline">
            Explore Spirits
          </PremiumButton>
          <PremiumButton to="/visit" variant="ghost">
            Join the List
          </PremiumButton>
        </div>
        <p className="mt-8 text-xs uppercase tracking-widest2 text-cream-muted">
          Cumming City Center · Must be 21+
        </p>
      </AnimatedSection>
    </section>
  );
}
