import { Bell, CheckCircle2 } from "lucide-react";

const NOTIFS = [
  { id: "n1", title: "New match: Northstar Ventures", body: "Deal score 87 — sector, stage, and check size aligned.", time: "2m ago", unread: true },
  { id: "n2", title: "Deal room updated", body: "Solara shared 3 new financial docs.", time: "1h ago", unread: true },
  { id: "n3", title: "Program application", body: "Founders Lab Africa — 24 new applications.", time: "3h ago", unread: false },
  { id: "n4", title: "Event reminder", body: "Investor–Founder matchmaking in 2 weeks.", time: "1d ago", unread: false },
];

export default function Notifications() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time alerts and activity updates.</p>
        </div>
        <button type="button" className="btn btn-secondary btn-sm">Mark all read</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {NOTIFS.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 border-b border-border px-4 py-4 last:border-0 ${n.unread ? "bg-brand-50/40" : ""}`}>
            <span className={`mt-1 flex size-9 items-center justify-center rounded-full ${n.unread ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground"}`}>
              <Bell aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{n.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
            </div>
            {n.unread ? <span className="mt-1 size-2 rounded-full bg-brand-600" /> : <CheckCircle2 aria-hidden="true" className="mt-1 size-4 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  );
}