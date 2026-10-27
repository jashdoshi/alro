import type { ReactNode } from "react";
import { ciJobs, tracks } from "@/lib/content";
import { Sparkle } from "./icons";
import { Num, Photo, cx } from "./ui-legacy";

/**
 * Company Intelligence page pieces: the "three jobs" image cards with a glass
 * chat bubble inside (reference services cards), and the horizontal pilot stepper.
 */

const jobArt = [
  { img: "/img/reading.jpg", pos: "50% 40%", who: "You ask", side: "right" as const, note: "Answered with its source" },
  { img: "/img/blinds.jpg", pos: "60% 50%", who: "It flags", side: "left" as const, note: "For a person to review" },
  { img: "/img/ember-flow.jpg", pos: "30% 50%", who: "You ask", side: "right" as const, note: "Waits for your approval" },
];

function Bubble({ who, side, children, note }: { who: string; side: "left" | "right"; children: ReactNode; note: string }) {
  const right = side === "right";
  return (
    <div className={cx("flex w-full flex-col gap-2", right ? "items-end" : "items-start")}>
      <div
        className={cx(
          "glass max-w-[92%] rounded-[18px] px-4 py-3.5 [--blur:14px]",
          right ? "rounded-br-[6px]" : "rounded-bl-[6px] !border-accent/30",
        )}
      >
        <p className="mb-1.5 flex items-center gap-1.5 text-[0.7rem] text-fg-2">
          {right ? (
            <span className="h-1.5 w-1.5 rounded-full bg-fg/60" />
          ) : (
            <Sparkle className="h-2.5 w-2.5 text-accent" />
          )}
          {who}
        </p>
        <p className="text-[0.95rem] leading-snug tracking-[-0.02em] text-fg">{children}</p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[0.68rem] text-fg-2">
        <span className="pulse h-1.5 w-1.5 rounded-full bg-accent" />
        {note}
      </span>
    </div>
  );
}

export function JobCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ciJobs.map((j, k) => {
        const a = jobArt[k];
        return (
          <article
            key={j.title}
            className={cx("group relative flex min-h-[500px] flex-col overflow-hidden rounded-[26px] md:min-h-[560px]", k === 1 ? "card-hot" : "card")}
            data-reveal
            style={{ ["--i" as string]: k }}
          >
            <Photo src={a.img} position={a.pos} className="!absolute inset-0 opacity-70" sizes="(min-width: 768px) 33vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/20 to-bg" />
            <div className="relative flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-center justify-between">
                <Num n={k + 1} className="bg-black/30" />
              </div>
              <div className="flex flex-1 items-center py-8">
                <Bubble who={a.who} side={a.side} note={a.note}>
                  “{j.example}”
                </Bubble>
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="h4 !text-[1.35rem]">{j.title}</h3>
                <p className="body">{j.body}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Four pilot stages as a horizontal stepper on desktop, a vertical rail on mobile. */
export function PilotStepper() {
  const steps = tracks.systems.steps;
  return (
    <ol className="relative grid gap-3 md:grid-cols-4 md:gap-4">
      {/* rail */}
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-accent via-line-2 to-transparent md:hidden" />
      <span aria-hidden="true" className="absolute left-6 right-6 top-[27px] hidden h-px bg-gradient-to-r from-accent via-line-2 to-transparent md:block" />
      {steps.map((s, k) => (
        <li key={s.title} className="relative flex gap-4 md:flex-col md:gap-5" data-reveal style={{ ["--i" as string]: k }}>
          <span
            className={cx(
              "relative z-10 mt-2.5 ml-2.5 grid h-8 w-8 flex-none place-items-center rounded-full border text-[0.74rem] tabular-nums md:mt-3 md:ml-3",
              k === 0 ? "pulse border-accent bg-accent text-white" : "border-line-2 bg-bg-2 text-fg-2",
            )}
          >
            {String(k + 1).padStart(2, "0")}
          </span>
          <div className={cx("glass-dark flex flex-1 flex-col gap-2 rounded-[20px] p-5 md:min-h-[190px] md:p-6", k === 3 && "opacity-90")}>
            <p className="text-[1.08rem] font-medium tracking-[-0.03em]">{s.title}</p>
            <p className="body !text-[0.92rem]">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
