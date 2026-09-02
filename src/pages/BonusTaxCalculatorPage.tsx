import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { BonusCalculator } from '../components/calculators/BonusCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { BONUS_TAX_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const BonusTaxCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Bonus Tax Calculator UK', path: '/bonus-tax-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Bonus Tax Calculator UK | Work Out Tax on Your Bonus Pay"
        description="Calculate how much tax and National Insurance you'll pay on a UK work bonus, and see your exact net bonus payout after deductions."
        keywords={[
          'bonus tax calculator',
          'bonus tax calculator uk',
          'how much tax will i pay on my bonus uk',
          'net bonus calculator',
          'bonus after tax calculator uk',
          'why is my bonus taxed so much uk',
          'emergency tax on bonus uk',
          'work bonus tax calculator',
          'annual bonus tax calculator uk',
          'bonus take home pay calculator',
        ]}
        canonicalPath="/bonus-tax-calculator"
        isCalculator={true}
        calculatorName="Bonus Tax Calculator UK"
        calculatorDescription="Calculate how much tax and National Insurance you'll pay on a UK work bonus, and see your exact net bonus payout after deductions."
        faqs={BONUS_TAX_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Bonus Tax Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Find out exactly how much tax, National Insurance, pension, and student loan you will pay on your UK work bonus, and see your net cash bonus take-home pay.
        </p>
      </div>

      <BonusCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Why Bonuses Are Taxed at Your Marginal Rate, Not a Flat Rate
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In the United Kingdom, HM Revenue and Customs (HMRC) does not have a separate "bonus tax". Instead, any bonus you receive is treated as ordinary taxable employment earnings and added on top of your existing salary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Basic Rate (Under £50.2k)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              If your salary plus bonus stays below £50,270, the bonus is taxed at 20% Income Tax + 8% Class 1 NI, leaving ~72% take-home (or ~67% if 5% pension applies).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Higher Rate (£50.2k–£100k)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              If your bonus falls in or crosses above £50,270, the excess is taxed at 40% Income Tax (42% in Scotland) and 2% NI, retaining ~58p of every £1.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">£100k Taper Trap</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              If your bonus takes total income into the £100,000–£125,140 bracket, each £2 of bonus loses £1 of Personal Allowance, creating a 60% effective income tax rate (62% with NI).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Why Your Bonus Might Look Like It's Taxed at Emergency Rate
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            When you receive a large lump sum bonus, your payslip take-home may appear much lower than expected. Here is why this happens:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3 text-xs">
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                1. Monthly Pay Period Annualisation:
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                UK payroll software multiplies that month's earnings by 12 to project your annual tax liability. A £5,000 bonus added to a £3,000 monthly salary makes the system temporarily assume you earn £96,000 per year (£8,000 × 12), withholding higher-rate tax for that month.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                2. Cumulative PAYE Automatic Smoothing:
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Because UK tax codes (like 1257L) are cumulative, subsequent monthly pay runs adjust your tax automatically by looking at your cumulative year-to-date income. Any initial excess withholding in your bonus month gets refunded across your remaining monthly payslips.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Reducing Bonus Tax with Salary Sacrifice
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            One of the most tax-efficient strategies in the UK is <strong>bonus sacrifice</strong>. Rather than taking your full bonus in cash and losing 32%, 42%, or 62% in tax and NI:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2 text-xs">
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>100% Tax Relief:</strong> Directing the bonus into your workplace pension means 100% of the gross bonus enters your retirement fund without any Income Tax or National Insurance deduction.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Employer NI Pass-Through:</strong> Many UK employers pass on part or all of their 13.8% (or 15.0%) Employer NI savings into your pension pot, boosting your bonus even further.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Protect Allowances &amp; Benefits:</strong> Bonus sacrifice reduces your Adjusted Net Income, helping you retain your £12,570 Personal Allowance and avoid the High Income Child Benefit Charge.
            </p>
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
              to="/pay-rise-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Pay Rise Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={BONUS_TAX_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
export default BonusTaxCalculatorPage;
