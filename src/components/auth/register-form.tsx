import { AlertCircle, CheckCircle2, KeyRound, Loader2, MailCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { PasswordField } from "./password-field";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

type Role = "founder" | "investor" | "partner";

const ROLE_LABELS: Record<Role, { title: string; desc: string }> = {
  founder: { title: "Founder", desc: "Building a startup and raising capital" },
  investor: { title: "Investor / VC", desc: "Sourcing and funding ventures" },
  partner: { title: "Ecosystem partner", desc: "Corporate, accelerator, or mentor" },
};

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("founder");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(t);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  function sendCode() {
    setError(null);
    setPending(true);
    setTimeout(() => {
      setOtpSent(true);
      setPending(false);
      setCooldown(30);
    }, 400);
  }

  function validateAccount() {
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return false;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return false;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return false;
    }
    if (password !== confirm) {
      setError("The two passwords don't match.");
      return false;
    }
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return false;
    }
    return true;
  }

  function goNext() {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      if (!validateAccount()) return;
      sendCode();
      setStep(2);
    }
  }

  async function verifyAndCreate() {
    setError(null);
    const digits = otp.replace(/[^0-9]/g, "");
    if (digits.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setPending(true);
    await new Promise((r) => setTimeout(r, 500));
    setPending(false);
    setDone(true);
    login({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      city: location.trim(),
      role,
      tier: role === "investor" ? "pioneer" : "member",
      isPaid: role === "investor",
      isConfirmed: true,
      orgName: organization.trim() || undefined,
    });
    void registerSignInDevice();
    setTimeout(() => window.location.replace("/onboarding"), 1200);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 aria-hidden="true" className="size-6 text-brand-600" />
        </span>
        <p className="text-sm font-semibold">Account verified</p>
        <p className="text-sm text-muted-foreground">Taking you to onboarding…</p>
      </div>
    );
  }

  const stepTitles = ["Choose your role", "Account details", "Verify email"];
  const progress = ((step + 1) / 3) * 100;

  if (step === 0) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Step {step + 1} of 3 · {stepTitles[step]}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm font-medium">I am joining as</p>
          <p className="mt-1 text-xs text-muted-foreground">Choose your role to start the matching onboarding flow.</p>
        </div>
        <div className="flex flex-col gap-2">
          {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex w-full flex-col items-start gap-1 rounded-xl border p-3 text-left transition ${role === r ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20" : "border-border bg-surface hover:border-brand-300"}`}
            >
              <span className="text-sm font-semibold">{ROLE_LABELS[r].title}</span>
              <span className="text-[11px] text-muted-foreground">{ROLE_LABELS[r].desc}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={goNext} className={authButtonClass}>
          Continue
        </button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/login" className="font-medium text-brand-700 hover:underline">Sign in</Link>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Step {step + 1} of 3 · {stepTitles[step]}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        {error ? (
          <div role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        ) : null}
        <div role="status" className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          <MailCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>
            If an account matches, a 6-digit code is on its way to <strong>{email.trim()}</strong>. It expires in 5 minutes.
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="signup-otp" className="text-sm font-medium">6-digit code</label>
          <input
            id="signup-otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
            placeholder="••••••"
            className={`${authInputClass} text-center text-2xl font-bold tracking-[0.5em]`}
          />
          <p className="text-xs text-muted-foreground">Never share this code — AIIM staff will never ask for it.</p>
        </div>
        <button type="button" onClick={verifyAndCreate} disabled={pending} className={authButtonClass}>
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify and create account"
          )}
        </button>
        <div className="flex items-center justify-between text-sm">
          <button type="button" onClick={() => setStep(1)} className="font-medium text-brand-700 hover:underline">
            Use different details
          </button>
          <button
            type="button"
            disabled={cooldown > 0 || pending}
            onClick={sendCode}
            className="font-medium text-brand-700 hover:underline disabled:text-muted-foreground"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : (otpSent ? "Resend code" : "Send code")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); goNext(); }} className="flex flex-col gap-5" noValidate>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Step {step + 1} of 3 · {stepTitles[step]}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {error ? (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2">
        <div>
          <p className="text-xs text-muted-foreground">Selected role</p>
          <p className="text-sm font-semibold">{ROLE_LABELS[role].title}</p>
        </div>
        <button type="button" onClick={() => setStep(0)} className="text-xs font-medium text-brand-700 hover:underline">
          Change
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">Full name</label>
        <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={authInputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">Work email</label>
        <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@aiim.com" className={authInputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="organization" className="text-sm font-medium">Organization (optional)</label>
        <input id="organization" name="organization" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Company or fund" className={authInputClass} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+231 …" className={authInputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <input id="location" name="location" type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, country" className={authInputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn (optional)</label>
        <input id="linkedin" name="linkedin" type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/…" className={authInputClass} />
      </div>

      <PasswordField id="password" name="password" label="Password" value={password} onChange={setPassword} autoComplete="new-password" minLength={8} hint="At least 8 characters." />
      <PasswordField id="confirm" name="confirm" label="Confirm password" value={confirm} onChange={setConfirm} autoComplete="new-password" minLength={8} />

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 size-4 accent-brand-600" />
        <span className="text-muted-foreground">I agree to the terms of service and privacy policy.</span>
      </label>

      <button type="button" onClick={goNext} className={authButtonClass}>
        Continue
      </button>

      <button type="button" onClick={() => setStep(0)} className="text-center text-sm text-muted-foreground hover:text-foreground">
        Back to role selection
      </button>
    </form>
  );
}