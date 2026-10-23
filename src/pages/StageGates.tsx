import { CheckCircle2, ChevronRight, Shield } from "lucide-react";

const GATES = [
  { id: "g1", name: "Idea captured", owner: "Submitter", sla: "—", status: "Complete" },
  { id: "g2", name: "Dedup + AI coaching", owner: "AIIM copilot", sla: "instant", status: "Complete" },
  { id: "g3", name: "Expert review", owner: "3 reviewers", sla: "5d", status: "In progress" },
  { id: "g4", name: "Strategic alignment score", owner: "System", sla: "1d", status: "Pending" },
  { id: "g5", name: "Gate review (go/no-go)", owner: "Leadership", sla: "3d", status: "Pending" },
  { id: "g6", name: "Pilot intake (scale/pivot/stop)", owner: "Program", sla: "7d", status: "Pending" },
];

export default function StageGates() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stage-Gate Governance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Standardized, automated governance rules and audit trail across the pipeline.</p>
      </div>
      <div className="glass-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current pipeline</p>
        <h2 className="mt-1 text-lg font-bold tracking-tight">Solara climate OS · innovation initiative</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {GATES.map((g, i) => (
            <li key={g.id} className="flex items-center gap-4">
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${g.status === "Complete" ? "bg-emerald-50 text-emerald-700" : g.status === "In progress" ? "bg-amber-50 text-amber-700" : "bg-muted text-muted-foreground"}`}>
                {g.status === "Complete" ? <CheckCircle2 aria-hidden="true" className="size-5" /> : <Shield aria-hidden="true" className="size-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{g.name}</p>
                <p className="text-xs text-muted-foreground">Owner: {g.owner} · SLA: {g.sla}</p>
              </div>
              <span className={`text-xs font-semibold ${g.status === "In progress" ? "text-amber-700" : "text-muted-foreground"}`}>{g.status}</span>
              {i < GATES.length - 1 ? <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" /> : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card text-sm text-muted-foreground">
        Standards: detects incomplete requirements, automates reminders to the right individuals, and keeps a record of every scorecard and go/no-go decision.
      </div>
    </div>
  );
}