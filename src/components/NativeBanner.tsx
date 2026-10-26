import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "../config/siteConfig";
import { isAdExcludedPath } from "../utils/adsLoader";

export default function NativeBanner() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Gated: never render above a calculator, never on legal pages, and never
  // at all unless ADS_ENABLED is true. This component sits below the
  // Take-Home calculator (in SmartSalaryInsights), never above it.
  // Hooks are called unconditionally; the gate is applied inside the effect
  // and in the render return, so hook order never changes.
  const adsAllowed =
    SITE_CONFIG.ADS_ENABLED &&
    typeof window !== "undefined" &&
    !isAdExcludedPath(window.location.pathname);

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
      <p className="text-center text-2xs font-bold uppercase tracking-wider text-[#737373]">
        Advertising
      </p>
      <div id="container-156fd0702a5b1ca81ef6d1a6bd07d14f"></div>
    </div>
  );
}
