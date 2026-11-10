import type { ReactNode } from "react";

/**
 * Inner-page hero in the home hero's language: wide-tracked eyebrow, a
 * two-line serif title (top line slides in from the left, bottom line from
 * the right), a light lead, actions, and an optional aside visual.
 * All parts are wired to the engine's intro via data-hero.
 */
export function PageHero({
  eyebrow,
  top,
  bottom,
  lead,
  actions,
  aside,
  size = "lg",
}: {
  eyebrow: string;
  top: ReactNode;
  bottom?: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  size?: "lg" | "md";
}) {
  const fs = size === "lg" ? "text-[clamp(2.4rem,7vw,7.4rem)]" : "text-[clamp(2.2rem,5.6vw,5.6rem)]";
  return (
    <section data-hero-root className="relative overflow-x-clip pb-[clamp(3rem,7vh,5rem)] pt-[clamp(7.5rem,17vh,10rem)]">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: "radial-gradient(55% 85% at 15% 100%, rgb(var(--ink-rgb) / .045), transparent 70%), radial-gradient(45% 75% at 85% 100%, rgb(var(--mist-rgb) / .9), transparent 72%)" }}
        aria-hidden="true"
      />
      <div className="wrap relative">
        <span className="eyebrow wide" data-hero="kicker">
          {eyebrow}
        </span>
        <h1 className="mt-6 flex flex-col font-serif leading-[0.98] tracking-[-0.025em]">
          <span className={`block w-fit ${fs} will-change-transform md:whitespace-nowrap`} data-hero="top">
            {top}
          </span>
          {bottom && (
            <span className={`block w-fit self-end text-right ${fs} will-change-transform md:whitespace-nowrap`} data-hero="bottom">
              {bottom}
            </span>
          )}
        </h1>
        {(lead || actions || aside) && (
          <div className={`mt-[clamp(2.5rem,6vh,4.5rem)] grid items-end gap-12 ${aside ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : ""}`}>
            <div className="grid max-w-[34rem] gap-7">
              {lead && (
                <p className="text-[1.125rem] font-light leading-[1.625] text-copy/70" data-hero="text">
                  {lead}
                </p>
              )}
              {actions && (
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center" data-hero="cta">
                  {actions}
                </div>
              )}
            </div>
            {aside && <div data-hero="aside">{aside}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

/** Small italic serif underline-drawn word used inside hero titles. */
export function Underlined({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block italic">
      {children}
      <svg data-hero="underline" className="pointer-events-none absolute -bottom-[0.1em] left-[-3%] h-[0.26em] w-[106%] overflow-visible" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 14 C 60 4, 140 2, 200 8 S 280 16, 296 6" stroke="var(--grey)" strokeWidth="3" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
