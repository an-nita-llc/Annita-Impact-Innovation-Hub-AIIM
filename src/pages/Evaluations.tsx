import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

const CRITERIA = ["Founder & Team Quality", "Market Size & Unit Economics", "Technology & Defensibility", "Capital Efficiency & Terms", "ESG & Impact Alignment"];

const SCORES: Record<string, number[]> = {
  "Solara Climate OS": [9, 8, 8, 9, 7],
  "MediBridge Health": [8, 7, 7, 6, 8],
  "AgriSense Analytics": [7, 8, 9, 7, 9],
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
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Multi-Reviewer Evaluations</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Standardized 5-dimension scorecards and consensus decision tracking.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">Start New Review</button>
      </div>

      {/* Target Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(SCORES).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all active:scale-[0.98] ${
              selected === name
                ? "bg-brand-600 text-white shadow-xs"
                : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Scorecard Split View */}
      <div className="grid gap-4 md:grid-cols-2 w-full">
        <div className="glass-card">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
            Interactive Scorecard
          </p>
          <ul className="mt-4 space-y-4">
            {CRITERIA.map((criterion, idx) => (
              <li key={criterion}>
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>{criterion}</span>
                  <span className="text-brand-700">{review[idx]} / 10</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 10 }).map((_, val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScore(idx, val + 1)}
                      className={`h-11 flex-1 rounded-lg transition-colors active:scale-95 ${
                        val + 1 <= review[idx] ? "bg-brand-600" : "bg-muted"
                      }`}
                      aria-label={`${criterion} score ${val + 1}`}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
              Consensus Score
            </p>

            <div className="mt-4 text-center p-6 rounded-2xl bg-background border border-border/80">
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-brand-700">{consensus.toFixed(1)}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">
                Average Score out of 10.0
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-brand-50 p-3 border border-brand-200 text-xs font-bold text-brand-800 text-center">
              Recommendation: {consensus >= 8 ? "Advance to Term Sheet" : consensus >= 6 ? "Continue Diligence" : "Decline with Rationale"}
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2 border-t border-border/60 pt-3">
            <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:flex-1">
              <CheckCircle2 className="size-3.5" /> Record Decision
            </button>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">
              <Star className="size-3.5" /> Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}