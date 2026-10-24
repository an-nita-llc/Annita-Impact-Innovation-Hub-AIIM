import { useState } from "react";
import { History, Search } from "lucide-react";

type Record = {
  id: string;
  entity: string;
  decision: string;
  reason: string;
  reviewer: string;
  date: string;
};

const RECORDS: Record[] = [
  { id: "im1", entity: "MediBridge Health", decision: "Declined (Pre-seed)", reason: "Stage below lead fund mandate; geography out of scope; check size too small.", reviewer: "Northstar Investment Committee", date: "2025-09-12" },
  { id: "im2", entity: "Solara Climate OS", decision: "Advanced to Term Sheet", reason: "Strong thesis fit; check size aligned with round lead terms; clean cap table.", reviewer: "Impact Capital Committee", date: "2025-10-03" },
  { id: "im3", entity: "Atlas Energy Pilots", decision: "Pilot Extended", reason: "KPI on track after mid-sprint intervention; second commercial site approved.", reviewer: "Corporate Innovation Panel", date: "2025-11-21" },
  { id: "im4", entity: "AgriSense Analytics", decision: "Passed (Series A)", reason: "Market saturated; follow-on round valuation priced above target target.", reviewer: "Frontier Angels Board", date: "2025-12-01" },
];

export default function InstitutionalMemory() {
  const [query, setQuery] = useState("");
  const filtered = RECORDS.filter(
    (r) =>
      !query ||
      r.entity.toLowerCase().includes(query.toLowerCase()) ||
      r.decision.toLowerCase().includes(query.toLowerCase()) ||
      r.reason.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Institutional Memory Archive</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Searchable evaluation rationale and historical decision records across deals, pilots, and IC reviews.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entity name, decision outcome, rationale..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
        />
      </div>

      {/* Decision Records List */}
      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="glass-card transition-all hover:border-brand-300">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-200">
                <History className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-bold text-foreground">{r.entity}</h2>
                  <span className="rounded-full bg-muted border border-border/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {r.decision}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.reason}</p>
                <p className="mt-2 text-[10px] font-semibold text-muted-foreground">
                  Reviewed by <strong className="text-foreground">{r.reviewer}</strong> • Date: {r.date}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No matching institutional memory records found.
          </div>
        ) : null}
      </div>
    </div>
  );
}