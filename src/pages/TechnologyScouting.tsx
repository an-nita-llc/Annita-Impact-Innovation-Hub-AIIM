import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";

type Company = { id: string; name: string; category: string; stage: string; geo: string; score: number; summary: string };

const COMPANIES: Company[] = [
  { id: "c1", name: "HelioGrid", category: "Grid optimization", stage: "Series A", geo: "US", score: 94, summary: "AI grid-optimization software; 12 utility pilots; $18M raised." },
  { id: "c2", name: "BioLens", category: "Digital health", stage: "Seed", geo: "UK/Nigeria", score: 88, summary: "On-device diagnostics; NAFDAC cleared; 3 rural clinics." },
  { id: "c3", name: "AgriSense", category: "Agtech", stage: "Pre-seed", geo: "South Africa", score: 81, summary: "IoT soil analytics; 60 farms; +9% yield." },
];

export default function TechnologyScouting() {
  const [query, setQuery] = useState("");
  const filtered = COMPANIES.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Technology Scouting</h1>
          <p className="mt-1 text-sm text-muted-foreground">Conversational AI search across verified companies with snapshots & trends.</p>
        </div>
        <button type="button" className="btn btn-primary">
          <Sparkles aria-hidden="true" className="size-4" /> New scouting sprint
        </button>
      </div>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Describe what you're looking for…" className="min-h-12 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-base outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="flex flex-col gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="glass-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold tracking-tight">{c.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{c.category}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{c.stage}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{c.geo}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex size-12 items-center justify-center rounded-full border-4 border-brand-200 bg-brand-50 text-sm font-bold text-brand-700">{c.score}</div>
                <button type="button" className="btn btn-secondary btn-sm">AI snapshot</button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp aria-hidden="true" className="size-4 text-brand-700" /> Surfaces during scouting → evaluation → pilot with full record retained.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}