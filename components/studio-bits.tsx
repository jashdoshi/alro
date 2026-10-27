import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { founders } from "@/lib/content";
import { ArrowRight, Close, Sparkle } from "./icons";
import { Num, RoundLink, cx } from "./ui-legacy";

/** Stagger index for [data-reveal] elements. */
export const stagger = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

type Founder = (typeof founders)[number];

/* ───────────── Founder card: portrait placeholder + bio ───────────── */
export function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  return (
    <article className="glass flex flex-col gap-7 rounded-[30px] p-3 pb-8 sm:p-4 sm:pb-9" data-reveal style={stagger(index)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/4]">
        <Image src={founder.image} alt="" fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-bg/40" />
        <span className="tag absolute left-4 top-4">{founder.role}</span>
        <span className="absolute right-5 top-5 text-[0.8rem] tabular-nums text-fg-2">{String(index + 1).padStart(2, "0")}</span>
        <div className="absolute inset-0 grid place-items-center">
          <span className="glass relative grid h-32 w-32 place-items-center rounded-full sm:h-40 sm:w-40">
            <span className="absolute inset-2 rounded-full border border-white/15" aria-hidden="true" />
            <span className="flex flex-col items-center gap-2 text-[0.8rem] text-fg-2">
              <Sparkle className="h-4 w-4 text-accent" />
              Portrait
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3 sm:px-5">
        <h3 className="h3">{founder.name}</h3>
        <p className="body max-w-[52ch]">{founder.bio}</p>
        <Link
          href={founder.href}
          className="group mt-auto inline-flex w-fit items-center gap-2 pt-4 font-medium tracking-[-0.02em] text-fg transition-colors hover:text-accent"
        >
          View selected work
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/* ───────────── Large quote that fades from bright to muted ───────────── */
export function FadeQuote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="flex flex-col items-start gap-8" data-reveal>
      <span aria-hidden="true" className="h-12 text-[6rem] font-medium leading-[0.9] text-accent">
        “
      </span>
      <blockquote className="statement max-w-[26ch] bg-gradient-to-b from-fg from-20% to-fg/30 bg-clip-text text-transparent">{children}</blockquote>
      {cite && <figcaption className="flex items-center gap-3 text-[0.92rem] text-fg-2">{cite}</figcaption>}
    </figure>
  );
}

/* ───────────── "About" row: circle · capsule · arrow · circle ───────────── */
function Ring() {
  return <span className="pointer-events-none absolute inset-[7%] rounded-full border border-white/20" aria-hidden="true" />;
}

export function AboutRow({
  circleImage,
  capsuleImage,
  statImage,
  capsule,
  stat,
  statLabel,
  href,
  hrefLabel,
}: {
  circleImage: string;
  capsuleImage: string;
  statImage: string;
  capsule: ReactNode;
  stat: string;
  statLabel: string;
  href: string;
  hrefLabel: string;
}) {
  const circle = "relative aspect-square w-full overflow-hidden rounded-full md:w-[clamp(150px,19vw,260px)] md:flex-none";
  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:gap-5" data-reveal>
      {/* capsule first on mobile, second on desktop */}
      <div className="relative col-span-2 overflow-hidden rounded-[40px] md:order-2 md:flex md:aspect-[2.3/1] md:flex-1 md:items-center md:justify-center md:rounded-full">
        <Image src={capsuleImage} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-bg/45" />
        <span className="pointer-events-none absolute inset-3 rounded-[30px] border border-white/15 md:rounded-full" aria-hidden="true" />
        <p className="relative mx-auto max-w-[34ch] px-8 py-14 text-center text-[1.05rem] leading-snug tracking-[-0.02em] text-fg md:py-0 md:text-[1.12rem]">
          {capsule}
        </p>
      </div>

      <div className={cx(circle, "md:order-1")}>
        <Image src={circleImage} alt="" fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-bg/25" />
        <Ring />
        <Sparkle className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 text-fg drop-shadow-[0_6px_20px_rgb(0_0_0/0.5)]" />
      </div>

      <RoundLink href={href} label={hrefLabel} className="hidden flex-none md:order-3 md:inline-flex" />

      <div className={cx(circle, "md:order-4")}>
        <Image src={statImage} alt="" fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-bg/45" />
        <Ring />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-[clamp(2.6rem,1.6rem+3vw,4.4rem)] font-medium leading-none tracking-[-0.06em]">{stat}</span>
          <span className="max-w-[12ch] text-[0.82rem] leading-tight text-fg/85 md:text-[0.9rem]">{statLabel}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Principles row (crosshair grid) ───────────── */
export function Principles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, k) => (
        <li key={p.title} className="flex flex-col gap-4 border-t border-line py-8" data-reveal style={stagger(k)}>
          <Num n={k + 1} className={k === 0 ? "!border-accent !text-accent" : ""} />
          <h3 className="h4 text-[1.35rem]">{p.title}</h3>
          <p className="body max-w-[34ch]">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ───────────── Masonry of commitments, faded at top and bottom (md+) ───────────── */
function PhotoTile({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cx("relative hidden overflow-hidden rounded-[24px] border border-line md:block", className)} aria-hidden="true">
      <Image src={src} alt="" fill sizes="33vw" className="object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 to-bg/70" />
    </div>
  );
}

function CommitmentCard({ n, title, body, hot, i }: { n: number; title: string; body: string; hot?: boolean; i: number }) {
  return (
    <article className={cx("flex flex-col gap-10 rounded-[24px] p-7 md:p-8", hot ? "card-hot" : "card")} data-reveal style={stagger(i)}>
      <p className="text-[1.3rem] leading-[1.25] tracking-[-0.035em] text-fg md:text-[1.45rem]">
        <span className="font-medium">{title}.</span> <span className="text-fg-2">{body}</span>
      </p>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <span
            className={cx(
              "grid h-11 w-11 place-items-center rounded-full",
              hot ? "bg-[radial-gradient(circle_at_30%_25%,#ff8a55,#c63d06_60%,#6e1f02)]" : "border border-line-2 bg-white/5",
            )}
          >
            <Sparkle className={cx("h-4 w-4", hot ? "text-white" : "text-accent")} />
          </span>
          <span className="text-[0.88rem] text-fg-2">Commitment</span>
        </span>
        <span className="tag neutral tabular-nums">{String(n).padStart(2, "0")}</span>
      </div>
    </article>
  );
}

export function CommitmentMasonry({ items }: { items: { title: string; body: string }[] }) {
  const [a, b, c, d] = items;
  const mask =
    "md:[mask-image:linear-gradient(180deg,transparent_0%,#000_16%,#000_84%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(180deg,transparent_0%,#000_16%,#000_84%,transparent_100%)]";
  return (
    <div className={cx("grid gap-4 md:grid-cols-3", mask)}>
      <div className="flex flex-col gap-4">
        <PhotoTile src="/img/keyboard.jpg" className="h-44" />
        <CommitmentCard n={1} {...a} i={0} />
        <PhotoTile src="/img/sketch.jpg" className="min-h-40 flex-1" />
      </div>
      <div className="flex flex-col gap-4 md:pt-28">
        <PhotoTile src="/img/candle-desk.jpg" className="h-40" />
        <CommitmentCard n={2} {...b} hot i={1} />
        <PhotoTile src="/img/laptop-night.jpg" className="min-h-40 flex-1" />
      </div>
      <div className="flex flex-col gap-4">
        <PhotoTile src="/img/woman-laptop.jpg" className="h-36" />
        <CommitmentCard n={3} {...c} i={2} />
        <CommitmentCard n={4} {...d} i={3} />
        <PhotoTile src="/img/desk-lamp.jpg" className="min-h-44 flex-1" />
      </div>
    </div>
  );
}

/* ───────────── Fit list item (no-fit variant uses a cross) ───────────── */
export function NoItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[0.97rem] leading-snug text-fg-2">
      <span className="mt-[2px] grid h-[18px] w-[18px] flex-none place-items-center rounded-full border border-line-2 text-fg-3">
        <Close className="h-2.5 w-2.5" />
      </span>
      <span>{children}</span>
    </li>
  );
}
