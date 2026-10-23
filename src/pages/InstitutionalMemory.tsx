import { useState } from "react";
import { Search, History } from "lucide-react";

type Record = { id: string; entity: string; decision: string; reason: string; reviewer: string; date: string };

const RECORDS: Record[] = [
  { id: "im1", entity: "MediBridge Health", decision: "Declined (pre-seed)", reason: "Stage below mandate; geography out of scope; check size too small.", reviewer: "Northstar IC", date: "2025-09-12" },
  { id: "im2", entity: "Solara climate OS", decision: "Advanced to term sheet", reason: "Strong sector+thesis fit; check size aligned; clean cap table.", reviewer: "Impact Fund", date: "2025-10-03" },
  { id: "im3", entity: "Atlas Energy pilots", decision: "Pilot extended", reason: "KPI on track after intervention; second site approved.", reviewer: "Corp Innovation", date: "2025-11-21" },
  { id: "im4", entity: "AgriSense", decision: "Passed (Series A)", reason: "Market saturated; follow-on round priced too high.", reviewer: "Frontier Angels", date: "2025-12-01" },
];

export default function InstitutionalMemory() {
  const [query, setQuery] = useState("");
  const filtered = RECORDS.filter((r) => !query || r.entity.toLowerCase().includes(query.toLowerCase()) || r.decision.toLowerCase().includes(query.toLowerCase()) || r.reason.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Institutional Memory</h1>
        <p className="mt-1 text-sm text-muted-foreground">Searchable evaluation rationale across deals, pilots, and decisions.</p>
      </div>
      <div className="relative max-w-md">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search entity, decision, rationale…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="glass-card">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><History aria-hidden="true" className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{r.entity}</p>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{r.decision}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.reason}</p>
                <p className="mt-2 text-xs text-muted-foreground">{r.reviewer} · {r.date}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No matching records.</p> : null}
      </div>
    </div>
  );
}