import React, { useState, useMemo } from 'react';
import {
  NetToGrossInput,
  NetFrequency,
  TaxYear,
  TaxRegion,
  PensionType,
  StudentLoanPlan,
} from '../../types';
import { calculateGrossFromNet } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  ArrowUpDown,
  RotateCcw,
  Wallet,
  ChevronDown,
  ChevronUp,
  Percent,
  Sliders,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const NetToGrossCalculator: React.FC = () => {
  const [input, setInput] = useState<NetToGrossInput>({
    desiredNet: 3000,
    netFrequency: 'monthly',
    taxYear: '2025_26',
    region: 'england_ni',
    taxCode: '1257L',
    pensionPercentage: 0,
    pensionType: 'net_pay',
    studentLoanPlan: 'none',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const result = useMemo(() => {
    if (!input.desiredNet || input.desiredNet <= 0) return null;
    return calculateGrossFromNet(input);
  }, [input]);

  const handleReset = () => {
    setInput({
      desiredNet: 3000,
      netFrequency: 'monthly',
      taxYear: '2025_26',
      region: 'england_ni',
      taxCode: '1257L',
      pensionPercentage: 0,
      pensionType: 'net_pay',
      studentLoanPlan: 'none',
    });
    setShowAdvanced(false);
  };

  const fmt = (n: number | undefined | null) =>
    '£' + (typeof n === 'number' && !isNaN(n) ? n : 0).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const fmtWhole = (n: number | undefined | null) =>
    '£' + Math.round(typeof n === 'number' && !isNaN(n) ? n : 0).toLocaleString('en-GB');

  const copyText = result
    ? `PayWise UK Net to Gross Salary Calculator:
Target Take-Home (${input.netFrequency}): ${fmt(input.desiredNet)}
Tax Year: ${input.taxYear.replace('_', '/')}
Region: ${input.region === 'scotland' ? 'Scotland' : input.region === 'wales' ? 'Wales' : 'England / NI'}
---
Required Gross Salary:
  Annual:  ${fmt(result.grossAnnual)}
  Monthly: ${fmt(result.grossMonthly)}
  Weekly:  ${fmt(result.grossWeekly)}
---
Estimated Deductions (Annual):
  Income Tax:         ${fmt(result.incomeTaxAnnual)}
  National Insurance: ${fmt(result.employeeNiAnnual)}
  Pension:            ${fmt(result.pensionAnnual)}
  Student Loan:       ${fmt(result.studentLoanAnnual)}
  Total Deductions:   ${fmt(result.totalDeductionsAnnual)}
---
Effective Deductions Rate: ${(result.effectiveTaxRate || 0).toFixed(1)}%
Calculated via PayWise UK (https://www.paywiseuk.co.uk/net-to-gross-calculator)`
    : '';

  const frequencies: { value: NetFrequency; label: string }[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
    { value: 'weekly', label: 'Weekly' },
  ];

  const regions: { value: TaxRegion; label: string }[] = [
    { value: 'england_ni', label: 'England / NI' },
    { value: 'wales', label: 'Wales' },
    { value: 'scotland', label: 'Scotland' },
  ];

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26' },
    { value: '2026_27', label: '2026/27' },
    { value: '2024_25', label: '2024/25' },
  ];

  const quickPresets = [
    { label: '£2k/mo', amount: 2000, freq: 'monthly' as NetFrequency },
    { label: '£2.5k/mo', amount: 2500, freq: 'monthly' as NetFrequency },
    { label: '£3k/mo', amount: 3000, freq: 'monthly' as NetFrequency },
    { label: '£4k/mo', amount: 4000, freq: 'monthly' as NetFrequency },
    { label: '£5k/mo', amount: 5000, freq: 'monthly' as NetFrequency },
  ];

  const benchmarkTable = useMemo(() => {
    const monthlyTargets = [1500, 2000, 2500, 3000, 4000, 5000, 7500];
    return monthlyTargets.map((target) => {
      const res = calculateGrossFromNet({
        ...input,
        desiredNet: target,
        netFrequency: 'monthly',
      });
      return {
        targetMonthly: target,
        targetAnnual: target * 12,
        grossAnnual: res.grossAnnual,
        grossMonthly: res.grossMonthly,
        totalTax: res.incomeTaxAnnual + res.employeeNiAnnual,
        effectiveRate: res.effectiveTaxRate,
      };
    });
  }, [input.taxYear, input.region, input.taxCode, input.pensionPercentage, input.pensionType, input.studentLoanPlan]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Your Target Take-Home
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="space-y-5">
          {/* Desired Net Amount */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Desired Take-Home Pay
              </label>
              <Tooltip
                content="Enter the net amount you want to receive in your bank account. The calculator will work backwards to calculate the gross salary needed."
                title="Target Net Pay"
              />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">
                £
              </span>
              <input
                type="number"
                min="0"
                step="50"
                value={input.desiredNet || ''}
                onChange={(e) =>
                  setInput((p) => ({ ...p, desiredNet: parseFloat(e.target.value) || 0 }))
                }
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 3000"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setInput((p) => ({
                      ...p,
                      desiredNet: preset.amount,
                      netFrequency: preset.freq,
                    }))
                  }
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-md border transition-all ${
                    input.desiredNet === preset.amount && input.netFrequency === preset.freq
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#FAFAFA] dark:bg-[#1C1C1C] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50 hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pay Frequency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Net Pay Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, netFrequency: f.value }))}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    input.netFrequency === f.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Selector */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Tax Region
              </label>
              <Tooltip
                content="Scottish taxpayers have distinct income tax bands (Starter 19%, Intermediate 21%, Higher 42%, Advanced 45%, Top 48%)."
                title="UK Tax Jurisdiction"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {regions.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, region: r.value }))}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                    input.region === r.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Year Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <div className="grid grid-cols-3 gap-2">
              {taxYears.map((y) => (
                <button
                  key={y.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, taxYear: y.value }))}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                    input.taxYear === y.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Collapsible Toggle */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                Tax Code, Pension &amp; Student Loan Options
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-4 pt-3 border-t border-dashed border-[#E5E5E5] dark:border-[#2A2A2A]">
                {/* Tax Code */}
                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                      Tax Code
                    </label>
                    <Tooltip
                      content="Standard is 1257L for £12,570 tax-free personal allowance. You can enter custom codes like BR, 0T, or K codes."
                      title="UK PAYE Tax Code"
                    />
                  </div>
                  <input
                    type="text"
                    value={input.taxCode}
                    onChange={(e) =>
                      setInput((p) => ({ ...p, taxCode: e.target.value.toUpperCase() }))
                    }
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3.5 py-2 text-[#111111] dark:text-[#F5F5F5] font-bold text-sm focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none uppercase"
                    placeholder="1257L"
                  />
                </div>

                {/* Pension Contribution */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                        Employee Pension (%)
                      </label>
                      <Tooltip
                        content="Percentage deducted from your salary into a pension scheme. Auto-enrolment employee minimum is usually 5%."
                        title="Workplace Pension"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#059669] dark:text-[#10B981]">
                      {input.pensionPercentage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={input.pensionPercentage}
                    onChange={(e) =>
                      setInput((p) => ({ ...p, pensionPercentage: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#059669]"
                  />
                  <div className="flex justify-between text-2xs text-[#737373] mt-1">
                    <span>0% (None)</span>
                    <span>5% (Standard)</span>
                    <span>10%</span>
                    <span>20%+</span>
                  </div>
                </div>

                {/* Pension Type */}
                {input.pensionPercentage > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                      Pension Relief Scheme
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { value: 'net_pay' as PensionType, label: 'Net Pay' },
                        { value: 'salary_sacrifice' as PensionType, label: 'Salary Sacrifice' },
                        { value: 'relief_at_source' as PensionType, label: 'Relief at Source' },
                      ].map((pt) => (
                        <button
                          key={pt.value}
                          type="button"
                          onClick={() => setInput((p) => ({ ...p, pensionType: pt.value }))}
                          className={`py-1.5 px-2 rounded-lg text-2xs font-bold border text-center ${
                            input.pensionType === pt.value
                              ? 'bg-[#059669] text-white border-[#059669]'
                              : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3]'
                          }`}
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Loan */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                    Student Loan Repayment
                  </label>
                  <select
                    value={input.studentLoanPlan}
                    onChange={(e) =>
                      setInput((p) => ({
                        ...p,
                        studentLoanPlan: e.target.value as StudentLoanPlan,
                      }))
                    }
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3.5 py-2 text-[#111111] dark:text-[#F5F5F5] text-xs font-bold focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                  >
                    <option value="none">No Student Loan</option>
                    <option value="plan1">Plan 1 (Pre-2012 / NI)</option>
                    <option value="plan2">Plan 2 (Post-2012 England &amp; Wales)</option>
                    <option value="plan4">Plan 4 (Scotland)</option>
                    <option value="plan5">Plan 5 (Post-2023 England)</option>
                    <option value="postgrad">Postgraduate Loan Only</option>
                    <option value="plan2_postgrad">Plan 2 + Postgraduate</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Results Display */}
      <div className="lg:col-span-7 space-y-5">
        {result ? (
          <>
            {/* Primary Hero Card */}
            <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981]">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] dark:bg-[#052e16] border border-[#059669]/20 text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Required Gross Salary
                </span>
                <span className="text-2xs text-[#525252] dark:text-[#A3A3A3]">
                  To take home <strong>{fmt(input.desiredNet)}</strong> {input.netFrequency}
                </span>
              </div>

              {/* Main Number */}
              <div className="mb-6">
                <p className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight tabular-nums">
                  <AnimatedNumber value={result.grossAnnual} prefix="£" decimals={2} />
                </p>
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1 font-medium">
                  Annual Gross Salary ({fmt(result.grossMonthly)}/month · {fmt(result.grossWeekly)}/week)
                </p>
              </div>

              {/* Quick Period Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-0.5">
                    Gross Monthly
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                    {fmt(result.grossMonthly)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-0.5">
                    Total Deductions
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#DC2626] dark:text-[#F87171] tabular-nums">
                    -{fmt(result.totalDeductionsMonthly)}/mo
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] dark:bg-[#052e16] border border-[#059669]/30">
                  <p className="text-2xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] mb-0.5">
                    Net in Pocket
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                    {fmt(result.netMonthly)}/mo
                  </p>
                </div>
              </div>

              {/* Deductions Breakdown Table */}
              <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden mb-6 text-xs">
                <div className="bg-[#FAFAFA] dark:bg-[#141414] px-4 py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex justify-between">
                  <span>Deduction Component</span>
                  <span className="tabular-nums">Annual Amount</span>
                </div>
                <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  <div className="px-4 py-2.5 flex justify-between font-bold bg-white dark:bg-[#171717]">
                    <span>Gross Salary</span>
                    <span className="tabular-nums text-[#111111] dark:text-[#F5F5F5]">
                      {fmt(result.grossAnnual)}
                    </span>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#171717]">
                    <span>Income Tax (PAYE)</span>
                    <span className="tabular-nums font-semibold text-[#DC2626] dark:text-[#F87171]">
                      -{fmt(result.incomeTaxAnnual)}
                    </span>
                  </div>
                  <div className="px-4 py-2 flex justify-between text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#171717]">
                    <span>National Insurance (Class 1)</span>
                    <span className="tabular-nums font-semibold text-[#DC2626] dark:text-[#F87171]">
                      -{fmt(result.employeeNiAnnual)}
                    </span>
                  </div>
                  {result.pensionAnnual > 0 && (
                    <div className="px-4 py-2 flex justify-between text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#171717]">
                      <span>Pension Contribution ({input.pensionPercentage}%)</span>
                      <span className="tabular-nums font-semibold text-[#525252] dark:text-[#A3A3A3]">
                        -{fmt(result.pensionAnnual)}
                      </span>
                    </div>
                  )}
                  {result.studentLoanAnnual > 0 && (
                    <div className="px-4 py-2 flex justify-between text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#171717]">
                      <span>Student Loan Repayment</span>
                      <span className="tabular-nums font-semibold text-[#525252] dark:text-[#A3A3A3]">
                        -{fmt(result.studentLoanAnnual)}
                      </span>
                    </div>
                  )}
                  <div className="px-4 py-2.5 flex justify-between font-extrabold bg-[#F0FDF4] dark:bg-[#052e16] text-[#059669] dark:text-[#10B981]">
                    <span>Net Take-Home Pay</span>
                    <span className="tabular-nums">{fmt(result.netAnnual)}</span>
                  </div>
                </div>
              </div>

              {/* Effective Rate Footer */}
              <div className="rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 text-xs text-[#525252] dark:text-[#A3A3A3] flex flex-wrap justify-between items-center gap-2">
                <span>
                  Effective Deductions Rate:{' '}
                  <strong className="text-[#111111] dark:text-[#F5F5F5]">
                    {(result.effectiveTaxRate || 0).toFixed(1)}%
                  </strong>
                </span>
                <span>
                  Take-Home Retention:{' '}
                  <strong className="text-[#059669] dark:text-[#10B981]">
                    {(100 - (result.effectiveTaxRate || 0)).toFixed(1)}%
                  </strong>
                </span>
              </div>

              <div className="mt-5">
                <ExportActions copyText={copyText} fileName="paywise-net-to-gross-salary" />
              </div>
            </div>

            {/* Benchmark Table Card */}
            <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                Target Take-Home Salary Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#737373]">
                      <th className="py-2 pr-3">Target Take-Home</th>
                      <th className="py-2 px-3 text-right">Required Gross (Annual)</th>
                      <th className="py-2 px-3 text-right">Gross (Monthly)</th>
                      <th className="py-2 pl-3 text-right">Effective Deductions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    {benchmarkTable.map((row) => {
                      const isCurrent =
                        input.netFrequency === 'monthly' &&
                        Math.round(input.desiredNet) === row.targetMonthly;
                      return (
                        <tr
                          key={row.targetMonthly}
                          className={
                            isCurrent
                              ? 'bg-[#F0FDF4] dark:bg-[#052e16] font-bold text-[#059669] dark:text-[#10B981]'
                              : 'text-[#111111] dark:text-[#F5F5F5] hover:bg-[#FAFAFA] dark:hover:bg-[#151515]'
                          }
                        >
                          <td className="py-2 pr-3 whitespace-nowrap">
                            £{row.targetMonthly.toLocaleString('en-GB')}/mo (£{row.targetAnnual.toLocaleString('en-GB')}/yr)
                          </td>
                          <td className="py-2 px-3 text-right tabular-nums whitespace-nowrap font-bold">
                            {fmtWhole(row.grossAnnual)}
                          </td>
                          <td className="py-2 px-3 text-right tabular-nums whitespace-nowrap text-[#525252] dark:text-[#A3A3A3]">
                            {fmtWhole(row.grossMonthly)}
                          </td>
                          <td className="py-2 pl-3 text-right tabular-nums whitespace-nowrap text-[#525252] dark:text-[#A3A3A3]">
                            {row.effectiveRate.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-8 text-center text-[#525252] dark:text-[#A3A3A3]">
            <Wallet className="w-8 h-8 mx-auto mb-2 text-[#737373]" />
            <p className="text-sm font-semibold">Enter a desired take-home pay amount to calculate required gross salary.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetToGrossCalculator;
