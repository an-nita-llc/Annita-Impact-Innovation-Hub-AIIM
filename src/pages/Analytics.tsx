import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";

const KPIS = [
  { label: "Active Founders", value: "1,284", delta: "+12% MoM", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Active Investors", value: "312", delta: "+5% MoM", icon: Users, color: "text-purple-600 bg-purple-50" },
  { label: "AI Matches Generated", value: "4,890", delta: "+22% MoM", icon: Zap, color: "text-amber-600 bg-amber-50" },
  { label: "Deals Closed", value: "37", delta: "+9% MoM", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
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
      <div className="border-b border-border/60 pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Analytics & Funnel Performance</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Platform health metrics, deal funnel conversion rates, and portfolio KPI benchmarks.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="glass-card flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className={`flex size-11 items-center justify-center rounded-2xl ${k.color} shadow-xs font-bold`}>
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xl font-black tracking-tight text-foreground">{k.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {k.delta}
              </span>
            </div>
          );
        })}
      </div>

      {/* Funnel Visual Container */}
      <div className="glass-card">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-3">
          Deal Pipeline Funnel Conversion
        </h2>
        <ul className="mt-5 space-y-4">
          {FUNNEL.map((f) => (
            <li key={f.label} className="flex items-center gap-4 text-xs font-semibold">
              <span className="w-24 text-muted-foreground">{f.label}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${f.pct}%` }} />
              </div>
              <span className="w-16 text-right font-bold text-foreground">{f.value} deals</span>
              <span className="w-12 text-right text-muted-foreground font-mono">{f.pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Intelligence Card */}
      <div className="glass-card bg-brand-50/50 border-brand-200 p-5 flex items-center gap-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-600 text-white font-bold shrink-0">
          <BarChart3 className="size-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">AI Intelligence Weekly Summary</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Gemini automated analytics detected a 22% increase in Seed-stage climate tech matches this month. Response rates from energy-focused investors are 3.4x higher when data room NDA execution is automated.
          </p>
        </div>
      </div>
    </div>
  );
}