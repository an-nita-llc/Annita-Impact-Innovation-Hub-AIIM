import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { authClient } from "@/lib/auth/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    setPending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 py-2 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 aria-hidden="true" className="size-6 text-brand-600" />
        </span>
        <p className="text-sm font-semibold">Check your inbox</p>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          If an account exists for <strong>{email}</strong>, a reset link is on
          its way. It expires shortly — if you don&apos;t see it, check spam or
          ask HR to confirm your work email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Work email
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
      <button type="submit" disabled={pending} className={authButtonClass}>
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Sending…
          </>
        ) : (
          "Send reset link"
        )}
      </button>
    </form>
  );
}