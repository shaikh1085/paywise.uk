import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../config/siteConfig";

// Pages the NativeBanner must never render on (legal pages). This list
// lives here now that the old script-loader module was removed on
// 2026-10-26 together with the two deleted ad scripts.
export const NATIVE_BANNER_EXCLUDED_PATHS = [
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
  "/about",
  "/contact",
];

export function isNativeBannerExcludedPath(pathname: string): boolean {
  return NATIVE_BANNER_EXCLUDED_PATHS.includes(pathname);
}

export default function NativeBanner() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Renders ONLY when SITE_CONFIG.NATIVE_BANNER_ENABLED is true (default
  // true since 2026-10-26, per the owner's decision to keep this 4-box
  // unit). Placement rules, unchanged from v2: this component sits below
  // the Take-Home calculator (it is the last element of SmartSalaryInsights,
  // which renders under that calculator), never above a calculator, and
  // never on legal pages. No other ad script is referenced anywhere in
  // this file or the codebase.
  // Hooks are called unconditionally; the gate is applied inside the effect
  // and in the render return, so hook order never changes.
  const adsAllowed =
    SITE_CONFIG.NATIVE_BANNER_ENABLED &&
    typeof window !== "undefined" &&
    !isNativeBannerExcludedPath(window.location.pathname);

  useEffect(() => {
    if (!adsAllowed) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl31421676.profitableratecpmnetwork.com/156fd0702a5b1ca81ef6d1a6bd07d14f/invoke.js";
    wrap.appendChild(script);

    return () => {
      script.remove();
    };
  }, [adsAllowed]);

  if (!adsAllowed) {
    return null;
  }

  return (
    <div ref={wrapRef} className="my-8 w-full overflow-hidden">
      <p className="text-center text-2xs font-bold uppercase tracking-wider text-[#404040]">
        Advertising
      </p>
      <div id="container-156fd0702a5b1ca81ef6d1a6bd07d14f"></div>
    </div>
  );
}
