import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { TAKE_HOME_FAQS } from '../data/faqsData';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

export const GuideIncomeTaxPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Guides', path: '/guides' },
    { label: 'How UK Income Tax Works', path: '/guides/how-income-tax-works-uk' },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="How UK Income Tax Works | Rates, Bands & Personal Allowance"
        description="A clear guide to UK Income Tax rates, bands, Personal Allowance and Scottish tax rates for the 2025/26 tax year."
        keywords={[
          'how UK income tax works',
          'uk income tax bands',
          'personal allowance uk',
          'scottish income tax rates',
          'marginal tax rates uk',
        ]}
        canonicalPath="/guides/how-income-tax-works-uk"
        ogType="article"
        isArticle={true}
        articleDatePublished="2025-04-06"
        articleDateModified="2026-04-06"
        faqs={TAKE_HOME_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          UK Tax Guide ({TAX_CONFIG_METADATA.currentTaxYearLabel})
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          How UK Income Tax Works
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          The UK Income Tax system is progressive: you only pay tax on earnings above statutory thresholds, and each higher rate band applies solely to the income within that band.
        </p>
      </header>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            The Personal Allowance (£12,570)
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Most UK residents receive a standard tax-free Personal Allowance of £12,570 per year. You pay 0% Income Tax on earnings up to this threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
              England, Wales & Northern Ireland
            </h3>
            <ul className="space-y-1 text-[#525252] dark:text-[#A3A3A3] text-xs">
              <li>• <strong>Personal Allowance:</strong> £0 – £12,570 (0%)</li>
              <li>• <strong>Basic Rate:</strong> £12,571 – £50,270 (20%)</li>
              <li>• <strong>Higher Rate:</strong> £50,271 – £125,140 (40%)</li>
              <li>• <strong>Additional Rate:</strong> Over £125,140 (45%)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">
              Scotland Devolved Bands
            </h3>
            <ul className="space-y-1 text-[#525252] dark:text-[#A3A3A3] text-xs">
              <li>• <strong>Starter Rate (19%):</strong> £12,571 – £14,876</li>
              <li>• <strong>Basic Rate (20%):</strong> £14,877 – £26,561</li>
              <li>• <strong>Intermediate Rate (21%):</strong> £26,562 – £43,662</li>
              <li>• <strong>Higher Rate (42%):</strong> £43,663 – £75,000</li>
              <li>• <strong>Advanced Rate (45%):</strong> £75,001 – £125,140</li>
              <li>• <strong>Top Rate (48%):</strong> Over £125,140</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            The £100k Personal Allowance Taper (60% Effective Tax Trap)
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            For every £2 your adjusted net income exceeds £100,000, your £12,570 Personal Allowance is reduced by £1. Between £100,000 and £125,140, this loss of allowance combined with 40% tax creates an effective marginal tax rate of 60% (or 62% including 2% National Insurance).
          </p>
        </div>
      </div>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
            Check your personal tax calculation
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1">
            See your exact income tax band breakdown with the free PayWise UK calculator.
          </p>
        </div>
        <Link
          to="/take-home-pay-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Launch Calculator</span>
        </Link>
      </div>

      <FaqAccordion items={TAKE_HOME_FAQS} />
      <DisclaimerNotice />
    </article>
  );
};
