import { formatGBP } from '../../utils/format';
import React, { useState, useMemo } from 'react';
import { MortgageInput } from '../../types';
import { calculateMortgageRepayment } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Home, Layers, CheckCircle2 } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [input, setInput] = useState<MortgageInput>({
    propertyPrice: 325000,
    depositAmount: 50000,
    interestRate: 4.5,
    termYears: 25,
    repaymentType: 'repayment',
    monthlyOverpayment: 0,
  });

  const result = useMemo(() => calculateMortgageRepayment(input), [input]);

  const depositPercent = input.propertyPrice > 0 ? (input.depositAmount / input.propertyPrice) * 100 : 0;

  const copyText = `PayWise UK Mortgage Repayment Calculation:
Property Price: ${formatGBP((input.propertyPrice || 0))}
Deposit: ${formatGBP((input.depositAmount || 0))} (${depositPercent.toFixed(1)}% deposit, ${result.loanToValue.toFixed(1)}% LTV)
Loan Amount: ${formatGBP(result.loanAmount)}
Interest Rate: ${input.interestRate}% over ${input.termYears} years (${input.repaymentType === 'repayment' ? 'Capital & Interest' : 'Interest-Only'})
Monthly Repayment: ${formatGBP(result.monthlyPayment)}/month
Total Interest Paid: ${formatGBP(result.totalInterest)}
Total Amount Repaid: ${formatGBP(result.totalRepaid)}
${result.overpaymentImpact ? `Overpayment Savings: ${formatGBP(result.overpaymentImpact.totalInterestSaved)} saved in interest and term shortened by ${result.overpaymentImpact.yearsSaved} years ${result.overpaymentImpact.monthsSaved} months` : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/mortgage-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Home className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Mortgage Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            {result.loanToValue.toFixed(1)}% LTV
          </span>
        </div>

        <div className="space-y-4">
          {/* Property Price */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="mort-prop-price" className="block text-xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4]">
                Property Purchase Price (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                {formatGBP((input.propertyPrice || 0))}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="mort-prop-price"
                min="10000"
                step="5000"
                value={input.propertyPrice || ''}
                onChange={(e) => setInput({ ...input, propertyPrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Deposit Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="mort-deposit" className="block text-xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4]">
                Deposit Amount (£)
              </label>
              <span className="text-xs font-bold text-[#262626] dark:text-[#D4D4D4]">
                {formatGBP((input.depositAmount || 0))} ({depositPercent.toFixed(1)}%)
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="mort-deposit"
                min="0"
                step="2500"
                value={input.depositAmount || ''}
                onChange={(e) => setInput({ ...input, depositAmount: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Interest Rate & Term Years Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="mort-rate" className="block text-2xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4] mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                id="mort-rate"
                min="0.1"
                max="20"
                step="0.05"
                value={input.interestRate || 4.5}
                onChange={(e) => setInput({ ...input, interestRate: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            <div>
              <label htmlFor="mort-term" className="block text-2xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4] mb-1">
                Term (Years)
              </label>
              <input
                type="number"
                id="mort-term"
                min="1"
                max="40"
                value={input.termYears || 25}
                onChange={(e) => setInput({ ...input, termYears: Math.max(1, parseInt(e.target.value, 10) || 25) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Repayment Type */}
          <div>
            <label className="block text-2xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4] mb-1.5">
              Repayment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInput({ ...input, repaymentType: 'repayment' })}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  input.repaymentType === 'repayment'
                    ? 'border-[#059669] dark:border-[#10B981] bg-[#059669]/10 text-[#059669] dark:text-[#10B981]'
                    : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-[#262626] dark:text-[#D4D4D4]'
                }`}
              >
                Capital & Interest
              </button>
              <button
                type="button"
                onClick={() => setInput({ ...input, repaymentType: 'interest_only' })}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  input.repaymentType === 'interest_only'
                    ? 'border-[#059669] dark:border-[#10B981] bg-[#059669]/10 text-[#059669] dark:text-[#10B981]'
                    : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-[#262626] dark:text-[#D4D4D4]'
                }`}
              >
                Interest-Only
              </button>
            </div>
          </div>

          {/* Monthly Overpayment */}
          <div>
            <label htmlFor="mort-overpay" className="block text-2xs font-bold uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4] mb-1">
              Monthly Overpayment (£/month) (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#737373] text-sm">£</span>
              <input
                type="number"
                id="mort-overpay"
                min="0"
                step="50"
                value={input.monthlyOverpayment || 0}
                onChange={(e) => setInput({ ...input, monthlyOverpayment: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-7 pr-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Monthly Repayment Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Monthly Mortgage Payment
            </span>
            <span className="text-xs text-[#262626] dark:text-[#D4D4D4] font-semibold">{input.repaymentType === 'repayment' ? 'Repayment' : 'Interest-Only'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.monthlyPayment} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
                <span className="text-sm font-bold text-[#262626] dark:text-[#D4D4D4] ml-2">/ month</span>
              </div>
              <p className="text-xs sm:text-sm text-[#262626] dark:text-[#D4D4D4] flex items-center gap-1.5 pt-1">
                <span>
                  Annual payment: <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.annualPayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <div className="text-center p-3 rounded-xl bg-white dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs text-[#262626] dark:text-[#D4D4D4] uppercase font-bold block">Loan Amount</span>
                <span className="text-lg font-black text-[#059669] dark:text-[#10B981]">
                  £{result.loanAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#262626] dark:text-[#D4D4D4] font-bold block truncate">Loan to Value</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                {result.loanToValue.toFixed(1)}%
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#262626] dark:text-[#D4D4D4] font-bold block truncate">Total Interest</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                {formatGBP(result.totalInterest)}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#262626] dark:text-[#D4D4D4] font-bold block truncate">Total Repaid</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                {formatGBP(result.totalRepaid)}
              </p>
            </div>
          </div>
        </div>

        {/* Overpayment Benefits Banner */}
        {result.overpaymentImpact && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Overpayment Advantage</strong>
              <span>
                By overpaying £{input.monthlyOverpayment}/month, you could save approximately <strong>{formatGBP(result.overpaymentImpact.totalInterestSaved)}</strong> in total interest and pay off your mortgage <strong>{result.overpaymentImpact.yearsSaved} years and {result.overpaymentImpact.monthsSaved} months earlier</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Amortisation Table (First 5 Years) */}
        {result.schedule && result.schedule.length > 0 && (
          <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Amortisation Schedule (First 5 Years)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#262626] dark:text-[#D4D4D4]">
                    <th className="py-2.5 font-bold">Year</th>
                    <th className="py-2.5 font-bold text-right">Principal Repaid</th>
                    <th className="py-2.5 font-bold text-right">Interest Paid</th>
                    <th className="py-2.5 font-bold text-right">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                  {result.schedule.slice(0, 5).map((row) => (
                    <tr key={row.year} className="text-[#111111] dark:text-[#F5F5F5]">
                      <td className="py-2.5 font-bold">Year {row.year}</td>
                      <td className="py-2.5 text-right font-medium text-[#059669] dark:text-[#10B981]">
                        {formatGBP(row.principalPaidYear)}
                      </td>
                      <td className="py-2.5 text-right font-medium text-[#262626] dark:text-[#D4D4D4]">
                        {formatGBP(row.interestPaidYear)}
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                        {formatGBP(row.endBalance)}
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
