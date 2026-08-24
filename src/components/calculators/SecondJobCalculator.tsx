import React, { useState, useMemo } from 'react';
import { SecondJobInput, TaxYear, TaxRegion } from '../../types';
import { calculateSecondJobTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  Briefcase,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  AlertTriangle,
  FileText,
  Percent,
} from 'lucide-react';

export const SecondJobCalculator: React.FC = () => {
  const [input, setInput] = useState<SecondJobInput>({
    mainJobSalary: 35000,
    secondJobSalary: 12000,
    taxYear: '2025_26',
    region: 'england_ni',
    personalAllowanceAppliedToMain: true,
  });

  const result = useMemo(() => calculateSecondJobTax(input), [input]);

  const handleReset = () => {
    setInput({
      mainJobSalary: 35000,
      secondJobSalary: 12000,
      taxYear: '2025_26',
      region: 'england_ni',
      personalAllowanceAppliedToMain: true,
    });
  };

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26 (Current)' },
    { value: '2026_27', label: '2026/27 (Forecast)' },
    { value: '2024_25', label: '2024/25' },
  ];

  const presets = [
    { label: 'Part-time Side Role (£35k + £12k)', main: 35000, second: 12000 },
    { label: 'Weekend Shift (£28k + £6k)', main: 28000, second: 6000 },
    { label: 'Two Equal Roles (£22k + £22k)', main: 22000, second: 22000 },
    { label: 'Higher Rate Crosser (£42k + £15k)', main: 42000, second: 15000 },
    { label: 'Low Main Role (£8k + £18k)', main: 8000, second: 18000 },
  ];

  const copyText = `PayWise UK — Second Job Tax Calculation:
Tax Year: ${result.taxYearLabel} | Region: ${input.region === 'scotland' ? 'Scotland' : input.region === 'wales' ? 'Wales' : 'England & NI'}
---
Combined Total Gross Salary: ${fmt(result.combined.totalGrossSalary)}
Combined Net Take-Home Pay: ${fmt(result.combined.totalTakeHomePay)}/year (${fmt(result.combined.monthlyTakeHome)}/mo)
Total Income Tax: ${fmt(result.combined.totalIncomeTax)}
Total National Insurance: ${fmt(result.combined.totalNationalInsurance)}
Overall Effective Tax Rate: ${result.combined.overallEffectiveTaxRate.toFixed(1)}%
Marginal Rate on Second Job: ${result.combined.marginalTaxRate.toFixed(0)}%

Main Job:
- Gross Salary: ${fmt(result.mainJob.salary)}
- Tax Code: ${result.mainJob.suggestedTaxCode}
- Personal Allowance: ${fmt(result.mainJob.personalAllowance)}
- Income Tax: ${fmt(result.mainJob.incomeTax)}
- National Insurance: ${fmt(result.mainJob.nationalInsurance)}
- Net Take-Home: ${fmt(result.mainJob.takeHomePay)}/year (${fmt(result.mainJob.monthlyTakeHome)}/mo)

Second Job:
- Gross Salary: ${fmt(result.secondJob.salary)}
- Tax Code: ${result.secondJob.suggestedTaxCode}
- Personal Allowance: ${fmt(result.secondJob.personalAllowance)}
- Income Tax: ${fmt(result.secondJob.incomeTax)}
- National Insurance: ${fmt(result.secondJob.nationalInsurance)} (Per-job NI threshold applied)
- Net Take-Home: ${fmt(result.secondJob.takeHomePay)}/year (${fmt(result.secondJob.monthlyTakeHome)}/mo)

Calculated via PayWise UK (https://www.paywiseuk.co.uk/second-job-tax-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Income & Job Details
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[#737373] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="space-y-5">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
              Quick Scenarios
            </label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setInput((prev) => ({ ...prev, mainJobSalary: p.main, secondJobSalary: p.second }))}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    input.mainJobSalary === p.main && input.secondJobSalary === p.second
                      ? 'bg-[#059669]/10 dark:bg-[#10B981]/20 border-[#059669] dark:border-[#10B981] text-[#059669] dark:text-[#10B981] font-bold'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/40'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Job Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="main-salary-input" className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
                Main Job Annual Gross Salary
              </label>
              <span className="text-xs font-bold text-[#059669] dark:text-[#10B981]">
                {fmt(input.mainJobSalary || 0)}/yr
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                id="main-salary-input"
                type="number"
                min="0"
                step="500"
                value={input.mainJobSalary || ''}
                onChange={(e) => setInput((p) => ({ ...p, mainJobSalary: Math.max(0, parseFloat(e.target.value) || 0) }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] pl-8 pr-4 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none transition-colors"
                placeholder="e.g. 35000"
              />
            </div>
            <p className="mt-1 text-[11px] text-[#737373] dark:text-[#A3A3A3]">
              Your primary or highest-earning PAYE employment
            </p>
          </div>

          {/* Second Job Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="second-salary-input" className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
                Second Job Annual Gross Salary
              </label>
              <span className="text-xs font-bold text-[#059669] dark:text-[#10B981]">
                {fmt(input.secondJobSalary || 0)}/yr
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                id="second-salary-input"
                type="number"
                min="0"
                step="250"
                value={input.secondJobSalary || ''}
                onChange={(e) => setInput((p) => ({ ...p, secondJobSalary: Math.max(0, parseFloat(e.target.value) || 0) }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] pl-8 pr-4 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none transition-colors"
                placeholder="e.g. 12000"
              />
            </div>
            <p className="mt-1 text-[11px] text-[#737373] dark:text-[#A3A3A3]">
              Secondary job, weekend shifts, or supplementary employment
            </p>
          </div>

          {/* Tax Region & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-1.5 flex items-center gap-1">
                <span>Tax Region</span>
                <Tooltip text="Scotland has distinct devolved Income Tax bands (Starter 19%, Intermediate 21%, Higher 42%, etc.). NI rates are uniform UK-wide." />
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { key: 'england_ni' as TaxRegion, label: 'rUK' },
                  { key: 'scotland' as TaxRegion, label: 'Scotland' },
                  { key: 'wales' as TaxRegion, label: 'Wales' },
                ].map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setInput((p) => ({ ...p, region: r.key }))}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      (input.region || 'england_ni') === r.key
                        ? 'bg-[#059669] text-white border-[#059669]'
                        : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tax-year-select" className="block text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Tax Year
              </label>
              <select
                id="tax-year-select"
                value={input.taxYear || '2025_26'}
                onChange={(e) => setInput((p) => ({ ...p, taxYear: e.target.value as TaxYear }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] px-3 py-2 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:border-[#059669]"
              >
                {taxYears.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Allowance Allocation Toggle */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                  Apply Personal Allowance to Main Job
                </label>
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  HMRC standard rule: £12,570 tax-free allowance is applied to Job 1 (tax code 1257L), with Job 2 taxed at flat basic rate (BR code).
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={input.personalAllowanceAppliedToMain !== false}
                onClick={() => setInput((p) => ({ ...p, personalAllowanceAppliedToMain: p.personalAllowanceAppliedToMain === false }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  input.personalAllowanceAppliedToMain !== false ? 'bg-[#059669]' : 'bg-[#D4D4D4] dark:bg-[#404040]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    input.personalAllowanceAppliedToMain !== false ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <ExportActions
            title="Second Job Tax Calculation"
            copyText={copyText}
            variant="compact"
          />
        </div>
      </div>

      {/* RIGHT: Results & Breakdowns */}
      <div className="lg:col-span-7 space-y-6">
        {/* Important Explanatory Callout */}
        <div className="p-4 rounded-2xl bg-[#059669]/10 dark:bg-[#10B981]/15 border border-[#059669]/30 dark:border-[#10B981]/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F5] leading-relaxed">
            <strong className="font-bold text-[#059669] dark:text-[#10B981] block mb-0.5">
              The Golden Rule of Second Jobs in the UK
            </strong>
            Your second job isn't taxed extra just because it's a second job — it is taxed based on the total of both incomes combined. Because your primary job uses your tax-free allowance, second job earnings are taxed from pound one under a BR code.
          </div>
        </div>

        {/* Warnings & Alerts */}
        {result.hasHigherRateWarning && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
              <strong className="font-bold block mb-0.5">Higher Rate Tax Bracket Alert</strong>
              Your combined income of {fmt(result.combined.totalGrossSalary)} pushes total earnings over the{' '}
              {result.isScottish ? 'Scottish Higher Rate threshold (£43,662)' : 'Higher Rate threshold (£50,270)'}. The portion of your second job above this threshold is taxed at {result.isScottish ? '42%' : '40%'} (tax code {result.secondJob.suggestedTaxCode}).
            </div>
          </div>
        )}

        {result.hasPersonalAllowanceTaperWarning && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed">
              <strong className="font-bold block mb-0.5">£100,000+ Personal Allowance Taper Trap</strong>
              Combined income above £100,000 reduces your £12,570 tax-free allowance by £1 for every £2 earned above £100k, creating a 60% effective marginal tax rate (67.5% in Scotland). Your effective allowance is now {fmt(result.combined.totalPersonalAllowance)}.
            </div>
          </div>
        )}

        {result.hasPersonalAllowanceLossWarning && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed">
              <strong className="font-bold block mb-0.5">Personal Allowance Fully Lost</strong>
              Combined income of {fmt(result.combined.totalGrossSalary)} exceeds £125,140. Your £12,570 Personal Allowance is reduced to £0. All income across both jobs is fully subject to Income Tax.
            </div>
          </div>
        )}

        {/* Hero Card: Combined Take-Home Pay */}
        <div className="rounded-2xl bg-gradient-to-br from-[#111111] to-[#1C1C1C] dark:from-[#0D0D0D] dark:to-[#171717] text-white p-6 sm:p-7 border border-[#333333] shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A3A3A3]">
              Combined Dual-Job Take-Home Pay
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#059669]/30 border border-[#059669]/50 text-[#10B981] text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Both Jobs Combined
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              <AnimatedNumber value={result.combined.totalTakeHomePay} prefix="£" />
            </span>
            <span className="text-sm font-semibold text-[#A3A3A3]">/ year</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 mt-4 border-t border-[#333333] text-xs">
            <div>
              <span className="text-[#A3A3A3] block text-[11px]">Monthly Take-Home</span>
              <span className="text-sm font-bold text-white">
                {fmt(result.combined.monthlyTakeHome)}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-[11px]">Weekly Take-Home</span>
              <span className="text-sm font-bold text-white">
                {fmt(result.combined.weeklyTakeHome)}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#A3A3A3] block text-[11px]">Effective Tax + NI</span>
              <span className="text-sm font-bold text-[#10B981]">
                {result.combined.overallEffectiveTaxRate.toFixed(1)}% overall
              </span>
            </div>
          </div>
        </div>

        {/* Job by Job Side-by-Side Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Job Card */}
          <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] block">
                  Primary Employment
                </span>
                <h3 className="text-base font-black text-[#111111] dark:text-[#F5F5F5]">
                  Main Job
                </h3>
              </div>
              <span className="px-2 py-1 rounded-md bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#303030] text-xs font-mono font-bold text-[#059669] dark:text-[#10B981]">
                Code: {result.mainJob.suggestedTaxCode}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Gross Salary</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.mainJob.salary)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Personal Allowance</span>
                <span className="font-bold text-[#059669] dark:text-[#10B981]">{fmt(result.mainJob.personalAllowance)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Income Tax</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(result.mainJob.incomeTax)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">National Insurance</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(result.mainJob.nationalInsurance)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#141414] -mx-5 -mb-5 p-4 rounded-b-2xl">
              <span className="text-[11px] font-bold text-[#737373] dark:text-[#A3A3A3] block">
                Main Job Net Take-Home
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-[#111111] dark:text-[#F5F5F5]">
                  {fmt(result.mainJob.takeHomePay)}
                </span>
                <span className="text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">
                  {fmt(result.mainJob.monthlyTakeHome)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Second Job Card */}
          <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] block">
                  Secondary Employment
                </span>
                <h3 className="text-base font-black text-[#111111] dark:text-[#F5F5F5]">
                  Second Job
                </h3>
              </div>
              <span className="px-2 py-1 rounded-md bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#303030] text-xs font-mono font-bold text-[#059669] dark:text-[#10B981]">
                Code: {result.secondJob.suggestedTaxCode}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Gross Salary</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.secondJob.salary)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Personal Allowance</span>
                <span className="font-bold text-[#059669] dark:text-[#10B981]">{fmt(result.secondJob.personalAllowance)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <span className="text-[#737373] dark:text-[#A3A3A3]">Income Tax</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">-{fmt(result.secondJob.incomeTax)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F0F0] dark:border-[#222222]">
                <div className="flex items-center gap-1">
                  <span className="text-[#737373] dark:text-[#A3A3A3]">National Insurance</span>
                  <Tooltip text="Class 1 NI is calculated separately per employment. You receive a separate £12,570 Primary Threshold for this job." />
                </div>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {result.secondJob.nationalInsurance > 0 ? `-${fmt(result.secondJob.nationalInsurance)}` : '£0.00 (under threshold)'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#141414] -mx-5 -mb-5 p-4 rounded-b-2xl">
              <span className="text-[11px] font-bold text-[#737373] dark:text-[#A3A3A3] block">
                Second Job Net Take-Home
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-[#059669] dark:text-[#10B981]">
                  +{fmt(result.secondJob.takeHomePay)}
                </span>
                <span className="text-xs font-semibold text-[#737373] dark:text-[#A3A3A3]">
                  +{fmt(result.secondJob.monthlyTakeHome)}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Dual-Job Deductions Breakdown Table */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Side-by-Side PAYE Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] font-bold text-left">
                  <th className="pb-2">Deduction / Component</th>
                  <th className="pb-2 text-right">Main Job</th>
                  <th className="pb-2 text-right">Second Job</th>
                  <th className="pb-2 text-right text-[#111111] dark:text-[#F5F5F5]">Combined Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#222222]">
                <tr>
                  <td className="py-2 text-[#525252] dark:text-[#A3A3A3]">Gross Salary</td>
                  <td className="py-2 text-right font-semibold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.mainJob.salary)}</td>
                  <td className="py-2 text-right font-semibold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.secondJob.salary)}</td>
                  <td className="py-2 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.combined.totalGrossSalary)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#525252] dark:text-[#A3A3A3]">Personal Allowance</td>
                  <td className="py-2 text-right text-[#059669] dark:text-[#10B981]">{fmt(result.mainJob.personalAllowance)}</td>
                  <td className="py-2 text-right text-[#059669] dark:text-[#10B981]">{fmt(result.secondJob.personalAllowance)}</td>
                  <td className="py-2 text-right font-bold text-[#059669] dark:text-[#10B981]">{fmt(result.combined.totalPersonalAllowance)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#525252] dark:text-[#A3A3A3]">Taxable Income</td>
                  <td className="py-2 text-right text-[#111111] dark:text-[#F5F5F5]">{fmt(result.mainJob.taxableIncome)}</td>
                  <td className="py-2 text-right text-[#111111] dark:text-[#F5F5F5]">{fmt(result.secondJob.taxableIncome)}</td>
                  <td className="py-2 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.combined.totalTaxableIncome)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#525252] dark:text-[#A3A3A3]">Income Tax Paid</td>
                  <td className="py-2 text-right text-rose-600 dark:text-rose-400">-{fmt(result.mainJob.incomeTax)}</td>
                  <td className="py-2 text-right text-rose-600 dark:text-rose-400">-{fmt(result.secondJob.incomeTax)}</td>
                  <td className="py-2 text-right font-bold text-rose-600 dark:text-rose-400">-{fmt(result.combined.totalIncomeTax)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#525252] dark:text-[#A3A3A3]">National Insurance (Class 1)</td>
                  <td className="py-2 text-right text-rose-600 dark:text-rose-400">-{fmt(result.mainJob.nationalInsurance)}</td>
                  <td className="py-2 text-right text-rose-600 dark:text-rose-400">-{fmt(result.secondJob.nationalInsurance)}</td>
                  <td className="py-2 text-right font-bold text-rose-600 dark:text-rose-400">-{fmt(result.combined.totalNationalInsurance)}</td>
                </tr>
                <tr className="bg-[#059669]/5 dark:bg-[#10B981]/10 font-bold">
                  <td className="py-2.5 px-2 text-[#111111] dark:text-[#F5F5F5] rounded-l-lg">Net Take-Home Pay</td>
                  <td className="py-2.5 text-right text-[#111111] dark:text-[#F5F5F5]">{fmt(result.mainJob.takeHomePay)}</td>
                  <td className="py-2.5 text-right text-[#059669] dark:text-[#10B981]">+{fmt(result.secondJob.takeHomePay)}</td>
                  <td className="py-2.5 px-2 text-right text-[#059669] dark:text-[#10B981] rounded-r-lg font-black">{fmt(result.combined.totalTakeHomePay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* NI Per-Job Advantage Highlight */}
        <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs space-y-1.5">
          <div className="font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-1.5">
            <Percent className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Separate National Insurance Threshold Advantage
          </div>
          <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Because Class 1 Employee NI is calculated per employment in the UK, your second job benefits from its own £12,570 Primary Threshold (unless both employments are with the same or connected employers). Earnings under £12,570 in your second job incur 0% employee NI!
          </p>
        </div>
      </div>
    </div>
  );
};
