import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MaternityCalculator } from '../components/calculators/MaternityCalculator';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { MATERNITY_FAQS } from '../data/faqsData';
import { ArrowRight } from 'lucide-react';

export const MaternityPayPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Calculators', path: '/salary-calculators' },
    { label: 'Maternity Pay Calculator UK', path: '/maternity-pay-calculator' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Maternity Pay Calculator UK 2025/26 | SMP, SPP & Shared Parental Pay"
        description="Calculate your UK Statutory Maternity Pay (SMP), Paternity Pay (SPP), Adoption Pay and Shared Parental Pay for 2025/26. Free calculator with week-by-week breakdown and enhanced pay support."
        keywords={[
          'maternity pay calculator uk',
          'statutory maternity pay calculator 2025',
          'smp calculator uk 2025',
          'how much is maternity pay uk',
          'paternity pay calculator uk',
          'shared parental pay calculator',
          'statutory paternity pay 2025',
          'maternity allowance calculator',
          'enhanced maternity pay calculator',
          'maternity pay 2025 2026 uk',
        ]}
        canonicalPath="/maternity-pay-calculator"
        isCalculator={true}
        calculatorName="UK Maternity & Paternity Pay Calculator 2025/26"
        calculatorDescription="Calculate Statutory Maternity Pay (SMP), Paternity Pay (SPP), Adoption Pay and Shared Parental Pay for 2025/26 with a full week-by-week breakdown."
        faqs={MATERNITY_FAQS}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          SMP £187.18/wk · Updated April 2025
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Maternity & Paternity Pay Calculator UK 2025/26
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Calculate your Statutory Maternity Pay (SMP), Paternity Pay (SPP), Adoption Pay, or Shared Parental Pay for 2025/26. Enter your average weekly earnings and get an instant week-by-week breakdown of exactly what you will receive and when — including employer enhanced pay.
        </p>
      </div>

      <MaternityCalculator />

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-8">

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            UK Statutory Maternity Pay rates 2025/26
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="text-left py-2.5 px-3 font-bold text-[#111111] dark:text-[#F5F5F5]">Pay Type</th>
                  <th className="text-right py-2.5 px-3 font-bold text-[#111111] dark:text-[#F5F5F5]">2024/25</th>
                  <th className="text-right py-2.5 px-3 font-bold text-[#111111] dark:text-[#F5F5F5]">2025/26</th>
                  <th className="text-right py-2.5 px-3 font-bold text-[#111111] dark:text-[#F5F5F5]">Duration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'SMP — First 6 weeks', prev: '90% AWE', curr: '90% AWE', dur: '6 weeks' },
                  { type: 'SMP — Weeks 7–39', prev: '£184.03/wk', curr: '£187.18/wk', dur: '33 weeks' },
                  { type: 'Statutory Paternity Pay', prev: '£184.03/wk', curr: '£187.18/wk', dur: '1–2 weeks' },
                  { type: 'Statutory Adoption Pay', prev: '£184.03/wk', curr: '£187.18/wk', dur: '39 weeks' },
                  { type: 'Shared Parental Pay', prev: '£184.03/wk', curr: '£187.18/wk', dur: 'Up to 37 weeks' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#F5F5F5] dark:border-[#1A1A1A] hover:bg-[#FAFAFA] dark:hover:bg-[#151515]">
                    <td className="py-2.5 px-3 font-semibold text-[#111111] dark:text-[#F5F5F5]">{row.type}</td>
                    <td className="py-2.5 px-3 text-right text-[#525252] dark:text-[#A3A3A3]">{row.prev}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#059669] dark:text-[#10B981]">{row.curr}</td>
                    <td className="py-2.5 px-3 text-right text-[#525252] dark:text-[#A3A3A3]">{row.dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5]">
            SMP eligibility checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { check: '✅', text: 'You are an employee (not self-employed)' },
              { check: '✅', text: 'You have worked for your employer for at least 26 weeks by the 15th week before your due date' },
              { check: '✅', text: 'You earn at least £125/week (2025/26) on average before tax' },
              { check: '✅', text: 'You are still employed (or were employed) in the qualifying week' },
              { check: '❌', text: 'If self-employed, you do not qualify for SMP — apply for Maternity Allowance instead' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 p-3 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <span className="shrink-0">{item.check}</span>
                <span className="text-[#525252] dark:text-[#A3A3A3] leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5]">
            Related UK salary tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { to: '/take-home-pay-calculator', label: 'Take-Home Pay Calculator' },
              { to: '/net-to-gross-calculator', label: 'Net to Gross Calculator' },
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

      <FaqAccordion items={MATERNITY_FAQS} />
      <DisclaimerNotice />
    </div>
  );
};

export default MaternityPayPage;
