import { useState } from "react";
import { Link } from "react-router-dom";
import { FolderLock, Upload, Shield, Users } from "lucide-react";

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
  { id: "r1", name: "Solara climate OS — Seed round", parties: "Solara × Northstar Ventures", access: "NDA gated", docs: 18, status: "Active", updated: "2h ago" },
  { id: "r2", name: "MediBridge dossier", parties: "MediBridge × Impact Fund", access: "Invite only", docs: 9, status: "Active", updated: "1d ago" },
  { id: "r3", name: "Atlas Energy pilots", parties: "Atlas × 3 corporates", access: "Open", docs: 6, status: "Draft", updated: "4d ago" },
  { id: "r4", name: "Cohort 3 final", parties: "12 founders × panel", access: "Invite only", docs: 31, status: "Sealed", updated: "1w ago" },
];

export default function DealRooms() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deal Rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">Secure, permission‑tiered collaboration rooms with document Q&A and audit trails.</p>
        </div>
        <button type="button" className="btn btn-primary">
          <PlusIcon /> New room
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ROOMS.map((r) => (
          <div key={r.id} className="glass-card">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold tracking-tight">{r.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.parties}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{r.access}</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{r.docs} docs</span>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5">{r.status}</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Updated {r.updated}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => setOpen(open === r.id ? null : r.id)} className="btn btn-sm btn-secondary">
                  {open === r.id ? "Close" : "Open"}
                </button>
                <button type="button" className="btn btn-sm btn-ghost">
                  <Upload aria-hidden="true" className="size-4" /> Upload
                </button>
              </div>
            </div>
            {open === r.id ? (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Room activity</p>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Shield aria-hidden="true" className="size-4 text-brand-700" /> NDA executed · 3 parties</li>
                  <li className="flex items-center gap-2"><Users aria-hidden="true" className="size-4 text-brand-700" /> 4 members, 2 viewers</li>
                  <li className="flex items-center gap-2"><FolderLock aria-hidden="true" className="size-4 text-brand-700" /> Watermarking on · leak detection active</li>
                </ul>
                <Link to="/documents" className="btn btn-primary btn-sm mt-4">Ask the room AI</Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlusIcon() {
  return <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>;
}