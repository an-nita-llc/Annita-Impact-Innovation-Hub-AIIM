import { Search, Building2, Rocket, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type Partner = { id: string; name: string; type: string; industry: string; challenge: string; status: string; pilots: number };

const PARTNERS: Partner[] = [
  { id: "p1", name: "Atlas Energy", type: "Corporate", industry: "Energy", challenge: "Grid resilience & storage", status: "Active pilot", pilots: 3 },
  { id: "p2", name: "HealthForward Foundation", type: "Foundation", industry: "Health", challenge: "Rural clinic digitization", status: "Scouting", pilots: 0 },
  { id: "p3", name: "Canaan Accelerator", type: "Accelerator", industry: "Cross-sector", challenge: "Cohort 3 deal flow", status: "Active", pilots: 7 },
  { id: "p4", name: "University Innovation Office", type: "University", industry: "Research transfer", challenge: "IP commercialization", status: "Onboarding", pilots: 1 },
];

export default function Partners() {
  const [query, setQuery] = useState("");
  const filtered = PARTNERS.filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.industry.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
          <p className="mt-1 text-sm text-muted-foreground">Corporate and ecosystem partner challenges, pilots, and ventures.</p>
        </div>
        <button type="button" className="btn btn-primary">Post a challenge</button>
      </div>
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search partners, industries…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <div key={p.id} className="glass-card">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Building2 aria-hidden="true" className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold tracking-tight">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.type} · {p.industry}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{p.status}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Challenge: {p.challenge}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Rocket aria-hidden="true" className="size-4 text-brand-700" />
              {p.pilots} live pilots
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary btn-sm">Open challenge</button>
              <button type="button" className="btn btn-secondary btn-sm">
                <CheckCircle2 aria-hidden="true" className="size-4" /> Verify partner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}