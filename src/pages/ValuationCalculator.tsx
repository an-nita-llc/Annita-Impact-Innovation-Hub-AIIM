import { useState, useMemo } from "react";
import {
  Calculator,
  CheckCircle2,
  DollarSign,
  Download,
  Info,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function ValuationCalculator() {
  // VC Method Inputs
  const [expectedExit, setExpectedExit] = useState(25000000); // $25M
  const [targetIrr, setTargetIrr] = useState(30); // 30%
  const [holdingYears, setHoldingYears] = useState(5); // 5 years

  // Berkus Method Checkbox States
  const [berkusIdea, setBerkusIdea] = useState(true); // Sound Idea ($500K)
  const [berkusPrototype, setBerkusPrototype] = useState(true); // Prototype ($500K)
  const [berkusTeam, setBerkusTeam] = useState(true); // Quality Mgmt Team ($500K)
  const [berkusAlliances, setBerkusAlliances] = useState(true); // Strategic Alliances ($500K)
  const [berkusProductRollout, setBerkusProductRollout] = useState(false); // Product Rollout ($500K)

  // Scorecard Method Factor (0.8x to 1.3x)
  const [scorecardFactor, setScorecardFactor] = useState(1.15); // 1.15x

  // VC Method Post-Money Valuation Formula:
  // Post-Money = (Expected Exit Value / (1 + Target IRR / 100)^Years) * Scorecard Factor
  const vcMethodPostMoney = useMemo(() => {
    const rawVal = expectedExit / Math.pow(1 + targetIrr / 100, holdingYears);
    return Math.round(rawVal * scorecardFactor);
  }, [expectedExit, targetIrr, holdingYears, scorecardFactor]);

  // Berkus Method Valuation (Max $2.5M)
  const berkusValuation = useMemo(() => {
    let count = 0;
    if (berkusIdea) count += 500000;
    if (berkusPrototype) count += 500000;
    if (berkusTeam) count += 500000;
    if (berkusAlliances) count += 500000;
    if (berkusProductRollout) count += 500000;
    return count;
  }, [berkusIdea, berkusPrototype, berkusTeam, berkusAlliances, berkusProductRollout]);

  // Combined Consensus Valuation Range
  const averageValuation = useMemo(() => {
    return Math.round((vcMethodPostMoney + berkusValuation) / 2);
  }, [vcMethodPostMoney, berkusValuation]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">Multi-Methodology Valuation Engine</h1>
            <span className="rounded-full bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 flex items-center gap-1">
              <Sparkles className="size-3" /> Berkus + Scorecard + VC Method
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Calculate defensible pre-money and post-money valuation ranges combining institutional VC formulas.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm min-h-[44px] w-full sm:w-auto">
          <Download className="size-4" /> Export Valuation Memo
        </button>
      </div>

      {/* Summary Valuation Banner */}
      <div className="glass-card bg-gradient-to-r from-annita-navy-900 to-annita-navy-800 text-white p-6 rounded-2xl sm:rounded-3xl shadow-md border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Consensus Post-Money Valuation Range</p>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
              ${(averageValuation / 1e6).toFixed(2)}M USD
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Estimated range: <strong className="text-white">${((averageValuation * 0.85) / 1e6).toFixed(2)}M</strong> – <strong className="text-white">${((averageValuation * 1.15) / 1e6).toFixed(2)}M</strong>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 text-xs text-slate-200 bg-white/10 p-3.5 rounded-xl backdrop-blur-xs">
            <span className="font-bold flex items-center gap-1">
              <CheckCircle2 className="size-4 text-emerald-400" /> VC Formula Verified
            </span>
            <span>Target Exit: ${(expectedExit / 1e6).toFixed(0)}M at {targetIrr}% IRR ({holdingYears} yrs)</span>
          </div>
        </div>
      </div>

      {/* Calculator Inputs Grid */}
      <div className="grid gap-6 lg:grid-cols-2 w-full">
        {/* VC Method Controls */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Calculator className="size-4 text-brand-600" />
                <span>1. VC Method Valuation Model</span>
              </h2>
              <span className="text-xs font-bold text-brand-700">${(vcMethodPostMoney / 1e6).toFixed(2)}M</span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-foreground mb-1">
                  <span>Expected Exit Value ($)</span>
                  <span className="text-brand-700">${(expectedExit / 1e6).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="100000000"
                  step="1000000"
                  value={expectedExit}
                  onChange={(e) => setExpectedExit(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-muted rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-foreground mb-1">
                  <span>Target Investor IRR (%)</span>
                  <span className="text-brand-700">{targetIrr}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={targetIrr}
                  onChange={(e) => setTargetIrr(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-muted rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-foreground mb-1">
                  <span>Holding Period (Years)</span>
                  <span className="text-brand-700">{holdingYears} Years</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-muted rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-foreground mb-1">
                  <span>Scorecard Multiplier Factor</span>
                  <span className="text-brand-700">{scorecardFactor.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={scorecardFactor}
                  onChange={(e) => setScorecardFactor(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-muted rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
            Formula: Post-Money = (Exit / (1 + IRR)^Years) × Scorecard Factor
          </div>
        </div>

        {/* Berkus Method Controls */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="size-4 text-emerald-600" />
                <span>2. Berkus Method Risk Criteria</span>
              </h2>
              <span className="text-xs font-bold text-emerald-700">${(berkusValuation / 1e6).toFixed(2)}M</span>
            </div>

            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Adds up to $500,000 value for each risk-mitigating milestone achieved by early-stage startups:
            </p>

            <ul className="mt-3 space-y-2.5 text-xs">
              {[
                { state: berkusIdea, set: setBerkusIdea, label: "Sound Basic Idea / IP Defensibility", val: "+$500K" },
                { state: berkusPrototype, set: setBerkusPrototype, label: "Working MVP / Technical Prototype", val: "+$500K" },
                { state: berkusTeam, set: setBerkusTeam, label: "Quality Executive Management Team", val: "+$500K" },
                { state: berkusAlliances, set: setBerkusAlliances, label: "Strategic Corporate Alliances / Pilots", val: "+$500K" },
                { state: berkusProductRollout, set: setBerkusProductRollout, label: "Full Commercial Product Rollout & Revenue", val: "+$500K" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-background/50">
                  <label className="flex items-center gap-2.5 cursor-pointer font-bold text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.set(e.target.checked)}
                      className="size-4 accent-brand-600 rounded"
                    />
                    <span>{item.label}</span>
                  </label>
                  <span className="font-bold text-emerald-700">{item.val}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Info className="size-3.5 text-brand-600" />
            <span>Cap at $2.5M pre-revenue valuation for early African seed rounds.</span>
          </div>
        </div>
      </div>
    </div>
  );
}