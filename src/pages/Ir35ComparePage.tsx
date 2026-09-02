import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Ir35CompareCalculator } from '../components/calculators/Ir35CompareCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { IR35_COMPARE_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, Building, Briefcase, FileCheck } from 'lucide-react';

export const Ir35ComparePage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Inside vs Outside IR35 Calculator', path: '/inside-vs-outside-ir35-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Inside vs Outside IR35 Calculator UK | Compare Contractor Take-Home Pay"
        description="Compare your take-home pay as a contractor inside IR35 versus outside IR35 through a limited company, side by side, using the same day rate."
        keywords={[
          'inside vs outside ir35 calculator',
          'ir35 calculator uk',
          'contractor rate calculator uk',
          'ir35 take home pay comparison',
          'inside ir35 vs outside ir35 take home pay',
          'limited company contractor calculator uk',
          'ir35 day rate calculator',
          'contractor take home pay calculator uk',
          'ir35 dividend tax calculator',
          'should i go inside or outside ir35 calculator',
        ]}
        canonicalPath="/inside-vs-outside-ir35-calculator"
        isCalculator={true}
        calculatorName="Inside vs Outside IR35 Calculator UK"
        calculatorDescription="Compare your take-home pay as a contractor inside IR35 versus outside IR35 through a limited company, side by side, using the same day rate."
        faqs={IR35_COMPARE_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Inside vs Outside IR35 Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Compare your net take-home pay, total tax liability, and retention rates side-by-side between operating as an outside IR35 limited company contractor versus an inside IR35 deemed employee via an umbrella company.
        </p>
      </div>

      <Ir35CompareCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Inside IR35 vs Outside IR35: What's the Difference
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            The Intermediaries Legislation (known as IR35 or off-payroll working rules) determines whether a freelance contractor is recognized as a genuine independent business or a "disguised employee" for UK tax purposes. Your IR35 status fundamentally changes the tax structure applied to your assignment billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Outside IR35 (Independent Business)</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              You contract via your own Personal Services Company (PSC). You have control over how work is executed, right of substitution, and financial risk. Your company pays Corporation Tax (19% to 25%) and distributes remaining profits as dividends without Employer National Insurance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#525252] dark:text-[#A3A3A3]" />
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Inside IR35 (Deemed Employment)</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              HMRC treats the engagement as employment for tax purposes. The invoiced assignment rate is subject to deductions for Employer National Insurance (15%), Apprenticeship Levy (0.5%), and umbrella margins before regular PAYE Income Tax and employee NI are applied.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How Outside IR35 Take-Home Pay Is Calculated (Corporation Tax + Dividends)
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            When contracting outside IR35 through a UK limited company, take-home pay is maximized through a tax-efficient mixture of a low director salary and shareholder dividends:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            <li><strong>Director Salary:</strong> Typically set at the annual Personal Allowance threshold (£12,570), this salary is an allowable business expense that reduces company taxable profit while preserving state pension qualifying years.</li>
            <li><strong>Corporation Tax:</strong> The company pays 19% Corporation Tax on taxable profits up to £50,000, 25% on profits exceeding £250,000, or a marginal rate (26.5%) on profits in between.</li>
            <li><strong>Dividend Allowance:</strong> The first £500 of extracted dividends each tax year is 100% tax-free.</li>
            <li><strong>Dividend Tax Rates:</strong> Dividends above £500 are taxed according to your tax band: 8.75% (basic rate band up to £50,270), 33.75% (higher rate band £50,270–£125,140), and 39.35% (additional rate). Dividends are exempt from National Insurance.</li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How Inside IR35 Take-Home Pay Is Calculated (Deemed Employment)
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Inside IR35 deemed payments follow statutory PAYE employment mechanics. The client or umbrella company must deduct all statutory employment taxes from the contract assignment value before paying you:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            <li><strong>Umbrella Weekly Margin:</strong> A fixed fee (£20 to £35 per week) charged by the accredited umbrella payroll provider.</li>
            <li><strong>Employer National Insurance:</strong> 15% on earnings above the statutory Secondary Threshold (£5,000 per year from April 2025).</li>
            <li><strong>Apprenticeship Levy:</strong> 0.5% statutory levy applied across larger payrolls.</li>
            <li><strong>Employee PAYE Income Tax &amp; National Insurance:</strong> Standard 20%/40%/45% Income Tax (or Scottish rates) and 8%/2% Class 1 employee NICs deducted from the remaining gross wage.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK earnings calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/inside-ir35-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Inside IR35 Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/umbrella-company-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Umbrella Company Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/day-rate-to-salary-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Day Rate to Salary Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={IR35_COMPARE_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
