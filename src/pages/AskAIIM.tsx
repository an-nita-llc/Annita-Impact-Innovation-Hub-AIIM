import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Summarize the Solara climate OS pitch deck",
  "Which investors match my Series A raise?",
  "Draft a diligence checklist for a climate startup",
  "Compare these three term sheets",
];

export default function AskAIIM() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I’m AIIM’s copilot. Ask me about market intelligence, deal diligence, matching, or platform help." },
  ]);
  const [draft, setDraft] = useState("");

  function send(text?: string) {
    const content = (text ?? draft).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", text: content }]);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: `Great question. Here’s a starting point for “${content}”: I can pull relevant founders, investors, and documents, then draft a structured answer with citations. (Demo response — wire Gemini to enable live analysis.)` }]);
    }, 500);
  }

  return (
    <div className="flex h-[70vh] flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ask AIIM</h1>
        <p className="mt-1 text-sm text-muted-foreground">AI assistant for market intelligence, due diligence, and deal help.</p>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "assistant" ? "self-start bg-muted text-foreground" : "self-end bg-brand-600 text-white"}`}>
                {m.role === "assistant" ? <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand-700"><Sparkles aria-hidden="true" className="size-3" /> AIIM</span> : null}
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
        {messages.length === 1 ? (
          <div className="border-t border-border px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-brand-300 hover:text-foreground">{s}</button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="border-t border-border p-3">
          <div className="flex gap-2">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything…" className="min-h-11 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-500" />
            <button type="button" onClick={() => send()} className="btn btn-primary btn-sm">
              <Send aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}