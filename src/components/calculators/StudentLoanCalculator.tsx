import React, { useState, useMemo } from 'react';
import { StudentLoanPlan } from '../../types';
import { calculateStudentLoan } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import { GraduationCap, Info, ArrowUpRight } from 'lucide-react';

export const StudentLoanCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(38000);
  const [plan, setPlan] = useState<StudentLoanPlan>('plan2');

  const result = useMemo(() => calculateStudentLoan({ annualSalary: salary, plan }), [salary, plan]);

  const copyText = `PayWise UK Student Loan Repayment Calculation:
Annual Salary: £${salary.toLocaleString('en-GB')}
Plan: ${result.planName}
Threshold: £${result.threshold.toLocaleString('en-GB')}/yr (${result.repaymentRatePercent}% rate)
Monthly Repayment: £${result.totalStudentLoanMonthly.toFixed(2)}/mo
Annual Repayment: £${result.totalStudentLoanAnnual.toFixed(2)}/yr
Calculated via PayWise UK (https://paywiseuk.co.uk/student-loan-repayment-calculator)`;

  const comparisonPlans: { id: StudentLoanPlan; label: string; threshold: string; rate: string }[] = [
    { id: 'plan1', label: 'Plan 1 (Pre-2012 / NI)', threshold: '£24,990', rate: '9%' },
    { id: 'plan2', label: 'Plan 2 (2012–2023 England/Wales)', threshold: '£27,295', rate: '9%' },
    { id: 'plan4', label: 'Plan 4 (Scotland)', threshold: '£31,395', rate: '9%' },
    { id: 'plan5', label: 'Plan 5 (New Aug 2023+ England)', threshold: '£25,000', rate: '9%' },
    { id: 'postgrad', label: 'Postgraduate Loan', threshold: '£21,000', rate: '6%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Loan Parameters
        </h2>

        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="student-salary-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Annual Gross Salary (£)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{(salary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="student-salary-input"
                min="0"
                step="500"
                value={salary || ''}
                onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label htmlFor="student-plan-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Select Your Repayment Plan
            </label>
            <select
              id="student-plan-select"
              value={plan}
              onChange={(e) => setPlan(e.target.value as StudentLoanPlan)}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="plan1">Plan 1 (Courses started 1998–2011 / NI)</option>
              <option value="plan2">Plan 2 (Courses started Sept 2012 – July 2023)</option>
              <option value="plan4">Plan 4 (Scottish students funded via SAAS)</option>
              <option value="plan5">Plan 5 (Courses started from 1 August 2023)</option>
              <option value="postgrad">Postgraduate Master’s / PhD Loan only</option>
              <option value="plan2_and_postgrad">Plan 2 + Postgraduate Loan (Combined)</option>
              <option value="plan1_and_postgrad">Plan 1 + Postgraduate Loan (Combined)</option>
              <option value="plan4_and_postgrad">Plan 4 + Postgraduate Loan (Combined)</option>
              <option value="plan5_and_postgrad">Plan 5 + Postgraduate Loan (Combined)</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              How repayment works:
            </span>
            <p>{result.explanation}</p>
          </div>
        </div>
      </div>

      {/* RIGHT: 3D Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#0f1b33] to-[#0a101f] text-white p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] border border-emerald-500/30">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Estimated Student Loan Deduction
          </span>

          <div className="space-y-1 mb-6">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-baseline gap-1">
              <AnimatedNumber
                value={result.totalStudentLoanMonthly}
                prefix="£"
                decimals={2}
              />
              <span className="text-lg font-semibold text-slate-400">/month</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Total annual deduction:{' '}
                <strong className="text-emerald-400 font-bold">
                  £{result.totalStudentLoanAnnual.toFixed(2)}/year
                </strong>{' '}
                (approx. £{result.weeklyRepayment.toFixed(2)}/week)
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block">Repayment Threshold</span>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 tabular-nums">
                £{result.threshold.toLocaleString('en-GB')}/yr
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block">Rate Above Threshold</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                {result.repaymentRatePercent}%
              </p>
            </div>
          </div>
        </div>

        {/* Plan Comparison Table */}
        <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            UK Student Loan Plan Thresholds (2025/2026)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-500 uppercase tracking-wider text-2xs">
                  <th className="pb-2.5 pr-2">Plan</th>
                  <th className="pb-2.5 px-2">Annual Threshold</th>
                  <th className="pb-2.5 pl-2 text-right">Repayment Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {comparisonPlans.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 pr-2 font-medium text-slate-900 dark:text-white">{p.label}</td>
                    <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-semibold">{p.threshold}</td>
                    <td className="py-2.5 pl-2 text-right font-bold text-emerald-600 dark:text-emerald-400">{p.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
