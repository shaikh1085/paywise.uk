import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { Calculator, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-5">
      <SEO
        title="Page Not Found | PayWise UK"
        description="The requested page could not be found. Explore our free UK salary and take-home pay calculators."
        canonicalPath="/404"
        noindex={true}
      />

      <div className="w-16 h-16 rounded-2xl bg-[#F5F5F5] dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] mx-auto flex items-center justify-center font-black text-2xl shadow-xs">
        404
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
        Page Not Found
      </h1>

      <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] max-w-md mx-auto">
        The page you are looking for might have been moved or removed. Check out our main UK take-home pay calculator or salary tools below.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors btn-press w-full sm:w-auto"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/calculators"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] font-bold text-xs sm:text-sm transition-colors btn-press w-full sm:w-auto"
        >
          <Calculator className="w-4 h-4" />
          <span>Browse All Calculators</span>
        </Link>
      </div>
    </div>
  );
};
