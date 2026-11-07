import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTopButton } from '../common/BackToTopButton';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { TaxYearUpdateBanner } from '../common/TaxYearUpdateBanner';
import { ShareButtons } from '../common/ShareButtons';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  // Share strip on every public page (not the hidden admin checklist).
  const showShare = !pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#080808] text-[#111111] dark:text-[#F5F5F5] font-sans transition-colors duration-200 relative selection:bg-[#059669] selection:text-white">
      <Navbar />
      <TaxYearUpdateBanner />
      <main className="flex-grow relative">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      {showShare && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
          <ShareButtons />
        </div>
      )}
      <Footer />
      <BackToTopButton />
    </div>
  );
};

