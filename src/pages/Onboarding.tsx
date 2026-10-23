import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

type FieldType = "text" | "email" | "textarea" | "select" | "number";
type Field = { key: string; label: string; type: FieldType; required?: boolean; placeholder?: string; options?: string[]; hint?: string };
type Step = { title: string; description: string; fields: Field[] };

const FOUNDER_STEPS: Step[] = [
  {
    title: "Basic profile",
    description: "Identity and contact information.",
    fields: [
      { key: "fullName", label: "Full name", type: "text", required: true },
      { key: "title", label: "Title / position", type: "text", required: true, placeholder: "CEO, Co-founder…" },
      { key: "phone", label: "Phone number", type: "text" },
      { key: "location", label: "Location (city, country)", type: "text", required: true },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
      { key: "website", label: "Personal website", type: "text" },
      { key: "bio", label: "Short bio", type: "textarea", hint: "2–3 sentences." },
    ],
  },
  {
    title: "Company profile",
    description: "Core company information.",
    fields: [
      { key: "companyName", label: "Company (startup) name", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text", required: true, placeholder: "One sentence describing what you do" },
      { key: "companyWebsite", label: "Company website", type: "text" },
      { key: "founded", label: "Founded (year)", type: "text" },
      { key: "hq", label: "Headquarters", type: "text" },
      { key: "legalEntity", label: "Legal entity name", type: "text" },
      { key: "problem", label: "Problem you solve", type: "textarea", required: true },
      { key: "solution", label: "Your solution", type: "textarea", required: true },
      { key: "targetMarket", label: "Target market", type: "text" },
      { key: "businessModel", label: "Business model", type: "text" },
    ],
  },
  {
    title: "Industry & stage",
    description: "Classification and current status.",
    fields: [
      { key: "industry", label: "Primary industry", type: "select", required: true, options: ["Technology", "Healthcare", "Climate", "Fintech", "Agtech", "Education", "Other"] },
      { key: "stage", label: "Company stage", type: "select", required: true, options: ["Idea", "MVP", "Early (post-MVP)", "Growth", "Scaling"] },
      { key: "fundingStage", label: "Funding stage", type: "select", required: true, options: ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+"] },
      { key: "revenueStatus", label: "Revenue status", type: "select", options: ["Pre-revenue", "Early revenue", "Revenue generating", "Profitable"] },
      { key: "teamSize", label: "Team size", type: "select", options: ["Solo", "2–3", "4–7", "8–15", "15+"] },
      { key: "cofounders", label: "Co-founders & roles", type: "textarea" },
    ],
  },
  {
    title: "Metrics & fundraising",
    description: "Traction and round details.",
    fields: [
      { key: "mrr", label: "MRR / ARR", type: "text", placeholder: "e.g. $12K MRR" },
      { key: "customers", label: "Customers / users", type: "text" },
      { key: "growth", label: "Growth rate", type: "text", placeholder: "e.g. +18% MoM" },
      { key: "raising", label: "Amount raising", type: "text", required: true },
      { key: "valuation", label: "Valuation (if set)", type: "text" },
      { key: "useOfFunds", label: "Use of funds", type: "textarea" },
      { key: "previousRaises", label: "Previous raises", type: "textarea" },
      { key: "deckLink", label: "Pitch deck link", type: "text" },
    ],
  },
];

const INVESTOR_STEPS: Step[] = [
  {
    title: "Basic profile",
    description: "Identity and contact information.",
    fields: [
      { key: "fullName", label: "Full name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
    ],
  },
  {
    title: "Investor type",
    description: "How you invest.",
    fields: [
      { key: "investorType", label: "Investor type", type: "select", required: true, options: ["Angel", "VC", "Family office", "Corporate venture", "Accelerator", "Syndicate"] },
      { key: "firm", label: "Firm / organization", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ],
  },
  {
    title: "Mandate",
    description: "What you fund.",
    fields: [
      { key: "sectors", label: "Sectors (comma separated)", type: "text", required: true, placeholder: "Climate, health, fintech…" },
      { key: "stages", label: "Stages", type: "select", required: true, options: ["Pre-seed", "Seed", "Series A", "Series B+", "Stage-agnostic"] },
      { key: "geography", label: "Geography", type: "text", required: true },
      { key: "checkMin", label: "Min check size", type: "text", required: true, placeholder: "$50K" },
      { key: "checkMax", label: "Max check size", type: "text", required: true, placeholder: "$1M" },
      { key: "leadFollow", label: "Lead or follow?", type: "select", options: ["Lead", "Follow", "Both"] },
    ],
  },
  {
    title: "Strategy & compliance",
    description: "Pacing, exclusions, accreditation.",
    fields: [
      { key: "dealsPerYear", label: "Deals per year", type: "text" },
      { key: "exclusions", label: "Exclusions", type: "textarea" },
      { key: "impact", label: "Impact / ESG requirements", type: "textarea" },
      { key: "accredited", label: "Accredited investor?", type: "select", required: true, options: ["Yes", "No", "In progress"] },
      { key: "conflicts", label: "Conflicts of interest", type: "textarea" },
      { key: "references", label: "References (links)", type: "text" },
    ],
  },
];

const PARTNER_STEPS: Step[] = [
  {
    title: "Contact & organization",
    description: "Your details and organization.",
    fields: [
      { key: "fullName", label: "Contact name", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "text" },
      { key: "orgName", label: "Organization name", type: "text", required: true },
      { key: "orgType", label: "Organization type", type: "select", required: true, options: ["Corporate", "Accelerator", "University", "Foundation", "NGO", "Other"] },
      { key: "website", label: "Website", type: "text" },
    ],
  },
  {
    title: "Profile & capabilities",
    description: "Industries, sizes, differentiation.",
    fields: [
      { key: "industries", label: "Industries served", type: "text", required: true },
      { key: "stages", label: "Startup stages served", type: "text", required: true },
      { key: "geo", label: "Geographic focus", type: "text", required: true },
      { key: "size", label: "Organization size", type: "select", options: ["1–10", "11–50", "51–200", "200+"] },
      { key: "revenue", label: "Revenue range", type: "select", options: ["< $1M", "$1M–$10M", "$10M–$50M", "$50M+"] },
      { key: "differentiation", label: "Differentiation", type: "textarea" },
    ],
  },
  {
    title: "Engagement",
    description: "How you want to work with startups.",
    fields: [
      { key: "goals", label: "Engagement goals", type: "textarea", required: true, placeholder: "Pilot, investment, mentorship, co-development…" },
      { key: "challengeAreas", label: "Challenge / innovation areas", type: "textarea" },
      { key: "budget", label: "Innovation budget", type: "text" },
      { key: "priorCollab", label: "Prior startup collaboration", type: "textarea" },
      { key: "resources", label: "Resources you can offer", type: "textarea", hint: "Mentors, labs, distribution, funding…" },
    ],
  },
];

const STEPS_BY_ROLE: Record<string, Step[]> = {
  founder: FOUNDER_STEPS,
  investor: INVESTOR_STEPS,
  partner: PARTNER_STEPS,
  member: FOUNDER_STEPS,
  pioneer: FOUNDER_STEPS,
};

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = (user?.role ?? "founder") as keyof typeof STEPS_BY_ROLE;
  const steps = STEPS_BY_ROLE[role] ?? FOUNDER_STEPS;

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function validate() {
    const e: Record<string, string> = {};
    step.fields.forEach((f) => {
      if (f.required && !data[f.key]?.trim()) e[f.key] = "Required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (isLast) {
      localStorage.setItem(`aiim_onboarding_${role}`, JSON.stringify(data));
      setDone(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  const progress = ((stepIndex + 1) / steps.length) * 100;

  if (done) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand-600" />
        <h1 className="mt-4 text-xl font-bold tracking-tight">Onboarding complete</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your profile is saved. Taking you to your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{role} onboarding</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{step.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step {stepIndex + 1} of {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="glass-card flex flex-col gap-4">
        {step.fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label htmlFor={f.key} className="text-sm font-medium">
              {f.label} {f.required ? <span className="text-danger">*</span> : null}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.key}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                rows={3}
                className="min-h-[96px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              />
            ) : f.type === "select" ? (
              <select
                id={f.key}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-500"
              >
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                id={f.key}
                type={f.type}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              />
            )}
            {f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
            {errors[f.key] ? <p className="text-xs text-danger">{errors[f.key]}</p> : null}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => i - 1)}
          className="btn btn-secondary btn-sm disabled:opacity-40"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back
        </button>
        <button type="button" onClick={next} className="btn btn-primary">
          {isLast ? "Finish" : "Next"} <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}