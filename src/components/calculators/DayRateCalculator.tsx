import React, { useState, useMemo } from 'react';
import { DayRateInput } from '../../types';
import { calculateDayRate } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Tooltip } from '../common/Tooltip';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const DayRateCalculator: React.FC = () => {
  const [input, setInput] = useState<DayRateInput>({
    dayRate: 450,
    daysPerWeek: 5,
    weeksPerYear: 46,
    holidayDays: 25,
    pensionPercentage: 5,
    monthlyExpenses: 150,
    isInsideIR35: false,
    umbrellaMarginMonthly: 0,
  });

  const result = useMemo(() => calculateDayRate(input), [input]);

  const copyText = `PayWise UK Day Rate Calculation:
Day Rate: £${input.dayRate}
Working Days per Year: ${result.totalWorkingDays}
Gross Annual Equivalent: £${result.grossAnnualEquivalent.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Net Annual: £${result.estimatedNetAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Net Monthly: £${result.estimatedNetMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Effective Retention: ${result.effectiveRetentionRate.toFixed(1)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/day-rate-to-salary-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input controls */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Briefcase className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Day Rate Contract Parameters
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="day-rate-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Daily Rate (£)
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                £{input.dayRate}/day
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                id="day-rate-input"
                min="0"
                value={input.dayRate || ''}
                onChange={(e) => setInput({ ...input, dayRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="e.g. 500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="days-per-week" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Days Per Week
              </label>
              <input
                type="number"
                id="days-per-week"
                min="1"
                max="7"
                value={input.daysPerWeek}
                onChange={(e) => setInput({ ...input, daysPerWeek: parseInt(e.target.value, 10) || 5 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="weeks-per-year" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                Weeks Worked/Yr
              </label>
              <input
                type="number"
                id="weeks-per-year"
                min="1"
                max="52"
                value={input.weeksPerYear}
                onChange={(e) => setInput({ ...input, weeksPerYear: parseInt(e.target.value, 10) || 46 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label htmlFor="holiday-days" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Unpaid Leave / Holidays (Days)
              </label>
              <Tooltip content="Contractors are not paid statutory holiday pay. Factoring 25-30 days holiday/sick leave provides an accurate annual equivalent." title="Contractor Leave" />
            </div>
            <input
              type="number"
              id="holiday-days"
              min="0"
              max="100"
              value={input.holidayDays}
              onChange={(e) => setInput({ ...input, holidayDays: parseInt(e.target.value, 10) || 0 })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pension-pct" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Pension Contribution ({input.pensionPercentage}%)
            </label>
            <input
              type="range"
              id="pension-pct"
              min="0"
              max="30"
              step="1"
              value={input.pensionPercentage}
              onChange={(e) => setInput({ ...input, pensionPercentage: parseFloat(e.target.value) || 0 })}
              className="w-full h-2 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg appearance-none cursor-pointer accent-[#059669] dark:accent-[#10B981]"
            />
          </div>

          {/* IR35 Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-[#111111] dark:text-[#F5F5F5] cursor-pointer">
              <input
                type="checkbox"
                checked={input.isInsideIR35}
                onChange={(e) => setInput({ ...input, isInsideIR35: e.target.checked })}
                className="w-4 h-4 text-[#059669] dark:text-[#10B981] rounded border-[#E5E5E5] dark:border-[#303030] focus:ring-[#059669]"
              />
              <span>Calculate as Inside IR35 (Umbrella PAYE)</span>
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Estimated Net Income
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] tabular-nums">
              Gross: £{result.grossAnnualEquivalent.toLocaleString('en-GB', { maximumFractionDigits: 0 })}/yr
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                <AnimatedNumber
                  value={result.estimatedNetMonthly}
                  prefix="£"
                  decimals={2}
                  className="text-[#111111] dark:text-[#F5F5F5]"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>estimated monthly take-home earnings</span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveRetentionRate}
                size={96}
                strokeWidth={8}
                label="Retention"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-[#F5F5F5] dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Annual</span>
              <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.grossAnnualEquivalent.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-[#F5F5F5] dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Net Annual</span>
              <p className="text-sm sm:text-base font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.estimatedNetAnnual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-[#F5F5F5] dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Working Days</span>
              <p className="text-sm sm:text-base font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                {result.totalWorkingDays} days
              </p>
            </div>

            <div className="bg-[#F5F5F5] dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Equivalent</span>
              <p className="text-sm sm:text-base font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.grossAnnualEquivalent.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
