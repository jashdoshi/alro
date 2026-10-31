/**
 * Realistic interface illustrations for the lab pieces (no stock imagery).
 * Each has a still and a "moving" state that crossfades on card hover.
 */
type Kind = "assistant" | "story" | "design" | "systems";

export function LabMedia({ kind }: { kind: Kind }) {
  return (
    <>
      <div className="still" data-clip-img>
        <Scene kind={kind} alt={false} />
      </div>
      <div className="moving">
        <Scene kind={kind} alt />
      </div>
    </>
  );
}

const bg = {
  assistant: "linear-gradient(135deg,#1c1c1c 0%,#3a3a38 100%)",
  story: "linear-gradient(135deg,#e9e6df 0%,#cfcac0 100%)",
  design: "linear-gradient(135deg,#f3f2ee 0%,#dcd9d2 100%)",
  systems: "linear-gradient(135deg,#2a2a28 0%,#111 100%)",
};

function Scene({ kind, alt }: { kind: Kind; alt: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-[7%]" style={{ background: bg[kind] }}>
      {kind === "assistant" && (
        <div className="grid w-full max-w-[78%] gap-2.5 rounded-xl bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-ink/60">
            <span>Knowledge assistant</span>
            <span>{alt ? "Weekly briefing" : "Ask"}</span>
          </div>
          {alt ? (
            <>
              {["Decided — pricing held for existing accounts", "Changed — launch moved one week", "Open — three replies outstanding"].map((t) => (
                <p key={t} className="border-t border-ink/10 pt-2 text-[10px] text-ink/75">
                  {t}
                </p>
              ))}
            </>
          ) : (
            <>
              <p className="ml-auto rounded-lg bg-ink/5 px-2.5 py-1.5 text-[10px]">What did we decide about pricing?</p>
              <p className="font-serif text-[12px] leading-snug">Hold prices for existing accounts until January.</p>
              <div className="flex gap-1.5">
                {["Meeting notes", "Pricing v3"].map((s) => (
                  <span key={s} className="rounded-full border border-ink/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.12em] text-ink/55">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {kind === "story" && (
        <div className="flex items-end gap-4">
          {[0, 1].map((k) => (
            <div key={k} className="w-[clamp(90px,14vw,150px)] overflow-hidden rounded-[18px] border-[5px] border-ink bg-paper shadow-2xl" style={{ transform: k ? "translateY(-10%)" : "none" }}>
              <div className="aspect-[9/17] p-3">
                <p className="tiny !text-[7px]">Chapter {alt ? k + 3 : k + 1}</p>
                <p className="mt-2 font-serif text-[13px] italic leading-tight">{alt ? (k ? "and then," : "the year it all") : k ? "where it" : "A story,"}</p>
                <p className="font-serif text-[13px] leading-tight">{alt ? (k ? "everything." : "changed") : k ? "started." : "told slowly"}</p>
                <div className="mt-3 aspect-square rounded-lg" style={{ background: "radial-gradient(circle at 30% 30%,#bdb8ad,#6f6b63)" }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {kind === "design" && (
        <div className="grid w-full grid-cols-3 gap-2.5">
          {Array.from({ length: 6 }).map((_, k) => (
            <div key={k} className="aspect-[4/3] rounded-md bg-white p-2 shadow-md" style={{ transform: alt ? `translateY(${(k % 3) * -6}px)` : "none", transition: "transform .7s var(--quint)" }}>
              <div className="h-1.5 w-1/2 rounded-full bg-ink/70" />
              <div className="mt-1.5 h-1 w-3/4 rounded-full bg-ink/20" />
              <div className="mt-2 h-[45%] rounded-sm" style={{ background: k % 2 ? "#d8d5ce" : "#bfbab0" }} />
            </div>
          ))}
        </div>
      )}
      {kind === "systems" && (
        <svg viewBox="0 0 320 200" className="w-full max-w-[80%]" fill="none" aria-hidden="true">
          {[
            [40, 100, 140, 50],
            [40, 100, 140, 150],
            [140, 50, 260, 100],
            [140, 150, 260, 100],
          ].map(([x1, y1, x2, y2], k) => (
            <path key={k} d={`M${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} stroke="#e7e5e0" strokeOpacity={alt ? 0.9 : 0.35} strokeWidth="1.5" />
          ))}
          {[
            [40, 100, "Source"],
            [140, 50, "Sync"],
            [140, 150, "Rules"],
            [260, 100, "Report"],
          ].map(([x, y, t]) => (
            <g key={t as string}>
              <circle cx={x as number} cy={y as number} r="18" fill={alt && t === "Report" ? "#e7e5e0" : "#1b1b1b"} stroke="#e7e5e0" strokeOpacity=".6" />
              <text x={x as number} y={(y as number) + 34} textAnchor="middle" fill="#e7e5e0" fillOpacity=".7" fontSize="9" letterSpacing="1.5">
                {(t as string).toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
