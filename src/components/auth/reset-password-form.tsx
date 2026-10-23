import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authButtonClass } from "./classes";
import { PasswordField } from "./password-field";
import { authClient } from "@/lib/auth/client";

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <p className="text-sm font-semibold">This link is incomplete</p>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          The reset link is missing its security token. Use the full link from
          your email, or request a new one.
        </p>
        <Link to="/forgot-password" className="btn btn-primary mt-1">
          Request a new link
        </Link>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 12) {
      setError("Use at least 12 characters for a strong password.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords don't match. Try again.");
      return;
    }

    setPending(true);
    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token: token as string,
    });

    if (resetError) {
      setError(
        "This link is invalid or has expired. Request a fresh one below.",
      );
      setPending(false);
      return;
    }

    setDone(true);
    setPending(false);
    setTimeout(() => navigate("/login"), 2500);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 aria-hidden="true" className="size-6 text-brand-600" />
        </span>
        <p className="text-sm font-semibold">Password updated</p>
        <p className="text-sm text-muted-foreground">
          Taking you back to sign in…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <PasswordField
        id="password"
        name="password"
        label="New password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        minLength={12}
        hint="At least 12 characters — a phrase you can remember works best."
      />

      <PasswordField
        id="confirm"
        name="confirm"
        label="Confirm new password"
        value={confirm}
        onChange={setConfirm}
        autoComplete="new-password"
        minLength={12}
      />

      <button
        type="submit"
        disabled={pending}
        className={authButtonClass}
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Updating…
          </>
        ) : (
          "Set new password"
        )}
      </button>
    </form>
  );
}