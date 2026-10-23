import { DollarSign, TrendingUp } from "lucide-react";

const ROWS = [
  { name: "Solara × Atlas pilot", budget: 250000, spent: 180000, roi: 2.4, status: "On track" },
  { name: "MediBridge rural clinics", budget: 120000, spent: 95000, roi: 1.1, status: "At risk" },
  { name: "AgriSense cohort 2", budget: 80000, spent: 72000, roi: 1.8, status: "On track" },
  { name: "Founders Lab Africa", budget: 300000, spent: 260000, roi: 3.1, status: "On track" },
];

export default function RoiTracking() {
  const totalBudget = ROWS.reduce((a, b) => a + b.budget, 0);
  const totalSpent = ROWS.reduce((a, b) => a + b.spent, 0);
  const avgRoi = (ROWS.reduce((a, b) => a + b.roi, 0) / ROWS.length).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ROI & FP&A</h1>
        <p className="mt-1 text-sm text-muted-foreground">Budget vs. spend, probability-weighted risk, milestone-gated funding.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3"><DollarSign aria-hidden="true" className="size-8 text-brand-700" /><div><p className="text-xl font-bold">${(totalBudget / 1e6).toFixed(2)}M</p><p className="text-xs text-muted-foreground">Portfolio budget</p></div></div>
        <div className="glass-card flex items-center gap-3"><DollarSign aria-hidden="true" className="size-8 text-brand-700" /><div><p className="text-xl font-bold">${(totalSpent / 1e6).toFixed(2)}M</p><p className="text-xs text-muted-foreground">Spent to date</p></div></div>
        <div className="glass-card flex items-center gap-3"><TrendingUp aria-hidden="true" className="size-8 text-brand-700" /><div><p className="text-xl font-bold">{avgRoi}x</p><p className="text-xs text-muted-foreground">Avg ROI</p></div></div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Initiative</th>
              <th className="px-4 py-3 text-right">Budget</th>
              <th className="px-4 py-3 text-right">Spent</th>
              <th className="px-4 py-3 text-right">ROI</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-right">${(r.budget / 1000).toFixed(0)}K</td>
                <td className="px-4 py-3 text-right">${(r.spent / 1000).toFixed(0)}K</td>
                <td className="px-4 py-3 text-right font-medium text-brand-700">{r.roi}x</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.status === "On track" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="glass-card text-sm text-muted-foreground">
        Milestone-gated funding: if a team misses required deliverables at a gate, funding is withheld automatically until performance metrics are met.
      </div>
    </div>
  );
}