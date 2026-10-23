import { useState } from "react";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const RESULTS = [
  { type: "Founder", title: "Amina Diallo — Solara climate OS", href: "/founders", snippet: "AI operating layer for commercial solar portfolios; Seed; $750K." },
  { type: "Investor", title: "Northstar Ventures", href: "/investors", snippet: "Climate, energy, mobility; Pre-seed–Seed; $250K–$1M." },
  { type: "Deal", title: "MediBridge Health diligence room", href: "/deal-rooms", snippet: "8 docs · active · data room open." },
  { type: "Program", title: "Founders Lab Africa", href: "/programs", snippet: "Cohort 4 · 24 founders · demo day Aug 12." },
  { type: "Doc", title: "Term Sheet Template (SAFE)", href: "/documents", snippet: "Legal · platform template · 180KB." },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const filtered = RESULTS.filter((r) => !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">Semantic search across people, deals, docs, and programs.</p>
      </div>
      <div className="relative">
        <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search everything…" className="min-h-12 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-base outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      {query ? (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => (
            <Link key={r.title} to={r.href} className="glass-card block">
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">{r.type}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.snippet}</p>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No results.</p> : null}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <Sparkles aria-hidden="true" className="size-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">Start typing to search people, deals, documents, and programs.</p>
        </div>
      )}
    </div>
  );
}