"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { Check, Sparkle } from "./icons";
import { cx } from "./ui";

type Source = { title: string; meta: string };
type Line = { text: string; cite?: number; label?: string };
type Scenario = { prompt: string; kicker: string; body: Line[]; sources: Source[]; note: string };
type Tab = "Ask" | "Alert" | "Brief" | "Act";

const NOTES: Source = { title: "Leadership meeting notes", meta: "Notes · 14 Aug" };
const PRICING: Source = { title: "Wholesale pricing review — v3", meta: "Document · 9 Aug" };
const TRACKER: Source = { title: "Kiln & production tracker", meta: "Spreadsheet · updated 28 Aug" };

const TABS: Tab[] = ["Ask", "Alert", "Brief", "Act"];

const SCENARIOS: Record<Tab, Scenario[]> = {
  Ask: [
    {
      prompt: "What did we decide about wholesale pricing?",
      kicker: "Answer",
      body: [
        { text: "The team agreed to hold wholesale prices for existing stockists until January, and to apply the new price list to new accounts only.", cite: 1 },
        { text: "The pricing review gives the reasoning: material costs rose, but two of the largest stockists renew in December.", cite: 2 },
      ],
      sources: [NOTES, PRICING],
      note: "Drawn from 2 sources you have access to.",
    },
    {
      prompt: "What is our refund policy for trade orders?",
      kicker: "Not found",
      body: [
        { text: "I couldn't find a trade refund policy in the approved sources. The closest match is a retail returns page, which doesn't cover trade orders, so I haven't used it." },
        { text: "You may want to ask the operations team, or add the policy as a source." },
      ],
      sources: [],
      note: "No answer is better than a guessed one.",
    },
  ],
  Alert: [
    {
      prompt: "Change detected · Autumn collection",
      kicker: "Needs attention",
      body: [
        { text: "The glaze firing for the autumn collection moved from 2 to 9 September.", cite: 1 },
        { text: "Product photography is planned for 5 September, which now falls before the pieces are ready.", cite: 2 },
        { text: "Suggested next step: confirm a new photography date with the launch owner." },
      ],
      sources: [TRACKER, { title: "Autumn collection launch plan", meta: "Document · 2 Aug" }],
      note: "Raised because two linked dates now conflict.",
    },
  ],
  Brief: [
    {
      prompt: "Monday briefing · week of 1 September",
      kicker: "This week",
      body: [
        { label: "Decided", text: "Wholesale prices held for existing stockists until January.", cite: 1 },
        { label: "Changed", text: "Autumn glaze firing moved back one week.", cite: 2 },
        { label: "Open", text: "Three stockists have asked for the new catalogue; no one has replied yet.", cite: 3 },
      ],
      sources: [NOTES, TRACKER, { title: "#stockists", meta: "Team chat · thread, 27 Aug" }],
      note: "Prepared from changes since last Monday.",
    },
  ],
  Act: [
    {
      prompt: "Prepare pricing letters for existing stockists",
      kicker: "Draft workflow",
      body: [
        { text: "I've prepared letters for existing stockists confirming that their prices are held until January, using the wording agreed in the meeting.", cite: 1 },
        { text: "Nothing will be sent until someone with permission approves it." },
      ],
      sources: [NOTES, PRICING],
      note: "Actions run only through approved, pre-defined workflows.",
    },
  ],
};

const DISCLAIMER = "Scripted walkthrough using a fictional business and sample documents. Not a live model, and not a client deployment.";

const rise =
  "transition-[opacity,transform] duration-700 ease-out-soft opacity-0 translate-y-2 [transition-delay:var(--d)] motion-reduce:[transition-delay:0ms] group-data-[shown=true]:opacity-100 group-data-[shown=true]:translate-y-0";
const d = (i: number) => ({ "--d": `${i * 110}ms` }) as CSSProperties;
const btnSm: CSSProperties = { height: 44, paddingInline: "1.1rem", fontSize: "0.92rem" };

function useShown() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(() => setShown(true))));
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, []);
  return shown;
}

export function TryIt() {
  const [tab, setTab] = useState<Tab>("Ask");
  const [q, setQ] = useState(0);
  const [approved, setApproved] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const list = SCENARIOS[tab];
  const s = list[Math.min(q, list.length - 1)];

  const pick = (t: Tab) => {
    setTab(t);
    setQ(0);
    setApproved(false);
  };

  const onKey = (e: KeyboardEvent, k: number) => {
    const n = TABS.length;
    const to = e.key === "ArrowRight" ? (k + 1) % n : e.key === "ArrowLeft" ? (k - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    pick(TABS[to]);
    tabs.current[to]?.focus();
  };

  return (
    <div className="glass-dark overflow-hidden rounded-[28px]">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-[0.95rem] font-medium tracking-[-0.02em]">
          <Sparkle className="h-4 w-4 flex-none text-accent" />
          Marlowe Ceramics <span className="font-normal text-fg-3">(fictional)</span>
        </p>
        <div role="tablist" aria-label="What the assistant does" className="flex rounded-full border border-line bg-white/[0.03] p-1 sm:w-auto">
          {TABS.map((t, k) => {
            const on = t === tab;
            return (
              <button
                key={t}
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                id={`${id}-tab-${t}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(t)}
                onKeyDown={(e) => onKey(e, k)}
                className={cx(
                  "min-h-11 flex-1 rounded-full px-4 text-[0.9rem] tracking-[-0.02em] transition-[background,color,box-shadow] duration-300 sm:flex-none sm:px-5",
                  on ? "bg-white/10 text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]" : "text-fg-3 hover:text-fg-2",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tab}`} className="min-h-[440px] px-4 py-5 sm:px-6 md:px-8 md:py-7">
        {list.length > 1 ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" aria-label="Example questions">
            {list.map((x, k) => (
              <button
                key={x.prompt}
                type="button"
                aria-pressed={k === q}
                onClick={() => setQ(k)}
                className={cx(
                  "min-h-11 rounded-2xl border px-4 py-2.5 text-left text-[0.92rem] leading-snug transition-colors duration-300 sm:rounded-full",
                  k === q ? "border-accent/40 bg-accent/10 text-fg" : "border-line-2 bg-white/[0.03] text-fg-2 hover:border-white/25 hover:text-fg",
                )}
              >
                {x.prompt}
              </button>
            ))}
          </div>
        ) : (
          <p className="flex items-center gap-2.5 text-[1.05rem] font-medium tracking-[-0.03em]">
            {tab === "Alert" && <span aria-hidden="true" className="pulse h-2 w-2 flex-none rounded-full bg-accent" />}
            {s.prompt}
          </p>
        )}

        <Response key={`${tab}-${q}`} s={s} tab={tab} approved={approved} onApprove={() => setApproved(true)} />
      </div>

      <p className="small border-t border-line px-4 py-4 sm:px-6 md:px-8">{DISCLAIMER}</p>
    </div>
  );
}

function Response({ s, tab, approved, onApprove }: { s: Scenario; tab: Tab; approved: boolean; onApprove: () => void }) {
  const shown = useShown();
  const missing = s.sources.length === 0;
  return (
    <div data-shown={shown} aria-live="polite" className={cx("group mt-5 rounded-2xl p-4 sm:p-5", tab === "Alert" ? "card-hot" : "card")}>
      <span className={cx(missing ? "tag neutral" : "tag", rise)} style={d(0)}>
        {s.kicker}
      </span>

      <div className="mt-4 flex flex-col gap-3">
        {s.body.map((l, k) =>
          l.label ? (
            <div key={k} className={cx("grid grid-cols-[5.5rem_1fr] gap-3 border-t border-line pt-3 first:border-0 first:pt-0", rise)} style={d(k + 1)}>
              <span className="eyebrow pt-[3px]">{l.label}</span>
              <p className="text-[0.95rem] leading-relaxed">
                {l.text}
                {l.cite && <Cite n={l.cite} />}
              </p>
            </div>
          ) : (
            <p key={k} className={cx("text-[0.95rem] leading-relaxed", k === 0 ? "text-fg" : "text-fg-2", rise)} style={d(k + 1)}>
              {l.text}
              {l.cite && <Cite n={l.cite} />}
            </p>
          ),
        )}
      </div>

      {tab === "Act" && (
        <div className={cx("mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4", rise)} style={d(s.body.length + 1)}>
          {approved ? (
            <p role="status" className="flex items-start gap-2.5 text-[0.92rem] leading-snug">
              <span className="check hot mt-[2px]">
                <Check className="h-3 w-3" />
              </span>
              Approved. In a real system, this would now run the agreed workflow and log who approved it.
            </p>
          ) : (
            <>
              <span className="eyebrow mr-auto">Awaiting approval</span>
              <button type="button" className="btn btn-primary" style={btnSm} onClick={onApprove}>
                <Check className="h-3.5 w-3.5" />
                Approve (demo)
              </button>
            </>
          )}
        </div>
      )}

      {!missing && (
        <ol className={cx("mt-5 flex flex-col gap-2 border-t border-line pt-4", rise)} style={d(s.body.length + 2)}>
          {s.sources.map((src, k) => (
            <li key={src.title} className="flex items-start gap-3 text-[0.88rem] leading-snug">
              <span className="grid h-5 min-w-5 flex-none place-items-center rounded-full border border-line-2 text-[0.7rem] tabular-nums text-fg-2">{k + 1}</span>
              <span className="flex min-w-0 flex-col gap-x-2 sm:flex-row sm:flex-wrap">
                <span className="text-fg">{src.title}</span>
                <span className="text-fg-3">{src.meta}</span>
              </span>
            </li>
          ))}
        </ol>
      )}

      <p className={cx("small mt-4", rise)} style={d(s.body.length + 3)}>
        {s.note}
      </p>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-1 inline-grid h-[1.1rem] min-w-[1.1rem] -translate-y-[1px] place-items-center rounded-full bg-accent/15 px-1 align-super text-[0.65rem] font-medium tabular-nums text-accent">
      <span className="sr-only">source </span>
      {n}
    </sup>
  );
}
