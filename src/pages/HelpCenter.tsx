import { useState } from "react";
import { BookOpen, Search } from "lucide-react";

const ARTICLES = [
  { title: "Getting Started on AIIM Hub", category: "Onboarding", desc: "Set up your founder or investor profile, verify identity, and connect deal rooms." },
  { title: "How DealMatch AI Scoring Works", category: "Matching", desc: "Understanding the 5 dimension scores, thesis alignment, and evidence rationale." },
  { title: "Setting Up a Diligence Deal Room", category: "Deal Rooms", desc: "Permission tiers, watermark security, document Q&A, and immutable audit logs." },
  { title: "Running Corporate Pilots & KPIs", category: "Pilots", desc: "Defining target metrics, logging milestones, and go/no-go stage gate reviews." },
  { title: "Understanding KYC / KYB Badges", category: "Trust", desc: "Verification workflows, identity badges, and trust center documentation." },
  { title: "Platform Security & Data Privacy", category: "Security", desc: "Encryption standards, passkey enrollment, audit retention, and compliance." },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const filtered = ARTICLES.filter(
    (a) =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Help Center & Knowledge Base</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Ecosystem documentation, user guides, and platform tutorials.</p>
      </div>

      <div className="relative w-full sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help guides..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
        />
      </div>

      <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filtered.map((a) => (
          <div key={a.title} className="glass-card flex flex-col justify-between transition-all hover:border-brand-300 p-4 sm:p-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-bold shrink-0">
                  <BookOpen className="size-4" />
                </div>
                <span className="rounded-full bg-muted border border-border/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
                  {a.category}
                </span>
              </div>
              <h2 className="mt-3 text-sm font-bold tracking-tight text-foreground">{a.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] mt-4 w-full sm:w-fit">Read Guide</button>
          </div>
        ))}
      </div>
    </div>
  );
}