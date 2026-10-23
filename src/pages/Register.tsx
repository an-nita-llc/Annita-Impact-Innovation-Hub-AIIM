import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function Register() {
  return (
    <AuthShell>
      <AuthCard
        title="Create your account"
        subtitle="Join the AIIM as a founder, investor, or partner."
      >
        <Suspense>
          <RegisterForm />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}