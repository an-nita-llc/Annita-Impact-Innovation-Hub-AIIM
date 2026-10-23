import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";

type Founder = { id: string; name: string; company: string; sector: string; stage: string; location: string; traction: string; looking: string };

const FOUNDERS: Founder[] = [
  { id: "f1", name: "Amina Diallo", company: "Solara climate OS", sector: "Climate tech", stage: "Seed", location: "Accra · Remote", traction: "$420K ARR · 14 customers", looking: "Lead investor + corporate offtake" },
  { id: "f2", name: "Kwesi Boateng", company: "MediBridge Health", sector: "Digital health", stage: "Pre-seed", location: "Kumasi", traction: "12 clinics · 3.2K patients", looking: "$400K · health angels" },
  { id: "f3", name: "Lerato Ndlovu", company: "AgriSense", sector: "Agtech", stage: "Series A", location: "Johannesburg", traction: "$1.8M ARR · 60 farms", looking: "Growth capital + distribution" },
];

export default function Founders() {
  const [query, setQuery] = useState("");
  const filtered = FOUNDERS.filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.company.toLowerCase().includes(query.toLowerCase()) || f.sector.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Founders</h1>
          <p className="mt-1 text-sm text-muted-foreground">Founder profiles, traction, and round status in one view.</p>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search founders, companies, sectors…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => (
          <div key={f.id} className="glass-card">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Users aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-tight">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.company} · {f.sector}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div><dt className="text-muted-foreground">Stage</dt><dd className="font-medium">{f.stage}</dd></div>
              <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium">{f.location}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Traction</dt><dd className="font-medium">{f.traction}</dd></div>
              <div className="col-span-2"><dt className="text-muted-foreground">Looking for</dt><dd className="font-medium">{f.looking}</dd></div>
            </dl>
            <div className="mt-4 flex gap-2">
              <Link to="/deal-flow" className="btn btn-primary btn-sm">View matches</Link>
              <Link to="/messages" className="btn btn-secondary btn-sm">Message</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}