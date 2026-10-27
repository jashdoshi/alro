import { Sparkle } from "./icons";
import { cx } from "./ui-legacy";

/**
 * Intelligent Systems "How it works" diagram: Connect → Retrieve & reason → Ask / Alert / Brief / Act.
 * HTML nodes on glass, thin SVG connectors with a slow dash flow and pulsing dots.
 * Horizontal from lg up; a vertical stack below. Motion stops under reduced motion
 * (the global rule in globals.css, plus a local rule for the dash flow).
 */

const sources = ["Approved documents", "Meeting notes", "Team conversations", "Project information"];
const core = ["Search what’s relevant", "Cite the original source", "Respect who can see what"];
const outputs = [
  { t: "Ask", d: "Find answers and decisions." },
  { t: "Alert", d: "Surface blockers and changes." },
  { t: "Brief", d: "Prepare useful summaries." },
  { t: "Act", d: "Trigger approved workflows." },
];

const flow = "sd-flow";

function Dot({ className, still }: { className?: string; still?: boolean }) {
  return <span aria-hidden="true" className={cx("h-2 w-2 rounded-full", still ? "bg-fg/60" : "pulse bg-accent", className)} />;
}

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="flex items-center gap-2 text-[0.74rem] text-fg-2">
      <span className="tabular-nums text-accent">{n}</span>
      {children}
    </p>
  );
}

/** Short vertical connector for the stacked (mobile/tablet) layout. */
function VLink() {
  return (
    <svg aria-hidden="true" className="mx-auto h-12 w-3 lg:hidden" viewBox="0 0 12 48" fill="none">
      <line x1="6" y1="0" x2="6" y2="48" stroke="rgb(255 255 255 / .14)" />
      <line x1="6" y1="0" x2="6" y2="48" stroke="var(--accent)" strokeDasharray="3 7" className={flow} />
      <circle cx="6" cy="44" r="2.5" fill="var(--accent)" />
    </svg>
  );
}

export function SystemsDiagram() {
  return (
    <figure className="flex flex-col gap-6">
      <style>{`
        @keyframes sd-flow { to { stroke-dashoffset: -20; } }
        .sd-flow { animation: sd-flow 1.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .sd-flow { animation: none; } }
      `}</style>

      <div
        className="glass-dark relative rounded-[28px] p-4 sm:p-6 lg:grid lg:grid-cols-[1fr_72px_1.05fr_88px_1fr] lg:items-stretch lg:p-8"
        role="img"
        aria-label="Approved documents, meeting notes, conversations and project information are connected; the system retrieves and reasons over them with sources and permissions; then it can answer, alert, brief, or trigger approved actions."
      >
        {/* 01 Connect */}
        <div className="card flex flex-col gap-4 rounded-[20px] p-5 lg:self-center" data-reveal>
          <Label n="01">Connect</Label>
          <ul className="flex flex-col gap-2">
            {sources.map((s) => (
              <li key={s} className="flex items-center justify-between gap-3 rounded-[12px] border border-line bg-black/30 px-3 py-2.5 text-[0.86rem]">
                {s}
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-fg/50" />
              </li>
            ))}
          </ul>
        </div>

        <VLink />
        {/* connector 1 (desktop) */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 72 400" preserveAspectRatio="none" fill="none">
            <line x1="0" y1="200" x2="72" y2="200" stroke="rgb(255 255 255 / .14)" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="200" x2="72" y2="200" stroke="var(--accent)" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" className={flow} />
          </svg>
          <Dot className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* 02 Retrieve & reason */}
        <div className="card-hot flex flex-col gap-5 rounded-[22px] p-5 lg:self-center lg:p-6" data-reveal style={{ ["--i" as string]: 1 }}>
          <Label n="02">Retrieve &amp; reason</Label>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a55,#c63d06_60%,#6e1f02)] shadow-[0_8px_24px_-6px_var(--accent-glow)]">
              <Sparkle className="h-4 w-4 text-white" />
            </span>
            <p className="text-[1.15rem] font-medium leading-tight tracking-[-0.03em]">A knowledge layer over approved sources</p>
          </div>
          <ul className="flex flex-col gap-2 border-t border-line pt-4">
            {core.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-[0.86rem] text-fg-2">
                <span className="h-px w-3 bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <VLink />
        {/* connector 2 (desktop): one-to-four fan */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 88 400" preserveAspectRatio="none" fill="none">
            {[50, 150, 250, 350].map((y) => (
              <g key={y}>
                <path d={`M0 200 C44 200 44 ${y} 88 ${y}`} stroke="rgb(255 255 255 / .14)" vectorEffect="non-scaling-stroke" />
                <path d={`M0 200 C44 200 44 ${y} 88 ${y}`} stroke="var(--accent)" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" className={flow} />
              </g>
            ))}
          </svg>
        </div>

        {/* 03 Outputs */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-rows-4 lg:gap-0">
          <div className="lg:hidden">
            <Label n="03">What it can do</Label>
          </div>
          <div className="grid grid-cols-2 gap-2.5 lg:contents">
            {outputs.map((o, k) => (
              <div key={o.t} className="lg:flex lg:items-center lg:py-1.5" data-reveal style={{ ["--i" as string]: k + 2 }}>
                <div className={cx("card relative flex h-full w-full flex-col gap-1 rounded-[16px] p-3.5 lg:h-auto lg:flex-row lg:items-center lg:gap-3", k === 3 && "!border-accent/35")}>
                  <Dot className="hidden lg:absolute lg:-left-1 lg:top-1/2 lg:block lg:-translate-y-1/2" />
                  <p className="text-[0.98rem] font-medium tracking-[-0.02em] lg:w-12 lg:flex-none">{o.t}</p>
                  <p className="text-[0.8rem] leading-snug text-fg-2">{o.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="small mx-auto max-w-[60ch] text-center">
        Illustrative architecture, not a claim that ALRO has deployed this complete system for a customer.
      </figcaption>
    </figure>
  );
}
