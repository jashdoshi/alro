import type { ReactNode } from "react";

/** Character roll: each char has a clone below that rolls up on hover (CSS). */
export function Swap({ children }: { children: string }) {
  const words = children.trim().split(/\s+/);
  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex">
        {words.map((w, wi) => (
          <span key={wi} className="inline-flex" style={{ marginRight: wi < words.length - 1 ? "0.3em" : 0 }}>
            {[...w].map((ch, ci) => {
              const d = `${wi * 0.1 + ci * 0.03}s`;
              return (
                <span key={ci} className="char-wrap">
                  <span className="char" style={{ transitionDelay: d }}>
                    {ch}
                  </span>
                  <span className="char clone" style={{ transitionDelay: d }}>
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

/** Section header: eyebrow, serif H2 (masked line reveal), optional lead. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className = "",
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={`grid gap-5 ${center ? "justify-items-center text-center" : ""} ${className}`}>
      <span className="eyebrow" data-reveal="fade">
        {eyebrow}
      </span>
      <h2 className="h2 max-w-[22ch]" data-reveal="lines">
        {title}
      </h2>
      {lead && (
        <p className="lead" data-reveal="fade">
          {lead}
        </p>
      )}
    </div>
  );
}
