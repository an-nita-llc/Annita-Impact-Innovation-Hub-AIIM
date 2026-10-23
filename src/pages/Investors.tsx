import { useState } from "react";
import { Search, Users } from "lucide-react";

type Investor = { id: string; name: string; firm: string; focus: string; stages: string; ticket: string; geo: string; signals: string[] };

const INVESTORS: Investor[] = [
  { id: "i1", name: "Northstar Ventures", firm: "Northstar Partners", focus: "Climate, energy, mobility", stages: "Pre-seed–Seed", ticket: "$250K–$1M", geo: "US, EU", signals: ["Leads rounds", " climate infra thesis", "3 portfolio cos in Africa"] },
  { id: "i2", name: "Impact Fund I", firm: "Impact Capital", focus: "Digital health, education", stages: "Seed–Series A", ticket: "$500K–$3M", geo: "Africa, SEA", signals: ["Follow-on ready", "Gender-lens mandate", "Mentor network"] },
  { id: "i3", name: "Frontier Angels", firm: "Frontier Angels", focus: "Agtech, fintech", stages: "Pre-seed", ticket: "$50K–$250K", geo: "Global", signals: ["Fast decisions", "Syndicate-friendly", "Operator angels"] },
];

export default function Investors() {
  const [query, setQuery] = useState("");
  const filtered = INVESTORS.filter((i) => !query || i.name.toLowerCase().includes(query.toLowerCase()) || i.focus.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Investors</h1>
          <p className="mt-1 text-sm text-muted-foreground">Investor mandates, portfolios, and match preferences.</p>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search investors, firms, sectors…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((i) => (
          <div key={i.id} className="glass-card">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Users aria-hidden="true" className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold tracking-tight">{i.name}</p>
                <p className="text-xs text-muted-foreground">{i.firm}</p>
              </div>
              <span className="text-right text-sm font-bold text-brand-700">{i.ticket}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div><dt className="text-muted-foreground">Focus</dt><dd className="font-medium">{i.focus}</dd></div>
              <div><dt className="text-muted-foreground">Stages</dt><dd className="font-medium">{i.stages}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Geography</dt><dd className="font-medium">{i.geo}</dd></div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {i.signals.map((s) => <span key={s} className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">{s.trim()}</span>)}
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary btn-sm">View mandate</button>
              <button type="button" className="btn btn-secondary btn-sm">Introduce</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}