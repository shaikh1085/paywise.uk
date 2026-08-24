import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PensionCalculator } from '../components/calculators/PensionCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { PENSION_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const PensionPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'UK Pension Calculator', path: '/pension-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="UK Pension Calculator | Workplace & Retirement Pot Projection"
        description="Project your UK pension pot, tax relief, employer contributions, and estimated retirement income with custom growth and inflation rates."
        keywords={[
          'UK pension calculator',
          'pension pot calculator',
          'retirement pot projection uk',
          'pension compound calculator',
          'workplace pension calculator',
        ]}
        canonicalPath="/pension-calculator"
        isCalculator={true}
        calculatorName="UK Pension Calculator"
        calculatorDescription="Project your UK pension pot, tax relief, employer contributions, and estimated retirement income."
        faqs={PENSION_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          UK Pension Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Forecast your future retirement pot, calculate the power of compound investment returns, employer contributions, basic-rate tax relief, and estimated safe 4% annual drawdowns.
        </p>
      </div>

      <PensionCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How UK Workplace Pensions and Tax Relief Work
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Workplace pensions in the UK are one of the most tax-efficient vehicles for building wealth. Under auto-enrolment rules, qualifying employees contribute a minimum of 5% and employers contribute at least 3%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Tax Relief Boost</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Every £80 you contribute into a relief-at-source scheme is automatically topped up with £20 basic-rate tax relief by HMRC, creating an instant £100 investment pot.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Employer Matching</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Employer contributions represent non-taxable employer money paid directly into your pension scheme on top of your standard cash salary.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">25% Tax-Free Lump Sum</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              At retirement age (currently age 55, rising to 57 in 2028), you can typically withdraw up to 25% of your accumulated pot completely tax-free (up to £268,275).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-3">
            Related UK retirement & salary tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              to="/salary-sacrifice-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Sacrifice Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/take-home-pay-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/guides/what-is-salary-sacrifice"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Sacrifice Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={PENSION_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
