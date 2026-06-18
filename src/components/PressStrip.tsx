// Real, verifiable press that has covered Simple Man Distillery. We list the
// publication name and the subject of the coverage and link out to the source.
// No quotes are fabricated and no awards are invented — visitors read the
// original article for themselves.

interface PressItem {
  outlet: string;
  topic: string;
  url: string;
}

export const PRESS: PressItem[] = [
  {
    outlet: "Gwinnett Magazine",
    topic: "Simple Man Distillery to open at Cumming City Center",
    url: "https://gwinnettmagazine.com/simple-man-distillery-to-open-july-2023-at-a-cumming-city-center/",
  },
  {
    outlet: "Forsyth News",
    topic: "Georgia-grown spirits arrive at Cumming City Center",
    url: "https://www.forsythnews.com/news/business/simple-man-distillery-brings-georgia-grown-spirits-cumming-city-center_forsythcounty/",
  },
  {
    outlet: "Voyage ATL",
    topic: "Meet Justin Douglas of Simple Man Distillery",
    url: "https://voyageatl.com/interview/meet-justin-douglas-simple-man-distillery-metro-atlanta/",
  },
  {
    outlet: "What Now Atlanta",
    topic: "Distiller plans first brick-and-mortar location",
    url: "https://whatnowatlanta.com/award-winning-distiller-plans-to-open-first-brick-and-mortar-location/",
  },
  {
    outlet: "Cumming City Center",
    topic: "Simple Man Distillery — business profile",
    url: "https://cummingcitycenter.com/business/simple-man-distillery/",
  },
  {
    outlet: "The Business Download",
    topic: "Boosting Georgia's farming sector",
    url: "https://thebusinessdownload.com/simple-man-distillery-aims-to-boost-georgias-farming-sector/",
  },
];

export default function PressStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PRESS.map((p) => (
        <li key={p.url}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between rounded-2xl border border-copper/20 bg-charcoal-800/50 p-5 transition-all hover:-translate-y-1 hover:border-gold-light/50"
          >
            <span className="font-display text-lg text-cream group-hover:text-gold-light">
              {p.outlet}
            </span>
            <span className="mt-2 text-sm text-cream-muted">{p.topic}</span>
            <span className="mt-4 text-xs uppercase tracking-widest2 text-copper-light">
              Read source →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
