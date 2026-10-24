import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, Plus, Rocket, Search } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  type: string;
  industry: string;
  challenge: string;
  status: string;
  pilots: number;
};

const PARTNERS: Partner[] = [
  { id: "p1", name: "Atlas Energy Group", type: "Corporate Partner", industry: "Energy & Infrastructure", challenge: "Grid resilience & distributed battery storage", status: "Active Pilot", pilots: 3 },
  { id: "p2", name: "HealthForward Foundation", type: "Philanthropic Foundation", industry: "Healthcare Delivery", challenge: "Rural clinic digital diagnostic systems", status: "Scouting", pilots: 0 },
  { id: "p3", name: "Canaan Innovation Accelerator", type: "Ecosystem Partner", industry: "Cross-sector", challenge: "Cohort 3 deal flow & mentor matching", status: "Active Cohort", pilots: 7 },
  { id: "p4", name: "University Commercialization Office", type: "Academic Lab", industry: "Research Transfer", challenge: "Deep tech IP commercialization & spin-outs", status: "Onboarding", pilots: 1 },
];

export default function Partners() {
  const [query, setQuery] = useState("");
  const filtered = PARTNERS.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.industry.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Ecosystem Partners</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              {filtered.length} Corporate Partners
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Corporate innovation programs, foundation grants, university labs, and open challenges.
          </p>
        </div>
        <Link to="/challenges" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Plus className="size-4" /> Post a Challenge
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search partners, industries..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
        />
      </div>

      {/* Partner Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <div key={p.id} className="glass-card flex flex-col justify-between transition-all hover:border-brand-300">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white font-extrabold text-sm shadow-xs shrink-0">
                    <Building2 className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold tracking-tight text-foreground truncate">{p.name}</h2>
                    <p className="text-xs text-muted-foreground">{p.type} • {p.industry}</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 shrink-0">
                  {p.status}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-background/60 p-3 border border-border/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Challenge</p>
                <p className="mt-1 text-xs font-semibold text-foreground">{p.challenge}</p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-teal-700">
                <Rocket className="size-4 text-teal-600" />
                <span>{p.pilots} Live Pilot Projects</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-2 border-t border-border/60 pt-3">
              <Link to="/pilots" className="btn btn-primary btn-sm min-h-[44px] w-full sm:flex-1">Open Pilot Space</Link>
              <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">
                <CheckCircle2 className="size-3.5" /> Verified
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}