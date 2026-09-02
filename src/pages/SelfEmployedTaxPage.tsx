import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SelfEmployedCalculator } from '../components/calculators/SelfEmployedCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { SELF_EMPLOYED_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight } from 'lucide-react';

export const SelfEmployedTaxPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Self-Employed Tax Calculator UK', path: '/self-employed-tax-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Self-Employed Tax Calculator UK | Income Tax, Class 2 & Class 4 NI"
        description="Calculate Income Tax, Class 2 and Class 4 National Insurance on your UK self-employed profits. Free sole trader tax calculator updated for the current tax year."
        keywords={[
          'self employed tax calculator',
          'sole trader tax calculator uk',
          'class 2 national insurance calculator',
          'class 4 national insurance calculator',
          'self employed income tax calculator uk',
          'how much tax will i pay self employed uk',
          'self employed take home pay calculator',
          'freelancer tax calculator uk',
          'sole trader take home pay uk',
          'self assessment tax estimate calculator',
        ]}
        canonicalPath="/self-employed-tax-calculator"
        isCalculator={true}
        calculatorName="Self-Employed Tax Calculator UK"
        calculatorDescription="Calculate Income Tax, Class 2 and Class 4 National Insurance on your UK self-employed profits."
        faqs={SELF_EMPLOYED_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Self-Employed Tax Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate your estimated Income Tax, Class 2 & Class 4 National Insurance, Student Loan repayments, and net take-home pay as a UK sole trader or freelancer.
        </p>
      </div>

      <SelfEmployedCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Self-Employed Tax Works in the UK
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Unlike employed PAYE workers who have tax automatically deducted from their monthly paychecks, self-employed individuals (sole traders and freelancers) report their business turnover and allowable expenses once a year via HMRC Self Assessment. Tax and National Insurance are charged on your net taxable profit, not your gross revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Tax-Free Personal Allowance</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              The first £12,570 of your net profit is tax-free. If your net profit exceeds £100,000, your personal allowance reduces by £1 for every £2 earned above £100k until it reaches zero at £125,140.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Allowable Business Expenses</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              You can deduct running costs wholly and exclusively incurred for your trade, such as software, equipment, phone bills, insurance, home office, and travel expenses, reducing your taxable profit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Self Assessment Deadlines</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Online tax returns and balancing payments must be submitted to HMRC by 31 January following the end of the tax year (e.g. 31 January 2026 for the 2024/25 tax year).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Class 2 vs Class 4 National Insurance Explained
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4">
            Sole traders pay different classes of National Insurance than PAYE employees (who pay Class 1 NI). Recent legislative reforms have significantly changed how self-employed National Insurance is structured:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Class 2 National Insurance (State Pension Credits)</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                From 6 April 2024, self-employed workers with annual profits at or above the Small Profits Threshold (£6,725) automatically receive qualifying National Insurance credits toward the UK State Pension at £0 cost. If your profits fall below £6,725, you can opt to pay voluntary Class 2 NI (£3.45/week or £179.40/year) to protect your contributory benefits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Class 4 National Insurance (Profit Surtax)</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
                Class 4 NI is calculated directly on your net profits. You pay 6% on profits between the Lower Profits Limit (£12,570) and the Upper Profits Limit (£50,270), and 2% on any profit above £50,270. Class 4 contributions do not grant direct benefit credits but form part of your overall statutory tax bill.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Payments on Account: What Self-Employed Workers Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            If your combined annual Income Tax and Class 4 NI bill exceeds £1,000 (and less than 80% was collected via PAYE elsewhere), HMRC automatically enrolls you in the Payments on Account regime. This requires you to pay your tax in advance across two installments:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2 text-xs">
            <ul className="list-disc list-inside space-y-1.5 text-[#525252] dark:text-[#A3A3A3]">
              <li>
                <strong className="text-[#111111] dark:text-[#F5F5F5]">31 January:</strong> You pay 100% of your balancing payment for the prior tax year, PLUS your 1st Payment on Account (equal to 50% of your estimated upcoming tax liability).
              </li>
              <li>
                <strong className="text-[#111111] dark:text-[#F5F5F5]">31 July:</strong> You pay your 2nd Payment on Account (the remaining 50% of your estimated upcoming tax liability).
              </li>
              <li>
                <strong className="text-[#111111] dark:text-[#F5F5F5]">Cashflow Planning Tip:</strong> In your first year of full-time self-employment, you will owe 150% of your annual tax bill by 31 January. Setting aside 25% to 30% of all customer invoices into a dedicated tax savings account ensures you have sufficient liquidity when the deadline arrives.
              </li>
            </ul>
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
              to="/umbrella-company-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Umbrella Company Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/inside-ir35-calculator"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>Inside IR35 Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <FaqAccordion items={SELF_EMPLOYED_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
export default SelfEmployedTaxPage;
