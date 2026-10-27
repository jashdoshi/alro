import { Sparkle } from "./icons";
import { cx } from "./ui-legacy";

/**
 * Small glass "product" widgets that sit inside the service cards,
 * like the reference's revenue chart / lead-capture / active-users panels.
 * Pure CSS + SVG; animation is decorative and stops under reduced motion.
 */

/** Digital Experiences: a page assembling itself in a browser frame. */
export function BrowserWidget() {
  return (
    <div className="glass w-full rounded-[18px] p-3.5">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-white/8 px-3 text-[0.62rem] leading-5 text-fg-3">yourbusiness.com</span>
      </div>
      <div className="grid gap-2 rounded-[12px] bg-black/35 p-3">
        <div className="flex items-center justify-between">
          <span className="h-2 w-10 rounded-full bg-white/40" />
          <span className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/20" />
            <span className="h-1.5 w-6 rounded-full bg-white/20" />
            <span className="h-1.5 w-8 rounded-full bg-accent/80" />
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <span className="h-3.5 w-[80%] rounded-md bg-white/80 [animation:grow_4s_var(--ease)_infinite]" />
          <span className="h-3.5 w-[55%] rounded-md bg-white/80 [animation:grow_4s_var(--ease)_.2s_infinite]" />
          <span className="mt-1 h-1.5 w-[62%] rounded-full bg-white/25" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <span className="aspect-[4/3] rounded-md bg-gradient-to-br from-accent/70 to-accent-deep/60" />
          <span className="aspect-[4/3] rounded-md bg-white/10" />
          <span className="aspect-[4/3] rounded-md bg-white/10" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[0.7rem] text-fg-2">
        <span>Responsive · Accessible · Fast</span>
        <span className="tag !h-6 !text-[0.66rem]">Bespoke</span>
      </div>
    </div>
  );
}

/** Intelligent Systems: connect → retrieve → act, with approval gate. */
export function FlowWidget() {
  const nodes = [
    { t: "Connect", d: "Approved docs, notes and threads, with their permissions." },
    { t: "Retrieve & reason", d: "Search, cite the source, say when there’s no answer." },
    { t: "Act", d: "Drafts a follow-up — waits for a person to approve." },
  ];
  return (
    <div className="relative flex w-full flex-col gap-4">
      <svg className="absolute left-5 top-6 h-[calc(100%-48px)] w-6" viewBox="0 0 24 200" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M2 0 V200" stroke="rgb(255 255 255 / .2)" strokeDasharray="3 4" />
      </svg>
      {nodes.map((n, k) => (
        <div key={n.t} className={cx("glass-dark relative ml-[calc(var(--k)*14px)] rounded-[14px] p-3", k === 2 && "border-accent/40")} style={{ ["--k" as string]: k }}>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[0.78rem] font-medium">{n.t}</span>
            <span className={cx("h-2 w-2 rounded-full", k === 2 ? "bg-accent pulse" : "bg-white/40")} />
          </div>
          <p className="rounded-[10px] bg-black/50 px-2.5 py-2 text-[0.68rem] leading-snug text-fg-2">{n.d}</p>
        </div>
      ))}
    </div>
  );
}

/** Company Intelligence: one document, what it found. */
export function ExtractWidget() {
  const stats = [
    ["3", "decisions"],
    ["4", "actions"],
    ["3", "owners"],
    ["4", "dates"],
  ];
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <div>
        <p className="text-[1.05rem] font-medium tracking-[-0.03em]">Supplier review.pdf</p>
        <p className="text-[0.72rem] text-fg-2">Meeting notes · 4 pages · fictional</p>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {stats.map(([n, l], k) => (
          <div key={l} className={cx("glass-dark rounded-[14px] px-3 py-2.5 text-left", k === 1 && "border-accent/40")}>
            <p className="text-[1.6rem] font-medium leading-none tracking-[-0.05em]">{n}</p>
            <p className="text-[0.7rem] text-fg-2">{l}</p>
          </div>
        ))}
      </div>
      <div className="glass flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[0.72rem]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
          <Sparkle className="h-3 w-3 text-white" />
        </span>
        One action has no owner
      </div>
    </div>
  );
}
