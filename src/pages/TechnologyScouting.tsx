import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";

type Company = {
  id: string;
  name: string;
  category: string;
  stage: string;
  geo: string;
  score: number;
  summary: string;
};

const COMPANIES: Company[] = [
  { id: "c1", name: "HelioGrid Energy", category: "Grid Optimization", stage: "Series A", geo: "US / West Africa", score: 94, summary: "AI grid-optimization software; 12 utility pilots; $18M total capital raised." },
  { id: "c2", name: "BioLens Diagnostics", category: "Digital Health", stage: "Seed Round", geo: "Nigeria / UK", score: 88, summary: "On-device point-of-care diagnostics; NAFDAC cleared; 3 rural health networks." },
  { id: "c3", name: "AgriSense Soil IoT", category: "Agtech & Analytics", stage: "Pre-seed", geo: "South Africa", score: 81, summary: "IoT soil moisture & nutrient analytics; 60 commercial farms; +9% yield lift." },
];

export default function TechnologyScouting() {
  const [query, setQuery] = useState("");
  const filtered = COMPANIES.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Technology Scouting</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700">
              Conversational Sprint
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            AI-driven venture discovery across vetted companies, technical snapshots, and trend analysis.
          </p>
        </div>
        <button type="button" className="btn btn-primary">
          <Sparkles className="size-4" /> Start Scouting Sprint
        </button>
      </div>

      {/* Conversational Search Input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe technology requirements (e.g., AI grid optimization software in emerging markets)..."
          className="h-12 w-full rounded-2xl border border-border/80 bg-surface pl-12 pr-4 text-xs font-medium outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-xs"
        />
      </div>

      {/* Scouted Companies List */}
      <div className="flex flex-col gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="glass-card transition-all hover:border-brand-300">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-bold tracking-tight text-foreground">{c.name}</h2>
                  <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800">
                    {c.stage}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 font-semibold text-foreground">
                    {c.category}
                  </span>
                  <span className="rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 font-semibold text-foreground">
                    {c.geo}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex size-12 items-center justify-center rounded-2xl border-2 border-brand-300 bg-brand-50 text-sm font-extrabold text-brand-700 shadow-xs">
                  {c.score}%
                </div>
                <button type="button" className="btn btn-secondary btn-sm">Generate Snapshot</button>
              </div>
            </div>

            <div className="mt-4 border-t border-border/60 pt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="size-4 text-emerald-600" />
              <span>Full audit history retained: Scouting → Diligence → Pilot workspace</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}