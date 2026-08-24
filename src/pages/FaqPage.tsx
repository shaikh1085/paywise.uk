import React, { useState, useMemo } from 'react';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { DisclaimerNotice } from '../components/common/DisclaimerNotice';
import { FAQ_PAGE_GROUPS } from '../data/faqsData';
import { Search } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'Frequently Asked Questions', path: '/faq' },
  ];

  const allFaqs = useMemo(() => {
    return FAQ_PAGE_GROUPS.flatMap((g) => g.items);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const displayedGroups = useMemo(() => {
    return FAQ_PAGE_GROUPS.map((group) => {
      if (activeCategory !== 'all' && group.category !== activeCategory) {
        return null;
      }
      const filtered = group.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length === 0) return null;
      return {
        ...group,
        items: filtered,
      };
    }).filter(Boolean) as typeof FAQ_PAGE_GROUPS;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="UK Salary Calculator FAQs | PayWise UK"
        description="Find clear answers to UK salary calculator questions about take-home pay, Income Tax, National Insurance, pensions and student loans."
        keywords={[
          'UK salary calculator FAQs',
          'uk tax faqs',
          'paye salary questions',
          'national insurance faqs',
          'pension relief questions uk',
          'student loan plan FAQs uk',
        ]}
        canonicalPath="/faq"
        faqs={allFaqs}
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-2xl space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-[#F5F5F5] tracking-tight">
          UK Salary Calculator FAQs
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          Find clear answers to UK salary calculator questions about take-home pay, Income Tax, National Insurance, pensions and student loans.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] dark:text-[#888888]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g. 'Personal Allowance', 'Plan 2', 'Pension')..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] text-xs sm:text-sm placeholder-[#737373] focus:outline-hidden focus:border-[#059669] dark:focus:border-[#10B981] transition-colors shadow-xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]'
              : 'bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A]'
          }`}
        >
          All Questions ({allFaqs.length})
        </button>
        {FAQ_PAGE_GROUPS.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeCategory === group.category
                ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]'
                : 'bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A]'
            }`}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* FAQ Groups List */}
      <div className="space-y-8">
        {displayedGroups.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3]">
            No matching questions found for "{searchQuery}". Try searching for terms like "Tax", "Pension", "Threshold", or "Plan 2".
          </div>
        ) : (
          displayedGroups.map((group) => (
            <div key={group.category} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#111111] dark:text-[#F5F5F5] tracking-tight">
                {group.title}
              </h2>
              <FaqAccordion items={group.items} />
            </div>
          ))
        )}
      </div>

      <DisclaimerNotice />
    </div>
  );
};

