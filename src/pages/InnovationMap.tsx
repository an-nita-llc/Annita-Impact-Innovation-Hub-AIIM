import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Globe,
  MapPin,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

type HubCity = {
  id: string;
  city: string;
  country: string;
  region: string;
  coords: { x: number; y: number };
  activeRounds: number;
  totalVolume: string;
  incubators: number;
  topSectors: string[];
};

const HUBS: HubCity[] = [
  { id: "h1", city: "Accra", country: "Ghana", region: "West Africa", coords: { x: 38, y: 48 }, activeRounds: 14, totalVolume: "$18.4M", incubators: 8, topSectors: ["Climate Tech", "Fintech", "Health"] },
  { id: "h2", city: "Monrovia", country: "Liberia", region: "West Africa", coords: { x: 32, y: 51 }, activeRounds: 6, totalVolume: "$4.2M", incubators: 3, topSectors: ["Agritech", "Health", "Clean Energy"] },
  { id: "h3", city: "Lagos", country: "Nigeria", region: "West Africa", coords: { x: 44, y: 50 }, activeRounds: 38, totalVolume: "$84.0M", incubators: 18, topSectors: ["Fintech", "Mobility", "Edtech"] },
  { id: "h4", city: "Nairobi", country: "Kenya", region: "East Africa", coords: { x: 72, y: 58 }, activeRounds: 29, totalVolume: "$62.5M", incubators: 12, topSectors: ["Climate", "Agtech", "Energy"] },
  { id: "h5", city: "Johannesburg", country: "South Africa", region: "Southern Africa", coords: { x: 62, y: 84 }, activeRounds: 22, totalVolume: "$48.0M", incubators: 10, topSectors: ["Fintech", "Enterprise AI", "Health"] },
  { id: "h6", city: "Kigali", country: "Rwanda", region: "East Africa", coords: { x: 68, y: 59 }, activeRounds: 11, totalVolume: "$12.8M", incubators: 6, topSectors: ["Smart City", "Fintech", "Agtech"] },
];

export default function InnovationMap() {
  const [selectedHub, setSelectedHub] = useState<HubCity>(HUBS[0]);
  const [query, setQuery] = useState("");

  const filteredHubs = HUBS.filter(
    (h) =>
      !query ||
      h.city.toLowerCase().includes(query.toLowerCase()) ||
      h.country.toLowerCase().includes(query.toLowerCase()) ||
      h.region.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Pan-African Innovation Map</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 flex items-center gap-1">
              <Globe className="size-3" /> Live Ecosystem Activity
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Visualize active funding rounds, university incubators, and startup hubs across Sub-Saharan Africa.
          </p>
        </div>
      </div>

      {/* Main Grid: Visual Map View & Hub Detail Drawer */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] w-full">
        {/* Interactive African Map Canvas Representation */}
        <div className="glass-card relative flex flex-col justify-between overflow-hidden min-h-[420px] bg-gradient-to-b from-annita-navy-950 via-annita-navy-900 to-annita-navy-950 text-white p-6 rounded-2xl sm:rounded-3xl border-0 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Ecosystem Hub Locator</span>
            </div>
            <span className="text-[10px] font-bold bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-brand-300">
              $229.9M Active Ecosystem Volume
            </span>
          </div>

          {/* Interactive Continent Node Points */}
          <div className="relative my-8 h-64 sm:h-72 w-full rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center">
            <p className="absolute top-3 left-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sub-Saharan Venture Clusters
            </p>

            {/* Map Node Pins */}
            {HUBS.map((hub) => {
              const isSel = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setSelectedHub(hub)}
                  style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group flex items-center gap-1.5 transition-all ${
                    isSel ? "scale-125 z-20" : "hover:scale-110 z-10"
                  }`}
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-full font-black text-[10px] shadow-md transition-all ${
                      isSel ? "bg-brand-500 text-white ring-4 ring-brand-500/30" : "bg-white text-annita-navy-900"
                    }`}
                  >
                    {hub.activeRounds}
                  </span>
                  <span
                    className={`hidden sm:inline-block rounded-md px-2 py-0.5 text-[10px] font-bold whitespace-nowrap backdrop-blur-md shadow-xs ${
                      isSel ? "bg-brand-600 text-white" : "bg-black/60 text-slate-200"
                    }`}
                  >
                    {hub.city}, {hub.country}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map Footer Stats */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-slate-300">
            <span>Selected Hub: <strong className="text-white font-bold">{selectedHub.city}, {selectedHub.country}</strong></span>
            <span className="text-emerald-400 font-bold">{selectedHub.totalVolume} Active Capital</span>
          </div>
        </div>

        {/* Selected Hub Detail Drawer */}
        <div className="glass-card flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{selectedHub.region}</p>
                <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5 mt-0.5">
                  <MapPin className="size-4 text-brand-600" />
                  <span>{selectedHub.city}, {selectedHub.country}</span>
                </h2>
              </div>
              <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-800">
                {selectedHub.activeRounds} Live Rounds
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-border/80 bg-background/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Round Volume</p>
                <p className="text-xl font-extrabold text-brand-700 mt-0.5">{selectedHub.totalVolume}</p>
              </div>

              <div className="p-3 rounded-xl border border-border/80 bg-background/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Incubators & Accelerators</p>
                <p className="text-base font-bold text-foreground mt-0.5">{selectedHub.incubators} Partner Hubs</p>
              </div>

              <div className="p-3 rounded-xl border border-border/80 bg-background/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Top Venture Sectors</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHub.topSectors.map((s, idx) => (
                    <span key={idx} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2 border-t border-border/60 pt-3">
            <Link to="/deal-flow" className="btn btn-primary btn-sm min-h-[44px] w-full sm:flex-1">
              <span>View Hub Deals</span>
            </Link>
            <Link to="/founders" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">
              <Users className="size-3.5" /> Founders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}