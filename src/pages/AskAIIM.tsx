import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  MessageSquare,
  Paperclip,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { getAIConnectionStatus, queryAIIM } from "@/services/gemini";

type Message = { id: string; role: "user" | "assistant"; text: string; time: string };

export default function AskAIIM() {
  const status = getAIConnectionStatus();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "assistant",
      text: `Hello! I am **AIIM AI**, your ecosystem intelligence assistant. I analyze pitch decks, fund mandates, thesis scores, and due diligence archives across Sub-Saharan Africa.\n\n*${status.label}*`,
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

  async function handleSend(text?: string) {
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

    const responseText = await queryAIIM(content, "Ecosystem Intelligence Assistant");

    setIsTyping(false);
    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, aiMsg]);
  }

  function handleNewChat() {
    setMessages([
      {
        id: `m-${Date.now()}`,
        role: "assistant",
        text: `Started new conversation with **AIIM AI**.\n\n*${status.label}*`,
        time: "Just now",
      },
    ]);
  }

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-0 w-full flex-col bg-surface border-0 shadow-none overflow-hidden">
      {/* Full Page Stable ChatGPT Style Layout */}
      <div className="flex h-full w-full min-h-0">
        {/* Left Sidebar Threads Drawer */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border/80 bg-background/50 p-3 justify-between shrink-0">
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

        {/* Main Conversation Stream Panel */}
        <main className="flex flex-1 flex-col h-full min-h-0 bg-surface justify-between min-w-0">
          {/* Top Bar Header with AI Status Badge */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/80 px-4 py-3 bg-surface shrink-0 gap-2">
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

            {/* AI Status Badge */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  status.isConnected
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                {status.label}
              </span>

              <button
                type="button"
                onClick={handleNewChat}
                className="md:hidden btn btn-secondary btn-sm min-h-[36px] text-xs font-bold gap-1"
              >
                <Plus className="size-3.5" />
                <span>New</span>
              </button>
            </div>
          </header>

          {/* Scrollable Conversation Stream */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-6 scrollbar-thin">
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
                      <div className="flex flex-col gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        <span className={isAI ? "text-brand-700 font-extrabold" : "text-foreground"}>
                          {isAI ? "AIIM AI" : "You"}
                        </span>
                        <span className="text-[9px] text-muted-foreground">{m.time}</span>
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

          {/* Bottom Chat Prompt Input */}
          <div className="p-3 sm:p-4 border-t border-border/80 bg-background/90 backdrop-blur-md shrink-0">
            <div className="max-w-3xl mx-auto space-y-2">
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