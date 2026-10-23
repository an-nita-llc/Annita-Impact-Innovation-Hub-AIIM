import { Link, useSearchParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { authClient } from "@/lib/auth/client";

function VerifyContent() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"working" | "done" | "error">(
    token ? "working" : "error",
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    authClient
      .verifyEmail({ query: { token } })
      .then(({ error }: { error: string | null }) => {
        if (!cancelled) setStatus(error ? "error" : "done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "working") {
    return <p className="py-4 text-center text-sm">Verifying your email…</p>;
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <p className="text-sm font-semibold">Email verified</p>
        <p className="text-sm text-muted-foreground">
          Your work email is confirmed.
        </p>
        <Link to="/dashboard" className="btn btn-primary mt-1">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-2 text-center">
      <p className="text-sm font-semibold">This link didn&apos;t work</p>
      <p className="text-sm text-muted-foreground">
        It may have expired. Request a new one from Settings.
      </p>
      <Link
        to="/login"
        className="mt-1 text-sm font-medium text-brand-700 hover:underline"
      >
        Back to sign in
      </Link>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <AuthShell>
      <AuthCard
        title="Verify your email"
        subtitle="Confirming your work email address."
      >
        <Suspense>
          <VerifyContent />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}