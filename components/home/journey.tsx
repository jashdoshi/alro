"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const steps = [
  { label: "Website", text: "A prospect explores the offer and submits an enquiry." },
  { label: "CRM", text: "The enquiry is logged and assigned." },
  { label: "Company Brain", text: "Approved company context is retrieved for a briefing, response or proposal draft." },
  { label: "Workflow", text: "With appropriate approvals, tasks and follow-ups are prepared and tracked." },
];

/** Four selectable nodes; the active one turns black and the panel explains it. */
export function Journey() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (k: number) => {
    setI(k);
    refs.current[k]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in map) {
      e.preventDefault();
      select((i + map[e.key] + steps.length) % steps.length);
    } else if (e.key === "Home") select(0);
    else if (e.key === "End") select(steps.length - 1);
  };

  return (
    <div className="grid gap-8">
      <div role="tablist" aria-label="From enquiry to follow-up" className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" onKeyDown={onKey}>
        {/* connector */}
        <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.1rem] hidden h-px bg-ink/15 md:block" aria-hidden="true">
          <div className="h-full origin-left bg-ink transition-transform duration-700" style={{ transform: `scaleX(${i / (steps.length - 1)})`, transitionTimingFunction: "var(--quint)" }} />
        </div>
        {steps.map((s, k) => {
          const active = k === i;
          return (
            <button
              key={s.label}
              ref={(el) => {
                refs.current[k] = el;
              }}
              role="tab"
              id={`journey-tab-${k}`}
              aria-selected={active}
              aria-controls="journey-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setI(k)}
              className="group relative flex flex-col items-center gap-3 rounded-2xl px-2 py-3 text-center"
            >
              <span
                className={`relative z-[1] grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border text-[11px] font-bold tracking-[0.15em] transition-all duration-500 ${
                  active ? "border-ink bg-ink text-paper shadow-[0_10px_20px_rgb(17_17_17/0.15)]" : k < i ? "border-ink/40 bg-paper text-ink" : "border-ink/15 bg-paper text-ink/50 group-hover:border-ink/40"
                }`}
                style={{ transitionTimingFunction: "var(--quint)" }}
              >
                {String(k + 1).padStart(2, "0")}
              </span>
              <span className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors ${active ? "text-ink" : "text-ink/50"}`}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${i}`} className="glass grid gap-3 rounded-[1.5rem] p-6 md:grid-cols-[10rem_1fr] md:items-baseline md:gap-8 md:p-8" aria-live="polite">
        <span className="tiny">
          Step {String(i + 1).padStart(2, "0")} — {steps[i].label}
        </span>
        <p key={i} className="font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug" style={{ animation: "journey-in .6s var(--quint)" }}>
          {steps[i].text}
        </p>
      </div>
      <style>{`@keyframes journey-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#journey-panel p{animation:none!important}}`}</style>
    </div>
  );
}
