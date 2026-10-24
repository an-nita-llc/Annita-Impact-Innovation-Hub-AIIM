import { useState } from "react";
import { Lock, Mail, Shield, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"profile" | "security" | "notifications" | "integrations">("profile");

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Account & Organization Settings</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">Manage profile, passkeys, multi-factor security, and platform notifications.</p>
      </div>

      {/* Touch Friendly Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "profile", label: "Profile & Org", icon: User },
          { id: "security", label: "Security & Passkeys", icon: Shield },
          { id: "notifications", label: "Notifications", icon: Mail },
          { id: "integrations", label: "Connected Apps", icon: Lock },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all active:scale-[0.98] ${
                active ? "bg-brand-600 text-white shadow-xs" : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div className="glass-card w-full">
        {tab === "profile" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display Name" value={user?.name || "Amina Diallo"} />
            <Field label="Email Address" value={user?.email || "user@aiim.com"} />
            <Field label="User Role" value={user?.role || "Founder"} />
            <Field label="Organization" value={user?.firmName || "Solara Climate OS"} />
            <div className="sm:col-span-2 pt-2">
              <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">Save Profile Changes</button>
            </div>
          </div>
        ) : null}

        {tab === "security" ? (
          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-xl border border-border bg-background">
              <p className="font-bold text-foreground">Passkeys & Security Keys</p>
              <p className="text-muted-foreground mt-0.5">2 biometric passkey devices currently registered for passwordless sign-in.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-background">
              <p className="font-bold text-foreground">Two-Factor Authentication (2FA)</p>
              <p className="text-emerald-700 font-bold mt-0.5">✓ Enabled via Authenticator App</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">Manage Security Devices</button>
          </div>
        ) : null}

        {tab === "notifications" ? (
          <div className="space-y-3 text-xs">
            <p className="font-bold text-foreground">Email Digest Frequency</p>
            <p className="text-muted-foreground">Weekly activity digest & real-time deal room alerts enabled.</p>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">Customize Preferences</button>
          </div>
        ) : null}

        {tab === "integrations" ? (
          <div className="space-y-3 text-xs">
            <p className="font-bold text-foreground">Connected Integrations</p>
            <p className="text-muted-foreground">Google Calendar and DocuSign connected to account.</p>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] w-full sm:w-auto">Configure Apps</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-muted-foreground">{label}</label>
      <input
        defaultValue={value}
        className="h-10 rounded-xl border border-border/80 bg-background px-3 text-xs font-semibold text-foreground outline-none focus:border-brand-500"
      />
    </div>
  );
}