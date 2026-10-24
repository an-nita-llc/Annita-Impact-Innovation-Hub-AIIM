import { useState } from "react";
import { ArrowLeft, MessageSquare, Search, Send } from "lucide-react";

type Thread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
};

const THREADS: Thread[] = [
  { id: "t1", name: "Solara × Northstar Ventures", role: "Deal Room #r1", preview: "Can you share the updated Q3 traction deck?", time: "2m ago", unread: 2 },
  { id: "t2", name: "Impact Capital IC Panel", role: "Diligence Review", preview: "Diligence checklist uploaded to room.", time: "1h ago", unread: 0 },
  { id: "t3", name: "Cohort 4 Founders Group", role: "Founders Lab", preview: "Demo Day logistics updated in events module.", time: "3h ago", unread: 1 },
  { id: "t4", name: "Atlas Energy Partnership", role: "Pilot Lead", preview: "Pilot milestone review confirmed for next Tuesday.", time: "1d ago", unread: 0 },
];

export default function Messages() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [draft, setDraft] = useState("");

  const activeThread = THREADS.find((t) => t.id === activeId)!;

  function selectThread(id: string) {
    setActiveId(id);
    setShowMobileChat(true);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Bar */}
      <div className="border-b border-border/60 pb-3">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Ecosystem Messaging</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Encrypted direct and deal room messages across founders, investors, and partners.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid gap-4 lg:grid-cols-[320px_1fr] h-[calc(100dvh-170px)] sm:h-[600px] rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs overflow-hidden">
        {/* Threads List Sidebar (hidden on mobile if chat active) */}
        <aside className={`border-r border-border/80 flex flex-col bg-background/40 ${showMobileChat ? "hidden lg:flex" : "flex"}`}>
          <div className="p-3 border-b border-border/60">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="h-10 w-full rounded-xl border border-border/80 bg-surface pl-8 pr-3 text-xs outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border/40">
            {THREADS.map((t) => {
              const selected = activeId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectThread(t.id)}
                  className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 active:scale-[0.99] ${
                    selected ? "bg-brand-50/80 border-l-4 border-brand-600" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white font-bold text-xs shadow-xs">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-xs font-bold text-foreground">{t.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{t.time}</span>
                    </div>
                    <p className="text-[10px] font-bold text-brand-700">{t.role}</p>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">{t.preview}</p>
                  </div>
                  {t.unread > 0 ? (
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[9px] font-bold text-white">
                      {t.unread}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Chat Panel View */}
        <section className={`flex flex-col h-full bg-surface ${!showMobileChat ? "hidden lg:flex" : "flex"}`}>
          {/* Thread Header */}
          <header className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-surface">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowMobileChat(false)}
                className="lg:hidden flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground"
                aria-label="Back to threads"
              >
                <ArrowLeft className="size-4" />
              </button>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">{activeThread.name}</p>
                <p className="text-[10px] font-semibold text-brand-700">{activeThread.role}</p>
              </div>
            </div>
          </header>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl border border-border/80 bg-muted/60 p-3 text-xs text-foreground leading-relaxed shadow-xs">
              Hi! Sharing the updated traction deck and financial model — let us know if you have any questions before Thursday's IC meeting.
            </div>

            <div className="ml-auto max-w-[85%] sm:max-w-[75%] rounded-2xl bg-brand-600 p-3 text-xs text-white leading-relaxed shadow-xs">
              Got it, reviewing now. IC meets Thursday at 10 AM — I’ll bring up the lead term sheet details.
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-2.5 sm:p-3 border-t border-border/80 bg-background/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a message..."
                className="h-11 flex-1 rounded-xl border border-border bg-surface px-3.5 text-xs outline-none focus:border-brand-500"
              />
              <button type="button" className="btn btn-primary btn-sm px-4 min-h-[44px]">
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}