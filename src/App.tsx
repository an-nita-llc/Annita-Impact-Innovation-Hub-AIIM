import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppShell } from "./components/layout/app-shell";
import { Seo } from "./components/seo";
import { lazyWithRetry } from "./lib/lazyWithRetry";

// Public Auth Pages
const Login = lazyWithRetry(() => import("./pages/Login"));
const Loader = lazyWithRetry(() => import("./pages/Loader"));
const Register = lazyWithRetry(() => import("./pages/Register"));
const ForgotPassword = lazyWithRetry(() => import("./pages/ForgotPassword"));
const ResetPassword = lazyWithRetry(() => import("./pages/ResetPassword"));
const TwoFactor = lazyWithRetry(() => import("./pages/TwoFactor"));
const VerifyEmail = lazyWithRetry(() => import("./pages/VerifyEmail"));

// Shared Pages
const Founders = lazyWithRetry(() => import("./pages/Founders"));
const Investors = lazyWithRetry(() => import("./pages/Investors"));
const Partners = lazyWithRetry(() => import("./pages/Partners"));
const Programs = lazyWithRetry(() => import("./pages/Programs"));
const Events = lazyWithRetry(() => import("./pages/Events"));
const Messages = lazyWithRetry(() => import("./pages/Messages"));
const Documents = lazyWithRetry(() => import("./pages/Documents"));
const Analytics = lazyWithRetry(() => import("./pages/Analytics"));
const Notifications = lazyWithRetry(() => import("./pages/Notifications"));
const Settings = lazyWithRetry(() => import("./pages/Settings"));
const Search = lazyWithRetry(() => import("./pages/Search"));
const AskAIIM = lazyWithRetry(() => import("./pages/AskAIIM"));
const Pilots = lazyWithRetry(() => import("./pages/Pilots"));
const Evaluations = lazyWithRetry(() => import("./pages/Evaluations"));
const Onboarding = lazyWithRetry(() => import("./pages/Onboarding"));
const InstitutionalMemory = lazyWithRetry(() => import("./pages/InstitutionalMemory"));
const AdminConsole = lazyWithRetry(() => import("./pages/AdminConsole"));
const HelpCenter = lazyWithRetry(() => import("./pages/HelpCenter"));
const IdeaManagement = lazyWithRetry(() => import("./pages/IdeaManagement"));
const TechnologyScouting = lazyWithRetry(() => import("./pages/TechnologyScouting"));
const OpenInnovation = lazyWithRetry(() => import("./pages/OpenInnovation"));
const RoiTracking = lazyWithRetry(() => import("./pages/RoiTracking"));
const StageGates = lazyWithRetry(() => import("./pages/StageGates"));
const AuditLog = lazyWithRetry(() => import("./pages/AuditLog"));
const Billing = lazyWithRetry(() => import("./pages/Billing"));
const Integrations = lazyWithRetry(() => import("./pages/Integrations"));
const TrustCenter = lazyWithRetry(() => import("./pages/TrustCenter"));
const StatusPage = lazyWithRetry(() => import("./pages/StatusPage"));
const ValuationCalculator = lazyWithRetry(() => import("./pages/ValuationCalculator"));
const InnovationMap = lazyWithRetry(() => import("./pages/InnovationMap"));
const DealFlow = lazyWithRetry(() => import("./pages/DealFlow"));
const Pipeline = lazyWithRetry(() => import("./pages/Pipeline"));
const DealRooms = lazyWithRetry(() => import("./pages/DealRooms"));

// Role-Dedicated Folder Pages
const FounderDashboard = lazyWithRetry(() => import("./pages/roles/founder/FounderDashboard"));
const InvestorDashboard = lazyWithRetry(() => import("./pages/roles/investor/InvestorDashboard"));
const PartnerDashboard = lazyWithRetry(() => import("./pages/roles/partner/PartnerDashboard"));

import { moreNavItems } from "./components/navigation/nav-items";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const Page = ({ children, title = "Workspace", description = "AI-powered impact and innovation ecosystem." }: { children: React.ReactNode; title?: string; description?: string }) => (
  <ProtectedRoute>
    <Seo title={title} description={description} />
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

function RoleDashboard() {
  const { user } = useAuth();
  const role = user?.role || "founder";

  if (role === "investor") return <InvestorDashboard />;
  if (role === "partner") return <PartnerDashboard />;
  return <FounderDashboard />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Loader />} />
            <Route path="/loader" element={<Loader />} />

            {/* Auth (public) */}
            <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
            <Route path="/signup" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
            <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
            <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />
            <Route path="/reset-password" element={<PublicOnlyRoute><ResetPassword /></PublicOnlyRoute>} />
            <Route path="/two-factor" element={<TwoFactor />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Role-Aware Dashboard Router */}
            <Route path="/dashboard" element={<Page title="Dashboard"><RoleDashboard /></Page>} />

            {/* Primary Workspace Routes */}
            <Route path="/deal-flow" element={<Page title="Deal Flow"><DealFlow /></Page>} />
            <Route path="/pipeline" element={<Page title="Pipeline"><Pipeline /></Page>} />
            <Route path="/deal-rooms" element={<Page title="Deal Rooms"><DealRooms /></Page>} />
            <Route path="/valuation" element={<Page title="Valuation Engine"><ValuationCalculator /></Page>} />
            <Route path="/innovation-map" element={<Page title="African Innovation Map"><InnovationMap /></Page>} />
            <Route path="/founders" element={<Page title="Founders"><Founders /></Page>} />
            <Route path="/investors" element={<Page title="Investors"><Investors /></Page>} />
            <Route path="/partners" element={<Page title="Partners"><Partners /></Page>} />
            <Route path="/programs" element={<Page title="Programs"><Programs /></Page>} />
            <Route path="/events" element={<Page title="Events"><Events /></Page>} />
            <Route path="/messages" element={<Page title="Messages"><Messages /></Page>} />
            <Route path="/documents" element={<Page title="Documents"><Documents /></Page>} />
            <Route path="/analytics" element={<Page title="Analytics"><Analytics /></Page>} />
            <Route path="/notifications" element={<Page title="Notifications"><Notifications /></Page>} />
            <Route path="/settings" element={<Page title="Settings"><Settings /></Page>} />
            <Route path="/search" element={<Page title="Search"><Search /></Page>} />
            <Route path="/ask-aiim" element={<Page title="AIIM AI"><AskAIIM /></Page>} />
            <Route path="/pilots" element={<Page title="Pilots"><Pilots /></Page>} />
            <Route path="/evaluations" element={<Page title="Evaluations"><Evaluations /></Page>} />
            <Route path="/onboarding" element={<Page title="Onboarding"><Onboarding /></Page>} />
            <Route path="/institutional-memory" element={<Page title="Institutional Memory"><InstitutionalMemory /></Page>} />
            <Route path="/admin" element={<Page title="Admin Console"><AdminConsole /></Page>} />
            <Route path="/help" element={<Page title="Help Center"><HelpCenter /></Page>} />
            <Route path="/ideas" element={<Page title="Idea Management"><IdeaManagement /></Page>} />
            <Route path="/scouting" element={<Page title="Technology Scouting"><TechnologyScouting /></Page>} />
            <Route path="/challenges" element={<Page title="Open Innovation"><OpenInnovation /></Page>} />
            <Route path="/roi" element={<Page title="ROI Tracking"><RoiTracking /></Page>} />
            <Route path="/stage-gates" element={<Page title="Stage-Gate Governance"><StageGates /></Page>} />
            <Route path="/audit-log" element={<Page title="Audit Log"><AuditLog /></Page>} />
            <Route path="/billing" element={<Page title="Billing"><Billing /></Page>} />
            <Route path="/integrations" element={<Page title="Integrations"><Integrations /></Page>} />
            <Route path="/trust" element={<Page title="Trust Center"><TrustCenter /></Page>} />
            <Route path="/status" element={<Page title="System Health"><StatusPage /></Page>} />

            <Route path="/more" element={<Page>
              <div className="grid gap-3 sm:grid-cols-2">
                {moreNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} to={item.href} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition hover:bg-muted">
                      <Icon aria-hidden="true" className="size-5 text-brand-700" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </Page>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}