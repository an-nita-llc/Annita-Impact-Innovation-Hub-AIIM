import { CheckCircle2, Shield, Users } from "lucide-react";

const QUEUE = [
  { id: "q1", type: "Investor KYC", name: "Impact Capital Fund I", status: "Pending", sla: "4h left" },
  { id: "q2", type: "Founder KYB", name: "Solara Climate OS", status: "Pending", sla: "12h left" },
  { id: "q3", type: "Partner Verification", name: "Atlas Energy Group", status: "Approved", sla: "Done" },
  { id: "q4", type: "Content Moderation", name: "Forum Discussion #442", status: "Flagged", sla: "1h left" },
];

export default function AdminConsole() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Admin & Governance Console</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">User verification, KYC/KYB queues, feature flags, and platform uptime.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3 w-full">
        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 font-bold shrink-0">
            <Users className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">1,596</p>
            <p className="text-xs font-medium text-muted-foreground">Total Registered Users</p>
          </div>
        </div>

        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 font-bold shrink-0">
            <Shield className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">38</p>
            <p className="text-xs font-medium text-muted-foreground">Pending Verifications</p>
          </div>
        </div>

        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 font-bold shrink-0">
            <CheckCircle2 className="size-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">99.98%</p>
            <p className="text-xs font-medium text-muted-foreground">30-Day Service Uptime</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs w-full">
        {/* Mobile Feed */}
        <div className="flex flex-col divide-y divide-border/60 sm:hidden">
          {QUEUE.map((q) => (
            <div key={q.id} className="p-3.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-foreground">{q.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{q.type} • SLA: {q.sla}</p>
              </div>
              <button type="button" className="btn btn-secondary btn-sm">Review</button>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden sm:table w-full text-xs">
          <thead className="border-b border-border/80 bg-background/60 font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3.5 text-left">Queue Type</th>
              <th className="p-3.5 text-left">Entity</th>
              <th className="p-3.5 text-left">Status</th>
              <th className="p-3.5 text-left">SLA Remaining</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {QUEUE.map((q) => (
              <tr key={q.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-3.5 font-semibold text-foreground">{q.type}</td>
                <td className="p-3.5 font-bold text-foreground">{q.name}</td>
                <td className="p-3.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      q.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : q.status === "Flagged"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="p-3.5 text-muted-foreground font-mono">{q.sla}</td>
                <td className="p-3.5 text-right">
                  <button type="button" className="btn btn-secondary btn-sm">Review Queue</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}