import React, { useState, useMemo } from 'react';
import { SavingsInput } from '../../types';
import { calculateSavingsGrowth } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { PiggyBank, TrendingUp, Layers } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const [input, setInput] = useState<SavingsInput>({
    startingBalance: 10000,
    monthlyDeposit: 250,
    annualInterestRate: 4.8,
    periodYears: 5,
    compoundingFrequency: 'monthly',
    annualInflationRate: 2.0,
  });

  const result = useMemo(() => calculateSavingsGrowth(input), [input]);

  const copyText = `PayWise UK Savings Growth Calculation:
Initial Balance: £${(input.startingBalance || 0).toLocaleString('en-GB')}
Monthly Deposit: £${(input.monthlyDeposit || 0).toLocaleString('en-GB')}/month
Interest Rate (AER): ${input.annualInterestRate}% over ${input.periodYears} Years
Total Principal Deposited: £${result.totalDeposits.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Total Gross Interest: £${result.totalInterestEarned.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Final Balance: £${result.finalBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective APY: ${result.effectiveApy.toFixed(2)}%
Personal Savings Allowance Guidance: Basic Rate (£1,000 allowance), Higher Rate (£500 allowance), Additional Rate (£0 allowance)
Calculated via PayWise UK (https://paywiseuk.vercel.app/savings-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Savings Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {input.annualInterestRate}% AER
          </span>
        </div>

        <div className="space-y-4">
          {/* Initial Lump Sum */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="sav-initial" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Starting Balance (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.startingBalance || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="sav-initial"
                min="0"
                step="500"
                value={input.startingBalance || ''}
                onChange={(e) => setInput({ ...input, startingBalance: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Monthly Regular Savings */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="sav-monthly" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Monthly Deposit (£/month)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.monthlyDeposit || 0).toLocaleString('en-GB')}/mo
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="sav-monthly"
                min="0"
                step="25"
                value={input.monthlyDeposit || ''}
                onChange={(e) => setInput({ ...input, monthlyDeposit: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Interest Rate & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sav-rate" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Interest Rate (AER %)
              </label>
              <input
                type="number"
                id="sav-rate"
                min="0"
                max="20"
                step="0.1"
                value={input.annualInterestRate || ''}
                onChange={(e) => setInput({ ...input, annualInterestRate: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <div>
              <label htmlFor="sav-duration" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Duration (Years)
              </label>
              <select
                id="sav-duration"
                value={input.periodYears}
                onChange={(e) => setInput({ ...input, periodYears: parseInt(e.target.value, 10) || 5 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              >
                {[1, 2, 3, 5, 7, 10, 15, 20].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr} Year{yr > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Compounding frequency */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInput({ ...input, compoundingFrequency: 'monthly' })}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  input.compoundingFrequency === 'monthly'
                    ? 'border-[#059669] dark:border-[#10B981] bg-[#059669]/10 text-[#059669] dark:text-[#10B981]'
                    : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setInput({ ...input, compoundingFrequency: 'annually' })}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  input.compoundingFrequency === 'annually'
                    ? 'border-[#059669] dark:border-[#10B981] bg-[#059669]/10 text-[#059669] dark:text-[#10B981]'
                    : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3]'
                }`}
              >
                Annually
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Final Balance Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Final Projected Balance
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{input.periodYears} Years ({result.effectiveApy.toFixed(2)}% APY)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.finalBalance} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Total Interest Earned: <strong className="text-[#059669] dark:text-[#10B981]">£{result.totalInterestEarned.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.finalBalance > 0 ? (result.totalInterestEarned / result.finalBalance) * 100 : 0}
                size={100}
                strokeWidth={8}
                label="Interest %"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Principal Saved</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.totalDeposits.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Interest</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.totalInterestEarned.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Inflation Adjusted</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{(result.inflationAdjustedBalance || result.finalBalance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Projections Table */}
        {result.projectionTable && result.projectionTable.length > 0 && (
          <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Annual Savings Growth Schedule
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                    <th className="py-2.5 font-bold">Year</th>
                    <th className="py-2.5 font-bold text-right">Deposits To Date</th>
                    <th className="py-2.5 font-bold text-right">Yearly Interest</th>
                    <th className="py-2.5 font-bold text-right">Year-End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                  {result.projectionTable.slice(0, 10).map((row) => (
                    <tr key={row.year} className="text-[#111111] dark:text-[#F5F5F5]">
                      <td className="py-2.5 font-bold">Year {row.year}</td>
                      <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3]">
                        £{row.totalDepositsToDate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 text-right font-medium text-[#059669] dark:text-[#10B981]">
                        £{row.interestEarnedYear.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                        £{row.endingBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ExportActions onCopyText={copyText} />
          </div>
        )}
      </div>
    </div>
  );
};
