import React, { useState, useMemo } from 'react';
import { NationalInsuranceInput, PayFrequency, TaxYear } from '../../types';
import { calculateNationalInsuranceContributions } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { ShieldCheck, Layers, TrendingDown, HelpCircle, ArrowRight } from 'lucide-react';

export const NationalInsuranceCalculator: React.FC = () => {
  const [input, setInput] = useState<NationalInsuranceInput>({
    grossPay: 36000,
    payFrequency: 'annual',
    taxYear: '2025_26',
    salarySacrifice: 0,
    niCategory: 'A',
  });

  const result = useMemo(() => calculateNationalInsuranceContributions(input), [input]);

  const copyText = `PayWise UK National Insurance Calculation:
Tax Year: ${result.taxYearLabel}
Category: ${result.categoryLabel}
Gross Annual Pay: £${result.grossPayAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Annual Employee NI: £${result.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Monthly Employee NI: £${result.employeeNiMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Weekly Employee NI: £${result.employeeNiWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective Employee NI Rate: ${result.effectiveNiRate.toFixed(2)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/national-insurance-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            NI Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {result.taxYearLabel}
          </span>
        </div>

        <div className="space-y-4">
          {/* Tax Year Select */}
          <div>
            <label htmlFor="ni-tax-year" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Tax Year
            </label>
            <select
              id="ni-tax-year"
              value={input.taxYear}
              onChange={(e) => setInput({ ...input, taxYear: e.target.value as TaxYear })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="2025_26">2025 / 2026 (Current - 8% Main Rate)</option>
              <option value="2024_25">2024 / 2025 (8% Main Rate)</option>
              <option value="2026_27">2026 / 2027 (Forecast)</option>
            </select>
          </div>

          {/* Pay Frequency Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Pay Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['annual', 'monthly', 'weekly'] as PayFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setInput({ ...input, payFrequency: freq })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-colors ${
                    input.payFrequency === freq
                      ? 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111]'
                      : 'border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#525252] dark:text-[#A3A3A3]'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Gross Pay Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="ni-gross-pay" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Gross Pay ({input.payFrequency})
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.grossPay || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="ni-gross-pay"
                min="0"
                step={input.payFrequency === 'annual' ? '500' : '50'}
                value={input.grossPay || ''}
                onChange={(e) => setInput({ ...input, grossPay: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* NI Category Letter */}
          <div>
            <label htmlFor="ni-category-select" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              National Insurance Category
            </label>
            <select
              id="ni-category-select"
              value={input.niCategory || 'A'}
              onChange={(e) => setInput({ ...input, niCategory: e.target.value as any })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="A">Category A - Standard Employees (8% / 2%)</option>
              <option value="B">Category B - Married Women / Widows (1.85% / 2%)</option>
              <option value="C">Category C - Over UK State Pension Age (0% Employee NI)</option>
              <option value="H">Category H - Apprentice Under 25</option>
              <option value="M">Category M - Employee Under 21</option>
              <option value="J">Category J - Deferment (Multiple Employments)</option>
            </select>
          </div>

          {/* Salary Sacrifice deduction */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="ni-salary-sacrifice" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Annual Salary Sacrifice (£)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.salarySacrifice || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-sm">£</span>
              <input
                type="number"
                id="ni-salary-sacrifice"
                min="0"
                value={input.salarySacrifice || ''}
                placeholder="0"
                onChange={(e) => setInput({ ...input, salarySacrifice: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <p className="text-2xs text-[#737373] mt-1">
              Salary sacrifice reduces gross earnings subject to employee Class 1 NI.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Result Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Employee Class 1 NI Due
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{result.categoryLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.employeeNiAnnual} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
                <span className="text-base font-semibold text-[#525252] dark:text-[#A3A3A3] ml-2">/ year</span>
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingDown className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Deducted as <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.employeeNiMonthly.toFixed(2)}/month</strong> or £{result.employeeNiWeekly.toFixed(2)}/week
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveNiRate}
                size={100}
                strokeWidth={8}
                label="Effective NI"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Monthly Deduction</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.employeeNiMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Weekly Deduction</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.employeeNiWeekly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Effective NI Rate</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                {result.effectiveNiRate.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Bands Table */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              National Insurance Threshold Breakdown
            </h3>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              Class 1 Employee Schedule
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                  <th className="py-2.5 font-bold">Earnings Band</th>
                  <th className="py-2.5 font-bold">Rate</th>
                  <th className="py-2.5 font-bold text-right">Annual Earnings</th>
                  <th className="py-2.5 font-bold text-right">NI Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                {result.niBands.map((band, idx) => (
                  <tr key={idx} className="text-[#111111] dark:text-[#F5F5F5]">
                    <td className="py-2.5 font-medium">{band.name}</td>
                    <td className="py-2.5 text-[#525252] dark:text-[#A3A3A3]">{(band.rate * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right font-medium">£{band.earningsInBand.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                      £{band.niPaid.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#E5E5E5] dark:border-[#2A2A2A] font-bold text-[#111111] dark:text-[#F5F5F5]">
                  <td colSpan={3} className="py-3 text-right">Total Employee National Insurance:</td>
                  <td className="py-3 text-right text-base text-[#059669] dark:text-[#10B981]">
                    £{result.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
