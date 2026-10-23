import { AlertCircle, Loader2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authButtonClass, authInputClass } from "./classes";
import { PasswordField } from "./password-field";
import { signIn } from "@/lib/auth/client";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setPending(true);
    await new Promise((r) => setTimeout(r, 300));

    const next = searchParams.get("next");
    const destination =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard";

    login({
      name: email.split("@")[0] || "User",
      email: email.trim(),
      role: "member",
      tier: "member",
      isPaid: false,
      isConfirmed: true,
    });
    void registerSignInDevice();
    // Hard redirect so AuthContext re-hydrates from persisted storage without
    // a render-time race through React Router's transition.
    window.location.replace(destination);
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
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
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <button type="submit" disabled={pending} className={authButtonClass}>
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Signing you in…
          </>
        ) : (
          "Sign in"
        )}
      </button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">New to AIIM? </span>
        <Link to="/signup" className="font-medium text-brand-700 hover:underline">
          Create an account
        </Link>
      </div>
    </form>
  );
}