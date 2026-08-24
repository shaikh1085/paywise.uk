import React, { useState, useMemo } from 'react';
import { CouncilTaxBand, CouncilTaxCountry, CouncilTaxInput } from '../../types';
import { calculateCouncilTax } from '../../utils/calculations';
import { COUNCIL_TAX_BAND_D_AVERAGES, COUNCIL_TAX_BANDS } from '../../utils/taxThresholds';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { Tooltip } from '../common/Tooltip';
import {
  Home,
  Building,
  User,
  Users,
  ShieldCheck,
  Info,
  Calendar,
  Layers,
  HelpCircle,
  PiggyBank,
  CheckCircle2,
  Receipt,
  RotateCcw,
} from 'lucide-react';

export const CouncilTaxCalculator: React.FC = () => {
  const [input, setInput] = useState<CouncilTaxInput>({
    band: 'D',
    country: 'england',
    adultCount: 1,
    hasDisabilityReduction: false,
    useCustomBandD: false,
    customBandD: 2171,
  });

  const result = useMemo(() => {
    return calculateCouncilTax(input);
  }, [input]);

  const copyText = `PayWise UK Council Tax Estimate:
Location: ${COUNCIL_TAX_BAND_D_AVERAGES[result?.country || 'england']?.label || 'England Average'}
Selected Band: Band ${result.band} (${result.valuationBandRange})
Household Adults: ${result.adultCount} ${result.adultCount === 1 ? '(25% Single Person Discount Applied)' : '(Full Charge)'}
Band D Baseline Applied: £${result.effectiveBandD.toFixed(2)}${result.isCustomRate ? ' (Custom Local Rate)' : ' (National Average)'}
---
Band Ratio: ${result.multiplierLabel}
Gross Annual Council Tax: £${(result.grossAnnualCharge || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${result.singlePersonDiscountPercentage > 0 ? `Single Occupant 25% Discount: -£${(result.singlePersonDiscountAmount || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` : ''}Net Annual Council Tax: £${(result.netAnnualCouncilTax || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
---
Payment Installment Schedules:
- 10 Monthly Installments (Standard UK Schedule): £${(result.monthly10Months || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month
- 12 Monthly Installments (Spread Across Full Year): £${(result.monthly12Months || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month
- Weekly Equivalent: £${(result.weeklyEstimate || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / week

* Note: Actual rates are set by your local billing authority and may include police, fire, parish, and social care precepts.
Calculated via PayWise UK (https://www.paywiseuk.co.uk/council-tax-calculator)`;

  const handleCountryChange = (country: CouncilTaxCountry) => {
    const defaultAvg = COUNCIL_TAX_BAND_D_AVERAGES[country]?.averageBandD || 2171;
    setInput((prev) => ({
      ...prev,
      country,
      customBandD: prev.useCustomBandD ? prev.customBandD : defaultAvg,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Input Form */}
      <div className="lg:col-span-5 relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
        <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <Home className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
          Property &amp; Household Details
        </h2>

        <div className="space-y-5">
          {/* Country / Region Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] mb-2">
              Country / Valuation Area
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['england', 'scotland', 'wales'] as CouncilTaxCountry[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCountryChange(c)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center capitalize ${
                    input.country === c
                      ? 'bg-[#059669] text-white border-[#059669] shadow-sm'
                      : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-1.5 leading-relaxed">
              {COUNCIL_TAX_BAND_D_AVERAGES[input.country].notes}
            </p>
          </div>

          {/* Council Tax Band Selection (A to H) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Council Tax Band
              </label>
              <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                Band {input.band} ({result.valuationBandRange})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {COUNCIL_TAX_BANDS.map((b) => {
                const isSelected = input.band === b.band;
                return (
                  <button
                    key={b.band}
                    type="button"
                    onClick={() => setInput({ ...input, band: b.band })}
                    className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all border text-center flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-[#111111] dark:border-white shadow-sm ring-2 ring-[#059669]/30'
                        : 'bg-white dark:bg-[#151515] border-[#E5E5E5] dark:border-[#303030] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669]'
                    }`}
                  >
                    <span className="text-sm">Band {b.band}</span>
                    <span className={`text-2xs font-normal ${isSelected ? 'text-[#D4D4D4] dark:text-[#525252]' : 'text-[#737373]'}`}>
                      {input.country === 'scotland' ? b.ratioLabelScotland : b.ratioLabelEnglandWales}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Adults in Household (Single Person Discount) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5]">
                Adult Residents in Household
              </label>
              <Tooltip
                title="Single Person Discount (25%)"
                content="If you live alone or are the only adult (aged 18+) in your property, you are legally entitled to a 25% Single Person Discount on your council tax bill."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInput({ ...input, adultCount: 1 })}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  input.adultCount === 1
                    ? 'border-[#059669] bg-[#059669]/5 dark:bg-[#10B981]/10 text-[#111111] dark:text-[#F5F5F5]'
                    : 'border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#737373]'
                }`}
              >
                <User className={`w-4 h-4 mt-0.5 shrink-0 ${input.adultCount === 1 ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#737373]'}`} />
                <div>
                  <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">1 Adult (Living Alone)</div>
                  <div className="text-2xs text-[#059669] dark:text-[#10B981] font-semibold mt-0.5">25% Discount Applied</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInput({ ...input, adultCount: 2 })}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  input.adultCount >= 2
                    ? 'border-[#059669] bg-[#059669]/5 dark:bg-[#10B981]/10 text-[#111111] dark:text-[#F5F5F5]'
                    : 'border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] text-[#737373]'
                }`}
              >
                <Users className={`w-4 h-4 mt-0.5 shrink-0 ${input.adultCount >= 2 ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#737373]'}`} />
                <div>
                  <div className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">2+ Adults</div>
                  <div className="text-2xs text-[#525252] dark:text-[#A3A3A3] mt-0.5">Standard Full Charge</div>
                </div>
              </button>
            </div>
          </div>

          {/* Custom Band D Rate Override */}
          <div className="pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#111111] dark:text-[#F5F5F5]">
                <input
                  type="checkbox"
                  checked={input.useCustomBandD}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setInput({
                      ...input,
                      useCustomBandD: checked,
                      customBandD: checked ? input.customBandD || COUNCIL_TAX_BAND_D_AVERAGES[input.country].averageBandD : COUNCIL_TAX_BAND_D_AVERAGES[input.country].averageBandD,
                    });
                  }}
                  className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-[#D4D4D4] dark:border-[#303030]"
                />
                <span>Enter your local council's Band D rate</span>
              </label>
              <Tooltip
                title="Exact Council Band D Rate"
                content="If you know your specific local authority's annual Band D rate from your council tax bill or council website, enter it here for an exact calculation."
              />
            </div>

            {input.useCustomBandD ? (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-2xs text-[#525252] dark:text-[#A3A3A3]">Annual Band D (£)</span>
                  <button
                    type="button"
                    onClick={() => setInput({ ...input, customBandD: COUNCIL_TAX_BAND_D_AVERAGES[input.country].averageBandD })}
                    className="text-2xs text-[#059669] dark:text-[#10B981] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset to {COUNCIL_TAX_BAND_D_AVERAGES[input.country].label} (£{COUNCIL_TAX_BAND_D_AVERAGES[input.country].averageBandD})
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#525252] dark:text-[#A3A3A3] font-bold text-sm">£</span>
                  <input
                    type="number"
                    min="500"
                    max="5000"
                    step="10"
                    value={input.customBandD || ''}
                    onChange={(e) => setInput({ ...input, customBandD: parseFloat(e.target.value) || 0 })}
                    className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#303030] bg-white dark:bg-[#151515] pl-7 pr-3 py-2 text-sm font-bold text-[#111111] dark:text-[#F5F5F5] focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none"
                    placeholder="2171"
                  />
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs text-[#525252] dark:text-[#A3A3A3] flex items-center justify-between">
                <span>Using {COUNCIL_TAX_BAND_D_AVERAGES[input.country]?.label || 'National Average'} baseline:</span>
                <strong className="text-[#111111] dark:text-[#F5F5F5] font-bold text-xs">
                  £{(COUNCIL_TAX_BAND_D_AVERAGES[input.country]?.averageBandD || 2171).toLocaleString('en-GB')}/yr
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Calculation Results */}
      <div className="lg:col-span-7 space-y-6">
        {/* Main Payout Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] dark:from-[#0F0F0F] dark:via-[#171717] dark:to-[#0A0A0A] text-white p-6 sm:p-7 border border-[#2A2A2A] shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Estimated Council Tax (Band {result.band})
            </span>
            <span className="text-xs text-[#A3A3A3]">
              {result.isCustomRate ? 'Custom Council Rate' : (COUNCIL_TAX_BAND_D_AVERAGES[result.country]?.label || 'National Average')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <AnimatedNumber
                  value={result.netAnnualCouncilTax}
                  prefix="£"
                  decimals={2}
                />
                <span className="text-base sm:text-lg font-normal text-[#A3A3A3] ml-2">/ year</span>
              </div>
              <p className="text-xs text-[#D4D4D4] pt-1">
                Property Valuation: <strong className="text-white">{result.valuationBandRange}</strong> ({result.country === 'wales' ? '2003 list' : '1991 list'})
              </p>
            </div>

            <div className="sm:col-span-4 bg-white/5 dark:bg-white/5 rounded-xl p-3 border border-white/10 text-center space-y-1">
              <span className="text-2xs text-[#A3A3A3] uppercase block font-semibold">Standard 10-Month Bill</span>
              <div className="text-xl sm:text-2xl font-black text-[#10B981] tabular-nums">
                £{result.monthly10Months.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-2xs text-[#D4D4D4] block">per month (Apr–Jan)</span>
            </div>
          </div>

          {/* Quick Summary Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#2A2A2A] text-xs">
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Band Ratio</span>
              <span className="font-bold text-white tabular-nums">
                {result.multiplierLabel}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Gross Full Charge</span>
              <span className="font-bold text-white tabular-nums">
                £{result.grossAnnualCharge.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">Single Discount (25%)</span>
              <span className={`font-bold tabular-nums ${result.singlePersonDiscountAmount > 0 ? 'text-[#10B981]' : 'text-[#737373]'}`}>
                {result.singlePersonDiscountAmount > 0 ? `-£${result.singlePersonDiscountAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '£0'}
              </span>
            </div>
            <div>
              <span className="text-[#A3A3A3] block text-2xs uppercase">12-Month Spread</span>
              <span className="font-bold text-white tabular-nums">
                £{result.monthly12Months.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Local Authority Average Notice */}
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
          ⚠️ This estimate uses national average Band D rates. Your actual council tax depends on your local authority. Check your council's website for exact figures.{' '}
          <a
            href="https://www.gov.uk/council-tax"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold hover:text-amber-700 dark:hover:text-amber-300"
          >
            Find your local council rate on GOV.UK
          </a>
        </p>

        {/* Payment Installment Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl p-4 bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
            <span className="text-2xs font-bold text-[#525252] dark:text-[#A3A3A3] uppercase block">10 Monthly Payments</span>
            <div className="text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-1 tabular-nums">
              £{result.monthly10Months.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-2xs text-[#737373] mt-1 leading-tight">Default statutory schedule (pay 10 months, 2 months free in Feb/Mar)</p>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
            <span className="text-2xs font-bold text-[#525252] dark:text-[#A3A3A3] uppercase block">12 Monthly Payments</span>
            <div className="text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-1 tabular-nums">
              £{result.monthly12Months.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-2xs text-[#737373] mt-1 leading-tight">Requested option to spread payments evenly across all 12 calendar months</p>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
            <span className="text-2xs font-bold text-[#525252] dark:text-[#A3A3A3] uppercase block">Weekly Equivalent</span>
            <div className="text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-1 tabular-nums">
              £{result.weeklyEstimate.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-2xs text-[#737373] mt-1 leading-tight">Useful for weekly household budgeting and cost comparisons</p>
          </div>
        </div>

        {/* All Council Tax Bands Comparison Table */}
        <div className="rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              Comparison Across All Council Tax Bands (A–H)
            </h3>
            <span className="text-2xs text-[#525252] dark:text-[#A3A3A3]">
              {result.adultCount === 1 ? 'Showing with 25% single discount' : 'Showing full annual charge'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3]">
                  <th className="text-left py-2 font-bold uppercase tracking-wider text-2xs">Band</th>
                  <th className="text-left py-2 font-bold uppercase tracking-wider text-2xs">Valuation Range</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">Annual Estimate</th>
                  <th className="text-right py-2 font-bold uppercase tracking-wider text-2xs">10 Months / Mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                {result.allBandsComparison.map((row) => (
                  <tr
                    key={row.band}
                    className={`transition-colors ${
                      row.isCurrentBand
                        ? 'bg-[#059669]/10 dark:bg-[#10B981]/10 font-bold'
                        : 'hover:bg-[#FAFAFA] dark:hover:bg-[#1C1C1C]'
                    }`}
                  >
                    <td className="py-2.5 px-2">
                      <span className={`inline-flex items-center gap-1.5 ${row.isCurrentBand ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#111111] dark:text-[#F5F5F5]'}`}>
                        Band {row.band}
                        {row.isCurrentBand && (
                          <span className="text-2xs px-1.5 py-0.5 rounded-sm bg-[#059669] text-white font-bold">Selected</span>
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 text-[#525252] dark:text-[#A3A3A3]">{row.valuation}</td>
                    <td className="py-2.5 text-right font-extrabold text-[#111111] dark:text-[#F5F5F5] tabular-nums">
                      £{row.annualNet.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                      £{row.monthly10.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Local Council Variance Disclaimer */}
        <div className="rounded-2xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] uppercase tracking-wider">
              Local Authority Variance Disclaimer
            </h4>
          </div>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Council tax rates are set individually by each of the 300+ local billing authorities across England, Scotland, and Wales. Rates also include precepts for adult social care, police authorities, fire and rescue services, and parish councils. This calculator provides estimates based on regional averages; check your official annual bill from your local council for your exact sum.
          </p>
        </div>

        {/* Export & Actions */}
        <ExportActions
          textToCopy={copyText}
          csvData={[
            { Metric: 'Region', Value: COUNCIL_TAX_BAND_D_AVERAGES[result.country].label },
            { Metric: 'Council Tax Band', Value: `Band ${result.band}` },
            { Metric: 'Valuation Range', Value: result.valuationBandRange },
            { Metric: 'Adult Count', Value: `${result.adultCount}` },
            { Metric: 'Single Person Discount', Value: `${result.singlePersonDiscountPercentage}%` },
            { Metric: 'Band D Baseline Applied', Value: `£${result.effectiveBandD.toFixed(2)}` },
            { Metric: 'Gross Annual Charge', Value: `£${result.grossAnnualCharge.toFixed(2)}` },
            { Metric: 'Single Discount Amount', Value: `£${result.singlePersonDiscountAmount.toFixed(2)}` },
            { Metric: 'Net Annual Council Tax', Value: `£${result.netAnnualCouncilTax.toFixed(2)}` },
            { Metric: '10 Monthly Payments', Value: `£${result.monthly10Months.toFixed(2)}` },
            { Metric: '12 Monthly Payments', Value: `£${result.monthly12Months.toFixed(2)}` },
            { Metric: 'Weekly Cost', Value: `£${result.weeklyEstimate.toFixed(2)}` },
          ]}
          fileName={`paywise-council-tax-band-${result.band}-${result.country}`}
          title="Council Tax Estimate"
        />
      </div>
    </div>
  );
};
