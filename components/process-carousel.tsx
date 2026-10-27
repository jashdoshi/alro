"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { process } from "@/lib/content";
import { ArrowLeft, ArrowRight } from "./icons";
import { Chip, cx } from "./ui-legacy";

/**
 * The reference's "The System That Drives Growth" block: a full-bleed photo,
 * heading on the left, and a frosted card on the right that steps through the
 * five-stage method. The line illustration gains one ring per step.
 */
export function ProcessCarousel({
  chip = "How we work",
  title = "Five steps, the same every time.",
  lead = "One method for websites and systems alike — so you always know what happens next.",
  image = "/img/laptop-night.jpg",
}: {
  chip?: string;
  title?: string;
  lead?: string;
  image?: string;
}) {
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const n = process.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const step = process[i];

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel" aria-label="Working process">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover object-[30%_center] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/40" />
      </div>

      <div className="wrap relative grid min-h-[min(900px,100svh)] items-end gap-10 py-[calc(var(--section)*0.9)] md:grid-cols-[1fr_1.05fr] md:items-center">
        <div className="flex flex-col items-start gap-5 self-end md:pb-10" data-reveal>
          <Chip>{chip}</Chip>
          <h2 className="h2 max-w-[13ch]">{title}</h2>
          <p className="max-w-[40ch] text-fg-2">{lead}</p>
        </div>

        <div
          className="glass flex min-h-[460px] flex-col rounded-[28px] p-7 md:min-h-[540px] md:p-10"
          data-reveal
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <div className="flex items-start justify-between gap-6">
            <h3 key={step.title} className="text-[clamp(2rem,1.4rem+2vw,3rem)] font-medium leading-none tracking-[-0.05em]">
              {step.title}
            </h3>
            <span className="pt-2 text-[0.88rem] tabular-nums text-fg-2">
              {"// "}{String(i + 1).padStart(2, "0")} – {String(n).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-5 max-w-[42ch] text-fg-2" aria-live="polite">
            {step.body}
          </p>

          <div className="mt-auto flex items-end justify-between gap-6 pt-10">
            <Rings count={i + 1} />
            <div className="flex gap-3">
              <button type="button" className="btn btn-ghost btn-icon" aria-label="Previous step" onClick={() => go(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" className="btn btn-primary btn-icon" aria-label="Next step" onClick={() => go(1)}>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-2" role="tablist" aria-label="Steps">
            {process.map((p, k) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={p.title}
                onClick={() => setI(k)}
                className={cx("h-1 flex-1 rounded-full transition-colors", k <= i ? "bg-accent" : "bg-white/15")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Overlapping outline rings; one more appears each step. */
function Rings({ count }: { count: number }) {
  return (
    <svg viewBox="0 0 220 140" className="h-[110px] w-[170px] md:h-[140px] md:w-[220px]" fill="none" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, k) => (
        <circle
          key={k}
          cx={60 + k * 22}
          cy={84 - k * 10}
          r={52}
          stroke={k === count - 1 ? "var(--accent)" : "currentColor"}
          strokeWidth={k === count - 1 ? 2 : 1.4}
          className="transition-all duration-700"
          style={{ opacity: k < count ? 1 : 0, transform: k < count ? "none" : "scale(0.9)", transformOrigin: `${60 + k * 22}px ${84 - k * 10}px` }}
        />
      ))}
    </svg>
  );
}
