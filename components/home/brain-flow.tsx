import { Logo } from "../flow/logo";

/**
 * Company Brain, in one picture: messages and mail from the tools a team
 * already uses flow into alro, and come out as decisions, sales updates,
 * proposals and follow-ups. Pure SVG + CSS (no JS); motion stops under
 * prefers-reduced-motion. Brand marks: Simple Icons (CC0), drawn in one tone.
 *
 * Geometry lives in a 160 × 100 viewBox that matches the card's 16:10 frame,
 * so the HTML chips (positioned in %) and the SVG lines line up exactly.
 */

const CYCLE = 3.6; // seconds for one pulse to travel in and out

const sources = [
  { name: "Microsoft Teams", y: 14, d: "M20.625 8.127q-.55 0-1.025-.205-.475-.205-.832-.563-.358-.357-.563-.832Q18 6.053 18 5.502q0-.54.205-1.02t.563-.837q.357-.358.832-.563.474-.205 1.025-.205.54 0 1.02.205t.837.563q.358.357.563.837.205.48.205 1.02 0 .55-.205 1.025-.205.475-.563.832-.357.358-.837.563-.48.205-1.02.205zm0-3.75q-.469 0-.797.328-.328.328-.328.797 0 .469.328.797.328.328.797.328.469 0 .797-.328.328-.328.328-.797 0-.469-.328-.797-.328-.328-.797-.328zM24 10.002v5.578q0 .774-.293 1.46-.293.685-.803 1.194-.51.51-1.195.803-.686.293-1.459.293-.445 0-.908-.105-.463-.106-.85-.329-.293.95-.855 1.729-.563.78-1.319 1.336-.756.557-1.67.861-.914.305-1.898.305-1.148 0-2.162-.398-1.014-.399-1.805-1.102-.79-.703-1.312-1.664t-.674-2.086h-5.8q-.411 0-.704-.293T0 16.881V6.873q0-.41.293-.703t.703-.293h8.59q-.34-.715-.34-1.5 0-.727.275-1.365.276-.639.75-1.114.475-.474 1.114-.75.638-.275 1.365-.275t1.365.275q.639.276 1.114.75.474.475.75 1.114.275.638.275 1.365t-.275 1.365q-.276.639-.75 1.113-.475.475-1.114.75-.638.276-1.365.276-.188 0-.375-.024-.188-.023-.375-.058v1.078h10.875q.469 0 .797.328.328.328.328.797zM12.75 2.373q-.41 0-.78.158-.368.158-.638.434-.27.275-.428.639-.158.363-.158.773 0 .41.158.78.159.368.428.638.27.27.639.428.369.158.779.158.41 0 .773-.158.364-.159.64-.428.274-.27.433-.639.158-.369.158-.779 0-.41-.158-.773-.159-.364-.434-.64-.275-.275-.639-.433-.363-.158-.773-.158zM6.937 9.814h2.25V7.94H2.814v1.875h2.25v6h1.875zm10.313 7.313v-6.75H12v6.504q0 .41-.293.703t-.703.293H8.309q.152.809.556 1.5.405.691.985 1.19.58.497 1.318.779.738.281 1.582.281.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752zm5.25-1.547v-5.203h-3.75v6.855q.305.305.691.452.387.146.809.146.469 0 .879-.176.41-.175.715-.48.304-.305.48-.715t.176-.879Z" },
  { name: "Outlook", y: 32, d: "M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z" },
  { name: "WhatsApp", y: 50, d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
  { name: "Gmail", y: 68, d: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" },
  { name: "Slack", y: 86, d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" },
];

const outputs = [
  { label: "Decisions", y: 20, icon: "decide" },
  { label: "Sales updates", y: 40, icon: "sales" },
  { label: "Proposals", y: 60, icon: "proposal" },
  { label: "Follow-ups", y: 80, icon: "send" },
] as const;

const SRC_X = 14; // centre of the source chips
const HUB = { x: 76, y: 50, r: 17.6 }; // r = 22% of the width / 2, in viewBox units
const OUT_X = 109; // left edge of the output pills

const inPath = (y: number) => {
  const ey = HUB.y + (y - HUB.y) * 0.22;
  const sx = SRC_X + 7;
  const ex = HUB.x - HUB.r + 0.6;
  return `M${sx} ${y} C ${sx + 18} ${y}, ${ex - 16} ${ey}, ${ex} ${ey}`;
};
const outPath = (y: number) => {
  const sy = HUB.y + (y - HUB.y) * 0.22;
  const sx = HUB.x + HUB.r - 0.6;
  return `M${sx} ${sy} C ${sx + 9} ${sy}, ${OUT_X - 10} ${y}, ${OUT_X} ${y}`;
};

export function BrainFlow() {
  return (
    <div className="bf relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#191715,#34312d)]" data-clip-img>
      <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {sources.map((s, i) => (
          <g key={s.name}>
            <path d={inPath(s.y)} className="bf-line" />
            <path d={inPath(s.y)} className="bf-flow" style={{ animationDelay: `${-i * 0.4}s` }} />
            <circle r="0.9" className="bf-dot">
              <animateMotion dur={`${CYCLE}s`} begin={`${i * 0.28}s`} repeatCount="indefinite" path={inPath(s.y)} keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear" />
              <animate attributeName="opacity" dur={`${CYCLE}s`} begin={`${i * 0.28}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.06;0.4;0.46;1" />
            </circle>
          </g>
        ))}
        {outputs.map((o, i) => (
          <g key={o.label}>
            <path d={outPath(o.y)} className="bf-line" />
            <path d={outPath(o.y)} className="bf-flow" style={{ animationDelay: `${-i * 0.5}s` }} />
            <circle r="0.9" className="bf-dot">
              <animateMotion dur={`${CYCLE}s`} begin={`${1.7 + i * 0.22}s`} repeatCount="indefinite" path={outPath(o.y)} keyPoints="0;1;1" keyTimes="0;0.32;1" calcMode="linear" />
              <animate attributeName="opacity" dur={`${CYCLE}s`} begin={`${1.7 + i * 0.22}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.05;0.28;0.33;1" />
            </circle>
          </g>
        ))}
      </svg>

      {/* sources */}
      {sources.map((s, i) => (
        <span
          key={s.name}
          title={s.name}
          className="bf-src absolute grid aspect-square w-[9.5%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          style={{ left: `${(SRC_X / 160) * 100}%`, top: `${s.y}%`, animationDelay: `${i * 0.28}s` }}
        >
          <svg viewBox="0 0 24 24" className="h-[46%] w-[46%]" fill="currentColor" role="img" aria-label={s.name}>
            <path d={s.d} />
          </svg>
        </span>
      ))}

      {/* hub */}
      <div className="absolute aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${(HUB.x / 160) * 100}%`, top: `${HUB.y}%` }}>
        <span className="bf-ring absolute inset-0 rounded-full" />
        <span className="bf-ring absolute inset-0 rounded-full" style={{ animationDelay: `${CYCLE / 2}s` }} />
        <span className="bf-hub absolute inset-0 grid place-items-center rounded-full">
          <Logo className="h-auto w-[58%]" />
        </span>
      </div>

      {/* outputs */}
      {outputs.map((o, i) => (
        <span
          key={o.label}
          className="bf-out absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full py-[0.35em] pl-[0.4em] pr-[0.8em] text-[9px] sm:gap-2 sm:text-[10px] sm:uppercase sm:tracking-[0.12em]"
          style={{ left: `${(OUT_X / 160) * 100}%`, top: `${o.y}%`, animationDelay: `${1.7 + i * 0.22 + CYCLE * 0.3}s` }}
        >
          <OutIcon kind={o.icon} delay={1.7 + i * 0.22 + CYCLE * 0.3} />
          {o.label}
        </span>
      ))}

      <p className="absolute bottom-[3%] right-[3%] text-[8px] uppercase tracking-[0.15em] opacity-40 sm:text-[9px]" style={{ color: "var(--on-media)" }}>
        Illustrative
      </p>

      <style>{`
        .bf { color: var(--on-media); --bf: var(--on-media); }
        .bf-line { stroke: var(--bf); stroke-opacity: .14; stroke-width: .35; }
        .bf-flow { stroke: var(--bf); stroke-opacity: .55; stroke-width: .35; stroke-dasharray: 1.2 5; animation: bf-dash ${CYCLE}s linear infinite; }
        .bf-dot { fill: var(--bf); }
        .bf-src { background: rgb(255 255 255 / .05); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 22%, transparent); animation: bf-ping ${CYCLE}s var(--quint) infinite; }
        .bf-hub { background: radial-gradient(circle at 50% 35%, rgb(255 255 255 / .1), rgb(255 255 255 / .02)); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 35%, transparent), 0 20px 40px -18px rgb(0 0 0 / .6); backdrop-filter: blur(6px); }
        .bf-ring { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 40%, transparent); animation: bf-sonar ${CYCLE}s var(--quint) infinite; }
        .bf-out { background: rgb(0 0 0 / .28); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 20%, transparent); animation: bf-ping ${CYCLE}s var(--quint) infinite; }
        .bf-ico { width: 1.6em; height: 1.6em; flex: none; }
        .bf-draw { stroke-dasharray: 1; animation: bf-draw ${CYCLE}s var(--flow-ease) infinite; }
        .bf-write { transform-box: fill-box; transform-origin: left center; animation: bf-write ${CYCLE}s var(--flow-ease) infinite; }
        .bf-fly { animation: bf-fly ${CYCLE}s var(--flow-ease) infinite; }
        @keyframes bf-dash { to { stroke-dashoffset: -6.2; } }
        @keyframes bf-sonar { 0% { transform: scale(1); opacity: .9; } 70%, 100% { transform: scale(1.45); opacity: 0; } }
        @keyframes bf-ping { 0%, 100% { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 20%, transparent); } 12% { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 75%, transparent), 0 0 18px -4px color-mix(in srgb, var(--bf) 45%, transparent); } 40% { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bf) 20%, transparent); } }
        @keyframes bf-draw { 0% { stroke-dashoffset: 1; } 30%, 80% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
        @keyframes bf-write { 0% { transform: scaleX(0); } 35%, 80% { transform: scaleX(1); } 100% { transform: scaleX(0); opacity: 0; } }
        @keyframes bf-fly { 0%, 100% { transform: translate(0, 0); opacity: 1; } 30% { transform: translate(2px, -2px); opacity: 0; } 31% { transform: translate(-2px, 2px); opacity: 0; } 50% { transform: translate(0, 0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .bf-flow, .bf-ring, .bf-src, .bf-out, .bf-draw, .bf-write, .bf-fly { animation: none !important; }
          .bf-dot { display: none; }
          .bf-draw { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function OutIcon({ kind, delay }: { kind: (typeof outputs)[number]["icon"]; delay: number }) {
  const s = { animationDelay: `${delay}s` };
  const p = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <svg viewBox="0 0 24 24" className="bf-ico" aria-hidden="true">
      {kind === "decide" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...p} strokeOpacity=".45" />
          <path d="M8 12.4l2.7 2.6L16.2 9.4" {...p} pathLength={1} className="bf-draw" style={s} />
        </>
      )}
      {kind === "sales" && (
        <>
          <path d="M4 19.5h16" {...p} strokeOpacity=".45" />
          <path d="M5 16l4.2-4.4 3.3 2.8L19 7.5" {...p} pathLength={1} className="bf-draw" style={s} />
          <path d="M15.2 7.5H19v3.8" {...p} strokeOpacity=".7" />
        </>
      )}
      {kind === "proposal" && (
        <>
          <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" {...p} strokeOpacity=".45" />
          {[10.5, 13.5, 16.5].map((y, k) => (
            <path key={y} d={`M9.5 ${y}h${k === 2 ? 4 : 6}`} {...p} className="bf-write" style={{ animationDelay: `${delay + k * 0.18}s` }} />
          ))}
        </>
      )}
      {kind === "send" && (
        <g className="bf-fly" style={s}>
          <path d="M20 4L9.5 14.5M20 4l-6.5 16-4-5.5L4 10.5z" {...p} />
        </g>
      )}
    </svg>
  );
}
