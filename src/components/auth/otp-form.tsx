import { KeyRound, Loader2, MailCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { authClient } from "@/lib/auth/client";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

type Step = "details" | "code";

export function OtpSignInForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  function destination() {
    const next = searchParams.get("next");
    return next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";
  }

  async function requestCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const normalizedEmail = email.trim();
      try {
        await fetch("/api/auth/otp/request", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            employeeNumber: employeeNumber.trim().toUpperCase(),
            email: normalizedEmail,
          }),
        });
      } catch {
        // ignore
      }
      const { error: sendError } =
        await authClient.emailOtp.sendVerificationOtp({
          email: normalizedEmail,
          type: "sign-in",
        });
      if (sendError) {
        setError(
          "We couldn't send a code right now. Please wait a moment and try again.",
        );
        return;
      }
      setStep("code");
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((previous) => {
          if (previous <= 1) {
            clearInterval(timer);
            return 0;
          }
          return previous - 1;
        });
      }, 1000);
    } finally {
      setPending(false);
    }
  }

  async function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const digits = code.replace(/[^0-9]/g, "");
    if (digits.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setPending(true);
    try {
      const { error: signInError } = await authClient.signIn.emailOtp({
        email: email.trim(),
        otp: digits,
      });
      if (signInError) {
        setError(
          "That code didn't work — check it and try again. Codes expire after 5 minutes.",
        );
        return;
      }
      login({
        name: email.split("@")[0] || "User",
        email: email.trim(),
        role: "member",
        tier: "member",
        isPaid: false,
        isConfirmed: true,
      });
      void registerSignInDevice();
      window.location.replace(destination());
    } finally {
      setPending(false);
    }
  }

  if (step === "code") {
    return (
      <form onSubmit={verifyCode} className="flex flex-col gap-5" noValidate>
        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            {error}
          </div>
        ) : null}
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700"
        >
          <MailCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>
            If an account matches those details, a 6-digit code is on its way
            to <strong>{email.trim()}</strong>. It expires in 5 minutes.
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="otp-code" className="text-sm font-medium">
            6-digit code
          </label>
          <input
            id="otp-code"
            name="otp-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/[^0-9]/g, "").slice(0, 6))
            }
            placeholder="••••••"
            aria-describedby="otp-hint"
            className={`${authInputClass} text-center text-2xl font-bold tracking-[0.5em]`}
          />
          <p id="otp-hint" className="text-xs text-muted-foreground">
            Never share this code — the AIIM team will never ask for it.
          </p>
        </div>
        <button
          type="submit"
          disabled={pending}
          className={authButtonClass}
        >
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify and sign in"
          )}
        </button>
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setStep("details");
              setCode("");
              setError(null);
            }}
            className="font-medium text-brand-700 hover:underline"
          >
            Use different details
          </button>
          <span className="text-muted-foreground">
            {cooldown > 0 ? `Resend available in ${cooldown}s` : "No code?"}
          </span>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={requestCode} className="flex flex-col gap-5" noValidate>
      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="otp-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="otp-email"
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
      <button
        type="submit"
        disabled={pending}
        className={authButtonClass}
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Sending code…
          </>
        ) : (
          <>
            <KeyRound aria-hidden="true" className="size-4" />
            Email me a sign-in code
          </>
        )}
      </button>
    </form>
  );
}