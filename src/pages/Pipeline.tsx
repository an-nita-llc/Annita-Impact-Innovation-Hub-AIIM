import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";

type Stage = "Sourced" | "Screening" | "Meeting" | "Diligence" | "Term sheet" | "Closed";
const stages: Stage[] = ["Sourced", "Screening", "Meeting", "Diligence", "Term sheet", "Closed"];

type Deal = {
  id: string;
  name: string;
  type: string;
  stage: Stage;
  owner: string;
  value: string;
  next: string;
};

const DEALS: Deal[] = [
  { id: "d1", name: "Solara climate OS", type: "Startup · Seed", stage: "Meeting", owner: "A. Mensah", value: "$750K", next: "Intro call · Fri" },
  { id: "d2", name: "Northstar Ventures", type: "Investor · Lead", stage: "Screening", owner: "K. Ouedraogo", value: "$500K", next: "Mandate review" },
  { id: "d3", name: "MediBridge Health", type: "Startup · Pre-seed", stage: "Diligence", owner: "A. Mensah", value: "$400K", next: "Data room open" },
  { id: "d4", name: "Atlas Energy pilots", type: "Partner · Pilot", stage: "Sourced", owner: "Team", value: "$120K", next: "Scout outreach" },
  { id: "d5", name: "Foundry Cohort 3", type: "Program · Batch", stage: "Term sheet", owner: "Ops", value: "$250K", next: "IC approval" },
];

export default function Pipeline() {
  const [query, setQuery] = useState("");

  const byStage = useMemo(() => {
    const q = query.toLowerCase();
    return stages.map((s) => ({
      stage: s,
      deals: DEALS.filter(
        (d) => d.stage === s && (!q || d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)),
      ),
    }));
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track rounds, deals, and pilots across every stage.</p>
        </div>
        <button type="button" className="btn btn-primary">
          <Plus aria-hidden="true" className="size-4" /> New deal
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search deals…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {byStage.map((col) => (
          <section key={col.stage} className="min-w-[260px] flex-1 rounded-xl border border-border bg-muted/30 p-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight">{col.stage}</h2>
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">{col.deals.length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {col.deals.map((d) => (
                <Link key={d.id} to="/deal-rooms" className="block rounded-lg border border-border bg-surface p-3 transition hover:border-brand-300">
                  <p className="text-sm font-semibold tracking-tight">{d.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d.type}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-brand-700">{d.value}</span>
                    <span className="text-muted-foreground">{d.owner}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Next: {d.next}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}