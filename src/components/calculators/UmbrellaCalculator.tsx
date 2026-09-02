import React, { useState, useMemo } from 'react';
import { UmbrellaInput } from '../../types';
import { calculateUmbrella } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const UmbrellaCalculator: React.FC = () => {
  const [input, setInput] = useState<UmbrellaInput>({
    dayRate: 400,
    daysWorkedPerMonth: 20,
    umbrellaWeeklyMargin: 25,
    pensionSalarySacrificePercent: 0,
    allowableExpensesMonthly: 0,
  });

  const result = useMemo(() => calculateUmbrella(input), [input]);

  const copyText = `PayWise UK Umbrella Pay Calculation:
Monthly Invoiced Amount: £${result.invoiceGrossMonthly.toLocaleString('en-GB')}
Umbrella Margin: -£${result.umbrellaMarginMonthly.toFixed(2)}
Employer NI & Apprenticeship Levy: -£${(result.employerNiMonthly + result.apprenticeshipLevyMonthly).toFixed(2)}
Gross Salary: £${result.grossSalaryMonthly.toFixed(2)}
Income Tax & Employee NI: -£${(result.incomeTaxMonthly + result.employeeNiMonthly).toFixed(2)}
Estimated Net Monthly Pay: £${result.netPayMonthly.toFixed(2)}
Retention Rate: ${result.retentionPercent.toFixed(1)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/umbrella-company-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Monthly Umbrella Inputs
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="umbrella-day-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Contract Day Rate (£)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{input.dayRate}/day
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="umbrella-day-rate"
                min="0"
                value={input.dayRate || ''}
                onChange={(e) => setInput({ ...input, dayRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="umbrella-days-mo" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Days Worked/Mo
              </label>
              <input
                type="number"
                id="umbrella-days-mo"
                min="1"
                max="31"
                value={input.daysWorkedPerMonth}
                onChange={(e) => setInput({ ...input, daysWorkedPerMonth: parseInt(e.target.value, 10) || 20 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="umbrella-margin-wk" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Margin (£/week)
              </label>
              <input
                type="number"
                id="umbrella-margin-wk"
                min="0"
                value={input.umbrellaWeeklyMargin}
                onChange={(e) => setInput({ ...input, umbrellaWeeklyMargin: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="umbrella-expenses" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Allowable Monthly Expenses (£)
            </label>
            <input
              type="number"
              id="umbrella-expenses"
              min="0"
              value={input.allowableExpensesMonthly}
              onChange={(e) => setInput({ ...input, allowableExpensesMonthly: parseFloat(e.target.value) || 0 })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              Net Umbrella Monthly Take-Home
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] tabular-nums">
              Invoice: £{result.invoiceGrossMonthly.toLocaleString('en-GB')}/mo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1">
                <AnimatedNumber
                  value={result.netPayMonthly}
                  prefix="£"
                  decimals={2}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Net cash deposit into your bank account after all umbrella deductions
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.retentionPercent}
                size={104}
                strokeWidth={9}
                label="Retention"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Pay on Slip</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.grossSalaryMonthly.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Employer Deductions</span>
              <p className="text-base sm:text-lg font-black text-[#DC2626] dark:text-[#F87171] mt-0.5 tabular-nums">
                -£{(result.employerNiMonthly + result.apprenticeshipLevyMonthly).toFixed(0)}/mo
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Net Retention</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                {result.retentionPercent.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Umbrella Reconciliation
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Gross Assignment Invoiced ({input.daysWorkedPerMonth} days @ £{input.dayRate})</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.invoiceGrossMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Umbrella Company Margin</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.umbrellaMarginMonthly.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Employer Costs (NI & Apprenticeship Levy)</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{(result.employerNiMonthly + result.apprenticeshipLevyMonthly).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Net Take-Home Pay</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                £{result.netPayMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
