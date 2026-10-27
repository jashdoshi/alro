"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Pause, Play, Sparkle } from "./icons";
import { cx } from "./ui";

const FILE = "Supplier & autumn launch review.pdf";
const STEP_MS = 8000;

const STEPS = [
  { title: "Upload", caption: "A document comes in — uploaded, or from a connected tool." },
  { title: "Extract", caption: "Decisions, actions, owners and dates, each tied to its page." },
  { title: "Ask", caption: "A question, answered from the document, with its source." },
  { title: "Draft", caption: "A follow-up prepared from what was agreed." },
  { title: "Approve", caption: "A person reviews it. Nothing leaves without approval." },
];

const COUNTS: [number, string][] = [
  [3, "decisions"],
  [4, "action items"],
  [3, "owners"],
  [4, "dates"],
];

const DECISIONS = [
  { text: "Hold wholesale prices for existing stockists until January.", page: 1 },
  { text: "Move the autumn launch from 2 Oct to 16 Oct.", page: 2 },
  { text: "Reorder 400 units of the Tide glaze from Harbour & Kiln.", page: 3 },
];

const ACTIONS = [
  { text: "Confirm the reorder and delivery date with Harbour & Kiln", owner: "Priya", due: "12 Sep", page: 3 },
  { text: "Update the launch date on the stockist calendar", owner: "Tom", due: "13 Sep", page: 2 },
  { text: "Send new price list to new accounts only", owner: "Ana", due: "20 Sep", page: 1 },
  { text: "Book photography for the new pieces", owner: null, due: "26 Sep", page: 4 },
];

const QUESTION = "What did we agree with Harbour & Kiln?";
const ANSWER =
  "A reorder of 400 units of the Tide glaze, to arrive before the new launch date of 16 Oct. Priya is confirming the delivery date with them by 12 Sep.";

const MAIL = {
  to: "orders@harbourandkiln.example",
  subject: "Confirming our Tide glaze reorder",
  body: [
    "Hi Sam,",
    "Following our review on 9 September, we’d like to confirm a reorder of 400 units of the Tide glaze. Our launch has moved to 16 October — could you confirm a delivery date ahead of that?",
    "Thanks, Priya",
  ],
};

const REVIEW = [
  { kind: "Email", text: "Send “Confirming our Tide glaze reorder” to Harbour & Kiln" },
  { kind: "Task", text: "Assign “Book photography for the new pieces” — currently has no owner" },
];

const DISCLAIMER =
  "A scripted simulation of the intended workflow, with a fictional business and fictional documents. It is not connected to a live model, and nothing is sent.";

type Decision = "approved" | "discarded" | null;

/* Staggered entrance: children read `data-shown` from the nearest `group`. */
const rise =
  "transition-[opacity,transform] duration-700 ease-[var(--ease)] opacity-0 translate-y-2 [transition-delay:var(--d)] motion-reduce:[transition-delay:0ms] group-data-[shown=true]:opacity-100 group-data-[shown=true]:translate-y-0";
const d = (i: number) => ({ "--d": `${i * 110}ms` }) as CSSProperties;
/* Nested surfaces inside the glass window. */
const pane = "lg lg-dark rounded-2xl";
const tile = "rounded-2xl border border-line bg-white/5";
const num = (n: number) => `[${String(n).padStart(2, "0")}]`;

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

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

export function Walkthrough() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [decisions, setDecisions] = useState<Decision[]>([null, null]);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const started = useRef(false);
  const touched = useRef(false);
  const id = useId();
  const last = STEPS.length - 1;

  const go = useCallback((n: number) => {
    const next = Math.max(0, Math.min(STEPS.length - 1, n));
    setStep(next);
    if (next < STEPS.length - 1) setDecisions([null, null]);
  }, []);

  const user = (n: number) => {
    touched.current = true;
    setPlaying(false);
    go(n);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && !started.current && !touched.current) {
          started.current = true;
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = window.setTimeout(() => {
      if (step >= last) setPlaying(false);
      else go(step + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, inView, step, last, go]);

  useEffect(() => {
    const r = rail.current;
    const btn = r?.querySelectorAll<HTMLElement>("li")[step];
    if (!r || !btn || r.scrollWidth <= r.clientWidth) return;
    r.scrollTo({ left: btn.offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
  }, [step, reduced]);

  const toggle = () => {
    touched.current = true;
    if (!playing && step === last) go(0);
    setPlaying((p) => !p);
  };

  const decide = (k: number, v: Decision) => {
    touched.current = true;
    setPlaying(false);
    setDecisions((ds) => ds.map((x, j) => (j === k ? v : x)));
  };

  const playLabel = playing ? "Pause" : step === last ? "Replay" : "Play";

  return (
    <div ref={root} role="region" aria-labelledby={id} className="lg lg-strong lg-dark w-full min-w-0 overflow-hidden rounded-[32px]">
      {/* Window bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="hidden flex-none items-center gap-1.5 min-[400px]:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-red-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </span>
          <p id={id} className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-center sm:gap-2">
            <span className="t-nav flex items-center gap-2 text-white">
              <Sparkle className="h-3.5 w-3.5 flex-none text-orange-soft" />
              Company Intelligence
            </span>
            <span className="t-label pl-[1.375rem] sm:pl-0">
              <span className="hidden sm:inline">· </span>Prototype simulation
            </span>
          </p>
        </div>
        <div className="flex flex-none items-center gap-3">
          <span className="t-label tabular-nums" aria-hidden="true">
            {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="btn btn-ghost h-11 min-w-11 justify-center gap-2 px-3.5 sm:px-4"
            aria-pressed={playing}
            aria-label={playing ? "Pause walkthrough" : step === last ? "Replay walkthrough" : "Play walkthrough"}
            onClick={toggle}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="t-nav hidden sm:inline">{playLabel}</span>
          </button>
        </div>
      </div>

      {/* Step rail */}
      <ol ref={rail} aria-label="Steps" className="no-scrollbar relative flex gap-2 overflow-x-auto overscroll-x-contain border-b border-line px-4 py-3 sm:px-6 lg:grid lg:grid-cols-5">
        {STEPS.map((s, k) => {
          const active = k === step;
          return (
            <li key={s.title} className="flex-none">
              <button
                type="button"
                onClick={() => user(k)}
                aria-current={active ? "step" : undefined}
                className={cx(
                  "t-nav relative flex min-h-11 w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border px-4 transition-colors duration-300",
                  active ? "border-orange-soft/50 bg-orange-soft/10 text-white" : "border-transparent text-gray-2 hover:text-gray",
                )}
              >
                <span className={cx("tabular-nums", active ? "text-orange-soft" : k < step ? "text-gray" : "text-gray-2")}>
                  {k < step ? <Check className="h-3 w-3" /> : num(k + 1)}
                </span>
                {s.title}
                {active && playing && inView && <TimerBar key={`t-${step}`} ms={STEP_MS} />}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="px-4 pb-5 pt-5 sm:px-6 md:px-8 md:pt-6">
        <p className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3" aria-live="polite">
          <span className="t-nav flex-none text-gray">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-[0.92rem] text-white">{STEPS[step].caption}</span>
        </p>

        <Stage key={step}>
          {step === 0 && <Upload reduced={reduced} />}
          {step === 1 && <Extract />}
          {step === 2 && <Ask />}
          {step === 3 && <Draft />}
          {step === 4 && <Approve decisions={decisions} onDecide={decide} onReset={() => setDecisions([null, null])} />}
        </Stage>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
          <span aria-hidden="true" className="bars h-5 w-24 sm:w-32">
            {STEPS.map((s, k) => (
              <i key={s.title} className={cx("transition-[height,background] duration-500", k > step && "off opacity-25")} style={{ height: `${40 + k * 15}%` }} />
            ))}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Back"
              className="round round-white disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => user(step - 1)}
              disabled={step === 0}
            >
              <ArrowLeft />
            </button>
            {step < last ? (
              <button type="button" aria-label="Next step" className="round round-orange" onClick={() => user(step + 1)}>
                <ArrowRight />
              </button>
            ) : (
              <button type="button" className="btn btn-ghost h-12 px-5" onClick={() => user(0)}>
                Start again
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="t-label t-justify border-t border-line px-4 py-4 sm:px-6 md:px-8">{DISCLAIMER}</p>
    </div>
  );
}

function TimerBar({ ms }: { ms: number }) {
  const run = useShown();
  return (
    <span aria-hidden="true" className="absolute inset-x-4 bottom-1 h-px overflow-hidden rounded-full bg-white/10">
      <span
        className="block h-full origin-left bg-orange-soft"
        style={{ transform: `scaleX(${run ? 1 : 0})`, transition: run ? `transform ${ms}ms linear` : "none" }}
      />
    </span>
  );
}

function Stage({ children }: { children: ReactNode }) {
  const shown = useShown();
  return (
    <div data-shown={shown} className="group mt-5 min-h-[380px] transition-[opacity,transform] duration-500 ease-[var(--ease)] data-[shown=false]:translate-y-1 data-[shown=false]:opacity-0 md:min-h-[360px]">
      {children}
    </div>
  );
}

function Cite({ page }: { page: number }) {
  return (
    <span className="ml-1.5 inline-flex h-5 items-center rounded-full border border-line-2 px-1.5 align-[1px] text-[0.68rem] tabular-nums text-gray">
      p.{page}
    </span>
  );
}

function Dot() {
  return <span aria-hidden="true" className="pulse inline-block h-1.5 w-1.5 flex-none rounded-full bg-orange-soft" />;
}

function Upload({ reduced }: { reduced: boolean }) {
  const [read, setRead] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setRead((r) => (r >= 4 ? r : r + 1)), 750);
    return () => window.clearInterval(t);
  }, [reduced]);
  const pages = reduced ? 4 : read;
  const done = pages >= 4;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 md:pt-6">
      <div className={cx(pane, "flex items-center gap-4 p-4", rise)} style={d(0)}>
        <span aria-hidden="true" className="grid h-14 w-11 flex-none place-items-center rounded-lg border border-orange-soft/40 bg-orange-soft/10 text-[0.68rem] font-semibold text-orange-soft">
          PDF
        </span>
        <div className="min-w-0">
          <p className="text-[0.92rem] font-medium leading-snug [overflow-wrap:anywhere]">{FILE}</p>
          <p className="t-label mt-1">Meeting notes · 4 pages · 9 Sep · Marlowe Ceramics (fictional)</p>
        </div>
      </div>

      <div className={cx(tile, "p-4", rise)} style={d(1)}>
        <div className="flex items-center justify-between gap-3">
          <p className="t-nav text-gray">{done ? "Read 4 pages" : "Reading 4 pages"}</p>
          <span className="t-label tabular-nums">{pages} / 4</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={pages} aria-label="Reading pages">
          <div className="h-full origin-left rounded-full bg-orange-soft transition-transform duration-700 ease-[var(--ease)]" style={{ transform: `scaleX(${pages / 4})` }} />
        </div>
        <ol className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
          {[1, 2, 3, 4].map((p) => (
            <li
              key={p}
              className={cx(
                "flex h-16 flex-col justify-between rounded-lg border p-2 transition-colors duration-500",
                p <= pages ? "border-line-2 bg-white/[0.06]" : "border-line bg-transparent",
              )}
            >
              <span className="flex flex-col gap-1">
                <span className={cx("h-0.5 w-3/4 rounded-full", p <= pages ? "bg-gray-2" : "bg-white/10")} />
                <span className={cx("h-0.5 w-1/2 rounded-full", p <= pages ? "bg-gray-2" : "bg-white/10")} />
              </span>
              <span className={cx("text-[0.68rem] tabular-nums", p <= pages ? "text-gray" : "text-gray-2")}>p.{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Extract() {
  return (
    <div className="flex flex-col gap-5">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COUNTS.map(([n, label], k) => (
          <li key={label} className={cx(tile, "flex min-w-0 items-baseline gap-2 px-4 py-3", rise)} style={d(k)}>
            <span className="text-[1.7rem] font-light leading-none tracking-[-0.05em] tabular-nums">{n}</span>
            <span className="t-label min-w-0">{label}</span>
          </li>
        ))}
      </ul>

      <div className="grid gap-5 md:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <p className="t-nav mb-2 text-gray">Decisions</p>
          <ul className="flex flex-col divide-y divide-line">
            {DECISIONS.map((x, k) => (
              <li key={x.text} className={cx("py-2.5 text-[0.88rem] leading-snug", rise)} style={d(k + 3)}>
                {x.text}
                <Cite page={x.page} />
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <p className="t-nav mb-2 text-gray">Action items</p>
          <ul className="flex flex-col divide-y divide-line">
            {ACTIONS.map((a, k) => (
              <li key={a.text} className={cx("py-2.5", rise)} style={d(k + 5)}>
                <p className="text-[0.88rem] leading-snug">{a.text}</p>
                <p className="t-label mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-2">
                  {a.owner ? (
                    <span className="text-gray">{a.owner}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-orange-soft">
                      <Dot />
                      No owner
                    </span>
                  )}
                  <span>Due {a.due}</span>
                  <span>p.{a.page}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Ask() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <p className={cx("ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-line-2 bg-white/[0.08] px-4 py-3 text-[0.9rem]", rise)} style={d(0)}>
        {QUESTION}
      </p>
      <div className={cx("flex max-w-[92%] gap-3", rise)} style={d(2)}>
        <span aria-hidden="true" className="mt-1 grid h-7 w-7 flex-none place-items-center rounded-full border border-orange-soft/40 bg-orange-soft/10">
          <Sparkle className="h-3 w-3 text-orange-soft" />
        </span>
        <p className="text-[0.9rem] leading-relaxed text-white">
          {ANSWER}
          <Cite page={3} />
        </p>
      </div>
      <figure className={cx(pane, "p-4 sm:ml-10", rise)} style={d(4)}>
        <figcaption className="flex flex-wrap items-center gap-2">
          <span className="tag tag-sm">Source</span>
          <span className="t-label min-w-0 [overflow-wrap:anywhere]">{FILE}, page 3</span>
        </figcaption>
        <blockquote className="t-body mt-3 leading-relaxed">
          “…agreed to <mark className="rounded bg-orange-soft/20 px-0.5 text-white">reorder 400 units of Tide from Harbour &amp; Kiln</mark>, landing ahead of launch.{" "}
          <mark className="rounded bg-orange-soft/20 px-0.5 text-white">Priya to confirm delivery by the 12th.</mark>”
        </blockquote>
      </figure>
    </div>
  );
}

function Draft() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      <div className={cx(pane, "overflow-hidden", rise)} style={d(0)}>
        <dl className="divide-y divide-line border-b border-line text-[0.85rem]">
          <div className="flex gap-3 px-4 py-2.5">
            <dt className="t-nav w-16 flex-none self-center text-gray-2">To</dt>
            <dd className="min-w-0 [overflow-wrap:anywhere]">{MAIL.to}</dd>
          </div>
          <div className="flex gap-3 px-4 py-2.5">
            <dt className="t-nav w-16 flex-none self-center text-gray-2">Subject</dt>
            <dd className="min-w-0">{MAIL.subject}</dd>
          </div>
        </dl>
        <div className="flex flex-col gap-3 px-4 py-4 text-[0.88rem] leading-relaxed">
          {MAIL.body.map((p, k) => (
            <p key={k} className={rise} style={d(k + 1)}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <p className={cx("t-label flex items-center gap-2", rise)} style={d(4)}>
        <Dot />
        Draft · drafted from page 3 · not sent
      </p>
    </div>
  );
}

function Approve({ decisions, onDecide, onReset }: { decisions: Decision[]; onDecide: (k: number, v: Decision) => void; onReset: () => void }) {
  const anyApproved = decisions.includes("approved");
  const anyDecided = decisions.some((x) => x !== null);
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      <p className={cx("t-nav text-gray", rise)} style={d(0)}>
        Waiting for your review
      </p>
      <ul className="flex flex-col gap-3">
        {REVIEW.map((r, k) => {
          const v = decisions[k];
          return (
            <li key={r.kind} className={cx(pane, "p-4", rise, v === "approved" && "ring-1 ring-orange-soft/40")} style={d(k + 1)}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                <span className="tag tag-sm self-start">{r.kind}</span>
                <p className="text-[0.88rem] leading-snug sm:pt-1">{r.text}</p>
              </div>
              {v === null ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-light h-12 gap-3 pl-5 [&_.puck]:h-10 [&_.puck]:w-10" onClick={() => onDecide(k, "approved")}>
                    Approve
                    <span className="puck" aria-hidden="true">
                      <Check />
                    </span>
                  </button>
                  <button type="button" className="btn btn-ghost h-12 px-5" onClick={() => onDecide(k, "discarded")}>
                    Discard
                  </button>
                </div>
              ) : (
                <div role="status" className="mt-4 flex items-start gap-2.5 border-t border-line pt-3">
                  <span
                    className={cx(
                      "mt-[2px] grid h-5 w-5 flex-none place-items-center rounded-full",
                      v === "approved" ? "bg-orange-soft text-white" : "border border-line-2 text-gray-2",
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-[0.86rem] leading-snug">
                      {v === "approved" ? "Approved by you, logged with the time and the source it came from." : "Discarded. Nothing was sent or created."}
                    </p>
                    {v === "discarded" && <p className="t-label mt-1">The draft stays available if someone wants to revisit it.</p>}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {anyDecided && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="t-body t-justify max-w-[52ch]">
            {anyApproved ? "In a pilot, this would go out through the connected email account and task tool. In this simulation, nothing is sent." : "Nothing leaves without approval."}
          </p>
          <button type="button" onClick={onReset} className="t-nav min-h-11 text-gray underline decoration-line-2 underline-offset-4 hover:text-white">
            Reset this step
          </button>
        </div>
      )}
    </div>
  );
}
