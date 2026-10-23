import { Medal, Users } from "lucide-react";

type Challenge = { id: string; title: string; sponsor: string; deadline: string; submissions: number; prize: string; status: string };

const CHALLENGES: Challenge[] = [
  { id: "ch1", title: "AI for rural credit scoring", sponsor: "Impact Fund + FinTech partner", deadline: "Aug 15", submissions: 42, prize: "$25K + pilot", status: "Open" },
  { id: "ch2", title: "Cold-chain optimization for vaccines", sponsor: "HealthForward Foundation", deadline: "Jul 30", submissions: 19, prize: "$15K + grant", status: "Open" },
  { id: "ch3", title: "Grid resilience tech", sponsor: "Atlas Energy", deadline: "Closed", submissions: 61, prize: "Pilot contract", status: "Closed" },
];

export default function OpenInnovation() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Open Innovation</h1>
          <p className="mt-1 text-sm text-muted-foreground">External challenges, RFI workflows, and startup engagement programs.</p>
        </div>
        <button type="button" className="btn btn-primary">Post challenge</button>
      </div>
      <div className="flex flex-col gap-4">
        {CHALLENGES.map((c) => (
          <div key={c.id} className="glass-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold tracking-tight">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">Sponsor: {c.sponsor}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Users aria-hidden="true" className="size-4 text-brand-700" /> {c.submissions} submissions</span>
                  <span>Deadline: {c.deadline}</span>
                  <span>Prize: {c.prize}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "Open" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{c.status}</span>
                <button type="button" className="btn btn-secondary btn-sm">
                  <Medal aria-hidden="true" className="size-4" /> Manage RFI
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}