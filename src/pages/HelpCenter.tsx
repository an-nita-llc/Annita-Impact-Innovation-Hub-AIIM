import { BookOpen, Search } from "lucide-react";
import { useState } from "react";

const ARTICLES = [
  { title: "Getting started on AIIM", category: "Onboarding", desc: "Create your account, verify identity, and set up your profile." },
  { title: "How DealMatch scoring works", category: "Matching", desc: "The five dimensions, disqualifiers, and evidence trail." },
  { title: "Preparing a diligence-ready data room", category: "Deal Rooms", desc: "Structure, permissions, watermarks, and Q&A." },
  { title: "Running a pilot with KPIs", category: "Pilots", desc: "Define metrics, track, and record go/no-go decisions." },
  { title: "Understanding verification badges", category: "Trust", desc: "KYC/KYB flows and badge tiers." },
  { title: "Platform security & compliance", category: "Security", desc: "SSO, encryption, audit logs, data residency." },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const filtered = ARTICLES.filter((a) => !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">Guides, onboarding, and platform documentation.</p>
      </div>
      <div className="relative max-w-md">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div key={a.title} className="glass-card">
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><BookOpen aria-hidden="true" className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{a.category}</span>
                <p className="mt-2 text-sm font-semibold">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}