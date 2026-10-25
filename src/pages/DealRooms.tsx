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
      {/* Header Bar - Vertical Stacked */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Secure Deal Rooms</h1>
        <div>
          <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
            🔒 NDA Gated
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Permission-tiered diligence rooms with dynamic watermarking and AI document Q&A.
        </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
            <Plus className="size-4" /> Create Deal Room
          </button>
        </div>
      </div>

      {/* Room Cards List - Vertically Stacked Content */}
      <div className="flex flex-col gap-4 w-full">
        {ROOMS.map((r) => {
          const isOpen = openRoom === r.id;
          return (
            <div key={r.id} className="glass-card flex flex-col gap-3 transition-all hover:border-brand-300 w-full">
              {/* Title & Parties vertically under each other */}
              <div className="flex flex-col items-start gap-1.5 w-full min-w-0">
                <div className="flex items-center gap-2 max-w-full">
                  <FolderLock className="size-5 text-brand-600 shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground break-words">{r.name}</h2>
                </div>
                <p className="text-xs text-muted-foreground break-words">{r.parties}</p>
              </div>

              {/* Badges Vertically Stacked List */}
              <div className="flex flex-col gap-1.5 w-full">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Room Status</p>
                <div className="rounded-xl border border-border/80 bg-background/80 p-2.5 space-y-1 text-xs font-semibold text-foreground">
                  <p>• Access Level: <strong>{r.access}</strong></p>
                  <p>• Documents: <strong>{r.docs} Files</strong></p>
                  <p>• Status: <strong className="text-brand-700">{r.status}</strong></p>
                  <p className="text-muted-foreground font-normal">• Updated: {r.updated}</p>
                </div>
              </div>

              {/* Action Buttons Stacked Vertically */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border/60 w-full">
                <button
                  type="button"
                  onClick={() => setOpenRoom(isOpen ? null : r.id)}
                  className="btn btn-secondary btn-sm min-h-[44px] w-full justify-center"
                >
                  {isOpen ? "Close Room Details" : "Enter Deal Room"}
                </button>
                <button type="button" className="btn btn-ghost btn-sm min-h-[44px] w-full justify-center">
                  <Upload className="size-3.5" /> Upload Diligence File
                </button>
              </div>

              {/* Expanded Activity & Security Details */}
              {isOpen ? (
                <div className="flex flex-col gap-3 border-t border-border/80 pt-4 animate-modal-in w-full">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Room Security & Activity</p>

                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Shield className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Mutual NDA executed across all participant organizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="size-4 text-brand-600 shrink-0 mt-0.5" />
                      <span>4 active members • 2 read-only investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="size-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Dynamic watermarking & AI leak detection active</span>
                    </li>
                  </ul>

                  <div className="flex flex-col gap-2 pt-2 w-full">
                    <Link to="/documents" className="btn btn-primary btn-sm min-h-[44px] w-full justify-center">
                      <Sparkles className="size-3.5" /> Ask Room AI
                    </Link>
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