import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInTabs } from "@/components/auth/signin-tabs";

export default function Login() {
  return (
    <AuthShell>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to your AIIM account."
      >
        <Suspense
          fallback={
            <p role="status" className="py-4 text-center text-sm text-muted-foreground">
              Loading sign-in…
            </p>
          }
        >
          <SignInTabs />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}