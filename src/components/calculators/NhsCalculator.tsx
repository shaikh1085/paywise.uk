import React, { useState, useMemo } from 'react';
import { NhsInput, StudentLoanPlan } from '../../types';
import { calculateNhsSalary } from '../../utils/calculations';
import { NHS_PAY_BANDS, NHS_HCAS } from '../../config/taxConfig';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { HeartPulse, ArrowUpRight } from 'lucide-react';

export const NhsCalculator: React.FC = () => {
  const [input, setInput] = useState<NhsInput>({
    band: 'band_5',
    pointIndex: 0,
    regionHCAS: 'none',
    optInPension: true,
    studentLoanPlan: 'plan2',
  });

  const selectedBandObj = NHS_PAY_BANDS.find((b) => b.band === input.band) || NHS_PAY_BANDS[3];

  const result = useMemo(() => calculateNhsSalary(input), [input]);
  const retention = result.grossSalary > 0 ? (result.netAnnual / result.grossSalary) * 100 : 0;

  const copyText = `PayWise UK NHS Agenda for Change Calculation:
${result.bandName}
Basic Gross Salary: £${result.basicSalary.toLocaleString('en-GB')}
London HCAS Supplement: £${result.hcasSupplement.toLocaleString('en-GB')}
Total Gross Salary: £${result.grossSalary.toLocaleString('en-GB')}
NHS Pension Contribution (${result.pensionTierRate.toFixed(1)}% Tier): -£${result.pensionDeductionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Income Tax: -£${result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
National Insurance: -£${result.niAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Monthly Take-Home: £${result.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month
Calculated via PayWise UK (https://paywiseuk.co.uk/nhs-salary-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <HeartPulse className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          NHS Agenda for Change Bands
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="nhs-band-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Select NHS Band
            </label>
            <select
              id="nhs-band-select"
              value={input.band}
              onChange={(e) => setInput({ ...input, band: e.target.value, pointIndex: 0 })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {NHS_PAY_BANDS.map((b) => (
                <option key={b.band} value={b.band}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nhs-point-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Experience Step / Point
            </label>
            <select
              id="nhs-point-select"
              value={input.pointIndex}
              onChange={(e) => setInput({ ...input, pointIndex: parseInt(e.target.value, 10) || 0 })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {selectedBandObj.points.map((pt, idx) => (
                <option key={pt.point} value={idx}>
                  {pt.step} — £{pt.salary.toLocaleString('en-GB')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nhs-hcas-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Location / London Weighting (HCAS)
            </label>
            <select
              id="nhs-hcas-select"
              value={input.regionHCAS}
              onChange={(e) => setInput({ ...input, regionHCAS: e.target.value as any })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="none">National / Rest of England (0%)</option>
              <option value="inner_london">Inner London (+20%, min £5,132, max £7,718)</option>
              <option value="outer_london">Outer London (+15%, min £4,313, max £5,436)</option>
              <option value="fringe">Fringe Zone (+5%, min £1,192, max £2,011)</option>
            </select>
          </div>

          <div>
            <label htmlFor="nhs-student-loan" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Student Loan Plan
            </label>
            <select
              id="nhs-student-loan"
              value={input.studentLoanPlan || 'none'}
              onChange={(e) => setInput({ ...input, studentLoanPlan: e.target.value as StudentLoanPlan })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="none">No Student Loan</option>
              <option value="plan1">Plan 1 (Pre-2012)</option>
              <option value="plan2">Plan 2 (2012–2023)</option>
              <option value="plan4">Plan 4 (Scotland)</option>
              <option value="plan5">Plan 5 (Aug 2023+)</option>
              <option value="postgrad">Postgraduate Master’s</option>
            </select>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-[#090e1a] border border-slate-200/80 dark:border-slate-800">
              <input
                type="checkbox"
                id="nhs-pension-opt"
                checked={input.optInPension}
                onChange={(e) => setInput({ ...input, optInPension: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="nhs-pension-opt" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                NHS Pension Scheme Member (Tier {result.pensionTierRate.toFixed(1)}%)
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
              NHS Net Monthly Pay
            </span>
            <span className="text-xs text-slate-400">
              Gross: £{result.grossSalary.toLocaleString('en-GB')}/yr
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netMonthly}
                  prefix="£"
                  decimals={2}
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Net monthly after NHS pension tier ({result.pensionTierRate.toFixed(1)}%), PAYE, & NI
                </span>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Annual Net Pay</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                £{result.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">NHS Pension Deduction</span>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 tabular-nums">
                -£{result.pensionDeductionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">HCAS Supplement</span>
              <p className="text-base sm:text-lg font-black text-cyan-400 mt-0.5 tabular-nums">
                +£{result.hcasSupplement.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            NHS Payroll Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Basic Agenda for Change Pay</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.basicSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {result.hcasSupplement > 0 && (
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span>High Cost Area Supplement (HCAS)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +£{result.hcasSupplement.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>NHS Pension ({result.pensionTierRate.toFixed(1)}% Tier)</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.pensionDeductionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Annual Net Take-Home</span>
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
