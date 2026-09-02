import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EmployerNiCalculator } from '../components/calculators/EmployerNiCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { CALCULATOR_CONTENT_CONFIG } from '../config/calculatorContentConfig';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, BookOpen, CheckCircle, Info } from 'lucide-react';

export const EmployerNiPage: React.FC = () => {
  const content = CALCULATOR_CONTENT_CONFIG.employer_ni;
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: content.h1, path: `/${content.slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title={content.seoTitle}
        description={content.metaDescription}
        keywords={content.secondaryKeywords}
        canonicalPath={`/${content.slug}`}
        isCalculator={true}
        calculatorName={content.h1}
        calculatorDescription={content.metaDescription}
        faqs={content.faqs}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel} (15% Employer Rate)
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          {content.h1}
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          {content.directAnswerParagraph}
        </p>
      </div>

      <EmployerNiCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            {content.howItWorks.title}
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            {content.howItWorks.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {content.howItWorks.steps && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {content.howItWorks.steps.map((step) => (
                <div key={step.stepNumber} className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
                  <span className="text-xs font-bold text-[#059669] dark:text-[#10B981]">Step {step.stepNumber}</span>
                  <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">{step.title}</h3>
                  <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {content.practicalExample && (
          <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-4">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              {content.practicalExample.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
              {content.practicalExample.scenario}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.practicalExample.breakdown.map((item, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#171717] rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="text-2xs text-[#737373] uppercase font-bold block">{item.label}</span>
                  <p className="text-sm font-black text-[#111111] dark:text-[#F5F5F5] mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#059669] dark:text-[#10B981] font-medium">
              {content.practicalExample.conclusion}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#737373]" />
            Employer NI Rules & Assumptions
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#525252] dark:text-[#A3A3A3]">
            {content.assumptions.map((assump, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#10B981] mt-1.5 shrink-0" />
                <span>{assump}</span>
              </li>
            ))}
          </ul>
        </div>

        {content.relatedCalculators && content.relatedCalculators.length > 0 && (
          <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3">
            <h3 className="text-base font-bold text-[#111111] dark:text-[#F5F5F5]">
              Related UK Financial Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {content.relatedCalculators.map((calc, idx) => (
                <Link
                  key={idx}
                  to={calc.url}
                  className="p-4 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#121212] hover:border-[#059669] dark:hover:border-[#10B981] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] transition-colors">
                      {calc.title}
                    </h4>
                    <p className="text-2xs text-[#737373] mt-1">{calc.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-2xs font-bold text-[#059669] dark:text-[#10B981] mt-2">
                    <span>Calculate now</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqAccordion items={content.faqs} title="Frequently Asked Questions about Employer National Insurance" />
      <DisclaimerNotice />
    </div>
  );
};
