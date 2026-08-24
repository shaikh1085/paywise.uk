import React, { useState, useMemo } from 'react';
import { SelfEmployedInput, TaxYear, TaxRegion, StudentLoanPlan } from '../../types';
import { calculateSelfEmployedTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import {
  Briefcase,
  ArrowUpRight,
  TrendingDown,
  Info,
  Calendar,
  AlertTriangle,
  Receipt,
  FileCheck,
} from 'lucide-react';

export const SelfEmployedCalculator: React.FC = () => {
  const [input, setInput] = useState<SelfEmployedInput>({
    grossProfit: 45000,
    allowableExpenses: 3000,
    taxYear: '2025_26',
    region: 'england_ni',
    studentLoanPlan: 'none',
    payVoluntaryClass2IfUnderThreshold: false,
  });

  const result = useMemo(() => calculateSelfEmployedTax(input), [input]);

  const copyText = `PayWise UK Self-Employed Tax Calculation:
Gross Profit / Turnover: £${input.grossProfit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Allowable Business Expenses: £${input.allowableExpenses.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Taxable Net Profit: £${result.taxableProfit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Tax Year: ${input.taxYear === '2025_26' ? '2025/26' : input.taxYear === '2024_25' ? '2024/25' : '2026/27'} (${input.region === 'scotland' ? 'Scotland' : input.region === 'wales' ? 'Wales' : 'England/NI'})
---
Income Tax: -£${result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Class 4 National Insurance: -£${result.class4NiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Class 2 National Insurance: -£${result.class2NiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${result.class2StatusText})
${result.studentLoanAnnual > 0 ? `Student Loan: -£${result.studentLoanAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` : ''}Total Tax & NI Deductions: -£${result.totalDeductionsAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
---
Net Take-Home Pay (Annual): £${result.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Net Take-Home Pay (Monthly): £${result.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Net Take-Home Pay (Weekly): £${result.netTakeHomeWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Effective Tax & NI Rate: ${result.effectiveTaxRate.toFixed(1)}%
${result.requiresPaymentOnAccount ? `\nPayments on Account Notice:\n- 1st Payment on Account (due 31 Jan): £${result.firstPaymentOnAccount.toFixed(2)}\n- 2nd Payment on Account (due 31 Jul): £${result.secondPaymentOnAccount.toFixed(2)}\n- First Year Total Due 31 Jan (Balancing + 1st Advance): £${result.totalFirstYearPaymentDueJanuary.toFixed(2)}` : ''}
Calculated via PayWise UK (https://www.paywiseuk.co.uk/self-employed-tax-calculator)`;

  const retentionPercent = input.grossProfit > 0
    ? (result.netTakeHomeAnnual / input.grossProfit) * 100
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input controls */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Sole Trader Business Details
        </h2>

        <div className="space-y-4">
          {/* Annual Self-Employed Profit / Turnover */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="se-profit-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Annual Gross Profit / Turnover (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.grossProfit || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="se-profit-input"
                min="0"
                step="500"
                value={input.grossProfit || ''}
                onChange={(e) => setInput({ ...input, grossProfit: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 45000"
              />
            </div>
          </div>

          {/* Allowable Business Expenses */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label htmlFor="se-expenses-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Allowable Business Expenses (£)
                </label>
                <Tooltip
                  title="Allowable Business Expenses"
                  content="Costs wholly and exclusively incurred for business (equipment, software, phone, home office, travel, accountancy). Sole traders with expenses under £1,000 can claim the £1,000 statutory Trading Allowance instead."
                />
              </div>
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                £{(input.allowableExpenses || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="se-expenses-input"
                min="0"
                step="100"
                value={input.allowableExpenses || ''}
                onChange={(e) => setInput({ ...input, allowableExpenses: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                placeholder="e.g. 3000"
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-2xs text-[#525252] dark:text-[#A3A3A3]">
              <span>Taxable Net Profit:</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.taxableProfit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Tax Year & Region */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="se-tax-year" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Tax Year
              </label>
              <select
                id="se-tax-year"
                value={input.taxYear}
                onChange={(e) => setInput({ ...input, taxYear: e.target.value as TaxYear })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              >
                <option value="2025_26">2025 / 2026 (Current)</option>
                <option value="2024_25">2024 / 2025</option>
                <option value="2026_27">2026 / 2027 (Forecast)</option>
              </select>
            </div>

            <div>
              <label htmlFor="se-tax-region" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Tax Region
              </label>
              <select
                id="se-tax-region"
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

          {/* Student Loan Plan */}
          <div>
            <label htmlFor="se-student-loan" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Student Loan Plan
            </label>
            <select
              id="se-student-loan"
              value={input.studentLoanPlan}
              onChange={(e) => setInput({ ...input, studentLoanPlan: e.target.value as StudentLoanPlan })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
            >
              <option value="none">No Student Loan</option>
              <option value="plan1">Plan 1 (Pre-2012 / NI)</option>
              <option value="plan2">Plan 2 (2012–2023 England/Wales)</option>
              <option value="plan4">Plan 4 (Scotland SAAS)</option>
              <option value="plan5">Plan 5 (Aug 2023+ England)</option>
              <option value="postgrad">Postgraduate Loan</option>
              <option value="plan1_and_postgrad">Plan 1 + Postgraduate Loan</option>
              <option value="plan2_and_postgrad">Plan 2 + Postgraduate Loan</option>
              <option value="plan4_and_postgrad">Plan 4 + Postgraduate Loan</option>
              <option value="plan5_and_postgrad">Plan 5 + Postgraduate Loan</option>
            </select>
          </div>

          {/* Voluntary Class 2 NI (shown if profit is below £6,725) */}
          {result.taxableProfit < 6725 && (
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <label className="flex items-start gap-2 text-xs font-medium text-[#111111] dark:text-[#F5F5F5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={input.payVoluntaryClass2IfUnderThreshold || false}
                  onChange={(e) => setInput({ ...input, payVoluntaryClass2IfUnderThreshold: e.target.checked })}
                  className="w-4 h-4 mt-0.5 text-[#059669] dark:text-[#10B981] rounded border-[#E5E5E5] dark:border-[#303030] focus:ring-[#059669]"
                />
                <span className="leading-snug">
                  Pay voluntary Class 2 NI (£3.45/week, £179.40/yr) to protect State Pension credits
                </span>
              </label>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] pl-6">
                Because your taxable profit is below £6,725, no Class 2 is due, but voluntary contributions help maintain qualifying years towards your UK State Pension.
              </p>
            </div>
          )}

          {/* Quick presets */}
          <div>
            <span className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Common Sole Trader Profit Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {[25000, 35000, 50000, 65000, 85000, 110000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setInput({ ...input, grossProfit: amount })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    input.grossProfit === amount
                      ? 'bg-[#059669] text-white'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  £{(amount / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Display */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] dark:from-[#0F0F0F] dark:via-[#171717] dark:to-[#0A0A0A] text-white p-6 sm:p-7 border border-[#2A2A2A] shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Estimated Net Take-Home Pay
            </span>
            <span className="text-xs text-[#A3A3A3]">
              Effective Rate: {result.effectiveTaxRate.toFixed(1)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netTakeHomeAnnual}
                  prefix="£"
                  decimals={2}
                />
                <span className="text-sm sm:text-base font-normal text-[#A3A3A3] ml-2">/ year</span>
              </div>
              <div className="flex items-center gap-4 pt-1 text-xs text-[#D4D4D4]">
                <span>
                  <strong className="text-white">
                    £{result.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                  {' '}/ month
                </span>
                <span>•</span>
                <span>
                  <strong className="text-white">
                    £{result.netTakeHomeWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                  {' '}/ week
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={retentionPercent}
                size={100}
                strokeWidth={8}
                label="Retained"
              />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#2A2A2A] text-xs">
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Gross Turnover</span>
              <span className="font-bold text-white tabular-nums">
                £{result.grossProfit.toLocaleString('en-GB')}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Allowable Expenses</span>
              <span className="font-bold text-white tabular-nums">
                £{result.allowableExpenses.toLocaleString('en-GB')}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Taxable Profit</span>
              <span className="font-bold text-[#10B981] tabular-nums">
                £{result.taxableProfit.toLocaleString('en-GB')}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Total Tax & NI</span>
              <span className="font-bold text-[#EF4444] tabular-nums">
                -£{result.totalDeductionsAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Deductions Breakdown Card */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Self-Employed Tax & National Insurance Breakdown
            </h3>
            <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
              Personal Allowance: £{result.personalAllowanceApplied.toLocaleString('en-GB')}
            </span>
          </div>

          <div className="space-y-3">
            {/* Income Tax Row */}
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                  <span>Income Tax</span>
                  <span className="text-2xs text-[#525252] dark:text-[#A3A3A3] font-normal">
                    ({input.region === 'scotland' ? 'Scottish rates' : 'England/Wales/NI rates'})
                  </span>
                </span>
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {result.taxBands.length > 0 && (
                <div className="space-y-1 pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  {result.taxBands.map((band, i) => (
                    <div key={i} className="flex justify-between text-2xs text-[#525252] dark:text-[#A3A3A3]">
                      <span>{band.name} on £{band.taxableAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="font-semibold tabular-nums text-[#111111] dark:text-[#F5F5F5]">
                        £{band.taxPaid.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Class 4 NI Row */}
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                  <span>Class 4 National Insurance</span>
                  <Tooltip
                    title="Class 4 National Insurance"
                    content="Profit-based National Insurance for sole traders: 6% on profits between £12,570 and £50,270, plus 2% on profits exceeding £50,270."
                  />
                </span>
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.class4NiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              {result.class4Bands.length > 0 ? (
                <div className="space-y-1 pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  {result.class4Bands.map((band, i) => (
                    <div key={i} className="flex justify-between text-2xs text-[#525252] dark:text-[#A3A3A3]">
                      <span>{band.name} on £{band.profitsInBand.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="font-semibold tabular-nums text-[#111111] dark:text-[#F5F5F5]">
                        £{band.niPaid.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-2xs text-[#525252] dark:text-[#A3A3A3]">
                  £0.00 — profits do not exceed the Class 4 Lower Profits Limit (£12,570).
                </p>
              )}
            </div>

            {/* Class 2 NI Row */}
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                  <span>Class 2 National Insurance</span>
                  <Tooltip
                    title="Class 2 National Insurance (2024+ Update)"
                    content="From April 2024, self-employed workers with profits above £6,725 receive State Pension credits automatically at £0 charge (treated as paid). No mandatory Class 2 payment is required."
                  />
                </span>
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.class2NiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1">
                {result.class2StatusText}
              </p>
            </div>

            {/* Student Loan Row (if applicable) */}
            {result.studentLoanAnnual > 0 && (
              <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    Student Loan Repayments
                  </span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.studentLoanAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payments on Account Notice Card */}
        {result.requiresPaymentOnAccount ? (
          <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <Calendar className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>Payments on Account Required (Tax Bill &gt; £1,000)</span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
              Because your total annual tax and Class 4 NI bill exceeds £1,000, HMRC requires advance payments towards next tax year:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-amber-200 dark:border-amber-900/40">
                <span className="block font-bold text-[#111111] dark:text-[#F5F5F5]">
                  1st Payment on Account (50%)
                </span>
                <span className="text-base font-extrabold text-amber-700 dark:text-amber-400 tabular-nums block mt-0.5">
                  £{result.firstPaymentOnAccount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-2xs text-[#525252] dark:text-[#A3A3A3] block mt-0.5">
                  Due 31 January (alongside previous year balancing payment)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#151515] border border-amber-200 dark:border-amber-900/40">
                <span className="block font-bold text-[#111111] dark:text-[#F5F5F5]">
                  2nd Payment on Account (50%)
                </span>
                <span className="text-base font-extrabold text-amber-700 dark:text-amber-400 tabular-nums block mt-0.5">
                  £{result.secondPaymentOnAccount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-2xs text-[#525252] dark:text-[#A3A3A3] block mt-0.5">
                  Due 31 July
                </span>
              </div>
            </div>
            <p className="text-2xs text-amber-900/70 dark:text-amber-300/70 italic">
              <strong>First-year sole traders:</strong> In your first year of Self Assessment, you will owe 150% of your annual tax bill by 31 January (£{result.totalFirstYearPaymentDueJanuary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total) to cover the prior year plus the first 50% advance payment.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 text-xs text-[#525252] dark:text-[#A3A3A3] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
            <span>
              <strong>No Payments on Account needed:</strong> Your annual tax and Class 4 NI bill is below £1,000, so you only pay your balancing payment on 31 January.
            </span>
          </div>
        )}

        {/* Export and Sharing Actions */}
        <ExportActions
          textToCopy={copyText}
          csvData={[
            { Metric: 'Gross Turnover / Profit', Value: `£${result.grossProfit.toFixed(2)}` },
            { Metric: 'Allowable Business Expenses', Value: `£${result.allowableExpenses.toFixed(2)}` },
            { Metric: 'Taxable Net Profit', Value: `£${result.taxableProfit.toFixed(2)}` },
            { Metric: 'Personal Allowance Applied', Value: `£${result.personalAllowanceApplied.toFixed(2)}` },
            { Metric: 'Income Tax Annual', Value: `£${result.incomeTaxAnnual.toFixed(2)}` },
            { Metric: 'Class 4 NI Annual', Value: `£${result.class4NiAnnual.toFixed(2)}` },
            { Metric: 'Class 2 NI Annual', Value: `£${result.class2NiAnnual.toFixed(2)}` },
            { Metric: 'Student Loan Annual', Value: `£${result.studentLoanAnnual.toFixed(2)}` },
            { Metric: 'Total Annual Deductions', Value: `£${result.totalDeductionsAnnual.toFixed(2)}` },
            { Metric: 'Net Take-Home Annual', Value: `£${result.netTakeHomeAnnual.toFixed(2)}` },
            { Metric: 'Net Take-Home Monthly', Value: `£${result.netTakeHomeMonthly.toFixed(2)}` },
            { Metric: 'Net Take-Home Weekly', Value: `£${result.netTakeHomeWeekly.toFixed(2)}` },
            { Metric: 'Effective Tax Rate', Value: `${result.effectiveTaxRate.toFixed(2)}%` },
          ]}
          fileName={`paywise-self-employed-tax-${input.grossProfit}`}
          title="Self-Employed Tax & Net Earnings Summary"
        />
      </div>
    </div>
  );
};
