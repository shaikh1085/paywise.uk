import React, { useState, useMemo } from 'react';
import { ChildBenefitInput, TaxYear } from '../../types';
import { calculateChildBenefit } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import { Heart, RotateCcw, TrendingDown, AlertCircle, CheckCircle, Info } from 'lucide-react';

export const ChildBenefitCalculator: React.FC = () => {
  const [input, setInput] = useState<ChildBenefitInput>({
    numberOfChildren: 2,
    higherEarnerIncome: 55000,
    taxYear: '2025_26',
    claimingBenefit: true,
  });

  const result = useMemo(() => {
    if (!input.numberOfChildren || input.numberOfChildren < 1) return null;
    return calculateChildBenefit(input);
  }, [input]);

  const handleReset = () => {
    setInput({
      numberOfChildren: 2,
      higherEarnerIncome: 55000,
      taxYear: '2025_26',
      claimingBenefit: true,
    });
  };

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fmtInt = (n: number) =>
    '£' + Math.round(n).toLocaleString('en-GB');

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26' },
    { value: '2026_27', label: '2026/27' },
    { value: '2024_25', label: '2024/25' },
  ];

  const recColors = {
    claim_full: 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/40 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]',
    claim_aware: 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    opt_out_consider: 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    opt_out: 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400',
  };

  const recIcons = {
    claim_full: <CheckCircle className="w-4 h-4 shrink-0" />,
    claim_aware: <Info className="w-4 h-4 shrink-0" />,
    opt_out_consider: <AlertCircle className="w-4 h-4 shrink-0" />,
    opt_out: <TrendingDown className="w-4 h-4 shrink-0" />,
  };

  const copyText = result
    ? `PayWise UK — Child Benefit Calculator:
Children: ${result.numberOfChildren}
Tax Year: ${result.taxYearLabel}
Higher Earner Income: ${fmtInt(result.higherEarnerIncome)}
---
Gross Child Benefit: ${fmt(result.totalAnnualBenefit)}/yr (${fmt(result.totalWeeklyBenefit)}/wk)
HICBC Charge: -${fmt(result.hicbcAnnual)}/yr (${result.chargePercent.toFixed(0)}% clawback)
Net Child Benefit: ${fmt(result.netAnnualBenefit)}/yr (${fmt(result.netMonthlyBenefit)}/mo)
---
Recommendation: ${result.recommendationText}
Calculated via PayWise UK (https://paywiseuk.vercel.app/child-benefit-calculator)`
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Your Details
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="space-y-5">
          {/* Number of Children */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Number of Children
              </label>
              <Tooltip content="Include all children you receive Child Benefit for. Child Benefit can be claimed for children under 16, or under 20 if in approved education or training." title="Number of Children" />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, numberOfChildren: Math.max(1, p.numberOfChildren - 1) }))}
                className="w-10 h-10 rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#111111] dark:text-[#F5F5F5] font-black text-lg flex items-center justify-center hover:border-[#059669]/50 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-black text-[#111111] dark:text-[#F5F5F5]">{input.numberOfChildren}</span>
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3] ml-1">{input.numberOfChildren === 1 ? 'child' : 'children'}</span>
              </div>
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, numberOfChildren: Math.min(10, p.numberOfChildren + 1) }))}
                className="w-10 h-10 rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#111111] dark:text-[#F5F5F5] font-black text-lg flex items-center justify-center hover:border-[#059669]/50 transition-all"
              >
                +
              </button>
            </div>
            <div className="flex gap-2 mt-3 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, numberOfChildren: n }))}
                  className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all ${
                    input.numberOfChildren === n
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Higher Earner Income */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Higher Earner's Adjusted Net Income
              </label>
              <Tooltip content="Adjusted Net Income is your gross income minus pension contributions and Gift Aid donations. It is the figure HMRC uses to calculate the HICBC. If you make pension contributions, your adjusted net income will be lower than your gross salary." title="Adjusted Net Income" />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={input.higherEarnerIncome || ''}
                onChange={(e) => setInput((p) => ({ ...p, higherEarnerIncome: parseFloat(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 65000"
              />
            </div>
            <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">
              The higher earner in the household pays the HICBC charge
            </p>
            {/* Quick income shortcuts */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {[50000, 60000, 70000, 80000, 100000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, higherEarnerIncome: v }))}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-bold border transition-all ${
                    input.higherEarnerIncome === v
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {v >= 1000 ? `£${v / 1000}k` : `£${v}`}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <select
              value={input.taxYear}
              onChange={(e) => setInput((p) => ({ ...p, taxYear: e.target.value as TaxYear }))}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
            >
              {taxYears.map((y) => (
                <option key={y.value} value={y.value}>{y.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-4">
        {result ? (
          <>
            {/* Main Result Card */}
            <div className={`relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] bg-white dark:bg-[#171717] ${result.isAboveTaperEnd ? 'border-t-rose-500' : result.isAboveThreshold ? 'border-t-amber-500' : 'border-t-[#059669] dark:border-t-[#10B981]'}`}>

              {/* Recommendation banner */}
              <div className={`flex items-start gap-3 p-3.5 rounded-xl mb-6 border ${recColors[result.recommendation]}`}>
                {recIcons[result.recommendation]}
                <p className="text-xs font-semibold leading-relaxed">{result.recommendationText}</p>
              </div>

              {/* Key figures */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-center">
                  <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">Gross Annual</p>
                  <p className="text-base font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    <AnimatedNumber value={result.totalAnnualBenefit} prefix="£" decimals={2} />
                  </p>
                </div>
                <div className="rounded-xl p-4 border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 text-center">
                  <p className="text-2xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">HICBC Charge</p>
                  <p className="text-base font-black text-rose-600 dark:text-rose-400 tabular-nums">
                    -<AnimatedNumber value={result.hicbcAnnual} prefix="£" decimals={2} />
                  </p>
                </div>
                <div className="rounded-xl p-4 border border-[#059669]/30 dark:border-[#10B981]/30 bg-[#F0FDF4] dark:bg-[#052e16] text-center">
                  <p className="text-2xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] mb-1">Net Annual</p>
                  <p className="text-base font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    <AnimatedNumber value={result.netAnnualBenefit} prefix="£" decimals={2} />
                  </p>
                </div>
              </div>

              {/* Detailed breakdown */}
              <div className="space-y-2 mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">Full Breakdown</p>
                {[
                  { label: `First child (${fmt(result.firstChildWeeklyRate)}/wk × 52)`, value: result.firstChildWeeklyRate * 52, positive: true },
                  ...(result.numberOfChildren > 1 ? [{
                    label: `${result.numberOfChildren - 1} additional ${result.numberOfChildren - 1 === 1 ? 'child' : 'children'} (${fmt(result.additionalChildWeeklyRate)}/wk × 52 × ${result.numberOfChildren - 1})`,
                    value: result.additionalChildWeeklyRate * 52 * (result.numberOfChildren - 1),
                    positive: true
                  }] : []),
                  { label: 'Total Gross Child Benefit (annual)', value: result.totalAnnualBenefit, positive: true, bold: true },
                  ...(result.isAboveThreshold ? [{ label: `HICBC — ${result.chargePercent.toFixed(0)}% clawback (income £${result.higherEarnerIncome.toLocaleString('en-GB')})`, value: result.hicbcAnnual, positive: false, bold: false }] : []),
                  { label: 'Net Child Benefit (annual)', value: result.netAnnualBenefit, positive: true, bold: true, green: true },
                  { label: 'Net Child Benefit (monthly)', value: result.netMonthlyBenefit, positive: true, bold: false, green: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2 px-3 rounded-lg border text-xs ${item.bold ? 'bg-[#F5F5F5] dark:bg-[#111111] border-[#E5E5E5] dark:border-[#2A2A2A] font-bold' : 'bg-white dark:bg-[#171717] border-[#F0F0F0] dark:border-[#222222]'}`}>
                    <span className="text-[#525252] dark:text-[#A3A3A3]">{item.label}</span>
                    <span className={`font-black tabular-nums ${item.green ? 'text-[#059669] dark:text-[#10B981]' : !item.positive ? 'text-rose-600 dark:text-rose-400' : 'text-[#111111] dark:text-[#F5F5F5]'}`}>
                      {!item.positive ? '-' : ''}{fmt(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              {/* HICBC taper visualiser */}
              {result.isAboveThreshold && (
                <div className="rounded-xl bg-[#FAFAFA] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 mb-5">
                  <div className="flex justify-between text-2xs text-[#525252] dark:text-[#A3A3A3] mb-2">
                    <span>£60,000 threshold</span>
                    <span>{result.chargePercent.toFixed(0)}% charged back</span>
                    <span>£80,000 full charge</span>
                  </div>
                  <div className="relative h-3 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A] overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-rose-500 dark:bg-rose-600 transition-all duration-500"
                      style={{ width: `${Math.min(100, result.chargePercent)}%` }}
                    />
                  </div>
                  <p className="text-2xs text-[#737373] dark:text-[#666666] mt-2 text-center">
                    Your income is £{(result.higherEarnerIncome - result.hicbcThreshold).toLocaleString('en-GB')} above the threshold
                  </p>
                </div>
              )}

              <ExportActions copyText={copyText} fileName="paywise-child-benefit" />
            </div>

            {/* Rates reference card */}
            <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-3">{result.taxYearLabel} Child Benefit Rates</p>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'First / only child', weekly: result.firstChildWeeklyRate, annual: result.firstChildWeeklyRate * 52 },
                  { label: 'Each additional child', weekly: result.additionalChildWeeklyRate, annual: result.additionalChildWeeklyRate * 52 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <span className="text-[#525252] dark:text-[#A3A3A3]">{row.label}</span>
                    <div className="text-right">
                      <span className="font-black text-[#059669] dark:text-[#10B981]">{fmt(row.weekly)}/wk</span>
                      <span className="text-[#737373] dark:text-[#666666] ml-2">({fmt(row.annual)}/yr)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <Heart className="w-8 h-8 text-[#E5E5E5] dark:text-[#2A2A2A] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#525252] dark:text-[#A3A3A3]">Enter the number of children and household income to calculate Child Benefit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildBenefitCalculator;
