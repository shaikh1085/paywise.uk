import React, { useState, useMemo } from 'react';
import { CreditCardRepaymentInput, RepaymentStrategy } from '../../types';
import { calculateCreditCardRepayment } from '../../utils/calculations';
import { UK_CREDIT_CARD_APR_PROFILES } from '../../config/creditCardConfig';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CreditCard, Calculator, Clock, TrendingDown, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CreditCardRepaymentCalculator: React.FC = () => {
  const [input, setInput] = useState<CreditCardRepaymentInput>({
    currentBalance: 3000,
    annualInterestRate: 24.9,
    strategy: 'fixed_monthly',
    fixedMonthlyPayment: 150,
    targetMonths: 24,
  });

  const result = useMemo(() => calculateCreditCardRepayment(input), [input]);

  const handleReset = () => {
    setInput({
      currentBalance: 3000,
      annualInterestRate: 24.9,
      strategy: 'fixed_monthly',
      fixedMonthlyPayment: 150,
      targetMonths: 24,
    });
  };

  const copySummaryText = `PayWise UK Credit Card Repayment Calculation:
Current Balance: £${result.currentBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Interest Rate (APR): ${result.apr.toFixed(1)}%
Strategy: ${
    result.strategy === 'minimum_only'
      ? 'Minimum Payment Only'
      : result.strategy === 'fixed_monthly'
      ? `Fixed £${result.monthlyRepayment.toFixed(2)}/month`
      : 'Target Payoff Months'
  }
Monthly Repayment: £${result.monthlyRepayment.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Time to Debt-Free: ${result.totalMonthsToPayoff} months (${result.totalYearsToPayoff} years)
Total Interest Paid: £${result.totalInterestPaid.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Total Repayment Cost: £${result.totalRepaymentCost.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
${
  result.minPaymentComparison
    ? `Interest Saved vs Minimum Payment: £${result.minPaymentComparison.interestSaved.toLocaleString('en-GB', { minimumFractionDigits: 2 })}\nTime Saved vs Minimum Payment: ${result.minPaymentComparison.monthsSaved} months\n`
    : ''
}Calculated via PayWise UK (https://www.paywiseuk.co.uk/credit-card-repayment-calculator) - Estimate Only.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Card Balance & Strategy
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            Payoff Model
          </span>
        </div>

        <div className="space-y-5">
          {/* Outstanding Balance */}
          <div>
            <label htmlFor="cc-balance" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Current Card Balance (£)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                £
              </span>
              <input
                id="cc-balance"
                type="number"
                min="50"
                step="100"
                value={input.currentBalance || ''}
                onChange={(e) => setInput({ ...input, currentBalance: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="3000"
              />
            </div>
            {/* Balance Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[1000, 2500, 3000, 5000, 8000].map((preset) => (
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
                  £{preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Annual Interest Rate (APR %) */}
          <div>
            <label htmlFor="cc-apr" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Annual Interest Rate (APR %)
            </label>
            <div className="relative">
              <input
                id="cc-apr"
                type="number"
                min="0"
                max="99.9"
                step="0.1"
                value={input.annualInterestRate}
                onChange={(e) => setInput({ ...input, annualInterestRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="24.9"
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                %
              </span>
            </div>
            {/* APR Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {UK_CREDIT_CARD_APR_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setInput({ ...input, annualInterestRate: p.apr })}
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    input.annualInterestRate === p.apr
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                  }`}
                >
                  {p.apr}% {p.apr === 24.9 ? '(Typical)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Strategy Tabs */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Repayment Strategy
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInput({ ...input, strategy: 'fixed_monthly' })}
                className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  input.strategy === 'fixed_monthly'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                Fixed Amount
              </button>

              <button
                type="button"
                onClick={() => setInput({ ...input, strategy: 'target_months' })}
                className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  input.strategy === 'target_months'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                Target Timeframe
              </button>

              <button
                type="button"
                onClick={() => setInput({ ...input, strategy: 'minimum_only' })}
                className={`px-2.5 py-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  input.strategy === 'minimum_only'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                Minimum Only
              </button>
            </div>
          </div>

          {/* Strategy Specific Input Fields */}
          {input.strategy === 'fixed_monthly' && (
            <div>
              <label htmlFor="cc-fixed-payment" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                Fixed Monthly Repayment (£/month)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                  £
                </span>
                <input
                  id="cc-fixed-payment"
                  type="number"
                  min="10"
                  step="10"
                  value={input.fixedMonthlyPayment || ''}
                  onChange={(e) => setInput({ ...input, fixedMonthlyPayment: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-bold text-[#059669] dark:text-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  placeholder="150"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[75, 100, 150, 200, 300].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInput({ ...input, fixedMonthlyPayment: preset })}
                    className={`text-2xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      input.fixedMonthlyPayment === preset
                        ? 'bg-[#059669] text-white border-[#059669]'
                        : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                    }`}
                  >
                    £{preset}/mo
                  </button>
                ))}
              </div>
            </div>
          )}

          {input.strategy === 'target_months' && (
            <div>
              <label htmlFor="cc-target-months" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
                Target Payoff Period
              </label>
              <select
                id="cc-target-months"
                value={input.targetMonths || 24}
                onChange={(e) => setInput({ ...input, targetMonths: parseInt(e.target.value, 10) || 24 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              >
                {[6, 12, 18, 24, 36, 48, 60].map((m) => (
                  <option key={m} value={m}>
                    {m} Months ({Math.round((m / 12) * 10) / 10} Years)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Minimum Warning Notice */}
          {input.strategy === 'minimum_only' && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Minimum Repayment Alert</span>
              </div>
              <p className="text-2xs leading-relaxed">
                Paying only the required minimum reduces the balance very slowly as the minimum payment decreases each month. Consider a fixed repayment to clear debt years earlier.
              </p>
            </div>
          )}

          {/* Export Actions */}
          <ExportActions
            onReset={handleReset}
            onPrint={() => window.print()}
            copyText={copySummaryText}
          />
        </div>
      </div>

      {/* RIGHT: Results & Payoff Impact */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Payoff Metric Card */}
        <div className="rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Total Interest Payable
              </span>
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
                <AnimatedNumber value={result.totalInterestPaid} prefix="£" />
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Time to Debt-Free
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#059669] dark:text-[#10B981]">
                {result.totalMonthsToPayoff} months
              </div>
              <span className="text-2xs text-[#737373]">({result.totalYearsToPayoff} years)</span>
            </div>
          </div>

          {/* Metric Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                Monthly Repayment
              </span>
              <span className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.monthlyRepayment.toFixed(2)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                Principal Balance
              </span>
              <span className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.currentBalance.toLocaleString('en-GB')}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                Total Repaid (Principal + Int)
              </span>
              <span className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.totalRepaymentCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Comparison vs Minimum Payment (When using fixed or target strategy) */}
          {result.minPaymentComparison && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#059669] dark:text-[#10B981]">
                <Sparkles className="w-4 h-4" />
                <span>Savings vs Minimum Repayments:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>
                    Save <strong>£{result.minPaymentComparison.interestSaved.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong> in interest
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>
                    Debt-free <strong>{Math.floor(result.minPaymentComparison.monthsSaved / 12)} years and {result.minPaymentComparison.monthsSaved % 12} months</strong> faster
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* First 12 Months Amortisation Schedule Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Monthly Repayment Schedule (Months 1 to 12)
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAFAFA] dark:bg-[#151515] border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] font-bold">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Starting Balance</th>
                    <th className="py-2.5 px-3">Interest Charged</th>
                    <th className="py-2.5 px-3">Repayment</th>
                    <th className="py-2.5 px-3 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  {result.schedule.slice(0, 12).map((item) => (
                    <tr key={item.month} className="hover:bg-[#FAFAFA] dark:hover:bg-[#151515] transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#111111] dark:text-[#F5F5F5]">
                        Month {item.month}
                      </td>
                      <td className="py-2.5 px-3 text-[#525252] dark:text-[#A3A3A3]">
                        £{item.startingBalance.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-semibold">
                        £{item.interestCharged.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#059669] dark:text-[#10B981]">
                        £{item.repaymentAmount.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                        £{item.endingBalance.toFixed(2)}
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
