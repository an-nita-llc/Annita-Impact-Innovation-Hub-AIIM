import { CheckCircle2, Code2, Webhook } from "lucide-react";

const INTEGRATIONS = [
  { name: "Google Calendar", status: "Connected", desc: "Sync meeting schedules & demo day calendar invites" },
  { name: "HubSpot CRM", status: "Not Connected", desc: "Sync founder profiles & deal pipeline contacts" },
  { name: "DocuSign e-Sign", status: "Connected", desc: "Automate SAFE agreement e-signatures in deal rooms" },
  { name: "Slack Connect", status: "Connected", desc: "Real-time match & diligence alerts in team channels" },
  { name: "Salesforce CRM", status: "Not Connected", desc: "Enterprise LP pipeline synchronization" },
  { name: "Stripe Billing", status: "Connected", desc: "Subscription metering & invoice management" },
];

export default function Integrations() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Integrations & API Webhooks</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Connect external CRMs, calendar systems, e-signature tools, and public REST webhooks.
        </p>
      </div>

      <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {INTEGRATIONS.map((i) => (
          <div key={i.name} className="glass-card flex flex-col justify-between transition-all hover:border-brand-300 p-4 sm:p-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-foreground">{i.name}</h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    i.status === "Connected"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {i.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{i.desc}</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm min-h-[44px] mt-4 w-full">
              {i.status === "Connected" ? "Configure" : "Connect Tool"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}