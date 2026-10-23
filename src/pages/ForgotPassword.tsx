import { Link } from "react-router-dom";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPassword() {
  return (
    <AuthShell>
      <AuthCard
        title="Reset your password"
        subtitle="Enter your work email and we'll send you a secure reset link."
      >
        <ForgotPasswordForm />
        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}