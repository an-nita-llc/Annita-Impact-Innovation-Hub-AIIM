import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string; time: string };

const SUGGESTIONS = [
  "Summarize Solara Climate OS pitch deck & traction",
  "Find investors for my $750K Seed raise in West Africa",
  "Draft a due diligence checklist for a B2B climate startup",
  "Compare term sheet terms between Northstar & Impact Fund",
];

export default function AskAIIM() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am AIIM Copilot. I analyze pitch decks, fund mandates, thesis scores, and due diligence archives across the AIIM ecosystem. How can I assist your venture today?",
      time: "Just now",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  function send(text?: string) {
    const content = (text ?? draft).trim();
    if (!content) return;

    const userMsg: Message = { role: "user", text: content, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((m) => [...m, userMsg]);
    setDraft("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        role: "assistant",
        text: `Analysis for "${content}":\n\n1. Thesis Alignment: Strong match detected with 3 active ecosystem funds in West Africa.\n2. Key Diligence Finding: IP clearing verified; 14 active utility pilots reported in Ghana and Nigeria.\n3. Next Steps: Recommend opening Deal Room #r1 or generating an AI memo for IC review.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((m) => [...m, aiMsg]);
    }, 800);
  }

  return (
    <div className="flex h-[calc(100dvh-130px)] sm:h-[650px] w-full flex-col gap-3">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Ask AIIM Copilot</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 flex items-center gap-1">
              <Sparkles className="size-3" /> Gemini 2.0
            </span>
          </div>
          <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">
            Market intelligence, deal diligence analysis, and ecosystem matching copilot.
          </p>
        </div>
      </div>

      {/* Main Chat Shell Container - Full Page Height */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3.5">
          {messages.map((m, i) => {
            const isAI = m.role === "assistant";
            return (
              <div key={i} className={`flex items-start gap-2.5 ${isAI ? "justify-start" : "justify-end"}`}>
                {isAI ? (
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs mt-1">
                    <Bot className="size-4" />
                  </div>
                ) : null}

                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs leading-relaxed shadow-xs ${
                    isAI
                      ? "bg-background border border-border/80 text-foreground"
                      : "bg-brand-600 text-white font-medium"
                  }`}
                >
                  {isAI ? (
                    <div className="mb-1.5 flex items-center justify-between gap-2 border-b border-border/60 pb-1 text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Sparkles className="size-3" /> AIIM Intelligence
                      </span>
                      <span className="text-muted-foreground">{m.time}</span>
                    </div>
                  ) : null}
                  <p className="whitespace-pre-line text-xs">{m.text}</p>
                </div>

                {!isAI ? (
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground font-bold text-xs mt-1">
                    U
                  </div>
                ) : null}
              </div>
            );
          })}

          {isTyping ? (
            <div className="flex items-center gap-2 text-xs font-bold text-brand-700 bg-brand-50 p-3 rounded-2xl w-fit border border-brand-200">
              <Sparkles className="size-4 animate-spin" />
              <span>Analyzing ecosystem documents...</span>
            </div>
          ) : null}
        </div>

        {/* Suggestion Prompts */}
        {messages.length === 1 ? (
          <div className="border-t border-border/60 bg-background/50 p-3 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">Suggested Prompts</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-xl border border-border/80 bg-surface px-3 py-2 text-left text-xs font-medium text-muted-foreground transition hover:border-brand-300 hover:text-foreground hover:bg-brand-50/50 active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Input Bar */}
        <div className="border-t border-border/80 p-2.5 sm:p-3 bg-surface shrink-0">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask AIIM copilot..."
              className="h-11 flex-1 rounded-xl border border-border bg-background px-3.5 text-xs outline-none focus:border-brand-500"
            />
            <button type="button" onClick={() => send()} className="btn btn-primary btn-sm px-4 h-11 min-h-[44px]">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}