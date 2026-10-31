"use client";

import { useEffect, useState } from "react";

const convo = [
  {
    q: "What’s pending for the Acme account?",
    a: "Proposal awaiting approval, two onboarding tasks open, client waiting for a timeline update.",
    src: ["CRM", "Project tracker", "Drive"],
  },
  {
    q: "Draft a follow-up for this client.",
    a: "Draft prepared from approved account context. Review the recipient and details before sending.",
    src: ["CRM", "Account notes", "Email"],
  },
  {
    q: "What changed in the latest agreement?",
    a: "Payment schedule and delivery milestones changed; review extracted differences against source documents.",
    src: ["Agreement v1", "Agreement v2"],
  },
];

/** Mock conversational window: three selectable questions, sourced answers. Illustrative only. */
export function BrainDemo() {
  const [i, setI] = useState(0);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const on = window.setTimeout(() => setThinking(!reduce), 0);
    const off = window.setTimeout(() => setThinking(false), reduce ? 0 : 750);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, [i]);

  const c = convo[i];

  return (
    <div className="window grid md:grid-cols-[0.85fr_1.4fr]">
      {/* prompts */}
      <div className="border-b border-ink/10 bg-ink/[0.02] p-5 md:border-b-0 md:border-r md:p-7">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            Company Brain
          </span>
          <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-ink/55">Illustrative demo</span>
        </div>
        <p className="tiny mt-8">Try asking</p>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 md:mx-0 md:grid md:overflow-visible md:px-0" role="group" aria-label="Sample questions">
          {convo.map((x, k) => (
            <button
              key={x.q}
              type="button"
              aria-pressed={k === i}
              onClick={() => setI(k)}
              className={`flex-none rounded-2xl border px-4 py-3 text-left text-[14px] leading-snug transition-all duration-500 md:w-full ${
                k === i ? "border-ink bg-ink text-paper" : "border-ink/12 bg-white text-ink/75 hover:border-ink/40"
              }`}
              style={{ transitionTimingFunction: "var(--quint)" }}
            >
              {x.q}
            </button>
          ))}
        </div>
      </div>

      {/* conversation */}
      <div className="flex min-h-[340px] flex-col p-5 md:p-8" aria-live="polite">
        <div key={`q${i}`} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink/[0.06] px-4 py-3 text-[15px]" style={{ animation: "demo-in .5s var(--quint)" }}>
          {c.q}
        </div>
        <div className="mt-6 flex gap-3">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-ink text-[10px] font-bold text-paper">a.</span>
          {thinking ? (
            <span className="flex items-center gap-1 pt-3" aria-label="Thinking">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-1.5 w-1.5 rounded-full bg-ink/40" style={{ animation: `caret 1s ${k * 0.15}s infinite` }} />
              ))}
            </span>
          ) : (
            <div key={`a${i}`} className="grid gap-4" style={{ animation: "demo-in .6s var(--quint)" }}>
              <p className="font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-snug">{c.a}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="tiny mr-1">Sources</span>
                {c.src.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="mt-auto pt-10 text-[12px] leading-relaxed text-ink/55">
          Illustrative demo with sample data — not a real client result. Answers may need checking against their sources, and anything sensitive that leaves
          the business waits for review and the right permissions.
        </p>
      </div>
      <style>{`@keyframes demo-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
