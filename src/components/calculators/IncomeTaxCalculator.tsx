import React, { useState, useMemo } from 'react';
import { IncomeTaxInput, TaxRegion, PensionType, TaxYear } from '../../types';
import { calculateIncomeTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Calculator, ShieldAlert, ArrowRight, TrendingDown, HelpCircle, Layers } from 'lucide-react';

export const IncomeTaxCalculator: React.FC = () => {
  const [input, setInput] = useState<IncomeTaxInput>({
    annualEmploymentIncome: 45000,
    bonus: 0,
    otherTaxableIncome: 0,
    region: 'england_wales_ni',
    taxCode: '1257L',
    pensionContribution: 2250,
    pensionType: 'salary_sacrifice',
    salarySacrificeAmount: 0,
    taxYear: '2025_26',
    isBlindAllowance: false,
    isMarriageAllowance: false,
  });

  const result = useMemo(() => calculateIncomeTax(input), [input]);

  const copyText = `PayWise UK Income Tax Calculation:
Tax Year: ${result.taxYearLabel} (${result.regionLabel})
Gross Annual Income: £${result.grossTotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Tax-Free Personal Allowance: £${result.personalAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Taxable Income: £${result.taxableIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Annual Income Tax: £${result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Monthly Income Tax: £${result.incomeTaxMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective Income Tax Rate: ${result.effectiveRate.toFixed(2)}%
Marginal Rate: ${result.marginalRate}%
Calculated via PayWise UK (https://www.paywiseuk.co.uk/income-tax-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Tax Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {result.taxYearLabel}
          </span>
        </div>

        <div className="space-y-4">
          {/* Tax Year Select */}
          <div>
            <label htmlFor="income-tax-year" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Tax Year
            </label>
            <select
              id="income-tax-year"
              value={input.taxYear}
              onChange={(e) => setInput({ ...input, taxYear: e.target.value as TaxYear })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="2025_26">2025 / 2026 (Current)</option>
              <option value="2024_25">2024 / 2025</option>
              <option value="2026_27">2026 / 2027 (Forecast)</option>
            </select>
          </div>

          {/* Annual Employment Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="income-tax-gross" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Annual Salary / Earnings (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.annualEmploymentIncome || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="income-tax-gross"
                min="0"
                step="500"
                value={input.annualEmploymentIncome || ''}
                onChange={(e) => setInput({ ...input, annualEmploymentIncome: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Bonus / Other Income Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="income-tax-bonus" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Annual Bonus (£)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#737373] font-bold text-xs">£</span>
                <input
                  type="number"
                  id="income-tax-bonus"
                  min="0"
                  value={input.bonus || ''}
                  placeholder="0"
                  onChange={(e) => setInput({ ...input, bonus: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-6 pr-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="income-tax-other" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Other Taxable Income (£)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#737373] font-bold text-xs">£</span>
                <input
                  type="number"
                  id="income-tax-other"
                  min="0"
                  value={input.otherTaxableIncome || ''}
                  placeholder="0"
                  onChange={(e) => setInput({ ...input, otherTaxableIncome: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-6 pr-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>
          </div>

          {/* Tax Region & Tax Code */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="income-tax-region" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Tax Region
              </label>
              <select
                id="income-tax-region"
                value={input.region}
                onChange={(e) => setInput({ ...input, region: e.target.value as TaxRegion })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              >
                <option value="england_wales_ni">England / NI</option>
                <option value="scotland">Scotland (Devolved)</option>
                <option value="wales">Wales</option>
              </select>
            </div>
            <div>
              <label htmlFor="income-tax-code" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                PAYE Tax Code
              </label>
              <input
                type="text"
                id="income-tax-code"
                value={input.taxCode}
                placeholder="1257L"
                onChange={(e) => setInput({ ...input, taxCode: e.target.value })}
                className="block w-full uppercase rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Pension Contribution */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="income-tax-pension" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Annual Pension Contribution (£)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.pensionContribution || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-sm">£</span>
              <input
                type="number"
                id="income-tax-pension"
                min="0"
                value={input.pensionContribution || ''}
                onChange={(e) => setInput({ ...input, pensionContribution: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] cursor-pointer text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
                <input
                  type="radio"
                  name="pensionType"
                  checked={input.pensionType === 'salary_sacrifice'}
                  onChange={() => setInput({ ...input, pensionType: 'salary_sacrifice' })}
                  className="text-[#059669] focus:ring-[#059669]"
                />
                <span>Salary Sacrifice</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] cursor-pointer text-xs font-medium text-[#111111] dark:text-[#F5F5F5]">
                <input
                  type="radio"
                  name="pensionType"
                  checked={input.pensionType === 'relief_at_source'}
                  onChange={() => setInput({ ...input, pensionType: 'relief_at_source' })}
                  className="text-[#059669] focus:ring-[#059669]"
                />
                <span>Relief at Source</span>
              </label>
            </div>
          </div>

          {/* Allowances Toggles */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              <input
                type="checkbox"
                checked={input.isMarriageAllowance}
                onChange={(e) => setInput({ ...input, isMarriageAllowance: e.target.checked })}
                className="rounded border-[#E5E5E5] text-[#059669] focus:ring-[#059669]"
              />
              <span>Marriage Allowance Recipient (+£1,260 Personal Allowance)</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              <input
                type="checkbox"
                checked={input.isBlindAllowance}
                onChange={(e) => setInput({ ...input, isBlindAllowance: e.target.checked })}
                className="rounded border-[#E5E5E5] text-[#059669] focus:ring-[#059669]"
              />
              <span>Blind Person's Allowance (+£3,070 / £3,130 allowance)</span>
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Primary Hero Result Card */}
        <div className="rounded-3xl bg-[#111111] text-white p-6 sm:p-8 border border-[#2A2A2A] shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Estimated UK Income Tax Due
            </span>
            <span className="text-xs text-slate-400 font-semibold">{result.regionLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-white flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.incomeTaxAnnual} prefix="£" decimals={2} />
                <span className="text-base font-semibold text-slate-400">/year</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 pt-1">
                <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Equivalent to <strong className="text-white">£{result.incomeTaxMonthly.toFixed(2)}/month</strong> or £{result.incomeTaxWeekly.toFixed(2)}/week
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveRate}
                size={100}
                strokeWidth={8}
                label="Effective Tax"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-[#171717] p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Personal Allowance</span>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 tabular-nums">
                £{result.personalAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-[#171717] p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Taxable Income</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                £{result.taxableIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-[#171717] p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Marginal Tax Rate</span>
              <p className="text-base sm:text-lg font-black text-cyan-400 mt-0.5 tabular-nums">
                {result.marginalRate}%
              </p>
            </div>
          </div>
        </div>

        {/* 60% Taper Trap Warning if applicable */}
        {result.personalAllowanceTaperLoss > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Personal Allowance Taper Warning (£100k–£125,140)</strong>
              <span>
                Because your adjusted income exceeds £100,000, you have lost £{result.personalAllowanceTaperLoss.toLocaleString('en-GB')} of your tax-free allowance, creating an effective 60% marginal tax rate. Salary sacrifice into a pension can help restore your allowance.
              </span>
            </div>
          </div>
        )}

        {/* Band Breakdown Table */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Tax Band Breakdown
            </h3>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">
              {result.taxBands.length} Band{result.taxBands.length !== 1 ? 's' : ''} Applied
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                  <th className="py-2.5 font-bold">Tax Band</th>
                  <th className="py-2.5 font-bold">Rate</th>
                  <th className="py-2.5 font-bold text-right">Taxable Amount</th>
                  <th className="py-2.5 font-bold text-right">Tax Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                {result.personalAllowance > 0 && (
                  <tr className="text-[#525252] dark:text-[#A3A3A3]">
                    <td className="py-2.5 font-medium">Personal Allowance (Tax-Free)</td>
                    <td className="py-2.5">0.0%</td>
                    <td className="py-2.5 text-right font-medium">£{result.personalAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981]">£0.00</td>
                  </tr>
                )}
                {result.taxBands.map((band, idx) => (
                  <tr key={idx} className="text-[#111111] dark:text-[#F5F5F5]">
                    <td className="py-2.5 font-medium">{band.name}</td>
                    <td className="py-2.5 text-[#525252] dark:text-[#A3A3A3]">{(band.rate * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right font-medium">£{band.taxableAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                      £{band.taxPaid.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#E5E5E5] dark:border-[#2A2A2A] font-bold text-[#111111] dark:text-[#F5F5F5]">
                  <td colSpan={3} className="py-3 text-right">Total Estimated Income Tax:</td>
                  <td className="py-3 text-right text-base text-[#059669] dark:text-[#10B981]">
                    £{result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
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
