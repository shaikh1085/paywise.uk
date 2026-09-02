import React, { useMemo } from 'react';
import { SEO } from '../../components/seo/SEO';
import { UK_TAX_CONFIGS, TAX_CONFIG_METADATA } from '../../config/taxConfig';
import { UK_STAMP_DUTY_CONFIGS } from '../../config/stampDutyConfig';
import { UK_DIVIDEND_TAX_CONFIGS, DIVIDEND_TAX_CONFIG_METADATA } from '../../config/dividendTaxConfig';
import { UK_CAPITAL_GAINS_TAX_CONFIGS, CAPITAL_GAINS_TAX_CONFIG_METADATA } from '../../config/capitalGainsTaxConfig';
import {
  ExternalLink,
  ShieldCheck,
  Info,
  Calendar,
  FileCheck,
  Building2,
  GraduationCap,
  Home,
  TrendingUp,
  Scale,
  Calculator,
  Percent,
} from 'lucide-react';

interface ChecklistItem {
  name: string;
  codeValue: string;
  sourceLabel: string;
  sourceUrl: string;
  configLocation: string;
  notes?: string;
}

interface ChecklistSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: ChecklistItem[];
}

export const TaxRateChecklistPage: React.FC = () => {
  // Extract the non-forecast (current) configs
  const currentTaxConfig = useMemo(() => {
    const entry = Object.entries(UK_TAX_CONFIGS).find(([_, c]) => !c.yearLabel.toLowerCase().includes('(forecast)'));
    return entry ? entry[1] : UK_TAX_CONFIGS['2025_26'];
  }, []);

  const currentSdltConfig = useMemo(() => {
    const entry = Object.entries(UK_STAMP_DUTY_CONFIGS).find(([key, c]) => key === '2025_26' || !c.taxYearLabel.toLowerCase().includes('statutory'));
    return entry ? entry[1] : UK_STAMP_DUTY_CONFIGS['2025_26'];
  }, []);

  const currentDividendConfig = useMemo(() => {
    const entry = Object.entries(UK_DIVIDEND_TAX_CONFIGS).find(([_, c]) => !c.yearLabel.toLowerCase().includes('(forecast)'));
    return entry ? entry[1] : UK_DIVIDEND_TAX_CONFIGS['2025_26'];
  }, []);

  const currentCgtConfig = useMemo(() => {
    const entry = Object.entries(UK_CAPITAL_GAINS_TAX_CONFIGS).find(([_, c]) => !c.yearLabel.toLowerCase().includes('(forecast)'));
    return entry ? entry[1] : UK_CAPITAL_GAINS_TAX_CONFIGS['2025_26'];
  }, []);

  const sections: ChecklistSection[] = useMemo(() => [
    {
      title: 'Income Tax (England, Wales & Northern Ireland)',
      icon: Calculator,
      description: 'Standard UK PAYE tax bands, allowances, and taper threshold.',
      items: [
        {
          name: 'Personal Allowance',
          codeValue: `£${currentTaxConfig.standardPersonalAllowance.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK Income Tax Rates & Allowances',
          sourceUrl: 'https://www.gov.uk/income-tax-rates',
          configLocation: 'src/config/taxConfig.ts → standardPersonalAllowance',
          notes: 'Standard 1257L tax-free allowance',
        },
        {
          name: 'Personal Allowance Taper Threshold',
          codeValue: `£${currentTaxConfig.personalAllowanceTaperThreshold.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK Income Tax Taper Rules',
          sourceUrl: 'https://www.gov.uk/income-tax-rates/income-over-100000',
          configLocation: 'src/config/taxConfig.ts → personalAllowanceTaperThreshold',
          notes: '£1 reduction for every £2 of adjusted net income above this threshold',
        },
        ...currentTaxConfig.rUKTaxBands.map((band) => ({
          name: `${band.name} (${(band.rate * 100).toFixed(0)}%)`,
          codeValue: `£${band.thresholdMin.toLocaleString('en-GB')} to ${band.thresholdMax === Infinity ? 'Over £125,140' : `£${band.thresholdMax.toLocaleString('en-GB')}`} (${(band.rate * 100).toFixed(0)}%)`,
          sourceLabel: 'GOV.UK Income Tax Rates',
          sourceUrl: 'https://www.gov.uk/income-tax-rates',
          configLocation: 'src/config/taxConfig.ts → rUKTaxBands',
        })),
      ],
    },
    {
      title: 'Income Tax (Scotland - Devolved Rates)',
      icon: Scale,
      description: 'Scottish Parliament devolved non-savings and non-dividend income tax structure.',
      items: [
        ...currentTaxConfig.scotlandTaxBands.map((band) => ({
          name: `Scottish ${band.name} (${(band.rate * 100).toFixed(0)}%)`,
          codeValue: `£${band.thresholdMin.toLocaleString('en-GB')} to ${band.thresholdMax === Infinity ? 'Over £125,140' : `£${band.thresholdMax.toLocaleString('en-GB')}`} (${(band.rate * 100).toFixed(0)}%)`,
          sourceLabel: 'GOV.UK Scottish Income Tax',
          sourceUrl: 'https://www.gov.uk/scottish-income-tax',
          configLocation: 'src/config/taxConfig.ts → scotlandTaxBands',
        })),
      ],
    },
    {
      title: 'National Insurance (Class 1 Employee)',
      icon: Percent,
      description: 'Employee National Insurance primary threshold, upper earnings limit, and contribution rates.',
      items: [
        {
          name: 'Primary Threshold (PT)',
          codeValue: `£${currentTaxConfig.employeeNI.primaryThreshold.toLocaleString('en-GB')}/year (£${(currentTaxConfig.employeeNI.primaryThreshold / 12).toFixed(2)}/month)`,
          sourceLabel: 'GOV.UK National Insurance Rates and Letters',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employeeNI.primaryThreshold',
        },
        {
          name: 'Upper Earnings Limit (UEL)',
          codeValue: `£${currentTaxConfig.employeeNI.upperEarningsLimit.toLocaleString('en-GB')}/year (£${(currentTaxConfig.employeeNI.upperEarningsLimit / 12).toFixed(2)}/month)`,
          sourceLabel: 'GOV.UK National Insurance Rates and Letters',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employeeNI.upperEarningsLimit',
        },
        {
          name: 'Main NI Rate (PT to UEL)',
          codeValue: `${(currentTaxConfig.employeeNI.mainRate * 100).toFixed(1)}%`,
          sourceLabel: 'GOV.UK National Insurance Rates and Letters',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employeeNI.mainRate',
        },
        {
          name: 'Higher NI Rate (Above UEL)',
          codeValue: `${(currentTaxConfig.employeeNI.higherRate * 100).toFixed(1)}%`,
          sourceLabel: 'GOV.UK National Insurance Rates and Letters',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employeeNI.higherRate',
        },
      ],
    },
    {
      title: 'Employer National Insurance & Employment Allowance',
      icon: Building2,
      description: 'Secondary Class 1 NIC thresholds, employer contribution rates, and annual relief.',
      items: [
        {
          name: 'Employer Secondary Threshold (ST)',
          codeValue: `£${currentTaxConfig.employerNI.secondaryThreshold.toLocaleString('en-GB')}/year`,
          sourceLabel: 'GOV.UK National Insurance Rates for Employers',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employerNI.secondaryThreshold',
          notes: 'Reduced to £5,000 from 6 April 2025 (Autumn Budget 2024)',
        },
        {
          name: 'Employer Secondary NIC Rate',
          codeValue: `${(currentTaxConfig.employerNI.standardRate * 100).toFixed(1)}%`,
          sourceLabel: 'GOV.UK National Insurance Rates for Employers',
          sourceUrl: 'https://www.gov.uk/national-insurance-rates-letters',
          configLocation: 'src/config/taxConfig.ts → employerNI.standardRate',
          notes: 'Increased from 13.8% to 15.0% from 6 April 2025',
        },
        {
          name: 'Employment Allowance',
          codeValue: `£${currentTaxConfig.employerNI.employmentAllowance.toLocaleString('en-GB')}/year`,
          sourceLabel: 'GOV.UK Claim Employment Allowance',
          sourceUrl: 'https://www.gov.uk/claim-employment-allowance',
          configLocation: 'src/config/taxConfig.ts → employerNI.employmentAllowance',
          notes: 'Increased from £5,000 to £10,500 from 6 April 2025',
        },
      ],
    },
    {
      title: 'Student Loan & Postgraduate Repayment Thresholds',
      icon: GraduationCap,
      description: 'Annual earnings thresholds before Student Loans Company (SLC) salary deductions apply.',
      items: [
        {
          name: 'Plan 1 Repayment Threshold',
          codeValue: `£${currentTaxConfig.studentLoans.plan1.threshold.toLocaleString('en-GB')}/year (${(currentTaxConfig.studentLoans.plan1.rate * 100).toFixed(0)}% above threshold)`,
          sourceLabel: 'GOV.UK Repaying Your Student Loan - Plan 1',
          sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
          configLocation: 'src/config/taxConfig.ts → studentLoans.plan1.threshold',
        },
        {
          name: 'Plan 2 Repayment Threshold',
          codeValue: `£${currentTaxConfig.studentLoans.plan2.threshold.toLocaleString('en-GB')}/year (${(currentTaxConfig.studentLoans.plan2.rate * 100).toFixed(0)}% above threshold)`,
          sourceLabel: 'GOV.UK Repaying Your Student Loan - Plan 2',
          sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
          configLocation: 'src/config/taxConfig.ts → studentLoans.plan2.threshold',
        },
        {
          name: 'Plan 4 Repayment Threshold (Scotland)',
          codeValue: `£${currentTaxConfig.studentLoans.plan4.threshold.toLocaleString('en-GB')}/year (${(currentTaxConfig.studentLoans.plan4.rate * 100).toFixed(0)}% above threshold)`,
          sourceLabel: 'GOV.UK Repaying Your Student Loan - Plan 4',
          sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
          configLocation: 'src/config/taxConfig.ts → studentLoans.plan4.threshold',
        },
        {
          name: 'Plan 5 Repayment Threshold',
          codeValue: `£${currentTaxConfig.studentLoans.plan5.threshold.toLocaleString('en-GB')}/year (${(currentTaxConfig.studentLoans.plan5.rate * 100).toFixed(0)}% above threshold)`,
          sourceLabel: 'GOV.UK Repaying Your Student Loan - Plan 5',
          sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
          configLocation: 'src/config/taxConfig.ts → studentLoans.plan5.threshold',
        },
        {
          name: 'Postgraduate Loan Threshold',
          codeValue: `£${currentTaxConfig.studentLoans.postgrad.threshold.toLocaleString('en-GB')}/year (${(currentTaxConfig.studentLoans.postgrad.rate * 100).toFixed(0)}% above threshold)`,
          sourceLabel: 'GOV.UK Repaying Your Postgraduate Loan',
          sourceUrl: 'https://www.gov.uk/repaying-your-student-loan/what-you-pay',
          configLocation: 'src/config/taxConfig.ts → studentLoans.postgrad.threshold',
        },
      ],
    },
    {
      title: 'Stamp Duty Land Tax (SDLT - England & NI)',
      icon: Home,
      description: 'Standard residential brackets, first-time buyer relief limits, and additional property surcharge.',
      items: [
        ...currentSdltConfig.standardResidentialBands.map((band) => ({
          name: `Standard Residential: ${band.name}`,
          codeValue: `${(band.rate * 100).toFixed(0)}% (Min: £${band.min.toLocaleString('en-GB')}, Max: ${band.max === Infinity ? 'Over £1.5m' : `£${band.max.toLocaleString('en-GB')}`})`,
          sourceLabel: 'GOV.UK Stamp Duty Land Tax Residential Rates',
          sourceUrl: 'https://www.gov.uk/stamp-duty-land-tax/residential-property-rates',
          configLocation: 'src/config/stampDutyConfig.ts → standardResidentialBands',
        })),
        ...currentSdltConfig.firstTimeBuyerBands.map((band) => ({
          name: `First-Time Buyer: ${band.name}`,
          codeValue: `${(band.rate * 100).toFixed(0)}% (Min: £${band.min.toLocaleString('en-GB')}, Max: £${band.max.toLocaleString('en-GB')})`,
          sourceLabel: 'GOV.UK First-Time Buyer SDLT Relief',
          sourceUrl: 'https://www.gov.uk/stamp-duty-land-tax/residential-property-rates',
          configLocation: 'src/config/stampDutyConfig.ts → firstTimeBuyerBands',
        })),
        {
          name: 'First-Time Buyer Max Property Cap',
          codeValue: `£${currentSdltConfig.firstTimeBuyerMaxPropertyPrice.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK First-Time Buyer Eligibility Cap',
          sourceUrl: 'https://www.gov.uk/stamp-duty-land-tax/residential-property-rates',
          configLocation: 'src/config/stampDutyConfig.ts → firstTimeBuyerMaxPropertyPrice',
          notes: 'If property purchase exceeds this amount, standard residential rates apply to the full purchase',
        },
        {
          name: 'Additional Property Surcharge (Second Homes / Buy-to-Let)',
          codeValue: `${(currentSdltConfig.additionalPropertySurchargeRate * 100).toFixed(1)}%`,
          sourceLabel: 'GOV.UK Higher Rates for Additional Properties',
          sourceUrl: 'https://www.gov.uk/stamp-duty-land-tax/residential-property-rates',
          configLocation: 'src/config/stampDutyConfig.ts → additionalPropertySurchargeRate',
          notes: 'Increased from 3.0% to 5.0% in Autumn Budget 2024',
        },
      ],
    },
    {
      title: 'Dividend Tax',
      icon: TrendingUp,
      description: 'Tax-free dividend allowance and income band dividend tax rates.',
      items: [
        {
          name: 'Dividend Allowance',
          codeValue: `£${currentDividendConfig.dividendAllowance.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK Tax on Dividends',
          sourceUrl: 'https://www.gov.uk/tax-on-dividends',
          configLocation: 'src/config/dividendTaxConfig.ts → dividendAllowance',
          notes: 'Tax-free allowance for UK dividend income',
        },
        {
          name: 'Basic Rate Dividend Tax',
          codeValue: `${(currentDividendConfig.rates.basicRate * 100).toFixed(2)}%`,
          sourceLabel: 'GOV.UK Tax on Dividends',
          sourceUrl: 'https://www.gov.uk/tax-on-dividends',
          configLocation: 'src/config/dividendTaxConfig.ts → rates.basicRate',
        },
        {
          name: 'Higher Rate Dividend Tax',
          codeValue: `${(currentDividendConfig.rates.higherRate * 100).toFixed(2)}%`,
          sourceLabel: 'GOV.UK Tax on Dividends',
          sourceUrl: 'https://www.gov.uk/tax-on-dividends',
          configLocation: 'src/config/dividendTaxConfig.ts → rates.higherRate',
        },
        {
          name: 'Additional Rate Dividend Tax',
          codeValue: `${(currentDividendConfig.rates.additionalRate * 100).toFixed(2)}%`,
          sourceLabel: 'GOV.UK Tax on Dividends',
          sourceUrl: 'https://www.gov.uk/tax-on-dividends',
          configLocation: 'src/config/dividendTaxConfig.ts → rates.additionalRate',
        },
      ],
    },
    {
      title: 'Capital Gains Tax (CGT)',
      icon: Scale,
      description: 'Annual exempt amount, standard and residential property capital gains rates, and BADR relief.',
      items: [
        {
          name: 'Annual Exempt Amount (Individuals)',
          codeValue: `£${currentCgtConfig.annualExemptAmountIndividual.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK Capital Gains Tax Allowances',
          sourceUrl: 'https://www.gov.uk/capital-gains-tax/allowances',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → annualExemptAmountIndividual',
        },
        {
          name: 'Shares & Other Assets - Basic Rate',
          codeValue: `${(currentCgtConfig.rates.sharesAndOtherAssets.basicRate * 100).toFixed(0)}%`,
          sourceLabel: 'GOV.UK Capital Gains Tax Rates',
          sourceUrl: 'https://www.gov.uk/capital-gains-tax/rates',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.sharesAndOtherAssets.basicRate',
        },
        {
          name: 'Shares & Other Assets - Higher Rate',
          codeValue: `${(currentCgtConfig.rates.sharesAndOtherAssets.higherRate * 100).toFixed(0)}%`,
          sourceLabel: 'GOV.UK Capital Gains Tax Rates',
          sourceUrl: 'https://www.gov.uk/capital-gains-tax/rates',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.sharesAndOtherAssets.higherRate',
        },
        {
          name: 'Residential Property - Basic Rate',
          codeValue: `${(currentCgtConfig.rates.residentialProperty.basicRate * 100).toFixed(0)}%`,
          sourceLabel: 'GOV.UK Capital Gains Tax Rates',
          sourceUrl: 'https://www.gov.uk/capital-gains-tax/rates',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.residentialProperty.basicRate',
        },
        {
          name: 'Residential Property - Higher Rate',
          codeValue: `${(currentCgtConfig.rates.residentialProperty.higherRate * 100).toFixed(0)}%`,
          sourceLabel: 'GOV.UK Capital Gains Tax Rates',
          sourceUrl: 'https://www.gov.uk/capital-gains-tax/rates',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.residentialProperty.higherRate',
        },
        {
          name: 'Business Asset Disposal Relief (BADR) Rate',
          codeValue: `${(currentCgtConfig.rates.badr.rate * 100).toFixed(0)}%`,
          sourceLabel: 'GOV.UK Business Asset Disposal Relief',
          sourceUrl: 'https://www.gov.uk/business-asset-disposal-relief',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.badr.rate',
          notes: 'Increased to 14% for 2025/26 (scheduled to increase to 18% in 2026/27)',
        },
        {
          name: 'BADR Lifetime Limit',
          codeValue: `£${currentCgtConfig.rates.badr.lifetimeLimit.toLocaleString('en-GB')}`,
          sourceLabel: 'GOV.UK Business Asset Disposal Relief Lifetime Limit',
          sourceUrl: 'https://www.gov.uk/business-asset-disposal-relief',
          configLocation: 'src/config/capitalGainsTaxConfig.ts → rates.badr.lifetimeLimit',
        },
      ],
    },
  ], [currentTaxConfig, currentSdltConfig, currentDividendConfig, currentCgtConfig]);

  return (
    <>
      <SEO
        title="Tax Rate Verification Checklist (Admin)"
        description="Internal reference checklist for verifying UK tax rates against official GOV.UK sources."
        noindex={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#2A2A2A] text-2xs font-bold text-[#059669] dark:text-[#10B981] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Reference Only — Noindex</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            Tax Rate Verification Checklist
          </h1>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] max-w-3xl leading-relaxed">
            Centralized reference matrix of all active UK tax allowances, thresholds, and contribution rates currently implemented in the codebase, paired directly with official GOV.UK verification endpoints.
          </p>
        </div>

        {/* Instructional Note Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">
                Annual Verification Instructions
              </h2>
              <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Each April, UK tax rates change. Use this page once a year: open each &apos;Official Source&apos; link, compare the published figure to the &apos;Current Value in Code&apos; column, and manually update the relevant config file if it has changed. This page does not fetch live data or make any changes automatically.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A] text-xs">
            <div className="flex items-center gap-2 text-[#525252] dark:text-[#A3A3A3]">
              <Calendar className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
              <span>Current Tax Year: <strong className="text-[#111111] dark:text-[#F5F5F5]">{TAX_CONFIG_METADATA.currentTaxYearLabel}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#525252] dark:text-[#A3A3A3]">
              <FileCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
              <span>Last Reviewed: <strong className="text-[#111111] dark:text-[#F5F5F5]">{TAX_CONFIG_METADATA.lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#525252] dark:text-[#A3A3A3]">
              <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
              <span>Config Version: <strong className="text-[#111111] dark:text-[#F5F5F5]">{TAX_CONFIG_METADATA.version}</strong></span>
            </div>
          </div>
        </div>

        {/* Verification Tables by Section */}
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.title}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
                      {section.title}
                    </h2>
                    <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-5 sm:mx-0">
                  <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                    <thead>
                      <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                        <th className="py-2.5 px-4 font-bold text-[#111111] dark:text-[#F5F5F5] w-2/5">
                          Figure Name
                        </th>
                        <th className="py-2.5 px-4 font-bold text-[#111111] dark:text-[#F5F5F5] w-2/5">
                          Current Value in Code
                        </th>
                        <th className="py-2.5 px-4 font-bold text-[#111111] dark:text-[#F5F5F5] w-1/5">
                          Official Source
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                      {section.items.map((item) => (
                        <tr
                          key={item.name}
                          className="hover:bg-[#F9F9F9] dark:hover:bg-[#1C1C1C] transition-colors"
                        >
                          <td className="py-3 px-4 align-top">
                            <div className="font-semibold text-[#111111] dark:text-[#F5F5F5]">
                              {item.name}
                            </div>
                            <div className="text-3xs font-mono text-[#737373] dark:text-[#737373] mt-0.5">
                              {item.configLocation}
                            </div>
                            {item.notes && (
                              <div className="text-2xs text-[#737373] dark:text-[#A3A3A3] mt-1 italic">
                                {item.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 align-top">
                            <span className="font-mono font-medium px-2 py-0.5 rounded bg-[#F5F5F5] dark:bg-[#222222] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                              {item.codeValue}
                            </span>
                          </td>
                          <td className="py-3 px-4 align-top">
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-[#059669] dark:text-[#10B981] hover:underline"
                            >
                              <span>{item.sourceLabel}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#141414] text-center text-xs text-[#737373] dark:text-[#737373]">
          PayWise UK Admin Utilities • Strictly internal reference • No public links or external telemetry.
        </div>
      </div>
    </>
  );
};

export default TaxRateChecklistPage;
