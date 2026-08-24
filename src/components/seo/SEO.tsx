import React, { useEffect } from 'react';
import { BreadcrumbItem, FaqItem } from '../../types';
import { SITE_CONFIG } from '../../config/siteConfig';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  isCalculator?: boolean;
  calculatorName?: string;
  calculatorDescription?: string;
  isArticle?: boolean;
  articleDatePublished?: string;
  articleDateModified?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogType = 'website',
  breadcrumbs,
  faqs,
  isCalculator = false,
  calculatorName,
  calculatorDescription,
  isArticle = false,
  articleDatePublished,
  articleDateModified,
  noindex = false,
}) => {
  const safeCanonical = canonicalPath ? String(canonicalPath) : '';
  const normalizedPath = safeCanonical
    ? (safeCanonical === '/' ? '' : safeCanonical.startsWith('/') ? safeCanonical : `/${safeCanonical}`)
    : '';
  const fullCanonicalUrl = `${SITE_CONFIG.domain}${normalizedPath}`;
  
  const fullTitle = title.includes('PayWise UK') ? title : `${title} | ${SITE_CONFIG.siteName}`;

  useEffect(() => {
    // 1. Ensure HTML lang is en-GB
    document.documentElement.lang = 'en-GB';

    // 2. Update Document Title
    document.title = fullTitle;

    // 3. Helper to set or update meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    
    // Robots meta tag with noindex support
    const robotsDirective = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsDirective);
    
    setMetaTag('name', 'author', SITE_CONFIG.siteName);
    setMetaTag('name', 'geo.region', SITE_CONFIG.meta.geoRegion);
    setMetaTag('name', 'geo.placename', SITE_CONFIG.meta.geoPlacename);
    setMetaTag('name', 'language', 'English (UK)');
    setMetaTag('name', 'theme-color', SITE_CONFIG.meta.themeColor);

    // OpenGraph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.siteName);
    setMetaTag('property', 'og:locale', 'en_GB');
    setMetaTag('property', 'og:image', SITE_CONFIG.defaultSocialImage);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', SITE_CONFIG.defaultSocialImage);
    setMetaTag('name', 'twitter:site', SITE_CONFIG.twitterHandle);

    // Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // 4. Structured Data (JSON-LD) - Remove old tag first to prevent conflicts
    const scriptId = 'paywise-jsonld-schema';
    const oldScript = document.getElementById(scriptId);
    if (oldScript) {
      oldScript.remove();
    }

    const scriptElement = document.createElement('script');
    scriptElement.id = scriptId;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);

    const schemas: any[] = [];

    // Homepage Organization & WebSite Schemas
    if (!canonicalPath || canonicalPath === '/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.domain,
        logo: SITE_CONFIG.logo,
        sameAs: [
          SITE_CONFIG.socialLinks.twitter,
          SITE_CONFIG.socialLinks.linkedin,
          SITE_CONFIG.socialLinks.github,
        ].filter(Boolean),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: SITE_CONFIG.contactEmail,
          areaServed: 'GB',
          availableLanguage: ['en-GB', 'en'],
        },
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.domain,
        inLanguage: 'en-GB',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.domain}/salary-calculators?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      });
    }

    // Article Schema for Guide pages
    if (isArticle) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        datePublished: articleDatePublished || '2025-04-06',
        dateModified: articleDateModified || '2026-04-06',
        author: {
          '@type': 'Organization',
          name: SITE_CONFIG.siteName,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.domain,
        },
        inLanguage: 'en-GB',
      });
    }

    // Breadcrumbs Schema on all non-home indexable pages
    if (breadcrumbs && breadcrumbs.length > 0 && canonicalPath !== '' && canonicalPath !== '/') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.domain,
          },
          ...breadcrumbs.map((b, idx) => {
            const label = b.label || b.name || 'Page';
            const rawPath = b.path || b.item || '';
            const itemUrl = rawPath.startsWith('http')
              ? rawPath
              : `${SITE_CONFIG.domain}${rawPath.startsWith('/') ? rawPath : `/${rawPath}`}`;
            return {
              '@type': 'ListItem',
              position: idx + 2,
              name: label,
              item: itemUrl,
            };
          }),
        ],
      });
    }

    // Calculator SoftwareApplication Schema (only if accurate and visible calculator)
    if (isCalculator) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: calculatorName || fullTitle,
        description: calculatorDescription || description,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web Browser',
        inLanguage: 'en-GB',
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'GBP',
        },
      });
    }

    // FAQPage Schema - only when FAQs are supplied and visible on the page
    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: 'en-GB',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    scriptElement.textContent = JSON.stringify(schemas);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [
    fullTitle,
    description,
    keywords,
    fullCanonicalUrl,
    canonicalPath,
    ogType,
    breadcrumbs,
    faqs,
    isCalculator,
    calculatorName,
    calculatorDescription,
    isArticle,
    articleDatePublished,
    articleDateModified,
    noindex,
  ]);

  return null;
};

