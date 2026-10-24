import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

type FieldType = "text" | "email" | "textarea" | "select" | "number";
type Field = { key: string; label: string; type: FieldType; required?: boolean; placeholder?: string; options?: string[]; hint?: string };
type Step = { title: string; description: string; fields: Field[] };

const FOUNDER_STEPS: Step[] = [
  {
    title: "Basic Founder Profile",
    description: "Personal identity and executive contact information.",
    fields: [
      { key: "fullName", label: "Full Name", type: "text", required: true, placeholder: "e.g. Amina Diallo" },
      { key: "title", label: "Executive Title", type: "text", required: true, placeholder: "CEO, Co-founder" },
      { key: "phone", label: "Phone Number", type: "text", placeholder: "+233 24 000 0000" },
      { key: "location", label: "Primary Location", type: "text", required: true, placeholder: "Accra, Ghana" },
      { key: "linkedin", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/in/..." },
      { key: "bio", label: "Executive Summary", type: "textarea", hint: "2–3 concise sentences summarizing your background." },
    ],
  },
  {
    title: "Company & Venture Details",
    description: "Core company information and target market focus.",
    fields: [
      { key: "companyName", label: "Company / Venture Name", type: "text", required: true, placeholder: "Solara Climate OS" },
      { key: "tagline", label: "One-Sentence Tagline", type: "text", required: true, placeholder: "AI operating layer for commercial solar energy portfolios" },
      { key: "companyWebsite", label: "Company Website", type: "text", placeholder: "https://..." },
      { key: "problem", label: "Core Problem Solved", type: "textarea", required: true },
      { key: "solution", label: "Your Proprietary Solution", type: "textarea", required: true },
    ],
  },
  {
    title: "Industry & Stage Classification",
    description: "Market classification and current development stage.",
    fields: [
      { key: "industry", label: "Primary Sector Focus", type: "select", required: true, options: ["Climate Tech", "Healthcare", "Fintech", "Agtech", "Education", "Other"] },
      { key: "stage", label: "Company Stage", type: "select", required: true, options: ["Idea Stage", "MVP / Prototype", "Early Growth (Post-MVP)", "Scaling"] },
      { key: "fundingStage", label: "Round Target", type: "select", required: true, options: ["Bootstrapped", "Pre-seed", "Seed Round", "Series A", "Series B+"] },
      { key: "teamSize", label: "Core Team Size", type: "select", options: ["Solo Founder", "2–3 Team", "4–7 Team", "8–15 Team", "15+ Employees"] },
    ],
  },
  {
    title: "Traction & Fundraising Target",
    description: "Financial metrics and target round details.",
    fields: [
      { key: "mrr", label: "Current ARR / MRR", type: "text", placeholder: "$420K ARR" },
      { key: "raising", label: "Amount Currently Raising", type: "text", required: true, placeholder: "$750K Target" },
      { key: "useOfFunds", label: "Primary Use of Funds", type: "textarea", placeholder: "Engineering team hiring, pilot scaling..." },
      { key: "deckLink", label: "Pitch Deck URL", type: "text", placeholder: "https://..." },
    ],
  },
];

const INVESTOR_STEPS: Step[] = [
  {
    title: "Investor Identity",
    description: "Personal and fund contact information.",
    fields: [
      { key: "fullName", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Institutional Email", type: "email", required: true },
      { key: "location", label: "Base Location", type: "text", required: true },
    ],
  },
  {
    title: "Fund Mandate",
    description: "Target sectors and check size range.",
    fields: [
      { key: "firm", label: "Venture Firm / Organization", type: "text", required: true },
      { key: "sectors", label: "Focus Sectors", type: "text", required: true, placeholder: "Climate, Health, Agtech..." },
      { key: "checkMin", label: "Minimum Check Size", type: "text", required: true, placeholder: "$50K" },
      { key: "checkMax", label: "Maximum Check Size", type: "text", required: true, placeholder: "$1M" },
    ],
  },
];

const STEPS_BY_ROLE: Record<string, Step[]> = {
  founder: FOUNDER_STEPS,
  investor: INVESTOR_STEPS,
  partner: FOUNDER_STEPS,
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
      if (f.required && !data[f.key]?.trim()) e[f.key] = "Required field";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (isLast) {
      localStorage.setItem(`aiim_onboarding_${role}`, JSON.stringify(data));
      setDone(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  const progress = ((stepIndex + 1) / steps.length) * 100;

  if (done) {
    return (
      <div className="mx-auto max-w-md py-16 text-center animate-modal-in px-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-600 text-white mx-auto shadow-md">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">Onboarding Complete</h1>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Your profile has been saved and verified by AIIM. Redirecting you to your workspace dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-5 sm:gap-6 w-full">
      {/* Header */}
      <div className="border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700 capitalize">
            {role} Profile Setup
          </span>
        </div>
        <h1 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">{step.title}</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
      </div>

      {/* Progress Indicator */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1">
          <span>Step {stepIndex + 1} of {steps.length}</span>
          <span className="text-brand-700">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Form Fields */}
      <div className="glass-card space-y-4 w-full">
        {step.fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label htmlFor={f.key} className="text-xs font-bold text-foreground">
              {f.label} {f.required ? <span className="text-danger">*</span> : null}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={f.key}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                rows={3}
                className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-medium outline-none focus:border-brand-500"
              />
            ) : f.type === "select" ? (
              <select
                id={f.key}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                className="h-11 w-full rounded-xl border border-border/80 bg-background px-3.5 text-xs font-medium outline-none focus:border-brand-500"
              >
                <option value="">Select option...</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={f.key}
                type={f.type}
                value={data[f.key] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="h-11 w-full rounded-xl border border-border/80 bg-background px-3.5 text-xs font-medium outline-none focus:border-brand-500"
              />
            )}

            {f.hint ? <p className="text-[10px] text-muted-foreground">{f.hint}</p> : null}
            {errors[f.key] ? <p className="text-[10px] font-bold text-danger">{errors[f.key]}</p> : null}
          </div>
        ))}
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => i - 1)}
          className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto disabled:opacity-40"
        >
          <ArrowLeft className="size-3.5" /> Back
        </button>

        <button type="button" onClick={next} className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <span>{isLast ? "Complete Profile" : "Next Step"}</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}