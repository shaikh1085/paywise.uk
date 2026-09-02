import React, { useState, useMemo } from 'react';
import { TaxCodeInput, TaxYear } from '../../types';
import { calculateTaxCodeInterpretation } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

const COMMON_TAX_CODES = [
  { code: '1257L', label: 'Standard (1257L)' },
  { code: 'BR', label: 'Basic Rate (BR)' },
  { code: 'S1257L', label: 'Scotland (S1257L)' },
  { code: 'C1257L', label: 'Wales (C1257L)' },
  { code: '0T', label: 'Zero Allowance (0T)' },
  { code: '1383M', label: 'Marriage Recipient (1383M)' },
  { code: '1131N', label: 'Marriage Transfer (1131N)' },
  { code: 'K450', label: 'Negative Allowance (K450)' },
  { code: 'D0', label: 'Higher Rate (D0)' },
  { code: 'NT', label: 'No Tax (NT)' },
];

export const TaxCodeCalculator: React.FC = () => {
  const [input, setInput] = useState<TaxCodeInput>({
    taxCode: '1257L',
    annualSalary: 35000,
    taxYear: '2025_26',
  });

  const result = useMemo(() => calculateTaxCodeInterpretation(input), [input]);

  const copyText = `PayWise UK Tax Code Interpretation:
Tax Code: ${result.rawCode}
Estimated Personal Allowance: £${result.estimatedPersonalAllowance.toLocaleString('en-GB')}
Meaning: ${result.codeMeaning}
Allowance Detail: ${result.allowanceExplanation}
${result.taxImpactEstimated ? `Estimated Income Tax on £${(input.annualSalary || 0).toLocaleString('en-GB')}: £${result.taxImpactEstimated.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : ''}
Calculated via PayWise UK (https://paywiseuk.vercel.app/tax-code-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs & Quick Select */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Tax Code Lookup
          </h2>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            PAYE Decode
          </span>
        </div>

        <div className="space-y-4">
          {/* Tax Code Input */}
          <div>
            <label htmlFor="tax-code-input" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Enter Your Tax Code
            </label>
            <input
              type="text"
              id="tax-code-input"
              value={input.taxCode}
              placeholder="e.g. 1257L, BR, S1257L, K450"
              onChange={(e) => setInput({ ...input, taxCode: e.target.value.toUpperCase() })}
              className="block w-full uppercase tracking-widest font-mono text-xl sm:text-2xl font-black rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-4 py-3 text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          {/* Quick Preset Chips */}
          <div>
            <span className="block text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Popular HMRC Tax Codes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_TAX_CODES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setInput({ ...input, taxCode: item.code })}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-colors ${
                    input.taxCode.toUpperCase() === item.code
                      ? 'bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111]'
                      : 'border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] text-[#525252] dark:text-[#A3A3A3] hover:border-[#059669]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Annual Salary for Simulation */}
          <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="tax-code-salary" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Annual Salary for Tax Simulation (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.annualSalary || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="tax-code-salary"
                min="0"
                step="500"
                value={input.annualSalary || ''}
                onChange={(e) => setInput({ ...input, annualSalary: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <p className="text-2xs text-[#737373] mt-1">
              Estimate your monthly and annual Income Tax under this tax code.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Meaning & Breakdown */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Decoded Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Tax Code Analysis
            </span>
            <span className="text-sm font-mono font-black text-[#111111] dark:text-[#F5F5F5] px-3 py-1 bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
              {result.rawCode}
            </span>
          </div>

          <div>
            <span className="text-2xs uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] font-bold block">
              Estimated Tax-Free Personal Allowance
            </span>
            <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-2 tracking-tight mt-1">
              {result.estimatedPersonalAllowance >= 0 ? (
                <span>£{result.estimatedPersonalAllowance.toLocaleString('en-GB')}</span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">-£{Math.abs(result.estimatedPersonalAllowance).toLocaleString('en-GB')} (Negative)</span>
              )}
              <span className="text-sm font-normal text-[#525252] dark:text-[#A3A3A3]">/ tax year</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="text-xs uppercase font-bold text-[#059669] dark:text-[#10B981]">Official Meaning</h3>
            <p className="text-xs sm:text-sm text-[#111111] dark:text-[#F5F5F5] leading-relaxed font-medium">
              {result.codeMeaning}
            </p>
          </div>

          <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
            {result.allowanceExplanation}
          </p>
        </div>

        {/* Warnings Banner if any */}
        {result.warnings.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold">Tax Code Notice</strong>
              {result.warnings.map((w, idx) => (
                <p key={idx}>{w}</p>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Tax Impact Card if salary provided */}
        {result.taxImpactEstimated && (
          <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
              Estimated Tax on £{(input.annualSalary || 0).toLocaleString('en-GB')} Salary
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Annual Income Tax</span>
                <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5">
                  £{result.taxImpactEstimated.incomeTaxAnnual.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Monthly Income Tax</span>
                <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5">
                  £{(result.taxImpactEstimated.incomeTaxAnnual / 12).toLocaleString('en-GB', { minimumFractionDigits: 2 })}/mo
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] col-span-2 sm:col-span-1">
                <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block">Effective Tax Rate</span>
                <p className="text-base sm:text-lg font-black text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {result.taxImpactEstimated.effectiveRate.toFixed(2)}%
                </p>
              </div>
            </div>

            <ExportActions onCopyText={copyText} />
          </div>
        )}
      </div>
    </div>
  );
};
