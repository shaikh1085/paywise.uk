import { useEffect, useRef } from "react";

export default function NativeBanner() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={wrapRef} className="my-8 w-full overflow-hidden">
      <div id="container-156fd0702a5b1ca81ef6d1a6bd07d14f"></div>
    </div>
  );
}
