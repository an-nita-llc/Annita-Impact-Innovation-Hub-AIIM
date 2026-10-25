import { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCheck, Paperclip, Search, Send, ShieldCheck } from "lucide-react";

type Message = {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
};

type Thread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  messages: Message[];
};

const INITIAL_THREADS: Thread[] = [
  {
    id: "t1",
    name: "Solara × Northstar Ventures",
    role: "Deal Room #r1 • Seed Round",
    preview: "Can you share the updated Q3 traction deck?",
    time: "2m ago",
    unread: 2,
    online: true,
    avatar: "S",
    messages: [
      { id: "m1", sender: "them", text: "Hi! Sharing the updated traction deck and financial model — let us know if you have questions before Thursday's IC meeting.", time: "10:30 AM" },
      { id: "m2", sender: "me", text: "Got it, reviewing now. IC meets Thursday at 10 AM — I’ll bring up the lead term sheet details.", time: "10:32 AM" },
      { id: "m3", sender: "them", text: "Can you share the updated Q3 traction deck?", time: "10:40 AM" },
    ],
  },
  {
    id: "t2",
    name: "Impact Capital IC Panel",
    role: "Diligence Review Committee",
    preview: "Diligence checklist uploaded to room.",
    time: "1h ago",
    unread: 0,
    online: false,
    avatar: "I",
    messages: [
      { id: "m1", sender: "them", text: "Diligence checklist uploaded to deal room #r2. IP clearing verified.", time: "09:15 AM" },
      { id: "m2", sender: "me", text: "Thank you! I will review the utility pilot reports today.", time: "09:20 AM" },
    ],
  },
  {
    id: "t3",
    name: "Cohort 4 Founders Group",
    role: "Founders Lab Accelerator",
    preview: "Demo Day logistics updated in events module.",
    time: "3h ago",
    unread: 1,
    online: true,
    avatar: "C",
    messages: [
      { id: "m1", sender: "them", text: "Demo Day logistics updated in events module. Please check your presentation slot.", time: "08:00 AM" },
    ],
  },
  {
    id: "t4",
    name: "Atlas Energy Partnership",
    role: "Corporate Pilot Lead",
    preview: "Pilot milestone review confirmed for next Tuesday.",
    time: "1d ago",
    unread: 0,
    online: false,
    avatar: "A",
    messages: [
      { id: "m1", sender: "them", text: "Pilot milestone review confirmed for next Tuesday at 2 PM GMT.", time: "Yesterday" },
      { id: "m2", sender: "me", text: "Confirmed. Our engineering leads will join the session.", time: "Yesterday" },
    ],
  },
];

export default function Messages() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeId, setActiveId] = useState<string>("t1");
  const [showMobileChat, setShowMobileChat] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [draft, setDraft] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeThread = threads.find((t) => t.id === activeId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, threads]);

  function selectThread(id: string) {
    setActiveId(id);
    setShowMobileChat(true);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: 0 } : t)),
    );
  }

  function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!draft.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: draft.trim(),
      time: timeStr,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeId) {
          return {
            ...t,
            preview: draft.trim(),
            time: "Just now",
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      }),
    );

    setDraft("");
  }

  const filteredThreads = threads.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.role.toLowerCase().includes(query.toLowerCase()) ||
      t.preview.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4 w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-0 overflow-hidden bg-surface">
      {/* Header Bar - Vertical Stacked */}
      <div className="border-b border-border/60 pb-3 px-4 pt-3 shrink-0 flex flex-col items-start gap-1.5 w-full">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Ecosystem Messaging</h1>
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
            <ShieldCheck className="size-3" /> End-to-End Encrypted
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Direct deal room messaging across founders, investors, and corporate partners.
        </p>
      </div>

      {/* Main WhatsApp-Style Container */}
      <div className="flex flex-1 min-h-0 w-full bg-surface border-t border-border/80 overflow-hidden">
        {/* Left Sidebar Thread List (Hidden on mobile when chat is active) */}
        <aside
          className={`w-full lg:w-80 flex flex-col border-r border-border/80 bg-background/40 shrink-0 ${
            showMobileChat ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Search Conversations Input Bar */}
          <div className="p-3 border-b border-border/60 bg-surface shrink-0">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations..."
                className="h-10 w-full rounded-xl border border-border/80 bg-background pl-8 pr-3 text-xs outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/40 scrollbar-thin">
            {filteredThreads.map((t) => {
              const selected = activeId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectThread(t.id)}
                  className={`w-full p-3.5 text-left transition-all flex items-start gap-3 active:scale-[0.99] ${
                    selected ? "bg-brand-50/90 border-l-4 border-brand-600" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-xs shadow-xs">
                      {t.avatar}
                    </div>
                    {t.online ? (
                      <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-surface" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-xs font-bold text-foreground">{t.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{t.time}</span>
                    </div>
                    <p className="text-[10px] font-bold text-brand-700 truncate mt-0.5">{t.role}</p>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">{t.preview}</p>
                  </div>

                  {t.unread > 0 ? (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white shadow-xs">
                      {t.unread}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Active Conversation View (Hidden on mobile when no chat active) */}
        <section
          className={`flex-1 flex flex-col h-full bg-surface min-w-0 ${
            !showMobileChat ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Active Chat Header */}
          <header className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-surface shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMobileChat(false)}
                className="lg:hidden flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="size-4" />
              </button>

              <div className="flex size-10 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-xs shadow-xs shrink-0">
                {activeThread.avatar}
              </div>

              <div>
                <p className="text-xs sm:text-sm font-extrabold text-foreground leading-tight">{activeThread.name}</p>
                <p className="text-[10px] font-semibold text-brand-700 flex items-center gap-1">
                  <span>{activeThread.role}</span>
                  <span>•</span>
                  <span className={activeThread.online ? "text-emerald-600 font-bold" : "text-muted-foreground"}>
                    {activeThread.online ? "Online" : "Offline"}
                  </span>
                </p>
              </div>
            </div>
          </header>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-background/40 scrollbar-thin">
            {activeThread.messages.map((m) => {
              const isMe = m.sender === "me";
              return (
                <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? "bg-brand-600 text-white rounded-tr-none font-medium"
                        : "bg-surface border border-border/80 text-foreground rounded-tl-none font-medium"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    <div className={`mt-1 flex items-center justify-end gap-1 text-[9px] font-medium ${isMe ? "text-white/80" : "text-muted-foreground"}`}>
                      <span>{m.time}</span>
                      {isMe ? <CheckCheck className="size-3 text-white" /> : null}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-border/80 bg-surface shrink-0">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                title="Attach diligence file or NDA"
              >
                <Paperclip className="size-4" />
              </button>

              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message or share diligence update..."
                className="h-11 flex-1 rounded-xl border border-border bg-background px-3.5 text-xs sm:text-sm outline-none focus:border-brand-500 font-medium"
              />

              <button
                type="submit"
                disabled={!draft.trim()}
                className="flex size-11 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40 transition-all hover:bg-brand-700 active:scale-95 shrink-0"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}