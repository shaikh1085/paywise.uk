import React, { useState, useMemo } from 'react';
import { HourlyRateInput } from '../../types';
import { calculateHourlyRate } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Clock, ArrowUpRight } from 'lucide-react';

export const HourlyCalculator: React.FC = () => {
  const [input, setInput] = useState<HourlyRateInput>({
    hourlyWage: 18.5,
    hoursPerWeek: 37.5,
    weeksPerYear: 52,
    overtimeHoursPerWeek: 4,
    overtimeMultiplier: 1.5,
    pensionPercentage: 5,
  });

  const result = useMemo(() => calculateHourlyRate(input), [input]);

  const retention = result.totalGrossAnnual > 0 ? (result.netAnnual / result.totalGrossAnnual) * 100 : 0;

  const copyText = `PayWise UK Hourly to Salary Calculation:
Hourly Wage: £${input.hourlyWage.toFixed(2)}/hr
Hours per week: ${input.hoursPerWeek} hrs (+${input.overtimeHoursPerWeek} overtime hrs @ ${input.overtimeMultiplier}x)
Total Annual Gross: £${result.totalGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Monthly Take-Home: £${result.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Annual Take-Home: £${result.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Effective Net Hourly Rate: £${result.effectiveHourlyNet.toFixed(2)}/hr
Calculated via PayWise UK (https://paywiseuk.vercel.app/hourly-to-salary-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Hourly Wage Parameters
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="hourly-wage-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hourly Wage (£/hour)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{input.hourlyWage.toFixed(2)}/hr
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="hourly-wage-input"
                min="0"
                step="0.05"
                value={input.hourlyWage || ''}
                onChange={(e) => setInput({ ...input, hourlyWage: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-inner"
                placeholder="e.g. 18.50"
              />
            </div>
            <p className="text-2xs text-slate-400 mt-1">UK National Living Wage (21+) is £11.44/hr minimum.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hours-per-week" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Hours Per Week
              </label>
              <input
                type="number"
                id="hours-per-week"
                min="1"
                max="80"
                step="0.5"
                value={input.hoursPerWeek}
                onChange={(e) => setInput({ ...input, hoursPerWeek: parseFloat(e.target.value) || 37.5 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="weeks-per-year-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Weeks Paid/Yr
              </label>
              <input
                type="number"
                id="weeks-per-year-input"
                min="1"
                max="52"
                value={input.weeksPerYear}
                onChange={(e) => setInput({ ...input, weeksPerYear: parseInt(e.target.value, 10) || 52 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Overtime (Optional)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="overtime-hours" className="block text-2xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Overtime Hours/Wk
                </label>
                <input
                  type="number"
                  id="overtime-hours"
                  min="0"
                  max="40"
                  value={input.overtimeHoursPerWeek}
                  onChange={(e) => setInput({ ...input, overtimeHoursPerWeek: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="overtime-multiplier" className="block text-2xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Rate Multiplier
                </label>
                <select
                  id="overtime-multiplier"
                  value={input.overtimeMultiplier}
                  onChange={(e) => setInput({ ...input, overtimeMultiplier: parseFloat(e.target.value) || 1.5 })}
                  className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="1">1.0x (Standard)</option>
                  <option value="1.25">1.25x (Time and Quarter)</option>
                  <option value="1.33">1.33x (Time and Third)</option>
                  <option value="1.5">1.5x (Time and Half)</option>
                  <option value="2">2.0x (Double Time)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="hourly-pension" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Pension Contribution ({input.pensionPercentage}%)
            </label>
            <input
              type="range"
              id="hourly-pension"
              min="0"
              max="20"
              step="1"
              value={input.pensionPercentage}
              onChange={(e) => setInput({ ...input, pensionPercentage: parseFloat(e.target.value) || 0 })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Estimated Net Take-Home
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] tabular-nums">
              Gross: £{result.totalGrossAnnual.toLocaleString('en-GB')}/yr
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                <AnimatedNumber
                  value={result.netMonthly}
                  prefix="£"
                  decimals={2}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span>estimated net monthly pay into your bank</span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={retention}
                size={104}
                strokeWidth={9}
                label="Take-Home"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Annual Take-Home</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Weekly Net Pay</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.netWeekly.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Effective Net / Hour</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.effectiveHourlyNet.toFixed(2)}/hr
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Wage Breakdown & Annual Totals
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Standard Contract Hours ({input.hoursPerWeek} hrs/wk @ £{input.hourlyWage.toFixed(2)})</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.basicGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {result.overtimeGrossAnnual > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span>Overtime ({input.overtimeHoursPerWeek} hrs/wk @ {input.overtimeMultiplier}x)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +£{result.overtimeGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Total Gross Annual Earnings</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                £{result.totalGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Net Take-Home (Annual)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                £{result.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
