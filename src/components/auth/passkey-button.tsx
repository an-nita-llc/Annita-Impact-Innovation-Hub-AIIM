import { Fingerprint, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { registerSignInDevice } from "@/lib/auth/device-beacon";
import { useAuth } from "@/context/AuthContext";

export function PasskeyButton() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function signInWithPasskey() {
    setError(null);
    setPending(true);

    const { error: passkeyError } = await authClient.signIn.passkey();

    if (passkeyError) {
      setError(
        "Passkey sign-in didn't complete. Try again or use your email and password.",
      );
      setPending(false);
      return;
    }

    const next = searchParams.get("next");
    const destination =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard";

    login({
      name: "User",
      email: "user@aiim.com",
      role: "member",
      tier: "member",
      isPaid: false,
      isConfirmed: true,
    });
    void registerSignInDevice();
    window.location.replace(destination);
  }

  return (
    <div className="flex flex-col gap-3">
      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          {error}
        </div>
      ) : null}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <button
        type="button"
        onClick={signInWithPasskey}
        disabled={pending}
        className="btn btn-secondary btn-lg hover:border-brand-300 hover:bg-brand-50"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Waiting for your device…
          </>
        ) : (
          <>
            <Fingerprint aria-hidden="true" className="size-5 text-brand-600" />
            Continue with passkey
          </>
        )}
      </button>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        Protected by enterprise-grade security. Your session is private to this
        device unless you sign in elsewhere.
      </p>
    </div>
  );
}