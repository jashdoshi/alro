import Image from "next/image";

/**
 * Realistic interface illustrations for the lab pieces (no stock imagery).
 * Each has a still and a "moving" state that crossfades on card hover.
 */
type SceneKind = "assistant" | "story" | "design" | "systems";
type PortfolioKind = "jash-portfolio" | "sumedh-portfolio";
type Kind = SceneKind | PortfolioKind;

export function LabMedia({ kind }: { kind: Kind }) {
  if (kind === "jash-portfolio" || kind === "sumedh-portfolio") {
    return <PortfolioPreview kind={kind} />;
  }

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

/**
 * Shows a founder's real portfolio inside the project frame.
 *
 * A short sequence of real-site captures moves behind the clipped card. This
 * avoids cross-site frame restrictions and keeps the card lightweight.
 */
const portfolioPreviews = {
  "jash-portfolio": {
    label: "jashdoshi.in",
    frames: [
      { src: "/images/jashdoshi-hero.jpg", alt: "Jash Doshi portfolio hero" },
      { src: "/images/jashdoshi-about.jpg", alt: "About section from Jash Doshi's portfolio" },
      { src: "/images/jashdoshi-experience.jpg", alt: "Experience section from Jash Doshi's portfolio" },
    ],
  },
  "sumedh-portfolio": {
    label: "sumedhs-portfolio.vercel.app",
    frames: [
      { src: "/images/sumedh-hero.jpg", alt: "Sumedh Kudav portfolio hero painted along Marine Drive" },
      { src: "/images/sumedh-work.jpg", alt: "Featured live-call assistant from Sumedh Kudav's portfolio" },
      { src: "/images/sumedh-desktop.jpg", alt: "Custom Linux desktop section from Sumedh Kudav's portfolio" },
    ],
  },
} as const;

function PortfolioPreview({ kind }: { kind: PortfolioKind }) {
  const preview = portfolioPreviews[kind];

  return (
    <div className="portfolio-preview" aria-hidden="true">
      <div className="portfolio-preview__track">
        {preview.frames.map((frame) => (
          <Image key={frame.src} src={frame.src} alt={frame.alt} width={1280} height={720} sizes="(min-width: 768px) 50vw, 100vw" />
        ))}
      </div>
      <span className="portfolio-preview__label">{preview.label}</span>
    </div>
  );
}

const bg = {
  story: "#050403",
  design: "#050403",
  systems: "linear-gradient(135deg,#2a2a28 0%,#111 100%)",
} satisfies Record<Exclude<SceneKind, "assistant">, string>;

const generatedMedia = {
  story: "/images/alro-story.png",
  design: "/images/alro-design.png",
} as const;

function Scene({ kind, alt }: { kind: SceneKind; alt: boolean }) {
  const background = kind === "assistant" ? undefined : bg[kind];

  return (
    <div
      className={`absolute inset-0 grid place-items-center p-[7%] ${kind === "assistant" ? "frost-field frost-field--assistant" : ""}`}
      style={background ? { background } : undefined}
    >
      {(kind === "story" || kind === "design") && (
        <Image
          src={generatedMedia[kind]}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--quint)]"
          style={{ transform: alt ? "scale(1.045) translate3d(0, -1%, 0)" : "scale(1)" }}
        />
      )}
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
