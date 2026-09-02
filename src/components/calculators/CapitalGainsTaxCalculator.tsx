import React, { useState, useMemo } from 'react';
import { CgtInput, CgtAssetType, TaxYear } from '../../types';
import { calculateCapitalGainsTax } from '../../utils/calculations';
import { ExportActions } from '../common/ExportActions';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { CircularProgressMeter } from '../common/CircularProgressMeter';
import { Scale, TrendingUp, Layers } from 'lucide-react';

export const CapitalGainsTaxCalculator: React.FC = () => {
  const [input, setInput] = useState<CgtInput>({
    assetType: 'shares',
    saleProceeds: 50000,
    purchasePrice: 20000,
    purchaseCosts: 500,
    saleCosts: 500,
    improvementCosts: 0,
    previousLosses: 0,
    otherTaxableIncome: 35000,
    taxYear: '2025_26',
    isMainResidenceExempt: false,
  });

  const result = useMemo(() => calculateCapitalGainsTax(input), [input]);

  const copyText = `PayWise UK Capital Gains Tax Calculation:
Tax Year: ${result.taxYearLabel}
Asset Category: ${result.assetType === 'shares' ? 'Shares & Investments' : result.assetType === 'residential_property' ? 'Residential Property' : result.assetType === 'commercial_property' ? 'Commercial Property' : 'Other Chargeable Asset'}
Sale Proceeds: £${(input.saleProceeds || 0).toLocaleString('en-GB')}
Total Cost & Expenses: £${result.totalCost.toLocaleString('en-GB')}
Gross Capital Gain: £${result.grossGain.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Annual Exempt Amount (AEA) Applied: £${result.annualExemptAmountApplied.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Taxable Gain: £${result.taxableGain.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Estimated Capital Gains Tax Due: £${result.totalCgtPayable.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Net Gain Retained: £${(result.grossGain - result.totalCgtPayable).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
Effective CGT Rate: ${result.effectiveCgtRate.toFixed(2)}%
Calculated via PayWise UK (https://paywiseuk.vercel.app/capital-gains-tax-calculator)`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Inputs Panel */}
      <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            Disposal Details
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#202020] text-[#059669] dark:text-[#10B981] border border-[#E5E5E5] dark:border-[#333333]">
            £3,000 Allowance
          </span>
        </div>

        <div className="space-y-4">
          {/* Asset Type */}
          <div>
            <label htmlFor="cgt-asset-type" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] mb-1.5">
              Asset Category
            </label>
            <select
              id="cgt-asset-type"
              value={input.assetType}
              onChange={(e) => setInput({ ...input, assetType: e.target.value as CgtAssetType })}
              className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] px-3.5 py-2.5 text-sm font-semibold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="shares">Shares & Listed Equities (18% / 24%)</option>
              <option value="residential_property">Residential Property / Second Home (18% / 24%)</option>
              <option value="commercial_property">Commercial Property & Land</option>
              <option value="other_asset">Other Chargeable Assets (Crypto, Collectibles)</option>
            </select>
          </div>

          {/* Sale Proceeds */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="cgt-disposal" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Sale / Disposal Proceeds (£)
              </label>
              <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                £{(input.saleProceeds || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="cgt-disposal"
                min="0"
                step="1000"
                value={input.saleProceeds || ''}
                onChange={(e) => setInput({ ...input, saleProceeds: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2.5 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Purchase Price */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="cgt-acquisition" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Purchase / Acquisition Cost (£)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.purchasePrice || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="cgt-acquisition"
                min="0"
                step="1000"
                value={input.purchasePrice || ''}
                onChange={(e) => setInput({ ...input, purchasePrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Other Taxable Income (Salary/Pension) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="cgt-income" className="block text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
                Other Taxable Income in Tax Year (£)
              </label>
              <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
                £{(input.otherTaxableIncome || 0).toLocaleString('en-GB')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#737373] font-bold text-base">£</span>
              <input
                type="number"
                id="cgt-income"
                min="0"
                step="1000"
                value={input.otherTaxableIncome || ''}
                onChange={(e) => setInput({ ...input, otherTaxableIncome: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="block w-full rounded-xl border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#121212] pl-8 pr-4 py-2 text-base font-extrabold text-[#111111] dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results Panel */}
      <div className="lg:col-span-7 space-y-6">
        {/* Hero CGT Due Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-[#E5E5E5] dark:border-[#2A2A2A] border-t-4 border-t-[#059669] dark:border-t-[#10B981] overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
              Capital Gains Tax Due
            </span>
            <span className="text-xs text-[#525252] dark:text-[#A3A3A3] font-semibold tabular-nums">{result.taxYearLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center mb-6">
            <div className="sm:col-span-8 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-baseline gap-1 tracking-tight">
                <AnimatedNumber value={result.totalCgtPayable} prefix="£" decimals={2} className="text-[#111111] dark:text-[#F5F5F5]" />
              </div>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>
                  Net gain retained: <strong className="text-[#059669] dark:text-[#10B981]">£{(result.grossGain - result.totalCgtPayable).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</strong>
                </span>
              </p>
            </div>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <CircularProgressMeter
                percentage={result.effectiveCgtRate}
                size={100}
                strokeWidth={8}
                label="Effective Tax"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Gross Capital Gain</span>
              <p className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5 tabular-nums">
                £{result.grossGain.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Annual Exemption</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.annualExemptAmountApplied.toLocaleString('en-GB', { minimumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-2xs uppercase text-[#525252] dark:text-[#A3A3A3] font-bold block truncate">Taxable Gain</span>
              <p className="text-base sm:text-lg font-black text-[#059669] dark:text-[#10B981] mt-0.5 tabular-nums">
                £{result.taxableGain.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Band breakdown */}
        <div className="bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            CGT Rate Band Calculation
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Basic Rate Band ({(result.basicBandRate * 100).toFixed(0)}%)</span>
              <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.cgtBasicBand.toLocaleString('en-GB', { minimumFractionDigits: 2 })} (on £{result.gainInBasicBand.toLocaleString('en-GB')})
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAFAFA] dark:bg-[#202020] border border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">Higher Rate Band ({(result.higherBandRate * 100).toFixed(0)}%)</span>
              <span className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                £{result.cgtHigherBand.toLocaleString('en-GB', { minimumFractionDigits: 2 })} (on £{result.gainInHigherBand.toLocaleString('en-GB')})
              </span>
            </div>
          </div>

          <ExportActions onCopyText={copyText} />
        </div>
      </div>
    </div>
  );
};
