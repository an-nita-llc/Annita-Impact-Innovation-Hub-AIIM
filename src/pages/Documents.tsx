import { FileText, FolderOpen, Upload, Download, Search } from "lucide-react";
import { useState } from "react";

type Doc = { id: string; name: string; category: string; owner: string; size: string; updated: string };
const DOCS: Doc[] = [
  { id: "dc1", name: "Pitch Deck — Solara v4", category: "Pitch", owner: "Solara", size: "4.2MB", updated: "1d" },
  { id: "dc2", name: "Term Sheet Template (SAFE)", category: "Legal", owner: "Platform", size: "180KB", updated: "2w" },
  { id: "dc3", name: "Q3 Financials — MediBridge", category: "Financials", owner: "MediBridge", size: "1.1MB", updated: "5d" },
  { id: "dc4", name: "Due Diligence Checklist", category: "Toolkit", owner: "Platform", size: "260KB", updated: "3w" },
  { id: "dc5", name: "NDAs & confidentiality", category: "Legal", owner: "Platform", size: "90KB", updated: "1m" },
];

export default function Documents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const cats = ["All", "Pitch", "Financials", "Legal", "Toolkit"];
  const filtered = DOCS.filter((d) => (category === "All" || d.category === category) && (!query || d.name.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">Shared templates, resources, and public knowledge.</p>
        </div>
        <button type="button" className="btn btn-primary">
          <Upload aria-hidden="true" className="size-4" /> Upload
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search documents…" className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" />
        </div>
        <div className="flex gap-2">
          {cats.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={`min-h-9 rounded-lg px-3 text-xs font-medium transition ${category === c ? "bg-brand-600 text-white" : "border border-border bg-surface text-muted-foreground hover:text-foreground"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText aria-hidden="true" className="size-4 text-brand-700" />
                    <span className="font-medium">{d.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{d.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.owner}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.size}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.updated}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-brand-700 hover:underline"><Download aria-hidden="true" className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}