import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppShell } from "./components/layout/app-shell";
import { Seo } from "./components/seo";
const Login = lazy(() => import("./pages/Login"));
const Loader = lazy(() => import("./pages/Loader"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const TwoFactor = lazy(() => import("./pages/TwoFactor"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DealFlow = lazy(() => import("./pages/DealFlow"));
const Pipeline = lazy(() => import("./pages/Pipeline"));
const DealRooms = lazy(() => import("./pages/DealRooms"));
const Founders = lazy(() => import("./pages/Founders"));
const Investors = lazy(() => import("./pages/Investors"));
const Partners = lazy(() => import("./pages/Partners"));
const Programs = lazy(() => import("./pages/Programs"));
const Events = lazy(() => import("./pages/Events"));
const Messages = lazy(() => import("./pages/Messages"));
const Documents = lazy(() => import("./pages/Documents"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Settings = lazy(() => import("./pages/Settings"));
const Search = lazy(() => import("./pages/Search"));
const AskAIIM = lazy(() => import("./pages/AskAIIM"));
const Pilots = lazy(() => import("./pages/Pilots"));
const Evaluations = lazy(() => import("./pages/Evaluations"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const InstitutionalMemory = lazy(() => import("./pages/InstitutionalMemory"));
const AdminConsole = lazy(() => import("./pages/AdminConsole"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const IdeaManagement = lazy(() => import("./pages/IdeaManagement"));
const TechnologyScouting = lazy(() => import("./pages/TechnologyScouting"));
const OpenInnovation = lazy(() => import("./pages/OpenInnovation"));
const RoiTracking = lazy(() => import("./pages/RoiTracking"));
const StageGates = lazy(() => import("./pages/StageGates"));
const AuditLog = lazy(() => import("./pages/AuditLog"));
const Billing = lazy(() => import("./pages/Billing"));
const Integrations = lazy(() => import("./pages/Integrations"));
const TrustCenter = lazy(() => import("./pages/TrustCenter"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
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

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

const Page = ({ children, title = "Workspace", description = "AI-powered impact and innovation ecosystem for founders, investors, and partners." }: { children: React.ReactNode; title?: string; description?: string }) => (
  <ProtectedRoute>
    <Seo title={title} description={description} />
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

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

            {/* App (protected) */}
            <Route path="/dashboard" element={<Page title="Dashboard" description="Role-based dashboard for founders, investors, and partners."><Dashboard /></Page>} />
            <Route path="/deal-flow" element={<Page title="Deal Flow" description="AI-matched founders, investors, and partners with explainable scores."><DealFlow /></Page>} />
            <Route path="/pipeline" element={<Page><Pipeline /></Page>} />
            <Route path="/deal-rooms" element={<Page><DealRooms /></Page>} />
            <Route path="/founders" element={<Page><Founders /></Page>} />
            <Route path="/investors" element={<Page><Investors /></Page>} />
            <Route path="/partners" element={<Page><Partners /></Page>} />
            <Route path="/programs" element={<Page><Programs /></Page>} />
            <Route path="/events" element={<Page><Events /></Page>} />
            <Route path="/messages" element={<Page><Messages /></Page>} />
            <Route path="/documents" element={<Page><Documents /></Page>} />
            <Route path="/analytics" element={<Page><Analytics /></Page>} />
            <Route path="/notifications" element={<Page><Notifications /></Page>} />
            <Route path="/settings" element={<Page><Settings /></Page>} />
            <Route path="/search" element={<Page><Search /></Page>} />
            <Route path="/ask-aiim" element={<Page><AskAIIM /></Page>} />
            <Route path="/pilots" element={<Page><Pilots /></Page>} />
            <Route path="/evaluations" element={<Page><Evaluations /></Page>} />
            <Route path="/onboarding" element={<Page><Onboarding /></Page>} />
            <Route path="/institutional-memory" element={<Page><InstitutionalMemory /></Page>} />
            <Route path="/admin" element={<Page><AdminConsole /></Page>} />
            <Route path="/help" element={<Page><HelpCenter /></Page>} />
            <Route path="/ideas" element={<Page><IdeaManagement /></Page>} />
            <Route path="/scouting" element={<Page><TechnologyScouting /></Page>} />
            <Route path="/challenges" element={<Page><OpenInnovation /></Page>} />
            <Route path="/roi" element={<Page><RoiTracking /></Page>} />
            <Route path="/stage-gates" element={<Page><StageGates /></Page>} />
            <Route path="/audit-log" element={<Page><AuditLog /></Page>} />
            <Route path="/billing" element={<Page><Billing /></Page>} />
            <Route path="/integrations" element={<Page><Integrations /></Page>} />
            <Route path="/trust" element={<Page><TrustCenter /></Page>} />
            <Route path="/status" element={<Page><StatusPage /></Page>} />

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