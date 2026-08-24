import React, { useState, useMemo } from 'react';
import { MortgageAffordabilityInput } from '../../types';
import { calculateMortgageAffordability } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Landmark, Layers } from 'lucide-react';

export const MortgageAffordabilityCalculator: React.FC = () => {
  const [isJoint, setIsJoint] = useState<boolean>(false);
  const [input, setInput] = useState<MortgageAffordabilityInput>({
    applicant1Income: 45000,
    applicant2Income: 0,
    depositAmount: 40000,
    monthlyDebtPayments: 200,
    monthlyChildcare: 0,
    monthlyOtherCommitments: 200,
    interestRate: 4.5,
    termYears: 25,
    incomeMultiple: 4.5,
  });

  const result = useMemo(() => calculateMortgageAffordability(input), [input]);

  const copyText = `PayWise UK Mortgage Affordability Calculation:
Combined Gross Income: £${result.totalGrossIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Deposit Available: £${result.depositAmount.toLocaleString('en-GB')}
Standard Max Borrowing (4.5x LTI): £${result.indicativeMaxBorrowing.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Max Property Budget: £${result.indicativeMaxPropertyPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Monthly Repayment: £${result.estimatedMonthlyPayment.toLocaleString('en-GB', { minimumFractionDigits: 2 })}/mo (at ${input.interestRate || 4.5}%, ${input.termYears || 25} yrs)
Calculated via PayWise UK (https://www.paywiseuk.co.uk/mortgage-affordability-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Affordability Inputs
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setIsJoint(false);
                setInput({ ...input, applicant2Income: 0 });
              }}
              className={`px-2.5 py-1 text-2xs font-bold rounded-lg ${
                !isJoint
                  ? 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111]'
                  : 'bg-[#F5F5F5] dark:bg-[#202020] text-[#525252] dark:text-[#A3A3A3]'
              }`}
            >
              Sole
            </button>
            <button
              type="button"
              onClick={() => {
                setIsJoint(true);
                if ((input.applicant2Income || 0) === 0) setInput({ ...input, applicant2Income: 30000 });
              }}
              className={`px-2.5 py-1 text-2xs font-bold rounded-lg ${
                isJoint
                  ? 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111]'
                  : 'bg-[#F5F5F5] dark:bg-[#202020] text-[#525252] dark:text-[#A3A3A3]'
              }`}
            >
              Joint
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Salary 1 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="afford-salary-1" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                {isJoint ? 'Applicant 1 Gross Annual Salary (£)' : 'Your Gross Annual Salary (£)'}
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.applicant1Income || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="afford-salary-1"
                min="0"
                step="1000"
                value={input.applicant1Income || ''}
                onChange={(e) => setInput({ ...input, applicant1Income: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Salary 2 if Joint */}
          {isJoint && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="afford-salary-2" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                  Applicant 2 Gross Annual Salary (£)
                </label>
                <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                  £{(input.applicant2Income || 0).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
                <input
                  type="number"
                  id="afford-salary-2"
                  min="0"
                  step="1000"
                  value={input.applicant2Income || ''}
                  onChange={(e) => setInput({ ...input, applicant2Income: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>
          )}

          {/* Deposit Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="afford-deposit" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Deposit Available (£)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.depositAmount || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="afford-deposit"
                min="0"
                step="2500"
                value={input.depositAmount || ''}
                onChange={(e) => setInput({ ...input, depositAmount: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Monthly Debts & Commitments */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="afford-debts" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Monthly Debts (£)
              </label>
              <input
                type="number"
                id="afford-debts"
                min="0"
                step="50"
                value={input.monthlyDebtPayments || 0}
                onChange={(e) => setInput({ ...input, monthlyDebtPayments: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            <div>
              <label htmlFor="afford-other" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Other Commitments (£)
              </label>
              <input
                type="number"
                id="afford-other"
                min="0"
                step="50"
                value={input.monthlyOtherCommitments || 0}
                onChange={(e) => setInput({ ...input, monthlyOtherCommitments: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Term Years & Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="afford-term" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Mortgage Term (Years)
              </label>
              <input
                type="number"
                id="afford-term"
                min="5"
                max="40"
                value={input.termYears || 25}
                onChange={(e) => setInput({ ...input, termYears: Math.max(5, parseInt(e.target.value, 10) || 25) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            <div>
              <label htmlFor="afford-rate" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                id="afford-rate"
                min="0.1"
                max="20"
                step="0.1"
                value={input.interestRate || 4.5}
                onChange={(e) => setInput({ ...input, interestRate: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Borrowing Capacity Card */}
        <div className="rounded-3xl bg-[#111111] text-white p-6 sm:p-8 border border-[#2A2A2A] shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Estimated Borrowing Capacity (4.5x)
            </span>
            <span className="text-xs text-slate-400 font-semibold">Standard Bank Lending</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-white flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.indicativeMaxBorrowing} prefix="£" decimals={0} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 pt-1">
                <span>
                  Maximum property price with deposit: <strong className="text-white">£{result.indicativeMaxPropertyPrice.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xs text-slate-400 uppercase font-bold block">Est. Monthly</span>
                <span className="text-lg font-black text-emerald-400">
                  £{result.estimatedMonthlyPayment.toFixed(0)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            {result.borrowingEstimates.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-[#171717] p-3.5 rounded-2xl border border-white/5">
                <span className="text-2xs uppercase text-slate-400 font-bold block truncate">{item.label}</span>
                <p className="text-base sm:text-lg font-black text-white mt-0.5 tabular-nums">
                  £{item.maxBorrowing.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Multipliers Table */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Lender Loan-to-Income (LTI) Multipliers
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                  <th className="py-2.5 font-bold">Lender Scenario</th>
                  <th className="py-2.5 font-bold">Multiplier</th>
                  <th className="py-2.5 font-bold text-right">Max Mortgage Loan</th>
                  <th className="py-2.5 font-bold text-right">Total Property Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                {result.borrowingEstimates.map((m, idx) => (
                  <tr key={idx} className="text-[#111111] dark:text-[#F5F5F5]">
                    <td className="py-2.5 font-medium">{m.label}</td>
                    <td className="py-2.5 text-[#525252] dark:text-[#A3A3A3]">{m.multiple}x</td>
                    <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                      £{m.maxBorrowing.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-2.5 text-right font-extrabold text-[#059669] dark:text-[#10B981]">
                      £{m.maxPropertyPrice.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
