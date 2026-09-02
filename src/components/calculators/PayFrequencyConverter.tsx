import React, { useState, useMemo } from 'react';
import {
  TaxYear,
  TaxRegion,
  StudentLoanPlan,
  PayFrequency,
} from '../../types';
import { calculatePayFrequencies } from '../../utils/calculations';
import { useCalculatorSessionStorage } from '../../hooks/useCalculatorSessionStorage';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import {
  Clock,
  RotateCcw,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  SlidersHorizontal,
} from 'lucide-react';

interface PayFreqState {
  amount: number;
  inputFrequency: 'annual' | 'monthly' | '4weekly' | 'fortnightly' | 'weekly' | 'daily' | 'hourly';
  region: TaxRegion;
  taxYear: TaxYear;
  pensionPercentage: number;
  studentLoanPlan: StudentLoanPlan;
}

export const PayFrequencyConverter: React.FC = () => {
  const [state, setState, resetState] = useCalculatorSessionStorage<PayFreqState>(
    'pay_frequency_converter_v1',
    {
      amount: 40000,
      inputFrequency: 'annual',
      region: 'england_ni',
      taxYear: '2025_26',
      pensionPercentage: 5,
      studentLoanPlan: 'none',
    }
  );

  // Convert input amount to annual gross baseline
  const grossAnnual = useMemo(() => {
    const amt = Math.max(0, state.amount || 0);
    switch (state.inputFrequency) {
      case 'annual':
        return amt;
      case 'monthly':
        return amt * 12;
      case '4weekly':
        return amt * 13;
      case 'fortnightly':
        return amt * 26;
      case 'weekly':
        return amt * 52;
      case 'daily':
        return amt * 260; // 5 days/week * 52 weeks
      case 'hourly':
        return amt * 1950; // 37.5 hrs/week * 52 weeks
      default:
        return amt;
    }
  }, [state.amount, state.inputFrequency]);

  const items = useMemo(() => {
    return calculatePayFrequencies(
      grossAnnual,
      state.region,
      state.taxYear,
      state.pensionPercentage,
      state.studentLoanPlan
    );
  }, [grossAnnual, state.region, state.taxYear, state.pensionPercentage, state.studentLoanPlan]);

  const fmt = (n: number) =>
    '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fmtWhole = (n: number) =>
    '£' + Math.round(n).toLocaleString('en-GB');

  const copyText = `PayWise UK — Pay Frequency Conversion:
Input: ${fmt(state.amount)} (${state.inputFrequency}) -> Annual Gross: ${fmt(grossAnnual)}
--------------------------------------------------
${items
  .map(
    (it) =>
      `${it.label}: Gross ${fmt(it.gross)} | Net Take-Home: ${fmt(it.net)} | Tax: ${fmt(it.incomeTax)} | NI: ${fmt(it.nationalInsurance)}`
  )
  .join('\n')}

Calculated via PayWise UK (https://paywiseuk.vercel.app/pay-frequency-converter)`;

  return (
    <div className="space-y-8">
      {/* Input Configuration Card */}
      <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div>
            <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
              Convert Your Pay Across All UK Frequencies
            </h2>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
              Enter any wage to instantly see equivalent Annual, Monthly, 4-Weekly, Fortnightly, Weekly, Daily, and Hourly pay.
            </p>
          </div>

          <button
            type="button"
            onClick={resetState}
            className="flex items-center gap-1 text-xs text-[#737373] hover:text-[#111111] dark:hover:text-[#F5F5F5] px-2.5 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#303030] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Amount input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
              Pay Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#737373] font-bold text-sm">£</span>
              <input
                type="number"
                min="0"
                step="any"
                value={state.amount || ''}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    amount: Math.max(0, parseFloat(e.target.value) || 0),
                  }))
                }
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] pl-7 pr-3 py-2.5 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
              />
            </div>
          </div>

          {/* Pay Frequency selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
              Input Frequency
            </label>
            <select
              value={state.inputFrequency}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  inputFrequency: e.target.value as PayFreqState['inputFrequency'],
                }))
              }
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] px-3 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
            >
              <option value="annual">Annual (Per Year)</option>
              <option value="monthly">Monthly (Per Month)</option>
              <option value="4weekly">4-Weekly (Every 4 Weeks)</option>
              <option value="fortnightly">Fortnightly (Every 2 Weeks)</option>
              <option value="weekly">Weekly (Per Week)</option>
              <option value="daily">Daily (Per Day / 7.5 hrs)</option>
              <option value="hourly">Hourly (Per Hour)</option>
            </select>
          </div>

          {/* Region selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">
              Tax Region
            </label>
            <select
              value={state.region}
              onChange={(e) =>
                setState((prev) => ({ ...prev, region: e.target.value as TaxRegion }))
              }
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#151515] px-3 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] focus:outline-none"
            >
              <option value="england_ni">England & Northern Ireland</option>
              <option value="scotland">Scotland (Devolved Rates)</option>
              <option value="wales">Wales</option>
            </select>
          </div>
        </div>

        {/* Quick Quick-Switch Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#737373] dark:text-[#A3A3A3]">Quick Salaries:</span>
          {[25000, 35000, 45000, 55000, 75000, 100000].map((sal) => (
            <button
              key={sal}
              type="button"
              onClick={() =>
                setState((prev) => ({ ...prev, amount: sal, inputFrequency: 'annual' }))
              }
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                state.inputFrequency === 'annual' && state.amount === sal
                  ? 'bg-[#059669] text-white border-[#059669]'
                  : 'bg-[#FAFAFA] dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#525252] dark:text-[#D4D4D4] hover:border-[#059669]'
              }`}
            >
              £{sal / 1000}k
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Output Grid & Table */}
      <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div>
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
              Equivalent Pay Rates (Gross vs Net Take-Home)
            </h3>
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
              Annual gross baseline: <strong className="text-[#111111] dark:text-[#F5F5F5]">{fmt(grossAnnual)}</strong> • Standard 37.5h work week / 260 working days
            </p>
          </div>

          <ExportActions
            title="Pay Frequency Conversion Table"
            copyText={copyText}
            variant="compact"
          />
        </div>

        {/* Frequency Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.slice(0, 4).map((it) => (
            <div
              key={it.frequency}
              className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3]">
                {it.label}
              </span>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                  Gross {fmt(it.gross)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex justify-between items-baseline">
                <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                  Net Take-Home:
                </span>
                <span className="text-base font-black text-[#059669] dark:text-[#10B981]">
                  {fmt(it.net)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Full Frequency Conversion Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-left text-[#737373] dark:text-[#A3A3A3]">
                <th className="pb-3 font-bold">Pay Frequency</th>
                <th className="pb-3 text-right font-bold">Gross Pay</th>
                <th className="pb-3 text-right font-bold text-[#059669] dark:text-[#10B981]">Net Take-Home</th>
                <th className="pb-3 text-right font-bold">Income Tax</th>
                <th className="pb-3 text-right font-bold">National Insurance</th>
                <th className="pb-3 text-right font-bold">Pension</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#222222]">
              {items.map((it) => (
                <tr key={it.frequency} className="hover:bg-[#FAFAFA] dark:hover:bg-[#151515] transition-colors">
                  <td className="py-3 px-2 font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {it.label}
                  </td>
                  <td className="py-3 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                    {fmt(it.gross)}
                  </td>
                  <td className="py-3 text-right font-black text-[#059669] dark:text-[#10B981]">
                    {fmt(it.net)}
                  </td>
                  <td className="py-3 text-right text-rose-600 dark:text-rose-400 font-semibold">
                    -{fmt(it.incomeTax)}
                  </td>
                  <td className="py-3 text-right text-rose-600 dark:text-rose-400 font-semibold">
                    -{fmt(it.nationalInsurance)}
                  </td>
                  <td className="py-3 text-right text-[#737373] dark:text-[#A3A3A3]">
                    -{fmt(it.pension)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
