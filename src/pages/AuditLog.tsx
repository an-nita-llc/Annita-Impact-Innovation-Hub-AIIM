import { useState } from "react";
import { Search } from "lucide-react";

type Entry = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
  time: string;
  result: "success" | "failed";
};

const ENTRIES: Entry[] = [
  { id: "a1", actor: "a.mensah@aiim.com", action: "deal.updated", resource: "Deal/Solara Climate", ip: "102.89.x.x", time: "2m ago", result: "success" },
  { id: "a2", actor: "k.ouedraogo@aiim.com", action: "permission.role_changed", resource: "User/4821", ip: "41.203.x.x", time: "1h ago", result: "success" },
  { id: "a3", actor: "system.bot", action: "webhook.failed", resource: "Webhook/crm-sync", ip: "—", time: "3h ago", result: "failed" },
  { id: "a4", actor: "investor@aiim.com", action: "document.exported", resource: "Doc/Q3-financials", ip: "196.200.x.x", time: "1d ago", result: "success" },
  { id: "a5", actor: "admin@aiim.com", action: "user.created", resource: "User/5012", ip: "102.89.x.x", time: "2d ago", result: "success" },
];

export default function AuditLog() {
  const [query, setQuery] = useState("");
  const [resultFilter, setResultFilter] = useState<"All" | "success" | "failed">("All");

  const filtered = ENTRIES.filter(
    (e) =>
      (resultFilter === "All" || e.result === resultFilter) &&
      (!query ||
        e.actor.toLowerCase().includes(query.toLowerCase()) ||
        e.action.toLowerCase().includes(query.toLowerCase()) ||
        e.resource.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Immutable Audit Log</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Tenant-scoped, append-only security logs tracking actor, action, resource, and timestamp.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actor, action, resource..."
            className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background/60 p-1">
          {(["All", "success", "failed"] as const).map((res) => (
            <button
              key={res}
              type="button"
              onClick={() => setResultFilter(res)}
              className={`flex-1 sm:flex-none rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                resultFilter === res
                  ? "bg-surface text-foreground shadow-xs border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table / Card Feed */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs w-full">
        {/* Mobile View */}
        <div className="flex flex-col divide-y divide-border/60 sm:hidden">
          {filtered.map((e) => (
            <div key={e.id} className="p-3.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-foreground truncate">{e.actor}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    e.result === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {e.result}
                </span>
              </div>
              <p className="font-mono text-[11px] text-brand-700">{e.action}</p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Resource: {e.resource}</span>
                <span>{e.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden sm:table w-full text-xs">
          <thead className="border-b border-border/80 bg-background/60 font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3.5 text-left">Actor Email</th>
              <th className="p-3.5 text-left">Action Event</th>
              <th className="p-3.5 text-left">Target Resource</th>
              <th className="p-3.5 text-left">IP Address</th>
              <th className="p-3.5 text-left">Timestamp</th>
              <th className="p-3.5 text-center">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-3.5 font-bold text-foreground">{e.actor}</td>
                <td className="p-3.5 font-mono text-[11px] text-brand-700">{e.action}</td>
                <td className="p-3.5 text-muted-foreground font-medium">{e.resource}</td>
                <td className="p-3.5 font-mono text-muted-foreground text-[11px]">{e.ip}</td>
                <td className="p-3.5 text-muted-foreground">{e.time}</td>
                <td className="p-3.5 text-center">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      e.result === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {e.result}
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