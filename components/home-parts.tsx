"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "./icons";
import { Round, SplitButton, cx } from "./ui";

/* ───────────── Hero glass card (the reference's "Recognition" card) ───────────── */
const heroSlides = [
  {
    title: "Company Intelligence",
    body: "Our flagship: approved company knowledge, connected — with a person approving every action.",
    img: "/ref-img/desk.jpg",
    href: "/company-intelligence",
  },
  {
    title: "Digital Experiences",
    body: "Bespoke websites and products, designed around the business — never a template.",
    img: "/ref-img/lamp.jpg",
    href: "/digital-experiences",
  },
  {
    title: "Intelligent Systems",
    body: "Tools, information and workflows connected, so repetitive work gets lighter.",
    img: "/ref-img/visor.jpg",
    href: "/intelligent-systems",
  },
];

export function HeroCard() {
  const [i, setI] = useState(0);
  const s = heroSlides[i];
  const go = (d: number) => setI((v) => (v + d + heroSlides.length) % heroSlides.length);
  return (
    <div className="lg rounded-[22px] p-3">
      <div className="grid grid-cols-[112px_1fr] gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
          <Image key={s.img} src={s.img} alt="" fill sizes="120px" className="object-cover" />
        </div>
        <div className="flex flex-col py-1 pr-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[0.95rem] font-semibold leading-tight">{s.title}</p>
            <Link href={s.href} aria-label={`Open ${s.title}`} className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white text-black">
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="t-justify mt-2 text-[0.72rem] leading-snug text-white/75" aria-live="polite">
            {s.body}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex gap-1.5">
              {heroSlides.map((_, k) => (
                <span key={k} className={cx("h-[2px] w-6 rounded-full transition-colors", k === i ? "bg-white" : "bg-white/25")} />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button type="button" aria-label="Previous" onClick={() => go(-1)} className="grid h-7 w-7 place-items-center rounded-full bg-white text-black">
                <ArrowLeft className="h-3 w-3" />
              </button>
              <button type="button" aria-label="Next" onClick={() => go(1)} className="grid h-7 w-7 place-items-center rounded-full bg-orange-soft text-white">
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── [01] accordion rows (practices list, FAQ) ───────────── */
export type Row = {
  title: string;
  eyebrow?: string;
  aside?: ReactNode;
  body: ReactNode;
  image?: string;
  cta?: { href: string; label: string };
};

export function Rows({ rows, defaultOpen = 0, size = "lg" }: { rows: Row[]; defaultOpen?: number | null; size?: "lg" | "md" }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className="border-t border-line-2">
      {rows.map((r, k) => {
        const isOpen = open === k;
        const id = `row-${size}-${k}`;
        return (
          <li key={r.title} className="border-b border-line-2">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : k)}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_auto] md:gap-8 md:py-8"
            >
              <span className="t-index self-start pt-1 md:self-center md:pt-0">[{String(k + 1).padStart(2, "0")}]</span>
              <span className="flex flex-col gap-1.5">
                {r.eyebrow && <span className="t-label text-[0.7rem]">{r.eyebrow}</span>}
                <span className={cx(size === "lg" ? "t-row" : "t-h2 !text-[clamp(1.25rem,0.9rem+1.6vw,2.4rem)]", "transition-colors", isOpen ? "text-white" : "text-white/55 group-hover:text-white/85")}>
                  {r.title}
                </span>
              </span>
              <span className={cx("round", isOpen ? (size === "lg" ? "round-white" : "round-orange") : "round-dark")}>
                {isOpen ? <ArrowUpRight /> : <ArrowDownRight />}
              </span>
            </button>
            <div id={id} className={cx("grid transition-[grid-template-rows] duration-500", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_auto] md:gap-8">
                  <div className="hidden flex-col justify-end gap-4 md:flex">
                    {r.image && (
                      <div className="relative aspect-[5/4] w-full max-w-[150px] overflow-hidden rounded-[12px]">
                        <Image src={r.image} alt="" fill sizes="150px" className="object-cover" />
                      </div>
                    )}
                    {r.aside && <div className="t-label max-w-[22ch]">{r.aside}</div>}
                  </div>
                  <div className="grid gap-8 pl-[4rem] md:grid-cols-[1fr_minmax(0,22rem)] md:pl-0">
                    <div className="order-2 flex items-end md:order-1">{r.cta && <SplitButton href={r.cta.href}>{r.cta.label}</SplitButton>}</div>
                    <div className="t-body t-justify order-1 flex flex-col gap-3 text-white/80 md:order-2">{r.body}</div>
                  </div>
                  <span className="hidden w-12 md:block" />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────────── Horizontal rail with ← → (work trio) ───────────── */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (d: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] md:gap-10">
      <div className="flex flex-col justify-between gap-6">
        <p className="t-label">{label}</p>
        <div className="flex gap-3">
          <Round dir="left" tone="white" label="Previous" onClick={() => by(-1)} className="!h-14 !w-14" />
          <Round dir="right" tone="orange" label="Next" onClick={() => by(1)} className="!h-14 !w-14" />
        </div>
      </div>
      <div ref={ref} className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
        {children}
      </div>
    </div>
  );
}

/* ───────────── Founder statement (← → between the two founders) ───────────── */
export function FounderStatement({
  note,
  founders,
}: {
  note: string;
  founders: { name: string; role: string; bio: string; href: string }[];
}) {
  const [i, setI] = useState(-1); // -1 = joint note
  const go = (d: number) => setI((v) => ((v + 1 + d + founders.length + 1) % (founders.length + 1)) - 1);
  const f = i >= 0 ? founders[i] : null;
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-16">
      <div className="relative aspect-[6/7] w-full max-w-[420px] overflow-hidden rounded-[18px]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(90% 70% at 70% 30%, #ff6a1a 0%, #e83a25 35%, #4a0601 70%, #100101 100%)" }} />
        <Image src="/ref-img/wave.jpg" alt="" fill sizes="420px" className="object-cover opacity-25 mix-blend-luminosity" />
        <div className="lg lg-dark absolute inset-x-4 bottom-4 rounded-[14px] px-4 py-3">
          <p className="t-label text-white/80">Portrait</p>
          <p className="text-[0.95rem] font-medium">{f ? f.name : "[Founder One] & [Founder Two]"}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <Quote className="h-10 w-12 text-white/45" />
          <p className="t-label text-right">
            Founder statement
            <br />
            ALRO / {String(i + 2).padStart(3, "0")}
          </p>
        </div>
        <p className="t-justify mt-10 max-w-[34rem] text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-[1.45] md:ml-auto" aria-live="polite">
          {f ? f.bio : note}
        </p>
        <div className="mt-auto flex items-end justify-between gap-6 pt-12 md:ml-auto md:w-full md:max-w-[34rem]">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.02em]">{f ? f.role : "Founders, ALRO"}</p>
            {f && (
              <Link href={f.href} className="t-label mt-1 inline-block underline underline-offset-4">
                View selected work
              </Link>
            )}
          </div>
          <div className="flex gap-3">
            <Round dir="left" tone="white" label="Previous" onClick={() => go(-1)} />
            <Round dir="right" tone="orange" label="Next" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </div>
  );
}
