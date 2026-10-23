import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";

const KPIS = [
  { label: "Active founders", value: "1,284", delta: "+12%", icon: Users },
  { label: "Active investors", value: "312", delta: "+5%", icon: Users },
  { label: "Matches this month", value: "4,890", delta: "+22%", icon: Zap },
  { label: "Deals closed", value: "37", delta: "+9%", icon: TrendingUp },
];

const FUNNEL = [
  { label: "Sourced", value: 1240, pct: 100 },
  { label: "Screened", value: 612, pct: 49 },
  { label: "Meeting", value: 208, pct: 17 },
  { label: "Diligence", value: 74, pct: 6 },
  { label: "Closed", value: 37, pct: 3 },
];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform, portfolio, and deal funnel analytics.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="glass-card">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon aria-hidden="true" className="size-5" /></span>
                <div>
                  <p className="text-xl font-bold tracking-tight">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </div>
                <span className="ml-auto text-xs font-semibold text-emerald-600">{k.delta}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="glass-card">
        <h2 className="text-sm font-semibold tracking-tight">Deal funnel</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {FUNNEL.map((f) => (
            <li key={f.label} className="flex items-center gap-4">
              <span className="w-24 text-xs text-muted-foreground">{f.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${f.pct}%` }} />
              </div>
              <span className="w-12 text-right text-sm font-medium">{f.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card flex items-center gap-3">
        <BarChart3 aria-hidden="true" className="size-8 text-brand-700" />
        <div>
          <p className="text-sm font-semibold">AI insights</p>
          <p className="text-xs text-muted-foreground">Gemini surfaces conversion bottlenecks, investor response patterns, and founder churn risk weekly.</p>
        </div>
      </div>
    </div>
  );
}