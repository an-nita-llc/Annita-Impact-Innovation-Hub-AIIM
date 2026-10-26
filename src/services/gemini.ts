/**
 * AIIM AI Gateway & Gemini Production Integration
 * Checks for live VITE_GEMINI_API_KEY or VITE_OPENROUTER_API_KEY.
 * Discloses connection status to the user and provides fallback intelligence if unconfigured.
 */

const GEMINI_API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) || "";

const OPENROUTER_API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPENROUTER_API_KEY) || "";

export type AIConnectionStatus = {
  isConnected: boolean;
  provider: "openrouter" | "gemini" | "demo";
  label: string;
};

export function getAIConnectionStatus(): AIConnectionStatus {
  if (OPENROUTER_API_KEY) {
    return {
      isConnected: true,
      provider: "openrouter",
      label: "🟢 Live OpenRouter Gateway (Gemini 2.5)",
    };
  }
  if (GEMINI_API_KEY) {
    return {
      isConnected: true,
      provider: "gemini",
      label: "🟢 Live Google Gemini API Connected",
    };
  }
  return {
    isConnected: false,
    provider: "demo",
    label: "🟠 Demo Gateway Mode • Add VITE_GEMINI_API_KEY for Live API",
  };
}

export async function queryAIIM(prompt: string, context: string = "general"): Promise<string> {
  // 1. Try OpenRouter API if key is set
  if (OPENROUTER_API_KEY) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://annita-impact-innovation-hub-aiim.onrender.com",
          "X-Title": "AIIM Impact Innovation Hub",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "You are AIIM AI, the ecosystem intelligence assistant for Annita Impact Innovation Hub (AIIM). You assist African founders, VC funds, and corporate partners with fundraising, due diligence, pitch deck analysis, and startup valuation.",
            },
            { role: "user", content: `Context: ${context}\n\nQuery: ${prompt}` },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (err) {
      console.warn("OpenRouter API call failed, falling back to local gateway:", err);
    }
  }

  // 2. Try Gemini API if key is set
  if (GEMINI_API_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `System: You are AIIM AI, ecosystem intelligence for African venture capital and startups.\nContext: ${context}\nQuery: ${prompt}`,
                },
              ],
            },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local gateway:", err);
    }
  }

  // 3. Fallback to Demo Gateway with Disclosed Status Note
  const baseResponse = generateDomainResponse(prompt, context);
  return `${baseResponse}\n\n---\n*ℹ️ [AIIM AI Status: Operating in Demo Gateway Mode. Add VITE_GEMINI_API_KEY to environment variables to enable live Gemini API inference.]*`;
}

function generateDomainResponse(prompt: string, context: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("pitch") || p.includes("deck") || p.includes("solara")) {
    return `**AIIM AI Pitch Deck Analysis for Solara Climate OS**:
• **Traction Summary**: $420K ARR across 14 commercial utility pilots in West Africa.
• **IP Defensibility**: Proprietary grid-balancing ML algorithm cleared for deployment.
• **Investor Match Score**: 91% alignment with Climate & Energy Seed mandates ($500K–$1.5M).
• **Recommended Next Step**: Open Deal Room #r1 or launch Valuation Engine to model term sheet dilutive impact.`;
  }

  if (p.includes("valuation") || p.includes("berkus") || p.includes("vc method")) {
    return `**AIIM AI Multi-Methodology Valuation Summary**:
• **VC Method Post-Money**: $7.74M USD (Targeting $25M Exit at 30% IRR over 5 years).
• **Berkus Method Valuation**: $2.00M USD (4 of 5 risk criteria satisfied).
• **Consensus Pre-Money Range**: **$4.14M – $5.60M USD** ($4.87M Midpoint).
• **Action**: Export Valuation Memo from the Valuation Engine to share with syndicate leads.`;
  }

  if (p.includes("investor") || p.includes("vc") || p.includes("fund")) {
    return `**AIIM AI Investor Matching Summary**:
• **Top Matched Funds**: Northstar Ventures (91% thesis match), Impact Capital Fund I (87%), Frontier Angels (82%).
• **Active Check Ranges**: $250K to $1M lead check sizes for Seed-stage African startups.
• **Action**: Navigate to Deal Flow or request warm introductions via Ecosystem Messaging.`;
  }

  return `**AIIM AI Intelligence Breakdown for "${prompt}"**:

1. **Ecosystem Signal**: Strong traction detected across West African climate tech and healthcare innovation clusters.
2. **Diligence Status**: Mutual NDAs executed across 3 active deal rooms with dynamic watermarking active.
3. **Recommended Action**: Select a module from your workspace or launch a new match sprint in Deal Flow.`;
}