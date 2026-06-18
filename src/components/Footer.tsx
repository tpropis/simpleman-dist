import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img
              src="/images/logo.png"
              alt="Simple Man Distillery"
              width={455}
              height={652}
              className="h-20 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Farm-to-glass spirits crafted in Georgia from real local
              ingredients. Cocktails, food, and community at Cumming City Center.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/simplemandistillery"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-sm border border-border p-2.5 text-muted-foreground transition hover:border-copper hover:text-gold"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/simplemandistillery"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-sm border border-border p-2.5 text-muted-foreground transition hover:border-copper hover:text-gold"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/spirits", label: "Spirits" },
                { to: "/bar", label: "Bar & Restaurant" },
                { to: "/events", label: "Events" },
                { to: "/farm-to-glass", label: "Farm-to-Glass" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/story", label: "Story & Press" },
                { to: "/where-to-buy", label: "Where to Buy" },
                { to: "/visit", label: "Visit & Contact" },
                { to: "/responsible-enjoyment", label: "Responsible Enjoyment" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit &amp; Stay in Touch</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 text-copper" />
                <span>
                  Cumming City Center
                  <br />
                  Cumming, GA
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 text-copper" />
                <a href="mailto:hello@simplemandistillery.com" className="hover:text-cream">
                  hello@simplemandistillery.com
                </a>
              </li>
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
                if (email)
                  window.location.href = `mailto:hello@simplemandistillery.com?subject=${encodeURIComponent(
                    "Join the List"
                  )}&body=${encodeURIComponent(`Please add me: ${email}`)}`;
              }}
              className="mt-5 flex gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-sm border border-border bg-secondary px-3 py-2.5 text-sm text-cream placeholder:text-muted-foreground focus:border-copper focus:outline-none"
              />
              <button className="gradient-ember rounded-sm px-4 text-xs font-semibold uppercase tracking-widest2 text-charcoal-900 hover:brightness-110">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Simple Man Distillery. All rights reserved.</p>
          <p className="uppercase tracking-widest2">
            Must be 21+ · Please enjoy responsibly · Never drink and drive
          </p>
        </div>
      </div>
    </footer>
  );
}
