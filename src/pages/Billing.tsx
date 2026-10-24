import { CreditCard, Zap } from "lucide-react";

const INVOICES = [
  { id: "inv1", date: "Jul 2026", plan: "Enterprise Tier (Annual)", amount: "$12,000", status: "Paid" },
  { id: "inv2", date: "Jun 2026", plan: "Addon: Gemini AI Tokens", amount: "$420", status: "Paid" },
  { id: "inv3", date: "May 2026", plan: "Enterprise Tier (Annual)", amount: "$12,000", status: "Paid" },
];

export default function Billing() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Billing & Usage Metering</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Enterprise subscription plans, token usage metering, and invoice archives.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3 w-full">
        <div className="glass-card p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Active Plan</p>
          <p className="mt-1 text-lg sm:text-xl font-extrabold text-foreground">Enterprise Tier</p>
          <p className="mt-0.5 text-xs text-muted-foreground">$12,000 / yr • Annual Contract</p>
        </div>

        <div className="glass-card p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Token Metering</p>
          <p className="mt-1 text-lg sm:text-xl font-extrabold text-brand-700">41.2M Tokens</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Used of 100M monthly quota</p>
        </div>

        <div className="glass-card p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Licensed Seats</p>
          <p className="mt-1 text-lg sm:text-xl font-extrabold text-foreground">14 Active Seats</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Of 25 licensed user seats</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs w-full">
        {/* Mobile View */}
        <div className="flex flex-col divide-y divide-border/60 sm:hidden">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="p-3.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-foreground">{inv.plan}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{inv.date} • {inv.amount}</p>
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[9px] font-bold uppercase">
                {inv.status}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <table className="hidden sm:table w-full text-xs">
          <thead className="border-b border-border/80 bg-background/60 font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3.5 text-left">Invoice Date</th>
              <th className="p-3.5 text-left">Plan / Addon Description</th>
              <th className="p-3.5 text-right">Amount</th>
              <th className="p-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-3.5 font-semibold text-foreground">{inv.date}</td>
                <td className="p-3.5 font-bold text-foreground">{inv.plan}</td>
                <td className="p-3.5 text-right font-extrabold text-foreground">{inv.amount}</td>
                <td className="p-3.5 text-center">
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {inv.status}
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