import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import PremiumButton from "../components/PremiumButton";
import SpiritCard from "../components/SpiritCard";
import PickYourPour from "../components/PickYourPour";
import EventCard from "../components/EventCard";
import PressStrip from "../components/PressStrip";
import CtaBanner from "../components/CtaBanner";
import MediaBackground from "../components/MediaBackground";
import SmokeOverlay from "../components/SmokeOverlay";
import { SPIRITS } from "../data/spirits";

// Code-split the entire WebGL stack so it loads only with the hero and never
// ships on other routes.
const Hero3D = lazy(() => import("../components/Hero3D"));
const ScrollStory = lazy(() => import("../components/ScrollStory"));
import { EVENT_TYPES } from "../data/events";

const BAR_CARDS = [
  { title: "Craft Cocktails", body: "Seasonal drinks built on our own spirits and Georgia produce." },
  { title: "Southern Food", body: "Plates made to share, matched to what's in the glass." },
  { title: "Private Gatherings", body: "Book the barrel room or a private booth for your people." },
  { title: "Speakeasy Energy", body: "Low light, hidden corners, and a password worth knowing." },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Georgia in a Glass"
        description="Simple Man Distillery — small-batch Georgia spirits, Southern food, and a speakeasy cocktail bar at Cumming City Center. Vodka from peaches and grains, smoked apple brandy, Gullah Geechee gin, Amaro Georgiano. Must be 21+."
      />

      {/* 1 — HERO (real-time 3D bottle) */}
      <CinematicHero
        align="left"
        eyebrow="Cumming City Center · Must be 21+"
        title={
          <>
            Georgia <span className="text-gradient-gold">in a glass.</span>
          </>
        }
        subtitle="Small-batch spirits, Southern food, and a cocktail bar built around real Georgia ingredients."
        scene={
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        }
        fallbackClassName="bg-gradient-to-br from-[#3a2412] via-charcoal-800 to-charcoal-900"
      >
        <div className="flex flex-wrap gap-3">
          <PremiumButton to="/spirits">Explore Spirits</PremiumButton>
          <PremiumButton to="/bar" variant="outline">
            Visit the Bar
          </PremiumButton>
          <PremiumButton to="/visit" variant="ghost">
            Join the List
          </PremiumButton>
        </div>
      </CinematicHero>

      {/* 2 — BRAND STATEMENT */}
      <section className="section grain relative overflow-hidden">
        <div className="container-tight relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <AnimatedSection>
            <p className="eyebrow">From field, to still, to glass</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Real ingredients. Real people.{" "}
              <span className="text-gradient-gold">Real Georgia.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-cream-dim">
              Simple Man Distillery is a farm-to-glass craft distillery at Cumming
              City Center. We partner with single-family Georgia farms for the
              fruit, grain, and botanicals behind our spirits, distill them
              small-batch on a working copper still, and pour them across the bar
              in a tasting room built like a mid-century speakeasy. Made by
              neighbors, poured for neighbors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PremiumButton to="/farm-to-glass" variant="outline" size="sm">
                Our Farm-to-Glass Story
              </PremiumButton>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="grid grid-cols-2 gap-4">
            {[
              { k: "Georgia farms", v: "Single-family sourced" },
              { k: "Peaches per bottle", v: "50+ whole fruit" },
              { k: "Distilled", v: "Small batch, on site" },
              { k: "The room", v: "Speakeasy tasting bar" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl glass p-5 text-center"
              >
                <div className="font-display text-xl text-gold-light">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-widest2 text-cream-muted">
                  {s.k}
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* 3 — SPIRITS SHOWCASE */}
      <section className="section relative">
        <div className="container-tight">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The lineup"
              title={
                <>
                  Small-batch spirits with{" "}
                  <span className="text-gradient-gold">Southern soul</span>
                </>
              }
              intro="Four ways to taste Georgia — built on flavor, ingredients, and craft, not gimmicks."
            />
            <AnimatedSection delay={0.1}>
              <PremiumButton to="/spirits" variant="outline" size="sm">
                See all spirits
              </PremiumButton>
            </AnimatedSection>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPIRITS.map((s, i) => (
              <AnimatedSection key={s.slug} delay={i * 0.06}>
                <SpiritCard spirit={s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — FIELD → STILL → GLASS (scroll-driven 3D story) */}
      <Suspense fallback={<div className="min-h-[60vh] bg-charcoal-900" />}>
        <ScrollStory />
      </Suspense>

      {/* 5 — BAR / COCKTAILS */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[30rem] grain">
          <MediaBackground
            video="/videos/bar-ambience.mp4"
            image="/images/bar/speakeasy.jpg"
            fallbackClassName="bg-gradient-to-br from-burgundy-deep via-charcoal-800 to-charcoal-900"
          />
          <SmokeOverlay intensity={0.5} />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/70 to-charcoal-900/40"
          />
          <div className="container-tight relative px-5 py-24 sm:px-8 md:py-32">
            <div className="max-w-xl">
              <p className="eyebrow">The bar</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                A cocktail bar with a little{" "}
                <span className="text-gradient-gold">speakeasy energy</span>
              </h2>
              <p className="mt-5 leading-relaxed text-cream-dim">
                Private booths, low light, and a menu that changes with the
                Georgia seasons. Pull up for craft cocktails and Southern plates,
                or bring your people for a night in the barrel room.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BAR_CARDS.map((c, i) => (
                <AnimatedSection key={c.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl glass p-5">
                    <h3 className="font-display text-xl text-cream">{c.title}</h3>
                    <p className="mt-2 text-sm text-cream-muted">{c.body}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-10">
              <PremiumButton to="/bar">Plan Your Visit</PremiumButton>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — PICK YOUR POUR */}
      <section className="section relative">
        <div className="container-tight">
          <SectionHeading
            align="center"
            eyebrow="For the curious (and 21+)"
            title="Pick Your Pour"
            intro="Three quick questions and we'll point you to a spirit and a cocktail worth ordering. A bit of fun — always enjoyed responsibly."
            className="mx-auto"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <PickYourPour />
          </div>
        </div>
      </section>

      {/* 7 — EVENTS */}
      <section className="section grain relative overflow-hidden">
        <div className="container-tight relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What's on"
              title="Tastings, cocktail nights & private events"
              intro="Adult evenings built around good spirits, good food, and good company."
            />
            <AnimatedSection delay={0.1}>
              <PremiumButton to="/events" variant="outline" size="sm">
                Ask About Events
              </PremiumButton>
            </AnimatedSection>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.slice(0, 3).map((e, i) => (
              <AnimatedSection key={e.slug} delay={i * 0.06}>
                <EventCard event={e} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — PRESS */}
      <section className="section relative">
        <div className="container-tight">
          <SectionHeading
            eyebrow="In the press"
            title="Georgia's been talking"
            intro="A few of the outlets that have covered our farms, our spirits, and our home at Cumming City Center."
          />
          <div className="mt-10">
            <PressStrip />
          </div>
          <AnimatedSection className="mt-8">
            <Link
              to="/story"
              className="text-sm uppercase tracking-widest2 text-gold-light hover:underline"
            >
              Read our full story →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 9 — FINAL CTA */}
      <CtaBanner />
    </>
  );
}
