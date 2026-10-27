import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { WorkItem, WorkKind } from "@/lib/work";
import { workKinds } from "@/lib/work";
import { ArrowRight, Play, Sparkle } from "./icons";
import { WorkCard } from "./sections";
import { stagger } from "./studio-bits";
import { CheckItem, Chip, Num, cx } from "./ui-legacy";

/** Which kind of proof each group of work counts as. */
export const evidenceOf: Record<WorkKind, "Craft evidence" | "Capability evidence"> = {
  portfolio: "Craft evidence",
  experiment: "Craft evidence",
  demonstration: "Capability evidence",
};

/* ───────────── Evidence explainer card ───────────── */
export function EvidenceCard({
  title,
  body,
  image,
  groups,
  hot,
  i,
}: {
  title: string;
  body: string;
  image: string;
  groups: { href: string; label: string }[];
  hot?: boolean;
  i: number;
}) {
  return (
    <article className={cx("flex flex-col overflow-hidden rounded-[28px] p-3", hot ? "card-hot" : "glass")} data-reveal style={stagger(i)}>
      <div className="relative h-44 overflow-hidden rounded-[22px] md:h-56">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
        <span className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8rem]">
          <Sparkle className="h-3 w-3 text-accent" />
          {title}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-7 md:p-6 md:pt-8">
        <p className="text-[1.25rem] leading-[1.3] tracking-[-0.03em] text-fg md:text-[1.4rem]">{body}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[0.82rem] text-fg-3">Where to find it:</span>
          {groups.map((g) => (
            <Link key={g.href} href={g.href} className="tag neutral transition-colors hover:border-white/30 hover:text-fg">
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ───────────── A group of work for one kind ───────────── */
export function WorkGroupHead({ kind, count, className }: { kind: WorkKind; count: number; className?: string }) {
  const k = workKinds[kind];
  return (
    <div className={cx("flex flex-col items-start gap-4", className)} data-reveal>
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">{evidenceOf[kind]}</span>
        <span className="tag neutral tabular-nums">
          {String(count).padStart(2, "0")} {count === 1 ? "piece" : "pieces"}
        </span>
      </div>
      <h2 className="h3 max-w-[20ch] text-[clamp(1.7rem,1.2rem+1.6vw,2.5rem)]">{k.title}</h2>
      <p className="body max-w-[44ch]">{k.body}</p>
    </div>
  );
}

export function WorkGroup({ kind, items, layout = "split" }: { kind: WorkKind; items: WorkItem[]; layout?: "split" | "stack" }) {
  if (layout === "stack") {
    return (
      <div id={kind} className="flex scroll-mt-24 flex-col gap-8">
        <WorkGroupHead kind={kind} count={items.length} />
        <div className="grid gap-4">
          {items.map((w, k) => (
            <WorkCard key={w.slug} item={w} index={k} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div id={kind} className="grid scroll-mt-24 gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-14">
      <WorkGroupHead kind={kind} count={items.length} className="md:sticky md:top-28 md:self-start" />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((w, k) => (
          <WorkCard key={w.slug} item={w} index={k} tall />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Case-study meta cell ───────────── */
export function MetaCell({ label, value, i }: { label: string; value: string; i: number }) {
  return (
    <div className="glass flex flex-col gap-2 rounded-[20px] px-5 py-4 md:px-6 md:py-5" data-reveal style={stagger(i)}>
      <span className="eyebrow">{label}</span>
      <span className="text-[1.02rem] font-medium leading-snug tracking-[-0.02em]">{value}</span>
    </div>
  );
}

/* ───────────── Case-study section (numbered, sticky title at md+) ───────────── */
export function DetailSection({ n, section }: { n: number; section: WorkItem["sections"][number] }) {
  const isLimit = section.title === "Limitations";
  const isMedia = section.title === "The work";
  const isDemo = section.title === "What it demonstrates";

  let content: ReactNode;
  if (isLimit) {
    content = (
      <div className="flex flex-col gap-4 rounded-[24px] border border-dashed border-line-2 bg-white/[0.015] p-6 md:p-8">
        <span className="tag neutral w-fit">What this doesn’t show</span>
        <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-fg-2">{section.body}</p>
      </div>
    );
  } else if (isMedia) {
    content = (
      <div className="card relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[24px] p-6 text-center sm:aspect-video md:p-10">
        <div className="absolute inset-3 rounded-[18px] border border-dashed border-line-2" aria-hidden="true" />
        <div className="relative flex max-w-[44ch] flex-col items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line-2 bg-white/5 text-fg-2">
            <Play className="h-5 w-5" />
          </span>
          {section.body && <p className="body">{section.body}</p>}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col gap-6">
        {section.body && <p className="max-w-[60ch] text-[1.08rem] leading-relaxed text-fg/85 md:text-[1.15rem]">{section.body}</p>}
        {section.list && (
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {section.list.map((li) => (
              <CheckItem key={li} tone={isDemo ? "hot" : "light"}>
                {li}
              </CheckItem>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <section className="grid gap-5 border-t border-line py-10 md:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] md:gap-12 md:py-16" data-reveal>
      <div className="flex items-center gap-4 md:sticky md:top-28 md:flex-col md:items-start md:self-start">
        <Num n={n} className={isLimit ? "" : "!border-accent/60 !text-accent"} />
        <h2 className={cx("h3", isLimit && "text-fg/75")}>{section.title}</h2>
      </div>
      <div className="min-w-0">{content}</div>
    </section>
  );
}

/* ───────────── Next-project band ───────────── */
export function NextProject({ item }: { item: WorkItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group glass relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[30px] md:min-h-[380px]"
      data-reveal
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60 transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/10" />
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between md:p-10">
        <div className="flex flex-col items-start gap-4">
          <Chip>Next project</Chip>
          <h2 className="h2 max-w-[16ch]">{item.title}</h2>
          <span className="tag">
            <Sparkle className="h-2.5 w-2.5" />
            {item.label}
          </span>
        </div>
        <span className="btn btn-primary btn-icon lg flex-none self-end transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          <ArrowRight className="h-7 w-7" />
        </span>
      </div>
    </Link>
  );
}

/* ───────────── Photo-backed CTA band ───────────── */
export function CtaBand({
  chip,
  title,
  lead,
  image,
  actions,
}: {
  chip: string;
  title: ReactNode;
  lead?: ReactNode;
  image: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 fade-y" aria-hidden="true">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-bg/40" />
      </div>
      <div className="wrap section relative flex flex-col items-center gap-6 text-center">
        <span data-reveal>
          <Chip>{chip}</Chip>
        </span>
        <h2 className="h2 max-w-[16ch]" data-reveal style={stagger(1)}>
          {title}
        </h2>
        {lead && (
          <p className="max-w-[50ch] text-fg/80" data-reveal style={stagger(2)}>
            {lead}
          </p>
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-3" data-reveal style={stagger(3)}>
          {actions}
        </div>
      </div>
    </section>
  );
}
