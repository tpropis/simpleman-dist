import { Suspense, lazy, useEffect } from "react";
import Seo from "../components/Seo";
import PremiumButton from "../components/PremiumButton";
import EventCard from "../components/EventCard";
import PickYourPour from "../components/PickYourPour";
import CtaBanner from "../components/CtaBanner";
import HeroOverlay from "../cinematic/HeroOverlay";
import SpiritsLabels from "../cinematic/SpiritsLabels";
import ProcessLabels from "../cinematic/ProcessLabels";
import { useStore } from "../cinematic/store";
import {
  initScrollController,
  destroyScrollController,
} from "../cinematic/scrollController";
import { EVENT_TYPES } from "../data/events";

const CinematicStage = lazy(() => import("../cinematic/CinematicStage"));

const BAR_CARDS = [
  { title: "Craft Cocktails", body: "Seasonal drinks built on our own spirits and Georgia produce." },
  { title: "Southern Food", body: "Plates made to share, matched to what's in the glass." },
  { title: "Private Gatherings", body: "Book the barrel room or a private booth for your people." },
  { title: "Speakeasy Energy", body: "Low light, hidden corners, and a password worth knowing." },
];

export default function Home() {
  const webgl = useStore((s) => s.tier.webgl);

  // Cursor parallax — mutate the shared pointer in place (no re-render churn).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const p = useStore.getState().pointer;
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // GSAP scroll wiring — after first paint so section heights exist.
  useEffect(() => {
    const id = requestAnimationFrame(() => initScrollController());
    return () => {
      cancelAnimationFrame(id);
      destroyScrollController();
    };
  }, []);

  return (
    <>
      <Seo
        title="Georgia in a Glass"
        description="Simple Man Distillery — small-batch Georgia spirits, Southern food, and a speakeasy cocktail bar at Cumming City Center. A cinematic farm-to-glass experience. Must be 21+."
      />

      {/* Persistent cinematic WebGL stage (or a static graded hero). */}
      {webgl ? (
        <Suspense fallback={<div className="static-hero" aria-hidden />}>
          <CinematicStage />
        </Suspense>
      ) : (
        <div className="static-hero" aria-hidden>
          <img
            src="/images/bar/speakeasy.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        </div>
      )}

      {/* Scrolling document. Hero/spirits/process are transparent overlays on the
          fixed stage; the rest are opaque DOM sections. */}
      <div className="relative z-10">
        <section id="section-hero">
          <HeroOverlay />
        </section>

        <section id="section-spirits" className="relative h-[300vh]">
          <SpiritsLabels />
        </section>

        <section id="section-process" className="relative h-[300vh]">
          <ProcessLabels />
        </section>

        {/* --- DOM break (canvas fades) --- */}

        {/* Bar */}
        <section id="section-bar" className="relative z-10 overflow-hidden bg-charcoal-900">
          <div className="relative min-h-screen">
            <img
              src="/images/bar/speakeasy.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/85 to-charcoal-900/55"
            />
            <div className="container-tight relative px-5 py-28 sm:px-8 md:py-36">
              <div className="max-w-xl">
                <p className="eyebrow">The bar</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                  A cocktail bar with a little{" "}
                  <span className="text-gradient-gold">speakeasy energy</span>
                </h2>
                <p className="mt-5 leading-relaxed text-cream-dim">
                  Private booths, low light, and a menu that changes with the
                  Georgia seasons. Pull up for craft cocktails and Southern
                  plates, or bring your people for a night in the barrel room.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {BAR_CARDS.map((c) => (
                  <div key={c.title} className="h-full glass p-5">
                    <h3 className="font-display text-xl text-cream">{c.title}</h3>
                    <p className="mt-2 text-sm text-cream-muted">{c.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <PremiumButton to="/bar">Plan Your Visit</PremiumButton>
              </div>
            </div>
          </div>
        </section>

        {/* Pick Your Pour (interactive) */}
        <section className="section relative z-10 bg-charcoal-900">
          <div className="container-tight">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">For the curious (and 21+)</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Pick Your Pour
              </h2>
              <p className="mt-4 text-cream-dim">
                Three quick questions and we'll point you to a spirit and a
                cocktail worth ordering. A bit of fun — always enjoyed responsibly.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <PickYourPour />
            </div>
          </div>
        </section>

        {/* Events */}
        <section id="section-events" className="section relative z-10 bg-charcoal-900">
          <div className="container-tight">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow">What's on</p>
                <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                  Tastings, cocktail nights &amp; private events
                </h2>
              </div>
              <PremiumButton to="/events" variant="outline" size="sm">
                Ask About Events
              </PremiumButton>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {EVENT_TYPES.slice(0, 3).map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA / Visit */}
        <section id="section-visit" className="relative z-10 bg-charcoal-900">
          <CtaBanner />
        </section>
      </div>
    </>
  );
}
