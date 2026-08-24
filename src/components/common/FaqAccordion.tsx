import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../../types';

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Find clear answers to common questions about UK income tax, take-home pay calculations, and statutory payroll deductions.',
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-6 sm:p-8 my-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-7 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#059669] dark:text-[#10B981] text-2xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tax Knowledge Base</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            const questionId = `faq-q-${idx}`;
            const answerId = `faq-a-${idx}`;

            return (
              <div
                key={item.question}
                className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                  isOpen
                    ? 'border-[#059669] dark:border-[#10B981] bg-white dark:bg-[#171717]'
                    : 'border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#151515] hover:border-[#CCCCCC] dark:hover:border-[#383838]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleIndex(idx)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-4 font-bold text-[#111111] dark:text-[#F5F5F5] hover:text-[#059669] dark:hover:text-[#10B981] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] text-xs sm:text-sm transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#737373] dark:text-[#888888] transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#059669] dark:text-[#10B981]' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`px-4 text-xs sm:text-sm leading-relaxed text-[#525252] dark:text-[#A3A3A3] ${
                    isOpen ? 'pb-4 pt-1 block' : 'hidden'
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
