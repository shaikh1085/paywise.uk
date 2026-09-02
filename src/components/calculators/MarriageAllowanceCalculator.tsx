import React, { useState, useMemo } from 'react';
import { MarriageAllowanceInput, TaxYear, TaxRegion } from '../../types';
import { calculateMarriageAllowance } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  Heart,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Calendar,
  History,
  TrendingDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const MarriageAllowanceCalculator: React.FC = () => {
  const [input, setInput] = useState<MarriageAllowanceInput>({
    lowerEarnerIncome: 9000,
    higherEarnerIncome: 35000,
    lowerEarnerRegion: 'england_ni',
    higherEarnerRegion: 'england_ni',
    taxYear: '2025_26',
  });

  const [differentRegions, setDifferentRegions] = useState(false);

  const result = useMemo(() => calculateMarriageAllowance(input), [input]);

  const handleReset = () => {
    setInput({
      lowerEarnerIncome: 9000,
      higherEarnerIncome: 35000,
      lowerEarnerRegion: 'england_ni',
      higherEarnerRegion: 'england_ni',
      taxYear: '2025_26',
    });
    setDifferentRegions(false);
  };

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26 (Current)' },
    { value: '2026_27', label: '2026/27 (Forecast)' },
    { value: '2024_25', label: '2024/25' },
  ];

  const presets = [
    { label: 'Non-Earner & £35k Earner', lower: 0, higher: 35000 },
    { label: 'Part-Time (£9k) & £30k Earner', lower: 9000, higher: 30000 },
    { label: 'Low Earner (£12k) & £32k Earner', lower: 12000, higher: 32000 },
    { label: 'Both Basic Rate (£20k & £35k)', lower: 20000, higher: 35000 },
  ];

  const copyText = `PayWise UK — Marriage Allowance Calculation:
Tax Year: ${result.taxYearLabel}
Eligibility: ${result.isEligible ? 'Eligible for Marriage Allowance' : 'Not Eligible'}
${!result.isEligible ? `Reason: ${result.ineligibilityReason}\n` : ''}---
Net Annual Household Saving: ${fmt(result.netHouseholdSaving)}/year (£${(result.netHouseholdSaving / 12).toFixed(2)}/month)
Maximum Standard Annual Saving: ${fmt(result.maxPotentialSaving)}
Personal Allowance Transfer: £1,260 from lower earner to higher earner

Lower Earner:
- Annual Income: ${fmt(result.lowerEarner.income)} (${result.lowerEarner.region})
- Personal Allowance: ${fmt(result.lowerEarner.personalAllowanceBefore)} -> ${fmt(result.lowerEarner.personalAllowanceAfter)} (Tax code ${result.lowerEarner.taxCodeBefore} -> ${result.lowerEarner.taxCodeAfter})
- Tax Before / After: ${fmt(result.lowerEarner.taxBefore)} -> ${fmt(result.lowerEarner.taxAfter)} (Extra tax: ${fmt(result.lowerEarnerExtraTax)})

Higher Earner:
- Annual Income: ${fmt(result.higherEarner.income)} (${result.higherEarner.region})
- Personal Allowance: ${fmt(result.higherEarner.personalAllowanceBefore)} -> ${fmt(result.higherEarner.personalAllowanceAfter)} (Tax code ${result.higherEarner.taxCodeBefore} -> ${result.higherEarner.taxCodeAfter})
- Tax Before / After: ${fmt(result.higherEarner.taxBefore)} -> ${fmt(result.higherEarner.taxAfter)} (Tax saved: ${fmt(result.higherEarnerTaxSaving)})

Backdated Claims Note:
If eligible for the previous 4 tax years, you could claim back up to £1,250+ in total backdated lump-sum refunds from HMRC.
Calculated via PayWise UK (https://paywiseuk.vercel.app/marriage-allowance-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Household Earnings
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

        {/* Quick Presets */}
        <div className="mb-5">
          <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
            Quick Couple Examples
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInput((prev) => ({ ...prev, lowerEarnerIncome: p.lower, higherEarnerIncome: p.higher }))}
                className="text-left px-2.5 py-1.5 rounded-lg text-2xs font-semibold border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/60 hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-all truncate"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {/* Lower Earner Annual Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Lower Earner Annual Income
                </label>
                <Tooltip
                  title="Lower Earner Income"
                  content="The gross annual income of the partner who earns less (e.g. non-working, part-time, or earning below the £12,570 Personal Allowance threshold). This partner will transfer £1,260 of their allowance."
                />
              </div>
              <span className={`text-2xs font-bold px-2 py-0.5 rounded-md ${
                input.lowerEarnerIncome <= 12570
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
              }`}>
                {input.lowerEarnerIncome <= 12570 ? '≤ £12,570 (Eligible)' : '> £12,570 (Ineligible)'}
              </span>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                min="0"
                step="500"
                value={input.lowerEarnerIncome || ''}
                onChange={(e) => setInput((p) => ({ ...p, lowerEarnerIncome: parseFloat(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 9000"
              />
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 6000, 9000, 11000, 12570].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, lowerEarnerIncome: val }))}
                  className={`px-2 py-1 rounded-lg text-2xs font-bold border transition-all ${
                    input.lowerEarnerIncome === val
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {val === 0 ? '£0 (Nil)' : `£${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`}
                </button>
              ))}
            </div>
          </div>

          {/* Higher Earner Annual Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Higher Earner Annual Income
                </label>
                <Tooltip
                  title="Higher Earner Income"
                  content="The gross annual income of the partner who earns more. To qualify, this partner must be a basic rate taxpayer (earning between £12,571 and £50,270 in England/Wales/NI, or up to £43,662 in Scotland). Higher-rate taxpayers (40%/42%+) are ineligible."
                />
              </div>
              <span className={`text-2xs font-bold px-2 py-0.5 rounded-md ${
                !result.higherEarner.isHigherRateTaxpayer && input.higherEarnerIncome > 12570
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
              }`}>
                {result.higherEarner.isHigherRateTaxpayer
                  ? 'Higher Rate (Ineligible)'
                  : input.higherEarnerIncome <= 12570
                  ? 'No Tax Paid'
                  : 'Basic Rate (Eligible)'}
              </span>
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
                placeholder="e.g. 35000"
              />
            </div>
            <div className="flex gap-1.5 mt-2">
              {[25000, 30000, 35000, 42000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, higherEarnerIncome: val }))}
                  className={`px-2 py-1 rounded-lg text-2xs font-bold border transition-all ${
                    input.higherEarnerIncome === val
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  £{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Region Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Tax Region
              </label>
              <button
                type="button"
                onClick={() => setDifferentRegions(!differentRegions)}
                className="text-2xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
              >
                {differentRegions ? 'Same region for both' : 'Partners in different regions?'}
              </button>
            </div>

            {!differentRegions ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'england_ni' as TaxRegion, label: 'England & NI' },
                  { key: 'scotland' as TaxRegion, label: 'Scotland' },
                  { key: 'wales' as TaxRegion, label: 'Wales' },
                ].map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setInput((p) => ({ ...p, lowerEarnerRegion: r.key, higherEarnerRegion: r.key }))}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      (input.higherEarnerRegion || 'england_ni') === r.key
                        ? 'bg-[#059669] text-white border-[#059669]'
                        : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                    Lower Earner Region
                  </label>
                  <select
                    value={input.lowerEarnerRegion || 'england_ni'}
                    onChange={(e) => setInput((p) => ({ ...p, lowerEarnerRegion: e.target.value as TaxRegion }))}
                    className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-2.5 py-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="england_ni">England & NI</option>
                    <option value="scotland">Scotland</option>
                    <option value="wales">Wales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                    Higher Earner Region
                  </label>
                  <select
                    value={input.higherEarnerRegion || 'england_ni'}
                    onChange={(e) => setInput((p) => ({ ...p, higherEarnerRegion: e.target.value as TaxRegion }))}
                    className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-2.5 py-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="england_ni">England & NI</option>
                    <option value="scotland">Scotland</option>
                    <option value="wales">Wales</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <select
              value={input.taxYear || '2025_26'}
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
        {/* Main Result Card */}
        <div className={`relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] bg-white dark:bg-[#171717] ${
          result.isEligible ? 'border-t-[#059669] dark:border-t-[#10B981]' : 'border-t-rose-500'
        }`}>

          {/* Eligibility Banner */}
          <div className={`flex items-start gap-3 p-3.5 rounded-xl mb-6 border ${
            result.isEligible
              ? 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/30 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]'
              : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400'
          }`}>
            {result.isEligible ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5 text-xs">
              <p className="font-bold">
                {result.isEligible
                  ? 'Eligible for UK Marriage Allowance'
                  : 'Not Eligible for Marriage Allowance'}
              </p>
              <p className="font-normal opacity-90 leading-relaxed">
                {result.isEligible
                  ? `Your household qualifies to transfer £${result.transferAmount.toLocaleString('en-GB')} of Personal Allowance, reducing your combined income tax.`
                  : result.ineligibilityReason}
              </p>
            </div>
          </div>

          {/* Big Headline Metric */}
          {result.isEligible ? (
            <div className="rounded-xl p-5 border border-[#059669]/30 dark:border-[#10B981]/30 bg-[#F0FDF4] dark:bg-[#052e16] text-center mb-6">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] mb-1">
                Net Annual Household Tax Saving
              </p>
              <p className="text-3xl sm:text-4xl font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                <AnimatedNumber value={result.netHouseholdSaving} prefix="£" decimals={2} />
                <span className="text-base font-bold text-[#059669]/80 dark:text-[#10B981]/80 ml-1.5">/ year</span>
              </p>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-2 font-medium">
                Saves <strong className="text-[#111111] dark:text-[#F5F5F5]">{fmt(result.netHouseholdSaving / 12)}</strong> per month in take-home pay
              </p>
            </div>
          ) : (
            <div className="rounded-xl p-5 border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/10 text-center mb-6">
              <p className="text-2xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                Net Household Tax Saving
              </p>
              <p className="text-3xl font-black text-rose-700 dark:text-rose-400 tabular-nums">
                £0.00
              </p>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
                No allowance transfer possible under HMRC statutory rules
              </p>
            </div>
          )}

          {/* Side-by-Side Partner Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Lower Earner Card */}
            <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">Lower Earner (Transferor)</p>
                <span className="text-2xs font-bold px-2 py-0.5 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  Code {result.lowerEarner.taxCodeAfter}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Annual Gross Income</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.lowerEarner.income)}</span>
                </div>
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Personal Allowance</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(result.lowerEarner.personalAllowanceBefore)} → <span className="text-amber-600 dark:text-amber-400">{fmt(result.lowerEarner.personalAllowanceAfter)}</span>
                  </span>
                </div>
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Tax Before / After</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(result.lowerEarner.taxBefore)} → {fmt(result.lowerEarner.taxAfter)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="font-bold text-[#525252] dark:text-[#A3A3A3]">Extra Tax Paid</span>
                  <span className="font-black text-[#111111] dark:text-[#F5F5F5]">
                    {result.lowerEarnerExtraTax > 0 ? `+${fmt(result.lowerEarnerExtraTax)}` : '£0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Higher Earner Card */}
            <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">Higher Earner (Recipient)</p>
                <span className="text-2xs font-bold px-2 py-0.5 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  Code {result.higherEarner.taxCodeAfter}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Annual Gross Income</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.higherEarner.income)}</span>
                </div>
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Personal Allowance</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(result.higherEarner.personalAllowanceBefore)} → <span className="text-[#059669] dark:text-[#10B981] font-black">{fmt(result.higherEarner.personalAllowanceAfter)}</span>
                  </span>
                </div>
                <div className="flex justify-between text-[#525252] dark:text-[#A3A3A3]">
                  <span>Tax Before / After</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(result.higherEarner.taxBefore)} → {fmt(result.higherEarner.taxAfter)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">Tax Saved</span>
                  <span className="font-black text-[#059669] dark:text-[#10B981]">
                    -{fmt(result.higherEarnerTaxSaving)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Transfer & Savings Summary
            </p>
            {[
              {
                label: 'Statutory Allowance Transferred',
                value: fmt(result.transferAmount),
              },
              {
                label: 'Higher Earner Tax Reduction (20% on £1,260)',
                value: `-${fmt(result.higherEarnerTaxSaving)}`,
                green: true,
              },
              {
                label: 'Lower Earner Extra Tax Due',
                value: result.lowerEarnerExtraTax > 0 ? `+${fmt(result.lowerEarnerExtraTax)}` : '£0.00',
              },
              {
                label: 'Net Annual Household Saving',
                value: fmt(result.netHouseholdSaving),
                bold: true,
                green: result.netHouseholdSaving > 0,
              },
            ].map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-2 px-3 rounded-lg border text-xs ${
                  row.bold
                    ? 'bg-[#F5F5F5] dark:bg-[#111111] border-[#E5E5E5] dark:border-[#2A2A2A] font-bold'
                    : 'bg-white dark:bg-[#171717] border-[#F0F0F0] dark:border-[#222222]'
                }`}
              >
                <span className="text-[#525252] dark:text-[#A3A3A3]">{row.label}</span>
                <span
                  className={`font-black tabular-nums ${
                    row.green ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#111111] dark:text-[#F5F5F5]'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <ExportActions copyText={copyText} fileName="paywise-marriage-allowance" />
        </div>

        {/* Backdated Claims Note Card */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
              Backdated Claims (Up to 4 Previous Tax Years)
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs space-y-2">
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              If you were married or in a civil partnership and eligible in previous tax years, you can backdate your Marriage Allowance claim by up to <strong>4 tax years</strong> (2021/22, 2022/23, 2023/24, and 2024/25).
            </p>
            {result.isEligible && (
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                  Potential 5-Year Total Claim:
                </span>
                <span className="font-black text-[#059669] dark:text-[#10B981] text-sm tabular-nums">
                  Up to {fmt(result.backdated4YearsSavingEstimate)}
                </span>
              </div>
            )}
            <p className="text-2xs text-[#737373] dark:text-[#888888]">
              HMRC pays backdated claims as a one-off tax refund cheque or bank transfer directly to the recipient partner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarriageAllowanceCalculator;
