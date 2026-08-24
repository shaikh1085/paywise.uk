import React, { useState, useMemo } from 'react';
import { MortgageOverpaymentInput } from '../../types';
import { calculateMortgageOverpayment } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Calculator, PiggyBank, Clock, TrendingDown, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const MortgageOverpaymentCalculator: React.FC = () => {
  const [input, setInput] = useState<MortgageOverpaymentInput>({
    currentBalance: 200000,
    interestRate: 4.5,
    remainingTermYears: 25,
    remainingTermMonths: 0,
    monthlyOverpayment: 150,
    lumpSumOverpayment: 0,
    lumpSumMonth: 1,
  });

  const result = useMemo(() => calculateMortgageOverpayment(input), [input]);

  const handleReset = () => {
    setInput({
      currentBalance: 200000,
      interestRate: 4.5,
      remainingTermYears: 25,
      remainingTermMonths: 0,
      monthlyOverpayment: 150,
      lumpSumOverpayment: 0,
      lumpSumMonth: 1,
    });
  };

  const copySummaryText = `PayWise UK Mortgage Overpayment Calculation:
Current Balance: £${result.currentBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Interest Rate: ${result.interestRate.toFixed(2)}%
Original Term: ${result.originalTermYears} years
Monthly Overpayment: £${result.monthlyOverpayment.toLocaleString('en-GB', { minimumFractionDigits: 2 })} / month
Total Interest Saved: £${result.totalInterestSaved.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Mortgage Term Shortened By: ${result.yearsSaved} years and ${result.monthsSaved} months
New Payoff Term: ${result.newTermYears} years and ${result.newTermMonths} months
Standard Total Interest: £${result.totalInterestStandard.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Overpayment Total Interest: £${result.totalInterestWithOverpayment.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Calculated via PayWise UK (https://www.paywiseuk.co.uk/mortgage-overpayment-calculator) - Estimate Only.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Mortgage & Overpayment
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            Amortisation Model
          </span>
        </div>

        <div className="space-y-4">
          {/* Current Mortgage Balance */}
          <div>
            <label htmlFor="overpay-balance" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Outstanding Mortgage Balance (£)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                £
              </span>
              <input
                id="overpay-balance"
                type="number"
                min="1000"
                step="5000"
                value={input.currentBalance || ''}
                onChange={(e) => setInput({ ...input, currentBalance: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="200000"
              />
            </div>
            {/* Balance quick buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[100000, 150000, 200000, 300000, 450000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInput({ ...input, currentBalance: preset })}
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    input.currentBalance === preset
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                  }`}
                >
                  £{(preset / 1000).toLocaleString()}k
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Remaining Term Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="overpay-rate" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                Interest Rate (% APR)
              </label>
              <div className="relative">
                <input
                  id="overpay-rate"
                  type="number"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={input.interestRate || ''}
                  onChange={(e) => setInput({ ...input, interestRate: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  placeholder="4.5"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                  %
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="overpay-term" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                Remaining Term (Years)
              </label>
              <select
                id="overpay-term"
                value={input.remainingTermYears}
                onChange={(e) => setInput({ ...input, remainingTermYears: parseInt(e.target.value, 10) || 25 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              >
                {[5, 10, 15, 20, 25, 30, 35, 40].map((yrs) => (
                  <option key={yrs} value={yrs}>
                    {yrs} Years
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Regular Monthly Overpayment */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <label htmlFor="overpay-monthly" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Regular Monthly Overpayment (£/month)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                £
              </span>
              <input
                id="overpay-monthly"
                type="number"
                min="0"
                step="25"
                value={input.monthlyOverpayment || ''}
                onChange={(e) => setInput({ ...input, monthlyOverpayment: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-bold text-[#059669] dark:text-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="150"
              />
            </div>
            {/* Quick overpayment buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[50, 100, 150, 250, 500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInput({ ...input, monthlyOverpayment: preset })}
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    input.monthlyOverpayment === preset
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                  }`}
                >
                  +£{preset}/mo
                </button>
              ))}
            </div>
          </div>

          {/* Optional Lump Sum Overpayment */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <label htmlFor="overpay-lump" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              One-Off Lump Sum Overpayment (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                £
              </span>
              <input
                id="overpay-lump"
                type="number"
                min="0"
                step="1000"
                value={input.lumpSumOverpayment || ''}
                onChange={(e) => setInput({ ...input, lumpSumOverpayment: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Export Actions */}
          <ExportActions
            onReset={handleReset}
            onPrint={() => window.print()}
            copyText={copySummaryText}
          />
        </div>
      </div>

      {/* RIGHT: Results & Amortisation Impact */}
      <div className="lg:col-span-7 space-y-6">
        {/* Total Interest Saved Highlight Card */}
        <div className="rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Estimated Total Interest Saved
              </span>
              <div className="text-3xl sm:text-5xl font-black text-[#059669] dark:text-[#10B981] tracking-tight">
                <AnimatedNumber value={result.totalInterestSaved} prefix="£" />
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Term Shortened By
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-[#F5F5F5]">
                {result.yearsSaved} yrs {result.monthsSaved} mos
              </div>
            </div>
          </div>

          {/* Key Comparisons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block">
                Standard (No Overpayment)
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Monthly Payment:</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    £{result.monthlyPaymentStandard.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Repayment Term:</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{result.originalTermYears} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Interest:</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    £{result.totalInterestStandard.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Cost:</span>
                  <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                    £{result.totalCostStandard.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                With Overpayment (+£{result.monthlyOverpayment}/mo)
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Monthly Paid:</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    £{result.totalPaymentMonthlyWithOverpayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">New Repayment Term:</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    {result.newTermYears} yrs {result.newTermMonths} mos
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Interest:</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    £{result.totalInterestWithOverpayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-emerald-500/20">
                  <span className="text-[#525252] dark:text-[#A3A3A3]">Total Cost:</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    £{result.totalCostWithOverpayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Snapshot Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Annual Balance Comparison (Years 1 to 10)
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAFAFA] dark:bg-[#151515] border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] font-bold">
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Standard Balance</th>
                    <th className="py-2.5 px-3 text-[#059669] dark:text-[#10B981]">Overpayment Balance</th>
                    <th className="py-2.5 px-3 text-right">Cumulative Interest Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  {result.schedule.slice(0, 10).map((row) => (
                    <tr key={row.year} className="hover:bg-[#FAFAFA] dark:hover:bg-[#151515] transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#111111] dark:text-[#F5F5F5]">
                        Year {row.year}
                      </td>
                      <td className="py-2.5 px-3 text-[#525252] dark:text-[#A3A3A3]">
                        £{row.standardBalance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#059669] dark:text-[#10B981]">
                        £{row.overpaymentBalance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                        £{row.interestSavedYear.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
