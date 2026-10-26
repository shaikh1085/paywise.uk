import { SITE_CONFIG } from '../config/siteConfig';

// Third-party ad scripts, loaded ONLY when SITE_CONFIG.ADS_ENABLED is true.
// Default is false, so the live site loads no third-party ad scripts at all.
// Legal pages and calculator pages must never load them: this loader is
// called once at app start, and NativeBanner (below) has its own guard.
const AD_SCRIPT_URLS = [
  'https://pl31421675.profitableratecpmnetwork.com/60/df/00/60df00cdaab5e2fa6efd93dd611d5bb2.js',
  'https://pl31421677.profitableratecpmnetwork.com/98/5a/3d/985a3d8b4c47e26b53585aa14ce8a205.js',
];

export const LEGAL_AD_EXCLUDED_PATHS = [
  '/privacy-policy',
  '/terms-of-use',
  '/disclaimer',
  '/about',
  '/contact',
];

export function isAdExcludedPath(pathname: string): boolean {
  return LEGAL_AD_EXCLUDED_PATHS.includes(pathname);
}

let loaded = false;
export function loadThirdPartyAds(): void {
  if (!SITE_CONFIG.ADS_ENABLED || loaded) return;
  if (typeof window === 'undefined') return;
  if (isAdExcludedPath(window.location.pathname)) return;
  loaded = true;
  for (const src of AD_SCRIPT_URLS) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }
}
