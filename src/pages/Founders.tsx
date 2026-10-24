import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  MapPin,
  MessageSquare,
  Search,
  TrendingUp,
  UserCheck,
} from "lucide-react";

type Founder = {
  id: string;
  name: string;
  company: string;
  sector: string;
  stage: string;
  location: string;
  traction: string;
  looking: string;
  verified: boolean;
};

const FOUNDERS: Founder[] = [
  {
    id: "f1",
    name: "Amina Diallo",
    company: "Solara Climate OS",
    sector: "Climate Tech",
    stage: "Seed Round",
    location: "Accra, Ghana • Remote",
    traction: "$420K ARR • 14 Utilities",
    looking: "Lead investor ($750K) + Corporate Offtakers",
    verified: true,
  },
  {
    id: "f2",
    name: "Kwesi Boateng",
    company: "MediBridge Health",
    sector: "Digital Health",
    stage: "Pre-seed",
    location: "Kumasi, Ghana",
    traction: "12 Primary Clinics • 3.2K Patients",
    looking: "$400K Angel Round • Health Mentors",
    verified: true,
  },
  {
    id: "f3",
    name: "Lerato Ndlovu",
    company: "AgriSense",
    sector: "Agtech",
    stage: "Series A",
    location: "Johannesburg, South Africa",
    traction: "$1.8M ARR • 60 Commercial Farms",
    looking: "Growth Capital ($2.5M) • Retail Distribution",
    verified: true,
  },
];

export default function Founders() {
  const [query, setQuery] = useState("");
  const filtered = FOUNDERS.filter(
    (f) =>
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.company.toLowerCase().includes(query.toLowerCase()) ||
      f.sector.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Founder Directory</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            {filtered.length} Vetted Founders
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Vetted MSME and tech founders across Africa, traction metrics, and active fundraising status.
        </p>
        <div className="mt-2">
          <Link to="/onboarding" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <UserCheck className="size-4" /> Apply as Founder
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
          placeholder="Search founders, ventures, sectors..."
          className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
        />
      </div>

      {/* Founder Profile Cards Grid - Vertically Stacked Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {filtered.map((f) => (
          <div key={f.id} className="glass-card flex flex-col justify-between gap-4 transition-all hover:border-brand-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-xs shrink-0">
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold tracking-tight text-foreground flex items-center gap-1.5">
                    <span className="truncate">{f.name}</span>
                    {f.verified ? <UserCheck className="size-3.5 text-brand-600 shrink-0" /> : null}
                  </h2>
                  <p className="text-xs font-semibold text-brand-700 truncate">{f.company}</p>
                </div>
              </div>

              <div>
                <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 border border-brand-200/60">
                  {f.stage}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Sector Focus</span>
                  <span className="font-bold text-foreground">{f.sector}</span>
                </div>

                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Location</span>
                  <span className="font-bold text-foreground">{f.location}</span>
                </div>

                <div className="flex flex-col gap-0.5 border-b border-border/60 pb-1.5">
                  <span className="text-muted-foreground font-medium">Traction</span>
                  <span className="font-bold text-emerald-700">{f.traction}</span>
                </div>

                <div className="pt-1">
                  <span className="text-muted-foreground font-medium block mb-1">Looking For:</span>
                  <span className="font-bold text-foreground bg-muted/60 p-2.5 rounded-xl block text-[11px] leading-snug">
                    {f.looking}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border/60 pt-3 w-full">
              <Link to="/deal-flow" className="btn btn-primary btn-sm min-h-[44px] w-full justify-center">
                <span>View Matches</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link to="/messages" className="btn btn-secondary btn-sm min-h-[44px] w-full justify-center">
                <MessageSquare className="size-3.5" />
                <span>Message Founder</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}