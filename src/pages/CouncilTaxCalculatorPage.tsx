import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CouncilTaxCalculator } from '../components/calculators/CouncilTaxCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { COUNCIL_TAX_FAQS } from '../data/faqsData';
import { ArrowRight } from 'lucide-react';

export const CouncilTaxCalculatorPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Council Tax Calculator UK', path: '/council-tax-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Council Tax Calculator UK | Estimate Your Band A–H Council Tax"
        description="Estimate your annual and monthly UK council tax by band (A–H), region, and household size, including the single person discount."
        keywords={[
          'council tax calculator',
          'council tax calculator uk',
          'council tax band calculator',
          'how much is council tax band c',
          'single person council tax discount calculator',
          'council tax calculator by band',
          'monthly council tax calculator uk',
          'council tax estimate calculator',
          'council tax band d average uk',
          'council tax calculator scotland wales england',
        ]}
        canonicalPath="/council-tax-calculator"
        isCalculator={true}
        calculatorName="Council Tax Calculator UK"
        calculatorDescription="Estimate your annual and monthly UK council tax by band (A–H), region, and household size, including the single person discount."
        faqs={COUNCIL_TAX_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          UK Council Tax Band &amp; Discount Estimator
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Council Tax Calculator UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Estimate your annual and monthly council tax payments by property band (A to H), country, and single-occupant status, or enter your local council's exact Band D rate.
        </p>
      </div>

      <CouncilTaxCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            How Council Tax Bands Work (A to H)
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            In England and Scotland, every domestic property is assigned a Council Tax band from Band A (cheapest) to Band H (most expensive) based on its estimated open-market value on <strong>1 April 1991</strong>. In Wales, bands A to I are based on a 1 April 2003 valuation list.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Band D as the Benchmark</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Councils set their core tax rate for Band D (ratio 9/9 or 100%). All other bands are calculated as fixed statutory fractions of this Band D rate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Lower Bands (A to C)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Band A pays 6/9 (66.7%), Band B pays 7/9 (77.8%), and Band C pays 8/9 (88.9%) of the local Band D figure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-1.5">
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Higher Bands (E to H)</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs leading-relaxed">
              Band E pays 11/9 (122.2%), Band F pays 13/9 (144.4%), Band G pays 15/9 (166.7%), and Band H pays 18/9 (200.0%) in England/Wales.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Single Person Discount and Other Reductions
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            UK council tax rules provide statutory discounts for eligible households:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-3 text-xs">
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                1. Single Person Discount (25% Off):
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                If you are the only adult (aged 18 or older) living in the property, you receive an automatic 25% discount on your full council tax bill.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                2. Disregarded Occupants (Students, Apprentices &amp; Carers):
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                Full-time university students, live-in care workers, and people with severe mental impairments are "disregarded" for council tax purposes. If everyone in the house is a full-time student, the property is 100% exempt from council tax.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111111] dark:text-[#F5F5F5] block">
                3. Disabled Band Reduction Scheme:
              </strong>
              <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
                If you or someone living in your home has a substantial disability requiring an extra room, adapted bathroom, or wheelchair use indoors, you can qualify to have your bill charged at the band below your property's actual band.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Why Council Tax Varies by Local Authority
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
            Your final council tax bill is composed of several independent statutory elements:
          </p>
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2 text-xs">
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Billing Authority Core Charge:</strong> Set by your district, borough, or unitary council to fund local services like waste collection, parks, and planning.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Adult Social Care Precept:</strong> An additional dedicated percentage added by county and unitary councils to cover the rising costs of adult social care services.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Police &amp; Crime Commissioner Precept:</strong> Funds local police forces and community safety.
            </p>
            <p className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              • <strong>Fire and Rescue Authority &amp; Parish Councils:</strong> Local parish, town council, or fire authority charges.
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
              to="/salary-calculators"
              className="p-3 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#059669] dark:hover:border-[#10B981] flex items-center justify-between text-xs font-bold text-[#111111] dark:text-[#F5F5F5] group"
            >
              <span>All Calculators Hub</span>
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

      <FaqAccordion items={COUNCIL_TAX_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};
export default CouncilTaxCalculatorPage;
