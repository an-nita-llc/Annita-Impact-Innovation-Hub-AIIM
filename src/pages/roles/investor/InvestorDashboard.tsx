import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function InvestorDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "New Matches Today", value: "8", delta: ">85% score", icon: Zap, color: "text-amber-600 bg-amber-50" },
    { label: "Deals in Pipeline", value: "24", delta: "4 term sheets", icon: Briefcase, color: "text-brand-600 bg-brand-50" },
    { label: "Active Portfolio", value: "11", delta: "32% YoY growth", icon: BarChart3, color: "text-indigo-600 bg-indigo-50" },
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Hero Welcome Header Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs transition-all w-full">
        <div className="h-1.5 w-full bg-gradient-to-r from-annita-navy via-annita-purple via-annita-green to-annita-orange" />

        <div className="p-5 sm:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200/80 px-3 py-1 text-xs font-bold text-purple-700">
                <Sparkles className="size-3.5 text-purple-600" />
                <span>Investor / VC Portal Active</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-foreground leading-tight">
              Investor Control Center
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Screen AI-ranked deal flow, manage your pipeline, perform due diligence, and evaluate startup valuations.
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user?.email ?? "investor@aiim.com"}</span>
              <span>•</span>
              <span className="text-brand-700 font-bold">Venture Capital Engine</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <Link to="/deal-flow" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
              <TrendingUp className="size-3.5" /> View Deal Flow
            </Link>
            <Link to="/ask-aiim" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">
              <Sparkles className="size-3.5" /> AIIM AI
            </Link>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3 w-full">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="group rounded-2xl border border-border/80 bg-background/60 p-4 transition-all hover:border-brand-300 hover:bg-surface flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-xl font-bold ${stat.color} shadow-xs`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {stat.delta}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black tracking-tight text-foreground">{stat.value}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Investor Modules */}
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Investor Navigation Modules</h2>
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {[
            { href: "/deal-flow", title: "Deal Flow AI", desc: "AI-matched startups with explainable thesis scores and rationale.", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50", badge: "AI Match" },
            { href: "/pipeline", title: "Deal Pipeline", desc: "Kanban pipeline tracking from Sourced to Term Sheet & Closed.", icon: BarChart3, color: "text-purple-600 bg-purple-50", badge: "Live" },
            { href: "/deal-rooms", title: "Diligence Data Rooms", desc: "Secure data room access, NDA verification, and file review.", icon: Briefcase, color: "text-blue-600 bg-blue-50", badge: "Secure" },
            { href: "/valuation", title: "Valuation Engine", desc: "VC method & Berkus method pre-money & post-money calculations.", icon: TrendingUp, color: "text-brand-600 bg-brand-50", badge: "Tool" },
            { href: "/founders", title: "Founders Directory", desc: "Vetted MSME and tech founders across Africa.", icon: Users, color: "text-amber-600 bg-amber-50", badge: "Directory" },
            { href: "/analytics", title: "Portfolio Analytics", desc: "Conversion metrics, fund IRR, and pipeline conversion benchmarks.", icon: BarChart3, color: "text-indigo-600 bg-indigo-50", badge: "Metrics" },
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
    </div>
  );
}