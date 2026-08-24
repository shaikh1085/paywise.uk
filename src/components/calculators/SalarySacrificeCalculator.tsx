import React, { useState, useMemo, useEffect } from 'react';
import { SalarySacrificeInput } from '../../types';
import { calculateSalarySacrifice } from '../../utils/calculations';
import { useTaxToast } from '../../context/ToastContext';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Percent, ArrowUpRight } from 'lucide-react';

export const SalarySacrificeCalculator: React.FC = () => {
  const [input, setInput] = useState<SalarySacrificeInput>({
    currentSalary: 55000,
    monthlySacrifice: 400,
    benefitType: 'ev_car',
    currentPensionPercent: 5,
  });

  const { notifySalaryChange } = useTaxToast();
  const result = useMemo(() => calculateSalarySacrifice(input), [input]);

  useEffect(() => {
    if (input.currentSalary > 0) {
      notifySalaryChange(input.currentSalary);
    }
  }, [input.currentSalary, notifySalaryChange]);

  const copyText = `PayWise UK Salary Sacrifice Calculation:
Original Gross Salary: £${(input.currentSalary || 0).toLocaleString('en-GB')}
Monthly Sacrifice: £${(input.monthlySacrifice || 0).toLocaleString('en-GB')} (£${(result.annualSacrifice || 0).toLocaleString('en-GB')}/yr)
Estimated Annual Tax & NI Saved: £${(result.totalAnnualTaxSavings || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
True Net Cost to Employee: £${(result.monthlyTakeHomeDrop || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month (Saves ${(result.effectiveMonthlySavingsRate || 0).toFixed(1)}% in tax relief)
Calculated via PayWise UK (https://paywiseuk.co.uk/salary-sacrifice-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: 3D Inputs */}
      <div className="lg:col-span-5 relative rounded-3xl bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Sacrifice Scheme Parameters
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="current-salary-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Current Gross Annual Salary (£)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{(input.currentSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="current-salary-input"
                min="0"
                value={input.currentSalary || ''}
                onChange={(e) => setInput({ ...input, currentSalary: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-3 font-extrabold text-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label htmlFor="benefit-type-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Benefit Scheme
            </label>
            <select
              id="benefit-type-select"
              value={input.benefitType}
              onChange={(e) => setInput({ ...input, benefitType: e.target.value as any })}
              className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ev_car">Electric Vehicle (EV) Car Lease</option>
              <option value="pension">Pension Additional Contribution</option>
              <option value="cycle_to_work">Cycle to Work Scheme</option>
              <option value="nursery">Workplace Nursery / Childcare</option>
              <option value="tech_scheme">Tech Scheme (Laptop, Phone)</option>
              <option value="other">Other Salary Sacrifice Scheme</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="monthly-sacrifice-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Monthly Sacrifice Amount (£/month)
              </label>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                £{(input.monthlySacrifice || 0).toLocaleString('en-GB')}/mo
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold text-lg">£</span>
              <input
                type="number"
                id="monthly-sacrifice-input"
                min="0"
                value={input.monthlySacrifice || ''}
                onChange={(e) => setInput({ ...input, monthlySacrifice: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-[#090e1a] pl-9 pr-4 py-2.5 font-bold text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: 3D Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#0f1b33] to-[#0a101f] text-white p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] border border-emerald-500/30">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            True Real Cost in Take-Home Pay
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-baseline gap-1">
                <AnimatedNumber
                  value={result.monthlyTakeHomeDrop}
                  prefix="£"
                  decimals={2}
                />
                <span className="text-lg font-semibold text-slate-400">/month</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  For a £{input.monthlySacrifice}/mo package, your net pay only drops by £{result.monthlyTakeHomeDrop.toFixed(2)}
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveMonthlySavingsRate}
                size={104}
                strokeWidth={9}
                label="Tax Relief"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-800">
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Annual Tax & NI Saved</span>
              <p className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 tabular-nums">
                £{result.totalAnnualTaxSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Monthly Net Saving</span>
              <p className="text-base sm:text-lg font-black text-cyan-400 mt-0.5 tabular-nums">
                £{(input.monthlySacrifice - result.monthlyTakeHomeDrop).toFixed(2)}/mo
              </p>
            </div>

            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-slate-400 font-bold block truncate">Tax Relief Rate</span>
              <p className="text-base sm:text-lg font-black text-white mt-0.5 tabular-nums">
                {result.effectiveMonthlySavingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-[#0d1424] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Before vs After Sacrifice Comparison
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Original Gross Salary</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{input.currentSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>Annual Salary Sacrificed</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                -£{result.annualSacrifice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span>New Adjusted Gross Salary</span>
              <span className="font-bold text-slate-900 dark:text-white">
                £{result.newSalary.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 rounded-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-emerald-900 dark:text-emerald-300">Annual Tax & NI Discount</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                +£{result.totalAnnualTaxSavings.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
