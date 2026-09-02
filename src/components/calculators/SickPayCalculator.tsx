import React, { useState, useMemo } from 'react';
import { SickPayInput, TaxYear } from '../../types';
import { calculateSickPay } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  Activity,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building2,
  Link2,
  Info,
  Clock,
} from 'lucide-react';

export const SickPayCalculator: React.FC = () => {
  const [input, setInput] = useState<SickPayInput>({
    averageWeeklyEarnings: 550,
    qualifyingDaysOff: 8,
    qualifyingDaysPerWeek: 5,
    isLinkedPeriod: false,
    occupationalWeeklyPay: 0,
    taxYear: '2025_26',
  });

  const [showOccupational, setShowOccupational] = useState(false);

  const result = useMemo(() => calculateSickPay(input), [input]);

  const handleReset = () => {
    setInput({
      averageWeeklyEarnings: 550,
      qualifyingDaysOff: 8,
      qualifyingDaysPerWeek: 5,
      isLinkedPeriod: false,
      occupationalWeeklyPay: 0,
      taxYear: '2025_26',
    });
    setShowOccupational(false);
  };

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26 (Current)' },
    { value: '2026_27', label: '2026/27 (Forecast)' },
    { value: '2024_25', label: '2024/25' },
  ];

  const copyText = `PayWise UK — Statutory Sick Pay (SSP) Calculation:
Tax Year: ${result.taxYearLabel}
Average Weekly Earnings: ${fmt(result.averageWeeklyEarnings)} (LEL: ${fmt(result.lowerEarningsLimit)}/wk)
Eligibility: ${result.isEligible ? 'Eligible for SSP' : 'Ineligible (Earnings below LEL)'}
---
Qualifying Working Days Off: ${result.qualifyingDaysOff} days (${result.qualifyingDaysPerWeek} days/wk contract)
Unpaid Waiting Days: ${result.waitingDays} days (${result.isLinkedPeriod ? '0 waiting days — Linked sickness within 8 weeks' : 'First 3 qualifying days unpaid'})
Payable SSP Days: ${result.payableDays} days (${result.payableWeeks.toFixed(1)} weeks)
Daily SSP Rate: ${fmt(result.dailySspRate)}/day (${fmt(result.weeklySspRate)}/week)
Total Statutory Sick Pay: ${fmt(result.totalSspAmount)}
${result.isOccupationalHigher ? `\nOccupational Scheme Comparison: ${fmt(result.totalOccupationalAmount)} (${fmt(result.occupationalWeeklyPay)}/wk contractual rate) — Higher than SSP` : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/statutory-sick-pay-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Sickness & Earnings Details
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="space-y-5">
          {/* Average Weekly Earnings */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Average Weekly Earnings (AWE)
                </label>
                <Tooltip
                  title="Average Weekly Earnings"
                  content="Your average gross weekly pay before tax, usually averaged over the 8 weeks prior to your first day of sickness. Must be at least £125/week (the Lower Earnings Limit for 2025/26) to qualify for SSP."
                />
              </div>
              <span className={`text-2xs font-bold px-2 py-0.5 rounded-md ${
                result.isEligible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
              }`}>
                {result.isEligible ? 'Above LEL (£125)' : 'Below LEL'}
              </span>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                min="0"
                step="10"
                value={input.averageWeeklyEarnings || ''}
                onChange={(e) => setInput((p) => ({ ...p, averageWeeklyEarnings: parseFloat(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 550"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[125, 350, 550, 750, 1000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, averageWeeklyEarnings: val }))}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-bold border transition-all ${
                    input.averageWeeklyEarnings === val
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  £{val}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Qualifying Days Off Sick */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Qualifying Working Days Off Sick
              </label>
              <Tooltip
                title="Qualifying Days"
                content="Count the days you normally would have worked that were missed due to illness (not weekend or non-working days). For example, if you work Monday to Friday and miss 2 full weeks, enter 10 days."
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, qualifyingDaysOff: Math.max(1, p.qualifyingDaysOff - 1) }))}
                className="w-10 h-10 rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#111111] dark:text-[#F5F5F5] font-black text-lg flex items-center justify-center hover:border-[#059669]/50 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-black text-[#111111] dark:text-[#F5F5F5]">{input.qualifyingDaysOff}</span>
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3] ml-1.5">{input.qualifyingDaysOff === 1 ? 'day' : 'days'}</span>
              </div>
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, qualifyingDaysOff: Math.min(200, p.qualifyingDaysOff + 1) }))}
                className="w-10 h-10 rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#111111] dark:text-[#F5F5F5] font-black text-lg flex items-center justify-center hover:border-[#059669]/50 transition-all"
              >
                +
              </button>
            </div>
            <div className="flex gap-2 mt-3 justify-center flex-wrap">
              {[3, 5, 8, 10, 15, 20].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, qualifyingDaysOff: days }))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    input.qualifyingDaysOff === days
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {days} {days === 1 ? 'day' : 'days'}
                </button>
              ))}
            </div>
          </div>

          {/* Working Days per Week */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Contracted Working Days per Week
              </label>
              <Tooltip
                title="Qualifying Pattern"
                content="The number of days you are contracted to work in a normal week. SSP daily rate is calculated as the weekly rate divided by this number (e.g. £116.75 / 5 = £23.35/day)."
              />
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, qualifyingDaysPerWeek: num }))}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    (input.qualifyingDaysPerWeek || 5) === num
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {num}d
                </button>
              ))}
            </div>
            <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1 text-center">
              Daily SSP rate: <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">{fmt(result.dailySspRate)}/day</span>
            </p>
          </div>

          {/* Linked Period of Sickness Toggle */}
          <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 bg-[#FAFAFA] dark:bg-[#151515] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
                  Linked Sickness Period?
                </span>
                <Tooltip
                  title="Linked Period of Sickness"
                  content="If you had a previous period of sickness (of 4+ days) within the last 8 weeks where you already served the 3 unpaid waiting days, you do not have to serve waiting days again. SSP is payable from day 1."
                />
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={input.isLinkedPeriod}
                onClick={() => setInput((p) => ({ ...p, isLinkedPeriod: !p.isLinkedPeriod }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2 ${
                  input.isLinkedPeriod ? 'bg-[#059669]' : 'bg-[#D4D4D4] dark:bg-[#404040]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    input.isLinkedPeriod ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-2xs text-[#737373] dark:text-[#888888] leading-relaxed">
              {input.isLinkedPeriod
                ? '✓ Linked within 8 weeks — 0 waiting days apply; paid from day 1.'
                : 'Standard period — First 3 qualifying working days are unpaid waiting days.'}
            </p>
          </div>

          {/* Optional: Occupational / Contractual Sick Pay */}
          <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 bg-[#FAFAFA] dark:bg-[#151515] space-y-3">
            <button
              type="button"
              onClick={() => setShowOccupational(!showOccupational)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
                  Employer Contractual Sick Pay Scheme?
                </span>
              </div>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                {showOccupational ? 'Hide' : 'Add Scheme'}
              </span>
            </button>

            {showOccupational && (
              <div className="space-y-2 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-1 mb-1">
                  <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                    Employer Occupational Rate (£/week)
                  </label>
                  <Tooltip
                    title="Occupational Sick Pay"
                    content="If your employment contract provides company sick pay (e.g. full salary or a higher contractual amount), enter the weekly amount here to see the total company pay comparison."
                  />
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#525252] dark:text-[#A3A3A3] font-bold text-sm">£</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={input.occupationalWeeklyPay || ''}
                    onChange={(e) => setInput((p) => ({ ...p, occupationalWeeklyPay: parseFloat(e.target.value) || 0 }))}
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-7 pr-3 py-2 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                    placeholder="e.g. 500"
                  />
                </div>
                <p className="text-2xs text-[#737373] dark:text-[#888888]">
                  SSP acts as a legal minimum floor. If company sick pay is higher, you receive the company rate.
                </p>
              </div>
            )}
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <select
              value={input.taxYear || '2025_26'}
              onChange={(e) => setInput((p) => ({ ...p, taxYear: e.target.value as TaxYear }))}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
            >
              {taxYears.map((y) => (
                <option key={y.value} value={y.value}>{y.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main Result Card */}
        <div className={`relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] bg-white dark:bg-[#171717] ${
          !result.isEligible
            ? 'border-t-rose-500'
            : result.isOccupationalHigher
            ? 'border-t-purple-600'
            : 'border-t-[#059669] dark:border-t-[#10B981]'
        }`}>

          {/* Eligibility Banner */}
          <div className={`flex items-start gap-3 p-3.5 rounded-xl mb-6 border ${
            result.isEligible
              ? 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/30 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]'
              : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400'
          }`}>
            {result.isEligible ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5 text-xs">
              <p className="font-bold">
                {result.isEligible
                  ? 'Eligible for Statutory Sick Pay (SSP)'
                  : 'Not Eligible for Statutory Sick Pay'}
              </p>
              <p className="font-normal opacity-90 leading-relaxed">
                {result.isEligible
                  ? `Your average weekly earnings of ${fmt(result.averageWeeklyEarnings)} meet the ${fmt(result.lowerEarningsLimit)}/week Lower Earnings Limit threshold.`
                  : result.ineligibilityReason}
              </p>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl p-4 border border-[#059669]/30 dark:border-[#10B981]/30 bg-[#F0FDF4] dark:bg-[#052e16] text-center">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981] mb-1">
                {result.isOccupationalHigher ? 'Occupational Pay Due' : 'Total SSP Due'}
              </p>
              <p className="text-2xl font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                <AnimatedNumber value={result.recommendedPayAmount} prefix="£" decimals={2} />
              </p>
              <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">
                {result.payableDays} payable {result.payableDays === 1 ? 'day' : 'days'}
              </p>
            </div>

            <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-center">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Daily SSP Rate
              </p>
              <p className="text-2xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                <AnimatedNumber value={result.dailySspRate} prefix="£" decimals={2} />
              </p>
              <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">
                {fmt(result.weeklySspRate)} / {result.qualifyingDaysPerWeek} days
              </p>
            </div>

            <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-center">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Waiting Days
              </p>
              <p className="text-2xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                {result.waitingDays} <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">unpaid</span>
              </p>
              <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">
                {result.isLinkedPeriod ? 'Linked: 0 waiting days' : 'First 3 days unpaid'}
              </p>
            </div>
          </div>

          {/* Occupational Scheme Higher Banner */}
          {result.isOccupationalHigher && (
            <div className="p-4 rounded-xl mb-5 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                You may receive more under your employer's sick pay scheme
              </p>
              <p className="text-2xs text-purple-700 dark:text-purple-300 leading-relaxed">
                Your employer's contractual scheme yields <strong>{fmt(result.totalOccupationalAmount)}</strong> ({fmt(result.occupationalWeeklyPay)}/wk), which is higher than the statutory minimum floor of <strong>{fmt(result.totalSspAmount)}</strong>. Your employer must pay at least the statutory rate, but pays this higher amount under your contract.
              </p>
            </div>
          )}

          {/* Max Weeks Warning if exceeded */}
          {result.isMaxWeeksExceeded && (
            <div className="p-4 rounded-xl mb-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                Maximum 28 Weeks Statutory Duration Reached
              </p>
              <p className="text-2xs leading-relaxed">
                SSP is legally capped at 28 weeks ({result.maxPayableDays} qualifying days) in a single or linked period. Your employer should issue an SSP1 form so you can apply for Employment and Support Allowance (ESA).
              </p>
            </div>
          )}

          {/* Detailed Calculation Breakdown */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Calculation Breakdown
            </p>
            {[
              {
                label: `Statutory Weekly Rate (${result.taxYearLabel})`,
                value: fmt(result.weeklySspRate),
              },
              {
                label: `Daily SSP Rate (${fmt(result.weeklySspRate)} ÷ ${result.qualifyingDaysPerWeek} contracted days)`,
                value: fmt(result.dailySspRate) + '/day',
              },
              {
                label: `Total Qualifying Days Missed`,
                value: `${result.qualifyingDaysOff} days`,
              },
              {
                label: `Unpaid Waiting Days (${result.isLinkedPeriod ? '0 days — Linked period within 8 weeks' : 'First 3 qualifying days'})`,
                value: `${result.waitingDays} days (${fmt(0)})`,
              },
              {
                label: `Payable SSP Days (${result.qualifyingDaysOff} - ${result.waitingDays})`,
                value: `${result.payableDays} days (${result.payableWeeks.toFixed(1)} wks)`,
                bold: true,
              },
              {
                label: `Total Statutory Sick Pay (SSP)`,
                value: fmt(result.totalSspAmount),
                bold: true,
                green: true,
              },
              ...(result.occupationalWeeklyPay > 0
                ? [
                    {
                      label: `Contractual / Occupational Sick Pay (${fmt(result.occupationalWeeklyPay)}/wk × ${result.qualifyingDaysOff} days)`,
                      value: fmt(result.totalOccupationalAmount),
                      bold: result.isOccupationalHigher,
                      highlight: result.isOccupationalHigher,
                    },
                  ]
                : []),
            ].map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-2 px-3 rounded-lg border text-xs ${
                  row.bold
                    ? 'bg-[#F5F5F5] dark:bg-[#111111] border-[#E5E5E5] dark:border-[#2A2A2A] font-bold'
                    : 'bg-white dark:bg-[#171717] border-[#F0F0F0] dark:border-[#222222]'
                }`}
              >
                <span className="text-[#525252] dark:text-[#A3A3A3]">{row.label}</span>
                <span
                  className={`font-black tabular-nums ${
                    row.green
                      ? 'text-[#059669] dark:text-[#10B981]'
                      : row.highlight
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-[#111111] dark:text-[#F5F5F5]'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <ExportActions copyText={copyText} fileName="paywise-statutory-sick-pay" />
        </div>

        {/* 28-Week Allowance Summary Reference */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
              SSP Rules & Eligibility Summary
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs text-[#737373] dark:text-[#888888] uppercase font-bold">Weekly Rate</p>
              <p className="font-black text-[#111111] dark:text-[#F5F5F5] text-sm mt-0.5">{fmt(result.weeklySspRate)} / week</p>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1">Paid through standard PAYE payroll with Tax & NI.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs text-[#737373] dark:text-[#888888] uppercase font-bold">Lower Earnings Limit</p>
              <p className="font-black text-[#111111] dark:text-[#F5F5F5] text-sm mt-0.5">{fmt(result.lowerEarningsLimit)} / week</p>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1">Minimum AWE required before tax to qualify.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs text-[#737373] dark:text-[#888888] uppercase font-bold">Waiting Days</p>
              <p className="font-black text-[#111111] dark:text-[#F5F5F5] text-sm mt-0.5">3 Qualifying Days</p>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1">First 3 working days unpaid unless linked within 8 weeks.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs text-[#737373] dark:text-[#888888] uppercase font-bold">Maximum Limit</p>
              <p className="font-black text-[#111111] dark:text-[#F5F5F5] text-sm mt-0.5">28 Weeks Max</p>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1">After 28 weeks, form SSP1 is provided for ESA/benefits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SickPayCalculator;
