import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Sparkles } from "lucide-react";

const RESULTS = [
  { type: "Founder", title: "Amina Diallo — Solara Climate OS", href: "/founders", snippet: "AI operating layer for commercial solar energy portfolios; Seed; $750K raise." },
  { type: "Investor", title: "Northstar Ventures", href: "/investors", snippet: "Climate, energy, smart mobility; Pre-seed–Seed; $250K–$1M ticket." },
  { type: "Deal Room", title: "MediBridge Health Diligence Room #r2", href: "/deal-rooms", snippet: "9 documents • NDA gated • active data room open." },
  { type: "Program", title: "Founders Lab West Africa Cohort 4", href: "/programs", snippet: "Accelerator program • 24 founders • demo day Aug 12." },
  { type: "Document", title: "Standard SAFE Term Sheet Template", href: "/documents", snippet: "Legal • platform template • 180 KB download." },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const filtered = RESULTS.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.snippet.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Global Semantic Search</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Search founders, investors, deal rooms, documents, and programs across AIIM.</p>
      </div>

      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people, deals, documents, and programs..."
          className="h-12 w-full rounded-2xl border border-border/80 bg-surface pl-12 pr-4 text-xs font-medium outline-none focus:border-brand-500 shadow-xs"
        />
      </div>

      {query ? (
        <div className="flex flex-col gap-3 w-full">
          {filtered.map((r) => (
            <Link key={r.title} to={r.href} className="glass-card block transition-all hover:border-brand-300 p-4">
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 uppercase tracking-wider shrink-0 mt-0.5">
                  {r.type}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-bold text-foreground">{r.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">{r.snippet}</p>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No platform results found for "{query}". Try a different search query.
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-8 sm:p-12 text-center w-full">
          <Sparkles className="size-10 text-brand-600 mb-2" />
          <h2 className="text-sm font-bold text-foreground">Global Platform Index Ready</h2>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            Type keywords above to search founders, VC funds, deal rooms, SAFE templates, and innovation programs.
          </p>
        </div>
      )}
    </div>
  );
}