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
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Technology Scouting</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            Conversational Sprint
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          AI-driven venture discovery across vetted companies, technical snapshots, and trend analysis.
        </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Sparkles className="size-4" /> Start Scouting Sprint
          </button>
        </div>
      </div>

      {/* Conversational Search Input */}
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe technology requirements (e.g., AI grid optimization software in emerging markets)..."
          className="h-12 w-full rounded-2xl border border-border/80 bg-surface pl-12 pr-4 text-xs font-medium outline-none focus:border-brand-500 shadow-xs"
        />
      </div>

      {/* Scouted Companies List - Vertically Stacked Content */}
      <div className="flex flex-col gap-4 w-full">
        {filtered.map((c) => (
          <div key={c.id} className="glass-card flex flex-col gap-3 transition-all hover:border-brand-300">
            <div className="flex flex-col items-start gap-1.5 w-full">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">{c.name}</h2>
              <div>
                <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800">
                  {c.stage}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{c.summary}</p>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Venture Specs</p>
              <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 space-y-1 text-xs font-semibold text-foreground">
                <p>• Category: <strong>{c.category}</strong></p>
                <p>• Region: <strong>{c.geo}</strong></p>
                <p className="text-brand-700 font-bold">• AI Scout Confidence: <strong>{c.score}%</strong></p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border/60 pt-3 w-full">
              <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full">
                Generate AI Snapshot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}