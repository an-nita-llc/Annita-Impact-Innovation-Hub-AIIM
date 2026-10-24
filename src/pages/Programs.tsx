import {
  CalendarClock,
  Plus,
  Rocket,
} from "lucide-react";

type Program = {
  id: string;
  name: string;
  type: string;
  cohort: string;
  mentors: number;
  founders: number;
  next: string;
  status: string;
};

const PROGRAMS: Program[] = [
  { id: "pr1", name: "Founders Lab West Africa", type: "Accelerator Program", cohort: "Cohort 4 • Currently Running", mentors: 18, founders: 24, next: "Demo Day • Aug 12", status: "Active" },
  { id: "pr2", name: "Climate Venture Studio", type: "Studio Co-creation", cohort: "Concept → First Customer", mentors: 9, founders: 6, next: "Prototyping Sprint Review", status: "Active" },
  { id: "pr3", name: "Women in Impact Tech", type: "Mentorship Track", cohort: "6-Month Cohort Track", mentors: 22, founders: 30, next: "Applications Close Next Week", status: "Open Call" },
];

export default function Programs() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Innovation Programs</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              3 Active Cohorts
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Accelerators, venture studios, university innovation labs, and mentorship cohorts.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Plus className="size-4" /> Create Program
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p) => (
          <div key={p.id} className="glass-card flex flex-col justify-between transition-all hover:border-brand-300">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-600 text-white font-extrabold text-sm shadow-xs shrink-0">
                  <Rocket className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold tracking-tight text-foreground leading-tight">{p.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.type}</p>
                </div>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 shrink-0">
                  {p.status}
                </span>
              </div>

              <p className="mt-3 text-xs font-semibold text-foreground bg-muted/60 p-2.5 rounded-xl">
                {p.cohort}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-border/80 bg-background p-3 text-center">
                  <p className="text-lg font-extrabold text-foreground">{p.founders}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">Founders</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background p-3 text-center">
                  <p className="text-lg font-extrabold text-foreground">{p.mentors}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">Mentors</p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-border/60 pt-3 flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5 text-brand-700 font-bold">
                <CalendarClock className="size-4" />
                <span>{p.next}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}