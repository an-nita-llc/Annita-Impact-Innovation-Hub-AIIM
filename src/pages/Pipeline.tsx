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
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Deal & Pilot Pipeline</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              $2.02M
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Track funding rounds, pitch reviews, due diligence, and pilot approvals.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Plus className="size-4" /> New Deal Entry
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search deals, startups, owners..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
        />
      </div>

      {/* Kanban Columns with Touch Snap Horizontal Scroll */}
      <div className="flex gap-3.5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
        {byStage.map((col) => (
          <section
            key={col.stage}
            className="snap-center min-w-[85vw] sm:min-w-[280px] flex-1 rounded-2xl border border-border/80 bg-background/50 p-3.5 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-foreground">{col.stage}</h2>
                <span className="flex size-5 items-center justify-center rounded-full bg-surface border border-border/80 text-[10px] font-bold text-muted-foreground">
                  {col.deals.length}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="flex flex-col gap-2.5">
                {col.deals.map((d) => (
                  <Link
                    key={d.id}
                    to="/deal-rooms"
                    className="group rounded-xl border border-border/80 bg-surface p-3 shadow-xs transition-all hover:border-brand-400 active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-foreground group-hover:text-brand-700 transition-colors">
                        {d.name}
                      </p>
                      <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-800 shrink-0">
                        {d.value}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] font-medium text-muted-foreground">{d.type}</p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[10px]">
                      <span className="flex items-center gap-1 text-muted-foreground font-medium">
                        <Users className="size-3" />
                        <span>{d.owner}</span>
                      </span>
                      <span className="flex items-center text-brand-700 font-bold">
                        <span>Details</span>
                        <ChevronRight className="size-3" />
                      </span>
                    </div>

                    <div className="mt-2 rounded-lg bg-muted/60 px-2 py-1 text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="size-3 text-brand-600 shrink-0" />
                      <span className="truncate">Next: {d.next}</span>
                    </div>
                  </Link>
                ))}

                {col.deals.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/80 p-5 text-center text-xs text-muted-foreground">
                    No deals in {col.stage}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}