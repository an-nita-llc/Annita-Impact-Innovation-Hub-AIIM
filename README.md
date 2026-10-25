# AIIM — Annita Impact Innovation Hub

**Enter Raw. Leave Funded.**

AIIM is an AI-core venture capital & innovation ecosystem platform designed to unlock African venture capital by connecting startups, global investors, corporate partners, and university incubators. It covers the full venture lifecycle: AI pitch due diligence, multi-methodology startup valuation, NDA-gated deal rooms, corporate pilot governance, and pan-African ecosystem mapping.

Built for the **Build With AI: Basics** hackathon using the Devpost Learn Skill Pack.

---

## 🌟 Key Highlights & Hackathon Features

### 1. 🎯 Interactive Demo Role Selector for Judges
- On the Sign-In page (`/login`), submitting credentials triggers an interactive **Demo Persona Role Selector Modal**:
  - 🚀 **Founder Role**: *Amina Diallo (Solara Climate OS)* $\rightarrow$ Redirects to Founder Dashboard.
  - 💼 **Investor / VC Role**: *James Kollie (Northstar Ventures)* $\rightarrow$ Redirects to Deal Flow AI (`/deal-flow`).
  - 🏢 **Corporate Partner Role**: *Global Partner (Atlas Energy)* $\rightarrow$ Redirects to Live Pilots (`/pilots`).
  - 🎓 **Incubator / University Admin Role**: *Arthur Kollie (LU Admin)* $\rightarrow$ Redirects to Incubator Cohorts (`/programs`).
  - 🛡️ **Platform Governance Admin Role**: *System Admin (AIIM)* $\rightarrow$ Redirects to Admin Console (`/admin`).

### 2. 🧮 Multi-Methodology Startup Valuation Engine (`/valuation`)
- Combines institutional venture capital valuation formulas:
  $$\text{Post-Money Valuation} = \left(\frac{\text{Expected Exit Value}}{(1 + \text{Target IRR})^{\text{Years}}}\right) \times \text{Scorecard Factor}$$
- **VC Method Model**: Sliders for Exit Valuation ($5M–$100M), Target IRR (15%–60%), Holding Years, and Scorecard Multiplier.
- **Berkus Method Model**: Milestone checkboxes ($0.5M each for Sound Idea, Working MVP, Management Team, Strategic Alliances, Commercial Rollout).
- **Export Valuation Memo**: Calculates consensus valuation ranges and exports formatted memos.

### 3. 🌐 Pan-African Innovation Map (`/innovation-map`)
- Visual ecosystem locator mapping active venture clusters across Sub-Saharan Africa:
  - **Monrovia (Liberia)**, **Accra (Ghana)**, **Lagos (Nigeria)**, **Nairobi (Kenya)**, **Johannesburg (South Africa)**, **Kigali (Rwanda)**.
- Tracks $229.9M active ecosystem volume, live funding rounds, partner incubators, and top sectors per hub.

### 4. 🤖 ChatGPT-Style AIIM AI Gateway (`/ask-aiim`)
- Unconstrained edge-to-edge full-page chat canvas.
- Features left thread drawer (*New Chat Thread*, *Saved Conversations*), centered message feed, fixed bottom input container, attachment triggers, and mobile keyboard alignment (`interactive-widget=resizes-content`).

### 5. 📱 Mobile-First PWA & 5-Button Role Bottom Nav
- **5-Button Role Bottom Nav**:
  `[ Item 1 | Item 2 | ✨ AIIM AI (Center) | Item 3 | Item 4 ]`
- **iOS Auto-Zoom Fix**: All form inputs use `16px` font size on mobile.
- **Touch Haptics & Clearance**: All action controls use 44px–48px touch targets with `active:scale-[0.98]` press feedback.
- **Service Worker & Manifest**: PWA Service Worker (`public/sw.js`) and Web Manifest (`public/manifest.json`).

---

## 🔒 Role-Based Navigation Isolation

Navigation links in the Sidebar, Hamburger Drawer, and Bottom Nav are 100% isolated by persona role:

- **Founders**: Dashboard, Investors Directory, Deal Rooms, Valuation Engine, AIIM AI, Innovation Map, Programs, Events, Messages.
- **Investors**: Dashboard, Deal Flow AI Matches, Pipeline Kanban, Deal Rooms, Valuation Engine, AIIM AI, Founder Directory, Portfolio Analytics.
- **Corporate Partners**: Dashboard, Open Innovation Challenges, Live Pilots, Tech Scouting, AIIM AI, Founder Directory, Idea Management.
- **Incubator Admins**: Dashboard, Incubator Cohorts, Student Founders, Innovation Map, AIIM AI, Demo Days, Research IP Docs.
- **Platform Admins**: Admin Console, User Verification Queue, Audit Log, Billing & Metering, System Health, Trust Center.

---

## 🚀 Render Deployment Setup

Pre-configured for 1-click deployment on **Render**:

1. **`render.yaml` Blueprint**:
   - Native static site configuration (`buildCommand: npm run build`, `staticPublishPath: ./dist`, rewrite rule `/*` $\rightarrow$ `/index.html`).
2. **Production Express Server (`server.js`)**:
   - `node server.js` runs on `process.env.PORT || 3003` with client-side SPA routing fallback.
3. **Lockfile & Workspace Verification**:
   - `pnpm-lock.yaml` and `pnpm-workspace.yaml` verified against `pnpm install --frozen-lockfile`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Vite 8, React Router 7.
- **Styling & Motion**: Tailwind CSS v4, Framer Motion 14, Lucide React Icons.
- **Production Server**: Node.js, Express 5.
- **Deployment**: Render, GitHub Actions.
- **AI Gateway**: OpenRouter & Gemini AI.

---

## 📋 Planning & Skill Docs

- `scope.md` — Project Scope & Vision
- `prd.md` — Product Requirements Document
- `spec.md` — Technical Specification

---

## 📄 License

Built with the Devpost Learn Skill Pack for the **Build With AI: Basics** hackathon. See `LICENSE` for details.