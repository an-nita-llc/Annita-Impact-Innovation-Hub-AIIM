import { Link, useLocation } from "react-router-dom";
import { LogoMark } from "@/components/brand/logo";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Briefcase,
  Calculator,
  CalendarClock,
  FolderOpen,
  Globe,
  Home,
  LogOut,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ROLE_NAV = {
  founder: {
    main: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/investors", label: "Investors", icon: Users },
      { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
      { href: "/valuation", label: "Valuation Engine", icon: Calculator, badge: "New" },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, badge: "AI" },
    ],
    ecosystem: [
      { href: "/innovation-map", label: "Innovation Map", icon: Globe },
      { href: "/programs", label: "Programs & Cohorts", icon: Rocket },
      { href: "/events", label: "Events & Demos", icon: CalendarClock },
    ],
    tools: [
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/documents", label: "Documents", icon: FolderOpen },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
  investor: {
    main: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/deal-flow", label: "Deal Flow", icon: TrendingUp },
      { href: "/pipeline", label: "Deal Pipeline", icon: BarChart3 },
      { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
      { href: "/valuation", label: "Valuation Engine", icon: Calculator, badge: "New" },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, badge: "AI" },
    ],
    ecosystem: [
      { href: "/founders", label: "Founders", icon: Users },
      { href: "/innovation-map", label: "Innovation Map", icon: Globe },
      { href: "/analytics", label: "Analytics & Portfolio", icon: BarChart3 },
    ],
    tools: [
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/documents", label: "Documents", icon: FolderOpen },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
  partner: {
    main: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/challenges", label: "Open Innovation", icon: Rocket },
      { href: "/pilots", label: "Live Pilots", icon: Zap },
      { href: "/scouting", label: "Tech Scouting", icon: Search },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, badge: "AI" },
    ],
    ecosystem: [
      { href: "/founders", label: "Founders", icon: Users },
      { href: "/innovation-map", label: "Innovation Map", icon: Globe },
      { href: "/ideas", label: "Idea Management", icon: Rocket },
    ],
    tools: [
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/documents", label: "Documents", icon: FolderOpen },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
};

export function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const role = (user?.role ?? "founder") as keyof typeof ROLE_NAV;
  const nav = ROLE_NAV[role] ?? ROLE_NAV.founder;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/80 bg-surface/95 backdrop-blur-md md:flex shadow-sm">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
        <Link to="/dashboard" aria-label="AIIM home" className="flex items-center gap-2.5 transition opacity-90 hover:opacity-100">
          <LogoMark size="sm" full={false} />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-annita-navy-900 leading-none">AIIM</span>
            <span className="text-[10px] font-semibold text-brand-700 tracking-wider uppercase mt-0.5">Innovation Hub</span>
          </div>
        </Link>
        <span className="rounded-full bg-brand-50 border border-brand-200/60 px-2 py-0.5 text-[10px] font-bold text-brand-700 uppercase">
          {user?.role || "Founder"}
        </span>
      </div>

      {/* Quick Search Shortcut */}
      <div className="px-3 pt-3 pb-1">
        <Link
          to="/search"
          className="flex h-9 w-full items-center justify-between rounded-xl border border-border/80 bg-background/80 px-3 text-xs text-muted-foreground transition hover:border-brand-300 hover:bg-muted/50"
        >
          <span className="flex items-center gap-2">
            <Search className="size-3.5 text-muted-foreground" />
            <span>Search platform...</span>
          </span>
          <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {/* Main Section */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Workspace</p>
          <ul className="space-y-0.5">
            {nav.main.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex min-h-10 items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`size-4 transition-transform group-hover:scale-110 ${active ? "text-white" : "text-muted-foreground group-hover:text-brand-700"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold tracking-wide uppercase ${active ? "bg-white/20 text-white" : "bg-brand-100 text-brand-800"}`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Ecosystem Section */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Ecosystem</p>
          <ul className="space-y-0.5">
            {nav.ecosystem.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`size-4 transition-transform group-hover:scale-110 ${active ? "text-white" : "text-muted-foreground group-hover:text-brand-700"}`} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tools Section */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Tools & Account</p>
          <ul className="space-y-0.5">
            {nav.tools.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`size-4 transition-transform group-hover:scale-110 ${active ? "text-white" : "text-muted-foreground group-hover:text-brand-700"}`} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-border/60 p-3 bg-surface/50">
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-xs shadow-xs">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-foreground leading-tight">{user?.name || user?.email || "Guest User"}</p>
              <p className="truncate text-[10px] font-medium text-muted-foreground capitalize">{user?.role || "Founder"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { logout(); window.location.replace("/login"); }}
            title="Sign out"
            aria-label="Sign out"
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-danger/10 hover:text-danger transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}