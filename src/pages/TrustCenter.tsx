import { CheckCircle2, FileText, Lock, Shield } from "lucide-react";

export default function TrustCenter() {
  const certs = [
    { name: "SOC 2 Type II", status: "In Audit Window", desc: "Audit window Q3 2026" },
    { name: "ISO/IEC 27001", status: "Planned", desc: "Target 2026" },
    { name: "GDPR & NDPR Compliance", status: "Compliant", desc: "Data protection impact assessment verified" },
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <div className="border-b border-border/60 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Trust & Compliance Center</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Platform security documentation, data protection standards, and compliance certifications.
        </p>
      </div>

      <div className="grid gap-3.5 sm:gap-4 md:grid-cols-3 w-full">
        {certs.map((c) => (
          <div key={c.name} className="glass-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-brand-600 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-foreground">{c.name}</h2>
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-700">{c.status}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card w-full p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
          Core Security Architecture
        </p>
        <ul className="mt-4 space-y-2.5 text-xs font-semibold text-muted-foreground">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span>AES-256 encryption at rest, TLS 1.3 enforced in transit</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span>Multi-factor authentication (MFA) & OAuth 2.0 / Passkey support</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span>Strict multi-tenant data isolation below application layer</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span>Append-only immutable audit logging with 12-month retention</span>
          </li>
        </ul>
      </div>
    </div>
  );
}