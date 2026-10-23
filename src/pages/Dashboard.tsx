import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BarChart3, Briefcase, Rocket, TrendingUp, Users, Zap } from "lucide-react";

const ROLE_COPY: Record<string, { title: string; subtitle: string }> = {
  founder: { title: "Founder dashboard", subtitle: "Track your round, matches, and next actions." },
  investor: { title: "Investor dashboard", subtitle: "Your deal flow, pipeline, and portfolio at a glance." },
  partner: { title: "Partner dashboard", subtitle: "Challenges, pilots, and portfolio companies." },
  "school-admin": { title: "School admin dashboard", subtitle: "Roster, requests, and co-branded programs." },
  admin: { title: "Admin dashboard", subtitle: "Platform health, users, and governance." },
  member: { title: "Member dashboard", subtitle: "Community, resources, and opportunities." },
  pioneer: { title: "Pioneer dashboard", subtitle: "Premium access to deals and programs." },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const role = user?.role ?? "member";
  const copy = ROLE_COPY[role] ?? ROLE_COPY.member;
  const stats = useMemo(() => {
    if (role === "founder") {
      return [
        { label: "Matched investors", value: "12", icon: Users },
        { label: "Active pipeline", value: "5", icon: Briefcase },
        { label: "Round progress", value: "42%", icon: TrendingUp },
      ];
    }
    if (role === "investor") {
      return [
        { label: "New matches today", value: "8", icon: Zap },
        { label: "In pipeline", value: "24", icon: Briefcase },
        { label: "Portfolio", value: "11", icon: BarChart3 },
      ];
    }
    if (role === "partner") {
      return [
        { label: "Active challenges", value: "3", icon: Rocket },
        { label: "Live pilots", value: "7", icon: Briefcase },
        { label: "Portfolio co's", value: "18", icon: Users },
      ];
    }
    return [
      { label: "Opportunities", value: "16", icon: Zap },
      { label: "Programs", value: "4", icon: Rocket },
      { label: "Connections", value: "32", icon: Users },
    ];
  }, [role]);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="h-1 bg-gradient-to-r from-annita-navy via-annita-purple via-annita-green to-annita-orange" />
        <div className="px-6 py-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{copy.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{copy.subtitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Signed in as {user?.email ?? "user"} · Enter Raw. Leave Funded.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { logout(); window.location.replace("/login"); }}
              className="btn btn-secondary"
            >
              Sign out
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-background px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-xl font-bold tracking-tight">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/deal-flow", title: "Deal Flow", desc: "AI-matched founders and investors.", icon: TrendingUp },
          { href: "/pipeline", title: "Pipeline", desc: "Track rounds, deals, and pilots.", icon: BarChart3 },
          { href: "/deal-rooms", title: "Deal Rooms", desc: "Secure collaboration and diligence.", icon: Briefcase },
          { href: "/programs", title: "Programs", desc: "Accelerators, cohorts, and mentors.", icon: Rocket },
          { href: "/analytics", title: "Analytics", desc: "Funnel, portfolio, and KPI views.", icon: BarChart3 },
          { href: "/ask-aiim", title: "Ask AIIM", desc: "AI copilot for market and deal help.", icon: Zap },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} to={card.href} className="glass-card group">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-100">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight">{card.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{card.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}