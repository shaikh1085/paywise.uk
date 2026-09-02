import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component automatically scrolls the window to the top
 * whenever the route (pathname, search, or hash) changes, and handles
 * internal link clicks smoothly.
 *
 * This ensures that clicking any calculator link from the footer,
 * navigation menu, sidebar, or hub pages immediately scrolls the user
 * to the calculator at the top of the page.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there is an anchor hash (e.g. #calculator or #results), scroll to that element
    if (hash) {
      const elementId = hash.replace('#', '');
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    // Scroll window immediately to top for snappy page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    // Fallback check after DOM paint
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    }, 40);

    return () => clearTimeout(timer);
  }, [pathname, search, hash]);

  // Also listen for internal link clicks (even if already on the same page)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // If clicking an internal link
      if (href && (href.startsWith('/') || href.startsWith('#')) && !target.hasAttribute('download') && target.target !== '_blank') {
        // If navigating to the same URL or hash, smoothly scroll up
        if (href === window.location.pathname || href === '#') {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
};

/**
 * Helper function that can be attached to any button or link to ensure
 * smooth auto-scroll to the top or to the active calculator container.
 */
export const scrollToTopSmooth = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const scrollToElement = (elementId: string) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    scrollToTopSmooth();
  }
};

