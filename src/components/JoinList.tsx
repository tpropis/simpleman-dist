import { useState } from "react";
import { SITE } from "../data/site";

/**
 * Honest "join the list" form. There is no fake backend — submitting opens the
 * visitor's email client addressed to the distillery. Swap in a real provider
 * (Mailchimp, Klaviyo, etc.) by replacing the onSubmit handler.
 */
export default function JoinList() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Join the List — Simple Man Distillery");
    const body = encodeURIComponent(
      `Please add me to the Simple Man Distillery list.\n\nEmail: ${email}`
    );
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl glass p-7 sm:p-9">
      <p className="eyebrow">Join the list</p>
      <h3 className="mt-3 font-display text-2xl font-semibold">
        First to know. First to taste.
      </h3>
      <p className="mt-2 text-sm text-cream-dim">
        Seasonal releases, cocktail nights, and tasting events — straight to your
        inbox. For guests 21 and older.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="join-email">
          Email address
        </label>
        <input
          id="join-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-full border border-copper/30 bg-charcoal-900/60 px-5 py-3 text-sm text-cream placeholder:text-cream-muted focus:border-gold-light"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-full border border-gold-light/40 bg-gradient-to-b from-gold-light to-copper px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-charcoal-900 transition-all hover:-translate-y-0.5 hover:shadow-glow-sm"
        >
          Join
        </button>
      </div>
      {sent && (
        <p className="mt-4 text-sm text-gold-light">
          Thanks — your email app should be opening. We'll be in touch.
        </p>
      )}
      <p className="mt-4 text-xs text-cream-muted">
        By joining you confirm you are 21+. Please enjoy responsibly.
      </p>
    </form>
  );
}
