import { cx } from "./ui-legacy";

/**
 * Digital Experiences mini-UI widgets, one per offer. They sit on a photo inside
 * the "What we make" cards, like the reference's service-card panels.
 * CSS + SVG only, one glass layer each; inner panels are flat to keep blur cheap.
 */

const frame = "glass w-full max-w-[320px] rounded-[18px] p-3.5 [--blur:14px]";

/** Bespoke websites: a wireframe being laid out, one block selected. */
export function WireframeWidget() {
  return (
    <div className={frame}>
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-auto text-[0.62rem] text-fg-3">Layout · draft 2</span>
      </div>
      <div className="relative grid gap-2 rounded-[12px] bg-black/45 p-3">
        {/* 12-col guides */}
        <div className="pointer-events-none absolute inset-3 grid grid-cols-6 gap-2 opacity-60" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, k) => (
            <span key={k} className="bg-accent/[0.06]" />
          ))}
        </div>
        <div className="relative flex items-center justify-between">
          <span className="h-2 w-8 rounded-full bg-white/45" />
          <span className="flex gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-white/20" />
            <span className="h-1.5 w-5 rounded-full bg-white/20" />
            <span className="h-1.5 w-5 rounded-full bg-white/20" />
          </span>
        </div>
        <div className="relative mt-5 rounded-[8px] border border-dashed border-accent/80 p-2.5">
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-[2px] border border-accent bg-bg" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-[2px] border border-accent bg-bg" />
          <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-[2px] border border-accent bg-bg" />
          <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[2px] border border-accent bg-bg" />
          <span className="absolute -top-5 left-0 rounded-[4px] bg-accent px-1.5 py-px text-[0.56rem] text-white">Hero</span>
          <span className="block h-2.5 w-[78%] rounded-full bg-white/75" />
          <span className="mt-1.5 block h-2.5 w-[52%] rounded-full bg-white/75" />
          <span className="mt-2.5 block h-1.5 w-[64%] rounded-full bg-white/25" />
          <span className="mt-3 block h-4 w-14 rounded-full bg-accent/85" />
        </div>
        <div className="relative grid grid-cols-3 gap-2">
          {[0, 1, 2].map((k) => (
            <span key={k} className="aspect-[4/3] rounded-[6px] border border-dashed border-white/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** SaaS marketing sites: the same section reflowing from desktop to phone. */
export function DevicePairWidget() {
  const lines = (w: string[]) =>
    w.map((x, k) => <span key={k} className={cx("block h-1.5 rounded-full", k === 0 ? "bg-white/70" : "bg-white/25")} style={{ width: x }} />);
  return (
    <div className="relative flex w-full max-w-[320px] items-end justify-center gap-3">
      {/* desktop */}
      <div className="glass w-[74%] rounded-[14px] p-2.5 [--blur:14px]">
        <div className="rounded-[8px] bg-black/45 p-2.5">
          <div className="grid grid-cols-[1.2fr_1fr] gap-2">
            <div className="flex flex-col gap-1.5 pt-1">{lines(["90%", "70%", "80%"])}</div>
            <span className="aspect-[4/3] rounded-[5px] bg-gradient-to-br from-accent/80 to-accent-deep/70" />
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-6 rounded-[4px] bg-white/10" />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/20" />
      </div>
      {/* phone */}
      <div className="glass w-[26%] rounded-[14px] p-1.5 [--blur:14px]">
        <div className="flex flex-col gap-1.5 rounded-[9px] bg-black/50 p-2">
          <span className="mx-auto mb-0.5 h-1 w-5 rounded-full bg-white/25" />
          {lines(["90%", "60%"])}
          <span className="mt-0.5 aspect-[4/3] rounded-[4px] bg-gradient-to-br from-accent/80 to-accent-deep/70" />
          <span className="h-4 rounded-[3px] bg-white/10" />
          <span className="h-4 rounded-[3px] bg-white/10" />
        </div>
      </div>
      <span className="absolute -top-9 left-0 rounded-full bg-black/55 px-2.5 py-1 text-[0.64rem] text-fg-2">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
        Rethought for phones, not shrunk
      </span>
    </div>
  );
}

/** Founder & personal-brand sites: a type and colour specimen. */
export function TypeSpecimenWidget() {
  return (
    <div className={frame}>
      <div className="flex items-start justify-between">
        <span className="text-[4.2rem] font-medium leading-[0.85] tracking-[-0.06em]">
          A<span className="text-accent">a</span>
        </span>
        <div className="flex flex-col items-end gap-1 pt-1 text-[0.62rem] text-fg-3">
          <span>Display · 500</span>
          <span>Text · 400</span>
          <span>Note · 300</span>
        </div>
      </div>
      <p className="mt-3 text-[0.95rem] leading-snug tracking-[-0.03em]">A considered home for your work, your writing and your point of view.</p>
      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
        {["bg-accent", "bg-[#f5f1ec]", "bg-[#3a2a20]", "bg-black"].map((c) => (
          <span key={c} className={cx("h-6 w-6 rounded-full border border-white/15", c)} />
        ))}
        <span className="ml-auto text-[0.62rem] text-fg-3">Your voice, set in type</span>
      </div>
    </div>
  );
}

/** Product & interface design: three screens and the flow between them. */
export function ScreenFlowWidget() {
  const screens = ["Sign up", "Set up", "Overview"];
  return (
    <div className={cx(frame, "max-w-[360px]")}>
      <div className="relative grid grid-cols-3 gap-3">
        <svg className="pointer-events-none absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2" viewBox="0 0 300 16" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0 8 H300" stroke="var(--accent)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        </svg>
        {screens.map((s, k) => (
          <div key={s} className={cx("relative flex flex-col gap-1.5 rounded-[10px] border bg-bg-2 p-2", k === 1 ? "border-accent/70" : "border-white/12")}>
            <span className="text-[0.56rem] text-fg-3">{s}</span>
            <span className="h-1.5 w-[80%] rounded-full bg-white/50" />
            <span className="h-1.5 w-[55%] rounded-full bg-white/20" />
            <span className="mt-1 h-5 rounded-[4px] bg-white/8" />
            <span className={cx("h-3 w-[60%] rounded-full", k === 1 ? "bg-accent/85" : "bg-white/20")} />
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center justify-between text-[0.62rem] text-fg-3">
        <span>Flow · structure · finish</span>
        <span className="text-accent-2">Step 2 of 3</span>
      </p>
    </div>
  );
}

/** Frontend development: a small, careful code excerpt. */
export function CodeWidget() {
  const k = "text-accent-2";
  const s = "text-[#ffd5c2]";
  const c = "text-fg-3";
  return (
    <div className={cx(frame, "max-w-[360px] font-mono")}>
      <div className="flex items-center gap-1.5 pb-2.5">
        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.58rem] text-fg-2">nav.tsx</span>
        <span className="rounded-full px-2 py-0.5 text-[0.58rem] text-fg-3">styles.css</span>
      </div>
      <pre className="overflow-hidden rounded-[10px] bg-black/50 p-3 text-[0.64rem] leading-[1.7] text-fg-2">
        <code>
          <span className={c}>{"// keyboard, screen reader, touch"}</span>
          {"\n"}
          {"<"}
          <span className={k}>button</span> aria-expanded={"{"}open{"}"}
          {"\n"}
          {"  "}aria-label=<span className={s}>&quot;Open menu&quot;</span>
          {">"}
          {"\n"}
          {"\n"}
          <span className={k}>@media</span> (prefers-reduced-motion) {"{"}
          {"\n"}
          {"  "}* {"{"} animation: <span className={s}>none</span> {"}"}
          {"\n"}
          {"}"}
        </code>
      </pre>
      <div className="mt-2.5 flex gap-1.5 font-sans">
        <span className="tag !h-5 !text-[0.6rem]">Accessible</span>
        <span className="tag !h-5 !text-[0.6rem]">Fast</span>
        <span className="tag neutral !h-5 !text-[0.6rem]">Maintainable</span>
      </div>
    </div>
  );
}
