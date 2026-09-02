import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { GradientBackground } from '../components/common/GradientBackground';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { TAX_CONFIG_METADATA } from '../config/taxConfig';
import { BookOpen, ArrowRight, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export const GuidesIndexPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'UK Salary & Tax Guides', path: '/guides' },
  ];

  const guides = [
    {
      title: '£50,000 Salary After Tax in the UK',
      description: 'Comprehensive take-home breakdown for a £50k salary. Monthly net pay, 20% vs 40% tax bands, National Insurance, and pension deductions.',
      path: '/guides/50000-salary-after-tax-uk',
      category: 'Salary Benchmark',
      readTime: '4 min read',
      icon: TrendingUp,
    },
    {
      title: '£60,000 Salary After Tax in the UK',
      description: 'Detailed analysis of a £60k salary crossing into the 40% higher rate tax bracket, child benefit charge thresholds, and salary sacrifice benefits.',
      path: '/guides/60000-salary-after-tax-uk',
      category: 'Higher Rate Tax',
      readTime: '5 min read',
      icon: Sparkles,
    },
    {
      title: 'What is Salary Sacrifice in the UK?',
      description: 'How contractual salary sacrifice schemes work for pensions, electric vehicle leases, and cycle to work schemes to maximise tax and NI savings.',
      path: '/guides/what-is-salary-sacrifice',
      category: 'Tax Strategy',
      readTime: '6 min read',
      icon: BookOpen,
    },
    {
      title: 'How UK Income Tax Works',
      description: 'Complete guide to the UK Income Tax system, Personal Allowance rules, progressive tax bands in England/Wales/NI, and Scottish devolved tax rates.',
      path: '/guides/how-income-tax-works-uk',
      category: 'Tax Education',
      readTime: '5 min read',
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="relative space-y-10 sm:space-y-12 pb-20 overflow-hidden">
      <GradientBackground />

      <SEO
        title="UK Salary & Tax Guides | PayWise UK"
        description="Explore practical UK salary and tax guides covering £50k and £60k take-home pay, salary sacrifice, and income tax bands."
        keywords={[
          'UK salary guides',
          'uk tax guide',
          'take home pay guides',
          'salary sacrifice guide uk',
          'uk income tax explained',
        ]}
        canonicalPath="/guides"
        breadcrumbs={breadcrumbs}
      />

      <section className="pt-6 sm:pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-4 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
            UK Payroll & Tax Education ({TAX_CONFIG_METADATA.currentTaxYearLabel})
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
            UK Salary & Tax Guides
          </h1>
          <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
            Practical, plain-English guides to help you navigate UK income tax brackets, National Insurance contributions, workplace pension tax relief, and salary sacrifice arrangements.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.path}
                to={g.path}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:border-[#059669] dark:hover:border-[#10B981] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] text-[#059669] dark:text-[#10B981] flex items-center justify-center font-bold border border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F5F5F5] dark:bg-[#222222] text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                        {g.category}
                      </span>
                      <span className="text-3xs text-[#737373] dark:text-[#888888] font-medium">
                        {g.readTime}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] mt-2 leading-relaxed">
                    {g.description}
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center text-xs font-bold text-[#059669] dark:text-[#10B981]">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice />
      </div>
    </div>
  );
};
