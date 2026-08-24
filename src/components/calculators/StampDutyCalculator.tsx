import React, { useState, useMemo } from 'react';
import { StampDutyInput, BuyerType } from '../../types';
import { calculateStampDuty } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Home, Calculator, Sparkles, Building, Info, ShieldAlert, Award } from 'lucide-react';

export const StampDutyCalculator: React.FC = () => {
  const [input, setInput] = useState<StampDutyInput>({
    propertyPrice: 350000,
    buyerType: 'standard',
    isNonUkResident: false,
    taxYearKey: '2025_26',
  });

  const result = useMemo(() => calculateStampDuty(input), [input]);

  const handleReset = () => {
    setInput({
      propertyPrice: 350000,
      buyerType: 'standard',
      isNonUkResident: false,
      taxYearKey: '2025_26',
    });
  };

  const copySummaryText = `PayWise UK Stamp Duty (SDLT) Calculation:
Property Price: £${result.propertyPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Buyer Category: ${
    result.buyerType === 'first_time_buyer'
      ? 'First-Time Buyer'
      : result.buyerType === 'additional_property'
      ? 'Additional Property / Buy-to-Let'
      : 'Standard Residential Move'
  }
Total Stamp Duty Payable: £${result.totalStampDuty.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective SDLT Rate: ${result.effectiveRate.toFixed(2)}%
${result.ftbReliefApplied ? `First-Time Buyer Relief Savings: £${result.ftbReliefSavings.toLocaleString('en-GB', { minimumFractionDigits: 2 })}\n` : ''}${result.surchargeAmount > 0 ? `Additional Property Surcharge (5%): £${result.surchargeAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}\n` : ''}
Calculated via PayWise UK (https://www.paywiseuk.co.uk/stamp-duty-calculator) - Estimate Only.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Property & Purchase Details
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            England & NI (SDLT)
          </span>
        </div>

        <div className="space-y-5">
          {/* Buyer Type Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-2">
              Buyer Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInput({ ...input, buyerType: 'standard' })}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 border ${
                  input.buyerType === 'standard'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="whitespace-nowrap">Home Mover</span>
              </button>

              <button
                type="button"
                onClick={() => setInput({ ...input, buyerType: 'first_time_buyer' })}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 border ${
                  input.buyerType === 'first_time_buyer'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="whitespace-nowrap">First-Time Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => setInput({ ...input, buyerType: 'additional_property' })}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 border ${
                  input.buyerType === 'additional_property'
                    ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                    : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="whitespace-nowrap">Buy-to-Let / 2nd</span>
              </button>
            </div>
          </div>

          {/* Property Purchase Price */}
          <div>
            <label htmlFor="sdlt-property-price" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Property Purchase Price (£)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-[#737373] pointer-events-none">
                £
              </span>
              <input
                id="sdlt-property-price"
                type="number"
                min="0"
                step="5000"
                value={input.propertyPrice || ''}
                onChange={(e) => setInput({ ...input, propertyPrice: parseFloat(e.target.value) || 0 })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-bold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="350000"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[200000, 300000, 425000, 500000, 750000, 1000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInput({ ...input, propertyPrice: preset })}
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    input.propertyPrice === preset
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#FAFAFA] dark:bg-[#151515] text-[#525252] dark:text-[#A3A3A3] border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669]'
                  }`}
                >
                  £{(preset / 1000).toLocaleString()}k
                </button>
              ))}
            </div>
          </div>

          {/* Non-UK Resident Surcharge Toggle */}
          <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={input.isNonUkResident || false}
                onChange={(e) => setInput({ ...input, isNonUkResident: e.target.checked })}
                className="mt-1 w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-[#CCCCCC] dark:border-[#444444] bg-[#FAFAFA] dark:bg-[#121212]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#111111] dark:text-[#F5F5F5] block">Non-UK Resident (+2% Surcharge)</span>
                <span className="text-[#737373]">Apply additional 2% SDLT surcharge for non-UK tax residents</span>
              </div>
            </label>
          </div>

          {/* FTB Max Property Limit Warning */}
          {input.buyerType === 'first_time_buyer' && input.propertyPrice > 625000 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>First-Time Buyer Relief Limit Exceeded</span>
              </div>
              <p className="text-2xs leading-relaxed">
                First-time buyer relief is capped at £625,000 (£500,000 standard). For properties above £625,000, standard residential rates apply to the entire amount.
              </p>
            </div>
          )}

          {/* Additional Property 5% Surcharge Notice */}
          {input.buyerType === 'additional_property' && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-2xs leading-relaxed">
                Reflects the 5.0% surcharge (increased from 3% on 31 October 2024) applicable to all second homes and buy-to-let purchases in England & NI.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <ExportActions
            onReset={handleReset}
            onPrint={() => window.print()}
            copyText={copySummaryText}
          />
        </div>
      </div>

      {/* RIGHT: Results & Breakdown Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Stamp Duty Metric Card */}
        <div className="rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Estimated Stamp Duty (SDLT) Payable
              </span>
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
                <AnimatedNumber value={result.totalStampDuty} prefix="£" />
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] block mb-1">
                Effective Tax Rate
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#059669] dark:text-[#10B981]">
                {result.effectiveRate.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Summary Badges / Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                Purchase Price
              </span>
              <span className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.propertyPrice.toLocaleString('en-GB')}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                Buyer Category
              </span>
              <span className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] truncate block">
                {result.buyerType === 'first_time_buyer'
                  ? 'First-Time Buyer'
                  : result.buyerType === 'additional_property'
                  ? 'Buy-to-Let / Second'
                  : 'Standard Mover'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#737373] block mb-0.5">
                {result.ftbReliefApplied ? 'FTB Relief Savings' : 'Additional Surcharge'}
              </span>
              <span
                className={`text-base font-bold ${
                  result.ftbReliefApplied
                    ? 'text-[#059669] dark:text-[#10B981]'
                    : result.surchargeAmount > 0
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-[#111111] dark:text-[#F5F5F5]'
                }`}
              >
                {result.ftbReliefApplied
                  ? `£${result.ftbReliefSavings.toLocaleString('en-GB')}`
                  : result.surchargeAmount > 0
                  ? `£${result.surchargeAmount.toLocaleString('en-GB')}`
                  : '£0'}
              </span>
            </div>
          </div>

          {/* First-Time Buyer Savings Callout */}
          {result.ftbReliefApplied && result.ftbReliefSavings > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
              <Award className="w-5 h-5 text-[#059669] dark:text-[#10B981] shrink-0" />
              <div>
                <span className="font-bold block">First-Time Buyer Relief Saved £{result.ftbReliefSavings.toLocaleString('en-GB')}</span>
                <span className="text-2xs text-emerald-700 dark:text-emerald-400">
                  You benefit from 0% Stamp Duty on the first £425,000 of your purchase.
                </span>
              </div>
            </div>
          )}

          {/* Progressive Tier Breakdown Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
              Progressive Tax Band Breakdown
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAFAFA] dark:bg-[#151515] border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] font-bold">
                    <th className="py-2.5 px-3">Price Band</th>
                    <th className="py-2.5 px-3">Rate</th>
                    <th className="py-2.5 px-3">Taxable in Band</th>
                    <th className="py-2.5 px-3 text-right">Tax Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  {result.bandsBreakdown.length > 0 ? (
                    result.bandsBreakdown.map((band, idx) => (
                      <tr key={idx} className="hover:bg-[#FAFAFA] dark:hover:bg-[#151515] transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-[#111111] dark:text-[#F5F5F5]">
                          {band.bandName}
                        </td>
                        <td className="py-2.5 px-3 text-[#525252] dark:text-[#A3A3A3]">
                          {band.ratePercent}%
                        </td>
                        <td className="py-2.5 px-3 text-[#525252] dark:text-[#A3A3A3]">
                          £{band.taxableInBand.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                          £{band.taxInBand.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-[#737373]">
                        Enter a property purchase price to see the band breakdown.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-[#FAFAFA] dark:bg-[#151515] font-bold text-[#111111] dark:text-[#F5F5F5] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <td colSpan={3} className="py-3 px-3">
                      Total Stamp Duty Land Tax (SDLT)
                    </td>
                    <td className="py-3 px-3 text-right text-sm text-[#059669] dark:text-[#10B981]">
                      £{result.totalStampDuty.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
