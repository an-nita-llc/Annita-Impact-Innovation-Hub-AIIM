# AIIM Impact Innovation Hub

**Enter Raw. Leave Funded.**

AIIM Impact Innovation Hub is a Fortune-500-grade, AI-first platform that connects founders, investors, ecosystem partners, accelerators, and universities. It covers the full innovation lifecycle: AI deal matching, deal rooms, pilot governance, institutional memory, onboarding, and enterprise integrations.

Built as a proof of concept for the **Build With AI: Basics** hackathon using the Devpost Learn Skill Pack.

## Highlights

- **Auth & onboarding**: role selection (Founder / Investor / Partner), 3-step signup with OTP verification, per-role walkthrough forms.
- **AI deal flow**: explainable DealMatch scoring (sector, stage, check size, geography, thesis), conflict checks, rationale.
- **Pipeline & deal rooms**: Kanban across stages, NDA-gated rooms, document Q&A, audit trails.
- **Pilots & governance**: KPI tracking, go/no-go decisions, stage gates, institutional memory.
- **Evaluations**: multi-dimensional scorecards, consensus, decision records.
- **Enterprise surface**: audit logs, billing & usage metering, integrations/API/webhooks, trust center, status page, admin console.
- **Quality**: ErrorBoundary, code-splitting, SEO/GEO metadata, robots/sitemap, favicon, themed loader.

## Tech stack

- React 19 + TypeScript
- Vite 6 + Tailwind CSS 4
- React Router 7
- Lucide icons

## Getting started

Prerequisites: Node.js 18+.

```bash
npm install
npm run dev
```

The dev server starts on the first free port (default 3000). Open the printed URL.

## Build

```bash
npm run build      # production build (dist/)
npm run preview    # preview the production build
npm run lint       # TypeScript check
```

## Environment

Copy `.env.example` to `.env.local` and fill in values (e.g. `GEMINI_API_KEY`). All auth and deal-match AI calls are stubbed in this proof of concept.

## Project structure

```
src/
  components/    Reusable UI (auth shell, brand, navigation, module placeholder, SEO)
  context/       Auth + theme providers
  lib/auth/      Auth client + device beacon (stubbed)
  pages/         All route pages
  services/      Gemini service wrapper
public/          Static assets, favicon, robots.txt, sitemap.xml
scope.md, prd.md, spec.md   Planning docs
```

## Planning docs

- `scope.md` — project scope and vision
- `prd.md` — product requirements
- `spec.md` — technical specification

## License

See `LICENSE`.

---

Built with the Devpost Learn Skill Pack. Production enterprise integrations, SSO/KYC/SOC2 controls, and live AI backends are intended for the next phase.