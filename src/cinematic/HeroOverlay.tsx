import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { HERO } from "./layout";

export default function HeroOverlay() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Reveal className="mb-6">
        <span className="block w-24 rounded-2xl bg-cream p-2 shadow-glow">
          <img
            src="/images/logo.png"
            alt="Simple Man Distillery"
            width={455}
            height={652}
            className="w-full"
          />
        </span>
      </Reveal>

      <Reveal
        as="span"
        delay={80}
        className="mb-6 block text-[11px] font-medium uppercase tracking-widest2 text-cream/50"
      >
        {HERO.eyebrow}
      </Reveal>

      <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.98] tracking-tight text-cream text-shadow-deep">
        {HERO.lines.map((line, i) => (
          <Reveal key={line} as="span" className="block" delay={140 + i * 90}>
            {line}
          </Reveal>
        ))}
        <Reveal
          as="span"
          className="block text-gradient-gold"
          delay={140 + HERO.lines.length * 90}
        >
          {HERO.accentWord}
        </Reveal>
      </h1>

      <Reveal
        as="p"
        delay={420}
        className="mt-7 max-w-xl text-sm leading-relaxed text-cream-dim md:text-base"
      >
        {HERO.subtext}
      </Reveal>

      <Reveal
        delay={520}
        className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          to="/spirits"
          className="gradient-ember rounded-sm px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-charcoal-900 transition hover:brightness-110"
        >
          Explore Spirits
        </Link>
        <a
          href="#section-bar"
          className="rounded-sm border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-cream transition hover:border-copper hover:text-gold"
        >
          Visit the Bar →
        </a>
      </Reveal>

      <div className="absolute bottom-8 flex flex-col items-center gap-2.5">
        <span className="text-[10px] uppercase tracking-widest2 text-cream-muted">
          Scroll
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-cream/15">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollLine_1.8s_ease-in-out_infinite] bg-gold-light/80" />
        </span>
      </div>
    </div>
  );
}
