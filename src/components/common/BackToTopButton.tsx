import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-xl bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-[#059669] dark:hover:border-[#10B981] hover:text-[#059669] dark:hover:text-[#10B981] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#059669] btn-press"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
