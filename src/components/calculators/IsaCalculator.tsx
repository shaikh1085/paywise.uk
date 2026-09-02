import React, { useState, useMemo } from 'react';
import { IsaInput, IsaType } from '../../types';
import { calculateIsaGrowth } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Sparkles, TrendingUp, Layers, ShieldCheck } from 'lucide-react';

export const IsaCalculator: React.FC = () => {
  const [input, setInput] = useState<IsaInput>({
    isaType: 'stocks_and_shares_isa',
    currentBalance: 5000,
    monthlyContribution: 500,
    annualGrowthRate: 6.5,
    timePeriodYears: 15,
    annualInflationRate: 2.0,
    taxYear: '2025_26',
  });

  const result = useMemo(() => calculateIsaGrowth(input), [input]);

  const copyText = `PayWise UK ISA Growth & Tax Shelter Calculation:
ISA Type: ${input.isaType === 'stocks_and_shares_isa' ? 'Stocks & Shares ISA' : input.isaType === 'cash_isa' ? 'Cash ISA' : input.isaType === 'lifetime_isa' ? 'Lifetime ISA (LISA)' : 'General ISA'}
Starting Balance: £${(input.currentBalance || 0).toLocaleString('en-GB')}
Monthly Contribution: £${(input.monthlyContribution || 0).toLocaleString('en-GB')}/month
Timeframe: ${input.timePeriodYears} Years at ${input.annualGrowthRate}% p.a.
Total Money Invested: £${result.totalContributions.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Total Investment Growth: £${result.totalGrowth.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Projected Ending Value: £${result.projectedEndingBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
${result.lisaBonusTotal ? `Total Lifetime ISA Government Bonus: £${result.lisaBonusTotal.toLocaleString('en-GB')}` : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/isa-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            ISA Parameters
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            £20,000/yr Allowance
          </span>
        </div>

        <div className="space-y-4">
          {/* ISA Type */}
          <div>
            <label htmlFor="isa-type-select" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              ISA Account Type
            </label>
            <select
              id="isa-type-select"
              value={input.isaType}
              onChange={(e) => setInput({ ...input, isaType: e.target.value as IsaType })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="stocks_and_shares_isa">Stocks & Shares ISA (Tax-Free Capital Growth)</option>
              <option value="cash_isa">Cash ISA (Tax-Free Interest)</option>
              <option value="lifetime_isa">Lifetime ISA (LISA) (+25% Government Bonus)</option>
              <option value="general">General Tax-Free ISA</option>
            </select>
          </div>

          {/* Initial Deposit */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="isa-initial-deposit" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Starting Balance (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.currentBalance || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="isa-initial-deposit"
                min="0"
                step="500"
                value={input.currentBalance || ''}
                onChange={(e) => setInput({ ...input, currentBalance: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="isa-monthly" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Monthly Contribution (£/month)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.monthlyContribution || 0).toLocaleString('en-GB')}/mo
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="isa-monthly"
                min="0"
                step="50"
                value={input.monthlyContribution || ''}
                onChange={(e) => setInput({ ...input, monthlyContribution: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Growth Rate & Timeframe */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="isa-growth-rate" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Annual Growth (%)
              </label>
              <input
                type="number"
                id="isa-growth-rate"
                min="0"
                max="25"
                step="0.5"
                value={input.annualGrowthRate || ''}
                onChange={(e) => setInput({ ...input, annualGrowthRate: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            <div>
              <label htmlFor="isa-timeframe" className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Timeframe (Years)
              </label>
              <input
                type="number"
                id="isa-timeframe"
                min="1"
                max="50"
                value={input.timePeriodYears || 15}
                onChange={(e) => setInput({ ...input, timePeriodYears: Math.max(1, parseInt(e.target.value, 10) || 15) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero Final Value Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Projected Tax-Free Balance
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{input.timePeriodYears} Years</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.projectedEndingBalance} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Total Growth: <strong className="text-[#059669] dark:text-[#10B981]">£{result.totalGrowth.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.projectedEndingBalance > 0 ? (result.totalGrowth / result.projectedEndingBalance) * 100 : 0}
                size={100}
                strokeWidth={8}
                label="Growth %"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Total Deposited</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.totalContributions.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Allowance Status</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                {result.isWithinAnnualAllowance ? 'Within Limit' : 'Over Limit'}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Allowance Left</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.allowanceRemaining.toLocaleString('en-GB', { minimumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        {/* LISA Bonus banner */}
        {result.lisaBonusTotal && result.lisaBonusTotal > 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Government 25% Bonus Applied</strong>
              <span>
                You will receive approximately <strong>£{result.lisaBonusTotal.toLocaleString('en-GB')}</strong> in free UK government bonuses over your {input.timePeriodYears}-year timeframe.
              </span>
            </div>
          </div>
        ) : null}

        {/* Annual Projection Table */}
        {result.projectionTable && result.projectionTable.length > 0 && (
          <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Annual Growth Breakdown
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                    <th className="py-2.5 font-bold">Year</th>
                    <th className="py-2.5 font-bold text-right">Contributions To Date</th>
                    <th className="py-2.5 font-bold text-right">Growth To Date</th>
                    <th className="py-2.5 font-bold text-right">Ending Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#202020]">
                  {result.projectionTable.slice(0, 10).map((row) => (
                    <tr key={row.year} className="text-[#111111] dark:text-[#F5F5F5]">
                      <td className="py-2.5 font-bold">Year {row.year}</td>
                      <td className="py-2.5 text-right font-medium text-[#525252] dark:text-[#A3A3A3]">
                        £{row.totalContributionsToDate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 text-right font-medium text-[#059669] dark:text-[#10B981]">
                        £{row.totalGrowthToDate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
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
