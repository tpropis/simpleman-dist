import type { ReactElement } from "react";
import type { EventType } from "../data/events";

const ICONS: Record<EventType["icon"], ReactElement> = {
  tasting: (
    <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Zm5 11v5m-3 0h6" />
  ),
  cocktail: <path d="M4 4h16l-8 9v6m-4 0h8M9 8h6" />,
  private: <path d="M4 10V7a3 3 0 0 1 6 0v3m-8 0h12v10H2V10Zm14-1 5 2-2 9-5-1" />,
  music: <path d="M9 18V5l10-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
  release: <path d="M12 3v6m0 0 4 4m-4-4-4 4m-3 5h14l-1 4H6l-1-4Z" />,
};

export default function EventCard({ event }: { event: EventType }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-copper/10 blur-2xl transition-opacity duration-500 group-hover:bg-copper/20"
      />
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-copper/40 text-gold-light">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            {ICONS[event.icon]}
          </svg>
        </span>
        <div>
          <h3 className="text-xl font-semibold leading-tight">{event.title}</h3>
          <p className="text-xs uppercase tracking-widest2 text-copper-light">
            {event.cadence}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-cream-dim">
        {event.description}
      </p>
    </article>
  );
}
