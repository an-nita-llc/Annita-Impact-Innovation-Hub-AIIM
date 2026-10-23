import { CalendarClock, FileText, MessagesSquare, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const highlights = [
  {
    icon: CalendarClock,
    title: "Deal flow, matched",
    description: "Curated founders and funders, matched by AI.",
  },
  {
    icon: FileText,
    title: "Deal rooms & documents",
    description: "Negotiate, share, and sign securely.",
  },
  {
    icon: MessagesSquare,
    title: "Programs & community",
    description: "Connect with partners, mentors, and peers in one hub.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "Your records stay yours. Every access is audited.",
  },
];

const trustChips = [
  "Audited access",
  "Privacy by design",
  "Built for Africa",
];

export function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-annita-navy-950 text-white lg:flex lg:h-full lg:flex-col lg:justify-between lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-brand-700/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-grid-faint pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div className="relative">
        <Logo
          size="lg"
          textClassName="text-white"
          subtext="Impact & Innovation Hub"
          subtextClassName="text-white/60"
        />
      </div>

      <div className="relative flex flex-col gap-9">
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
            One hub for founders, investors, and partners.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            Deal flow, programs, and community —
            designed for your phone first.
          </p>
        </div>
        <ul className="flex flex-col gap-5">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <li key={highlight.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm">
                  <Icon aria-hidden="true" className="size-5 text-brand-300" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {highlight.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-5 text-white/65">
                    {highlight.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {trustChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}