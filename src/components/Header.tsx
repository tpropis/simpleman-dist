import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "../data/nav";
import { SITE } from "../data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-copper/15 bg-charcoal-900/85 backdrop-blur-lg"
          : "bg-gradient-to-b from-charcoal-900/70 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold-light focus:px-4 focus:py-2 focus:text-sm focus:text-charcoal-900"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          to="/"
          className="flex flex-col leading-none"
          aria-label="Simple Man Distillery — home"
        >
          <span className="font-display text-lg font-bold tracking-wide text-cream sm:text-xl">
            Simple Man
          </span>
          <span className="text-[10px] uppercase tracking-widest2 text-copper-light">
            Distillery
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-colors hover:text-gold-light ${
                  isActive ? "text-gold-light" : "text-cream-dim"
                } after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-light after:transition-all after:duration-300 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/visit"
            className="rounded-full border border-gold-light/40 bg-gradient-to-b from-gold-light to-copper px-5 py-2.5 text-xs font-semibold uppercase tracking-widest2 text-charcoal-900 transition-all hover:-translate-y-0.5 hover:shadow-glow-sm"
          >
            Plan Your Visit
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-copper/30 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-cream transition-all duration-300 ${
                menuOpen ? "top-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-cream transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-cream transition-all duration-300 ${
                menuOpen ? "top-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-copper/10 transition-[max-height] duration-500 lg:hidden ${
          menuOpen ? "max-h-[90vh]" : "max-h-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 px-5 pb-8 pt-4"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 font-display text-xl transition-colors ${
                  isActive
                    ? "bg-charcoal-700/60 text-gold-light"
                    : "text-cream-dim hover:bg-charcoal-700/40 hover:text-cream"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/where-to-buy"
            className="rounded-xl px-4 py-3 font-display text-xl text-cream-dim hover:text-cream"
          >
            Where to Buy
          </Link>
          <Link
            to="/visit"
            className="mt-3 rounded-full bg-gradient-to-b from-gold-light to-copper px-5 py-3.5 text-center text-sm font-semibold uppercase tracking-widest2 text-charcoal-900"
          >
            Plan Your Visit
          </Link>
          <p className="mt-4 text-center text-xs uppercase tracking-widest2 text-cream-muted">
            {SITE.age} · Enjoy responsibly
          </p>
        </nav>
      </div>
    </header>
  );
}
