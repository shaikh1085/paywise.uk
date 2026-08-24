import React, { useState, useMemo } from 'react';
import { RedundancyPayInput, TaxRegion } from '../../types';
import { calculateRedundancyPay } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import {
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  Info,
  Clock,
  Briefcase,
  HelpCircle,
  PiggyBank,
  CheckCircle2,
  Receipt,
  ArrowUpRight,
  TrendingDown,
} from 'lucide-react';

export const RedundancyCalculator: React.FC = () => {
  const [input, setInput] = useState<RedundancyPayInput>({
    age: 45,
    yearsOfService: 8,
    weeklyPay: 850,
    useStatutoryWeeklyCap: true,
    statutoryWeeklyCap: 700,
    enhancedRedundancyPay: 10000,
    annualSalary: 44200,
    region: 'england_ni',
    taxYear: '2025_26',
    taxCode: '1257L',
    studentLoanPlan: 'none',
  });

  const result = useMemo(() => {
    return calculateRedundancyPay(input);
  }, [input]);

  const copyText = `PayWise UK Redundancy Pay Calculation:
Age: ${result.age} | Length of Service: ${result.yearsOfService} years
Gross Weekly Pay: £${result.actualWeeklyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Statutory Cap: £${result.statutoryWeeklyCap}/wk)
---
Statutory Redundancy Weeks: ${result.serviceBreakdown.totalStatutoryWeeks} weeks
- Under Age 22 (${result.serviceBreakdown.yearsUnder22} yrs × 0.5 wk): £${result.serviceBreakdown.payUnder22.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Ages 22–40 (${result.serviceBreakdown.yearsBetween22And40} yrs × 1.0 wk): £${result.serviceBreakdown.payBetween22And40.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Age 41+ (${result.serviceBreakdown.yearsOver41} yrs × 1.5 wks): £${result.serviceBreakdown.payOver41.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
---
Statutory Redundancy Pay: £${result.statutoryRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Enhanced / Contractual Pay: £${result.enhancedRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Total Gross Redundancy Pay: £${result.totalGrossRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
---
Tax Breakdown (£30,000 Exemption):
- Tax-Free Redundancy: £${result.taxFreeAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Taxable Excess (>£30k): £${result.taxableExcess.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Income Tax Deducted: £${result.incomeTaxOnExcess.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Employee NI Deducted: £0.00 (Exempt)
---
Net Redundancy Payout: £${result.netRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${result.retentionPercentage.toFixed(1)}% retained)

Calculated via PayWise UK (https://www.paywiseuk.co.uk/redundancy-pay-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Employment &amp; Redundancy Details
        </h2>

        <div className="space-y-4">
          {/* Age & Full Years of Service */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="rp-age" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Your Age
                </label>
                <Tooltip
                  title="Age at Redundancy Date"
                  content="Statutory redundancy pay uses your age to determine your statutory weekly entitlement (0.5 wk for <22, 1.0 wk for 22–40, 1.5 wks for 41+)."
                />
              </div>
              <input
                type="number"
                id="rp-age"
                min="16"
                max="90"
                value={input.age || ''}
                onChange={(e) => setInput({ ...input, age: parseInt(e.target.value, 10) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-sm font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="45"
              />
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="rp-service" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Years of Service
                </label>
                <Tooltip
                  title="Full Continuous Service Years"
                  content="Statutory redundancy pay counts full completed years of service up to a maximum statutory cap of 20 years. (Minimum 2 years required for statutory eligibility)."
                />
              </div>
              <input
                type="number"
                id="rp-service"
                min="0"
                max="50"
                value={input.yearsOfService || ''}
                onChange={(e) => setInput({ ...input, yearsOfService: parseInt(e.target.value, 10) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-sm font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="8"
              />
            </div>
          </div>

          {input.yearsOfService > 20 && (
            <div className="text-2xs text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/20 p-2 rounded-lg border border-amber-200 dark:border-amber-900/40">
              Note: Statutory redundancy pay is capped at <strong>20 years</strong> of service. Your statutory entitlement will be calculated on the most recent 20 years.
            </div>
          )}

          {input.yearsOfService < 2 && input.yearsOfService > 0 && (
            <div className="text-2xs text-blue-700 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/20 p-2 rounded-lg border border-blue-200 dark:border-blue-900/40">
              Note: UK law requires at least <strong>2 continuous years</strong> of service to qualify for statutory redundancy pay. You may still receive contractual / enhanced pay.
            </div>
          )}

          {/* Gross Weekly Pay */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="rp-weekly-pay" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Gross Weekly Pay (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.weeklyPay || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / wk
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="rp-weekly-pay"
                min="0"
                step="25"
                value={input.weeklyPay || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setInput({
                    ...input,
                    weeklyPay: val,
                    annualSalary: val * 52,
                  });
                }}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 850"
              />
            </div>
          </div>

          {/* Statutory Weekly Pay Cap Toggle */}
          <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#111111] dark:text-[#F5F5F5]">
                <input
                  type="checkbox"
                  checked={input.useStatutoryWeeklyCap}
                  onChange={(e) => setInput({ ...input, useStatutoryWeeklyCap: e.target.checked })}
                  className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-[#D4D4D4] dark:border-[#303030]"
                />
                <span>Apply Statutory Weekly Cap (£{input.statutoryWeeklyCap})</span>
              </label>
              <Tooltip
                title="Statutory Weekly Cap"
                content="Under UK law, statutory weekly pay is capped at £700 per week. Employers can choose to pay more under enhanced redundancy policies."
              />
            </div>
            {input.useStatutoryWeeklyCap && input.weeklyPay > input.statutoryWeeklyCap && (
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] pl-6">
                Your actual weekly pay of £{input.weeklyPay.toFixed(2)} will be capped at <strong>£{input.statutoryWeeklyCap}.00</strong> for the statutory entitlement.
              </p>
            )}
          </div>

          {/* Enhanced / Contractual Redundancy Pay */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label htmlFor="rp-enhanced" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Enhanced / Contractual Redundancy (£)
                </label>
                <Tooltip
                  title="Enhanced Redundancy Pay"
                  content="Any additional redundancy payout provided by your employer above the legal statutory minimum (e.g. voluntary redundancy package or settlement)."
                />
              </div>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.enhancedRedundancyPay || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="rp-enhanced"
                min="0"
                step="500"
                value={input.enhancedRedundancyPay || ''}
                onChange={(e) => setInput({ ...input, enhancedRedundancyPay: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-base focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 10000"
              />
            </div>
          </div>

          {/* Regular Annual Salary & Region */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="rp-annual-salary" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Annual Salary (£)
                </label>
                <Tooltip
                  title="Tax Year Salary"
                  content="Used to determine your marginal tax band for any redundancy payment exceeding the £30,000 tax-free exemption threshold."
                />
              </div>
              <input
                type="number"
                id="rp-annual-salary"
                min="0"
                step="1000"
                value={input.annualSalary || ''}
                onChange={(e) => setInput({ ...input, annualSalary: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                placeholder="44200"
              />
            </div>

            <div>
              <label htmlFor="rp-region" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Tax Region
              </label>
              <select
                id="rp-region"
                value={input.region}
                onChange={(e) => setInput({ ...input, region: e.target.value as TaxRegion })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              >
                <option value="england_ni">England / Northern Ireland</option>
                <option value="wales">Wales</option>
                <option value="scotland">Scotland (Devolved)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Calculation Results */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Payout Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] dark:from-[#0F0F0F] dark:via-[#171717] dark:to-[#0A0A0A] text-white p-6 sm:p-7 border border-[#2A2A2A] shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Net Redundancy Payout in Your Pocket
            </span>
            <span className="text-xs text-[#A3A3A3]">
              Retention Rate: <strong className="text-white">{result.retentionPercentage.toFixed(1)}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netRedundancyPay}
                  prefix="£"
                  decimals={2}
                />
              </div>
              <p className="text-xs text-[#D4D4D4] pt-1">
                Total Gross Package: <strong className="text-white">£{result.totalGrossRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                {result.taxableExcess > 0 ? ` (Deductions: £${result.totalDeductions.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})` : ' (100% Tax-Free)'}
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.retentionPercentage}
                size={100}
                strokeWidth={8}
                label="Retained"
              />
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#2A2A2A] text-xs">
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Statutory Redundancy</span>
              <span className="font-bold text-white tabular-nums">
                £{result.statutoryRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Enhanced Pay</span>
              <span className="font-bold text-white tabular-nums">
                £{result.enhancedRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Tax-Free Portion</span>
              <span className="font-bold text-[#10B981] tabular-nums">
                £{result.taxFreeAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Income Tax Paid</span>
              <span className={`font-bold tabular-nums ${result.incomeTaxOnExcess > 0 ? 'text-[#EF4444]' : 'text-white'}`}>
                {result.incomeTaxOnExcess > 0 ? `-£${result.incomeTaxOnExcess.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '£0'}
              </span>
            </div>
          </div>
        </div>

        {/* £30,000 Tax-Free Exemption Visual Progress Bar */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              £30,000 HMRC Tax-Free Exemption Allowance
            </span>
            <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
              £{result.taxFreeAmount.toLocaleString('en-GB')} used of £30,000
            </span>
          </div>

          <div className="w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] h-3 rounded-full overflow-hidden flex">
            <div
              className="bg-[#059669] dark:bg-[#10B981] h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (result.taxFreeAmount / 30000) * 100)}%` }}
            />
            {result.taxableExcess > 0 && (
              <div
                className="bg-[#EF4444] h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (result.taxableExcess / result.totalGrossRedundancyPay) * 100)}%` }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-2xs text-[#525252] dark:text-[#A3A3A3]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Tax-Free: £{result.taxFreeAmount.toLocaleString('en-GB')}
            </span>
            {result.taxableExcess > 0 ? (
              <span className="flex items-center gap-1 text-[#EF4444] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                Taxable Excess: £{result.taxableExcess.toLocaleString('en-GB')} (Tax: £{result.incomeTaxOnExcess.toFixed(2)})
              </span>
            ) : (
              <span className="text-[#059669] dark:text-[#10B981] font-semibold">
                100% Tax-Free (£{(30000 - result.taxFreeAmount).toLocaleString('en-GB')} exemption remaining)
              </span>
            )}
          </div>
        </div>

        {/* Statutory Redundancy Breakdown by Age Bands */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Statutory Redundancy Entitlement Formula
            </h3>
            <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
              Total: {result.serviceBreakdown.totalStatutoryWeeks} statutory weeks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  <th className="text-left py-2 font-bold uppercase tracking-wider text-2xs">Age Band</th>
                  <th className="text-center py-2 font-bold uppercase tracking-wider text-2xs">Service Years</th>
                  <th className="text-center py-2 font-bold uppercase tracking-wider text-2xs">Multiplier</th>
                  <th className="text-center py-2 font-bold uppercase tracking-wider text-2xs">Weeks Pay</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">Statutory Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-2.5 font-semibold text-[#111111] dark:text-[#F5F5F5]">Under Age 22</td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    {result.serviceBreakdown.yearsUnder22} yr{result.serviceBreakdown.yearsUnder22 !== 1 ? 's' : ''}
                  </td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3]">0.5 week / yr</td>
                  <td className="py-2.5 text-center font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    {result.serviceBreakdown.weeksUnder22} wks
                  </td>
                  <td className="py-2.5 text-right font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.serviceBreakdown.payUnder22.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 font-semibold text-[#111111] dark:text-[#F5F5F5]">Aged 22 to 40</td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    {result.serviceBreakdown.yearsBetween22And40} yr{result.serviceBreakdown.yearsBetween22And40 !== 1 ? 's' : ''}
                  </td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3]">1.0 week / yr</td>
                  <td className="py-2.5 text-center font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    {result.serviceBreakdown.weeksBetween22And40} wks
                  </td>
                  <td className="py-2.5 text-right font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.serviceBreakdown.payBetween22And40.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 font-semibold text-[#111111] dark:text-[#F5F5F5]">Aged 41 and Over</td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    {result.serviceBreakdown.yearsOver41} yr{result.serviceBreakdown.yearsOver41 !== 1 ? 's' : ''}
                  </td>
                  <td className="py-2.5 text-center text-[#525252] dark:text-[#A3A3A3]">1.5 weeks / yr</td>
                  <td className="py-2.5 text-center font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    {result.serviceBreakdown.weeksOver41} wks
                  </td>
                  <td className="py-2.5 text-right font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.serviceBreakdown.payOver41.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr className="bg-[#059669]/5 dark:bg-[#10B981]/5 font-bold">
                  <td className="py-3 px-2 rounded-l-lg text-[#059669] dark:text-[#10B981]">Total Statutory Redundancy</td>
                  <td className="py-3 text-center text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    {result.yearsOfService} yrs (Capped at 20)
                  </td>
                  <td className="py-3 text-center text-[#525252] dark:text-[#A3A3A3]">—</td>
                  <td className="py-3 text-center font-extrabold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    {result.serviceBreakdown.totalStatutoryWeeks} wks
                  </td>
                  <td className="py-3 px-2 text-right rounded-r-lg font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    £{result.statutoryRedundancyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            * Weekly pay applied: <strong>£{result.effectiveWeeklyPay.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            {input.useStatutoryWeeklyCap && input.weeklyPay > input.statutoryWeeklyCap && ` (Statutory weekly pay cap of £${input.statutoryWeeklyCap} applied).`}
          </p>
        </div>

        {/* National Insurance & Employer Note */}
        <div className="rounded-2xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider">
              National Insurance Rules on Redundancy Pay
            </h4>
          </div>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            • <strong>Employee National Insurance:</strong> Genuine statutory and enhanced redundancy payments are <strong>100% exempt from Employee National Insurance</strong>, even on amounts above £30,000.
          </p>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            • <strong>Employer Class 1A NI:</strong> From April 2020, employers must pay Class 1A National Insurance ({input.taxYear === '2024_25' ? '13.8%' : '15.0%'}) on termination payments that exceed the £30,000 threshold{result.employerClass1aNiOnExcess > 0 ? ` (estimated £${result.employerClass1aNiOnExcess.toFixed(2)} paid by employer)` : ''}. This does not reduce your net pay.
          </p>
        </div>

        {/* Export & Actions */}
        <ExportActions
          textToCopy={copyText}
          csvData={[
            { Metric: 'Employee Age', Value: `${result.age}` },
            { Metric: 'Years of Continuous Service', Value: `${result.yearsOfService}` },
            { Metric: 'Gross Weekly Pay', Value: `£${result.actualWeeklyPay.toFixed(2)}` },
            { Metric: 'Effective Weekly Pay Applied', Value: `£${result.effectiveWeeklyPay.toFixed(2)}` },
            { Metric: 'Statutory Redundancy Weeks', Value: `${result.serviceBreakdown.totalStatutoryWeeks}` },
            { Metric: 'Statutory Redundancy Pay', Value: `£${result.statutoryRedundancyPay.toFixed(2)}` },
            { Metric: 'Enhanced Redundancy Pay', Value: `£${result.enhancedRedundancyPay.toFixed(2)}` },
            { Metric: 'Total Gross Redundancy Pay', Value: `£${result.totalGrossRedundancyPay.toFixed(2)}` },
            { Metric: 'Tax-Free Exemption Amount', Value: `£${result.taxFreeAmount.toFixed(2)}` },
            { Metric: 'Taxable Excess Over £30k', Value: `£${result.taxableExcess.toFixed(2)}` },
            { Metric: 'Income Tax Deducted', Value: `£${result.incomeTaxOnExcess.toFixed(2)}` },
            { Metric: 'Net Redundancy Payout', Value: `£${result.netRedundancyPay.toFixed(2)}` },
            { Metric: 'Retention Percentage', Value: `${result.retentionPercentage.toFixed(2)}%` },
          ]}
          fileName={`paywise-redundancy-calculation-${result.yearsOfService}yrs`}
          title="Redundancy Pay & Tax Analysis"
        />
      </div>
    </div>
  );
};
