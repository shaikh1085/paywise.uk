import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { PayRiseCalculator } from '../components/calculators/PayRiseCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { PAY_RISE_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const PayRiseCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Pay Rise Calculator UK', path: '/pay-rise-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Pay Rise Calculator UK | See Your New Take-Home Pay After Tax"
        description="Find out exactly how much extra take-home pay you'll get after a pay rise or salary increase in the UK, including the impact on your tax band and National Insurance."
        keywords={[
          'pay rise calculator',
          'salary increase calculator uk',
          'pay rise calculator uk after tax',
          'how much will my pay rise be worth after tax',
          'salary increase tax calculator',
          'net pay increase calculator',
          'pay rise take home pay calculator',
          'will a pay rise push me into a higher tax bracket uk',
          'percentage pay rise calculator uk',
          'new salary after tax calculator',
        ]}
        canonicalPath="/pay-rise-calculator"
        isCalculator={true}
        calculatorName="Pay Rise Calculator UK"
        calculatorDescription="Find out exactly how much extra take-home pay you'll get after a pay rise or salary increase in the UK, including the impact on your tax band and National Insurance."
        faqs={PAY_RISE_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Pay Rise Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Find out exactly how much extra take-home pay you will keep from a salary increase or percentage pay rise after UK Income Tax, National Insurance, pension contributions, and student loans.
        </p>
      </div>

      <PayRiseCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How a Pay Rise Affects Your Take-Home Pay
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            When you receive a salary increase in the UK, you do not keep 100% of the additional gross amount. Depending on your current earnings, portions of your pay rise are allocated to Income Tax (20%, 40%, or 45%), employee Class 1 National Insurance (8% or 2%), workplace pension contributions, and student loan repayments. The percentage of your pay rise that reaches your bank account is known as your <strong>net retention rate</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Basic Rate Earners (Under £50.2k)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Basic rate taxpayers pay 20% Income Tax and 8% National Insurance on earnings between £12,570 and £50,270, keeping approximately 72p of every £1 pay rise (or ~67p if contributing 5% to a pension).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Higher Rate Earners (£50.2k–£100k)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Higher rate taxpayers pay 40% Income Tax (42% in Scotland) and 2% National Insurance, keeping around 58p of every £1 pay rise before pension and student loan deductions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Taper Zone Earners (£100k–£125.1k)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Due to the Personal Allowance reduction of £1 for every £2 earned above £100k, the effective income tax rate reaches 60% (62% with NI, 65% in Scotland), leaving only ~38p per £1.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Tax Band Thresholds to Watch Out For
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
            A common misconception is that crossing into a higher tax bracket will reduce your total net take-home pay. Because the UK uses a graduated marginal tax system, only the income earned <em>above</em> the threshold is taxed at the higher percentage rate:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">The £50,270 Higher Rate Threshold</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                If your salary rises from £45,000 to £55,000, only the £4,730 above £50,270 is taxed at the 40% rate. The first £50,270 is still taxed under the standard Personal Allowance and 20% Basic Rate bands.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Scottish Devolved Tax Bands</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                In Scotland, taxpayers face a 6-band system: Starter (19%), Basic (20%), Intermediate (21%), Higher (42% from £43,662), Advanced (45% from £75,000), and Top (48% over £125,140).
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Personal Allowance Taper and Child Benefit Charge
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            Two critical statutory thresholds require special attention when negotiating or planning for a pay rise:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3 text-xs">
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                1. High Income Child Benefit Charge (£60,000 to £80,000):
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                If you or your partner claim UK Child Benefit, earning over £60,000 requires repaying 1% of the benefit for every £200 earned above £60,000. At £80,000, 100% of Child Benefit is recouped via Self Assessment.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                2. £100,000 Personal Allowance Taper (60% Tax Trap):
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Earning more than £100,000 reduces your £12,570 Personal Allowance by £1 for every £2 earned above £100k until £125,140. To counter this, many employees make salary sacrifice pension contributions or workplace nursery contributions to keep their Adjusted Net Income below £100,000.
              </p>
            </div>
          </div>
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
              to="/salary-sacrifice-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Salary Sacrifice Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/pension-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pension Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={PAY_RISE_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
export default PayRiseCalculatorPage;
