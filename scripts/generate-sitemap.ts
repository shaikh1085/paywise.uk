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
import { CANONICAL_ROUTES } from './canonical-routes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const domain = SITE_CONFIG.domain.replace(/\/$/, '');

// Canonical URLs, in site order. These match each page's canonicalPath /
// canonicalUrl in src/pages and src/config/calculatorContentConfig.ts.
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
