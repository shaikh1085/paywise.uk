import React, { useState, useMemo } from 'react';
import { VatInput, VatMode, VatRate } from '../../types';
import { calculateVat } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import { Receipt, RotateCcw, ArrowDownUp, Percent } from 'lucide-react';

export const VatCalculator: React.FC = () => {
  const [input, setInput] = useState<VatInput>({
    amount: 1000,
    vatRate: 'standard',
    mode: 'add',
  });

  const result = useMemo(() => calculateVat(input), [input]);

  const handleReset = () => setInput({ amount: 1000, vatRate: 'standard', mode: 'add' });

  const copyText = `PayWise UK VAT Calculator Result:
Mode: ${result.mode === 'add' ? 'Adding VAT to net price' : 'Removing VAT from gross price'}
VAT Rate: ${result.vatRateLabel}
---
Net Amount (Ex-VAT): £${(result.netAmount ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
VAT Amount: £${(result.vatAmount ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Gross Amount (Inc-VAT): £${(result.grossAmount ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Calculated via PayWise UK (https://www.paywiseuk.co.uk/vat-calculator)`;

  const vatRates: { value: VatRate; label: string; desc: string }[] = [
    { value: 'standard', label: '20%', desc: 'Standard Rate' },
    { value: 'reduced', label: '5%', desc: 'Reduced Rate' },
    { value: 'zero', label: '0%', desc: 'Zero Rate' },
  ];

  const fmt = (n: number | undefined | null) =>
    '£' + (typeof n === 'number' && !isNaN(n) ? n : 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            VAT Details
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
          {/* Mode Toggle */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                What do you want to do?
              </label>
              <Tooltip content="Add VAT: you have the ex-VAT price and want the total. Remove VAT: you have the total price and want the ex-VAT amount." title="VAT Mode" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: 'add' as VatMode, label: 'Add VAT to price', desc: 'I have the net price' },
                { value: 'remove' as VatMode, label: 'Remove VAT from price', desc: 'I have the gross price' },
              ]).map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, mode: m.value }))}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center flex flex-col gap-0.5 items-center ${
                    input.mode === m.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  <ArrowDownUp className="w-3.5 h-3.5 mb-0.5" />
                  <span>{m.label}</span>
                  <span className={`text-2xs font-normal ${input.mode === m.value ? 'text-white/80' : 'text-[#737373] dark:text-[#888888]'}`}>{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-1.5">
              {input.mode === 'add' ? 'Net Amount (Ex-VAT)' : 'Gross Amount (Inc-VAT)'}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#525252] dark:text-[#A3A3A3] font-bold text-base">£</span>
              <input
                type="number"
                min="0"
                step="any"
                value={input.amount || ''}
                onChange={(e) => setInput((p) => ({ ...p, amount: parseFloat(e.target.value) || 0 }))}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-8 pr-4 py-2.5 text-[#111111] dark:text-[#F5F5F5] font-extrabold text-lg sm:text-xl focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-all"
                placeholder="e.g. 1000"
              />
            </div>
          </div>

          {/* VAT Rate Selector */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                VAT Rate
              </label>
              <Tooltip content="Standard 20% applies to most goods and services. Reduced 5% applies to domestic energy and children's car seats. Zero 0% applies to food, children's clothing, and books." title="UK VAT Rates" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {vatRates.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setInput((p) => ({ ...p, vatRate: r.value }))}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center flex flex-col gap-0.5 items-center ${
                    input.vatRate === r.value
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  <span className="text-base font-black">{r.label}</span>
                  <span className={`text-2xs font-normal ${input.vatRate === r.value ? 'text-white/80' : 'text-[#737373] dark:text-[#888888]'}`}>{r.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main result card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981]">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              {result.vatRateLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Net */}
            <div className={`rounded-xl p-4 border ${input.mode === 'add' ? 'border-[#059669] dark:border-[#10B981] bg-[#F0FDF4] dark:bg-[#052e16]' : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515]'}`}>
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">Net (Ex-VAT)</p>
              <p className="text-xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                <AnimatedNumber value={result.netAmount} prefix="£" decimals={2} />
              </p>
              {input.mode === 'add' && <p className="text-2xs text-[#059669] dark:text-[#10B981] mt-1 font-semibold">↑ Your input</p>}
            </div>

            {/* VAT */}
            <div className="rounded-xl p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515]">
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">VAT ({result.vatRatePercent}%)</p>
              <p className="text-xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                <AnimatedNumber value={result.vatAmount} prefix="£" decimals={2} />
              </p>
            </div>

            {/* Gross */}
            <div className={`rounded-xl p-4 border ${input.mode === 'remove' ? 'border-[#059669] dark:border-[#10B981] bg-[#F0FDF4] dark:bg-[#052e16]' : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515]'}`}>
              <p className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1">Gross (Inc-VAT)</p>
              <p className="text-xl font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                <AnimatedNumber value={result.grossAmount} prefix="£" decimals={2} />
              </p>
              {input.mode === 'remove' && <p className="text-2xs text-[#059669] dark:text-[#10B981] mt-1 font-semibold">↑ Your input</p>}
            </div>
          </div>

          {/* Summary row */}
          <div className="rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 text-xs text-[#525252] dark:text-[#A3A3A3] flex flex-wrap gap-x-6 gap-y-1">
            <span>Net: <strong className="text-[#111111] dark:text-[#F5F5F5]">{fmt(result.netAmount)}</strong></span>
            <span>+ VAT ({result.vatRatePercent}%): <strong className="text-[#111111] dark:text-[#F5F5F5]">{fmt(result.vatAmount)}</strong></span>
            <span>= Gross: <strong className="text-[#059669] dark:text-[#10B981]">{fmt(result.grossAmount)}</strong></span>
          </div>

          <div className="mt-4">
            <ExportActions copyText={copyText} fileName="paywise-vat-calculation" />
          </div>
        </div>

        {/* Quick reference card */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-3 flex items-center gap-2">
            <Percent className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
            UK VAT Rate Quick Reference
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { rate: '20% Standard', items: 'Most goods & services, electronics, clothing (adults), alcohol, tobacco, restaurants' },
              { rate: '5% Reduced', items: 'Domestic gas & electricity, children\'s car seats, mobility aids, some health products' },
              { rate: '0% Zero', items: 'Most food, children\'s clothing & shoes, books & newspapers, public transport, prescription medicines' },
            ].map((row) => (
              <div key={row.rate} className="flex gap-3 p-2.5 rounded-lg bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="font-black text-[#059669] dark:text-[#10B981] whitespace-nowrap w-24 shrink-0">{row.rate}</span>
                <span className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">{row.items}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VatCalculator;
