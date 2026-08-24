import React, { useState, useMemo } from 'react';
import { OvertimeInput } from '../../types';
import { calculateOvertime } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Clock, ArrowUpRight } from 'lucide-react';

export const OvertimeCalculator: React.FC = () => {
  const [input, setInput] = useState<OvertimeInput>({
    basicHourlyRate: 22,
    overtimeHours: 15,
    overtimeMultiplier: 1.5,
    payPeriod: 'monthly',
    currentAnnualSalary: 42000,
  });

  const result = useMemo(() => calculateOvertime(input), [input]);

  const copyText = `PayWise UK Overtime Pay Calculation:
Basic Hourly Rate: £${input.basicHourlyRate.toFixed(2)}/hr | Overtime Multiplier: ${input.overtimeMultiplier}x (£${result.overtimeHourlyRate.toFixed(2)}/hr)
Overtime Hours: ${input.overtimeHours} hrs
Gross Overtime Pay: £${result.grossOvertimePay.toFixed(2)}
Estimated Deductions (Tax & NI): -£${(result.estimatedIncomeTaxDeduction + result.estimatedNiDeduction).toFixed(2)}
Net Overtime in Pocket: £${result.netOvertimePay.toFixed(2)} (${result.effectiveOvertimeRetentionPercent.toFixed(0)}% kept)
Calculated via PayWise UK (https://paywiseuk.co.uk/overtime-pay-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Overtime Inputs
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="base-rate-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Standard Hourly Rate (£/hr)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{input.basicHourlyRate.toFixed(2)}/hr
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="base-rate-input"
                min="0"
                step="0.1"
                value={input.basicHourlyRate || ''}
                onChange={(e) => setInput({ ...input, basicHourlyRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="overtime-hours-num" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Overtime Hours
              </label>
              <input
                type="number"
                id="overtime-hours-num"
                min="0"
                value={input.overtimeHours}
                onChange={(e) => setInput({ ...input, overtimeHours: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="overtime-mult-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Rate Multiplier
              </label>
              <select
                id="overtime-mult-select"
                value={input.overtimeMultiplier}
                onChange={(e) => setInput({ ...input, overtimeMultiplier: parseFloat(e.target.value) || 1.5 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={1.0}>1.0x (Standard rate)</option>
                <option value={1.25}>1.25x (Time & 1/4)</option>
                <option value={1.33}>1.33x (Time & 1/3)</option>
                <option value={1.5}>1.5x (Time and a half)</option>
                <option value={1.75}>1.75x (Time & 3/4)</option>
                <option value={2.0}>2.0x (Double time)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="current-base-salary" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Your Current Base Salary (£)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{(input.currentAnnualSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="current-base-salary"
                min="0"
                step="1000"
                value={input.currentAnnualSalary || ''}
                onChange={(e) => setInput({ ...input, currentAnnualSalary: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-2.5 font-bold text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
            <p className="text-2xs text-slate-400 mt-1">Used to establish your marginal income tax & NI band.</p>
          </div>
        </div>
      </div>

      {/* RIGHT: 3D Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#0f1b33] to-[#0a101f] text-white p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Net Overtime in Your Pocket
            </span>
            <span className="text-xs text-slate-400">
              £{result.overtimeHourlyRate.toFixed(2)}/hr effective rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netOvertimePay}
                  prefix="£"
                  decimals={2}
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Gross overtime earnings of £{result.grossOvertimePay.toFixed(2)}
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveOvertimeRetentionPercent}
                size={104}
                strokeWidth={9}
                label="Kept"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Gross Overtime Pay</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                £{result.grossOvertimePay.toFixed(2)}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Estimated Tax & NI</span>
              <p className="text-base sm:text-lg font-black text-rose-400 mt-0.5 tabular-nums">
                -£{(result.estimatedIncomeTaxDeduction + result.estimatedNiDeduction).toFixed(2)}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Effective Net / Hour</span>
              <p className="text-base sm:text-lg font-black text-cyan-400 mt-0.5 tabular-nums">
                £{(input.overtimeHours > 0 ? result.netOvertimePay / input.overtimeHours : 0).toFixed(2)}/hr
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Marginal Overtime Deduction Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Gross Additional Earnings</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.grossOvertimePay.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Marginal Income Tax</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.estimatedIncomeTaxDeduction.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Marginal Class 1 National Insurance</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.estimatedNiDeduction.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Net Additional Take-Home</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                +£{result.netOvertimePay.toFixed(2)}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
