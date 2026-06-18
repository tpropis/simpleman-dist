import { Link } from "react-router-dom";
import { ArrowRight, Sprout, FlaskConical, Wheat, Heart } from "lucide-react";
import Seo from "../components/Seo";
import PressStrip from "../components/PressStrip";
import { SPIRITS } from "../data/spirits";

const HERO = "/images/hero/distillery.jpg";
const PEACHES = "/images/farm/orchard.jpg";
const COCKTAIL = "/images/bar/speakeasy.jpg";
const FARMER = "/images/farm/harvest.jpg";

const DIFFERENCE = [
  { Icon: Sprout, title: "Local Georgia Ingredients", body: "We source from Georgia farmers — real peaches, real grain, real community." },
  { Icon: FlaskConical, title: "Farm-to-Glass Process", body: "From the field to the still to your glass, every step is intentional." },
  { Icon: Wheat, title: "Small-Batch Spirits", body: "Distilled in small lots so quality and character never get lost in the volume." },
  { Icon: Heart, title: "Southern Hospitality", body: "A bar and restaurant where neighbors become regulars and regulars become family." },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Farm-to-Glass Spirits in Cumming, GA"
        description="Simple Man Distillery — Georgia craft distillery, cocktail bar, and restaurant in Cumming City Center. Small-batch spirits made from real local ingredients. Must be 21+."
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={HERO} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(193,122,63,0.18), transparent 70%)" }}
          />
        </div>

        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 py-32 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="eyebrow">Cumming City Center · Georgia</span>
            <h1 className="mt-5 font-display text-[2.75rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
              Made by neighbors. Poured for neighbors.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A farm-to-glass distillery, a speakeasy bar, and a place to land in
              Cumming City Center.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/bar"
                className="group inline-flex items-center gap-2 gradient-ember rounded-sm px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-charcoal-900 transition hover:brightness-110"
              >
                Visit the Bar
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/spirits"
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/40 px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream backdrop-blur transition hover:border-copper hover:text-gold"
              >
                Explore Our Spirits
              </Link>
              <Link
                to="/visit"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-gold transition hover:text-cream"
              >
                Join the List →
              </Link>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Please enjoy responsibly · Must be 21+
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="divider-ornament">The Simple Man Difference</span>
            <h2 className="mt-5 text-4xl text-cream sm:text-5xl">
              Real ingredients. Real people. Real Georgia.
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENCE.map(({ Icon, title, body }) => (
              <div key={title} className="group bg-background p-8 transition-colors hover:bg-card">
                <Icon className="text-copper transition-transform group-hover:scale-110" size={28} />
                <h3 className="mt-5 text-xl text-cream">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SPIRITS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">Featured Spirits</span>
              <h2 className="mt-4 text-4xl text-cream sm:text-5xl">A flight of Georgia, distilled.</h2>
            </div>
            <Link
              to="/spirits"
              className="text-sm font-semibold uppercase tracking-widest2 text-gold hover:text-cream"
            >
              View all spirits →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SPIRITS.map((s) => (
              <article
                key={s.slug}
                className="group overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-1 hover:border-copper"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    loading="lazy"
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                </div>
                <div className="space-y-4 p-7">
                  <div className="flex flex-wrap gap-1.5">
                    {s.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-sm border border-copper/40 bg-copper/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-gold"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl text-cream">{s.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  <Link
                    to="/where-to-buy"
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest2 text-gold hover:text-cream"
                  >
                    Where to buy <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BAR & RESTAURANT */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img loading="lazy" src={COCKTAIL} alt="Craft cocktail at the Simple Man bar" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="eyebrow">Bar &amp; Restaurant</span>
            <h2 className="mt-4 text-4xl text-cream sm:text-5xl">
              Cocktails, food, and a little late-night{" "}
              <span className="italic text-gold">speakeasy</span> energy.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Sip what we make where we make it. Our Cumming City Center location
              pours craft cocktails built around our own spirits, paired with
              Southern-rooted food and a room you'll want to linger in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/events" className="gradient-ember rounded-sm px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-charcoal-900 hover:brightness-110">
                View Events
              </Link>
              <Link to="/visit" className="rounded-sm border border-border px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream hover:border-copper hover:text-gold">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FARM-TO-GLASS */}
      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-12">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Farm-to-Glass</span>
            <h2 className="mt-4 text-4xl text-cream sm:text-5xl">It starts in a Georgia field.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We work directly with Georgia farmers and use local produce whenever
              the season allows. Real peaches from Dickey Farms. Real grain. Real
              relationships. The result is a spirit that actually tastes like where
              it's from.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                "Georgia Grown certified",
                "Direct-from-farm partnerships",
                "Seasonal small-batch releases",
                "No artificial flavoring, ever",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-muted-foreground">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-copper" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/farm-to-glass"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest2 text-gold hover:text-cream"
            >
              Meet our farmers <ArrowRight size={14} />
            </Link>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <img loading="lazy" src={PEACHES} alt="Georgia peaches and grain" className="aspect-[4/5] w-full rounded-sm object-cover" />
            <img loading="lazy" src={FARMER} alt="A Georgia farmer holding grain" className="mt-10 aspect-[4/5] w-full rounded-sm object-cover" />
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <p className="text-center text-xs uppercase tracking-[0.32em] text-muted-foreground">
            As featured in
          </p>
          <div className="mt-8">
            <PressStrip />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={HERO} alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>
        <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
          <span className="divider-ornament">Visit Us</span>
          <h2 className="mt-5 font-display text-5xl text-cream sm:text-6xl">
            Come See What <span className="text-gradient-ember italic">Georgia</span> Tastes Like
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/visit" className="gradient-ember rounded-sm px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-charcoal-900 hover:brightness-110">
              Visit Us
            </Link>
            <Link to="/where-to-buy" className="rounded-sm border border-border px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream hover:border-copper hover:text-gold">
              Find a Bottle
            </Link>
            <a
              href="https://www.instagram.com/simplemandistillery"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-border px-6 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream hover:border-copper hover:text-gold"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
