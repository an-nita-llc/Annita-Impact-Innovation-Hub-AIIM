# Technical Specification: AIIM Impact Innovation Hub

## 1. Architecture Overview
The platform uses a modern, modular, component-driven client architecture built on React 19, TypeScript, and Vite 6, styled with Tailwind CSS v4, and powered by Google's `@google/genai` SDK for client-side and edge AI inferencing.

```
+-----------------------------------------------------------------------+
|                           User Interface                              |
|   React 19 + React Router v7 + Framer Motion + Lucide React Icons     |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    State & Context Management                         |
|         AuthContext (RBAC)  |  ThemeContext (Dark/Light)           |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                           Services Layer                              |
|           gemini.ts (@google/genai SDK)  |  Data Constants            |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                          External APIs                                |
|                   Google Gemini API (Gemini 2.5)                      |
+-----------------------------------------------------------------------+
```

---

## 2. Technology Stack & Dependencies

| Layer | Tool / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19.0 + TypeScript 5.8 | Core reactive UI engine |
| **Build Tool** | Vite 6.2 | Fast ESM bundling and HMR |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design |
| **Routing** | React Router v7 | Client-side page navigation & route guards |
| **Animations** | Framer Motion 12 | Smooth page transitions and modal animations |
| **AI Integration**| `@google/genai` v1.29 | Generative AI deal room insights & due diligence |
| **Icons** | Lucide React | Clean, scalable enterprise iconography |

---

## 3. Module Breakdown

### 3.1 AI Service (`src/services/gemini.ts`)
Interacts with Google Gemini models using `@google/genai`. Provides:
- `analyzePitchDeck(deckData: string)`: Generates structured strengths, weaknesses, valuation score, and investor readiness index.
- `generateValuationReport(metrics: ValuationMetrics)`: Calculates score range and key growth drivers.
- `chatWithAIAdvisor(message: string, context: string)`: Real-time deal room assistant for term sheet negotiations.

### 3.2 Role-Based Access Control (`src/context/AuthContext.tsx`)
Manages session states and permissions for 5 roles:
1. `FOUNDER`: Access to pitch builder, valuation engine, and investor search.
2. `INVESTOR`: Access to deal room feed, due diligence reports, and negotiation room.
3. `PARTNER`: Access to perk management and program listings.
4. `SCHOOL_ADMIN`: Access to university incubator dashboard and student founder pipeline.
5. `ADMIN`: System-wide analytics and user management.

---

## 4. Security & Best Practices
- **API Key Protection:** `GEMINI_API_KEY` injected via Vite environment configuration (`loadEnv`).
- **Clean Code Architecture:** Strong typing across components, models, and custom hooks.
- **PWA Capabilities:** Service worker caching for fast reloads and offline banner notice.
