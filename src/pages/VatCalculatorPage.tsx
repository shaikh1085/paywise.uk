import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { VatCalculator } from '../components/calculators/VatCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { VAT_FAQS } from '../data/faqsData';
import { ArrowRight } from 'lucide-react';

export const VatCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'VAT Calculator UK', path: '/vat-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="VAT Calculator UK | Add or Remove VAT at 20%, 5% or 0%"
        description="Free UK VAT calculator. Add VAT to a net price or remove VAT from a gross price at the standard 20%, reduced 5%, or zero 0% rate. Instant ex-VAT and inc-VAT results."
        keywords={[
          'vat calculator uk',
          'add vat calculator',
          'remove vat calculator uk',
          'vat calculator 20',
          'ex vat calculator',
          'inc vat calculator',
          'uk vat calculator 2025',
          'reverse vat calculator uk',
          'vat amount calculator',
          'how to calculate vat uk',
        ]}
        canonicalPath="/vat-calculator"
        isCalculator={true}
        calculatorName="VAT Calculator UK"
        calculatorDescription="Add VAT to a net price or remove VAT from a gross price at the UK standard 20%, reduced 5%, or zero 0% rate."
        faqs={VAT_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Standard 20% · Reduced 5% · Zero 0%
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          VAT Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Add VAT to a net (ex-VAT) price or remove VAT from a gross (inc-VAT) price at the UK standard rate of 20%, the reduced rate of 5%, or the zero rate of 0%. Instant results with a full net, VAT, and gross breakdown.
        </p>
      </div>

      <VatCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            How to calculate VAT in the UK
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            UK VAT (Value Added Tax) is charged at three rates depending on the type of goods or service. Here is how to calculate each:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Adding 20% VAT</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">Multiply the net price by <strong>1.20</strong>. Example: £500 net × 1.20 = £600 gross. VAT amount = £100.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Removing 20% VAT</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">Divide the gross price by <strong>1.20</strong>. Example: £600 gross ÷ 1.20 = £500 net. Do not subtract 20% directly — that gives the wrong answer.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Adding 5% Reduced VAT</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">Multiply the net price by <strong>1.05</strong>. To remove 5% VAT from a gross price, divide by <strong>1.05</strong>.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            UK VAT rates explained (2025/26)
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">Standard Rate — 20%</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">The standard rate of 20% applies to most goods and services sold in the UK, including electronics, adult clothing, alcohol, tobacco, most professional services, software, and restaurant meals.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">Reduced Rate — 5%</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">The 5% reduced rate applies to domestic gas and electricity, children's car seats, mobility aids for elderly people, some health products and maternity pads, and certain residential property renovation work.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5] mb-1">Zero Rate — 0%</h3>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">Zero-rated goods are still VAT-taxable, but the rate is 0%. This includes most food and drink for human consumption, children's clothing and shoes, books, newspapers and magazines, public transport fares, and prescription medicines.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5]">
            Related UK tax calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/take-home-pay-calculator', label: 'Take-Home Pay Calculator' },
              { to: '/self-employed-tax-calculator', label: 'Self-Employed Tax Calculator' },
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

      <FaqAccordion items={VAT_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default VatCalculatorPage;
