import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/spirits", label: "Spirits" },
  { to: "/bar", label: "Bar & Restaurant" },
  { to: "/farm-to-glass", label: "Farm-to-Glass" },
  { to: "/events", label: "Events" },
  { to: "/story", label: "Story" },
  { to: "/where-to-buy", label: "Where to Buy" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-[0.78rem] font-medium uppercase tracking-widest2 transition-colors ${
      isActive ? "text-gold" : "text-muted-foreground hover:text-cream"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gold-light focus:px-4 focus:py-2 focus:text-sm focus:text-charcoal-900"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label="Simple Man Distillery — home">
          <img
            src="/images/logo.png"
            alt="Simple Man Distillery"
            width={455}
            height={652}
            className="h-12 w-auto sm:h-14"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base text-cream">Simple Man</span>
            <span className="text-[0.6rem] uppercase tracking-[0.32em] text-gold">
              Distillery · GA
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            to="/visit"
            className="rounded-sm border border-border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-widest2 text-cream transition hover:border-copper hover:text-gold"
          >
            Visit Us
          </Link>
          <Link
            to="/where-to-buy"
            className="gradient-ember rounded-sm px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-widest2 text-charcoal-900 transition hover:brightness-110"
          >
            Find a Bottle
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-sm border border-border p-2 text-cream xl:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8" aria-label="Mobile">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-widest2 transition hover:bg-secondary hover:text-cream ${
                    isActive ? "text-gold" : "text-muted-foreground"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                to="/visit"
                className="rounded-sm border border-border px-4 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-widest2 text-cream"
              >
                Visit Us
              </Link>
              <Link
                to="/where-to-buy"
                className="gradient-ember rounded-sm px-4 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-widest2 text-charcoal-900"
              >
                Find a Bottle
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
