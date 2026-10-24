import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  Bot,
  ChevronRight,
  MessageSquare,
  Paperclip,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

type Message = { id: string; role: "user" | "assistant"; text: string; time: string };

const INITIAL_SUGGESTIONS = [
  "Summarize Solara Climate OS pitch deck & key traction metrics",
  "Which VC funds match my $750K Seed raise in West Africa?",
  "Draft a due diligence checklist for an early-stage B2B startup",
  "Calculate valuation using Berkus Method for pre-seed startup",
];

export default function AskAIIM() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Hello! I am **AIIM AI**, your ecosystem intelligence assistant. I analyze pitch decks, fund mandates, thesis scores, and due diligence archives across West, East, and Southern Africa. How can I assist your venture or fund today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threads, setThreads] = useState<string[]>(["Solara Pitch Due Diligence", "West Africa Seed Fund Matching"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: `Here is the AIIM AI breakdown for "${content}":\n\n1. **Key Intelligence**: Strong match detected with 3 active ecosystem funds in West Africa.\n2. **Diligence Insight**: IP clearing verified; 14 active commercial utility pilots reported in Ghana and Nigeria.\n3. **Recommended Next Action**: Open Deal Room #r1 or launch Valuation Engine to calculate pre-money terms.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  }

  function handleNewChat() {
    setMessages([
      {
        id: `m-${Date.now()}`,
        role: "assistant",
        text: "Started new conversation with **AIIM AI**. What would you like to analyze or search?",
        time: "Just now",
      },
    ]);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] w-full flex-col bg-surface border-0 shadow-none overflow-hidden">
      {/* Full Page ChatGPT Style Layout */}
      <div className="flex h-full w-full">
        {/* Left Sidebar Threads Drawer (Desktop & Tablet) */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border/80 bg-background/40 p-3 justify-between shrink-0">
          <div>
            <button
              type="button"
              onClick={handleNewChat}
              className="btn btn-secondary btn-block justify-start text-xs font-bold gap-2 bg-surface min-h-[44px]"
            >
              <Plus className="size-4 text-brand-600" />
              <span>New Chat Thread</span>
            </button>

            <div className="mt-4">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Recent AI Conversations</p>
              <ul className="space-y-1">
                {threads.map((t, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors text-left truncate"
                    >
                      <MessageSquare className="size-3.5 shrink-0 text-brand-600" />
                      <span className="truncate">{t}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/60 pt-3">
            <button
              type="button"
              onClick={() => setMessages([])}
              className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-danger transition-colors font-medium"
            >
              <Trash2 className="size-3.5" />
              <span>Clear Current Chat</span>
            </button>
          </div>
        </aside>

        {/* Main Full Page Conversation Stream Panel */}
        <main className="flex flex-1 flex-col h-full bg-surface justify-between min-w-0">
          {/* Top Bar Header */}
          <header className="flex items-center justify-between border-b border-border/80 px-4 py-3 bg-surface shrink-0">
            <div className="flex items-center gap-2">
              <LogoMark size="sm" full={false} />
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-foreground flex items-center gap-1.5">
                  <span>AIIM AI</span>
                  <span className="rounded-full bg-brand-50 border border-brand-200 px-2 py-0.2 text-[9px] font-bold text-brand-700 uppercase">
                    Model Gateway
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNewChat}
              className="md:hidden btn btn-secondary btn-sm min-h-[36px] text-xs font-bold gap-1"
            >
              <Plus className="size-3.5" />
              <span>New</span>
            </button>
          </header>

          {/* Scrollable Full-Page Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((m) => {
                const isAI = m.role === "assistant";
                return (
                  <div key={m.id} className="flex items-start gap-3 sm:gap-4">
                    {isAI ? (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xs mt-0.5">
                        <Sparkles className="size-4" />
                      </div>
                    ) : (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground font-bold text-xs mt-0.5">
                        <User className="size-4" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        <span className={isAI ? "text-brand-700 font-extrabold" : "text-foreground"}>
                          {isAI ? "AIIM AI" : "You"}
                        </span>
                        <span>•</span>
                        <span>{m.time}</span>
                      </div>

                      <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isAI ? "bg-background border border-border/80 text-foreground" : "bg-brand-50/70 border border-brand-200 text-foreground font-medium"
                      }`}>
                        <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping ? (
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-xs">
                    <Sparkles className="size-4 animate-spin" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-background border border-border/80 text-xs font-bold text-brand-700 flex items-center gap-2">
                    <RefreshCw className="size-3.5 animate-spin text-brand-600" />
                    <span>AIIM AI is generating response...</span>
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Bottom Centered Chat Prompt Input Box */}
          <div className="p-3 sm:p-4 border-t border-border/80 bg-background/50 shrink-0">
            <div className="max-w-3xl mx-auto space-y-3">
              {/* Prompt Suggestions Pills */}
              {messages.length <= 2 ? (
                <div className="flex flex-wrap gap-2">
                  {INITIAL_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSend(s)}
                      className="rounded-xl border border-border/80 bg-surface px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:border-brand-300 hover:text-foreground transition-all active:scale-[0.98]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              {/* Chat Input Field Box */}
              <div className="relative flex items-center rounded-2xl border border-border/80 bg-surface shadow-xs focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10">
                <button
                  type="button"
                  className="pl-3.5 text-muted-foreground hover:text-foreground"
                  title="Attach file or pitch deck"
                >
                  <Paperclip className="size-4" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask AIIM AI anything about deals, startups, valuation, or due diligence..."
                  className="h-12 flex-1 bg-transparent px-3 text-xs sm:text-sm outline-none font-medium"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="mr-2 flex size-8 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40 transition-all hover:bg-brand-700 active:scale-95"
                >
                  <ArrowUp className="size-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-muted-foreground font-medium">
                AIIM AI can make mistakes. Verify important financial & due diligence data.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}