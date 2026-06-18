import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Spirit } from "../data/spirits";
import BottleArt from "./BottleArt";

interface Props {
  spirit: Spirit;
}

/**
 * Premium product card with a mouse-tracking spotlight, animated copper border,
 * and a hover/focus reveal of ingredients + a cocktail suggestion. Tasting
 * notes stay visible at all times so touch users (no hover) still get the
 * essentials.
 */
export default function SpiritCard({ spirit }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1"
    >
      {/* mouse spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,0%), rgba(224,168,95,0.16), transparent 70%)",
        }}
      />
      {/* animated gradient border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: "1px",
          background:
            "linear-gradient(130deg, rgba(224,168,95,0.6), transparent 40%, transparent 60%, rgba(193,122,63,0.5))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="eyebrow">{spirit.category}</span>
        <span className="rounded-full border border-copper/30 px-3 py-1 text-[10px] uppercase tracking-widest2 text-cream-muted">
          Small batch
        </span>
      </div>

      {/* bottle visual */}
      <div className="relative mx-auto my-4 h-56 w-full">
        <div className="absolute inset-0 animate-sweep bg-copper-sweep opacity-0 group-hover:opacity-60" />
        {spirit.image && imgOk ? (
          <img
            src={spirit.image}
            alt={`${spirit.name} bottle`}
            loading="lazy"
            decoding="async"
            onError={() => setImgOk(false)}
            className="mx-auto h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
          />
        ) : (
          <BottleArt
            liquid={spirit.liquid}
            accent={spirit.accent}
            label={spirit.name}
            className="mx-auto h-full w-auto"
          />
        )}
      </div>

      <h3 className="relative text-2xl font-semibold leading-snug">
        {spirit.name}
      </h3>
      <p className="relative mt-1 text-sm text-cream-dim">{spirit.tagline}</p>

      {/* tasting notes — always visible */}
      <ul className="relative mt-4 flex flex-wrap gap-2">
        {spirit.tastingNotes.map((n) => (
          <li
            key={n}
            className="rounded-full border border-copper/25 bg-charcoal-700/40 px-3 py-1 text-xs text-cream-dim"
          >
            {n}
          </li>
        ))}
      </ul>

      {/* reveal: source + cocktail */}
      <div className="relative grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-4 space-y-2 border-t border-copper/15 pt-4 text-sm">
            <p className="text-cream-muted">
              <span className="text-copper-light">Source · </span>
              {spirit.source}
            </p>
            <p className="text-cream-dim">
              <span className="text-copper-light">Try it · </span>
              <span className="font-medium text-cream">
                {spirit.cocktail.name}
              </span>{" "}
              — {spirit.cocktail.note}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <ul className="flex flex-wrap gap-1.5">
          {spirit.badges.slice(0, 2).map((b) => (
            <li key={b} className="text-[10px] uppercase tracking-wider text-cream-muted">
              {b}
            </li>
          ))}
        </ul>
        <Link
          to="/where-to-buy"
          className="rounded-full border border-copper/50 px-4 py-2 text-xs font-medium uppercase tracking-widest2 text-gold-light transition-colors hover:border-gold-light hover:bg-charcoal-600/50"
        >
          Find Near You
        </Link>
      </div>
    </div>
  );
}
