import { useState } from "react";
import { CheckCircle2, Flag, Target } from "lucide-react";

type Pilot = { id: string; name: string; party: string; kpi: string; target: string; actual: string; status: string; decision: string; next: string };

const PILOTS: Pilot[] = [
  { id: "pl1", name: "Solara × Atlas Energy", party: "Solara · Atlas Energy", kpi: "kWh managed", target: "500 MWh", actual: "312 MWh", status: "On track", decision: "Scale candidate", next: "Q3 review" },
  { id: "pl2", name: "MediBridge rural clinics", party: "MediBridge · HealthForward", kpi: "Patients triaged", target: "3,000", actual: "1,420", status: "At risk", decision: "Continue w/ conditions", next: "Intervention plan" },
  { id: "pl3", name: "AgriSense cohort 2", party: "AgriSense · Accelerator", kpi: "Farm yield lift", target: "+12%", actual: "+9.4%", status: "On track", decision: "Proceed to scale", next: "Term sheet" },
];

export default function Pilots() {
  const [selected, setSelected] = useState(PILOTS[0].id);
  const pilot = PILOTS.find((p) => p.id === selected)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pilot Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pilot workspaces with KPIs, decision dates, and go/no-go tracking.</p>
        </div>
        <button type="button" className="btn btn-primary">New pilot</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PILOTS.map((p) => (
          <button key={p.id} type="button" onClick={() => setSelected(p.id)} className={`glass-card text-left transition ${selected === p.id ? "border-brand-500 ring-2 ring-brand-500/20" : ""}`}>
            <p className="text-base font-semibold tracking-tight">{p.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.party}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Target aria-hidden="true" className="size-4 text-brand-700" /> {p.kpi}: {p.actual} / {p.target}</div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className={`rounded-full px-2 py-0.5 font-medium ${p.status === "On track" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status}</span>
              <span className="font-medium text-brand-700">{p.decision}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="glass-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected pilot</p>
        <h2 className="mt-1 text-lg font-bold tracking-tight">{pilot.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="KPI" value={pilot.kpi} />
          <Metric label="Target" value={pilot.target} />
          <Metric label="Actual" value={pilot.actual} />
          <Metric label="Next review" value={pilot.next} />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 aria-hidden="true" className="size-4 text-brand-700" />
          Decision record stored in institutional memory.
        </div>
        <div className="mt-4 flex gap-2">
          <button type="button" className="btn btn-primary btn-sm">Log milestone</button>
          <button type="button" className="btn btn-secondary btn-sm"><Flag aria-hidden="true" className="size-4" /> Go / no-go</button>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}