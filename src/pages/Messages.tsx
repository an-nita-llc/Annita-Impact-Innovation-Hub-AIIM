import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

type Thread = { id: string; name: string; preview: string; time: string; unread: number };

const THREADS: Thread[] = [
  { id: "t1", name: "Solara × Northstar", preview: "Can you share the Q3 traction deck?", time: "2m", unread: 2 },
  { id: "t2", name: "Impact Fund IC", preview: "Diligence checklist attached.", time: "1h", unread: 0 },
  { id: "t3", name: "Cohort 3 founders", preview: "Demo Day logistics updated.", time: "3h", unread: 1 },
  { id: "t4", name: "Atlas Energy partnership", preview: "Pilot milestone review next week.", time: "1d", unread: 0 },
];

export default function Messages() {
  const [active, setActive] = useState(THREADS[0].id);
  const [draft, setDraft] = useState("");

  const thread = THREADS.find((t) => t.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Direct and group conversations across the ecosystem.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <aside className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-4 py-3">
            <input placeholder="Search conversations…" className="min-h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand-500" />
          </div>
          <ul className="max-h-[520px] overflow-y-auto">
            {THREADS.map((t) => (
              <li key={t.id}>
                <button type="button" onClick={() => setActive(t.id)} className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${active === t.id ? "bg-brand-50" : "hover:bg-muted"}`}>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><MessageSquare aria-hidden="true" className="size-4" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{t.name}</p>
                      <span className="text-[10px] text-muted-foreground">{t.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{t.preview}</p>
                  </div>
                  {t.unread > 0 ? <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">{t.unread}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex min-h-[420px] flex-col rounded-xl border border-border bg-surface">
          <header className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">{thread.name}</p>
            <p className="text-xs text-muted-foreground">Active thread</p>
          </header>
          <div className="flex-1 px-4 py-4">
            <div className="mb-4 max-w-[75%] rounded-2xl border border-border bg-muted px-4 py-2.5 text-sm">Hi! Sharing the updated traction deck — let me know questions.</div>
            <div className="ml-auto mb-4 max-w-[75%] rounded-2xl bg-brand-600 px-4 py-2.5 text-sm text-white">Got it, reviewing now. IC meets Thursday — I’ll bring it up.</div>
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message…" className="min-h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-500" />
              <button type="button" className="btn btn-primary btn-sm">
                <Send aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}