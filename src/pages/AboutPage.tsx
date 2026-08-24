import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { ShieldCheck, Target, Calculator, Users, Lock, Sparkles, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'About PayWise UK', path: '/about' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="About PayWise UK | Free UK Salary & Tax Calculators"
        description="Learn about PayWise UK, our mission to make UK salary and tax calculations transparent, and our methodology."
        keywords={[
          'about PayWise UK',
          'uk salary calculator methodology',
          'hmrc tax calculation accuracy',
          'uk paye transparency',
        ]}
        canonicalPath="/about"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Our Mission & Standards
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          About PayWise UK
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          PayWise UK is an independent, free financial calculation platform engineered to bring clarity, precision, and privacy to UK payroll and tax calculations.
        </p>
      </header>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Why We Built PayWise UK
          </h2>
          <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Understanding your take-home pay in the UK has become increasingly complex due to progressive tax bands, devolved Scottish income tax rates, varying student loan repayment plans, workplace pension relief methods, and salary sacrifice mechanics. PayWise UK was built to provide transparent, accurate, and completely private salary calculation tools with zero ads and zero data harvesting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Mathematical Precision</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs">
              Every formula is benchmarked against official HMRC guidelines, statutory tax thresholds, and pension regulations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">100% Client-Side Privacy</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs">
              Calculations run entirely inside your browser. Your salary and financial details are never transmitted to our servers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#151515] border border-[#E5E5E5] dark:border-[#2A2A2A] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#059669]/10 text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111111] dark:text-[#F5F5F5]">Updated Annually</h3>
            <p className="text-[#525252] dark:text-[#A3A3A3] text-xs">
              Configured for the {TAX_CONFIG_METADATA.currentTaxYearLabel} UK tax year, including the latest National Insurance rates and Scottish tax tiers.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            Explore Our Calculator Suite
          </h2>
          <p className="text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Whether you are evaluating a permanent job offer, negotiating an IT contractor day rate, estimating NHS agenda for change step progression, or planning pension salary sacrifice, our calculators provide instant estimates.
          </p>
          <div className="mt-4">
            <Link
              to="/salary-calculators"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <DisclaimerNotice />
    </div>
  );
};
