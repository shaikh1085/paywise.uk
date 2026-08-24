import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SecondJobCalculator } from '../components/calculators/SecondJobCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { SECOND_JOB_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, FileSpreadsheet, Scale, TrendingUp } from 'lucide-react';

export const SecondJobCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Second Job Tax Calculator UK', path: '/second-job-tax-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Second Job Tax Calculator UK | BR Tax Code & Combined Take-Home Pay"
        description="Calculate how much tax you'll pay on a second job in the UK, understand your BR tax code, and see your combined take-home pay from both jobs together."
        keywords={[
          'second job tax calculator',
          'second job tax calculator uk',
          'how much tax on a second job uk',
          'br tax code calculator',
          'multiple jobs tax calculator uk',
          'second job take home pay calculator',
          'why is my second job taxed so much uk',
          'combined income tax calculator two jobs',
          'second job personal allowance uk',
          'two jobs tax calculator uk',
        ]}
        canonicalPath="/second-job-tax-calculator"
        isCalculator={true}
        calculatorName="Second Job Tax Calculator UK"
        calculatorDescription="Calculate how much tax you'll pay on a second job in the UK, understand your BR tax code, and see your combined take-home pay from both jobs together."
        faqs={SECOND_JOB_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Second Job Tax Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Estimate your Income Tax deductions, National Insurance contributions, and net combined take-home pay when working two jobs or multiple PAYE employments.
        </p>
      </div>

      <SecondJobCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Tax Works When You Have Two Jobs
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the UK, you are entitled to one tax-free Personal Allowance (£12,570 in 2025/26) as an individual, regardless of how many jobs you work. HMRC normally allocates this entire allowance to your primary (main) job through the standard 1257L tax code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <FileSpreadsheet className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Cumulative Income Tax</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Income Tax is calculated on your total earnings across all employments. Your second job is not penalized with extra tax; it simply starts where your main job leaves off on the tax scale.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <Scale className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Separate NI Thresholds</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Unlike Income Tax, Class 1 National Insurance is assessed per job. Each independent employment has its own £12,570 Primary Threshold, meaning secondary earnings under £12,570 incur 0% NI.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Splitting Allowances</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              If your main job pays under £12,570, you can contact HMRC or use your Personal Tax Account to split your Personal Allowance across both roles so you don't overpay tax upfront.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Understanding the BR, D0, and D1 Tax Codes
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
            When you start a second job, HMRC issues a special non-cumulative or flat-rate PAYE tax code to ensure the correct proportion of tax is deducted by your second employer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-1">
              <span className="font-mono font-bold text-[#059669] dark:text-[#10B981]">BR Code (Basic Rate)</span>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Deducts a flat 20% Income Tax on all secondary earnings. Applied when combined income remains under the £50,270 higher rate threshold. (In Scotland: SBR).
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-1">
              <span className="font-mono font-bold text-[#059669] dark:text-[#10B981]">D0 Code (Higher Rate)</span>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Deducts a flat 40% Income Tax (42% in Scotland: SD0). Applied when your primary job already exhausts your basic rate band (£50,270+).
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] space-y-1">
              <span className="font-mono font-bold text-[#059669] dark:text-[#10B981]">D1 Code (Additional Rate)</span>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Deducts a flat 45% Income Tax (48% in Scotland: SD1). Applied to secondary earnings when total combined income exceeds £125,140.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Does a Second Job Push You Into a Higher Tax Bracket?
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            A common misconception is that crossing into a higher tax band makes your entire earnings taxed at a higher rate. Under the UK's progressive marginal tax system:
          </p>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] list-disc list-inside leading-relaxed">
            <li>
              <strong>Only earnings above the threshold are taxed at 40%:</strong> If your main job is £40,000 and your second job is £15,000 (total £55,000), only the £4,730 that exceeds £50,270 is taxed at 40%. The rest continues to be taxed at 20% or 0%.
            </li>
            <li>
              <strong>Beware the £100k taper zone:</strong> If your combined income across both jobs exceeds £100,000, your Personal Allowance reduces by £1 for every £2 over £100k, resulting in an effective 60% marginal tax rate between £100,000 and £125,140.
            </li>
            <li>
              <strong>Student loan repayments:</strong> If you repay student loans (Plan 1, Plan 2, Plan 4, Plan 5, or Postgraduate), repayments are deducted from any employment where earnings exceed that plan's threshold for the pay period.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK earnings calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/take-home-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pay-rise-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Rise Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/self-employed-tax-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Self-Employed Tax Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={SECOND_JOB_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
