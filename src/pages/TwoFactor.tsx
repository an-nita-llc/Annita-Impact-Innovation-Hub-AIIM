import { useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { authClient } from "@/lib/auth/client";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

function VerifyForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const next = searchParams.get("next") ?? "/dashboard";

  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const result = useBackupCode
      ? await authClient.twoFactor.verifyBackupCode({ code: code.trim() })
      : await authClient.twoFactor.verifyTotp({
          code: code.trim(),
          trustDevice,
        });

    if (result.error) {
      setError(
        useBackupCode
          ? "That backup code didn't work. Check it and try again."
          : "That code didn't work. Check your authenticator app and try again.",
      );
      setPending(false);
      return;
    }

    login({
      name: "User",
      email: "user@aiim.com",
      role: "member",
      tier: "member",
      isPaid: false,
      isConfirmed: true,
    });
    void registerSignInDevice();
    window.location.replace(next);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="code" className="text-sm font-medium">
          {useBackupCode ? "Backup code" : "6-digit code"}
        </label>
        <input
          id="code"
          inputMode={useBackupCode ? "text" : "numeric"}
          autoComplete="one-time-code"
          required
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder={useBackupCode ? "XXXX-XXXX" : "123456"}
          className="min-h-12 w-full rounded-xl border border-border bg-background px-4 text-center font-mono text-lg tracking-widest outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
        />
      </div>

      {!useBackupCode ? (
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={trustDevice}
            onChange={(event) => setTrustDevice(event.target.checked)}
            className="size-5 accent-brand-600"
          />
          Trust this device for 30 days
        </label>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary btn-lg"
      >
        {pending ? "Verifying…" : "Verify and sign in"}
      </button>

      <button
        type="button"
        onClick={() => {
          setUseBackupCode((current) => !current);
          setCode("");
          setError(null);
        }}
        className="text-center text-sm font-medium text-brand-700 hover:underline"
      >
        {useBackupCode
          ? "Use my authenticator app instead"
          : "Lost your device? Use a backup code"}
      </button>
    </form>
  );
}

export default function TwoFactor() {
  return (
    <AuthShell>
      <AuthCard
        title="Check your authenticator app"
        subtitle="Enter the code to finish signing in."
      >
        <Suspense>
          <VerifyForm />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}