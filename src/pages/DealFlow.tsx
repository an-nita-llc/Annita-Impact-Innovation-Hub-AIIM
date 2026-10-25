import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
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

const INITIAL_MATCHES: Match[] = [
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
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "startup" | "investor">("all");
  const [expanded, setExpanded] = useState<string | null>("m1");
  const [isMatching, setIsMatching] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleRunNewMatch() {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      triggerToast("AI match algorithm re-indexed 32 new startup profiles!");
    }, 1000);
  }

  function toggleSaveMatch(id: string, name: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        triggerToast(`Removed ${name} from saved matches.`);
      } else {
        next.add(id);
        triggerToast(`Saved ${name} to your deal watchlist!`);
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return matches.filter((m) => {
      const matchesRole = roleFilter === "all" || m.role === roleFilter;
      const matchesText =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.sector.toLowerCase().includes(q) ||
        m.headline.toLowerCase().includes(q);
      return matchesRole && matchesText;
    });
  }, [matches, query, roleFilter]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Action Toast Feedback Banner */}
      {toastMessage ? (
        <div className="fixed top-20 right-4 z-50 rounded-2xl bg-brand-600 text-white p-4 shadow-xl border border-brand-400 flex items-center gap-2.5 text-xs font-bold animate-modal-in">
          <Sparkles className="size-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      ) : null}

      {/* Header Bar - Vertical Stacked Elements */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Deal Flow AI Matches</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            {filtered.length} High Confidence Matches
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          AI-matched founders, investors, and strategic partners with explainable thesis scores.
        </p>
        <div className="mt-2">
          <button
            type="button"
            onClick={handleRunNewMatch}
            disabled={isMatching}
            className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto justify-center"
          >
            {isMatching ? (
              <>
                <Loader2 className="size-4 animate-spin text-white" />
                <span>Running AI Match Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>Run New Match Sprint</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col gap-3 w-full">
        {/* Search Box */}
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search matches by sector, name..."
            className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
          />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex flex-col gap-1 w-full rounded-xl border border-border/80 bg-background/60 p-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 pt-1">Filter Persona</p>
          {[
            { id: "all", label: "All Matches" },
            { id: "startup", label: "Startups" },
            { id: "investor", label: "Investors" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id as any)}
              className={`w-full rounded-lg px-3 py-2 text-xs font-bold text-left transition-all ${
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

      {/* Match Cards List */}
      <div className="flex flex-col gap-4 w-full">
        {filtered.map((m) => {
          const isExp = expanded === m.id;
          const isSaved = savedIds.has(m.id);
          return (
            <div key={m.id} className="glass-card flex flex-col gap-3 transition-all hover:border-brand-300">
              <div className="flex flex-col items-start gap-1.5 w-full">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">{m.name}</h2>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    m.role === "startup"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      : "bg-purple-50 text-purple-700 border border-purple-200/60"
                  }`}
                >
                  {m.role}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{m.headline}</p>
              </div>

              <div className="flex flex-col gap-1.5 w-full pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Match Specs</p>
                <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 space-y-1 text-xs font-semibold text-foreground">
                  <p>• Sector: <strong>{m.sector}</strong></p>
                  <p>• Stage: <strong>{m.stage}</strong></p>
                  <p>• Location: <strong>{m.geo}</strong></p>
                  <p className="text-brand-800 font-bold">• Check Target: <strong>{m.check}</strong></p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 border-t border-border/60 pt-3 w-full">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-xl border-2 border-brand-300 bg-brand-50 text-sm font-extrabold text-brand-700 shadow-xs">
                    {m.score}%
                  </div>
                  <span className="text-xs font-bold text-foreground">Overall AI Thesis Match Score</span>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded(isExp ? null : m.id)}
                  className="flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline pt-1"
                >
                  <span>{isExp ? "Hide Rationale Analysis" : "Why This Match?"}</span>
                  {isExp ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>
              </div>

              {isExp ? (
                <div className="flex flex-col gap-4 border-t border-border/80 pt-4 animate-modal-in w-full">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Dimension Match Breakdown</p>
                    <ul className="space-y-2 text-xs">
                      {Object.entries(m.dims).map(([key, val]) => (
                        <li key={key} className="flex flex-col gap-1">
                          <div className="flex justify-between font-semibold text-foreground">
                            <span className="capitalize">{key}</span>
                            <span className="font-bold">{val}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${val}%` }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Evidence & Rationale</p>
                    <ul className="space-y-2 text-xs">
                      {m.why.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{reason}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-col gap-2 w-full">
                      <Link to="/deal-rooms" className="btn btn-primary btn-sm min-h-[44px] w-full justify-center">
                        <span>Open Deal Room</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleSaveMatch(m.id, m.name)}
                        className="btn btn-secondary btn-sm min-h-[44px] w-full justify-center"
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="size-4 text-emerald-600" />
                            <span>Saved in Watchlist ✓</span>
                          </>
                        ) : (
                          <span>Save to Watchlist</span>
                        )}
                      </button>
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