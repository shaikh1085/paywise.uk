/**
 * PayWise UK — sitemap + robots generator.
 * Run automatically before `vite build` via the "prebuild" script.
 *
 * Canonical routes ONLY — one URL per page. Alias / redirect routes,
 * /admin/* and the /404 page are deliberately excluded, even though they
 * still work in the app (they <Navigate> to the canonical URL).
 *
 * Domain comes from ONE place: SITE_CONFIG.domain in src/config/siteConfig.ts.
 * Changing to a custom domain later is a one-line change there, plus the
 * hardcoded canonical/OG tags in index.html (see report — that file is
 * static HTML and cannot import the TS config).
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_CONFIG } from '../src/config/siteConfig';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const domain = SITE_CONFIG.domain.replace(/\/$/, '');

// Canonical URLs, in site order. These match each page's canonicalPath /
// canonicalUrl in src/pages and src/config/calculatorContentConfig.ts.
const CANONICAL_ROUTES: string[] = [
  '/',
  '/take-home-pay-calculator',
  '/salary-calculators',
  '/income-tax-calculator',
  '/national-insurance-calculator',
  '/tax-code-calculator',
  '/employer-national-insurance-calculator',
  '/dividend-tax-calculator',
  '/mortgage-calculator',
  '/mortgage-affordability-calculator',
  '/stamp-duty-calculator',
  '/mortgage-overpayment-calculator',
  '/credit-card-repayment-calculator',
  '/isa-calculator',
  '/savings-calculator',
  '/capital-gains-tax-calculator',
  '/day-rate-to-salary-calculator',
  '/hourly-to-salary-calculator',
  '/pension-calculator',
  '/student-loan-repayment-calculator',
  '/salary-sacrifice-calculator',
  '/overtime-pay-calculator',
  '/nhs-salary-calculator',
  '/teacher-salary-calculator',
  '/inside-ir35-calculator',
  '/umbrella-company-calculator',
  '/self-employed-tax-calculator',
  '/pay-rise-calculator',
  '/bonus-tax-calculator',
  '/redundancy-pay-calculator',
  '/council-tax-calculator',
  '/vat-calculator',
  '/net-to-gross-calculator',
  '/salary-comparison-calculator',
  '/pay-frequency-converter',
  '/maternity-pay-calculator',
  '/child-benefit-calculator',
  '/statutory-sick-pay-calculator',
  '/marriage-allowance-calculator',
  '/second-job-tax-calculator',
  '/national-minimum-wage-checker',
  '/inside-vs-outside-ir35-calculator',
  '/guides',
  '/guides/50000-salary-after-tax-uk',
  '/guides/60000-salary-after-tax-uk',
  '/guides/what-is-salary-sacrifice',
  '/guides/how-income-tax-works-uk',
  '/faq',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/disclaimer',
];

const today = new Date().toISOString().split('T')[0];
const xmlEscape = (s: string) => s.replace(/&/g, '&amp;');

const urls = CANONICAL_ROUTES.map((route) => {
  const loc = route === '/' ? `${domain}/` : `${domain}${route}`;
  const priority = route === '/' ? '1.0' : route === '/take-home-pay-calculator' ? '0.9' : '0.8';
  const changefreq = route === '/' ? 'weekly' : 'monthly';
  return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');

writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${domain}/sitemap.xml\n`,
);

console.log(`Sitemap: wrote ${CANONICAL_ROUTES.length} canonical URLs, lastmod ${today}, domain ${domain}`);
