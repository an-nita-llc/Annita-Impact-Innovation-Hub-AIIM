import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  MapPin,
  Sparkles,
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

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Pan-African Innovation Map</h1>
        <div>
          <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700">
            🌐 Live Ecosystem Activity
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Visualize active funding rounds, university incubators, and startup hubs across Sub-Saharan Africa.
        </p>
      </div>

      {/* Main Column Stacked Layout */}
      <div className="flex flex-col gap-5 w-full">
        {/* Interactive African Map Canvas Representation */}
        <div className="glass-card relative flex flex-col justify-between overflow-hidden min-h-[380px] bg-gradient-to-b from-annita-navy-950 via-annita-navy-900 to-annita-navy-950 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-0 shadow-lg w-full">
          <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Ecosystem Hub Locator</span>
            </div>
            <span className="text-[10px] font-bold text-brand-300">
              $229.9M Active Ecosystem Volume
            </span>
          </div>

          {/* Interactive Continent Node Points */}
          <div className="relative my-6 h-60 sm:h-64 w-full rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center">
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
          <div className="flex flex-col gap-1 border-t border-white/10 pt-3 text-xs text-slate-300">
            <span>Selected Hub: <strong className="text-white font-bold">{selectedHub.city}, {selectedHub.country}</strong></span>
            <span className="text-emerald-400 font-bold">{selectedHub.totalVolume} Active Capital</span>
          </div>
        </div>

        {/* Selected Hub Detail Card Vertically Stacked Underneath */}
        <div className="glass-card flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 border-b border-border/60 pb-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{selectedHub.region}</p>
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <MapPin className="size-4 text-brand-600 shrink-0" />
              <span>{selectedHub.city}, {selectedHub.country}</span>
            </h2>
            <div>
              <span className="inline-block rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-800">
                {selectedHub.activeRounds} Live Rounds
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs w-full">
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

          <div className="flex flex-col gap-2 border-t border-border/60 pt-3 w-full">
            <Link to="/deal-flow" className="btn btn-primary btn-sm min-h-[44px] w-full justify-center">
              <span>View Hub Deals</span>
            </Link>
            <Link to="/founders" className="btn btn-secondary btn-sm min-h-[44px] w-full justify-center">
              <Users className="size-3.5" /> Founders Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}