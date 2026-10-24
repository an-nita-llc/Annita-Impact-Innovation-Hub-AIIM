import { useState } from "react";
import { CheckCircle2, Flag, Plus, Target } from "lucide-react";

type Pilot = {
  id: string;
  name: string;
  party: string;
  kpi: string;
  target: string;
  actual: string;
  status: string;
  decision: string;
  next: string;
};

const PILOTS: Pilot[] = [
  { id: "pl1", name: "Solara × Atlas Energy Pilot", party: "Solara • Atlas Energy Group", kpi: "Commercial kWh Managed", target: "500 MWh", actual: "312 MWh", status: "On track", decision: "Scale Candidate", next: "Q3 Board Review" },
  { id: "pl2", name: "MediBridge Rural Health Pilot", party: "MediBridge • HealthForward", kpi: "Patients Triaged", target: "3,000", actual: "1,420", status: "At risk", decision: "Conditional Continuation", next: "Intervention Plan" },
  { id: "pl3", name: "AgriSense Commercial Cohort", party: "AgriSense • Accelerator", kpi: "Farm Yield Lift %", target: "+12%", actual: "+9.4%", status: "On track", decision: "Proceed to Scale", next: "Term Sheet Signing" },
];

export default function Pilots() {
  const [selectedId, setSelectedId] = useState(PILOTS[0].id);
  const pilot = PILOTS.find((p) => p.id === selectedId)!;

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Pilot Management</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              3 Pilots
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Corporate pilot workspaces, KPI tracking, and go/no-go decisions.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Plus className="size-4" /> Create Pilot
        </button>
      </div>

      {/* Pilot Cards Grid */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3 w-full">
        {PILOTS.map((p) => {
          const isSelected = selectedId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`glass-card text-left transition-all active:scale-[0.99] ${
                isSelected ? "border-brand-500 ring-2 ring-brand-500/20 bg-surface" : "hover:border-brand-300"
              }`}
            >
              <h2 className="text-sm sm:text-base font-bold tracking-tight text-foreground">{p.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.party}</p>

              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-700">
                <Target className="size-4 text-brand-600 shrink-0" />
                <span>{p.kpi}: {p.actual} / {p.target}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    p.status === "On track"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {p.status}
                </span>
                <span className="font-bold text-foreground">{p.decision}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pilot Detail Panel */}
      <div className="glass-card w-full">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
          Selected Pilot Overview
        </p>
        <h2 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-foreground">{pilot.name}</h2>

        <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/80 bg-background/60 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground">Target KPI Metric</p>
            <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pilot.kpi}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-background/60 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground">Target Goal</p>
            <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pilot.target}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-background/60 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground">Actual Result</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">{pilot.actual}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-background/60 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground">Next Review</p>
            <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pilot.next}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-border/60 pt-3 gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span>Decision records stored in Institutional Memory.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button type="button" className="btn btn-primary btn-sm min-h-[44px]">Log Milestone</button>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px]">
              <Flag className="size-3.5" /> Go / No-Go Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}