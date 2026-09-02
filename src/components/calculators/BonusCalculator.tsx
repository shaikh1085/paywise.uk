import React, { useState, useMemo } from 'react';
import { BonusTaxInput, TaxRegion, StudentLoanPlan, PensionType } from '../../types';
import { calculateBonusTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import {
  Gift,
  Percent,
  ArrowUpRight,
  AlertTriangle,
  Info,
  ShieldAlert,
  Coins,
  Receipt,
  Scale,
  Sparkles,
  PiggyBank,
  FileText,
} from 'lucide-react';

export const BonusCalculator: React.FC = () => {
  const [input, setInput] = useState<BonusTaxInput>({
    baseSalary: 45000,
    bonusAmount: 5000,
    taxYear: '2025_26',
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: 5,
    pensionType: 'auto_enrolment',
    pensionAppliesToBonus: true,
    salarySacrificeBonusAmount: 0,
    studentLoanPlan: 'none',
  });

  const [enableSacrificeSim, setEnableSacrificeSim] = useState(false);

  const result = useMemo(() => {
    return calculateBonusTax({
      ...input,
      salarySacrificeBonusAmount: enableSacrificeSim ? input.salarySacrificeBonusAmount : 0,
    });
  }, [input, enableSacrificeSim]);

  const copyText = `PayWise UK Bonus Tax Calculation:
Base Annual Salary: £${result.baseSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Gross One-Off Bonus: £${result.bonusAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
---
Net Bonus in Pocket: £${result.netBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${result.retentionPercentage.toFixed(1)}% retained)
Deductions on Bonus:
- Income Tax: £${result.taxOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- National Insurance: £${result.niOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${result.pensionOnBonus > 0 ? `- Pension (${input.pensionPercentage}%): £${result.pensionOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` : ''}${result.studentLoanOnBonus > 0 ? `- Student Loan: £${result.studentLoanOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` : ''}---
Payslip Comparison:
Normal Month Take-Home: £${result.normalMonthNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Bonus Month Take-Home: £${result.bonusMonthNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (+£${result.bonusMonthExtraNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
${result.crossesHigherRate ? '⚠️ Warning: This bonus pushes your total earnings into the Higher Rate tax band.\n' : ''}${result.crossesPersonalAllowanceTaper ? '⚠️ Warning: Total earnings enter or sit in the £100k–£125.1k Personal Allowance taper zone (60% tax trap).\n' : ''}${result.crossesChildBenefitCharge ? '⚠️ Warning: Total earnings affect the High Income Child Benefit Charge zone (£60k–£80k).\n' : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/bonus-tax-calculator)`;

  const presetBonuses = [1000, 2500, 5000, 10000, 15000, 25000];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Gift className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Salary &amp; Bonus Details
        </h2>

        <div className="space-y-4">
          {/* Base Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="base-salary-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Annual Base Salary (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.baseSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="base-salary-input"
                min="0"
                step="500"
                value={input.baseSalary || ''}
                onChange={(e) => setInput({ ...input, baseSalary: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 45000"
              />
            </div>
          </div>

          {/* Bonus Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="bonus-amount-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                One-Off Gross Bonus (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{(input.bonusAmount || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="bonus-amount-input"
                min="0"
                step="250"
                value={input.bonusAmount || ''}
                onChange={(e) => setInput({ ...input, bonusAmount: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 5000"
              />
            </div>
            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {presetBonuses.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setInput({ ...input, bonusAmount: amount })}
                  className={`px-2 py-0.5 rounded-md text-2xs font-bold transition-colors ${
                    input.bonusAmount === amount
                      ? 'bg-[#059669] text-white'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  +£{amount.toLocaleString('en-GB')}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Code & Tax Region */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="bt-tax-code" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Tax Code
                </label>
                <Tooltip
                  title="UK Tax Code"
                  content="Standard code is 1257L for £12,570 Personal Allowance. Custom codes (e.g. BR, D0, K-codes) are fully supported."
                />
              </div>
              <input
                type="text"
                id="bt-tax-code"
                value={input.taxCode}
                onChange={(e) => setInput({ ...input, taxCode: e.target.value.toUpperCase() })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none uppercase"
                placeholder="1257L"
              />
            </div>

            <div>
              <label htmlFor="bt-region" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Tax Region
              </label>
              <select
                id="bt-region"
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
              <label htmlFor="bt-pension-pct" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Pension Contrib. (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="bt-pension-pct"
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
              <label htmlFor="bt-student-loan" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Student Loan
              </label>
              <select
                id="bt-student-loan"
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

          {/* Pension on Bonus Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#525252] dark:text-[#A3A3A3]">
              <input
                type="checkbox"
                checked={input.pensionAppliesToBonus}
                onChange={(e) => setInput({ ...input, pensionAppliesToBonus: e.target.checked })}
                className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-[#D4D4D4] dark:border-[#303030]"
              />
              <span>Deduct workplace pension ({input.pensionPercentage}%) from bonus pay</span>
            </label>
          </div>

          {/* Salary Sacrifice Pension Option Toggle */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
                <PiggyBank className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                Salary Sacrifice Bonus into Pension
              </label>
              <button
                type="button"
                onClick={() => {
                  const next = !enableSacrificeSim;
                  setEnableSacrificeSim(next);
                  if (next && (!input.salarySacrificeBonusAmount || input.salarySacrificeBonusAmount === 0)) {
                    setInput({ ...input, salarySacrificeBonusAmount: Math.min(input.bonusAmount, 2500) });
                  }
                }}
                className={`text-2xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                  enableSacrificeSim
                    ? 'bg-[#059669] text-white'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]'
                }`}
              >
                {enableSacrificeSim ? 'Active' : 'Simulate'}
              </button>
            </div>

            {enableSacrificeSim && (
              <div className="mt-3 p-3 rounded-xl bg-[#059669]/5 dark:bg-[#10B981]/5 border border-[#059669]/20 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">Amount to Sacrifice:</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    £{(input.salarySacrificeBonusAmount || 0).toLocaleString('en-GB')}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={input.bonusAmount}
                  step="250"
                  value={input.salarySacrificeBonusAmount || 0}
                  onChange={(e) => setInput({ ...input, salarySacrificeBonusAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#333333] rounded-lg appearance-none cursor-pointer accent-[#059669]"
                />
                <div className="flex justify-between text-2xs text-[#525252] dark:text-[#A3A3A3]">
                  <span>£0 (Take all cash)</span>
                  <span>100% (£{(input.bonusAmount).toLocaleString('en-GB')})</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Results & Payslip Impact */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Payout Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Net Bonus Payout In Your Pocket
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Retention Rate: <strong className="text-[#111111] dark:text-[#F5F5F5]">{result.retentionPercentage.toFixed(1)}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                <AnimatedNumber
                  value={result.netBonus}
                  prefix="£"
                  decimals={2}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
              </div>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] pt-1">
                From a gross bonus of <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.bonusAmount.toLocaleString('en-GB')}</strong> (Total Deductions: £{result.totalDeductionsOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
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

          {/* Deductions Breakdown Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-xs">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Income Tax</span>
              <span className="font-bold text-[#DC2626] dark:text-[#F87171] tabular-nums mt-0.5 block">
                -£{result.taxOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">National Insurance</span>
              <span className="font-bold text-[#DC2626] dark:text-[#F87171] tabular-nums mt-0.5 block">
                -£{result.niOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Pension Contrib.</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums mt-0.5 block">
                {result.pensionOnBonus > 0 ? `-£${result.pensionOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '£0'}
              </span>
            </div>
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs uppercase font-bold">Student Loan</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums mt-0.5 block">
                {result.studentLoanOnBonus > 0 ? `-£${result.studentLoanOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '£0'}
              </span>
            </div>
          </div>
        </div>

        {/* Warning Threshold Callouts */}
        {(result.crossesHigherRate || result.crossesPersonalAllowanceTaper || result.crossesChildBenefitCharge || result.crossesAdditionalRate) && (
          <div className="space-y-3">
            {result.crossesHigherRate && (
              <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-amber-900 dark:text-amber-200 font-bold block">
                    Higher Rate Threshold Crossed (£{result.higherRateThreshold.toLocaleString('en-GB')})
                  </strong>
                  <p className="text-amber-800/80 dark:text-amber-300/80">
                    This bonus pushes your total earnings into the Higher Rate band. The portion of your bonus above £{result.higherRateThreshold.toLocaleString('en-GB')} is taxed at {input.region === 'scotland' ? '42%' : '40%'} Income Tax + 2% National Insurance.
                  </p>
                </div>
              </div>
            )}

            {result.crossesPersonalAllowanceTaper && (
              <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-rose-900 dark:text-rose-200 font-bold block">
                    £100k Personal Allowance Taper (60% Tax Trap)
                  </strong>
                  <p className="text-rose-800/80 dark:text-rose-300/80">
                    Earnings between £100k and £125,140 lose £1 of Personal Allowance for every £2 earned, resulting in a <strong>60% marginal income tax rate</strong> (62% with NI). Sacrificing this bonus into your workplace pension could preserve your full tax-free allowance.
                  </p>
                </div>
              </div>
            )}

            {result.crossesChildBenefitCharge && (
              <div className="rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-blue-900 dark:text-blue-200 font-bold block">
                    High Income Child Benefit Charge Zone (£60,000 to £80,000)
                  </strong>
                  <p className="text-blue-800/80 dark:text-blue-300/80">
                    With your bonus, total income sits between £60k and £80k. If claiming Child Benefit, 1% of the benefit is clawed back for every £200 earned over £60,000.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Salary Sacrifice Simulation Card (if active) */}
        {result.salarySacrificeComparison && (
          <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                Salary Sacrifice Pension Strategy
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#151515] border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs">Added to Pension Pot</span>
                <span className="text-sm font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                  +£{result.salarySacrificeComparison.pensionPotAdded.toLocaleString('en-GB')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#151515] border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs">Tax &amp; NI Saved</span>
                <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  £{(result.salarySacrificeComparison.taxSaved + result.salarySacrificeComparison.niSaved).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-[#151515] border border-emerald-200/60 dark:border-emerald-800/40">
                <span className="text-[#525252] dark:text-[#A3A3A3] block text-2xs">Net Take-Home Sacrificed</span>
                <span className="text-sm font-extrabold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.salarySacrificeComparison.netCashLost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <p className="text-2xs text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
              By redirecting £{result.salarySacrificeComparison.sacrificedAmount.toLocaleString('en-GB')} of bonus into your pension, you boost your retirement savings by £{result.salarySacrificeComparison.pensionPotAdded.toLocaleString('en-GB')} at a real net take-home cost of only £{result.salarySacrificeComparison.netCashLost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
            </p>
          </div>
        )}

        {/* Payslip Comparison: Normal Month vs Bonus Month */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Monthly Payslip Comparison
            </h3>
            <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
              Bonus Month vs Regular Month
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  <th className="text-left py-2 font-bold uppercase tracking-wider text-2xs">Payslip Item</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">Regular Month</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs text-[#059669] dark:text-[#10B981]">Bonus Month</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">Bonus Only Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Gross Pay</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{(result.baseSalary / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    £{result.bonusMonthGross.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.bonusAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Income Tax (PAYE)</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    -£{(result.baseWithoutBonus.incomeTaxAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                    -£{((result.baseWithoutBonus.incomeTaxAnnual / 12) + result.taxOnBonus).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                    -£{result.taxOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">National Insurance</td>
                  <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    -£{(result.baseWithoutBonus.employeeNiAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                    -£{((result.baseWithoutBonus.employeeNiAnnual / 12) + result.niOnBonus).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                    -£{result.niOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {result.pensionOnBonus > 0 && (
                  <tr>
                    <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Workplace Pension</td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{(result.baseWithoutBonus.pensionAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{((result.baseWithoutBonus.pensionAnnual / 12) + result.pensionOnBonus).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{result.pensionOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}

                {result.studentLoanOnBonus > 0 && (
                  <tr>
                    <td className="py-2.5 font-medium text-[#525252] dark:text-[#A3A3A3]">Student Loan</td>
                    <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      -£{((result.baseWithoutBonus.studentLoanAnnual + result.baseWithoutBonus.postgradLoanAnnual) / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-medium text-[#EF4444] tabular-nums">
                      -£{(((result.baseWithoutBonus.studentLoanAnnual + result.baseWithoutBonus.postgradLoanAnnual) / 12) + result.studentLoanOnBonus).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right font-bold text-[#EF4444] tabular-nums">
                      -£{result.studentLoanOnBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}

                <tr className="bg-[#059669]/5 dark:bg-[#10B981]/5 font-bold">
                  <td className="py-3 px-2 rounded-l-lg text-[#059669] dark:text-[#10B981]">Net Take-Home Payout</td>
                  <td className="py-3 text-right text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                    £{result.normalMonthNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right text-[#111111] dark:text-[#F5F5F5] font-extrabold tabular-nums">
                    £{result.bonusMonthNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-2 text-right rounded-r-lg font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                    +£{result.netBonus.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Does My Payslip Look Like Emergency Tax? Callout */}
        <div className="rounded-2xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider">
              Why Does My Bonus Payslip Look Like "Emergency Tax"?
            </h4>
          </div>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            UK PAYE software calculates tax per pay period by annualising that specific month's total gross income. When a lump sum bonus is added to your salary in a single month, the payroll system might temporarily calculate your tax as if you earn that higher amount every month of the year.
          </p>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            <strong>How it is resolved:</strong> Because standard UK tax codes operate on a <em>cumulative</em> basis, any excess tax deducted in your bonus month automatically adjusts downwards in subsequent payslips across the remainder of the tax year, or is refunded directly by HMRC via a P800 calculation after 5 April.
          </p>
        </div>

        {/* Export & Actions */}
        <ExportActions
          textToCopy={copyText}
          csvData={[
            { Metric: 'Annual Base Salary', Value: `£${result.baseSalary.toFixed(2)}` },
            { Metric: 'Gross Bonus Amount', Value: `£${result.bonusAmount.toFixed(2)}` },
            { Metric: 'Total Gross Income', Value: `£${result.totalGrossIncome.toFixed(2)}` },
            { Metric: 'Net Bonus in Pocket', Value: `£${result.netBonus.toFixed(2)}` },
            { Metric: 'Bonus Retention Rate', Value: `${result.retentionPercentage.toFixed(2)}%` },
            { Metric: 'Income Tax on Bonus', Value: `£${result.taxOnBonus.toFixed(2)}` },
            { Metric: 'National Insurance on Bonus', Value: `£${result.niOnBonus.toFixed(2)}` },
            { Metric: 'Pension Deducted from Bonus', Value: `£${result.pensionOnBonus.toFixed(2)}` },
            { Metric: 'Student Loan Deducted from Bonus', Value: `£${result.studentLoanOnBonus.toFixed(2)}` },
            { Metric: 'Regular Month Net Pay', Value: `£${result.normalMonthNet.toFixed(2)}` },
            { Metric: 'Bonus Month Net Pay', Value: `£${result.bonusMonthNet.toFixed(2)}` },
          ]}
          fileName={`paywise-bonus-tax-calculation-${result.bonusAmount}`}
          title="Bonus Tax & Take-Home Analysis"
        />
      </div>
    </div>
  );
};
