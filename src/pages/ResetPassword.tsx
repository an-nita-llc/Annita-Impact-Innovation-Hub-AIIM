import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPassword() {
  return (
    <AuthShell>
      <AuthCard
        title="Choose a new password"
        subtitle="Pick something strong — at least 12 characters."
      >
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}