import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SalaryComparisonCalculator } from '../components/calculators/SalaryComparisonCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { SALARY_COMPARISON_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, GitCompare, Layers, TrendingUp, Scale, HelpCircle } from 'lucide-react';

export const SalaryComparisonPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Salary Comparison Calculator UK', path: '/salary-comparison-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Salary Comparison Calculator UK | Compare 2+ Job Offers & Take-Home Pay"
        description="Compare multiple UK salaries side-by-side. Calculate exact net take-home pay differences, marginal tax rates, and retention percentages across UK tax bands."
        keywords={[
          'salary comparison calculator uk',
          'compare salary offers uk',
          'compare take home pay uk',
          'salary compare tool',
          'compare job offers salary uk',
          'salary comparison 30k vs 40k vs 50k',
          'uk salary increase comparison',
          'marginal tax rate salary comparison',
          'net pay difference calculator',
        ]}
        canonicalPath="/salary-comparison-calculator"
        isCalculator={true}
        calculatorName="Salary Comparison Calculator UK"
        calculatorDescription="Compare multiple UK salaries side-by-side. Calculate exact net take-home pay differences, marginal tax rates, and retention percentages across UK tax bands."
        faqs={SALARY_COMPARISON_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Salary Comparison Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Compare up to 6 job offers or salary increments side-by-side. Evaluate real take-home pay, monthly net deltas, effective tax burdens, and retention rates across UK tax brackets.
        </p>
      </div>

      <SalaryComparisonCalculator />

      {/* Deep-Dive Guide Section */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Why Comparing Headline Gross Salary Is Misleading
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            The UK tax system is highly progressive. Moving into higher tax brackets means you keep progressively less of each additional pound earned. When deciding between job offers or counter-offers, understanding your net take-home increase and marginal retention rate is essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>The 40% Higher Rate Cliff</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Earnings above £50,270 are subject to 40% Income Tax + 2% National Insurance. When pension (5%) and student loan (9%) are included, marginal deductions hit 56%, leaving 44% in net cash.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <Scale className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>The £100k 60% Taper Trap</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Between £100,000 and £125,140, losing £1 of Personal Allowance for every £2 earned creates an effective 60% income tax rate (plus 2% NI and 9% loan), taking total deductions up to 71%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <GitCompare className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Pension Salary Sacrifice</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Comparing salaries with higher pension percentages helps evaluate whether sacrificing income above tax thresholds saves more in tax relief and employer National Insurance.
            </p>
          </div>
        </div>

        {/* Related Calculators Links */}
        <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-3">
            Related UK Tax Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/take-home-pay-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/pay-rise-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Rise Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/salary-sacrifice-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Sacrifice Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/pay-frequency-converter"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Frequency Converter</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={SALARY_COMPARISON_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
