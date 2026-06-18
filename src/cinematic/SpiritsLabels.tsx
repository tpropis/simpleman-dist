import { Link } from "react-router-dom";
import { useStore } from "./store";
import { SPIRITS } from "../data/spirits";
import Reveal from "./Reveal";

/**
 * Sticky DOM overlay for the spirits section. Reads the scrubbed progress and
 * shows the active spirit (real photo + notes), synced with the lifting 3D
 * bottle behind it. Re-renders only when the active index changes.
 */
export default function SpiritsLabels() {
  const n = SPIRITS.length;
  const idx = useStore((s) =>
    Math.min(n - 1, Math.max(0, Math.floor(s.spiritsProgress * n)))
  );
  const sp = SPIRITS[idx];

  return (
    <div className="sticky top-0 flex h-screen items-center">
      <div className="container-tight grid w-full items-center gap-8 px-5 sm:px-8 md:grid-cols-2">
        {/* Text */}
        <div>
          <p className="eyebrow">The lineup · 0{idx + 1} / 0{n}</p>
          <div key={sp.slug}>
            <Reveal as="h2" className="mt-4 block font-display text-4xl font-bold leading-tight sm:text-5xl">
              {sp.name}
            </Reveal>
            <Reveal as="p" delay={60} className="mt-4 block max-w-md text-cream-dim">
              {sp.description}
            </Reveal>
            <Reveal as="ul" delay={120} className="mt-5 flex flex-wrap gap-2">
              {sp.tastingNotes.map((t) => (
                <li key={t} className="rounded-full border border-copper/30 px-3 py-1 text-xs text-cream-dim">
                  {t}
                </li>
              ))}
            </Reveal>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <Link
              to="/where-to-buy"
              className="rounded-full border border-gold-light/40 bg-gradient-to-b from-gold-light to-copper px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-charcoal-900 transition-all hover:-translate-y-0.5"
            >
              Find Near You
            </Link>
            <div className="flex gap-1.5">
              {SPIRITS.map((s, i) => (
                <span
                  key={s.slug}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? "w-6 bg-gold-light" : "w-1.5 bg-cream/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Real product photo, framed in glass */}
        <div className="hidden md:block">
          <div key={sp.slug} className="relative mx-auto h-[60vh] max-h-[28rem]">
            <div aria-hidden className="absolute inset-0 rounded-[40%] bg-copper/15 blur-3xl" />
            <Reveal as="div" className="relative block h-full">
              <img
                src={sp.image}
                alt={`${sp.name} bottle`}
                loading="lazy"
                className="mx-auto h-full w-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.6)]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
