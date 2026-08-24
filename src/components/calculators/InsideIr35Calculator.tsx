import React, { useState, useMemo } from 'react';
import { InsideIr35Input } from '../../types';
import { calculateInsideIr35 } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const InsideIr35Calculator: React.FC = () => {
  const [input, setInput] = useState<InsideIr35Input>({
    dayRate: 500,
    workingDaysPerYear: 220,
    umbrellaFeePerWeek: 25,
    pensionPercent: 5,
    apprenticeshipLevyIncluded: true,
  });

  const result = useMemo(() => calculateInsideIr35(input), [input]);

  const copyText = `PayWise UK Inside IR35 Calculation:
Contract Day Rate: £${input.dayRate} | Days/Year: ${input.workingDaysPerYear}
Total Contract Value: £${result.contractGrossAnnual.toLocaleString('en-GB')}
Umbrella Fees: -£${result.umbrellaFeesAnnual.toLocaleString('en-GB')}
Employer NI (15%): -£${result.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Apprenticeship Levy (0.5%): -£${result.apprenticeshipLevyAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Gross Pay to Worker: £${result.grossPayToWorkerAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Income Tax & Employee NI: -£${(result.incomeTaxAnnual + result.employeeNiAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Net Take-Home: £${result.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (£${result.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
Effective Take-Home: ${result.takeHomePercentage.toFixed(1)}% of contract value
Calculated via PayWise UK (https://paywiseuk.co.uk/inside-ir35-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Inside IR35 Contract Details
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="ir35-day-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Contract Day Rate (£/day)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{input.dayRate}/day
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="ir35-day-rate"
                min="0"
                value={input.dayRate || ''}
                onChange={(e) => setInput({ ...input, dayRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="ir35-days" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Billed Days/Yr
              </label>
              <input
                type="number"
                id="ir35-days"
                min="1"
                max="365"
                value={input.workingDaysPerYear}
                onChange={(e) => setInput({ ...input, workingDaysPerYear: parseInt(e.target.value, 10) || 220 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="ir35-fee" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Umbrella Fee (£/wk)
              </label>
              <input
                type="number"
                id="ir35-fee"
                min="0"
                value={input.umbrellaFeePerWeek}
                onChange={(e) => setInput({ ...input, umbrellaFeePerWeek: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-[#090e1a] border border-slate-200/80 dark:border-slate-800">
              <input
                type="checkbox"
                id="apprenticeship-levy-toggle"
                checked={input.apprenticeshipLevyIncluded}
                onChange={(e) => setInput({ ...input, apprenticeshipLevyIncluded: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="apprenticeship-levy-toggle" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Include Apprenticeship Levy deduction (0.5%)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: 3D Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#0f1b33] to-[#0a101f] text-white p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Inside IR35 Net Monthly Take-Home
            </span>
            <span className="text-xs text-slate-400">
              Contract: £{result.contractGrossAnnual.toLocaleString('en-GB')}/yr
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netTakeHomeMonthly}
                  prefix="£"
                  decimals={2}
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Net monthly after employer NI (15%), Apprenticeship levy, PAYE & employee NI
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.takeHomePercentage}
                size={104}
                strokeWidth={9}
                label="Retention"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Annual Net Pay</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                £{result.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Employer NI (15%)</span>
              <p className="text-base sm:text-lg font-black text-rose-400 mt-0.5 tabular-nums">
                -£{result.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Retention Rate</span>
              <p className="text-base sm:text-lg font-black text-cyan-400 mt-0.5 tabular-nums">
                {result.takeHomePercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Umbrella & Assignment Deductions
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Gross Assignment Rate Invoiced</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.contractGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Umbrella Company Margin</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.umbrellaFeesAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Employer NI & Apprenticeship Levy</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{(result.employerNiAnnual + result.apprenticeshipLevyAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Annual Net In Pocket</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                £{result.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
