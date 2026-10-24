import { Medal, Plus, Users } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  sponsor: string;
  deadline: string;
  submissions: number;
  prize: string;
  status: string;
};

const CHALLENGES: Challenge[] = [
  { id: "ch1", title: "AI for Rural Micro-credit Scoring", sponsor: "Impact Capital + FinTech Partner", deadline: "Aug 15", submissions: 42, prize: "$25K Grant + Pilot", status: "Open" },
  { id: "ch2", title: "Cold-chain Optimization for Vaccine Storage", sponsor: "HealthForward Foundation", deadline: "Jul 30", submissions: 19, prize: "$15K Grant", status: "Open" },
  { id: "ch3", title: "Grid Resilience & Distributed Battery Tech", sponsor: "Atlas Energy Group", deadline: "Closed", submissions: 61, prize: "Pilot Contract", status: "Closed" },
];

export default function OpenInnovation() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Open Innovation</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700">
              3 Active Challenges
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            External corporate challenges, RFI submission workflows, and startup engagement programs.
          </p>
        </div>
        <button type="button" className="btn btn-primary">
          <Plus className="size-4" /> Post Challenge
        </button>
      </div>

      {/* Challenge Cards List */}
      <div className="flex flex-col gap-4">
        {CHALLENGES.map((c) => (
          <div key={c.id} className="glass-card transition-all hover:border-brand-300">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-bold tracking-tight text-foreground">{c.title}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      c.status === "Open"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground font-medium">Sponsor: <span className="text-foreground font-bold">{c.sponsor}</span></p>

                <div className="mt-3.5 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Users className="size-4 text-brand-600" />
                    {c.submissions} Submissions
                  </span>
                  <span>Deadline: <strong className="text-foreground">{c.deadline}</strong></span>
                  <span>Prize Pool: <strong className="text-emerald-700">{c.prize}</strong></span>
                </div>
              </div>

              <button type="button" className="btn btn-secondary btn-sm shrink-0">
                <Medal className="size-3.5" /> Manage RFI Submissions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}