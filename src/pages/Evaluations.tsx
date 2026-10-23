import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

const CRITERIA = ["Team", "Traction", "Market", "Capital structure", "Compliance posture"];

const SCORES: Record<string, number[]> = {
  "Solara climate OS": [9, 8, 8, 9, 7],
  "MediBridge Health": [8, 7, 7, 6, 8],
};

export default function Evaluations() {
  const [selected, setSelected] = useState(Object.keys(SCORES)[0]);
  const [reviews, setReviews] = useState<Record<string, number[]>>({});

  const scores = SCORES[selected];
  const review = reviews[selected] ?? scores;

  function setScore(i: number, v: number) {
    setReviews((r) => ({ ...r, [selected]: review.map((x, idx) => (idx === i ? v : x)) }));
  }

  const consensus = review.reduce((a, b) => a + b, 0) / review.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evaluations</h1>
          <p className="mt-1 text-sm text-muted-foreground">Structured scorecards, multi-reviewer consensus, decision records.</p>
        </div>
        <button type="button" className="btn btn-primary">Start review</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(SCORES).map((n) => (
          <button key={n} type="button" onClick={() => setSelected(n)} className={`min-h-10 rounded-lg px-4 text-sm font-medium transition ${selected === n ? "bg-brand-600 text-white" : "border border-border bg-surface text-muted-foreground hover:text-foreground"}`}>{n}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Scorecard</p>
          <ul className="mt-4 flex flex-col gap-4">
            {CRITERIA.map((c, i) => (
              <li key={c}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c}</span>
                  <span className="text-sm font-bold text-brand-700">{review[i]}/10</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 10 }).map((_, v) => (
                    <button key={v} type="button" onClick={() => setScore(i, v + 1)} className={`h-6 flex-1 rounded ${v + 1 <= review[i] ? "bg-brand-600" : "bg-muted"}`} aria-label={`${c} ${v + 1}`} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Consensus</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-brand-700">{consensus.toFixed(1)}</p>
          <p className="mt-1 text-sm text-muted-foreground">out of 10 across {CRITERIA.length} dimensions</p>
          <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            Decision: {consensus >= 8 ? "Advance to term sheet" : consensus >= 6 ? "Continue diligence" : "Decline with rationale"}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn btn-primary btn-sm">
              <CheckCircle2 aria-hidden="true" className="size-4" /> Record decision
            </button>
            <button type="button" className="btn btn-secondary btn-sm">
              <Star aria-hidden="true" className="size-4" /> Add note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}