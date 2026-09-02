import React, { useState, useMemo } from 'react';
import { EmployerNiInput, TaxYear } from '../../types';
import { calculateEmployerNationalInsurance } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Building2, TrendingUp, Layers, HelpCircle, ShieldCheck } from 'lucide-react';

export const EmployerNiCalculator: React.FC = () => {
  const [input, setInput] = useState<EmployerNiInput>({
    grossSalary: 35000,
    bonus: 0,
    employerPensionPercentage: 3.0,
    applyEmploymentAllowance: false,
    existingEmploymentAllowanceUsed: 0,
    taxYear: '2025_26',
  });

  const result = useMemo(() => calculateEmployerNationalInsurance(input), [input]);

  const copyText = `PayWise UK Employer National Insurance & Employment Cost Calculation:
Tax Year: ${result.taxYearLabel} (Employer Rate: ${result.employerNiRate}%, Secondary Threshold: £${result.secondaryThreshold.toLocaleString('en-GB')})
Employee Gross Pay: £${result.grossPay.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Employer Class 1 NI (Gross): £${result.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Employment Allowance Offset: £${result.employmentAllowanceApplied.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Net Employer NI Payable: £${result.netEmployerNi.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Employer Workplace Pension: £${result.employerPensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Total Cost of Employment: £${result.totalCostOfEmploymentAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}/yr (£${result.totalCostOfEmploymentMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2 })}/mo)
Overhead on Gross Pay: ${result.overheadPercentage.toFixed(2)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/employer-national-insurance-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Payroll Inputs
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {result.taxYearLabel}
          </span>
        </div>

        <div className="space-y-4">
          {/* Tax Year */}
          <div>
            <label htmlFor="emp-ni-tax-year" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Tax Year
            </label>
            <select
              id="emp-ni-tax-year"
              value={input.taxYear}
              onChange={(e) => setInput({ ...input, taxYear: e.target.value as TaxYear })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="2025_26">2025 / 2026 (15% above £5k Secondary Threshold)</option>
              <option value="2024_25">2024 / 2025 (13.8% above £9.1k Secondary Threshold)</option>
              <option value="2026_27">2026 / 2027 (Forecast)</option>
            </select>
          </div>

          {/* Gross Annual Salary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="emp-ni-salary" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Employee Gross Salary (£/year)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.grossSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="emp-ni-salary"
                min="0"
                step="500"
                value={input.grossSalary || ''}
                onChange={(e) => setInput({ ...input, grossSalary: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Bonus */}
          <div>
            <label htmlFor="emp-ni-bonus" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
              Annual Bonus / Commission (£)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-sm">£</span>
              <input
                type="number"
                id="emp-ni-bonus"
                min="0"
                value={input.bonus || ''}
                placeholder="0"
                onChange={(e) => setInput({ ...input, bonus: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Employer Pension Contribution % */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="emp-ni-pension-pct" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Employer Pension Contribution (%)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                {input.employerPensionPercentage}% (Statutory min: 3%)
              </span>
            </div>
            <input
              type="number"
              id="emp-ni-pension-pct"
              min="0"
              max="100"
              step="0.5"
              value={input.employerPensionPercentage ?? 3}
              onChange={(e) => setInput({ ...input, employerPensionPercentage: Math.max(0, parseFloat(e.target.value) || 0) })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          {/* Employment Allowance Toggle */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
              <input
                type="checkbox"
                checked={input.applyEmploymentAllowance}
                onChange={(e) => setInput({ ...input, applyEmploymentAllowance: e.target.checked })}
                className="mt-0.5 rounded border-[#E5E5E5] text-[#059669] focus:ring-[#059669]"
              />
              <span>
                Apply <strong>Employment Allowance</strong> (up to £10,500/year discount on total employer NI liability)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Total Cost of Employment Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Total Cost of Employment
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{result.taxYearLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.totalCostOfEmploymentAnnual} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
                <span className="text-base font-semibold text-[#525252] dark:text-[#A3A3A3] ml-2">/ year</span>
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Total monthly employer cost: <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.totalCostOfEmploymentMonthly.toFixed(2)}/month</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.overheadPercentage}
                size={100}
                strokeWidth={8}
                label="On-Cost %"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Employer NI (Annual)</span>
              <p className="text-base sm:text-lg font-black text-[#DC2626] dark:text-[#F87171] mt-0.5 tabular-nums">
                £{result.netEmployerNi.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Employer Pension</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.employerPensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Secondary Threshold</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.secondaryThreshold.toLocaleString('en-GB')}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Employment Cost Itemisation
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Gross Pay to Employee</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.grossPay.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Secondary Threshold (0% Employer NI)</span>
              <span className="font-medium text-[#111111] dark:text-[#F5F5F5]">
                -£{result.secondaryThreshold.toLocaleString('en-GB')}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Earnings Subject to {result.employerNiRate}% Employer NI</span>
              <span className="font-medium text-[#111111] dark:text-[#F5F5F5]">
                £{result.grossSubjectToNi.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Employer Class 1 NI ({result.employerNiRate}%)</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                +£{result.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {result.employmentAllowanceApplied > 0 && (
              <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981]">
                <span>Employment Allowance Offset Applied</span>
                <span className="font-bold">
                  -£{result.employmentAllowanceApplied.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Employer Workplace Pension Contribution</span>
              <span className="font-medium text-[#111111] dark:text-[#F5F5F5]">
                +£{result.employerPensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-[#F5F5F5] dark:bg-[#202020] px-4 rounded-2xl font-bold text-[#111111] dark:text-[#F5F5F5]">
              <span>Total Cost of Employment</span>
              <span className="text-[#059669] dark:text-[#10B981] text-base font-extrabold">
                £{result.totalCostOfEmploymentAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
