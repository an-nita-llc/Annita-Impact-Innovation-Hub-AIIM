import { useState } from "react";
import { Lock, Mail, Shield, User } from "lucide-react";

export default function Settings() {
  const [tab, setTab] = useState<"profile" | "security" | "notifications" | "integrations">("profile");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Profile, security, preferences, and integrations.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "profile", label: "Profile", icon: User },
            { id: "security", label: "Security", icon: Shield },
            { id: "notifications", label: "Notifications", icon: Mail },
            { id: "integrations", label: "Integrations", icon: Lock },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${tab === t.id ? "bg-brand-600 text-white" : "border border-border bg-surface text-muted-foreground hover:text-foreground"}`}>
              <Icon aria-hidden="true" className="size-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="glass-card">
        {tab === "profile" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name" value="Amina Diallo" />
            <Field label="Email" value="amina@solara.com" />
            <Field label="Role" value="Founder" />
            <Field label="Organization" value="Solara climate OS" />
          </div>
        ) : null}
        {tab === "security" ? (
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Passkeys · 2 devices enrolled</p>
            <p>Two‑factor authentication · Enabled</p>
            <p>Sessions · 3 active</p>
            <button type="button" className="btn btn-secondary btn-sm w-fit">Manage security</button>
          </div>
        ) : null}
        {tab === "notifications" ? (
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Email digest · Weekly</p>
            <p>In‑app alerts · Matched, messages, deal room updates</p>
            <button type="button" className="btn btn-secondary btn-sm w-fit">Customize</button>
          </div>
        ) : null}
        {tab === "integrations" ? (
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Google Calendar · Connected</p>
            <p>HubSpot CRM · Not connected</p>
            <p>DocuSign · Connected</p>
            <button type="button" className="btn btn-secondary btn-sm w-fit">Connect more</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input defaultValue={value} className="min-h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-500" />
    </div>
  );
}