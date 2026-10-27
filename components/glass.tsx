"use client";

import { useEffect } from "react";

/**
 * Liquid-glass runtime, mounted once in the layout.
 * - Moves each glass surface's specular highlight toward the pointer (--mx/--my).
 * - Enables SVG refraction on small controls in Chromium only; every other
 *   browser keeps the plain blur recipe from globals.css.
 */
export function GlassRuntime() {
  useEffect(() => {
    const chromium = /(Chrome|Chromium|Edg)\//.test(navigator.userAgent);
    if (chromium &&CSS.supports("backdrop-filter", "url(#lg-refract)")) {
      document.documentElement.classList.add("lg-refract");
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = (e.target as Element | null)?.closest?.<HTMLElement>(".lg");
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

/** SVG filter used by `.lg-refract` (a gentle lens-like displacement). */
export function GlassFilters() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Slow-drifting ember blobs: the vibrant "wallpaper" that glass sits on. */
export function Ember({ className = "", intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true" style={{ opacity: intensity }}>
      <div
        className="absolute left-[8%] top-[10%] h-[70%] w-[55%] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, #ff5100 0%, #e83a25 45%, transparent 70%)", animation: "drift-a 16s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[0%] right-[6%] h-[75%] w-[50%] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, #ee0000 0%, #a3160a 45%, transparent 70%)", animation: "drift-b 20s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[38%] top-[35%] h-[45%] w-[30%] rounded-full blur-[70px]"
        style={{ background: "radial-gradient(circle, #ff9a3d 0%, #ec7230 40%, transparent 70%)", animation: "drift-a 22s ease-in-out infinite reverse" }}
      />
    </div>
  );
}
