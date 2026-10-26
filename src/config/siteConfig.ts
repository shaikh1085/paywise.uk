/**
 * PayWise UK - Central Site, SEO & Brand Configuration
 * Note: og-image.png is located at /public/og-image.png with exact dimensions 1200x630px.
 */

export const SITE_CONFIG = {
  siteName: 'PayWise UK',
  domain: 'https://paywiseuk.vercel.app',
  defaultSocialImage: 'https://paywiseuk.vercel.app/og-image.png',
  // Logo: /public/logo.png does NOT exist. The real logo file in /public is
  // paywise_uk_favicon_icon.svg (og-image.png is a 1200x630 banner, not a logo).
  logo: 'https://paywiseuk.vercel.app/paywise_uk_favicon_icon.svg',
  // TODO — REPLACE WITH A REAL MAILBOX: contact@paywiseuk.vercel.app is not
  // a real mailbox (a vercel.app subdomain has no mail). Keep this in ONE
  // config value (here) and update it here only when a real address exists.
  contactEmail: 'contact@paywiseuk.vercel.app',
  locale: 'en-GB',
  currency: 'GBP',
  currencySymbol: '£',
  twitterHandle: '@PayWiseUK',
  // SINGLE SOURCE for "last updated" — Footer and taxConfig both read this
  // value (taxConfig mirrors it, see TAX_CONFIG_METADATA). Change it here only.
  lastUpdated: '26 October 2026',
  // ADS_ENABLED: third-party ad scripts / NativeBanner load ONLY when true.
  // Default false, so the live site shows no ads until the owner opts in.
  ADS_ENABLED: false,
  legal: {
    privacyPolicy: 'https://paywiseuk.vercel.app/privacy-policy',
    termsOfUse: 'https://paywiseuk.vercel.app/terms-of-use',
    disclaimer: 'https://paywiseuk.vercel.app/disclaimer',
    about: 'https://paywiseuk.vercel.app/about',
    contact: 'https://paywiseuk.vercel.app/contact',
  },
  socialLinks: {
    twitter: 'https://twitter.com/PayWiseUK',
    linkedin: 'https://linkedin.com/company/paywise-uk',
    github: 'https://github.com/PayWiseUK',
  },
  meta: {
    themeColor: '#059669',
    backgroundColor: '#0A0A0A',
    author: 'PayWise UK',
    geoRegion: 'GB',
    geoPlacename: 'United Kingdom',
  },
};

