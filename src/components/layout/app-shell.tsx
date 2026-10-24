import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Calculator,
  CalendarClock,
  ChevronRight,
  CreditCard,
  FileText,
  FolderOpen,
  Globe,
  History,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { useAuth } from "@/context/AuthContext";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/deal-flow": "Deal Flow",
  "/pipeline": "Pipeline",
  "/deal-rooms": "Deal Rooms",
  "/valuation": "Valuation Engine",
  "/innovation-map": "African Innovation Map",
  "/founders": "Founders",
  "/investors": "Investors",
  "/partners": "Partners",
  "/programs": "Programs",
  "/events": "Events",
  "/messages": "Messages",
  "/documents": "Documents",
  "/analytics": "Analytics",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/search": "Search",
  "/ask-aiim": "AIIM AI",
  "/pilots": "Pilots",
  "/evaluations": "Evaluations",
  "/onboarding": "Onboarding",
  "/institutional-memory": "Institutional Memory",
  "/admin": "Admin Console",
  "/help": "Help Center",
  "/ideas": "Idea Management",
  "/scouting": "Technology Scouting",
  "/challenges": "Open Innovation",
  "/roi": "ROI & FP&A",
  "/stage-gates": "Stage-Gate Governance",
  "/audit-log": "Audit Log",
  "/billing": "Billing & Usage",
  "/integrations": "Integrations & API",
  "/trust": "Trust Center",
  "/status": "Status Page",
};

const ROLE_NAV = {
  founder: {
    main: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/investors", label: "Investors", icon: Users },
      { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
      { href: "/valuation", label: "Valuation Engine", icon: Calculator },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles },
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
      { href: "/valuation", label: "Valuation Engine", icon: Calculator },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles },
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
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles },
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
  "school-admin": {
    main: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/programs", label: "Incubator Cohorts", icon: Rocket },
      { href: "/founders", label: "Student Founders", icon: Users },
      { href: "/innovation-map", label: "Innovation Map", icon: Globe },
      { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles },
    ],
    ecosystem: [
      { href: "/events", label: "Demo Days", icon: CalendarClock },
      { href: "/documents", label: "Research IP Docs", icon: FolderOpen },
    ],
    tools: [
      { href: "/messages", label: "Messages", icon: MessageSquare },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
  admin: {
    main: [
      { href: "/admin", label: "Admin Console", icon: Shield },
      { href: "/audit-log", label: "Audit Log", icon: History },
      { href: "/billing", label: "Billing & Metering", icon: CreditCard },
      { href: "/integrations", label: "Integrations & API", icon: Zap },
      { href: "/status", label: "System Health", icon: Activity },
    ],
    ecosystem: [
      { href: "/trust", label: "Trust Center", icon: ShieldCheck },
      { href: "/analytics", label: "Platform Analytics", icon: BarChart3 },
    ],
    tools: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/help", label: "Help Center", icon: BookOpen },
    ],
  },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const unreadCount = 2;

  const role = (user?.role ?? "founder") as keyof typeof ROLE_NAV;
  const nav = ROLE_NAV[role] ?? ROLE_NAV.founder;

  // Auto close drawer on navigation
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const currentPageTitle = PAGE_NAMES[pathname] || "Workspace";

  return (
    <div className="min-h-screen bg-background text-foreground md:pl-64 pb-20 md:pb-0 font-sans antialiased">
      <Sidebar />

      {/* Desktop Top Header Bar */}
      <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-border/80 bg-surface/90 px-8 backdrop-blur-md md:flex">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="size-3.5 text-muted-foreground" />
            <span>AIIM</span>
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="text-foreground font-bold tracking-tight">{currentPageTitle}</span>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <Link
            to="/search"
            className="flex h-9 items-center gap-2.5 rounded-xl border border-border/80 bg-background/80 px-3.5 text-xs text-muted-foreground transition hover:border-brand-300 hover:bg-surface"
          >
            <Search className="size-3.5 text-muted-foreground" />
            <span>Quick Search...</span>
            <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
          </Link>

          {/* AIIM AI Pill */}
          <Link
            to="/ask-aiim"
            className="flex h-9 items-center gap-1.5 rounded-xl bg-brand-50 border border-brand-200/80 px-3 text-xs font-bold text-brand-700 transition hover:bg-brand-100/80"
          >
            <Sparkles className="size-3.5" />
            <span>AIIM AI</span>
          </Link>

          {/* Notifications Link */}
          <Link
            to="/notifications"
            className="relative flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-brand-600 text-[9px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            ) : null}
          </Link>

          {/* User Role Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-border/60">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-xs shadow-xs">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-tight">{user?.name || "Member"}</span>
              <span className="text-[10px] text-muted-foreground capitalize font-medium">{user?.role || "Founder"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Top Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/80 bg-surface/95 px-4 backdrop-blur-md md:hidden">
        <Link to="/dashboard" className="flex items-center gap-2" aria-label="AIIM home">
          <LogoMark size="sm" full={false} />
          <span className="text-base font-bold tracking-tight text-annita-navy-900">AIIM</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/80 text-muted-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-brand-600 text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/80 text-foreground transition active:scale-95"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Hamburger Drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-overlay-in"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Sidebar */}
          <aside className="fixed inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col border-l border-border bg-surface shadow-2xl animate-modal-in">
            {/* Drawer Header */}
            <div className="flex h-16 items-center justify-between border-b border-border/80 px-5 bg-surface">
              <Link to="/dashboard" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5">
                <LogoMark size="sm" full={false} />
                <div>
                  <p className="text-base font-bold tracking-tight text-annita-navy-900 leading-tight">AIIM Hub</p>
                  <p className="text-[10px] font-semibold text-brand-700 uppercase">{user?.role || "Founder"} Role</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* In-Drawer Search Input */}
            <div className="p-3 border-b border-border/60 bg-background/40">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  placeholder="Search modules..."
                  className="h-10 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Role-filtered Drawer Navigation List */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4" aria-label="Mobile Navigation Drawer">
              <div>
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workspace</p>
                <ul className="space-y-1">
                  {nav.main.map((item) => {
                    const active = isActive(pathname, item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                            active ? "bg-brand-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ecosystem</p>
                <ul className="space-y-1">
                  {nav.ecosystem.map((item) => {
                    const active = isActive(pathname, item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                            active ? "bg-brand-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tools & Account</p>
                <ul className="space-y-1">
                  {nav.tools.map((item) => {
                    const active = isActive(pathname, item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                            active ? "bg-brand-600 text-white shadow-xs" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="border-t border-border p-3 bg-surface">
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-background p-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-xs">
                    {user?.name?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-foreground">{user?.name || user?.email || "User"}</p>
                    <p className="truncate text-[10px] text-muted-foreground capitalize">{user?.role || "Founder"}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { logout(); window.location.replace("/login"); }}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-danger/10 hover:text-danger"
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Main Page Body Container */}
      <main id="main-content" className="relative z-10 w-full px-3.5 py-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}