import React, { useState, useMemo } from 'react';
import { PayRiseInput, TaxYear, TaxRegion, StudentLoanPlan, PensionType } from '../../types';
import { calculatePayRise } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import {
  TrendingUp,
  Percent,
  ArrowUpRight,
  AlertTriangle,
  Info,
  ShieldAlert,
  Coins,
  Receipt,
  Scale,
  Sparkles,
} from 'lucide-react';

export const PayRiseCalculator: React.FC = () => {
  const [input, setInput] = useState<PayRiseInput>({
    currentSalary: 45000,
    newSalary: 52000,
    increaseMode: 'percentage',
    percentageIncrease: 10,
    flatIncreaseAmount: 7000,
    taxYear: '2025_26',
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: 5,
    pensionType: 'auto_enrolment',
    studentLoanPlan: 'none',
  });

  const result = useMemo(() => calculatePayRise(input), [input]);

  const copyText = `PayWise UK Pay Rise & Salary Increase Calculation:
Current Gross Salary: £${result.currentSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
New Gross Salary: £${result.newSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (+£${result.grossIncreaseAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / +${result.grossIncreasePercentage.toFixed(1)}%)
---
Before Net Take-Home Pay: £${result.before.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (£${result.before.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
After Net Take-Home Pay: £${result.after.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (£${result.after.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
---
Extra Take-Home in Your Pocket: +£${result.extraTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (+£${result.extraTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
Net Retention of Pay Rise: ${result.takeHomeRetentionPercent.toFixed(1)}% kept
Extra Annual Deductions: Income Tax +£${result.extraTaxAnnual.toFixed(2)}, National Insurance +£${result.extraNiAnnual.toFixed(2)}, Pension +£${result.extraPensionAnnual.toFixed(2)}${result.extraStudentLoanAnnual > 0 ? `, Student Loan +£${result.extraStudentLoanAnnual.toFixed(2)}` : ''}
New Marginal Tax Rate: ${result.newMarginalTaxRate.toFixed(1)}%
${result.crossesHigherRateTax ? '⚠️ Warning: This pay rise pushes you into the Higher Rate tax band.\n' : ''}${result.crossesPersonalAllowanceTaper ? '⚠️ Warning: This pay rise falls within or enters the £100k Personal Allowance taper zone (60% effective income tax trap).\n' : ''}${result.crossesChildBenefitCharge ? '⚠️ Warning: This pay rise enters or affects the High Income Child Benefit Charge zone (£60k–£80k).\n' : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/pay-rise-calculator)`;

  const handleModeChange = (mode: 'percentage' | 'amount') => {
    if (mode === 'percentage') {
      const pct = input.currentSalary > 0
        ? ((result.newSalary - input.currentSalary) / input.currentSalary) * 100
        : 10;
      setInput({ ...input, increaseMode: 'percentage', percentageIncrease: Math.max(0, parseFloat(pct.toFixed(1))) });
    } else {
      const diff = Math.max(0, result.newSalary - input.currentSalary);
      setInput({ ...input, increaseMode: 'amount', flatIncreaseAmount: diff || 5000, newSalary: (input.currentSalary || 0) + (diff || 5000) });
    }
  };

  const handlePercentageChange = (pct: number) => {
    const safePct = Math.max(0, pct);
    const calculatedNewSalary = (input.currentSalary || 0) * (1 + safePct / 100);
    setInput({
      ...input,
      percentageIncrease: safePct,
      newSalary: calculatedNewSalary,
      flatIncreaseAmount: calculatedNewSalary - (input.currentSalary || 0),
    });
  };

  const handleNewSalaryChange = (newSal: number) => {
    const safeNew = Math.max(0, newSal);
    const diff = safeNew - (input.currentSalary || 0);
    const pct = input.currentSalary > 0 ? (diff / input.currentSalary) * 100 : 0;
    setInput({
      ...input,
      newSalary: safeNew,
      flatIncreaseAmount: Math.max(0, diff),
      percentageIncrease: Math.max(0, parseFloat(pct.toFixed(1))),
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Controls */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Salary &amp; Pay Rise Inputs
        </h2>

        <div className="space-y-4">
          {/* Current Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="current-salary-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Current Annual Salary (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.currentSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="current-salary-input"
                min="0"
                step="500"
                value={input.currentSalary || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  const newSal = input.increaseMode === 'percentage'
                    ? val * (1 + (input.percentageIncrease || 0) / 100)
                    : val + (input.flatIncreaseAmount || 0);
                  setInput({ ...input, currentSalary: val, newSalary: newSal });
                }}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 45000"
              />
            </div>
          </div>

          {/* Increase Mode Toggle: Percentage vs New Salary Amount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Pay Rise Input Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <button
                type="button"
                onClick={() => handleModeChange('percentage')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  input.increaseMode === 'percentage'
                    ? 'bg-white dark:bg-[#262626] text-[#059669] dark:text-[#10B981] shadow-xs'
                    : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                }`}
              >
                Percentage Increase (%)
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('amount')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  input.increaseMode === 'amount'
                    ? 'bg-white dark:bg-[#262626] text-[#059669] dark:text-[#10B981] shadow-xs'
                    : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                }`}
              >
                New Total Salary (£)
              </button>
            </div>
          </div>

          {/* Dynamic input based on mode */}
          {input.increaseMode === 'percentage' ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="percentage-increase-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Percentage Increase (%)
                </label>
                <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                  +{input.percentageIncrease}% (+£{result.grossIncreaseAnnual.toLocaleString('en-GB')}/yr)
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="percentage-increase-input"
                  min="0"
                  max="500"
                  step="0.5"
                  value={input.percentageIncrease || ''}
                  onChange={(e) => handlePercentageChange(parseFloat(e.target.value) || 0)}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-4 pr-9 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                  placeholder="e.g. 10"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">%</span>
              </div>
              {/* Preset percentage pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[3, 5, 7.5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePercentageChange(pct)}
                    className={`px-2 py-0.5 rounded-md text-2xs font-bold transition-colors ${
                      input.percentageIncrease === pct
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]'
                    }`}
                  >
                    +{pct}%
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="new-salary-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  New Annual Gross Salary (£)
                </label>
                <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                  +£{result.grossIncreaseAnnual.toLocaleString('en-GB')} (+{result.grossIncreasePercentage.toFixed(1)}%)
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
                <input
                  type="number"
                  id="new-salary-input"
                  min="0"
                  step="500"
                  value={result.newSalary || ''}
                  onChange={(e) => handleNewSalaryChange(parseFloat(e.target.value) || 0)}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                  placeholder="e.g. 52000"
                />
              </div>
            </div>
          )}

          {/* Tax Code & Region */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="pr-tax-code" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Tax Code
                </label>
                <Tooltip
                  title="UK Tax Code"
                  content="Standard code is 1257L for the £12,570 tax-free personal allowance. You can enter custom codes (e.g. BR, D0, K-codes, S-codes)."
                />
              </div>
              <input
                type="text"
                id="pr-tax-code"
                value={input.taxCode}
                onChange={(e) => setInput({ ...input, taxCode: e.target.value.toUpperCase() })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none uppercase"
                placeholder="1257L"
              />
            </div>

            <div>
              <label htmlFor="pr-region" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Tax Region
              </label>
              <select
                id="pr-region"
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

          {/* Pension & Student Loans */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pr-pension-pct" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Pension Contrib. (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="pr-pension-pct"
                  min="0"
                  max="100"
                  step="0.5"
                  value={input.pensionPercentage}
                  onChange={(e) => setInput({ ...input, pensionPercentage: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-3 pr-7 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                  placeholder="5"
                />
                <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#525252] dark:text-[#A3A3A3] text-xs font-bold">%</span>
              </div>
            </div>

            <div>
              <label htmlFor="pr-student-loan" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Student Loan
              </label>
              <select
                id="pr-student-loan"
                value={input.studentLoanPlan}
                onChange={(e) => setInput({ ...input, studentLoanPlan: e.target.value as StudentLoanPlan })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-2 py-2 text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              >
                <option value="none">None</option>
                <option value="plan1">Plan 1</option>
                <option value="plan2">Plan 2</option>
                <option value="plan4">Plan 4 (Scot)</option>
                <option value="plan5">Plan 5</option>
                <option value="postgrad">Postgraduate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Comparison & Insights */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Card: Extra Take-Home */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Extra Take-Home In Your Pocket
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Pay Rise Retention: <strong className="text-[#111111] dark:text-[#F5F5F5]">{result.takeHomeRetentionPercent.toFixed(1)}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                +<AnimatedNumber
                  value={result.extraTakeHomeMonthly}
                  prefix="£"
                  decimals={2}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
                <span className="text-sm sm:text-base font-normal text-[#525252] dark:text-[#A3A3A3] ml-2">/ month</span>
              </div>
              <div className="flex items-center gap-4 pt-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
                <span>
                  <strong className="text-[#111111] dark:text-[#F5F5F5]">
                    +£{result.extraTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                  {' '}/ year
                </span>
                <span>•</span>
                <span>
                  <strong className="text-[#111111] dark:text-[#F5F5F5]">
                    +£{result.extraTakeHomeWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                  {' '}/ week
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.takeHomeRetentionPercent}
                size={100}
                strokeWidth={8}
                label="Retained"
              />
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-xs">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Gross Pay Rise</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums mt-0.5 block">
                +£{result.grossIncreaseAnnual.toLocaleString('en-GB')}
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Extra Deductions</span>
              <span className="font-bold text-[#DC2626] dark:text-[#F87171] tabular-nums mt-0.5 block">
                -£{result.totalExtraDeductionsAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">New Marginal Rate</span>
              <span className="font-bold text-[#059669] dark:text-[#10B981] tabular-nums mt-0.5 block">
                {result.newMarginalTaxRate.toFixed(1)}%
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Effective Tax Rate</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums mt-0.5 block">
                {result.effectiveTaxRateAfter.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Warning Callouts if thresholds crossed */}
        {(result.crossesHigherRateTax || result.crossesPersonalAllowanceTaper || result.crossesChildBenefitCharge || result.crossesAdditionalRateTax) && (
          <div className="space-y-3">
            {result.crossesHigherRateTax && (
              <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-amber-900 dark:text-amber-200 font-bold block">
                    Higher Rate Tax Band Threshold Crossed (£{result.higherRateThreshold.toLocaleString('en-GB')})
                  </strong>
                  <p className="text-amber-800/80 dark:text-amber-300/80">
                    This salary increase moves part of your earnings above the £{result.higherRateThreshold.toLocaleString('en-GB')} threshold. Earnings in this band are taxed at {input.region === 'scotland' ? '42% Scottish Higher Rate' : '40% Higher Rate'} (plus 2% National Insurance). Remember that only income <em>above</em> the threshold is taxed at the higher rate, not your entire salary.
                  </p>
                </div>
              </div>
            )}

            {result.crossesPersonalAllowanceTaper && (
              <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-rose-900 dark:text-rose-200 font-bold block">
                    £100,000 Personal Allowance Taper (60% Tax Trap)
                  </strong>
                  <p className="text-rose-800/80 dark:text-rose-300/80">
                    Earnings between £100,000 and £125,140 lose £1 of tax-free Personal Allowance for every £2 earned, creating an effective <strong>60% Income Tax rate</strong> (62% including 2% NI, or 65% in Scotland). Consider salary sacrifice pension contributions to bring your Adjusted Net Income back under £100k.
                  </p>
                </div>
              </div>
            )}

            {result.crossesChildBenefitCharge && (
              <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-blue-900 dark:text-blue-200 font-bold block">
                    High Income Child Benefit Charge Zone (£60,000 – £80,000)
                  </strong>
                  <p className="text-blue-800/80 dark:text-blue-300/80">
                    If you or your partner receive Child Benefit, earning over £60,000 triggers the High Income Child Benefit Charge (1% clawback per £200 earned over £60k, fully tapered at £80k).
                  </p>
                </div>
              </div>
            )}

            {result.crossesAdditionalRateTax && (
              <div className="rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 p-4 flex items-start gap-3">
                <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-purple-900 dark:text-purple-200 font-bold block">
                    Additional Rate Tax Band (£125,140+)
                  </strong>
                  <p className="text-purple-800/80 dark:text-purple-300/80">
                    Income above £125,140 is taxed at the top rate of 45% (48% in Scotland) plus 2% employee National Insurance.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side-by-Side Comparison Table */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Before vs. After Pay Rise Comparison
            </h3>
            <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
              +{result.grossIncreasePercentage.toFixed(1)}% Gross Increase
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  <th className="text-left py-2 font-bold uppercase tracking-wider text-2xs">Metric</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">Current Salary</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">New Salary</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs text-[#059669] dark:text-[#10B981]">Net Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {/* Gross Annual */}
                <tr>
                  <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Gross Salary (Annual)</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{result.currentSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.newSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.grossIncreaseAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Gross Monthly */}
                <tr>
                  <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Gross Salary (Monthly)</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{(result.currentSalary / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{(result.newSalary / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.grossIncreaseMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Income Tax */}
                <tr>
                  <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Income Tax (Annual)</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    -£{result.before.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                    -£{result.after.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                    +£{result.extraTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* National Insurance */}
                <tr>
                  <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">National Insurance (Annual)</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    -£{result.before.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                    -£{result.after.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                    +£{result.extraNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Pension */}
                {input.pensionPercentage > 0 && (
                  <tr>
                    <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Pension ({input.pensionPercentage}%)</td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{result.before.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{result.after.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      +£{result.extraPensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}

                {/* Student Loan */}
                {result.extraStudentLoanAnnual > 0 && (
                  <tr>
                    <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Student Loan Repayment</td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{(result.before.studentLoanAnnual + result.before.postgradLoanAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                      -£{(result.after.studentLoanAnnual + result.after.postgradLoanAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                      +£{result.extraStudentLoanAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}

                {/* Net Annual Highlight Row */}
                <tr className="bg-[#FAFAFA] dark:bg-[#151515] font-bold">
                  <td className="py-3 px-2 rounded-l-lg text-[#111111] dark:text-[#F5F5F5]">Net Take-Home (Annual)</td>
                  <td className="py-3 text-right text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{result.before.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.after.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-2 text-right rounded-r-lg font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.extraTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Net Monthly Highlight Row */}
                <tr className="bg-[#059669]/5 dark:bg-[#10B981]/5 font-bold">
                  <td className="py-3 px-2 rounded-l-lg text-[#059669] dark:text-[#10B981]">Net Take-Home (Monthly)</td>
                  <td className="py-3 text-right text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{result.before.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.after.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-2 text-right rounded-r-lg font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.extraTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Export & Actions */}
        <ExportActions
          textToCopy={copyText}
          csvData={[
            { Metric: 'Current Gross Salary', Value: `£${result.currentSalary.toFixed(2)}` },
            { Metric: 'New Gross Salary', Value: `£${result.newSalary.toFixed(2)}` },
            { Metric: 'Gross Pay Rise Annual', Value: `£${result.grossIncreaseAnnual.toFixed(2)}` },
            { Metric: 'Gross Pay Rise Percentage', Value: `${result.grossIncreasePercentage.toFixed(2)}%` },
            { Metric: 'Before Net Take-Home (Annual)', Value: `£${result.before.netAnnual.toFixed(2)}` },
            { Metric: 'Before Net Take-Home (Monthly)', Value: `£${result.before.netMonthly.toFixed(2)}` },
            { Metric: 'After Net Take-Home (Annual)', Value: `£${result.after.netAnnual.toFixed(2)}` },
            { Metric: 'After Net Take-Home (Monthly)', Value: `£${result.after.netMonthly.toFixed(2)}` },
            { Metric: 'Extra Take-Home Annual', Value: `£${result.extraTakeHomeAnnual.toFixed(2)}` },
            { Metric: 'Extra Take-Home Monthly', Value: `£${result.extraTakeHomeMonthly.toFixed(2)}` },
            { Metric: 'Pay Rise Retention Rate', Value: `${result.takeHomeRetentionPercent.toFixed(2)}%` },
            { Metric: 'Extra Annual Income Tax', Value: `£${result.extraTaxAnnual.toFixed(2)}` },
            { Metric: 'Extra Annual National Insurance', Value: `£${result.extraNiAnnual.toFixed(2)}` },
            { Metric: 'New Marginal Tax Rate', Value: `${result.newMarginalTaxRate.toFixed(2)}%` },
          ]}
          fileName={`paywise-pay-rise-from-${result.currentSalary}-to-${result.newSalary}`}
          title="Pay Rise & Salary Increase Analysis"
        />
      </div>
    </div>
  );
};
