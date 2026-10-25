import { AlertCircle, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { PasswordField } from "./password-field";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

type DemoRole = {
  role: "founder" | "investor" | "partner";
  title: string;
  badge: string;
  desc: string;
  destination: string;
  color: string;
};

const DEMO_ROLES: DemoRole[] = [
  {
    role: "founder",
    title: "Founder Role",
    badge: "Startup Founder",
    desc: "Building a startup, raising capital, managing deal rooms, and seeking investor matches.",
    destination: "/dashboard",
    color: "bg-emerald-600",
  },
  {
    role: "investor",
    title: "Investor / VC Role",
    badge: "Venture Investor",
    desc: "Sourcing deal flow, analyzing AI thesis scores, managing pipeline, and reviewing diligence.",
    destination: "/deal-flow",
    color: "bg-purple-600",
  },
  {
    role: "partner",
    title: "Corporate Partner Role",
    badge: "Ecosystem Partner",
    desc: "Posting corporate innovation challenges, scouting tech, and managing live pilots.",
    destination: "/pilots",
    color: "bg-teal-600",
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

  function handleSelectRole(roleItem: DemoRole) {
    setPending(true);
    const userEmail = email.trim() || `${roleItem.role}@aiim.com`;
    login({
      name: `${roleItem.title}`,
      email: userEmail,
      role: roleItem.role,
      tier: roleItem.role === "investor" ? "pioneer" : "member",
      isPaid: roleItem.role === "investor",
      isConfirmed: true,
    });
    void registerSignInDevice();
    setTimeout(() => {
      window.location.replace(roleItem.destination);
    }, 200);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password to continue.");
      return;
    }

    // After user enters email and password, show role selection popup modal!
    setShowRoleModal(true);
  }

  return (
    <div className="flex flex-col gap-5">
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
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@aiim.com"
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
            "Sign In"
          )}
        </button>

        <div className="text-center text-xs">
          <span className="text-muted-foreground">New to AIIM? </span>
          <Link to="/signup" className="font-bold text-brand-700 hover:underline">
            Create an account
          </Link>
        </div>
      </form>

      {/* Role Selection Popup Modal - Triggered After Submitting Email & Password */}
      {showRoleModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-overlay-in">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl animate-modal-in">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-brand-600" />
                  <span>Select Destination Role</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Which account role are you heading to today?
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {DEMO_ROLES.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleSelectRole(r)}
                  className="w-full text-left p-4 rounded-2xl border border-border/80 bg-background/60 hover:border-brand-400 hover:bg-surface transition-all flex flex-col items-start gap-1.5 active:scale-[0.99] group shadow-xs"
                >
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider ${r.color}`}>
                    {r.badge}
                  </span>
                  <p className="text-sm font-bold text-foreground group-hover:text-brand-700 transition-colors">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}