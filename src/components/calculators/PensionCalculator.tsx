import React, { useState, useMemo } from 'react';
import { PensionCompoundInput } from '../../types';
import { calculatePensionCompound } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import { PiggyBank, TrendingUp, ChevronDown, ChevronUp, Sparkles, ArrowUpRight } from 'lucide-react';

export const PensionCalculator: React.FC = () => {
  const [input, setInput] = useState<PensionCompoundInput>({
    currentAge: 32,
    retirementAge: 67,
    currentPot: 28000,
    grossSalary: 52000,
    employeeContributionPercent: 5,
    employerContributionPercent: 4,
    fixedMonthlyTopUp: 50,
    expectedAnnualGrowth: 6.0,
    inflationRate: 2.5,
  });

  const [showTable, setShowTable] = useState(false);

  const result = useMemo(() => calculatePensionCompound(input), [input]);

  const copyText = `PayWise UK Pension Projection:
Current Age: ${input.currentAge} | Target Retirement Age: ${input.retirementAge} (${result.yearsToRetirement} years)
Estimated Pot at Retirement (Nominal): £${result.finalPotNominal.toLocaleString('en-GB')}
Estimated Pot at Retirement (Inflation-Adjusted Real): £${result.finalPotReal.toLocaleString('en-GB')}
Estimated Annual Drawdown (4% Rule): £${result.estimatedAnnualDrawdownSafe4Percent.toLocaleString('en-GB')}/year (£${result.estimatedMonthlyDrawdown.toLocaleString('en-GB')}/month)
Total Personal Contributions: £${result.totalPersonalContributions.toLocaleString('en-GB')}
Total Employer Contributions: £${result.totalEmployerContributions.toLocaleString('en-GB')}
Estimated Investment Growth: £${result.totalInvestmentGrowth.toLocaleString('en-GB')}
Calculated via PayWise UK (https://paywiseuk.vercel.app/pension-calculator)`;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: 3D Inputs */}
        <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Pension & Retirement Inputs
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="current-age-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Current Age
                </label>
                <input
                  type="number"
                  id="current-age-input"
                  min="16"
                  max="75"
                  value={input.currentAge}
                  onChange={(e) => setInput({ ...input, currentAge: parseInt(e.target.value, 10) || 30 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="retirement-age-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Retirement Age
                </label>
                <input
                  type="number"
                  id="retirement-age-input"
                  min={input.currentAge + 1}
                  max="80"
                  value={input.retirementAge}
                  onChange={(e) => setInput({ ...input, retirementAge: parseInt(e.target.value, 10) || 67 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="current-pot-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Current Pension Pot (£)
                </label>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  £{(input.currentPot || 0).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
                <input
                  type="number"
                  id="current-pot-input"
                  min="0"
                  value={input.currentPot || ''}
                  onChange={(e) => setInput({ ...input, currentPot: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-2.5 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="gross-salary-input-pension" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Annual Gross Salary (£)
                </label>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  £{(input.grossSalary || 0).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
                <input
                  type="number"
                  id="gross-salary-input-pension"
                  min="0"
                  value={input.grossSalary || ''}
                  onChange={(e) => setInput({ ...input, grossSalary: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-2.5 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="employee-pct" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  You Pay (%)
                </label>
                <input
                  type="number"
                  id="employee-pct"
                  min="0"
                  max="50"
                  step="0.5"
                  value={input.employeeContributionPercent}
                  onChange={(e) => setInput({ ...input, employeeContributionPercent: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="employer-pct" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Employer (%)
                </label>
                <input
                  type="number"
                  id="employer-pct"
                  min="0"
                  max="50"
                  step="0.5"
                  value={input.employerContributionPercent}
                  onChange={(e) => setInput({ ...input, employerContributionPercent: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <label htmlFor="growth-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Annual Return (%)
                  </label>
                  <Tooltip content="Historical balanced fund returns average 5%–7% annually before inflation." title="Investment Returns" />
                </div>
                <input
                  type="number"
                  id="growth-rate"
                  min="0"
                  max="20"
                  step="0.1"
                  value={input.expectedAnnualGrowth}
                  onChange={(e) => setInput({ ...input, expectedAnnualGrowth: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <label htmlFor="inflation-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Inflation (%)
                  </label>
                  <Tooltip content="Bank of England long-term inflation target is 2.0%–2.5%." title="Inflation Target" />
                </div>
                <input
                  type="number"
                  id="inflation-rate"
                  min="0"
                  max="15"
                  step="0.1"
                  value={input.inflationRate}
                  onChange={(e) => setInput({ ...input, inflationRate: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
                Projected Pot at Age {input.retirementAge}
              </span>
              <span className="text-xs text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                {result.yearsToRetirement} Years Growth Horizon
              </span>
            </div>

            <div className="space-y-1 mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                <AnimatedNumber
                  value={result.finalPotNominal}
                  prefix="£"
                  decimals={0}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Real purchasing power:{' '}
                  <strong className="text-[#059669] dark:text-[#10B981] font-bold">
                    £{result.finalPotReal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </strong>{' '}
                  (inflation-adjusted)
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="bg-white dark:bg-[#111111] p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Safe 4% Drawdown</span>
                <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                  £{result.estimatedAnnualDrawdownSafe4Percent.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
                </p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Monthly Pension Income</span>
                <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                  £{result.estimatedMonthlyDrawdown.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                </p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Compound Growth Gain</span>
                <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                  £{result.totalInvestmentGrowth.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Contribution vs Compound Growth Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span>Your Personal Contributions</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  £{result.totalPersonalContributions.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span>Employer Contributions</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +£{result.totalEmployerContributions.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span>Compound Investment Growth</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  +£{result.totalInvestmentGrowth.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
                <span className="text-emerald-900 dark:text-emerald-300">Total Nominal Pot</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                  £{result.finalPotNominal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <ExportActions onCopyText={copyText} />
          </div>
        </div>
      </div>
    </div>
  );
};
