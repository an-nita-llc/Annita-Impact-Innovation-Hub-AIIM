import { AlertCircle, CheckCircle2, ChevronRight, Loader2, Sparkles, UserCheck, Users, Zap } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { PasswordField } from "./password-field";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

type Persona = {
  role: "founder" | "investor" | "partner" | "school-admin" | "admin" | "pioneer";
  name: string;
  email: string;
  title: string;
  org: string;
  desc: string;
  destination: string;
  color: string;
};

const DEMO_PERSONAS: Persona[] = [
  {
    role: "founder",
    name: "Amina Diallo",
    email: "founder@aiim.com",
    title: "CEO & Co-founder",
    org: "Solara Climate OS",
    desc: "Track seed round progress, investor matches, and pitch due diligence.",
    destination: "/dashboard",
    color: "bg-emerald-600",
  },
  {
    role: "investor",
    name: "James Kollie",
    email: "investor@aiim.com",
    title: "Partner",
    org: "Northstar Ventures",
    desc: "Explore deal flow, thesis match scores, and NDA data rooms.",
    destination: "/deal-flow",
    color: "bg-purple-600",
  },
  {
    role: "partner",
    name: "Global Partner",
    email: "partner@aiim.com",
    title: "Innovation Director",
    org: "Atlas Energy Group",
    desc: "Manage corporate open challenges, pilots, and venture offtake.",
    destination: "/pilots",
    color: "bg-teal-600",
  },
  {
    role: "school-admin",
    name: "Arthur Kollie",
    email: "schooladmin@aiim.com",
    title: "Incubator Director",
    org: "University Innovation Lab",
    desc: "Roster management, student spin-outs, and incubator cohorts.",
    destination: "/programs",
    color: "bg-amber-600",
  },
  {
    role: "admin",
    name: "System Admin",
    email: "admin@aiim.com",
    title: "Platform Admin",
    org: "AIIM Governance",
    desc: "User KYC/KYB verification queue, system audit logs, and status.",
    destination: "/admin",
    color: "bg-brand-600",
  },
  {
    role: "pioneer",
    name: "Pioneer Member",
    email: "pioneer@aiim.com",
    title: "Premium Venture Access",
    org: "Ecosystem Member",
    desc: "Early access to vetted deal flow, valuation engine, and networking.",
    destination: "/dashboard",
    color: "bg-indigo-600",
  },
];

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  function handleSelectPersona(p: Persona) {
    setPending(true);
    login({
      name: p.name,
      email: p.email,
      role: p.role as any,
      tier: "pioneer",
      firmName: p.org,
      isPaid: true,
      isConfirmed: true,
    });
    void registerSignInDevice();
    setTimeout(() => {
      window.location.replace(p.destination);
    }, 200);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // If user typed an email, log them in or ask role if empty
    if (!email.trim() || !password) {
      // Show role selection modal for judges!
      setShowRoleModal(true);
      return;
    }

    setPending(true);
    await new Promise((r) => setTimeout(r, 300));

    const matchedPersona = DEMO_PERSONAS.find((p) => p.email.toLowerCase() === email.trim().toLowerCase());

    if (matchedPersona) {
      handleSelectPersona(matchedPersona);
    } else {
      const next = searchParams.get("next");
      const destination = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

      login({
        name: email.split("@")[0] || "User",
        email: email.trim(),
        role: "member",
        tier: "member",
        isPaid: false,
        isConfirmed: true,
      });
      void registerSignInDevice();
      window.location.replace(destination);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Quick Demo Persona Trigger Banner for Judges */}
      <div className="rounded-2xl border border-brand-200 bg-brand-50/80 p-4 text-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="size-5 text-brand-600 shrink-0" />
          <div>
            <p className="font-bold text-foreground">Hackathon Judge Demo Accounts</p>
            <p className="text-muted-foreground text-[11px]">Select a persona to test tailored dashboards & permissions.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowRoleModal(true)}
          className="btn btn-primary btn-sm min-h-[40px] whitespace-nowrap shrink-0"
        >
          <span>Select Persona Role</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-xs text-danger"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold text-foreground">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@aiim.com or click persona above"
            className={authInputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <PasswordField
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-brand-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button type="submit" disabled={pending} className={authButtonClass}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing you in…
            </>
          ) : (
            "Sign In to Platform"
          )}
        </button>

        <div className="text-center text-xs">
          <span className="text-muted-foreground">New to AIIM? </span>
          <Link to="/signup" className="font-bold text-brand-700 hover:underline">
            Create an account
          </Link>
        </div>
      </form>

      {/* Role Selection Popup Modal for Judges */}
      {showRoleModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-overlay-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl animate-modal-in max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                  <Sparkles className="size-5 text-brand-600" />
                  <span>Choose Demo Persona Role</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any persona below to log in as that exact user role.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="text-muted-foreground hover:text-foreground text-xs font-bold p-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleSelectPersona(p)}
                  className="w-full text-left p-3.5 rounded-2xl border border-border/80 bg-background/60 hover:border-brand-400 hover:bg-surface transition-all flex items-start justify-between gap-3 active:scale-[0.99] group shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className={`size-10 rounded-xl ${p.color} text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs mt-0.5`}>
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground group-hover:text-brand-700 transition-colors flex items-center gap-1.5">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-semibold text-muted-foreground">• {p.org}</span>
                      </p>
                      <p className="text-[10px] text-brand-700 font-bold capitalize mt-0.5">{p.role} Role • {p.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{p.desc}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-brand-700 flex items-center shrink-0 mt-2 group-hover:translate-x-0.5 transition-transform">
                    <span>Enter</span>
                    <ChevronRight className="size-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}