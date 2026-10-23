import {
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  CalendarClock,
  ClipboardList,
  FileText,
  FolderOpen,
  History,
  Home,
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
  Zap,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
};

export const mobileNavItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/deal-flow", label: "Deal Flow", icon: TrendingUp },
  { href: "/pipeline", label: "Pipeline", icon: BarChart3 },
  { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
  { href: "/more", label: "More", icon: ClipboardList },
];

export const moreNavItems: NavItem[] = [
  { href: "/search", label: "Search", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/programs", label: "Programs", icon: Rocket },
  { href: "/events", label: "Events", icon: CalendarClock },
  { href: "/founders", label: "Founders", icon: Users },
  { href: "/investors", label: "Investors", icon: Users },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/ask-aiim", label: "Ask AIIM", icon: Sparkles },
  { href: "/security", label: "Security", icon: ShieldCheck },
  { href: "/finance", label: "Finance", icon: Zap },
  { href: "/pilots", label: "Pilots", icon: Zap },
  { href: "/evaluations", label: "Evaluations", icon: Zap },
  { href: "/institutional-memory", label: "Institutional Memory", icon: History },
  { href: "/onboarding", label: "Onboarding", icon: UserCheck },
  { href: "/admin", label: "Admin Console", icon: Shield },
  { href: "/help", label: "Help Center", icon: BookOpen },
  { href: "/ideas", label: "Idea Management", icon: Rocket },
  { href: "/scouting", label: "Technology Scouting", icon: Search },
  { href: "/challenges", label: "Open Innovation", icon: Rocket },
  { href: "/roi", label: "ROI & FP&A", icon: TrendingUp },
  { href: "/stage-gates", label: "Stage-Gate Governance", icon: Shield },
];

export const sidebarNavItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/deal-flow", label: "Deal Flow", icon: TrendingUp },
  { href: "/pipeline", label: "Pipeline", icon: BarChart3 },
  { href: "/deal-rooms", label: "Deal Rooms", icon: Briefcase },
  { href: "/founders", label: "Founders", icon: Users },
  { href: "/investors", label: "Investors", icon: Users },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/programs", label: "Programs", icon: Rocket },
  { href: "/events", label: "Events", icon: CalendarClock },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];
