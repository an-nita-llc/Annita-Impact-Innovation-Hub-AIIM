import { CheckCircle2, ChevronRight, Shield, ShieldAlert, Sparkles } from "lucide-react";

const GATES = [
  { id: "g1", name: "Idea Captured & De-duplicated", owner: "Submitter", sla: "Instant", status: "Complete" },
  { id: "g2", name: "Strategic Alignment & AI Scorecard", owner: "AIIM AI", sla: "Instant", status: "Complete" },
  { id: "g3", name: "Expert Committee Review", owner: "3 Reviewers", sla: "5 Days", status: "In Progress" },
  { id: "g4", name: "Diligence Data Room Audit", owner: "Advisory Panel", sla: "3 Days", status: "Pending" },
  { id: "g5", name: "Stage Gate Review (Go / No-Go)", owner: "Investment Leadership", sla: "2 Days", status: "Pending" },
  { id: "g6", name: "Pilot & Tranche Disbursement Intake", owner: "Program Operations", sla: "7 Days", status: "Pending" },
];

export default function StageGates() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-border/60 pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Stage-Gate Governance Rules</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Standardized automated governance gates, SLA monitoring, and immutable decision logs.
        </p>
      </div>

      {/* Active Pipeline Initiative Governance Status */}
      <div className="glass-card">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Gate Track</p>
            <h2 className="text-base font-bold tracking-tight text-foreground mt-0.5">Solara Climate OS • Innovation Tranche #2</h2>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800 flex items-center gap-1">
            <ShieldAlert className="size-3.5" /> Gate #3 In Review
          </span>
        </div>

        <ul className="mt-6 space-y-4">
          {GATES.map((g, i) => {
            const isDone = g.status === "Complete";
            const isInProg = g.status === "In Progress";
            return (
              <li key={g.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/50 p-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl font-bold ${
                      isDone
                        ? "bg-emerald-600 text-white shadow-xs"
                        : isInProg
                        ? "bg-amber-500 text-white shadow-xs animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="size-5" /> : <Shield className="size-4" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">{g.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Owner: {g.owner} • SLA Target: {g.sla}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isDone
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isInProg
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {g.status}
                  </span>
                  {i < GATES.length - 1 ? <ChevronRight className="size-4 text-muted-foreground" /> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}