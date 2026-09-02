import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTopButton } from '../common/BackToTopButton';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { TaxYearUpdateBanner } from '../common/TaxYearUpdateBanner';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#080808] text-[#111111] dark:text-[#F5F5F5] font-sans transition-colors duration-200 relative selection:bg-[#059669] selection:text-white">
      <Navbar />
      <TaxYearUpdateBanner />
      <main className="flex-grow relative">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

