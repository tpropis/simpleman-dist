import Seo from "../components/Seo";
import CinematicHero from "../components/CinematicHero";
import AnimatedSection from "../components/AnimatedSection";
import PremiumButton from "../components/PremiumButton";
import { SITE } from "../data/site";

const POINTS = [
  {
    title: "21 and over, always",
    body: "You must be of legal drinking age — 21 or older in the United States — to enter this site, visit our bar, or purchase our spirits. We may ask for valid ID. We do not market to anyone under 21.",
  },
  {
    title: "Never drink and drive",
    body: "If you've been drinking, don't get behind the wheel. Plan ahead: designate a driver, call a ride, or stay put. Bring your people, not your keys.",
  },
  {
    title: "Know your limits",
    body: "Enjoy our spirits in moderation. Pace yourself, drink water, and eat. Please don't drink if you're pregnant, planning to be, or if alcohol could interact with your health or medication.",
  },
  {
    title: "Make good choices for others",
    body: "Look out for friends, never pressure anyone to drink, and call it a night when it's time. Good hospitality means everyone gets home safe.",
  },
];

export default function ResponsibleEnjoyment() {
  return (
    <>
      <Seo
        title="Responsible Enjoyment"
        description="Simple Man Distillery's commitment to responsible enjoyment. Must be 21+. Please drink responsibly and never drink and drive."
      />
      <CinematicHero
        size="page"
        align="left"
        eyebrow="Responsible enjoyment"
        title={
          <>
            Enjoy it{" "}
            <span className="text-gradient-gold">like a grown-up</span>
          </>
        }
        subtitle="Our spirits are made to be savored — slowly, in good company, and always responsibly."
        fallbackClassName="bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900"
      />

      <section className="section">
        <div className="container-tight max-w-3xl">
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-cream-dim">
              We love what we make, and we want you to love it too — which means
              treating it with respect. Here's how we ask every guest to enjoy
              Simple Man spirits.
            </p>
          </AnimatedSection>

          <div className="mt-10 space-y-4">
            {POINTS.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.05}>
                <div className="rounded-2xl glass p-7">
                  <h2 className="font-display text-2xl text-gold-light">
                    {p.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-cream-dim">{p.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10">
            <div className="rounded-2xl border border-copper/25 bg-charcoal-800/60 p-7">
              <h2 className="font-display text-xl text-cream">
                Plain-language disclaimers
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-cream-muted">
                <li>
                  This website and its content are intended only for adults of
                  legal drinking age ({SITE.age}).
                </li>
                <li>
                  Nothing on this site is a health claim. Alcohol is not a
                  wellness product and should never be consumed for health
                  reasons.
                </li>
                <li>
                  Product availability, releases, and offerings vary by batch and
                  by location and may change without notice.
                </li>
                <li>
                  We do not sell or ship spirits through this website. Purchases
                  must be made in person at our distillery or a licensed retailer.
                </li>
                <li>
                  If you or someone you know is struggling with alcohol, help is
                  available. In the U.S., contact SAMHSA's National Helpline at
                  1-800-662-HELP (4357).
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-10 text-center">
            <p className="font-display text-2xl text-gold-light">
              Please enjoy responsibly. {SITE.age}.
            </p>
            <p className="mt-2 text-sm text-cream-muted">
              Never drink and drive.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <PremiumButton to="/">Back Home</PremiumButton>
              <PremiumButton
                href="https://www.responsibility.org/"
                variant="outline"
              >
                More on Responsibility
              </PremiumButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
