"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Accessible accordion for any number of items. Styled identically to the
 * home page FAQ (components/home/faq.tsx): plus/minus indicator, restrained
 * height transition. Ids are scoped with useId so several lists can coexist.
 */
export function FaqList({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  return (
    <div className="border-t border-ink/12">
      {items.map((it, k) => {
        const isOpen = open === k;
        const qId = `${uid}-q-${k}`;
        const aId = `${uid}-a-${k}`;
        return (
          <div key={it.q} className="border-b border-ink/12">
            <h3 className="m-0">
              <button
                type="button"
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => setOpen(isOpen ? null : k)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-serif text-[clamp(1.35rem,2.6vw,2rem)] leading-tight transition-transform duration-500 group-hover:translate-x-2" style={{ transitionTimingFunction: "var(--quint)" }}>
                  {it.q}
                </span>
                <span className={`relative grid h-11 w-11 flex-none place-items-center rounded-full border transition-colors duration-300 ${isOpen ? "border-ink bg-ink text-paper" : "border-ink/20"}`} aria-hidden="true">
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current transition-transform duration-500" style={{ transform: isOpen ? "rotate(90deg) scaleY(0)" : "none", transitionTimingFunction: "var(--flow-ease)" }} />
                </span>
              </button>
            </h3>
            <div
              id={aId}
              role="region"
              aria-labelledby={qId}
              className="grid transition-[grid-template-rows] duration-500"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transitionTimingFunction: "var(--quint)" }}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="lead max-w-[46rem] pb-8">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
