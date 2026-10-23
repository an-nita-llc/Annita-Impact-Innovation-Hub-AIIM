import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground md:pl-64 pb-20 md:pb-0">
      <Sidebar />
      <main id="main-content" className="relative z-10 px-4 py-6 md:px-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}