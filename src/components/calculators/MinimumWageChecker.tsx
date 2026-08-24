import React, { useState, useMemo } from 'react';
import {
  MinimumWageInput,
  MinimumWageAgeBand,
  MinimumWagePayType,
  TaxYear,
} from '../../types';
import { calculateMinimumWage } from '../../utils/calculations';
import { NATIONAL_MINIMUM_WAGE_RATES } from '../../utils/taxThresholds';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Building2,
  HelpCircle,
  PhoneCall,
  Info,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sliders,
} from 'lucide-react';

export const MinimumWageChecker: React.FC = () => {
  const [input, setInput] = useState<MinimumWageInput>({
    ageBand: '21_and_over',
    payType: 'hourly',
    hourlyRate: 12.50,
    salaryAmount: 24000,
    hoursPerWeek: 37.5,
    isApprentice: false,
    deductionsFromPay: 0,
    deductionFrequency: 'monthly',
    taxYear: '2025_26',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const result = useMemo(() => calculateMinimumWage(input), [input]);

  const handleReset = () => {
    setInput({
      ageBand: '21_and_over',
      payType: 'hourly',
      hourlyRate: 12.50,
      salaryAmount: 24000,
      hoursPerWeek: 37.5,
      isApprentice: false,
      deductionsFromPay: 0,
      deductionFrequency: 'monthly',
      taxYear: '2025_26',
    });
    setShowAdvanced(false);
  };

  const fmt = (n: number | undefined | null) =>
    '£' + (typeof n === 'number' && !isNaN(n) ? n : 0).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const fmtWhole = (n: number | undefined | null) =>
    '£' + Math.round(typeof n === 'number' && !isNaN(n) ? n : 0).toLocaleString('en-GB');

  const copyText = `PayWise UK National Minimum Wage Compliance Check:
Worker Status: ${result.ageBandLabel} (Tax Year ${input.taxYear.replace('_', '/')})
Statutory Minimum Rate: ${fmt(result.applicableMinimumRate)}/hr
Your Effective Hourly Rate: ${fmt(result.effectiveHourlyRateAfterDeductions)}/hr
Status: ${result.isCompliant ? 'COMPLIANT (Paid at or above statutory minimum)' : 'UNDERPAID (Below statutory minimum)'}
${result.isCompliant
  ? `Surplus: +${fmt(result.hourlyDifference)}/hr (+${fmt(result.hourlyDifference * input.hoursPerWeek)}/wk)`
  : `Shortfall: -${fmt(result.weeklyShortfall)}/week (-${fmt(result.annualShortfall)}/year)`
}
Weekly Hours: ${input.hoursPerWeek} hrs | Gross Pay: ${fmt(result.weeklyGrossPay)}/wk
Calculated via PayWise UK (https://www.paywiseuk.co.uk/national-minimum-wage-checker)`;

  const ageBands: { value: MinimumWageAgeBand; label: string; ageHint: string }[] = [
    { value: '21_and_over', label: '21 and Over', ageHint: 'National Living Wage' },
    { value: '18_to_20', label: '18 to 20', ageHint: '18–20 Rate' },
    { value: 'under_18', label: 'Under 18', ageHint: '16–17 Rate' },
    { value: 'apprentice', label: 'Apprentice', ageHint: 'Apprentice Rate' },
  ];

  const payTypes: { value: MinimumWagePayType; label: string }[] = [
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'annual', label: 'Annual Salary' },
    { value: 'monthly', label: 'Monthly Pay' },
    { value: 'weekly', label: 'Weekly Pay' },
  ];

  const taxYears: { value: TaxYear; label: string }[] = [
    { value: '2025_26', label: '2025/26 (Current)' },
    { value: '2024_25', label: '2024/25' },
  ];

  const isCurrent2025 = input.taxYear === '2025_26';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Controls */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            Your Pay &amp; Age Details
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="space-y-5">
          {/* Age Band Selector */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Age Category
              </label>
              <Tooltip
                content="Statutory minimum wage rates depend on your age and whether you are an apprentice in your first year."
                title="Age Band"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ageBands.map((band) => (
                <button
                  key={band.value}
                  type="button"
                  onClick={() =>
                    setInput((p) => ({
                      ...p,
                      ageBand: band.value,
                      isApprentice: band.value === 'apprentice' ? true : p.isApprentice,
                    }))
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    (input.isApprentice && band.value === 'apprentice') ||
                    (!input.isApprentice && input.ageBand === band.value)
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  <p className="text-xs font-bold">{band.label}</p>
                  <p
                    className={`text-2xs ${
                      (input.isApprentice && band.value === 'apprentice') ||
                      (!input.isApprentice && input.ageBand === band.value)
                        ? 'text-emerald-100'
                        : 'text-[#737373] dark:text-[#A3A3A3]'
                    }`}
                  >
                    {band.ageHint}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Apprentice Checkbox */}
          <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={input.isApprentice}
                onChange={(e) =>
                  setInput((p) => ({
                    ...p,
                    isApprentice: e.target.checked,
                    ageBand: e.target.checked ? 'apprentice' : p.ageBand === 'apprentice' ? '21_and_over' : p.ageBand,
                  }))
                }
                className="mt-0.5 h-4 w-4 rounded border-[#D4D4D4] text-[#059669] focus:ring-[#059669] cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5]">
                  I am on a recognized apprenticeship
                </span>
                <p className="text-2xs text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-relaxed">
                  Apprentice rate applies if aged under 19, or aged 19+ in the 1st year of apprenticeship.
                </p>
              </div>
            </label>
          </div>

          {/* Pay Type Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              How are you paid?
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {payTypes.map((pt) => (
                <button
                  key={pt.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, payType: pt.value }))}
                  className={`py-2 px-1 rounded-xl text-2xs font-bold transition-all border text-center ${
                    input.payType === pt.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pay Input Field */}
          {input.payType === 'hourly' ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Your Hourly Pay Rate (£/hr)
                </label>
                <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                  {fmt(input.hourlyRate)}/hr
                </span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">
                  £
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.05"
                  value={input.hourlyRate || ''}
                  onChange={(e) =>
                    setInput((p) => ({ ...p, hourlyRate: parseFloat(e.target.value) || 0 }))
                  }
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                  placeholder="e.g. 12.50"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Gross {input.payType === 'annual' ? 'Annual Salary' : input.payType === 'monthly' ? 'Monthly Pay' : 'Weekly Pay'} (£)
                </label>
                <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                  {fmt(input.salaryAmount)}
                </span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">
                  £
                </span>
                <input
                  type="number"
                  min="0"
                  step={input.payType === 'annual' ? '500' : '50'}
                  value={input.salaryAmount || ''}
                  onChange={(e) =>
                    setInput((p) => ({ ...p, salaryAmount: parseFloat(e.target.value) || 0 }))
                  }
                  className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                  placeholder={input.payType === 'annual' ? 'e.g. 24000' : input.payType === 'monthly' ? 'e.g. 2000' : 'e.g. 460'}
                />
              </div>
            </div>
          )}

          {/* Hours Worked Per Week */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                  Average Hours Worked Per Week
                </label>
                <Tooltip
                  content="Include all hours worked, including mandatory setup, cleaning time, team meetings, and travel between jobs."
                  title="Working Hours"
                />
              </div>
              <span className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
                {input.hoursPerWeek} hrs/wk
              </span>
            </div>
            <input
              type="number"
              min="1"
              max="100"
              step="0.5"
              value={input.hoursPerWeek || ''}
              onChange={(e) =>
                setInput((p) => ({ ...p, hoursPerWeek: parseFloat(e.target.value) || 0 }))
              }
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3.5 py-2 text-[#111111] dark:text-[#F5F5F5] font-bold text-sm focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
              placeholder="37.5"
            />
            <div className="flex justify-between text-2xs text-[#737373] mt-1">
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, hoursPerWeek: 37.5 }))}
                className="hover:text-[#059669] underline cursor-pointer"
              >
                Standard (37.5 hrs)
              </button>
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, hoursPerWeek: 40 }))}
                className="hover:text-[#059669] underline cursor-pointer"
              >
                Full-time (40 hrs)
              </button>
              <button
                type="button"
                onClick={() => setInput((p) => ({ ...p, hoursPerWeek: 20 }))}
                className="hover:text-[#059669] underline cursor-pointer"
              >
                Part-time (20 hrs)
              </button>
            </div>
          </div>

          {/* Tax Year Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Year
            </label>
            <div className="grid grid-cols-2 gap-2">
              {taxYears.map((y) => (
                <button
                  key={y.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, taxYear: y.value }))}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                    input.taxYear === y.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Deductions Section */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#525252] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                Deductions that Reduce Minimum Wage (Uniform, Tools, Accommodation)
              </span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-3 pt-3 border-t border-dashed border-[#E5E5E5] dark:border-[#2A2A2A]">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    What reduces NMW pay?
                  </p>
                  <p className="text-2xs leading-relaxed opacity-90">
                    Mandatory purchases for uniforms, PPE, tools, administration fees, or rent charges exceeding the accommodation offset (£{isCurrent2025 ? '10.66' : '9.99'}/day) reduce your effective pay for minimum wage calculation.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
                    Deductions from Pay (£)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#525252] dark:text-[#A3A3A3] font-bold text-sm">
                        £
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={input.deductionsFromPay || ''}
                        onChange={(e) =>
                          setInput((p) => ({ ...p, deductionsFromPay: parseFloat(e.target.value) || 0 }))
                        }
                        className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-7 pr-3 py-2 text-[#111111] dark:text-[#F5F5F5] font-bold text-sm focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                        placeholder="0.00"
                      />
                    </div>
                    <select
                      value={input.deductionFrequency}
                      onChange={(e) =>
                        setInput((p) => ({
                          ...p,
                          deductionFrequency: e.target.value as 'weekly' | 'monthly' | 'hourly',
                        }))
                      }
                      className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-2 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none"
                    >
                      <option value="monthly">Per Month</option>
                      <option value="weekly">Per Week</option>
                      <option value="hourly">Per Hour</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Results & Compliance Verdict */}
      <div className="lg:col-span-7 space-y-5">
        {/* COMPLIANCE HERO BANNER */}
        <div
          className={`relative rounded-2xl p-6 sm:p-7 border shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition-all ${
            result.isCompliant
              ? 'bg-white dark:bg-[#171717] border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981]'
              : 'bg-white dark:bg-[#171717] border-red-200 dark:border-red-900/60 border-t-4 border-t-red-600 dark:border-t-red-500'
          }`}
        >
          {/* Status Chip */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            {result.isCompliant ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] dark:bg-[#052e16] border border-[#059669]/30 text-[#059669] dark:text-[#10B981] text-xs font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Paid At Or Above National Minimum Wage
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-extrabold uppercase tracking-wider animate-pulse">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                Potential Minimum Wage Underpayment Detected
              </span>
            )}
            <span className="text-2xs text-[#525252] dark:text-[#A3A3A3] font-medium">
              Tax Year {input.taxYear.replace('_', '/')}
            </span>
          </div>

          {/* Rate Comparison Hero Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Your Effective Hourly Rate
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                <AnimatedNumber value={result.effectiveHourlyRateAfterDeductions} prefix="£" decimals={2} />
                <span className="text-sm font-semibold text-[#525252] dark:text-[#A3A3A3]">/hr</span>
              </p>
              {input.deductionsFromPay > 0 && (
                <p className="text-2xs text-[#DC2626] dark:text-[#F87171] mt-0.5">
                  Reduced from {fmt(result.effectiveGrossHourlyRate)}/hr after deductions
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                Statutory Legal Minimum ({result.ageBandLabel})
              </p>
              <p className="text-2xl sm:text-3xl font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                <AnimatedNumber value={result.applicableMinimumRate} prefix="£" decimals={2} />
                <span className="text-sm font-semibold text-[#525252] dark:text-[#A3A3A3]">/hr</span>
              </p>
              <p className="text-2xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
                Legally binding UK statutory floor
              </p>
            </div>
          </div>

          {/* Underpayment / Overpayment Summary Card */}
          {result.isCompliant ? (
            <div className="p-4 rounded-xl bg-[#F0FDF4] dark:bg-[#052e16]/60 border border-[#059669]/20 text-xs text-[#111111] dark:text-[#F5F5F5] space-y-2">
              <div className="flex items-center justify-between font-bold text-[#059669] dark:text-[#10B981]">
                <span>Pay Buffer Above Statutory Minimum:</span>
                <span className="text-sm tabular-nums">+{fmt(result.hourlyDifference)}/hr</span>
              </div>
              <p className="text-2xs text-[#525252] dark:text-[#D1D5DB] leading-relaxed">
                Based on your {input.hoursPerWeek} weekly hours, your pay is currently <strong>+{fmt(result.hourlyDifference * input.hoursPerWeek)} per week</strong> (+{fmt(result.hourlyDifference * input.hoursPerWeek * 52)}/year) above the UK legal minimum rate.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-xs space-y-3">
              <div className="flex items-center justify-between font-extrabold text-red-700 dark:text-red-300">
                <span>Estimated Pay Shortfall:</span>
                <span className="text-base tabular-nums text-red-600 dark:text-red-400">
                  -{fmt(Math.abs(result.hourlyDifference))}/hr
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-[#171717] border border-red-200 dark:border-red-900/40">
                  <p className="text-2xs text-[#737373] dark:text-[#A3A3A3]">Weekly Loss</p>
                  <p className="font-bold text-red-600 dark:text-red-400 tabular-nums">-{fmt(result.weeklyShortfall)}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-[#171717] border border-red-200 dark:border-red-900/40">
                  <p className="text-2xs text-[#737373] dark:text-[#A3A3A3]">Monthly Loss</p>
                  <p className="font-bold text-red-600 dark:text-red-400 tabular-nums">-{fmt(result.monthlyShortfall)}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-[#171717] border border-red-200 dark:border-red-900/40">
                  <p className="text-2xs text-[#737373] dark:text-[#A3A3A3]">Annual Loss</p>
                  <p className="font-bold text-red-600 dark:text-red-400 tabular-nums">-{fmt(result.annualShortfall)}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-red-200 dark:border-red-900/40 space-y-2">
                <p className="text-2xs text-red-900 dark:text-red-200 font-semibold leading-relaxed">
                  Under UK law, employers who fail to pay the National Minimum Wage must pay all arrears owed to the employee plus penalties up to 200% of the underpayment.
                </p>
                <div className="flex flex-wrap gap-2 text-2xs">
                  <a
                    href="https://www.acas.org.uk/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    Call Acas Helpline (0300 123 1100)
                  </a>
                  <a
                    href="https://www.gov.uk/government/organisations/hm-revenue-customs/contact/national-minimum-wage-enquiries-and-complaints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#222222] border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 font-bold hover:bg-red-50 dark:hover:bg-[#2a2a2a] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    HMRC NMW Complaint Form
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Period Pay Breakdown */}
          <div className="mt-5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden text-xs">
            <div className="bg-[#FAFAFA] dark:bg-[#141414] px-4 py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex justify-between">
              <span>Pay Period</span>
              <span className="tabular-nums">Your Gross Pay vs Legal Minimum</span>
            </div>
            <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
              <div className="px-4 py-2 flex justify-between bg-white dark:bg-[#171717]">
                <span className="text-[#525252] dark:text-[#A3A3A3]">Hourly Rate</span>
                <span className="tabular-nums font-bold">
                  {fmt(result.effectiveHourlyRateAfterDeductions)}/hr{' '}
                  <span className="font-normal text-[#737373]">
                    (Min: {fmt(result.applicableMinimumRate)}/hr)
                  </span>
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-white dark:bg-[#171717]">
                <span className="text-[#525252] dark:text-[#A3A3A3]">Weekly Pay ({input.hoursPerWeek} hrs)</span>
                <span className="tabular-nums font-bold">
                  {fmt(result.weeklyGrossPay)}{' '}
                  <span className="font-normal text-[#737373]">
                    (Min: {fmt(result.statutoryWeeklyMinimum)})
                  </span>
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-white dark:bg-[#171717]">
                <span className="text-[#525252] dark:text-[#A3A3A3]">Monthly Pay</span>
                <span className="tabular-nums font-bold">
                  {fmt(result.monthlyGrossPay)}{' '}
                  <span className="font-normal text-[#737373]">
                    (Min: {fmt((result.statutoryWeeklyMinimum * 52) / 12)})
                  </span>
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between bg-white dark:bg-[#171717]">
                <span className="text-[#525252] dark:text-[#A3A3A3]">Annual Equivalent</span>
                <span className="tabular-nums font-bold">
                  {fmt(result.annualGrossPay)}{' '}
                  <span className="font-normal text-[#737373]">
                    (Min: {fmt(result.statutoryAnnualMinimum)})
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ExportActions copyText={copyText} fileName="paywise-minimum-wage-check" />
          </div>
        </div>

        {/* STATUTORY RATES COMPARISON TABLE */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
            Official UK Minimum Wage Rates Table ({input.taxYear.replace('_', '/')})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs uppercase tracking-wider text-[#737373]">
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 px-3">Age / Eligibility</th>
                  <th className="py-2 px-3 text-right">Rate 2025/26</th>
                  <th className="py-2 pl-3 text-right">Rate 2024/25</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {NATIONAL_MINIMUM_WAGE_RATES.map((band) => {
                  const isSelected =
                    (input.isApprentice && band.id === 'apprentice') ||
                    (!input.isApprentice && input.ageBand === band.id);

                  return (
                    <tr
                      key={band.id}
                      className={
                        isSelected
                          ? 'bg-[#F0FDF4] dark:bg-[#052e16] font-bold text-[#059669] dark:text-[#10B981]'
                          : 'text-[#111111] dark:text-[#F5F5F5] hover:bg-[#FAFAFA] dark:hover:bg-[#151515]'
                      }
                    >
                      <td className="py-2.5 pr-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981]" />}
                          {band.label}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[#525252] dark:text-[#A3A3A3] text-2xs">
                        {band.ageDescription}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums whitespace-nowrap font-extrabold">
                        £{band.rate2025_26.toFixed(2)}/hr
                      </td>
                      <td className="py-2.5 pl-3 text-right tabular-nums whitespace-nowrap text-[#737373]">
                        £{band.rate2024_25.toFixed(2)}/hr
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-2xs text-[#737373] mt-3">
            * Statutory rates are set annually by the UK Government following recommendations from the Low Pay Commission and take effect on 1 April each year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimumWageChecker;
