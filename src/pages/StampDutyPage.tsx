import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { StampDutyCalculator } from '../components/calculators/StampDutyCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { CALCULATOR_CONTENT_CONFIG } from '../config/calculatorContentConfig';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ArrowRight, CheckCircle2, Info, BookOpen, Layers } from 'lucide-react';

export const StampDutyPage: React.FC = () => {
  const content = CALCULATOR_CONTENT_CONFIG['stamp_duty'];

  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Stamp Duty Calculator UK', path: '/stamp-duty-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title={content.seoTitle}
        description={content.metaDescription}
        keywords={[content.primaryKeyword, ...content.secondaryKeywords]}
        canonicalPath="/stamp-duty-calculator"
        isCalculator={true}
        calculatorName={content.h1}
        calculatorDescription={content.metaDescription}
        faqs={content.faqs}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Updated for UK Tax Year {TAX_CONFIG_METADATA.currentTaxYearLabel}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          {content.h1}
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          {content.directAnswerParagraph}
        </p>
      </div>

      {/* Calculator Core */}
      <StampDutyCalculator />

      {/* High-Intent SEO Guide & Rates Breakdown Section */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          How Much Stamp Duty Will I Pay in the UK? (SDLT 2025/2026)
        </h2>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Stamp Duty Land Tax (SDLT) is a tiered property purchase tax payable to HMRC on homes bought in England and Northern Ireland. The rate you pay depends directly on the property purchase price and whether you are a first-time buyer, moving home, or purchasing an additional property.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">First-Time Buyers</h3>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              <strong>0% on the first £425,000</strong>, then 5% between £425,001 and £625,000 on homes up to £625,000.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">Home Movers</h3>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              <strong>0% on the first £250,000</strong>, 5% up to £925,000, 10% up to £1.5m, and 12% above £1.5m.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <h3 className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5]">Second Homes & Buy-to-Let</h3>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              <strong>+5% surcharge</strong> across every price band (5% up to £250k, 10% up to £925k, 15% up to £1.5m, 17% above).
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <h3 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5]">
            Stamp Duty Comparison Table by House Price (£250k to £750k)
          </h3>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            Compare how much stamp duty you will pay across representative UK property price tiers:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFAFA] dark:bg-[#121212] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <tr>
                  <th className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">Property Price</th>
                  <th className="py-3 px-4 font-bold text-[#059669] dark:text-[#10B981]">First-Time Buyer</th>
                  <th className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">Home Mover</th>
                  <th className="py-3 px-4 font-bold text-[#DC2626] dark:text-[#F87171]">Second Home / Buy-to-Let</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">£250,000</td>
                  <td className="py-3 px-4 font-bold text-[#059669] dark:text-[#10B981]">£0 (0%)</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£0 (0%)</td>
                  <td className="py-3 px-4 text-[#DC2626] dark:text-[#F87171]">£12,500 (5.0%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">£300,000</td>
                  <td className="py-3 px-4 font-bold text-[#059669] dark:text-[#10B981]">£0 (0%)</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£2,500 (0.8%)</td>
                  <td className="py-3 px-4 text-[#DC2626] dark:text-[#F87171]">£17,500 (5.8%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">£425,000</td>
                  <td className="py-3 px-4 font-bold text-[#059669] dark:text-[#10B981]">£0 (0%)</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£8,750 (2.1%)</td>
                  <td className="py-3 px-4 text-[#DC2626] dark:text-[#F87171]">£30,000 (7.1%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">£500,000</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£3,750 (0.75%)</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£12,500 (2.5%)</td>
                  <td className="py-3 px-4 text-[#DC2626] dark:text-[#F87171]">£37,500 (7.5%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#111111] dark:text-[#F5F5F5]">£750,000</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£25,000 (3.3%)</td>
                  <td className="py-3 px-4 text-[#525252] dark:text-[#A3A3A3]">£25,000 (3.3%)</td>
                  <td className="py-3 px-4 text-[#DC2626] dark:text-[#F87171]">£62,500 (8.3%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Structured Content & Methodology */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">
        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#059669] dark:text-[#10B981]" />
            {content.howItWorks.title}
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            {content.howItWorks.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* 3 Step Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {content.howItWorks.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2"
              >
                <div className="w-7 h-7 rounded-xl bg-[#059669] dark:bg-[#10B981] text-white font-bold flex items-center justify-center text-xs">
                  {step.stepNumber}
                </div>
                <h3 className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">{step.title}</h3>
                <p className="text-2xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Example */}
        {content.practicalExample && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">
                {content.practicalExample.title}
              </h3>
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                {content.practicalExample.scenario}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                  {content.practicalExample.breakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white dark:hover:bg-[#171717] transition-colors">
                      <td className="py-2.5 px-3 font-medium text-[#525252] dark:text-[#A3A3A3]">
                        {item.label}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#111111] dark:text-[#F5F5F5]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
              {content.practicalExample.conclusion}
            </p>
          </div>
        )}

        {/* Assumptions & Methodology */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#737373]" />
            Calculation Assumptions & Rules
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

        {/* Related Calculators */}
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

      {/* FAQs Section */}
      <FaqAccordion items={content.faqs} title="Frequently Asked Questions about Stamp Duty Land Tax" />

      {/* Standard Disclaimer Notice */}
      <DisclaimerNotice />
    </div>
  );
};
