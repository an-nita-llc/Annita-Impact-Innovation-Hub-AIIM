import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
} from "lucide-react";

type Match = {
  id: string;
  name: string;
  role: "startup" | "investor";
  headline: string;
  sector: string;
  stage: string;
  geo: string;
  check: string;
  score: number;
  dims: { sector: number; stage: number; check: number; geo: number; thesis: number };
  why: string[];
};

const MATCHES: Match[] = [
  {
    id: "m1",
    name: "Solara Climate OS",
    role: "startup",
    headline: "AI operating layer for commercial solar energy portfolios",
    sector: "Climate Tech",
    stage: "Seed Round",
    geo: "US / West Africa",
    check: "$750K Raise",
    score: 91,
    dims: { sector: 96, stage: 88, check: 92, geo: 85, thesis: 94 },
    why: [
      "Sector thesis align: Climate Infrastructure + Edge AI",
      "Stage fits investor Seed mandate ($500K–$1.5M)",
      "Target check size inside preferred lead range",
      "Co-investor network overlaps with prior portfolio deals",
    ],
  },
  {
    id: "m2",
    name: "Northstar Ventures",
    role: "investor",
    headline: "Pre-seed & Seed fund focused on climate, energy, and mobility",
    sector: "Climate, Energy",
    stage: "Pre-seed–Seed",
    geo: "US, EU, Africa",
    check: "$250K–$1M",
    score: 87,
    dims: { sector: 90, stage: 84, check: 88, geo: 78, thesis: 92 },
    why: [
      "Fund mandate aligns with current venture focus",
      "Confirmed active deployment cycle for Q2",
      "Check size perfectly aligned with round lead terms",
      "Clean IP review & no portfolio competitor conflicts",
    ],
  },
  {
    id: "m3",
    name: "MediBridge Health",
    role: "startup",
    headline: "AI triage and offline diagnostic platform for rural healthcare",
    sector: "Digital Health",
    stage: "Pre-seed",
    geo: "Sub-Saharan Africa",
    check: "$400K Raise",
    score: 82,
    dims: { sector: 88, stage: 80, check: 75, geo: 79, thesis: 80 },
    why: [
      "Strong sector fit with healthcare impact mandate",
      "High geographic alignment for emerging health markets",
      "Check size needs minor syndicate adjustment",
    ],
  },
];

export default function DealFlow() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "startup" | "investor">("all");
  const [expanded, setExpanded] = useState<string | null>("m1");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MATCHES.filter((m) => {
      const matchesRole = roleFilter === "all" || m.role === roleFilter;
      const matchesText =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.sector.toLowerCase().includes(q) ||
        m.headline.toLowerCase().includes(q);
      return matchesRole && matchesText;
    });
  }, [query, roleFilter]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Deal Flow AI Matches</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
              3 Matches
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            AI-matched founders, investors, and strategic partners with explainable thesis scores.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Sparkles className="size-4" /> Run New Match
        </button>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search matches..."
              className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background/60 p-1">
            {[
              { id: "all", label: "All" },
              { id: "startup", label: "Startups" },
              { id: "investor", label: "Investors" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id as any)}
                className={`flex-1 sm:flex-none rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === tab.id
                    ? "bg-surface text-foreground shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="flex flex-col gap-4">
        {filtered.map((m) => {
          const isExp = expanded === m.id;
          return (
            <div key={m.id} className="glass-card transition-all hover:border-brand-300">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="min-w-0 flex-1 w-full">
                  <div className="flex items-center justify-between sm:justify-start gap-2.5">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{m.name}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        m.role === "startup"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-purple-50 text-purple-700 border border-purple-200/60"
                      }`}
                    >
                      {m.role}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.headline}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="rounded-lg border border-border/80 bg-background/80 px-2 py-0.5 text-[11px] font-semibold text-foreground">
                      {m.sector}
                    </span>
                    <span className="rounded-lg border border-border/80 bg-background/80 px-2 py-0.5 text-[11px] font-semibold text-foreground">
                      {m.stage}
                    </span>
                    <span className="rounded-lg border border-border/80 bg-background/80 px-2 py-0.5 text-[11px] font-semibold text-foreground">
                      {m.geo}
                    </span>
                    <span className="rounded-lg border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-800">
                      {m.check}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0">
                  <div className="flex size-12 sm:size-14 items-center justify-center rounded-2xl border-2 border-brand-300 bg-brand-50 text-base sm:text-lg font-extrabold text-brand-700 shadow-xs">
                    {m.score}%
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded(isExp ? null : m.id)}
                    className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                  >
                    <span>{isExp ? "Hide Rationale" : "Why This Match?"}</span>
                    {isExp ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expanded AI Match Breakdown */}
              {isExp ? (
                <div className="mt-4 border-t border-border/80 pt-4 animate-modal-in">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Dimension Match Breakdown</p>
                      <ul className="mt-3 space-y-2 text-xs">
                        {Object.entries(m.dims).map(([key, val]) => (
                          <li key={key} className="flex items-center gap-3">
                            <span className="w-16 capitalize font-medium text-muted-foreground">{key}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                              <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${val}%` }} />
                            </div>
                            <span className="w-8 text-right font-bold text-foreground">{val}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Evidence & Rationale</p>
                      <ul className="mt-2.5 space-y-2 text-xs">
                        {m.why.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{reason}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <Link to="/deal-rooms" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
                          <span>Open Deal Room</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">Save Match</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}