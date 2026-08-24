import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { SALARY_SACRIFICE_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, CheckCircle2, Calculator, Percent, Sparkles } from 'lucide-react';

export const GuideSalarySacrificePage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Guides', path: '/guides' },
    { label: 'What is Salary Sacrifice?', path: '/guides/what-is-salary-sacrifice' },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="What is Salary Sacrifice? UK Guide to Tax & NI Savings"
        description="Learn how UK salary sacrifice schemes work for pensions, electric cars and cycle to work. Calculate tax and National Insurance savings."
        keywords={[
          'what is salary sacrifice UK',
          'salary sacrifice pension guide',
          'salary sacrifice electric car scheme',
          'cycle to work salary sacrifice',
          'salary sacrifice tax savings uk',
        ]}
        canonicalPath="/guides/what-is-salary-sacrifice"
        ogType="article"
        isArticle={true}
        articleDatePublished="2025-04-06"
        articleDateModified="2026-04-06"
        faqs={SALARY_SACRIFICE_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          UK Tax Planning Guide ({TAX_CONFIG_METADATA.currentTaxYearLabel})
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          What is Salary Sacrifice in the UK?
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Salary sacrifice is a formal, HMRC-recognised contractual arrangement where you agree to reduce your gross cash salary in exchange for non-cash workplace benefits.
        </p>
      </header>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Salary Sacrifice Generates Tax and National Insurance Savings
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            When you contribute to a standard pension from net salary (relief at source), you save Income Tax but still pay National Insurance on the entire gross wage. Under salary sacrifice, your contractual gross wage is reduced before payroll calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Workplace Pensions</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Save 20% to 45% Income Tax plus 8% or 2% employee National Insurance on every £1 sacrificed into your retirement pot.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Electric Vehicles (EVs)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Lease a brand new electric car from pre-tax gross salary, paying only a modest 2% Benefit-in-Kind (BiK) rate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Cycle to Work Schemes</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Acquire commuter bicycles and cycling accessories with zero Income Tax and zero NI deductions spread across 12 to 24 monthly salary reductions.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Are there any downsides or limitations to salary sacrifice?
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Because salary sacrifice reduces your official contracted gross pay, it cannot legally reduce your earnings below the National Minimum Wage. In addition, some mortgage lenders calculate borrowing limits using post-sacrifice base salary (though most now accept pre-sacrifice figures with an employer letter).
          </p>
        </div>
      </div>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
            Calculate your exact salary sacrifice savings
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
            Test different sacrifice amounts and see your take-home pay impact immediately.
          </p>
        </div>
        <Link
          to="/salary-sacrifice-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Launch Calculator</span>
        </Link>
      </div>

      <FaqAccordion items={SALARY_SACRIFICE_FAQS} />
      <DisclaimerNotice />
    </article>
  );
};
