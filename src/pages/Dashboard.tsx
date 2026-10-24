import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Clock,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const ROLE_COPY: Record<string, { title: string; subtitle: string }> = {
  founder: { title: "Founder Dashboard", subtitle: "Track your round, investor matches, and deal milestones." },
  investor: { title: "Investor Dashboard", subtitle: "Your deal flow, pipeline, and portfolio analytics at a glance." },
  partner: { title: "Partner Dashboard", subtitle: "Open challenges, pilots, and portfolio companies." },
  "school-admin": { title: "School Admin Dashboard", subtitle: "Roster, requests, and co-branded programs." },
  admin: { title: "Admin Console Dashboard", subtitle: "Platform health, active users, and governance audit trails." },
  member: { title: "Member Dashboard", subtitle: "Community ecosystem, resources, and innovation opportunities." },
  pioneer: { title: "Pioneer Dashboard", subtitle: "Premium early access to vetted deals and accelerator programs." },
};

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role ?? "member";
  const copy = ROLE_COPY[role] ?? ROLE_COPY.member;

  const stats = useMemo(() => {
    if (role === "founder") {
      return [
        { label: "Matched Investors", value: "12", delta: "+3 this week", icon: Users, color: "text-blue-600 bg-blue-50" },
        { label: "Active Pipeline", value: "5", delta: "2 in diligence", icon: Briefcase, color: "text-purple-600 bg-purple-50" },
        { label: "Round Progress", value: "42%", delta: "$315K raised", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
      ];
    }
    if (role === "investor") {
      return [
        { label: "New Matches Today", value: "8", delta: ">85% score", icon: Zap, color: "text-amber-600 bg-amber-50" },
        { label: "Deals in Pipeline", value: "24", delta: "4 term sheets", icon: Briefcase, color: "text-brand-600 bg-brand-50" },
        { label: "Active Portfolio", value: "11", delta: "32% YoY growth", icon: BarChart3, color: "text-indigo-600 bg-indigo-50" },
      ];
    }
    if (role === "partner") {
      return [
        { label: "Active Challenges", value: "3", delta: "42 submissions", icon: Rocket, color: "text-rose-600 bg-rose-50" },
        { label: "Live Pilots", value: "7", delta: "85% on track", icon: Briefcase, color: "text-teal-600 bg-teal-50" },
        { label: "Portfolio Co's", value: "18", delta: "+2 this month", icon: Users, color: "text-brand-600 bg-brand-50" },
      ];
    }
    return [
      { label: "AI Matches", value: "16", delta: "Updated today", icon: Zap, color: "text-brand-600 bg-brand-50" },
      { label: "Active Programs", value: "4", delta: "2 open cohorts", icon: Rocket, color: "text-purple-600 bg-purple-50" },
      { label: "Ecosystem Connections", value: "32", delta: "Verified members", icon: Users, color: "text-emerald-600 bg-emerald-50" },
    ];
  }, [role]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Hero Welcome Header Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs transition-all w-full">
        {/* Brand Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-annita-navy via-annita-purple via-annita-green to-annita-orange" />

        <div className="p-5 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200/80 px-3 py-1 text-xs font-bold text-brand-700">
                <Sparkles className="size-3.5 text-brand-600" />
                <span>AIIM Platform Active</span>
              </div>
              <h1 className="mt-3 text-xl sm:text-3xl font-black tracking-tight text-foreground leading-tight">
                {copy.title}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {copy.subtitle}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{user?.email ?? "User"}</span>
                <span>•</span>
                <span className="text-brand-700 font-bold">Enter Raw. Leave Funded.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <Link to="/deal-flow" className="btn btn-primary btn-sm w-full sm:w-auto min-h-[44px]">
                <Zap className="size-3.5" /> View AI Matches
              </Link>
              <Link to="/ask-aiim" className="btn btn-secondary btn-sm w-full sm:w-auto min-h-[44px]">
                <Sparkles className="size-3.5" /> Ask AIIM Copilot
              </Link>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-6 sm:mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="group rounded-2xl border border-border/80 bg-background/60 p-4 transition-all hover:border-brand-300 hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-xl font-bold ${stat.color} shadow-xs`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {stat.delta}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">{stat.value}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">Primary Workspace Modules</h2>
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/deal-flow", title: "Deal Flow", desc: "AI-matched founders and investors with explainable thesis scores.", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50", badge: "AI Match" },
            { href: "/pipeline", title: "Deal Pipeline", desc: "Track funding rounds, pitch reviews, and active deal status.", icon: BarChart3, color: "text-purple-600 bg-purple-50", badge: "Live" },
            { href: "/deal-rooms", title: "Deal Rooms", desc: "Secure collaboration, NDA-gated data rooms, and diligence Q&A.", icon: Briefcase, color: "text-blue-600 bg-blue-50", badge: "Secure" },
            { href: "/programs", title: "Programs & Cohorts", desc: "Accelerators, mentoring cohorts, and university innovation labs.", icon: Rocket, color: "text-amber-600 bg-amber-50", badge: "Cohorts" },
            { href: "/analytics", title: "Analytics & Funnels", desc: "Conversion metrics, portfolio insights, and KPI progress tracking.", icon: BarChart3, color: "text-indigo-600 bg-indigo-50", badge: "Metrics" },
            { href: "/ask-aiim", title: "Ask AIIM Copilot", desc: "Conversational AI assistant for market analysis and due diligence.", icon: Zap, color: "text-brand-600 bg-brand-50", badge: "Gemini 2.0" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                to={card.href}
                className="glass-card group relative flex flex-col justify-between overflow-hidden p-4 sm:p-5 transition-all hover:border-brand-400 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-xl ${card.color} shadow-xs transition-transform group-hover:scale-110`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-muted border border-border/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-base font-bold tracking-tight text-foreground group-hover:text-brand-700 transition-colors flex items-center gap-1.5">
                    <span>{card.title}</span>
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-600" />
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-brand-700 group-hover:translate-x-1 transition-transform">
                  <span>Open module</span>
                  <ChevronRight className="size-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Timeline & AI Suggestions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-brand-600" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground">Recent Activity & Updates</h3>
            </div>
            <Link to="/notifications" className="text-xs font-bold text-brand-700 hover:underline">View all</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { time: "2h ago", title: "Solara Climate OS uploaded 2 new diligence files to Deal Room #r1", type: "Deal Room" },
              { time: "5h ago", title: "New high-confidence investor match (91% thesis score) ready in Deal Flow", type: "AI Match" },
              { time: "1d ago", title: "MediBridge Health updated stage to 'Diligence' in your pipeline", type: "Pipeline" },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/50 p-3">
                <span className="size-2 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground leading-snug">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.type} • {item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Sparkles className="size-4 text-brand-600" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground">AI Intelligence Brief</h3>
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Gemini analyzed 32 new startup profiles this week. Climate tech and Agtech remain top investor focus areas across the West African hub.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60">
            <Link to="/ask-aiim" className="btn btn-primary btn-sm w-full min-h-[44px]">
              <Sparkles className="size-3.5" /> Ask AIIM Copilot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}