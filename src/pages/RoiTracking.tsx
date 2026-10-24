import { DollarSign, TrendingUp } from "lucide-react";

const ROWS = [
  { name: "Solara × Atlas Energy Pilot", budget: 250000, spent: 180000, roi: 2.4, status: "On track" },
  { name: "MediBridge Rural Health Network", budget: 120000, spent: 95000, roi: 1.1, status: "At risk" },
  { name: "AgriSense Soil Analytics Cohort 2", budget: 80000, spent: 72000, roi: 1.8, status: "On track" },
  { name: "Founders Lab West Africa Program", budget: 300000, spent: 260000, roi: 3.1, status: "On track" },
];

export default function RoiTracking() {
  const totalBudget = ROWS.reduce((a, b) => a + b.budget, 0);
  const totalSpent = ROWS.reduce((a, b) => a + b.spent, 0);
  const avgRoi = (ROWS.reduce((a, b) => a + b.roi, 0) / ROWS.length).toFixed(1);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">ROI & FP&A Financial Tracking</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Budget vs. actual spend, milestone-gated tranche disbursements, and probability-weighted returns.
        </p>
      </div>

      {/* Summary Financial Cards */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3 w-full">
        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 font-bold shrink-0">
            <DollarSign className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">${(totalBudget / 1e6).toFixed(2)}M</p>
            <p className="text-xs font-medium text-muted-foreground">Portfolio Budget Allocated</p>
          </div>
        </div>

        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-700 font-bold shrink-0">
            <DollarSign className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">${(totalSpent / 1e6).toFixed(2)}M</p>
            <p className="text-xs font-medium text-muted-foreground">Disbursed Spend to Date</p>
          </div>
        </div>

        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 font-bold shrink-0">
            <TrendingUp className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">{avgRoi}x</p>
            <p className="text-xs font-medium text-muted-foreground">Weighted Return Multiple</p>
          </div>
        </div>
      </div>

      {/* Initiative Breakdown - Desktop Table / Mobile Card Feed */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs w-full">
        {/* Mobile Card Feed View */}
        <div className="flex flex-col divide-y divide-border/60 sm:hidden">
          {ROWS.map((r) => (
            <div key={r.name} className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-foreground">{r.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    r.status === "On track"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>Budget: <strong className="text-foreground">${(r.budget / 1000).toFixed(0)}K</strong></span>
                <span>Disbursed: <strong className="text-foreground">${(r.spent / 1000).toFixed(0)}K</strong></span>
                <span>ROI: <strong className="text-brand-700 font-extrabold">{r.roi}x</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden sm:table w-full text-xs">
          <thead className="border-b border-border/80 bg-background/60 font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3.5 text-left">Initiative / Project</th>
              <th className="p-3.5 text-right">Budget</th>
              <th className="p-3.5 text-right">Disbursed</th>
              <th className="p-3.5 text-right">Current ROI</th>
              <th className="p-3.5 text-center">Milestone Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {ROWS.map((r) => (
              <tr key={r.name} className="hover:bg-muted/40 transition-colors">
                <td className="p-3.5 font-bold text-foreground">{r.name}</td>
                <td className="p-3.5 text-right font-medium text-foreground">${(r.budget / 1000).toFixed(0)}K</td>
                <td className="p-3.5 text-right font-medium text-foreground">${(r.spent / 1000).toFixed(0)}K</td>
                <td className="p-3.5 text-right font-extrabold text-brand-700">{r.roi}x</td>
                <td className="p-3.5 text-center">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      r.status === "On track"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}