import { Link } from "react-router-dom";
import { NAV, FOOTER_NAV } from "../data/nav";
import { SITE } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-copper/15 bg-charcoal-900">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="container-tight relative px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              <span className="text-gradient-gold">Simple Man</span> Distillery
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
              Georgia farm-to-glass craft spirits, Southern food, and a speakeasy
              cocktail bar at {SITE.location.venue}. Made by neighbors, poured for
              neighbors.
            </p>
            <p className="mt-4 text-sm text-cream-muted">
              {SITE.location.addressNote}
            </p>
          </div>

          <nav aria-label="Footer — explore">
            <h2 className="eyebrow mb-4">Explore</h2>
            <ul className="space-y-2.5">
              {NAV.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-sm text-cream-dim transition-colors hover:text-gold-light"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — more">
            <h2 className="eyebrow mb-4">More</h2>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-sm text-cream-dim transition-colors hover:text-gold-light"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream-dim transition-colors hover:text-gold-light"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="my-10 hairline" />

        {/* Responsible drinking statement — required, always visible */}
        <div className="rounded-2xl border border-copper/20 bg-charcoal-800/60 px-6 py-5 text-center">
          <p className="font-display text-lg text-gold-light">
            Please enjoy responsibly. {SITE.age}.
          </p>
          <p className="mt-1 text-sm text-cream-muted">
            Never drink and drive. Bring your people, not your keys — designate a
            driver or plan a ride home.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-cream-muted sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            <Link
              to="/responsible-enjoyment"
              className="underline-offset-4 hover:text-gold-light hover:underline"
            >
              Responsible Enjoyment
            </Link>{" "}
            · Distilled &amp; bottled in Georgia
          </p>
        </div>
      </div>
    </footer>
  );
}
