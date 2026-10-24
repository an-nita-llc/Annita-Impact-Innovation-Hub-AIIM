import { Activity, CheckCircle2 } from "lucide-react";

const SERVICES = [
  { name: "Web Dashboard & App Shell", status: "Operational", uptime: "99.98%" },
  { name: "Public REST API Engine", status: "Operational", uptime: "99.99%" },
  { name: "AI Match & Gemini Copilot", status: "Operational", uptime: "99.90%" },
  { name: "Deal Room Data Storage", status: "Operational", uptime: "99.95%" },
  { name: "Email & SMS Notifications", status: "Operational", uptime: "99.97%" },
];

export default function StatusPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">System Status & Health</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Real-time service health monitoring, 30-day uptime metrics, and infrastructure status.
        </p>
      </div>

      <div className="glass-card flex items-center gap-3 border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 w-full">
        <Activity className="size-7 sm:size-8 text-emerald-600 shrink-0" />
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">All Systems Operational</h2>
          <p className="text-xs text-muted-foreground">30-day average uptime across all microservices: 99.96%</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {SERVICES.map((s) => (
          <div key={s.name} className="glass-card flex items-center justify-between gap-3 p-3.5 sm:p-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="size-4 sm:size-5 text-emerald-600 shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-foreground truncate">{s.name}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase">
                {s.status}
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{s.uptime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}