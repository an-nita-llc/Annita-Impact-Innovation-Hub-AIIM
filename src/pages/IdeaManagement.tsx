import { useState } from "react";
import { CheckCircle2, Lightbulb, Sparkles, Target } from "lucide-react";

type Idea = { id: string; title: string; submitter: string; alignment: number; status: string; eval: string; duplicates: number };

const IDEAS: Idea[] = [
  { id: "i1", title: "AI-assisted onboarding coach for founders", submitter: "A. Mensah", alignment: 92, status: "In review", eval: "Routed to evaluation", duplicates: 1 },
  { id: "i2", title: "Auto-generated SAFE term sheet", submitter: "K. Ouedraogo", alignment: 88, status: "Approved", eval: "Advanced to pilot", duplicates: 0 },
  { id: "i3", title: "Founder matching via embeddings", submitter: "Community", alignment: 71, status: "Needs more info", eval: "Returned", duplicates: 3 },
  { id: "i4", title: "Offline-first PWA for rural founders", submitter: "Field team", alignment: 84, status: "Draft", eval: "Not submitted", duplicates: 0 },
];

export default function IdeaManagement() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(IDEAS[0].id);
  const filtered = IDEAS.filter((i) => !query || i.title.toLowerCase().includes(query.toLowerCase()));
  const idea = IDEAS.find((i) => i.id === open)!;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Idea Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Capture, deduplicate, score strategic alignment, route to evaluation.</p>
        </div>
        <button type="button" className="btn btn-primary"><Lightbulb aria-hidden="true" className="size-4" /> Submit idea</button>
      </div>
      <div className="relative max-w-sm">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ideas…" className="min-h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-3">
          {filtered.map((i) => (
            <button key={i.id} type="button" onClick={() => setOpen(i.id)} className={`glass-card text-left transition ${open === i.id ? "border-brand-500 ring-2 ring-brand-500/20" : ""}`}>
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Lightbulb aria-hidden="true" className="size-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{i.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">by {i.submitter} · alignment {i.alignment}%</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{i.status}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="glass-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected idea</p>
          <h2 className="mt-1 text-base font-bold tracking-tight">{idea.title}</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Row label="Strategic alignment" value={`${idea.alignment}%`} />
            <Row label="Duplicates detected" value={idea.duplicates} />
            <Row label="Evaluation status" value={idea.eval} />
            <Row label="Routing" value="Expert review → stage gate" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-4 text-brand-700" /> AI coaches submitters, detects duplicates, surfaces prior submissions.
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn btn-primary btn-sm"><Target aria-hidden="true" className="size-4" /> Route to eval</button>
            <button type="button" className="btn btn-secondary btn-sm"><CheckCircle2 aria-hidden="true" className="size-4" /> Merge duplicates</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}