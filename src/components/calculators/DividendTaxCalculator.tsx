import React, { useState, useMemo } from 'react';
import { DividendTaxInput, TaxRegion, TaxYear } from '../../types';
import { calculateDividendTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { PieChart, Layers, TrendingUp } from 'lucide-react';

export const DividendTaxCalculator: React.FC = () => {
  const [input, setInput] = useState<DividendTaxInput>({
    dividendIncome: 25000,
    otherTaxableIncome: 12570,
    region: 'england_wales_ni',
    taxYear: '2025_26',
  });

  const result = useMemo(() => calculateDividendTax(input), [input]);

  const copyText = `PayWise UK Dividend Tax Calculation:
Tax Year: ${result.taxYearLabel}
Dividend Income: £${result.dividendIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Non-Dividend Income (Salary/Pension): £${result.otherIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Tax-Free Dividend Allowance Used: £${result.dividendAllowanceUsed.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Taxable Dividends: £${result.taxableDividends.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Dividend Tax: £${result.totalDividendTax.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Net Dividend Retained: £${(result.dividendIncome - result.totalDividendTax).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective Dividend Tax Rate: ${result.effectiveDividendTaxRate.toFixed(2)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/dividend-tax-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Dividend Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {result.taxYearLabel}
          </span>
        </div>

        <div className="space-y-4">
          {/* Tax Year */}
          <div>
            <label htmlFor="div-tax-year" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Tax Year
            </label>
            <select
              id="div-tax-year"
              value={input.taxYear}
              onChange={(e) => setInput({ ...input, taxYear: e.target.value as TaxYear })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="2025_26">2025 / 2026 (£500 Dividend Allowance)</option>
              <option value="2024_25">2024 / 2025 (£500 Dividend Allowance)</option>
              <option value="2026_27">2026 / 2027 (Forecast)</option>
            </select>
          </div>

          {/* Annual Dividend Income */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="div-amount" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Annual Dividend Income (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.dividendIncome || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="div-amount"
                min="0"
                step="500"
                value={input.dividendIncome || ''}
                onChange={(e) => setInput({ ...input, dividendIncome: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Non-Dividend Income (Salary, Pension, Rent) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="div-non-div-income" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Salary / Other Non-Dividend Income (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.otherTaxableIncome || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="div-non-div-income"
                min="0"
                step="500"
                value={input.otherTaxableIncome || ''}
                onChange={(e) => setInput({ ...input, otherTaxableIncome: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Dividend Tax Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Total Dividend Tax Due
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{result.taxYearLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.totalDividendTax} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Net dividend retained: <strong className="text-[#059669] dark:text-[#10B981]">£{(result.dividendIncome - result.totalDividendTax).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveDividendTaxRate}
                size={100}
                strokeWidth={8}
                label="Effective Tax"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Tax-Free Allowance</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.dividendAllowanceUsed.toLocaleString('en-GB', { minimumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Taxable Dividends</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.taxableDividends.toLocaleString('en-GB', { minimumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Overall Take-Home</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.overallTakeHome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Dividend Tax Band Stacking
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Basic Rate (8.75%)</span>
              <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.dividendTaxBasic.toLocaleString('en-GB', { minimumFractionDigits: 2 })} (on £{result.basicBandDividends.toLocaleString('en-GB')})
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Higher Rate (33.75%)</span>
              <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.dividendTaxHigher.toLocaleString('en-GB', { minimumFractionDigits: 2 })} (on £{result.higherBandDividends.toLocaleString('en-GB')})
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Additional Rate (39.35%)</span>
              <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.dividendTaxAdditional.toLocaleString('en-GB', { minimumFractionDigits: 2 })} (on £{result.additionalBandDividends.toLocaleString('en-GB')})
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
