import { useEffect, useRef, useState } from "react";
import { SITE } from "../data/site";
import SmokeOverlay from "./SmokeOverlay";

const STORAGE_KEY = "smd-age-verified";
const SAFE_EXIT_URL = "https://www.responsibility.org/";

/**
 * Cinematic 21+ age gate. Blocks the site until the visitor affirms they are of
 * legal drinking age; the affirmation is persisted in localStorage so it only
 * appears once per device. Choosing "No" routes to a neutral responsible-
 * drinking resource rather than into the site.
 */
export default function AgeGate() {
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let verified = false;
    try {
      verified = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      /* private mode / storage blocked — gate every visit, fail safe */
    }
    if (!verified) {
      setOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (open) yesRef.current?.focus();
  }, [open]);

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setOpen(false);
  }

  function decline() {
    setDeclined(true);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agegate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/95 px-5 backdrop-blur-md"
    >
      <div className="absolute inset-0 grain" aria-hidden />
      <SmokeOverlay intensity={0.4} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl glass p-8 text-center shadow-glow sm:p-12">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px animate-sweep bg-gradient-to-r from-transparent via-gold-light to-transparent"
        />

        {!declined ? (
          <>
            <p className="eyebrow">{SITE.location.venue}</p>
            <h1
              id="agegate-title"
              className="mt-5 font-display text-3xl font-bold sm:text-4xl"
            >
              <span className="text-gradient-gold">Simple Man</span> Distillery
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-cream-dim">
              Georgia farm-to-glass spirits and a speakeasy cocktail bar. Before
              you step in, we have to ask —
            </p>
            <p className="mt-6 font-display text-2xl text-cream">
              Are you 21 or older?
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                ref={yesRef}
                onClick={confirm}
                className="group relative w-full overflow-hidden rounded-full border border-gold-light/40 bg-gradient-to-b from-gold-light to-copper px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-charcoal-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow sm:w-auto"
              >
                Yes, Enter
              </button>
              <button
                onClick={decline}
                className="w-full rounded-full border border-copper/40 px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-cream-dim transition-colors hover:border-cream/40 hover:text-cream sm:w-auto"
              >
                No, Exit
              </button>
            </div>

            <p className="mt-8 text-xs uppercase tracking-widest2 text-cream-muted">
              {SITE.age} · Please enjoy responsibly
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold">Come back soon.</h1>
            <p className="mx-auto mt-4 max-w-sm text-cream-dim">
              You must be 21 or older to enter. We'll be here when the time is
              right. Please always enjoy responsibly and never drink and drive.
            </p>
            <a
              href={SAFE_EXIT_URL}
              className="mt-8 inline-flex rounded-full border border-copper/50 px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-gold-light transition-colors hover:border-gold-light"
            >
              Learn about responsibility
            </a>
          </>
        )}
      </div>
    </div>
  );
}
