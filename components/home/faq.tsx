"use client";

import { useState } from "react";

const items = [
  {
    q: "Do we need both services?",
    a: "Not at all. Websites and Company Brain are independent offerings. If there’s a useful reason to connect them, we’ll explore it together.",
  },
  {
    q: "Is Company Brain another chatbot?",
    a: "It can include a conversational assistant, but the real value comes from connecting the right company knowledge and workflows. The scope depends on what your team actually needs.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "Often, yes. We start by understanding the software and data you already use, then assess integration options, permissions and limitations before committing to an approach.",
  },
  {
    q: "What happens after launch?",
    a: "We plan the handover from the beginning. For clients who need ongoing support, we can scope maintenance, monitoring and improvements separately.",
  },
];

/** Accessible four-row accordion, plus/minus indicator, restrained height transition. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-ink/12">
      {items.map((it, k) => {
        const isOpen = open === k;
        return (
          <div key={it.q} className="border-b border-ink/12">
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-q-${k}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${k}`}
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
              id={`faq-a-${k}`}
              role="region"
              aria-labelledby={`faq-q-${k}`}
              className="grid transition-[grid-template-rows] duration-500"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transitionTimingFunction: "var(--quint)" }}
            >
              <div className="overflow-hidden">
                <p className="lead max-w-[46rem] pb-8">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
