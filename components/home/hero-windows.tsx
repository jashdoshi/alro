"use client";

import { useEffect, useRef, useState } from "react";

const Q = "What’s pending for the Acme account?";
const A = "Proposal awaiting approval, two onboarding tasks open, client waiting for a timeline update.";

/**
 * Two restrained product windows: what customers see (a website) and what
 * makes it work (a knowledge assistant). Hover — or tap — brings each to life.
 */
export function HeroWindows() {
  const [site, setSite] = useState(false);
  const [brain, setBrain] = useState(false);
  const [typed, setTyped] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (!brain) {
      timer.current = window.setTimeout(() => setTyped(0), 0);
      return;
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      timer.current = window.setTimeout(() => setTyped(Q.length), 0);
      return;
    }
    timer.current = window.setInterval(() => {
      setTyped((n) => {
        if (n >= Q.length && timer.current) window.clearInterval(timer.current);
        return Math.min(Q.length, n + 1);
      });
    }, 28);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [brain]);

  const done = typed >= Q.length;

  return (
    <div className="relative mx-auto w-full max-w-[640px] pb-10 md:pb-0">
      {/* website */}
      <figure
        className="relative w-[88%]"
        onMouseEnter={() => setSite(true)}
        onMouseLeave={() => setSite(false)}
        onFocus={() => setSite(true)}
        onBlur={() => setSite(false)}
        onClick={() => setSite((v) => !v)}
        tabIndex={0}
        aria-label="Illustration: a bespoke website — what customers see"
        data-cursor
      >
        <div className="window">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span className="ml-3 h-5 flex-1 rounded-full bg-ink/[0.05] px-3 text-[10px] leading-5 text-ink/45">yourbusiness.com</span>
          </div>
          <div className="relative p-4 sm:p-5">
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-ink/50">
              <span className="text-[12px] normal-case tracking-[-0.02em] text-ink">Northfield</span>
              <span className="hidden gap-4 sm:flex">
                <span>Work</span>
                <span>Studio</span>
                <span>Journal</span>
              </span>
            </div>
            <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-end gap-4">
              <div>
                <p className="font-serif text-[clamp(1.2rem,2.6vw,1.8rem)] leading-[1.05]">
                  Quietly{" "}
                  <span className="relative inline-block italic">
                    exceptional
                    <span
                      className="absolute -bottom-0.5 left-0 h-[2px] bg-ink transition-[width] duration-700"
                      style={{ width: site ? "100%" : "0%", transitionTimingFunction: "var(--flow-ease)" }}
                    />
                  </span>{" "}
                  work.
                </p>
                <p className="mt-2 max-w-[22ch] text-[10px] leading-snug text-ink/55">Furniture made slowly, for rooms that are lived in.</p>
                <span
                  className="mt-3 inline-block rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-500"
                  style={{ background: site ? "var(--ink)" : "transparent", color: site ? "var(--paper)" : "var(--ink)", borderColor: "rgb(17 17 17 / .3)" }}
                >
                  View collection
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <div
                  className="absolute inset-0 transition-transform duration-[900ms]"
                  style={{
                    background: "radial-gradient(120% 90% at 30% 15%, #d9d6cf 0%, #a9a59c 45%, #5f5d58 100%)",
                    transform: site ? "scale(1.08)" : "scale(1)",
                    transitionTimingFunction: "var(--quint)",
                  }}
                />
                <div
                  className="absolute inset-x-[16%] bottom-[14%] top-[34%] rounded-t-[999px] bg-white/30 transition-transform duration-700"
                  style={{ transform: site ? "translateY(-6%)" : "none", transitionTimingFunction: "var(--quint)" }}
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  className="h-10 rounded-md bg-ink/[0.05] transition-transform duration-700"
                  style={{ transform: site ? `translateY(${-4 - k * 2}px)` : "none", transitionDelay: `${k * 60}ms`, transitionTimingFunction: "var(--quint)" }}
                />
              ))}
            </div>
          </div>
        </div>
        <figcaption className="tiny mt-3">what customers see</figcaption>
      </figure>

      {/* company brain */}
      <figure
        className="relative z-[1] ml-auto mt-6 w-[84%] sm:-mt-[26%] sm:w-[66%]"
        onMouseEnter={() => setBrain(true)}
        onMouseLeave={() => setBrain(false)}
        onFocus={() => setBrain(true)}
        onBlur={() => setBrain(false)}
        onClick={() => setBrain((v) => !v)}
        tabIndex={0}
        aria-label="Illustration: a company knowledge assistant — what makes it work"
        data-cursor
      >
        <div className="window">
          <div className="window-bar justify-between">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Company Brain
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-ink/40">illustrative</span>
          </div>
          <div className="grid min-h-[190px] content-start gap-3 p-4">
            <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-ink/[0.05] px-3 py-2 text-[11px] leading-snug">
              {typed > 0 ? Q.slice(0, typed) : <span className="text-ink/40">Ask about your business…</span>}
              {brain && !done && <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-ink" style={{ animation: "caret 1s steps(1) infinite" }} />}
            </div>
            <div className={`grid gap-2 transition-all duration-500 ${done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <p className="text-[11px] leading-snug text-ink/80">{A}</p>
              <div className="flex flex-wrap gap-1.5">
                {["CRM", "Project tracker", "Drive"].map((s) => (
                  <span key={s} className="rounded-full border border-ink/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-ink/55">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {!brain && (
              <div className="grid gap-1.5 pt-1">
                <span className="h-1.5 w-[70%] rounded-full bg-ink/[0.07]" />
                <span className="h-1.5 w-[50%] rounded-full bg-ink/[0.07]" />
              </div>
            )}
          </div>
        </div>
        <figcaption className="tiny mt-3 text-right">what makes it work</figcaption>
      </figure>
    </div>
  );
}
