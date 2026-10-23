import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";

export default function Loader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(user ? "/dashboard" : "/login", { replace: true });
    }, 4000);
    return () => clearTimeout(t);
  }, [navigate, user]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(234,88,12,0.12)_0%,transparent_70%)]" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex size-32 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-4 border-muted" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-600 border-r-brand-300" />
          <span className="absolute inset-3 rounded-full bg-surface shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-border flex items-center justify-center overflow-hidden">
            <img
              src="/brand/annita-logo.png"
              alt="AIIM"
              width={48}
              height={48}
              className="size-12 object-contain p-1"
            />
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-base font-semibold tracking-tight">AIIM</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            <span className="text-sm">Loading your workspace…</span>
          </div>
        </div>
      </div>
    </div>
  );
}