import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function FounderDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Matched Investors", value: "12", delta: "+3 this week", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Active Pipeline", value: "5", delta: "2 in diligence", icon: Briefcase, color: "text-purple-600 bg-purple-50" },
    { label: "Round Progress", value: "42%", delta: "$315K raised", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {/* Hero Welcome Header Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs transition-all w-full">
        <div className="h-1.5 w-full bg-gradient-to-r from-annita-navy via-annita-purple via-annita-green to-annita-orange" />

        <div className="p-5 sm:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200/80 px-3 py-1 text-xs font-bold text-brand-700">
                <Sparkles className="size-3.5 text-brand-600" />
                <span>Founder Workspace Active</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-foreground leading-tight">
              Founder Control Center
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Track your fundraising round, investor matches, diligence data rooms, and valuation terms.
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user?.email ?? "founder@aiim.com"}</span>
              <span>•</span>
              <span className="text-brand-700 font-bold">Enter Raw. Leave Funded.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <Link to="/investors" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
              <Users className="size-3.5" /> Investor Directory
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

      {/* Primary Founder Modules */}
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Founder Navigation Modules</h2>
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {[
            { href: "/investors", title: "Investor Directory", desc: "Vetted venture capital funds, angel syndicates, and fund mandates.", icon: Users, color: "text-blue-600 bg-blue-50", badge: "Investors" },
            { href: "/deal-rooms", title: "Deal Rooms", desc: "NDA-gated data rooms, dynamic watermarking, and AI Q&A.", icon: Briefcase, color: "text-purple-600 bg-purple-50", badge: "Secure" },
            { href: "/valuation", title: "Valuation Engine", desc: "Calculate pre-money & post-money valuation using VC & Berkus models.", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50", badge: "Tool" },
            { href: "/ask-aiim", title: "AIIM AI Intelligence", desc: "Conversational AI assistant for pitch deck diligence & market analysis.", icon: Zap, color: "text-brand-600 bg-brand-50", badge: "AI" },
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