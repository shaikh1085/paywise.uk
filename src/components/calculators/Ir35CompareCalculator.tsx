import React, { useState, useMemo } from 'react';
import { Ir35CompareInput, TaxRegion } from '../../types';
import { calculateIr35Compare } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  Briefcase,
  Building2,
  Building,
  TrendingUp,
  Scale,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const Ir35CompareCalculator: React.FC = () => {
  const [input, setInput] = useState<Ir35CompareInput>({
    dayRate: 500,
    workingDaysPerYear: 220,
    taxCode: '1257L',
    region: 'england_ni',
    umbrellaFeePerWeek: 25,
    pensionPercent: 0,
    directorSalary: 12570,
    annualBusinessExpenses: 2400,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const result = useMemo(() => {
    return calculateIr35Compare(input);
  }, [input]);

  const copyText = `PayWise UK Inside vs Outside IR35 Comparison:
Contract Day Rate: £${input.dayRate}/day | Days/Year: ${input.workingDaysPerYear}
Total Gross Contract Value: £${result.contractGrossAnnual.toLocaleString('en-GB')}

=== OUTSIDE IR35 (Limited Company) ===
- Company Turnover: £${result.outside.turnoverAnnual.toLocaleString('en-GB')}
- Business Expenses: -£${result.outside.allowableExpenses.toLocaleString('en-GB')}
- Director Salary: £${result.outside.directorSalary.toLocaleString('en-GB')}
- Corporation Tax: -£${result.outside.corporationTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${result.outside.corporationTaxEffectiveRate.toFixed(1)}%)
- Dividend Tax: -£${result.outside.dividendTaxTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Net Take-Home Pay: £${result.outside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (£${result.outside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
- Retention Rate: ${result.outside.effectiveRetentionRate.toFixed(1)}%

=== INSIDE IR35 (Deemed Employment / Umbrella) ===
- Contract Assignment Value: £${result.inside.contractGrossAnnual.toLocaleString('en-GB')}
- Umbrella Margin: -£${result.inside.umbrellaFeesAnnual.toLocaleString('en-GB')}
- Employer NI (15%): -£${result.inside.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Apprenticeship Levy (0.5%): -£${result.inside.apprenticeshipLevyAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- PAYE Income Tax: -£${result.inside.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Employee NI: -£${result.inside.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
- Net Take-Home Pay: £${result.inside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/yr (£${result.inside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo)
- Retention Rate: ${result.inside.takeHomePercentage.toFixed(1)}%

=== THE VERDICT ===
Outside IR35 delivers £${result.comparison.annualDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} more per year (+£${result.comparison.monthlyDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month), giving an extra ${result.comparison.retentionDifferencePercent.toFixed(1)}% contract retention.
Calculated via PayWise UK (https://www.paywiseuk.co.uk/inside-vs-outside-ir35-calculator)`;

  return (
    <div className="space-y-8">
      {/* Top Input Control Bar */}
      <div className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Scale className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Contract Rate &amp; Working Pattern Inputs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Day Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="day-rate-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Day Rate (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{input.dayRate}/day
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-sm">£</span>
              <input
                id="day-rate-input"
                type="number"
                min="50"
                max="10000"
                step="25"
                value={input.dayRate || ''}
                onChange={(e) => setInput({ ...input, dayRate: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-7 pr-3 py-2.5 text-sm font-black text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                placeholder="500"
              />
            </div>
          </div>

          {/* Working Days per Year */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="working-days-input" className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Days Worked / Year
              </label>
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                ~{Math.round((input.workingDaysPerYear / 5) * 10) / 10} wks
              </span>
            </div>
            <input
              id="working-days-input"
              type="number"
              min="20"
              max="365"
              step="5"
              value={input.workingDaysPerYear || ''}
              onChange={(e) => setInput({ ...input, workingDaysPerYear: parseInt(e.target.value, 10) || 0 })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3.5 py-2.5 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
              placeholder="220"
            />
          </div>

          {/* Tax Region Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              Tax Region
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setInput({ ...input, region: 'england_ni' })}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border text-center ${
                  input.region === 'england_ni'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                }`}
              >
                England/NI
              </button>
              <button
                type="button"
                onClick={() => setInput({ ...input, region: 'wales' })}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border text-center ${
                  input.region === 'wales'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                }`}
              >
                Wales
              </button>
              <button
                type="button"
                onClick={() => setInput({ ...input, region: 'scotland' })}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border text-center ${
                  input.region === 'scotland'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                }`}
              >
                Scotland
              </button>
            </div>
          </div>

          {/* Total Contract Annual Badge */}
          <div className="p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-col justify-center">
            <span className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Gross Contract Turnover
            </span>
            <div className="text-lg sm:text-xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums mt-0.5">
              £{result.contractGrossAnnual.toLocaleString('en-GB')}
              <span className="text-2xs text-[#737373] font-normal ml-1">/ year</span>
            </div>
          </div>
        </div>

        {/* Advanced Toggles */}
        <div className="mt-4 pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
          >
            {showAdvanced ? 'Hide advanced settings' : 'Adjust umbrella fees, company expenses & director salary →'}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 pt-3 border-t border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] animate-fadeIn text-xs">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Umbrella Fee (£/wk)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={input.umbrellaFeePerWeek}
                  onChange={(e) => setInput({ ...input, umbrellaFeePerWeek: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Ltd Annual Expenses (£)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  step="500"
                  value={input.annualBusinessExpenses}
                  onChange={(e) => setInput({ ...input, annualBusinessExpenses: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">
                  Director Salary (£/yr)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100000"
                  step="500"
                  value={input.directorSalary}
                  onChange={(e) => setInput({ ...input, directorSalary: parseFloat(e.target.value) || 0 })}
                  className="block w-full rounded-lg border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] px-3 py-1.5 text-xs font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Hero Header Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-[#111111] via-[#1A1A1A] to-[#111111] dark:from-[#0F0F0F] dark:via-[#171717] dark:to-[#0A0A0A] p-6 text-white border border-[#2A2A2A] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Contractor Take-Home Pay Verdict
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Outside IR35 yields <span className="text-[#10B981]">£{result.comparison.annualDifference.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} more</span> per year
            </h3>
            <p className="text-xs text-[#D4D4D4]">
              That is an additional <strong className="text-white">£{result.comparison.monthlyDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month</strong> (+{result.comparison.retentionDifferencePercent.toFixed(1)}% extra contract retention) compared to working inside IR35 via an umbrella company.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 dark:bg-white/5 px-4 py-3 rounded-xl border border-white/10 shrink-0">
            <div className="text-right">
              <span className="text-2xs uppercase text-[#A3A3A3] block font-bold">Retention Delta</span>
              <span className="text-2xl font-black text-[#10B981] tabular-nums">
                +{result.comparison.retentionDifferencePercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO SIDE-BY-SIDE RESULT PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* PANEL 1: OUTSIDE IR35 (LTD COMPANY) */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border-2 border-[#059669]/60 dark:border-[#10B981]/50 p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#059669] text-white text-2xs font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Highest Retention
          </div>

          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Building className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            <div>
              <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                Outside IR35 (Ltd Company)
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3]">
                Director salary + Corporation Tax + Dividend profit extraction
              </p>
            </div>
          </div>

          {/* Hero Numbers */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block">
              Estimated Net Annual Take-Home
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#059669] dark:text-[#10B981] tracking-tight tabular-nums">
              <AnimatedNumber
                value={result.outside.netTakeHomeAnnual}
                prefix="£"
                decimals={2}
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Monthly In Pocket: <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.outside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span>
              <span className="font-extrabold text-[#059669] dark:text-[#10B981]">{result.outside.effectiveRetentionRate.toFixed(1)}% retained</span>
            </div>
          </div>

          {/* Outside Deductions Breakdown */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Ltd Company Tax &amp; Income Waterfall
            </h4>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Gross Invoiced Turnover</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                £{result.outside.turnoverAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Allowable Business Expenses</span>
              <span className="font-medium text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                -£{result.outside.allowableExpenses.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Tax-Efficient Director Salary</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                £{result.outside.directorSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">
                Corporation Tax ({result.outside.corporationTaxEffectiveRate.toFixed(1)}%)
              </span>
              <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.outside.corporationTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Available Post-CT Dividends</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                £{result.outside.postTaxProfitAvailableForDividends.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Personal Dividend Tax</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.outside.dividendTaxTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {result.outside.personalTaxOnSalary > 0 && (
              <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="text-[#525252] dark:text-[#A3A3A3]">Tax on Salary (PA Taper)</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                  -£{result.outside.personalTaxOnSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2.5 bg-[#059669]/10 dark:bg-[#10B981]/10 px-3 rounded-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
              <span className="text-[#059669] dark:text-[#10B981]">Total Net In Pocket</span>
              <span className="text-[#059669] dark:text-[#10B981] font-black text-sm tabular-nums">
                £{result.outside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 2: INSIDE IR35 (DEEMED EMPLOYMENT / UMBRELLA) */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Briefcase className="w-5 h-5 text-[#525252] dark:text-[#A3A3A3]" />
            <div>
              <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                Inside IR35 (Umbrella PAYE)
              </h3>
              <p className="text-2xs text-[#525252] dark:text-[#A3A3A3]">
                Deemed employment with Employer NI (15%), Apprenticeship Levy &amp; PAYE
              </p>
            </div>
          </div>

          {/* Hero Numbers */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block">
              Estimated Net Annual Take-Home
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight tabular-nums">
              <AnimatedNumber
                value={result.inside.netTakeHomeAnnual}
                prefix="£"
                decimals={2}
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
              <span>Monthly In Pocket: <strong className="text-[#111111] dark:text-[#F5F5F5]">£{result.inside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span>
              <span className="font-extrabold text-[#737373]">{result.inside.takeHomePercentage.toFixed(1)}% retained</span>
            </div>
          </div>

          {/* Inside Deductions Breakdown */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Umbrella &amp; Employment Tax Deductions
            </h4>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Contract Assignment Value</span>
              <span className="font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                £{result.inside.contractGrossAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Umbrella Margin Fees</span>
              <span className="font-medium text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.inside.umbrellaFeesAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Employer NI (15% above £5k)</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.inside.employerNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Apprenticeship Levy (0.5%)</span>
              <span className="font-medium text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.inside.apprenticeshipLevyAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">PAYE Income Tax</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.inside.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Employee National Insurance</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                -£{result.inside.employeeNiAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2.5 bg-[#FAFAFA] dark:bg-[#151515] px-3 rounded-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
              <span className="text-[#525252] dark:text-[#A3A3A3]">Total Net In Pocket</span>
              <span className="font-black text-sm tabular-nums">
                £{result.inside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary Table */}
      <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
        <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Key Comparison Metrics (Same Day Rate: £{input.dayRate})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                <th className="text-left py-2.5 font-bold uppercase tracking-wider text-2xs">Metric</th>
                <th className="text-right py-2.5 font-bold uppercase tracking-wider text-2xs text-[#059669] dark:text-[#10B981]">Outside IR35 (Ltd)</th>
                <th className="text-right py-2.5 font-bold uppercase tracking-wider text-2xs">Inside IR35 (PAYE)</th>
                <th className="text-right py-2.5 font-bold uppercase tracking-wider text-2xs text-[#059669] dark:text-[#10B981]">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
              <tr>
                <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Annual Net Take-Home</td>
                <td className="py-2.5 text-right font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                  £{result.outside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.inside.netTakeHomeAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                  +£{result.comparison.annualDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Monthly Net Take-Home</td>
                <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                  £{result.outside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-bold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                  £{result.inside.netTakeHomeMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                  +£{result.comparison.monthlyDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Daily Equivalent Net Pay</td>
                <td className="py-2.5 text-right font-semibold text-[#059669] dark:text-[#10B981] tabular-nums">
                  £{result.outside.netTakeHomeDaily.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-semibold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                  £{result.inside.netTakeHomeDaily.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                  +£{result.comparison.dailyDifference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Effective Retention Rate</td>
                <td className="py-2.5 text-right font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                  {result.outside.effectiveRetentionRate.toFixed(1)}%
                </td>
                <td className="py-2.5 text-right font-bold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                  {result.inside.takeHomePercentage.toFixed(1)}%
                </td>
                <td className="py-2.5 text-right font-black text-[#059669] dark:text-[#10B981] tabular-nums">
                  +{result.comparison.retentionDifferencePercent.toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-[#111111] dark:text-[#F5F5F5]">Total Tax &amp; Employment Deductions</td>
                <td className="py-2.5 text-right font-semibold text-rose-600 dark:text-rose-400 tabular-nums">
                  £{result.outside.totalCombinedTax.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-semibold text-rose-600 dark:text-rose-400 tabular-nums">
                  £{result.inside.totalDeductionsAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 text-right font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                  -£{Math.abs(result.inside.totalDeductionsAnnual - result.outside.totalCombinedTax).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export & Actions */}
      <ExportActions
        textToCopy={copyText}
        csvData={[
          { Metric: 'Day Rate', Value: `£${input.dayRate}` },
          { Metric: 'Working Days / Year', Value: `${input.workingDaysPerYear}` },
          { Metric: 'Total Gross Contract Turnover', Value: `£${result.contractGrossAnnual.toFixed(2)}` },
          { Metric: 'Outside IR35 Net Annual Take-Home', Value: `£${result.outside.netTakeHomeAnnual.toFixed(2)}` },
          { Metric: 'Outside IR35 Net Monthly Take-Home', Value: `£${result.outside.netTakeHomeMonthly.toFixed(2)}` },
          { Metric: 'Outside IR35 Retention %', Value: `${result.outside.effectiveRetentionRate.toFixed(1)}%` },
          { Metric: 'Inside IR35 Net Annual Take-Home', Value: `£${result.inside.netTakeHomeAnnual.toFixed(2)}` },
          { Metric: 'Inside IR35 Net Monthly Take-Home', Value: `£${result.inside.netTakeHomeMonthly.toFixed(2)}` },
          { Metric: 'Inside IR35 Retention %', Value: `${result.inside.takeHomePercentage.toFixed(1)}%` },
          { Metric: 'Annual Difference (Outside - Inside)', Value: `£${result.comparison.annualDifference.toFixed(2)}` },
          { Metric: 'Monthly Difference', Value: `£${result.comparison.monthlyDifference.toFixed(2)}` },
          { Metric: 'Retention Gain %', Value: `+${result.comparison.retentionDifferencePercent.toFixed(1)}%` },
        ]}
        fileName={`paywise-inside-vs-outside-ir35-${input.dayRate}day`}
        title="Inside vs Outside IR35 Comparison"
      />
    </div>
  );
};
