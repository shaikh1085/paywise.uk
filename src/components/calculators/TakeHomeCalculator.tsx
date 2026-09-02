import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTaxToast } from '../../context/ToastContext';
import { useCalculatorSessionStorage } from '../../hooks/useCalculatorSessionStorage';
import {
  TakeHomeInput,
  PayFrequency,
  TaxYear,
  TaxRegion,
  PensionType,
  StudentLoanPlan,
} from '../../types';
import { calculateTakeHomePay, parseTaxCode } from '../../utils/calculations';
import { TAX_CONFIG_METADATA } from '../../config/taxConfig';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import {
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';

const SmartSalaryInsights = React.lazy(() =>
  import('../SmartSalaryInsights').then((m) => ({ default: m.SmartSalaryInsights }))
);

interface TakeHomeCalculatorProps {
  initialSalary?: number;
  initialTaxYear?: TaxYear;
  initialRegion?: TaxRegion;
  showQuickPills?: boolean;
}

export const TakeHomeCalculator: React.FC<TakeHomeCalculatorProps> = ({
  initialSalary = 45000,
  initialTaxYear = '2025_26',
  initialRegion = 'england_ni',
  showQuickPills = true,
}) => {
  const [searchParams] = useSearchParams();

  // Read URL query params if present
  const paramSalary = searchParams.get('salary') ? parseFloat(searchParams.get('salary')!) : undefined;
  const paramFreq = searchParams.get('freq') as PayFrequency | null;
  const paramTaxCode = searchParams.get('code') || undefined;
  const paramPension = searchParams.get('pension') ? parseFloat(searchParams.get('pension')!) : undefined;
  const paramStudentLoan = searchParams.get('loan') as StudentLoanPlan | null;
  const paramRegion = searchParams.get('region') as TaxRegion | null;

  const defaultValues: TakeHomeInput = {
    grossSalary: initialSalary,
    payFrequency: 'annual',
    taxYear: (initialTaxYear || '2025_26') as TaxYear,
    region: (initialRegion || 'england_ni') as TaxRegion,
    taxCode: '1257L',
    pensionPercentage: 5,
    pensionFixedAmount: 0,
    pensionType: 'net_pay',
    employerPensionPercentage: 3,
    studentLoanPlan: 'none',
    bonus: 0,
    overtime: 0,
    otherTaxableIncome: 0,
    salarySacrificeMonthly: 0,
    isBlindAllowance: false,
    isMarriageAllowance: false,
  };

  const [input, setInput, resetStoredInput] = useCalculatorSessionStorage<TakeHomeInput>(
    'take_home_pay_v1',
    defaultValues
  );

  // Override with URL query params if explicitly supplied in URL
  useEffect(() => {
    if (paramSalary !== undefined || paramFreq || paramTaxCode || paramPension !== undefined || paramStudentLoan || paramRegion) {
      setInput((prev) => ({
        ...prev,
        grossSalary: paramSalary !== undefined ? paramSalary : prev.grossSalary,
        payFrequency: paramFreq || prev.payFrequency,
        taxCode: paramTaxCode || prev.taxCode,
        pensionPercentage: paramPension !== undefined ? paramPension : prev.pensionPercentage,
        studentLoanPlan: paramStudentLoan || prev.studentLoanPlan,
        region: paramRegion || prev.region,
      }));
    }
  }, [paramSalary, paramFreq, paramTaxCode, paramPension, paramStudentLoan, paramRegion, setInput]);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFrequencyView, setActiveFrequencyView] = useState<'annual' | 'monthly' | 'weekly' | 'daily'>('monthly');
  const { notifySalaryChange } = useTaxToast();

  // Compute Results dynamically
  const results = useMemo(() => {
    return calculateTakeHomePay(input);
  }, [input]);

  // Notify threshold changes contextually
  useEffect(() => {
    if (results.grossAnnual > 0) {
      notifySalaryChange(results.grossAnnual);
    }
  }, [results.grossAnnual, notifySalaryChange]);

  const handleUpdate = (updates: Partial<TakeHomeInput>) => {
    if (updates.taxCode !== undefined) {
      const parsed = parseTaxCode(updates.taxCode, 12570);
      if (parsed.isWales) {
        updates.region = 'wales';
      } else if (parsed.isScotland) {
        updates.region = 'scotland';
      }
    }
    setInput((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    resetStoredInput();
  };

  const quickSalaries = [25000, 35000, 50000, 60000, 75000, 100000, 125000];

  const currentDisplayAmount =
    activeFrequencyView === 'monthly'
      ? results.netMonthly
      : activeFrequencyView === 'annual'
      ? results.netAnnual
      : activeFrequencyView === 'weekly'
      ? results.netWeekly
      : results.netDaily;

  const retentionPercentage = results.grossAnnual > 0 ? (results.netAnnual / results.grossAnnual) * 100 : 0;

  const copySummaryText = `PayWise UK Take-Home Pay Estimate:
Gross Annual Income: £${results.grossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Take-Home (Monthly): £${results.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Take-Home (Annual): £${results.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Income Tax: £${results.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
National Insurance: £${results.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Pension Contribution: £${results.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Student Loan: £${(results.studentLoanAnnual + results.postgradLoanAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Effective Tax Rate: ${results.effectiveTaxRate.toFixed(1)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app)`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form Panel */}
        <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                Salary & Tax Details
              </h2>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-0.5">
                Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#222222] btn-press"
              title="Reset all fields to standard defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-5">
            
            {/* Gross Salary Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="gross-salary-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Gross Pay ({input.payFrequency === 'annual' ? 'Annual' : input.payFrequency === 'monthly' ? 'Monthly' : 'Weekly'})
                </label>
                <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                  £{(input.grossSalary || 0).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">
                  £
                </div>
                <input
                  type="number"
                  id="gross-salary-input"
                  min="0"
                  step="any"
                  value={input.grossSalary || ''}
                  onChange={(e) => handleUpdate({ grossSalary: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"
                  placeholder="e.g. 50000"
                  required
                />
              </div>

              {/* Quick Salary Pills */}
              {showQuickPills && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {quickSalaries.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleUpdate({ grossSalary: val, payFrequency: 'annual' })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        input.grossSalary === val && input.payFrequency === 'annual'
                          ? 'bg-[#059669] dark:bg-[#10B981] text-white shadow-xs'
                          : 'bg-[#F5F5F5] dark:bg-[#222222] text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A]'
                      }`}
                    >
                      £{(val / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pay Frequency Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Pay Frequency
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#F5F5F5] dark:bg-[#111111] p-1 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
                {(['annual', 'monthly', 'weekly'] as PayFrequency[]).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => handleUpdate({ payFrequency: freq })}
                    className={`py-1.5 px-3 text-xs font-bold rounded-lg capitalize transition-all duration-150 ${
                      input.payFrequency === freq
                        ? 'bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] shadow-xs'
                        : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Tax Region & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <label htmlFor="tax-region-select" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                    Tax Region
                  </label>
                  <Tooltip
                    content="Scotland has 6 devolved income tax bands (19% to 48%). Wales has Welsh Rates of Income Tax (WRIT). England and NI share 3 bands (20%, 40%, 45%)."
                    title="Tax Jurisdiction"
                  />
                </div>
                <select
                  id="tax-region-select"
                  value={input.region}
                  onChange={(e) => handleUpdate({ region: e.target.value as TaxRegion })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                >
                  <option value="england_ni">England / Northern Ireland</option>
                  <option value="wales">Wales</option>
                  <option value="scotland">Scotland (Scottish Rates)</option>
                </select>
              </div>

              <div>
                <label htmlFor="tax-year-select" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                  Tax Year
                </label>
                <select
                  id="tax-year-select"
                  value={input.taxYear}
                  onChange={(e) => handleUpdate({ taxYear: e.target.value as TaxYear })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                >
                  <option value="2025_26">2025 / 2026 (Current)</option>
                  <option value="2024_25">2024 / 2025</option>
                  <option value="2026_27">2026 / 2027 (Forecast)</option>
                </select>
              </div>
            </div>

            {/* Pension Contribution */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1">
                  <label htmlFor="pension-pct-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                    Pension Contribution (%)
                  </label>
                  <Tooltip
                    content="Workplace pensions qualify for tax relief. Standard legal minimum is 5% employee + 3% employer under Auto-Enrolment."
                    title="Pension Contributions"
                  />
                </div>
                <span className="text-xs font-extrabold text-[#111111] dark:text-[#F5F5F5] bg-white dark:bg-[#222222] px-2.5 py-1 rounded-lg border border-[#E5E5E5] dark:border-[#303030] tabular-nums shadow-xs">
                  {input.pensionPercentage}%
                </span>
              </div>
              <input
                type="range"
                id="pension-pct-input"
                min="0"
                max="30"
                step="0.5"
                value={input.pensionPercentage}
                onChange={(e) => handleUpdate({ pensionPercentage: parseFloat(e.target.value) || 0 })}
                className="w-full h-2 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#059669] dark:accent-[#10B981]"
              />
              <div className="flex justify-between text-2xs text-[#737373] dark:text-[#888888] mt-1">
                <span>0%</span>
                <span>5% (Auto-enrol)</span>
                <span>10%</span>
                <span>20%+</span>
              </div>
            </div>

            {/* Student Loan Plan */}
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label htmlFor="student-loan-select" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Student Loan Plan
                </label>
                <Tooltip
                  content="Plan 1 (£24,990), Plan 2 (£27,295), Plan 4 Scotland (£31,395), Plan 5 (£25,000) at 9% over threshold. Postgraduate loans at 6% over £21,000."
                  title="Student Loan Thresholds"
                />
              </div>
              <select
                id="student-loan-select"
                value={input.studentLoanPlan}
                onChange={(e) => handleUpdate({ studentLoanPlan: e.target.value as StudentLoanPlan })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              >
                <option value="none">No Student Loan</option>
                <option value="plan1">Plan 1 (Threshold £24,990)</option>
                <option value="plan2">Plan 2 (Threshold £27,295)</option>
                <option value="plan4">Plan 4 Scotland (Threshold £31,395)</option>
                <option value="plan5">Plan 5 (Threshold £25,000)</option>
                <option value="postgrad">Postgraduate Loan (Threshold £21,000)</option>
                <option value="plan1_and_postgrad">Plan 1 + Postgraduate Loan</option>
                <option value="plan2_and_postgrad">Plan 2 + Postgraduate Loan</option>
                <option value="plan4_and_postgrad">Plan 4 + Postgraduate Loan</option>
                <option value="plan5_and_postgrad">Plan 5 + Postgraduate Loan</option>
              </select>
              {(input.studentLoanPlan === 'plan5' || input.studentLoanPlan === 'plan5_and_postgrad') && (
                <p className="text-2xs text-amber-600 dark:text-amber-400 mt-1">
                  ⚠️ Plan 5 threshold (£25,000) is frozen and does not increase with inflation, unlike Plans 1–4.
                </p>
              )}
            </div>

            {/* Advanced Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full py-2 px-3 text-xs font-bold flex items-center justify-between rounded-xl bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] transition-colors border border-[#E5E5E5] dark:border-[#2A2A2A]"
                aria-expanded={showAdvanced}
              >
                <span>Tax code, pension scheme, bonus & sacrifice</span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Collapsible Advanced Options */}
            {showAdvanced && (
              <div className="space-y-3.5 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-xs sm:text-sm">
                
                {/* Tax Code */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <label htmlFor="tax-code-input" className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                        Tax Code
                      </label>
                      <Tooltip content="Standard 2025/2026 tax code is 1257L (£12,570 allowance). Scottish codes start with 'S', Welsh with 'C'." title="HMRC Tax Code" />
                    </div>
                    <span className="text-2xs text-[#737373] dark:text-[#888888]">Default: 1257L</span>
                  </div>
                  <input
                    type="text"
                    id="tax-code-input"
                    value={input.taxCode}
                    onChange={(e) => handleUpdate({ taxCode: e.target.value })}
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-sm text-[#111111] dark:text-[#F5F5F5] uppercase font-bold focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                    placeholder="e.g. 1257L, BR, D0, K500"
                  />
                </div>

                {/* Pension Scheme Type */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <label htmlFor="pension-type-select" className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                      Pension Scheme Type
                    </label>
                    <Tooltip content="Salary Sacrifice saves both Income Tax and 8% National Insurance. Net Pay arrangement saves Income Tax only." title="Pension Tax Mechanics" />
                  </div>
                  <select
                    id="pension-type-select"
                    value={input.pensionType}
                    onChange={(e) => handleUpdate({ pensionType: e.target.value as PensionType })}
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                  >
                    <option value="net_pay">Net Pay Arrangement (Before Tax)</option>
                    <option value="salary_sacrifice">Salary Sacrifice (Saves Tax & NI)</option>
                    <option value="relief_at_source">Relief at Source (Paid after basic tax)</option>
                    <option value="auto_enrolment">Auto-Enrolment (Banded £6,240–£50,270)</option>
                  </select>
                </div>

                {/* Monthly Salary Sacrifice Amount */}
                <div>
                  <label htmlFor="salary-sacrifice-input" className="font-bold text-[#111111] dark:text-[#F5F5F5] block mb-1">
                    Other Monthly Salary Sacrifice (£)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#525252] dark:text-[#A3A3A3] font-semibold">£</span>
                    <input
                      type="number"
                      id="salary-sacrifice-input"
                      min="0"
                      value={input.salarySacrificeMonthly || ''}
                      onChange={(e) => handleUpdate({ salarySacrificeMonthly: parseFloat(e.target.value) || 0 })}
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-7 pr-3 py-2 text-sm text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                      placeholder="e.g. 250 for EV / Cycle"
                    />
                  </div>
                  <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">e.g. Electric vehicle leases, cycle schemes, childcare</p>
                </div>

                {/* Annual Bonus & Overtime */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="bonus-input" className="font-bold text-[#111111] dark:text-[#F5F5F5] block mb-1">
                      Annual Bonus (£)
                    </label>
                    <input
                      type="number"
                      id="bonus-input"
                      min="0"
                      value={input.bonus || ''}
                      onChange={(e) => handleUpdate({ bonus: parseFloat(e.target.value) || 0 })}
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-sm text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="overtime-input" className="font-bold text-[#111111] dark:text-[#F5F5F5] block mb-1">
                      Annual Overtime (£)
                    </label>
                    <input
                      type="number"
                      id="overtime-input"
                      min="0"
                      value={input.overtime || ''}
                      onChange={(e) => handleUpdate({ overtime: parseFloat(e.target.value) || 0 })}
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-sm text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Blind Person Allowance Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="blind-allowance-checkbox"
                    checked={input.isBlindAllowance || false}
                    onChange={(e) => handleUpdate({ isBlindAllowance: e.target.checked })}
                    className="w-4 h-4 text-[#059669] dark:text-[#10B981] rounded border-[#E5E5E5] dark:border-[#303030] focus:ring-[#059669]"
                  />
                  <label htmlFor="blind-allowance-checkbox" className="text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
                    Claim Blind Person's Allowance (+£3,140)
                  </label>
                </div>

                {/* Marriage Allowance Checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="marriage-allowance-checkbox"
                    checked={input.isMarriageAllowance || false}
                    onChange={(e) => handleUpdate({ isMarriageAllowance: e.target.checked })}
                    className="w-4 h-4 text-[#059669] dark:text-[#10B981] rounded border-[#E5E5E5] dark:border-[#303030] focus:ring-[#059669] mt-0.5"
                  />
                  <div className="flex items-center gap-1">
                    <label htmlFor="marriage-allowance-checkbox" className="text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
                      Claim Marriage Allowance (+£1,260 — transfer from partner)
                    </label>
                    <Tooltip
                      content="If your partner earns below the Personal Allowance (£12,570), they can transfer £1,260 of their allowance to you, reducing your tax by up to £252/year."
                      title="Marriage Allowance"
                    />
                  </div>
                </div>

              </div>
            )}

          </form>
        </div>

        {/* RIGHT COLUMN: Result Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Hero Result Card */}
          <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">

            {/* Top Period Selector */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
                  Estimated Take-Home
                </span>
                <span className="text-xs text-[#525252] dark:text-[#A3A3A3] hidden sm:inline tabular-nums">
                  Gross: £{results.grossAnnual.toLocaleString('en-GB')}/yr
                </span>
              </div>

              {/* View Period Segmented Control */}
              <div className="inline-flex rounded-xl bg-[#F5F5F5] dark:bg-[#111111] p-1 border border-[#E5E5E5] dark:border-[#2A2A2A]">
                {(['annual', 'monthly', 'weekly', 'daily'] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setActiveFrequencyView(period)}
                    className={`px-3 py-1 text-xs font-bold capitalize rounded-lg transition-all duration-150 ${
                      activeFrequencyView === period
                        ? 'bg-white dark:bg-[#222222] text-[#059669] dark:text-[#10B981] shadow-xs'
                        : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Center: Big Animated Net Number + Circular Progress Meter */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
              <div className="sm:col-span-8 space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                  <AnimatedNumber
                    value={currentDisplayAmount}
                    prefix="£"
                    decimals={2}
                    className="text-[#111111] dark:text-[#F5F5F5]"
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>
                    deposited in your bank account per{' '}
                    <strong className="text-[#059669] dark:text-[#10B981]">
                      {activeFrequencyView === 'annual' ? 'year' : activeFrequencyView === 'monthly' ? 'month' : activeFrequencyView === 'weekly' ? 'week' : 'working day'}
                    </strong>
                  </span>
                </p>
              </div>

              <div className="sm:col-span-4 flex justify-start sm:justify-end">
                <CircularProgressMeter
                  percentage={retentionPercentage}
                  size={104}
                  strokeWidth={9}
                  label="Retention"
                />
              </div>
            </div>

            {/* 4 Restrained Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Total Deductions</span>
                <p className="text-sm sm:text-base font-black text-[#DC2626] dark:text-[#F87171] mt-0.5 tabular-nums">
                  -£{results.totalDeductionsMonthly.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Effective Tax</span>
                <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                  {results.effectiveTaxRate.toFixed(1)}%
                </p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Marginal Rate</span>
                <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                  {results.marginalTaxRate.toFixed(0)}%
                </p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Retention</span>
                <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                  {retentionPercentage.toFixed(1)}%
                </p>
              </div>
            </div>

          </div>

          {/* Detailed Deductions Breakdown Table */}
          <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#F5F5F5] mb-4 flex items-center justify-between">
              <span>Itemised Deductions Breakdown</span>
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs sm:text-xs font-bold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider">
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 px-3 text-right">Annual</th>
                    <th className="pb-3 px-3 text-right">Monthly</th>
                    <th className="pb-3 pl-3 text-right">Weekly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  <tr className="font-bold text-[#111111] dark:text-[#F5F5F5] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                    <td className="py-3 pr-4">Gross Contracted Pay</td>
                    <td className="py-3 px-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{results.grossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{(results.grossAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 pl-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{(results.grossAnnual / 52).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>

                  <tr className="text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#111111] dark:text-[#F5F5F5] font-medium">Income Tax (PAYE)</span>
                        {results.personalAllowanceApplied < 12570 && (
                          <span className="text-3xs px-1.5 py-0.5 rounded-md bg-[#F5F5F5] dark:bg-[#222222] text-[#B45309] dark:text-[#FBBF24] font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]">
                            Tapered
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.incomeTaxMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 pl-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.incomeTaxWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>

                  <tr className="text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                    <td className="py-3 pr-4 text-[#111111] dark:text-[#F5F5F5] font-medium">Class 1 National Insurance</td>
                    <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.employeeNiMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 pl-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                      -£{results.employeeNiWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>

                  {results.pensionAnnual > 0 && (
                    <tr className="text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                      <td className="py-3 pr-4 text-[#111111] dark:text-[#F5F5F5] font-medium">Workplace Pension ({input.pensionPercentage}%)</td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{results.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{results.pensionMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 pl-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{(results.pensionAnnual / 52).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}

                  {(results.studentLoanAnnual > 0 || results.postgradLoanAnnual > 0) && (
                    <tr className="text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                      <td className="py-3 pr-4 text-[#111111] dark:text-[#F5F5F5] font-medium">Student Loan Repayments</td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{(results.studentLoanAnnual + results.postgradLoanAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{(results.studentLoanMonthly + results.postgradLoanMonthly).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 pl-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{((results.studentLoanAnnual + results.postgradLoanAnnual) / 52).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}

                  {results.salarySacrificeAnnual > 0 && (
                    <tr className="text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#222222] transition-colors">
                      <td className="py-3 pr-4 text-[#111111] dark:text-[#F5F5F5] font-medium">Salary Sacrifice Deduction</td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{results.salarySacrificeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{(results.salarySacrificeAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 pl-3 text-right text-[#DC2626] dark:text-[#F87171] font-medium tabular-nums">
                        -£{(results.salarySacrificeAnnual / 52).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}

                  {/* Highlighted Net Pay Row */}
                  <tr className="bg-[#F5F5F5] dark:bg-[#111111] font-extrabold text-[#111111] dark:text-[#F5F5F5] border-t-2 border-[#059669] dark:border-[#10B981]">
                    <td className="py-3.5 pr-4 text-[#059669] dark:text-[#10B981]">Final Take-Home Pay</td>
                    <td className="py-3.5 px-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{results.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{results.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 pl-3 text-right text-[#059669] dark:text-[#10B981] tabular-nums">
                      £{results.netWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Marginal Rate Callout */}
            <div className="mt-5 p-4 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block mb-1">
                Marginal Tax Rate ({results.marginalTaxRate.toFixed(0)}%):
              </span>
              <p>{results.marginalTaxExplanation}</p>
            </div>

            {/* Employer Cost Callout */}
            <div className="mt-4 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#525252] dark:text-[#A3A3A3] gap-2">
              <span>
                Employer NI: £{results.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
                {results.employerPensionAnnual > 0 && ` + Employer Pension: £${results.employerPensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr`}
              </span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                Total Employer Cost: £{results.totalEmploymentCost.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
              </span>
            </div>

            {/* Actions: Copy, Print, Share */}
            <ExportActions onCopyText={copySummaryText} />

          </div>

        </div>

      </div>

      {/* Smart Salary Insights Section */}
      <div className="mt-8">
        <Suspense fallback={null}>
          <SmartSalaryInsights input={input} result={results} />
        </Suspense>
      </div>
    </div>
  );
};
