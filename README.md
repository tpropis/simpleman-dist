# Simple Man Distillery

A premium, cinematic marketing website for **Simple Man Distillery** — a Georgia
farm-to-glass craft spirits brand and speakeasy cocktail bar at Cumming City
Center.

Built with **React + TypeScript + Vite + Tailwind CSS**, with tasteful motion
from **Framer Motion**. Dark, warm, and copper-lit, with a built-in 21+ age gate
and compliance safeguards throughout.

> **Georgia in a glass.** Small-batch spirits, Southern food, and a cocktail bar
> built around real Georgia ingredients. **Must be 21+. Please enjoy responsibly.**

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build locally
```

Node 18+ recommended (CI/Netlify pinned to Node 20).

---

## Tech stack

- **Vite 5** — fast dev server and build
- **React 18 + TypeScript** (strict mode)
- **React Router 6** — multi-page client routing with SPA fallback
- **Tailwind CSS 3** — design system + utilities
- **Framer Motion** — scroll reveals, parallax, staggered entrances (all respect
  `prefers-reduced-motion`)

No heavy or unnecessary dependencies. Final bundle ≈ 112 kB gzipped JS.

---

## Pages

| Route                     | Page                                            |
| ------------------------- | ----------------------------------------------- |
| `/`                       | Home (hero, spirits, field-to-glass, bar, quiz, events, press, CTA) |
| `/spirits`                | Spirits lineup + detailed profiles              |
| `/bar`                    | Bar / Cocktails (speakeasy)                     |
| `/farm-to-glass`          | Farm-to-Glass story + farm partners             |
| `/events`                 | Events (tastings, cocktail nights, private)     |
| `/visit`                  | Visit / Contact + Join the List                 |
| `/where-to-buy`           | Where to Buy ("Find near you")                  |
| `/story`                  | Story + Press                                   |
| `/responsible-enjoyment`  | Legal / Responsible Enjoyment                   |
| `*`                       | 404                                             |

---

## Project structure

```
src/
  components/      AgeGate, Header, Footer, Layout, CinematicHero, MediaBackground,
                   SmokeOverlay, AnimatedSection, SectionHeading, PremiumButton,
                   SpiritCard, BottleArt, FieldToGlassTimeline, PickYourPour,
                   EventCard, PressStrip, VisitCard, JoinList, CtaBanner, Seo
  data/            site.ts, nav.ts, spirits.ts, events.ts  (verified facts only)
  pages/           Home, Spirits, Bar, FarmToGlass, Events, Visit, WhereToBuy,
                   Story, ResponsibleEnjoyment, NotFound
  index.css        Tailwind layers + design-system primitives
  App.tsx          Routes + age gate
  main.tsx         Entry
public/
  images/          (README documents every expected photo path)
  videos/          (README documents every expected video path)
  favicon.svg, _redirects
```

---

## Media: drop-in photos & video

The site is **fully designed without any photography** — it uses CSS gradients,
generated SVG bottle art, film grain, smoke, and copper-glow lighting so it looks
premium out of the box.

To upgrade to real media, just **drop files into `public/images/...` or
`public/videos/...` using the documented filenames** — no code changes needed:

- Every `<img>` has an `onError` fallback to the cinematic art.
- `MediaBackground` renders a `<video>` only if the file exists; otherwise the
  gradient/poster shows. A missing video never breaks the layout.

See `public/images/README.md` and `public/videos/README.md` for the exact paths
and the concept for each asset.

---

## Compliance & responsible-marketing safeguards

This is an alcohol website and is built to be compliant:

- **21+ age gate** before site entry, with the affirmation stored in
  `localStorage`. Choosing "No" routes to a neutral responsibility resource.
- **"Must be 21+"** and **"Please enjoy responsibly. Never drink and drive."**
  shown in the footer on every page, plus a dedicated
  **Responsible Enjoyment** page with plain-language disclaimers and the SAMHSA
  helpline.
- Product copy describes **flavor, ingredients, craft, origin, and process
  only** — no health, wellness, mood, status, or performance claims.
- **No invented facts**: no fake ABV, pricing, awards, reviews, press quotes, or
  availability. Press links point to real, verifiable articles (source names
  only). The "Georgia Grown" designation is a verified state program.
- **No fake commerce**: no online checkout or shipping claims. "Find near you"
  directs visitors to the distillery or a licensed retailer in person.
- All lifestyle content is clearly adult; designated-driver reminders included.

---

## Accessibility & performance

- Semantic landmarks, skip-to-content link, labelled nav and forms.
- Visible keyboard focus states; the age gate is a labelled modal dialog.
- `alt` text on meaningful imagery; decorative layers marked `aria-hidden`.
- All animation honors `prefers-reduced-motion`.
- Lazy-loaded, below-the-fold imagery and lightweight code.
- Per-page SEO titles + meta/OG descriptions (`Seo` component).

---

## Deploying

### Netlify
`netlify.toml` and `public/_redirects` are included.

1. Connect the repo in Netlify.
2. Build command `npm run build`, publish directory `dist` (auto-detected).
3. Deploy. The SPA redirect handles deep links.

### Vercel
1. Import the repo (framework preset: **Vite**).
2. Build `npm run build`, output `dist`.
3. Add a rewrite of `/(.*)` → `/index.html` for client routing (or rely on
   Vercel's SPA handling).

---

## Notes / next steps

- Add real photography and video using the documented asset paths.
- Wire **Join the List** to a real provider (Mailchimp/Klaviyo) — it currently
  opens the visitor's email client (`JoinList.tsx`).
- Confirm and add the exact street suite, hours, and phone in `src/data/site.ts`
  when verified.
