import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PayFrequencyConverter } from '../components/calculators/PayFrequencyConverter';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { PAY_FREQUENCY_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, Clock, Calendar, TrendingUp, Layers } from 'lucide-react';

export const PayFrequencyConverterPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Pay Frequency Converter UK', path: '/pay-frequency-converter' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Pay Frequency Converter UK | Annual to Hourly, Weekly & Monthly"
        description="Convert salary and wages between Annual, Monthly, 4-Weekly, Fortnightly, Weekly, Daily, and Hourly pay in the UK. View gross rates and estimated net take-home pay."
        keywords={[
          'pay frequency converter uk',
          'salary frequency converter',
          'convert annual salary to monthly uk',
          'salary to hourly rate converter uk',
          '4 weekly to monthly pay converter',
          'weekly pay to annual salary calculator',
          'wage frequency calculator uk',
          'annual to daily pay converter',
        ]}
        canonicalPath="/pay-frequency-converter"
        isCalculator={true}
        calculatorName="Pay Frequency Converter UK"
        calculatorDescription="Convert salary and wages between Annual, Monthly, 4-Weekly, Fortnightly, Weekly, Daily, and Hourly pay in the UK. View gross rates and estimated net take-home pay."
        faqs={PAY_FREQUENCY_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Pay Frequency Converter UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Convert any UK wage instantly across Annual, Monthly, 4-Weekly, Fortnightly, Weekly, Daily, and Hourly pay frequencies. View exact gross earnings alongside calculated net take-home pay after tax.
        </p>
      </div>

      <PayFrequencyConverter />

      {/* Educational Guide Section */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            UK Standard Payroll Conversion Conventions
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            UK employment contracts quote pay in different periods depending on sector, industry, and whether the role is salaried or hourly. Here is how standard conversions operate:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <Calendar className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>12 Monthly vs 13 4-Weekly</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Monthly pay is divided into 12 calendar payments (averaging 4.33 weeks per month), while 4-weekly pay is paid every 28 days resulting in 13 pay periods per year.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <Clock className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Standard Working Hours</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Standard full-time employment in the UK is calculated on 37.5 hours per week (1,950 hours annually) and 260 working days per year (5 days x 52 weeks).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#111111] dark:text-[#F5F5F5]">
              <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h3>Non-Cumulative NI</h3>
            </div>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              While Income Tax is calculated on your cumulative tax code throughout the tax year, Employee Class 1 National Insurance is calculated strictly per pay period.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A3A3A3] mb-3">
            Related Payroll Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              to="/hourly-to-salary-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Hourly Rate Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/day-rate-to-salary-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Day Rate Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/salary-comparison-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Comparison</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/take-home-pay-calculator"
              className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#059669] dark:hover:border-[#10B981] bg-[#FAFAFA] dark:bg-[#151515] text-xs font-semibold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Take-Home Pay Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3A3A3] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={PAY_FREQUENCY_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
