import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, MoreHorizontal, Sparkles, TrendingUp } from "lucide-react";

const mobileItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/deal-flow", label: "Deal Flow", icon: TrendingUp },
  { href: "/ask-aiim", label: "Ask AIIM", icon: Sparkles, highlight: true },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/more", label: "More", icon: MoreHorizontal },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-surface/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] shadow-lg md:hidden"
    >
      <ul className="grid grid-cols-5 h-16 items-center px-1">
        {mobileItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex justify-center">
              <Link
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-0.5 w-full py-1 text-[10px] font-bold transition-all ${
                  active
                    ? "text-brand-700"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Active Pill Glow */}
                {active ? (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-brand-600 shadow-sm shadow-brand-600" />
                ) : null}

                <div
                  className={`flex size-8 items-center justify-center rounded-xl transition-transform ${
                    item.highlight && !active
                      ? "bg-brand-50 text-brand-700"
                      : active
                      ? "bg-brand-100/70 text-brand-700 scale-105"
                      : ""
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-4.5 ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`}
                  />
                </div>
                <span className="truncate max-w-[60px]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}