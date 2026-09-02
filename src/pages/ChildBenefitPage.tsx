import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ChildBenefitCalculator } from '../components/calculators/ChildBenefitCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { CHILD_BENEFIT_FAQS } from '../data/faqsData';
import { ArrowRight } from 'lucide-react';

export const ChildBenefitPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Child Benefit Calculator UK', path: '/child-benefit-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Child Benefit Calculator UK 2025/26 | HICBC High Income Charge"
        description="Calculate your UK Child Benefit and High Income Child Benefit Charge (HICBC) for 2025/26. See exactly how much you keep after the tax charge, and whether to claim or opt out."
        keywords={[
          'child benefit calculator uk',
          'high income child benefit charge calculator',
          'hicbc calculator 2025',
          'child benefit 2025 uk',
          'child benefit threshold 2025',
          'should i claim child benefit',
          'child benefit tax charge calculator',
          'child benefit over 60000',
          'child benefit 80000 income',
          'child benefit rates 2025 2026',
        ]}
        canonicalPath="/child-benefit-calculator"
        isCalculator={true}
        calculatorName="Child Benefit & HICBC Calculator UK 2025/26"
        calculatorDescription="Calculate your Child Benefit entitlement and High Income Child Benefit Charge (HICBC) for 2025/26, with net benefit after tax charge and personalised recommendation."
        faqs={CHILD_BENEFIT_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          HICBC threshold £60,000 · Updated April 2024
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Child Benefit Calculator UK 2025/26
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate your Child Benefit entitlement for 2025/26 and find out how much you keep after the High Income Child Benefit Charge (HICBC). Enter the number of children and the higher earner's income to instantly see your gross benefit, the tax charge, and your net annual and monthly payment — with a personalised recommendation on whether to claim.
        </p>
      </div>

      <ChildBenefitCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How the HICBC works in 2025/26
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Since April 2024, the High Income Child Benefit Charge threshold is £60,000. For every £200 of adjusted net income above £60,000, 1% of the Child Benefit is clawed back. At £80,000 the full benefit is charged back.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {[
              { income: 'Under £60,000', charge: 'No charge', keep: '100% of benefit', color: 'border-[#059669]/30 dark:border-[#10B981]/30 bg-[#F0FDF4] dark:bg-[#052e16]' },
              { income: '£60,000–£80,000', charge: '1–99% charge', keep: 'Partial benefit', color: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20' },
              { income: 'Over £80,000', charge: '100% charge', keep: 'Net benefit = £0', color: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20' },
            ].map((row, i) => (
              <div key={i} className={`p-4 rounded-xl border space-y-1 ${row.color}`}>
                <p className="font-black text-[#111111] dark:text-[#F5F5F5]">{row.income}</p>
                <p className="text-[#525252] dark:text-[#A3A3A3]">{row.charge}</p>
                <p className="font-semibold text-[#111111] dark:text-[#F5F5F5]">{row.keep}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            Why you should still claim even above £80,000
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: 'National Insurance credits', desc: 'Claiming Child Benefit protects your State Pension entitlement. Each year of Child Benefit claim counts as a qualifying year of NI contributions — worth £302/year to your future State Pension.' },
              { title: 'Child\'s National Insurance number', desc: 'HMRC automatically issues a National Insurance number to children whose parents claim Child Benefit before the child turns 16. Not claiming could delay this process.' },
              { title: 'How to opt out of payments', desc: 'You can claim Child Benefit but opt out of receiving the payments. This protects your NI credits and your child\'s NI number without triggering the HICBC charge. Opt out via the HMRC online portal or the Child Benefit claim form.' },
              { title: 'Pension contributions can help', desc: 'Increasing pension contributions reduces your adjusted net income. A £10,000 extra pension contribution on a £70,000 income brings you to £60,000 — eliminating the HICBC entirely and keeping the full benefit.' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
                <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">{item.title}</h3>
                <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5]">
            Related UK tax calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/take-home-pay-calculator', label: 'Take-Home Pay Calculator' },
              { to: '/pension-calculator', label: 'Pension Calculator' },
              { to: '/salary-calculators', label: 'All Calculators Hub' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <FaqAccordion items={CHILD_BENEFIT_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default ChildBenefitPage;
