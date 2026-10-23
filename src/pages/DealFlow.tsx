import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, Sparkles, TrendingUp } from "lucide-react";

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
    name: "Solara climate OS",
    role: "startup",
    headline: "AI operating layer for commercial solar portfolios",
    sector: "Climate tech",
    stage: "Seed",
    geo: "US / Africa",
    check: "$750K",
    score: 91,
    dims: { sector: 96, stage: 88, check: 92, geo: 85, thesis: 94 },
    why: ["Sector thesis: climate infra + AI", "Stage fits Seed mandate", "Check size inside range", "Recent portfolio co-investor"],
  },
  {
    id: "m2",
    name: "Northstar Ventures",
    role: "investor",
    headline: "Pre-seed / Seed · climate, energy, mobility",
    sector: "Climate, Energy",
    stage: "Pre-seed–Seed",
    geo: "US, EU",
    check: "$250K–$1M",
    score: 87,
    dims: { sector: 90, stage: 84, check: 88, geo: 78, thesis: 92 },
    why: ["Mandate matches sector", "Stage overlap confirmed", "Check size aligned", "No direct portfolio conflict"],
  },
  {
    id: "m3",
    name: "MediBridge Health",
    role: "startup",
    headline: "AI triage for rural clinics",
    sector: "Digital health",
    stage: "Pre-seed",
    geo: "Sub-Saharan Africa",
    check: "$400K",
    score: 82,
    dims: { sector: 88, stage: 80, check: 75, geo: 79, thesis: 80 },
    why: ["Strong sector fit", "Geography match", "Check size needs verification"],
  },
];

export default function DealFlow() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return MATCHES;
    return MATCHES.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.sector.toLowerCase().includes(q) ||
        m.headline.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deal Flow</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-matched founders, investors, and partners — with explainable, conflict-checked scores.
          </p>
        </div>
        <button type="button" className="btn btn-primary">
          <Sparkles aria-hidden="true" className="size-4" />
          Run new match
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search names, sectors, theses…"
            className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>
        <button type="button" className="btn btn-secondary">
          <Filter aria-hidden="true" className="size-4" /> Filters
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="glass-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold tracking-tight">{m.name}</p>
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                    {m.role}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{m.headline}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{m.sector}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{m.stage}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{m.geo}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{m.check}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex size-14 items-center justify-center rounded-full border-4 border-brand-200 bg-brand-50 text-lg font-bold text-brand-700">
                  {m.score}
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  className="text-xs font-medium text-brand-700 hover:underline"
                >
                  {expanded === m.id ? "Hide details" : "Why this match?"}
                </button>
              </div>
            </div>

            {expanded === m.id ? (
              <div className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dimension scores</p>
                  <ul className="mt-2 flex flex-col gap-2 text-sm">
                    {Object.entries(m.dims).map(([k, v]) => (
                      <li key={k} className="flex items-center gap-3">
                        <span className="w-16 capitalize text-muted-foreground">{k}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-brand-600" style={{ width: `${v}%` }} />
                        </div>
                        <span className="w-8 text-right font-medium">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Evidence & rationale</p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
                    {m.why.map((w) => (
                      <li key={w} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 size-1.5 rounded-full bg-brand-600" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Link to="/deal-rooms" className="btn btn-primary btn-sm">Open deal room</Link>
                    <button type="button" className="btn btn-secondary btn-sm">Save</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}