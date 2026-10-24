import { useState } from "react";
import { Download, FileText, Search, Upload } from "lucide-react";

type Doc = {
  id: string;
  name: string;
  category: string;
  owner: string;
  size: string;
  updated: string;
};

const DOCS: Doc[] = [
  { id: "dc1", name: "Pitch Deck — Solara Climate OS v4", category: "Pitch", owner: "Solara Team", size: "4.2 MB", updated: "1d ago" },
  { id: "dc2", name: "Standard SAFE Term Sheet Template", category: "Legal", owner: "AIIM Legal", size: "180 KB", updated: "2w ago" },
  { id: "dc3", name: "Q3 Audited Financials — MediBridge", category: "Financials", owner: "MediBridge", size: "1.1 MB", updated: "5d ago" },
  { id: "dc4", name: "Institutional Due Diligence Checklist", category: "Toolkit", owner: "Platform", size: "260 KB", updated: "3w ago" },
  { id: "dc5", name: "Ecosystem Mutual NDA Template", category: "Legal", owner: "Platform", size: "90 KB", updated: "1m ago" },
];

export default function Documents() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Pitch", "Financials", "Legal", "Toolkit"];

  const filtered = DOCS.filter(
    (d) =>
      (categoryFilter === "All" || d.category === categoryFilter) &&
      (!query || d.name.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Document Repository</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Shared templates, diligence toolkits, legal SAFE agreement formats, and public resources.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Upload className="size-4" /> Upload Document
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents by name..."
            className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none rounded-xl border border-border/80 bg-background/60 p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                categoryFilter === cat
                  ? "bg-surface text-foreground shadow-xs border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table / Cards */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xs w-full">
        {/* Mobile View */}
        <div className="flex flex-col divide-y divide-border/60 sm:hidden">
          {filtered.map((d) => (
            <div key={d.id} className="p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <FileText className="size-4 text-brand-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{d.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{d.category} • {d.owner} • {d.size}</p>
                </div>
              </div>
              <button type="button" className="btn btn-ghost btn-sm px-2 shrink-0" aria-label="Download">
                <Download className="size-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden sm:table w-full text-xs">
          <thead className="border-b border-border/80 bg-background/60 font-bold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3.5 text-left">Document Name</th>
              <th className="p-3.5 text-left">Category</th>
              <th className="p-3.5 text-left">Owner</th>
              <th className="p-3.5 text-left">File Size</th>
              <th className="p-3.5 text-left">Last Updated</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-muted/40 transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-brand-600 shrink-0" />
                    <span className="font-bold text-foreground">{d.name}</span>
                  </div>
                </td>
                <td className="p-3.5 text-muted-foreground font-medium">{d.category}</td>
                <td className="p-3.5 text-muted-foreground font-medium">{d.owner}</td>
                <td className="p-3.5 text-muted-foreground font-mono">{d.size}</td>
                <td className="p-3.5 text-muted-foreground">{d.updated}</td>
                <td className="p-3.5 text-right">
                  <button type="button" className="btn btn-ghost btn-sm">
                    <Download className="size-3.5" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}