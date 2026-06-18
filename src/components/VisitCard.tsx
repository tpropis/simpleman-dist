import { SITE } from "../data/site";
import PremiumButton from "./PremiumButton";

/**
 * Compact "plan your visit" panel. Exact street suite and hours are left to the
 * contact flow rather than guessed, so nothing here is invented.
 */
export default function VisitCard() {
  return (
    <div className="overflow-hidden rounded-3xl glass p-7 shadow-card sm:p-9">
      <p className="eyebrow">Find us</p>
      <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
        {SITE.location.venue}
      </h3>
      <p className="mt-2 text-cream-dim">
        {SITE.location.city}, {SITE.location.state} · {SITE.location.region}
      </p>

      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 border-t border-copper/15 pt-4">
          <dt className="text-cream-muted">Tasting room &amp; bar</dt>
          <dd className="text-right text-cream">Mid-century speakeasy</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-copper/15 pt-4">
          <dt className="text-cream-muted">Distillery</dt>
          <dd className="text-right text-cream">Working copper still on site</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-copper/15 pt-4">
          <dt className="text-cream-muted">Hours</dt>
          <dd className="text-right text-cream">Call or message ahead</dd>
        </div>
      </dl>

      <div className="mt-7 flex flex-wrap gap-3">
        <PremiumButton href={SITE.social.facebook} size="sm">
          Message on Facebook
        </PremiumButton>
        <PremiumButton to="/visit" variant="outline" size="sm">
          Contact &amp; Directions
        </PremiumButton>
      </div>
    </div>
  );
}
