import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  FolderLock,
  Lock,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";

type Room = {
  id: string;
  name: string;
  parties: string;
  access: "NDA gated" | "Open" | "Invite only";
  docs: number;
  status: "Active" | "Sealed" | "Draft";
  updated: string;
};

const ROOMS: Room[] = [
  { id: "r1", name: "Solara Climate OS — Seed Round Room", parties: "Solara • Northstar Ventures • AIIM Advisory", access: "NDA gated", docs: 18, status: "Active", updated: "2h ago" },
  { id: "r2", name: "MediBridge Diagnostic Dossier", parties: "MediBridge • Impact Capital Fund", access: "Invite only", docs: 9, status: "Active", updated: "1d ago" },
  { id: "r3", name: "Atlas Energy Pilot Collaboration", parties: "Atlas Energy • 3 Corporate Offtakers", access: "Open", docs: 6, status: "Draft", updated: "4d ago" },
  { id: "r4", name: "Foundry Cohort 3 Final Pitch Archive", parties: "12 Founders • Investment Committee Panel", access: "Invite only", docs: 31, status: "Sealed", updated: "1w ago" },
];

export default function DealRooms() {
  const [openRoom, setOpenRoom] = useState<string | null>("r1");

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Secure Deal Rooms</h1>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="size-3" /> NDA Gated
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Permission-tiered diligence rooms with dynamic watermarking and AI document Q&A.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Plus className="size-4" /> Create Deal Room
        </button>
      </div>

      {/* Room Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {ROOMS.map((r) => {
          const isOpen = openRoom === r.id;
          return (
            <div key={r.id} className="glass-card transition-all hover:border-brand-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="min-w-0 flex-1 w-full">
                  <div className="flex items-center gap-2">
                    <FolderLock className="size-5 text-brand-600 shrink-0" />
                    <h2 className="text-base font-bold tracking-tight text-foreground truncate">{r.name}</h2>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.parties}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    <span className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                      {r.access}
                    </span>
                    <span className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-[11px] font-semibold text-foreground flex items-center gap-1">
                      <FileText className="size-3 text-muted-foreground" />
                      {r.docs} docs
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px] ${
                        r.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : r.status === "Draft"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-muted-foreground">Updated {r.updated}</p>
                </div>

                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                  <button
                    type="button"
                    onClick={() => setOpenRoom(isOpen ? null : r.id)}
                    className="btn btn-secondary btn-sm flex-1 sm:flex-none min-h-[44px]"
                  >
                    {isOpen ? "Close Room" : "Enter Room"}
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm flex-1 sm:flex-none min-h-[44px]">
                    <Upload className="size-3.5" /> Upload
                  </button>
                </div>
              </div>

              {/* Expanded Activity & Security Details */}
              {isOpen ? (
                <div className="mt-4 border-t border-border/80 pt-4 animate-modal-in">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Room Security & Activity</p>

                  <ul className="mt-2.5 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Shield className="size-4 text-emerald-600 shrink-0" />
                      <span>Mutual NDA executed across all 3 active participant organizations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="size-4 text-brand-600 shrink-0" />
                      <span>4 active members • 2 read-only investors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lock className="size-4 text-purple-600 shrink-0" />
                      <span>Dynamic watermarking & AI leak detection active</span>
                    </li>
                  </ul>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Link to="/documents" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
                      <Sparkles className="size-3.5" /> Ask Room AI
                    </Link>
                    <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">Manage Access</button>
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