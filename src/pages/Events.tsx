import { CalendarClock, MapPin, Plus, Users } from "lucide-react";

type Event = {
  id: string;
  name: string;
  kind: string;
  when: string;
  where: string;
  attending: number;
  capacity: number;
  format: string;
};

const EVENTS: Event[] = [
  { id: "e1", name: "Demo Day • Cohort 4 Pitch Presentations", kind: "Demo Day", when: "Aug 12 • 10:00 GMT", where: "Accra / Hybrid Virtual", attending: 180, capacity: 250, format: "Hybrid" },
  { id: "e2", name: "Investor–Founder Speed Matchmaking", kind: "Matchmaking", when: "Sep 4 • 09:00 GMT", where: "Virtual Rooms", attending: 60, capacity: 80, format: "Virtual" },
  { id: "e3", name: "Climate Innovation & Offtake Summit", kind: "Conference", when: "Oct 2 • Full Day", where: "Johannesburg, South Africa", attending: 420, capacity: 500, format: "In Person" },
];

export default function Events() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Ecosystem Events</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            3 Events
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Matchmaking sessions, cohort demo days, and ecosystem conferences.
        </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Plus className="size-4" /> Create Event
          </button>
        </div>
      </div>

      {/* Events List - Vertically Stacked Content */}
      <div className="flex flex-col gap-4 w-full">
        {EVENTS.map((e) => {
          const pct = Math.round((e.attending / e.capacity) * 100);
          return (
            <div key={e.id} className="glass-card flex flex-col gap-3 transition-all hover:border-brand-300">
              <div className="flex flex-col gap-1.5 w-full">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{e.name}</h2>
                <div>
                  <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 uppercase tracking-wider">
                    {e.kind}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs font-semibold text-muted-foreground w-full">
                <span className="flex items-center gap-1.5 text-foreground font-bold">
                  <CalendarClock className="size-4 text-brand-600 shrink-0" />
                  {e.when}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand-600 shrink-0" />
                  {e.where}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4 text-brand-600 shrink-0" />
                  {e.attending} / {e.capacity} RSVPs ({pct}%)
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>

              <div className="pt-2 w-full">
                <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full">
                  Register / RSVP
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}