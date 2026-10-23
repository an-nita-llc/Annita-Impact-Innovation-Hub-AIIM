import { CalendarClock, Rocket, Users } from "lucide-react";

type Program = { id: string; name: string; type: string; cohort: string; mentors: number; founders: number; next: string; status: string };

const PROGRAMS: Program[] = [
  { id: "pr1", name: "Founders Lab Africa", type: "Accelerator", cohort: "Cohort 4 · running", mentors: 18, founders: 24, next: "Demo Day · Aug 12", status: "Active" },
  { id: "pr2", name: "Climate Venture Studio", type: "Venture studio", cohort: "Concept → first customer", mentors: 9, founders: 6, next: "Prototyping sprint", status: "Active" },
  { id: "pr3", name: "Women in Impact Tech", type: "Mentorship", cohort: "6-month track", mentors: 22, founders: 30, next: "Applications close", status: "Applying" },
];

export default function Programs() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Programs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Accelerators, cohorts, mentorship, and demo days.</p>
        </div>
        <button type="button" className="btn btn-primary">New program</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p) => (
          <div key={p.id} className="glass-card">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Rocket aria-hidden="true" className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold tracking-tight">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.type}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{p.status}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.cohort}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-muted px-3 py-2"><p className="font-semibold">{p.founders}</p><p className="text-muted-foreground">Founders</p></div>
              <div className="rounded-lg bg-muted px-3 py-2"><p className="font-semibold">{p.mentors}</p><p className="text-muted-foreground">Mentors</p></div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock aria-hidden="true" className="size-4 text-brand-700" /> {p.next}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}