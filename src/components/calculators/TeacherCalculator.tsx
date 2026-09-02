import React, { useState, useMemo } from 'react';
import { TeacherInput, StudentLoanPlan } from '../../types';
import { calculateTeacherSalary } from '../../utils/calculations';
import { TEACHER_PAY_SCALES } from '../../config/taxConfig';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export const TeacherCalculator: React.FC = () => {
  const [input, setInput] = useState<TeacherInput>({
    category: 'Main',
    point: 'M3',
    region: 'england',
    optInPension: true,
    studentLoanPlan: 'plan2',
  });

  const selectedCategoryScales = TEACHER_PAY_SCALES.find((s) => s.category === input.category) || TEACHER_PAY_SCALES[0];

  const result = useMemo(() => calculateTeacherSalary(input), [input]);
  const retention = result.grossSalary > 0 ? (result.netAnnual / result.grossSalary) * 100 : 0;

  const copyText = `PayWise UK Teacher Pay Calculation:
Scale: ${result.scaleTitle}
Gross Annual Salary: £${result.grossSalary.toLocaleString('en-GB')}
Teachers’ Pension (${result.pensionTierRate.toFixed(1)}%): -£${result.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Income Tax: -£${result.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
National Insurance: -£${result.niAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Estimated Monthly Take-Home: £${result.netMonthly.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month
Calculated via PayWise UK (https://paywiseuk.vercel.app/teacher-salary-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Teacher Pay Scale Details
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="teacher-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Pay Range Category
            </label>
            <select
              id="teacher-category"
              value={input.category}
              onChange={(e) => {
                const newCat = e.target.value as any;
                const catObj = TEACHER_PAY_SCALES.find((s) => s.category === newCat) || TEACHER_PAY_SCALES[0];
                setInput({ ...input, category: newCat, point: catObj.points[0].point });
              }}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Main">Main Pay Range (MPR: M1–M6)</option>
              <option value="Upper">Upper Pay Range (UPR: U1–U3)</option>
              <option value="Leadership">Leadership Range (L1–L43)</option>
            </select>
          </div>

          <div>
            <label htmlFor="teacher-point" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Pay Scale Point
            </label>
            <select
              id="teacher-point"
              value={input.point}
              onChange={(e) => setInput({ ...input, point: e.target.value })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {selectedCategoryScales.points.map((p) => (
                <option key={p.point} value={p.point}>
                  {p.point}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="teacher-region" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Location / London Weighting
            </label>
            <select
              id="teacher-region"
              value={input.region}
              onChange={(e) => setInput({ ...input, region: e.target.value as any })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="england">Rest of England (Standard National)</option>
              <option value="innerLondon">Inner London</option>
              <option value="outerLondon">Outer London</option>
              <option value="londonFringe">London Fringe</option>
            </select>
          </div>

          <div>
            <label htmlFor="teacher-loan" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Student Loan Plan
            </label>
            <select
              id="teacher-loan"
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
                id="teacher-pension-opt"
                checked={input.optInPension}
                onChange={(e) => setInput({ ...input, optInPension: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="teacher-pension-opt" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Teachers’ Pension Scheme (Tier {result.pensionTierRate.toFixed(1)}%)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Teacher Net Monthly Pay
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] tabular-nums">
              Gross: £{result.grossSalary.toLocaleString('en-GB')}/yr
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
                <ArrowUpRight className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Net monthly after TPS tier ({result.pensionTierRate.toFixed(1)}%), PAYE tax, & NI
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Annual Net Pay</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.netAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Pension Contribution</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                -£{result.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Scale Pay</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.grossSalary.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Teachers’ Payroll Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Gross Scale Pay ({result.scaleTitle})</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.grossSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Teachers’ Pension ({result.pensionTierRate.toFixed(1)}%)</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.pensionAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Income Tax & Class 1 NI</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{(result.incomeTaxAnnual + result.niAnnual).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
