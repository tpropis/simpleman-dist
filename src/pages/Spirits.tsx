import { Suspense, lazy } from "react";
import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import SpiritCard from "../components/SpiritCard";
import BottleArt from "../components/BottleArt";
import PremiumButton from "../components/PremiumButton";
import CtaBanner from "../components/CtaBanner";
import { SPIRITS } from "../data/spirits";

const ProductViewer = lazy(() => import("../components/ProductViewer"));

export default function Spirits() {
  return (
    <>
      <Seo
        title="Spirits"
        description="Explore Simple Man Distillery's small-batch Georgia spirits: Vodka from Peaches & Grains, Smoked Apple Brandy, Gullah Geechee Gin, and Amaro Georgiano. Georgia Grown. Must be 21+."
      />
      <CinematicHero
        size="page"
        eyebrow="The lineup"
        title={
          <>
            Four ways to taste{" "}
            <span className="text-gradient-gold">Georgia</span>
          </>
        }
        subtitle="Every bottle starts on a Georgia farm and ends in a small-batch run on our copper still. Here's what's pouring."
        image="/images/spirits/lineup.jpg"
        fallbackClassName="bg-gradient-to-br from-[#3a2412] via-charcoal-800 to-charcoal-900"
        align="left"
      />

      {/* Interactive 3D viewer */}
      <section className="section grain relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(193,122,63,0.12),transparent_70%)]"
        />
        <div className="container-tight relative">
          <SectionHeading
            align="center"
            eyebrow="Take it for a spin"
            title="Meet the bottles"
            intro="Pick a spirit and drag to turn it in your hand. Every label starts on a Georgia farm."
            className="mx-auto"
          />
          <div className="mt-12">
            <Suspense
              fallback={<div className="min-h-[24rem]" aria-hidden />}
            >
              <ProductViewer />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="section">
        <div className="container-tight grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPIRITS.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 0.06}>
              <SpiritCard spirit={s} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Detailed alternating profiles */}
      <section className="section grain relative overflow-hidden">
        <div className="container-tight space-y-20 md:space-y-28">
          {SPIRITS.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <AnimatedSection key={s.slug}>
                <article
                  id={s.slug}
                  className="grid scroll-mt-28 gap-8 md:grid-cols-2 md:items-center"
                >
                  <div className={flip ? "md:order-2" : ""}>
                    <div className="relative mx-auto h-72 w-full max-w-xs">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-copper/15 blur-3xl"
                      />
                      <BottleArt
                        liquid={s.liquid}
                        accent={s.accent}
                        label={s.name}
                        className="relative mx-auto h-full w-auto"
                      />
                    </div>
                  </div>
                  <div className={flip ? "md:order-1" : ""}>
                    <span className="eyebrow">{s.category}</span>
                    <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                      {s.name}
                    </h2>
                    <p className="mt-4 leading-relaxed text-cream-dim">
                      {s.description}
                    </p>

                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="eyebrow mb-2">Tasting notes</dt>
                        <dd className="flex flex-wrap gap-2">
                          {s.tastingNotes.map((n) => (
                            <span
                              key={n}
                              className="rounded-full border border-copper/25 px-3 py-1 text-xs text-cream-dim"
                            >
                              {n}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow mb-2">Source</dt>
                        <dd className="text-sm text-cream-dim">{s.source}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 rounded-2xl border border-copper/20 bg-charcoal-800/50 p-4 text-sm text-cream-dim">
                      <span className="text-copper-light">Bartender's pick · </span>
                      <span className="font-medium text-cream">
                        {s.cocktail.name}
                      </span>{" "}
                      — {s.cocktail.note}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-charcoal-700/60 px-3 py-1 text-[10px] uppercase tracking-widest2 text-cream-muted"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7">
                      <PremiumButton to="/where-to-buy" size="sm">
                        Find Near You
                      </PremiumButton>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
