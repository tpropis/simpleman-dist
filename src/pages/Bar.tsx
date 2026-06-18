import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import SectionHeading from "../components/SectionHeading";
import AnimatedSection from "../components/AnimatedSection";
import PremiumButton from "../components/PremiumButton";
import CtaBanner from "../components/CtaBanner";
import { SPIRITS } from "../data/spirits";

const SIGNATURES = SPIRITS.map((s) => ({
  name: s.cocktail.name,
  note: s.cocktail.note,
  base: s.name,
  accent: s.accent,
}));

const MENU = [
  {
    title: "Cocktails",
    body: "A rotating list built on our own spirits and whatever Georgia farms are sending us this season. Stirred, shaken, spritzed, and smoked.",
  },
  {
    title: "Food",
    body: "Southern plates made to share and to pair — small bites that hold their own next to a brown spirit or a bright cocktail.",
  },
  {
    title: "Events",
    body: "Cocktail nights, tastings, and live music woven through the calendar. Adult evenings, done right.",
  },
  {
    title: "Private Gatherings",
    body: "The barrel room and private booths host birthdays, work nights, and celebrations on your terms.",
  },
];

export default function Bar() {
  return (
    <>
      <Seo
        title="Bar & Cocktails"
        description="A speakeasy cocktail bar and Southern kitchen at Cumming City Center. Craft cocktails built on Simple Man's own Georgia spirits. Must be 21+. Please enjoy responsibly."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="The bar"
        title={
          <>
            A little <span className="text-gradient-gold">speakeasy</span> energy
          </>
        }
        subtitle="Low light, private booths, and a password worth knowing. Pull up for craft cocktails and Southern plates poured from our own still."
        video="/videos/cocktail-pour.mp4"
        image="/images/bar/speakeasy.jpg"
        fallbackClassName="bg-gradient-to-br from-burgundy-deep via-charcoal-800 to-charcoal-900"
      />

      {/* What's on offer */}
      <section className="section">
        <div className="container-tight">
          <SectionHeading
            eyebrow="On the menu"
            title="Cocktails, food, and a room with a secret"
            intro="Built for adults who like their nights warm, unhurried, and a little mysterious."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {MENU.map((m, i) => (
              <AnimatedSection key={m.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl glass p-7">
                  <h3 className="font-display text-2xl text-cream">{m.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream-dim">{m.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Signature cocktails */}
      <section className="section grain relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(110,34,48,0.18),transparent_70%)]"
        />
        <div className="container-tight relative">
          <SectionHeading
            align="center"
            eyebrow="Signature pours"
            title="Cocktails worth the trip"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {SIGNATURES.map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 0.05}>
                <div className="flex gap-4 rounded-2xl glass p-6">
                  <span
                    aria-hidden
                    className="mt-1 h-12 w-1 flex-none rounded-full"
                    style={{ background: c.accent }}
                  />
                  <div>
                    <h3 className="font-display text-xl text-cream">{c.name}</h3>
                    <p className="mt-1 text-sm text-cream-dim">{c.note}</p>
                    <p className="mt-2 text-xs uppercase tracking-widest2 text-copper-light">
                      Built on {c.base}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10 text-center">
            <p className="mx-auto max-w-xl text-sm text-cream-muted">
              Menus change with the season and the harvest. Bring your people,
              not your keys — designate a driver or plan a ride home.
            </p>
            <div className="mt-6">
              <PremiumButton to="/visit">Plan Your Visit</PremiumButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
