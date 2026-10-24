import { CalendarClock, Plus, Rocket } from "lucide-react";

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
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Innovation Programs</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            3 Active Cohorts
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Accelerators, venture studios, university innovation labs, and mentorship cohorts.
        </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Plus className="size-4" /> Create Program
          </button>
        </div>
      </div>

      {/* Program Cards Grid - Vertically Stacked Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {PROGRAMS.map((p) => (
          <div key={p.id} className="glass-card flex flex-col justify-between gap-4 transition-all hover:border-brand-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-600 text-white font-extrabold text-sm shadow-xs shrink-0">
                  <Rocket className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold tracking-tight text-foreground leading-tight">{p.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.type}</p>
                </div>
              </div>

              <div>
                <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                  {p.status}
                </span>
              </div>

              <p className="text-xs font-semibold text-foreground bg-muted/60 p-2.5 rounded-xl">
                {p.cohort}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-border/80 bg-background p-2.5 text-center">
                  <p className="text-lg font-extrabold text-foreground">{p.founders}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">Founders</p>
                </div>
                <div className="rounded-xl border border-border/80 bg-background p-2.5 text-center">
                  <p className="text-lg font-extrabold text-foreground">{p.mentors}</p>
                  <p className="text-[10px] font-medium text-muted-foreground">Mentors</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 text-xs font-semibold text-muted-foreground">
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