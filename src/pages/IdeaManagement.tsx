import { useState } from "react";
import { CheckCircle2, Lightbulb, Sparkles, Target } from "lucide-react";

type Idea = {
  id: string;
  title: string;
  submitter: string;
  alignment: number;
  status: string;
  eval: string;
  duplicates: number;
};

const IDEAS: Idea[] = [
  { id: "i1", title: "AI-assisted onboarding coach for early-stage founders", submitter: "A. Mensah", alignment: 92, status: "In Review", eval: "Routed to Evaluation", duplicates: 1 },
  { id: "i2", title: "Auto-generated SAFE term sheet generator", submitter: "K. Ouedraogo", alignment: 88, status: "Approved", eval: "Advanced to Pilot", duplicates: 0 },
  { id: "i3", title: "Founder matching via vector embeddings", submitter: "Community", alignment: 71, status: "Needs Info", eval: "Returned for Edits", duplicates: 3 },
  { id: "i4", title: "Offline-first PWA for rural agricultural founders", submitter: "Field Team", alignment: 84, status: "Draft", eval: "Not Submitted", duplicates: 0 },
];

export default function IdeaManagement() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(IDEAS[0].id);

  const filtered = IDEAS.filter((i) => !query || i.title.toLowerCase().includes(query.toLowerCase()));
  const idea = IDEAS.find((i) => i.id === selectedId)!;

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Idea Management</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              Deduplication Active
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Capture innovation ideas, score strategic alignment, and route to stage gate review.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Lightbulb className="size-4" /> Submit Idea
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-4 w-full">
        {/* List of Ideas */}
        <div className="flex flex-col gap-2.5 w-full">
          {filtered.map((i) => {
            const isSel = selectedId === i.id;
            return (
              <button
                key={i.id}
                type="button"
                onClick={() => setSelectedId(i.id)}
                className={`glass-card text-left transition-all active:scale-[0.99] ${
                  isSel ? "border-brand-500 ring-2 ring-brand-500/20 bg-surface" : "hover:border-brand-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 mt-0.5">
                    <Lightbulb className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">{i.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      By <span className="font-semibold text-foreground">{i.submitter}</span> • Alignment {i.alignment}%
                    </p>
                  </div>
                  <span className="rounded-full bg-muted border border-border/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground shrink-0">
                    {i.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Idea Detail Panel */}
        <div className="glass-card flex flex-col justify-between w-full">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
              Idea Detail & Analysis
            </p>
            <h2 className="mt-3 text-base font-bold tracking-tight text-foreground leading-tight">{idea.title}</h2>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-medium">Strategic Alignment</span>
                <span className="font-bold text-emerald-700">{idea.alignment}%</span>
              </div>

              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-medium">Duplicates Detected</span>
                <span className="font-bold text-amber-700">{idea.duplicates} matches</span>
              </div>

              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-medium">Evaluation Status</span>
                <span className="font-bold text-foreground">{idea.eval}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-brand-50 p-3 border border-brand-200 text-xs text-brand-800 flex items-start gap-2">
              <Sparkles className="size-4 shrink-0 mt-0.5 text-brand-600" />
              <span>AIIM AI coaches submitters, checks duplicates, and drafts stage gate summaries.</span>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2 border-t border-border/60 pt-3">
            <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:flex-1">
              <Target className="size-3.5" /> Route to Eval
            </button>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">
              <CheckCircle2 className="size-3.5" /> Merge Duplicates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}