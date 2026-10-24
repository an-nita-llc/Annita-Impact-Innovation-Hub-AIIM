import { Bell, CheckCircle2, Sparkles } from "lucide-react";

const NOTIFS = [
  { id: "n1", title: "New Match: Northstar Ventures", body: "Match score 87% — sector, stage, and check size aligned.", time: "2m ago", unread: true, category: "Deal Flow" },
  { id: "n2", title: "Deal Room Updated", body: "Solara Climate OS uploaded 3 new diligence files.", time: "1h ago", unread: true, category: "Deal Room" },
  { id: "n3", title: "Program Applications Received", body: "Founders Lab West Africa received 24 new founder submissions.", time: "3h ago", unread: false, category: "Programs" },
  { id: "n4", title: "Event Reminder", body: "Speed matchmaking event starts in 2 weeks.", time: "1d ago", unread: false, category: "Events" },
];

export default function Notifications() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Notifications & Activity</h1>
          <p className="mt-1 text-xs text-muted-foreground">Real-time platform alerts, deal room updates, and AI matches.</p>
        </div>
        <button type="button" className="btn btn-secondary btn-sm">Mark All as Read</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs divide-y divide-border/60">
        {NOTIFS.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-4 transition-colors ${
              n.unread ? "bg-brand-50/40" : "hover:bg-muted/40"
            }`}
          >
            <span
              className={`flex size-10 items-center justify-center rounded-xl shrink-0 ${
                n.unread ? "bg-brand-600 text-white shadow-xs" : "bg-muted text-muted-foreground"
              }`}
            >
              <Bell className="size-4" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-foreground">{n.title}</p>
                <span className="rounded-full bg-muted border border-border/80 px-2 py-0.2 text-[9px] font-bold text-muted-foreground uppercase">
                  {n.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">{n.body}</p>
              <p className="mt-1.5 text-[10px] font-semibold text-muted-foreground">{n.time}</p>
            </div>

            {n.unread ? (
              <span className="size-2.5 rounded-full bg-brand-600 shrink-0 mt-2" />
            ) : (
              <CheckCircle2 className="size-4 text-muted-foreground shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}