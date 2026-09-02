import React, { useState, useMemo } from 'react';
import { MaternityInput, MaternityLeaveType, TaxYear } from '../../types';
import { calculateMaternityPay } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import { Baby, RotateCcw, Heart, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export const MaternityCalculator: React.FC = () => {
  const [input, setInput] = useState<MaternityInput>({
    leaveType: 'maternity',
    grossWeeklySalary: 600,
    taxYear: '2025_26',
    enhancedPayWeeks: 0,
    enhancedPayPercent: 100,
    sharedParentalWeeks: 37,
  });

  const [showEnhanced, setShowEnhanced] = useState(false);

  const result = useMemo(() => {
    if (!input.grossWeeklySalary || input.grossWeeklySalary <= 0) return null;
    return calculateMaternityPay(input);
  }, [input]);

  const handleReset = () => {
    setInput({
      leaveType: 'maternity',
      grossWeeklySalary: 600,
      taxYear: '2025_26',
      enhancedPayWeeks: 0,
      enhancedPayPercent: 100,
      sharedParentalWeeks: 37,
    });
    setShowEnhanced(false);
  };

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const leaveTypes: { value: MaternityLeaveType; label: string; sub: string; icon: string }[] = [
    { value: 'maternity', label: 'Maternity', sub: 'Up to 52 weeks', icon: '🤱' },
    { value: 'paternity', label: 'Paternity', sub: 'Up to 2 weeks', icon: '👨‍👶' },
    { value: 'adoption', label: 'Adoption', sub: 'Up to 52 weeks', icon: '🏠' },
    { value: 'shared_parental', label: 'Shared Parental', sub: 'Up to 37 weeks', icon: '👨‍👩‍👶' },
  ];

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26' },
    { value: '2026_27', label: '2026/27' },
    { value: '2024_25', label: '2024/25' },
  ];

  const typeColors: Record<string, string> = {
    enhanced: 'bg-purple-100 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    higher_smp: 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/30 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]',
    flat_smp: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    spp: 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/30 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]',
    sap: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    shpp: 'bg-[#F0FDF4] dark:bg-[#052e16] border-[#059669]/30 dark:border-[#10B981]/30 text-[#059669] dark:text-[#10B981]',
    unpaid: 'bg-[#F5F5F5] dark:bg-[#111111] border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#666666]',
  };

  const copyText = result
    ? `PayWise UK — ${input.leaveType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Pay Calculator:
Tax Year: ${result.taxYearLabel}
Weekly Salary (AWE): ${fmt(result.grossWeeklySalary)}
Eligible: ${result.isEligible ? 'Yes' : 'No — below Lower Earnings Limit'}
---
Total Leave: ${result.totalLeaveWeeks} weeks
Total Paid Weeks: ${result.totalPaidWeeks} weeks
Total Pay: ${fmt(result.totalPayAmount)}
Avg Monthly (during paid leave): ${fmt(result.totalMonthlyEquivalent)}
---
Breakdown:
${result.weeklyBreakdown.map(b => `  ${b.weekRange}: ${b.label} — ${fmt(b.weeklyAmount)}/wk × ${b.weeks} wks = ${fmt(b.totalAmount)}`).join('\n')}
Calculated via PayWise UK (https://paywiseuk.vercel.app/maternity-pay-calculator)`
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Baby className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Leave Details
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
          {/* Leave Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Type of Leave
            </label>
            <div className="grid grid-cols-2 gap-2">
              {leaveTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, leaveType: t.value }))}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center flex flex-col gap-0.5 items-center ${
                    input.leaveType === t.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span className="font-black">{t.label}</span>
                  <span className={`text-2xs font-normal ${input.leaveType === t.value ? 'text-white/80' : 'text-[#737373] dark:text-[#888888]'}`}>{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Salary */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Average Weekly Earnings (Gross)
              </label>
              <Tooltip content="Enter your gross weekly salary. For SMP, this is averaged over the 8 weeks before the 15th week before your due date. If paid monthly, divide your monthly gross by 4.33." title="Average Weekly Earnings" />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={input.grossWeeklySalary || ''}
                onChange={(e) => setInput((p) => ({ ...p, grossWeeklySalary: parseFloat(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-16 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 600"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#525252] dark:text-[#A3A3A3] text-xs font-bold">/week</span>
            </div>
            <p className="text-2xs text-[#737373] dark:text-[#888888] mt-1">
              Monthly salary ÷ 4.33 = weekly. E.g. £2,600/mo ÷ 4.33 = £600/wk
            </p>
            {/* Quick monthly salary shortcuts */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {[
                { label: '£25k', weekly: 480 },
                { label: '£30k', weekly: 577 },
                { label: '£35k', weekly: 673 },
                { label: '£40k', weekly: 769 },
                { label: '£50k', weekly: 962 },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, grossWeeklySalary: s.weekly }))}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-bold border transition-all ${
                    input.grossWeeklySalary === s.weekly
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Year */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <select
              value={input.taxYear}
              onChange={(e) => setInput((p) => ({ ...p, taxYear: e.target.value as TaxYear }))}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
            >
              {taxYears.map((y) => (
                <option key={y.value} value={y.value}>{y.label}</option>
              ))}
            </select>
          </div>

          {/* Shared Parental Weeks — only show if shp */}
          {input.leaveType === 'shared_parental' && (
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Weeks of ShPP You Are Taking
                </label>
                <Tooltip content="Up to 37 weeks of Shared Parental Pay is available to split between both parents (after the first 2 weeks of maternity/adoption leave). Enter the number of weeks you personally will take." title="Shared Parental Weeks" />
              </div>
              <input
                type="number"
                min="1"
                max="37"
                step="1"
                value={input.sharedParentalWeeks || ''}
                onChange={(e) => setInput((p) => ({ ...p, sharedParentalWeeks: parseInt(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 37"
              />
            </div>
          )}

          {/* Enhanced Pay Toggle — only for maternity */}
          {input.leaveType === 'maternity' && (
            <>
              <button
                type="button"
                onClick={() => setShowEnhanced((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-bold text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]/50 transition-all"
              >
                <span>Employer Enhanced Pay (Optional)</span>
                {showEnhanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showEnhanced && (
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex items-center gap-1 mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">Enhanced Pay Weeks</label>
                      <Tooltip content="How many weeks does your employer pay enhanced (above statutory) maternity pay? Check your employment contract." title="Enhanced Weeks" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="52"
                      step="1"
                      value={input.enhancedPayWeeks || ''}
                      onChange={(e) => setInput((p) => ({ ...p, enhancedPayWeeks: parseInt(e.target.value) || 0 }))}
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                      placeholder="e.g. 12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">Enhanced Pay Rate (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={input.enhancedPayPercent || ''}
                        onChange={(e) => setInput((p) => ({ ...p, enhancedPayPercent: parseFloat(e.target.value) || 0 }))}
                        className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 pr-8 py-2.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                        placeholder="100"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#525252] dark:text-[#A3A3A3] text-xs font-bold">%</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[100, 75, 50].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setInput((prev) => ({ ...prev, enhancedPayPercent: p }))}
                          className={`px-2.5 py-1 rounded-lg text-2xs font-bold border transition-all ${
                            input.enhancedPayPercent === p
                              ? 'bg-[#059669] text-white border-[#059669]'
                              : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#A3A3A3]'
                          }`}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-4">
        {result ? (
          <>
            {/* Eligibility + Summary Card */}
            <div className={`relative rounded-2xl border-t-4 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] ${result.isEligible ? 'border-t-[#059669] dark:border-t-[#10B981]' : 'border-t-amber-500'}`}>

              {/* Eligibility notice */}
              {!result.isEligible && (
                <div className="flex items-start gap-3 p-4 rounded-xl mb-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-amber-700 dark:text-amber-300">May not qualify for statutory pay</p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                      Your average weekly earnings (£{result.grossWeeklySalary.toFixed(2)}) are below the Lower Earnings Limit of £{result.lowerEarningsLimit}/week for {result.taxYearLabel}. You may still qualify for Maternity Allowance from the DWP.
                    </p>
                  </div>
                </div>
              )}

              {/* Key totals */}
              <div className="flex items-center gap-2 mb-5">
                <Heart className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                  Total Statutory Pay Summary
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Total Pay', value: result.totalPayAmount, large: true },
                  { label: 'Paid Weeks', value: result.totalPaidWeeks, prefix: '', suffix: ' wks', isWeeks: true },
                  { label: 'Avg Monthly', value: result.totalMonthlyEquivalent, large: false },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] text-center">
                    <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">{item.label}</p>
                    {item.isWeeks ? (
                      <p className="text-xl font-black text-[#111111] dark:text-[#F5F5F5]">{item.value}<span className="text-sm"> wks</span></p>
                    ) : (
                      <p className="text-xl font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                        <AnimatedNumber value={item.value} prefix="£" decimals={2} />
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Week-by-week breakdown */}
              <div className="space-y-2 mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
                  Pay Breakdown
                </p>
                {result.weeklyBreakdown.map((phase, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg border text-xs ${typeColors[phase.type] || ''}`}
                  >
                    <div>
                      <p className="font-bold">{phase.label}</p>
                      <p className="text-2xs opacity-80 mt-0.5">{phase.weekRange} ({phase.weeks} weeks)</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="font-black">{phase.weeklyAmount > 0 ? fmt(phase.weeklyAmount) + '/wk' : 'Unpaid'}</p>
                      {phase.totalAmount > 0 && <p className="text-2xs opacity-80">{fmt(phase.totalAmount)} total</p>}
                    </div>
                  </div>
                ))}
              </div>

              <ExportActions copyText={copyText} fileName="paywise-maternity-pay" />
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <Baby className="w-8 h-8 text-[#E5E5E5] dark:text-[#2A2A2A] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#525252] dark:text-[#A3A3A3]">Enter your weekly earnings to calculate your statutory pay.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaternityCalculator;
