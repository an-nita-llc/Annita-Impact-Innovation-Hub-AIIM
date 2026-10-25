import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Briefcase,
  Calculator,
  Globe,
  Home,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

type BottomNavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  isAiCenter?: boolean;
};

const ROLE_BOTTOM_NAV: Record<string, BottomNavItem[]> = {
  founder: [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/investors", label: "Investors", icon: Users },
    { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, isAiCenter: true },
    { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
    { href: "/valuation", label: "Valuation", icon: Calculator },
  ],
  investor: [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/deal-flow", label: "Deal Flow", icon: TrendingUp },
    { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, isAiCenter: true },
    { href: "/pipeline", label: "Pipeline", icon: BarChart3 },
    { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
  ],
  partner: [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/challenges", label: "Challenges", icon: Rocket },
    { href: "/ask-aiim", label: "AIIM AI", icon: Sparkles, isAiCenter: true },
    { href: "/pilots", label: "Pilots", icon: Zap },
    { href: "/scouting", label: "Scouting", icon: Search },
  ],
};

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = (user?.role ?? "founder") as keyof typeof ROLE_BOTTOM_NAV;
  const items = ROLE_BOTTOM_NAV[role] ?? ROLE_BOTTOM_NAV.founder;

  return (
    <nav
      aria-label="Mobile Role Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-surface/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] shadow-lg md:hidden"
    >
      <ul className="grid grid-cols-5 h-16 items-center px-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          const isAi = item.isAiCenter;

          return (
            <li key={item.href} className="flex justify-center">
              <Link
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-0.5 w-full py-1 text-[10px] font-extrabold transition-all active:scale-95 ${
                  active
                    ? "text-brand-700"
                    : isAi
                    ? "text-brand-600"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Active Glow Bar */}
                {active ? (
                  <span className="absolute top-0 h-0.5 w-7 rounded-full bg-brand-600 shadow-sm shadow-brand-600" />
                ) : null}

                {/* Button Icon Container */}
                <div
                  className={`flex items-center justify-center rounded-2xl transition-all ${
                    isAi
                      ? "size-9 bg-brand-600 text-white shadow-xs -mt-2.5 border-2 border-surface"
                      : active
                      ? "size-8 bg-brand-100/80 text-brand-700 scale-105"
                      : "size-8"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`${isAi ? "size-5" : "size-4"} ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`}
                  />
                </div>

                <span className={`truncate max-w-[58px] ${isAi ? "font-black text-brand-700 mt-0.5" : ""}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}