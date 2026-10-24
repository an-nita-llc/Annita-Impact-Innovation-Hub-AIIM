import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MessageSquare, Search, Sparkles } from "lucide-react";

type Investor = {
  id: string;
  name: string;
  firm: string;
  focus: string;
  stages: string;
  ticket: string;
  geo: string;
  signals: string[];
};

const INVESTORS: Investor[] = [
  {
    id: "i1",
    name: "Northstar Ventures",
    firm: "Northstar Partners",
    focus: "Climate Tech, Clean Energy, Smart Mobility",
    stages: "Pre-seed – Seed",
    ticket: "$250K – $1M Lead",
    geo: "US, Europe, West Africa",
    signals: ["Leads rounds", "Climate infra thesis", "3 active portfolio deals"],
  },
  {
    id: "i2",
    name: "Impact Capital Fund I",
    firm: "Impact Capital",
    focus: "Digital Health, Edtech, Financial Inclusion",
    stages: "Seed – Series A",
    ticket: "$500K – $3M Follow-on",
    geo: "Sub-Saharan Africa, SEA",
    signals: ["Gender-lens mandate", "Follow-on ready", "Dedicated mentor network"],
  },
  {
    id: "i3",
    name: "Frontier Angels Syndicate",
    firm: "Frontier Angels",
    focus: "Agtech, Supply Chain, B2B Fintech",
    stages: "Pre-seed",
    ticket: "$50K – $250K",
    geo: "Pan-African & Remote",
    signals: ["Fast decision cycle", "Syndicate friendly", "Operator angels"],
  },
];

export default function Investors() {
  const [query, setQuery] = useState("");
  const filtered = INVESTORS.filter(
    (i) =>
      !query ||
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.firm.toLowerCase().includes(query.toLowerCase()) ||
      i.focus.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Investor Network</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            {filtered.length} Active Funds
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Vetted venture capital funds, angel syndicates, and institutional impact investors.
        </p>
        <div className="mt-2">
          <Link to="/deal-flow" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Sparkles className="size-4" /> Match Fund Mandate
          </Link>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search funds, tickets, sectors..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
        />
      </div>

      {/* Investor Cards Grid - Vertically Stacked Content */}
      <div className="grid gap-4 md:grid-cols-2 w-full">
        {filtered.map((i) => (
          <div key={i.id} className="glass-card flex flex-col justify-between gap-4 transition-all hover:border-brand-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-purple-600 text-white font-extrabold text-sm shadow-xs shrink-0">
                  <Building2 className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold tracking-tight text-foreground truncate">{i.name}</h2>
                  <p className="text-xs text-muted-foreground">{i.firm}</p>
                </div>
              </div>

              <div>
                <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  {i.ticket}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Focus Areas</span>
                  <span className="font-bold text-foreground">{i.focus}</span>
                </div>

                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Target Stages</span>
                  <span className="font-bold text-foreground">{i.stages}</span>
                </div>

                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Geography</span>
                  <span className="font-bold text-foreground">{i.geo}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mandate Signals</p>
                {i.signals.map((sig, idx) => (
                  <span key={idx} className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 border border-brand-200/60 block w-full">
                    ✓ {sig}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border/60 pt-3 w-full">
              <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full">View Mandate</button>
              <Link to="/messages" className="btn btn-secondary btn-sm min-h-[44px] w-full justify-center">
                <MessageSquare className="size-3.5" /> Request Intro
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}