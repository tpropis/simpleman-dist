// Real, verifiable press that has covered Simple Man Distillery. Outlet names
// link to the original articles — no fabricated quotes or awards.

interface PressItem {
  outlet: string;
  url: string;
}

export const PRESS: PressItem[] = [
  {
    outlet: "Forbes",
    url: "https://www.forbes.com/sites/brianfreedman/2021/08/27/wines-of-the-week-legras--haas-champagne-carbone-cabernet-and-simple-man-distillery-gullah-geechee-gin/",
  },
  {
    outlet: "AJC",
    url: "https://www.ajc.com/lifestyles/food--cooking/mind-chef-heart-farmer/QpsSoeqTEwGOCDykJ8xhgO/",
  },
  {
    outlet: "Voyage ATL",
    url: "https://voyageatl.com/interview/meet-justin-douglas-simple-man-distillery-metro-atlanta/",
  },
  {
    outlet: "Excuse My Atlanta Sass",
    url: "https://open.spotify.com/episode/2XnCPHQYHywgruQkgg5PEG",
  },
];

/** Editorial press row — outlet names in serif, as on the original site. */
export default function PressStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 font-display text-2xl text-cream/80 sm:text-3xl">
      {PRESS.map((p) => (
        <a
          key={p.url}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="italic transition hover:text-gold"
        >
          {p.outlet}
        </a>
      ))}
    </div>
  );
}
