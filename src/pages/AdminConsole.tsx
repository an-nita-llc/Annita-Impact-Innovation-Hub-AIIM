import { CheckCircle2, Shield, Users } from "lucide-react";

const QUEUE = [
  { id: "q1", type: "Investor KYC", name: "Impact Fund I", status: "Pending", sla: "4h left" },
  { id: "q2", type: "Founder KYB", name: "Solara climate OS", status: "Pending", sla: "12h left" },
  { id: "q3", type: "Partner verify", name: "Atlas Energy", status: "Approved", sla: "—" },
  { id: "q4", type: "Content moderation", name: "Forum thread #442", status: "Flagged", sla: "1h left" },
];

export default function AdminConsole() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
        <p className="mt-1 text-sm text-muted-foreground">User verification, governance, feature flags, and platform health.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3">
          <Users aria-hidden="true" className="size-8 text-brand-700" />
          <div><p className="text-xl font-bold">1,596</p><p className="text-xs text-muted-foreground">Users</p></div>
        </div>
        <div className="glass-card flex items-center gap-3">
          <Shield aria-hidden="true" className="size-8 text-brand-700" />
          <div><p className="text-xl font-bold">38</p><p className="text-xs text-muted-foreground">Pending verifications</p></div>
        </div>
        <div className="glass-card flex items-center gap-3">
          <CheckCircle2 aria-hidden="true" className="size-8 text-brand-700" />
          <div><p className="text-xl font-bold">99.9%</p><p className="text-xs text-muted-foreground">Uptime (30d)</p></div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Entity</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">SLA</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {QUEUE.map((q) => (
              <tr key={q.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">{q.type}</td>
                <td className="px-4 py-3 font-medium">{q.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${q.status === "Approved" ? "bg-emerald-50 text-emerald-700" : q.status === "Flagged" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{q.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{q.sla}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-brand-700 hover:underline text-xs font-medium">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}