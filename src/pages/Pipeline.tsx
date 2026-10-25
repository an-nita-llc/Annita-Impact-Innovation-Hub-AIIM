import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  Plus,
  Search,
  Users,
} from "lucide-react";

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
  { id: "d1", name: "Solara Climate OS", type: "Startup • Seed Round", stage: "Meeting", owner: "A. Mensah", value: "$750K", next: "Partner Pitch • Fri 2 PM" },
  { id: "d2", name: "Northstar Ventures", type: "Lead Investor", stage: "Screening", owner: "K. Ouedraogo", value: "$500K", next: "Mandate Review" },
  { id: "d3", name: "MediBridge Health", type: "Startup • Pre-seed", stage: "Diligence", owner: "A. Mensah", value: "$400K", next: "Data Room Access" },
  { id: "d4", name: "Atlas Energy Pilots", type: "Corporate Partner", stage: "Sourced", owner: "Field Team", value: "$120K", next: "Initial Scout Outreach" },
  { id: "d5", name: "Foundry Cohort 3", type: "Accelerator Batch", stage: "Term sheet", owner: "Ops Team", value: "$250K", next: "Investment Committee Approval" },
];

export default function Pipeline() {
  const [query, setQuery] = useState("");
  const [activeStage, setActiveStage] = useState<string>("all");

  const filteredDeals = useMemo(() => {
    const q = query.toLowerCase();
    return DEALS.filter((d) => {
      const matchStage = activeStage === "all" || d.stage === activeStage;
      const matchQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q);
      return matchStage && matchQuery;
    });
  }, [query, activeStage]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Deal & Pilot Pipeline</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            $2.02M Active Volume
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Track funding rounds, pitch reviews, due diligence, and pilot approvals.
        </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Plus className="size-4" /> New Deal Entry
          </button>
        </div>
      </div>

      {/* Controls & Filter Stage Bar */}
      <div className="flex flex-col gap-3 w-full">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals, startups, owners..."
            className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
          />
        </div>

        {/* Stage Filter Buttons - Mobile Touch Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full rounded-2xl border border-border/80 bg-background/60 p-2">
          <button
            type="button"
            onClick={() => setActiveStage("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeStage === "all"
                ? "bg-brand-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground bg-surface border border-border/60"
            }`}
          >
            All Stages ({DEALS.length})
          </button>
          {stages.map((stg) => {
            const count = DEALS.filter((d) => d.stage === stg).length;
            const isSel = activeStage === stg;
            return (
              <button
                key={stg}
                type="button"
                onClick={() => setActiveStage(stg)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isSel
                    ? "bg-brand-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground bg-surface border border-border/60"
                }`}
              >
                {stg} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Deals List Feed - Vertically Stacked Content */}
      <div className="flex flex-col gap-4 w-full">
        {filteredDeals.map((d) => (
          <div key={d.id} className="glass-card flex flex-col gap-3 transition-all hover:border-brand-300 w-full">
            <div className="flex flex-col items-start gap-1.5 w-full">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{d.name}</h2>
              <div>
                <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 uppercase tracking-wider">
                  {d.stage}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{d.type}</p>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Deal Specs</p>
              <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 space-y-1 text-xs font-semibold text-foreground">
                <p>• Target Capital: <strong className="text-brand-700">{d.value}</strong></p>
                <p>• Deal Lead / Owner: <strong>{d.owner}</strong></p>
                <p>• Next Action: <strong className="text-emerald-700">{d.next}</strong></p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-border/60 w-full">
              <Link to="/deal-rooms" className="btn btn-primary btn-sm min-h-[44px] w-full justify-center">
                <span>Open Deal Room</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {filteredDeals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center text-xs text-muted-foreground">
            No active deals found in this pipeline stage.
          </div>
        ) : null}
      </div>
    </div>
  );
}