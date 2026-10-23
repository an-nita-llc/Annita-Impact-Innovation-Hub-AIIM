import { CalendarClock, MapPin, Users } from "lucide-react";

type Event = { id: string; name: string; kind: string; when: string; where: string; attending: number; capacity: number; format: string };

const EVENTS: Event[] = [
  { id: "e1", name: "Demo Day · Cohort 4", kind: "Demo Day", when: "Aug 12 · 10:00", where: "Accra / Virtual", attending: 180, capacity: 250, format: "Hybrid" },
  { id: "e2", name: "Investor–Founder Matchmaking", kind: "Matchmaking", when: "Sep 4 · 09:00", where: "Virtual", attending: 60, capacity: 80, format: "Virtual" },
  { id: "e3", name: "Climate Innovation Summit", kind: "Conference", when: "Oct 2", where: "Johannesburg", attending: 420, capacity: 500, format: "In person" },
];

export default function Events() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">Matchmaking, conferences, and invite‑only sessions with capacity caps.</p>
        </div>
        <button type="button" className="btn btn-primary">Create event</button>
      </div>
      <div className="flex flex-col gap-4">
        {EVENTS.map((e) => (
          <div key={e.id} className="glass-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold tracking-tight">{e.name}</p>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">{e.kind}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CalendarClock aria-hidden="true" className="size-4 text-brand-700" />{e.when}</span>
                  <span className="flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4 text-brand-700" />{e.where} · {e.format}</span>
                  <span className="flex items-center gap-1.5"><Users aria-hidden="true" className="size-4 text-brand-700" />{e.attending}/{e.capacity} attending</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${Math.round((e.attending / e.capacity) * 100)}%` }} />
                </div>
              </div>
              <button type="button" className="btn btn-secondary btn-sm">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}