import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SPIRITS, getSpirit } from "../data/spirits";
import BottleArt from "./BottleArt";

type Slug = (typeof SPIRITS)[number]["slug"];

interface Option {
  label: string;
  hint: string;
  weights: Partial<Record<Slug, number>>;
}
interface Question {
  prompt: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    prompt: "First instinct — what are you after tonight?",
    options: [
      { label: "Bright & clean", hint: "Crisp, refreshing", weights: { "peach-grain-vodka": 2, "gullah-geechee-gin": 1 } },
      { label: "Smoky & warm", hint: "Charred, cozy", weights: { "smoked-apple-brandy": 2 } },
      { label: "Botanical", hint: "Herbal, aromatic", weights: { "gullah-geechee-gin": 2 } },
      { label: "Bitter-sweet", hint: "Complex, grown-up", weights: { "amaro-georgiano": 2 } },
    ],
  },
  {
    prompt: "How do you like to drink it?",
    options: [
      { label: "In a cocktail", hint: "Shaken or stirred", weights: { "peach-grain-vodka": 1, "gullah-geechee-gin": 1 } },
      { label: "Neat or one rock", hint: "Slow sipping", weights: { "smoked-apple-brandy": 2, "amaro-georgiano": 1 } },
      { label: "Bright & bubbly", hint: "Spritz style", weights: { "gullah-geechee-gin": 1, "peach-grain-vodka": 1 } },
      { label: "After dinner", hint: "A digestivo", weights: { "amaro-georgiano": 2 } },
    ],
  },
  {
    prompt: "Pick a Georgia flavor.",
    options: [
      { label: "Farm-fresh fruit", hint: "Peach & orchard", weights: { "peach-grain-vodka": 2 } },
      { label: "Barrel & smoke", hint: "Oak & fire", weights: { "smoked-apple-brandy": 2 } },
      { label: "Garden herbs", hint: "Juniper & green", weights: { "gullah-geechee-gin": 2 } },
      { label: "Roots & citrus peel", hint: "Dark & zesty", weights: { "amaro-georgiano": 2 } },
    ],
  },
];

export default function PickYourPour() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  const result = useMemo(() => {
    if (answers.length < QUESTIONS.length) return null;
    const scores = new Map<Slug, number>();
    for (const a of answers) {
      for (const [slug, w] of Object.entries(a.weights) as [Slug, number][]) {
        scores.set(slug, (scores.get(slug) ?? 0) + w);
      }
    }
    let best: Slug = SPIRITS[0].slug;
    let bestScore = -1;
    for (const s of SPIRITS) {
      const sc = scores.get(s.slug) ?? 0;
      if (sc > bestScore) {
        best = s.slug;
        bestScore = sc;
      }
    }
    return getSpirit(best)!;
  }, [answers]);

  function choose(opt: Option) {
    setAnswers((prev) => [...prev.slice(0, step), opt]);
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
  }

  const q = QUESTIONS[step];
  const progress = result ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <div className="relative overflow-hidden rounded-3xl glass p-6 shadow-card sm:p-10">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px animate-sweep bg-gradient-to-r from-transparent via-gold-light/70 to-transparent"
      />

      {/* progress */}
      <div className="mb-8 flex items-center gap-4">
        <span className="eyebrow whitespace-nowrap">Pick Your Pour</span>
        <div className="h-px flex-1 bg-charcoal-600">
          <div
            className="h-px bg-gold-light transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-cream-muted">
          {result ? "Result" : `${step + 1} / ${QUESTIONS.length}`}
        </span>
      </div>

      {!result && q && (
        <div>
          <h3 className="text-2xl font-semibold sm:text-3xl">{q.prompt}</h3>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => choose(opt)}
                className="group flex items-center justify-between rounded-2xl border border-copper/25 bg-charcoal-700/40 px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-gold-light/60 hover:bg-charcoal-600/50"
              >
                <span>
                  <span className="block font-medium text-cream">
                    {opt.label}
                  </span>
                  <span className="block text-sm text-cream-muted">
                    {opt.hint}
                  </span>
                </span>
                <span className="text-copper-light transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="mt-6 text-xs uppercase tracking-widest2 text-cream-muted hover:text-cream"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
          <div className="mx-auto h-48 w-auto sm:mx-0">
            <BottleArt
              liquid={result.liquid}
              accent={result.accent}
              label={result.name}
              className="h-full w-auto"
            />
          </div>
          <div>
            <p className="eyebrow">Your pour</p>
            <h3 className="mt-2 text-3xl font-semibold">{result.name}</h3>
            <p className="mt-2 text-cream-dim">{result.tagline}</p>
            <p className="mt-3 text-sm text-cream-muted">
              <span className="text-copper-light">Try it as a </span>
              {result.cocktail.name} — {result.cocktail.note}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/where-to-buy"
                className="rounded-full border border-gold-light/40 bg-gradient-to-b from-gold-light to-copper px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-charcoal-900 transition-all hover:-translate-y-0.5 hover:shadow-glow-sm"
              >
                Find Near You
              </Link>
              <button
                onClick={restart}
                className="rounded-full border border-copper/40 px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-cream-dim transition-colors hover:border-cream/40 hover:text-cream"
              >
                Start Over
              </button>
            </div>
            <p className="mt-5 text-xs text-cream-muted">
              A taste suggestion for adults 21+. However you pour it, enjoy
              responsibly — and never drink and drive.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
