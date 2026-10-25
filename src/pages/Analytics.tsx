import { BarChart3, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

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
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Analytics & Funnel Performance</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            📊 Platform Benchmarks
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Platform health metrics, deal funnel conversion rates, and portfolio KPI benchmarks.
        </p>
      </div>

      {/* KPI Summary Cards Grid - Vertically Stacked Content */}
      <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {KPIS.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="glass-card flex flex-col gap-2.5 p-4 w-full">
              <div className="flex items-center justify-between">
                <span className={`flex size-10 items-center justify-center rounded-xl ${k.color} shadow-xs font-bold`}>
                  <Icon className="size-5" />
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {k.delta}
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">{k.value}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Funnel Conversion Container - Vertically Stacked Items */}
      <div className="glass-card flex flex-col gap-4 w-full">
        <div className="border-b border-border/60 pb-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
            Deal Pipeline Funnel Conversion
          </h2>
        </div>

        <ul className="space-y-3.5 text-xs w-full">
          {FUNNEL.map((f) => (
            <li key={f.label} className="flex flex-col gap-1.5 w-full rounded-xl border border-border/60 bg-background/60 p-3">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>{f.label} Stage</span>
                <span className="text-brand-700">{f.value} Deals ({f.pct}%)</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${f.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Intelligence Brief Card */}
      <div className="glass-card bg-brand-50/70 border-brand-200 p-4 sm:p-5 flex flex-col gap-2.5 w-full">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-brand-600 text-white font-bold shrink-0 shadow-xs">
            <Sparkles className="size-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-extrabold text-foreground">AI Intelligence Summary</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Gemini automated analytics detected a 22% increase in Seed-stage climate tech matches this month. Response rates from energy-focused investors are 3.4x higher when data room NDA execution is automated.
        </p>
      </div>
    </div>
  );
}