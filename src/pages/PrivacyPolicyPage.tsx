import React from 'react';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Privacy Policy | PayWise UK"
        description="Read the PayWise UK privacy policy to understand how we protect your data. All calculations run client-side with no salary data stored."
        keywords={[
          'PayWise UK privacy policy',
          'uk salary calculator data privacy',
          'client side tax calculations',
          'financial calculator privacy',
        ]}
        canonicalPath="/privacy-policy"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] dark:bg-[#10B981]" />
          Zero Data Retention
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Last updated: January 2026. At PayWise UK, your financial privacy is paramount. Learn how we handle your information.
        </p>
      </header>

      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] space-y-6 text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            1. Client-Side Processing Architecture
          </h2>
          <p>
            All financial figures, gross income amounts, pension percentages, student loan selections, and tax codes inputted into PayWise UK calculators are processed exclusively inside your web browser using client-side JavaScript. None of your financial calculations are transmitted to, stored on, or logged by our web servers.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            2. Local Storage Usage
          </h2>
          <p>
            We may use your browser’s local storage solely to remember non-sensitive user interface preferences, such as your selected dark/light visual theme or recent tax year toggle. No personally identifiable financial data is synchronized across the web.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            3. Third-Party Analytics & Cookies
          </h2>
          <p>
            We do not sell, rent, or monetize your usage data. Any technical telemetry utilized is solely aggregated for performance monitoring, uptime verification, and site reliability.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-[#F5F5F5] mb-2">
            4. External Links
          </h2>
          <p>
            PayWise UK contains informational links to external government portals (such as GOV.UK and HMRC). We are not responsible for the privacy practices or content of third-party domains.
          </p>
        </div>
      </div>

      <DisclaimerNotice />
    </div>
  );
};
