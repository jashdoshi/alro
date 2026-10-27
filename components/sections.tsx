import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ciStatus, deployment, tracks } from "@/lib/content";
import type { WorkItem } from "@/lib/work";
import { ContactForm } from "./contact-form";
import { ArrowUpRight, Sparkle } from "./icons";
import { Button, CheckItem, Chip, Num, SectionHead, cx } from "./ui-legacy";

/* ───────────── Page hero (inner pages) ───────────── */
export function PageHero({
  chip,
  title,
  lead,
  image,
  actions,
  children,
  position = "center",
}: {
  chip: string;
  title: ReactNode;
  lead?: ReactNode;
  image: string;
  actions?: ReactNode;
  children?: ReactNode;
  position?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill preload sizes="100vw" className="object-cover opacity-75" style={{ objectPosition: position }} />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/30 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,transparent,rgb(11_10_9/0.6))]" />
      </div>
      <div className="wrap relative flex min-h-[min(820px,92svh)] flex-col items-center justify-center gap-6 pb-24 pt-36 text-center md:pt-44">
        <span data-reveal>
          <Chip>{chip}</Chip>
        </span>
        <h1 className="display max-w-[16ch]" data-reveal style={{ ["--i" as string]: 1 }}>
          {title}
        </h1>
        {lead && (
          <p className="lead max-w-[54ch] text-fg/80" data-reveal style={{ ["--i" as string]: 2 }}>
            {lead}
          </p>
        )}
        {actions && (
          <div className="mt-2 flex flex-wrap justify-center gap-3" data-reveal style={{ ["--i" as string]: 3 }}>
            {actions}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ───────────── Glass feature card (numbered) ───────────── */
export function FeatureCard({ n, title, body, children, className }: { n?: number; title: string; body?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <article className={cx("card flex flex-col gap-4 rounded-[24px] p-6 md:p-8", className)} data-reveal>
      {n !== undefined && <Num n={n} />}
      <h3 className="h4 text-[1.35rem]">{title}</h3>
      {body && <p className="body">{body}</p>}
      {children}
    </article>
  );
}

/* ───────────── Work card ───────────── */
export function WorkCard({ item, index, tall }: { item: WorkItem; index?: number; tall?: boolean }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group card flex flex-col overflow-hidden rounded-[24px] transition-colors hover:border-line-2"
      data-reveal
      style={{ ["--i" as string]: index ?? 0 }}
    >
      <div className={cx("relative overflow-hidden", tall ? "aspect-[4/5]" : "aspect-[16/11]")}>
        <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.75rem]">{item.practice}</span>
        <span className="btn btn-ghost btn-icon absolute right-4 top-4 !h-11 !w-11 transition-colors group-hover:!bg-accent group-hover:!border-accent">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="h4 text-[1.3rem]">{item.title}</h3>
        <p className="body line-clamp-3">{item.summary}</p>
        <div className="mt-auto pt-3">
          <span className="tag">
            <Sparkle className="h-2.5 w-2.5" />
            {item.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ───────────── Status trio (reference pricing layout) ───────────── */
export function StatusTiers() {
  return (
    <div className="grid items-start gap-4 md:grid-cols-3 md:gap-4">
      {ciStatus.map((t, k) => (
        <article
          key={t.title}
          className={cx("flex flex-col gap-6 rounded-[26px] p-7 md:p-8", t.hot ? "card-hot md:-mt-5 md:pb-12" : "card", k === 1 && "cross")}
          data-reveal
          style={{ ["--i" as string]: k }}
        >
          <span
            className={cx(
              "grid h-14 w-14 place-items-center rounded-full",
              t.hot ? "bg-[radial-gradient(circle_at_30%_25%,#ff8a55,#c63d06_60%,#6e1f02)] shadow-[0_8px_24px_-6px_var(--accent-glow)]" : "border border-line-2 bg-white/5",
            )}
          >
            <Sparkle className={cx("h-5 w-5", t.hot ? "text-white" : k === 2 ? "text-fg-3" : "text-accent")} />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="h3">{t.title}</h3>
            <p className="body">{t.note}</p>
          </div>
          <div className="hairline" />
          <div className="flex flex-col gap-4">
            <p className="text-[0.86rem] text-fg-2">{k === 2 ? "Not yet built" : "What’s included"}</p>
            <ul className="flex flex-col gap-3.5">
              {t.items.map((it) => (
                <CheckItem key={it} tone={t.hot ? "hot" : k === 2 ? "dim" : "light"}>
                  <span className={k === 2 ? "text-fg-2" : ""}>{it}</span>
                </CheckItem>
              ))}
            </ul>
          </div>
          <Button href={t.href} variant={t.hot ? "primary" : "ghost"} className="btn-block mt-4">
            {t.cta}
          </Button>
        </article>
      ))}
    </div>
  );
}

/* ───────────── Engagement track ───────────── */
export function TrackCard({ which, className }: { which: keyof typeof tracks; className?: string }) {
  const t = tracks[which];
  return (
    <article className={cx("card flex flex-col gap-7 rounded-[26px] p-7 md:p-9", className)} data-reveal>
      <div className="flex flex-col gap-3">
        <span className="tag neutral w-fit">{t.label}</span>
        <h3 className="h3">{t.title}</h3>
      </div>
      <ol className="relative flex flex-col gap-6">
        <span className="absolute bottom-3 left-[17px] top-3 w-px bg-gradient-to-b from-accent via-line-2 to-transparent" aria-hidden="true" />
        {t.steps.map((s, k) => (
          <li key={s.title} className="relative flex gap-5">
            <span
              className={cx(
                "relative z-10 grid h-9 w-9 flex-none place-items-center rounded-full border text-[0.78rem] tabular-nums",
                k === 0 ? "border-accent bg-accent text-white" : "border-line-2 bg-bg-2 text-fg-2",
              )}
            >
              {String(k + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1 pt-1.5">
              <p className="font-medium tracking-[-0.02em]">{s.title}</p>
              <p className="body text-[0.92rem]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

/* ───────────── Security & deployment ───────────── */
export function Deployment({ full = true }: { full?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        {deployment.options.map((o, k) => (
          <article key={o.title} className="glass-dark flex flex-col gap-4 rounded-[24px] p-7" data-reveal style={{ ["--i" as string]: k }}>
            <div className="flex items-center justify-between">
              <Num n={k + 1} />
              <span className="tag">Validated during a pilot</span>
            </div>
            <h3 className="h4 mt-6 text-[1.4rem]">{o.title}</h3>
            <p className="body">{o.body}</p>
          </article>
        ))}
      </div>
      {full && (
        <div className="card grid gap-8 rounded-[24px] p-7 md:grid-cols-[0.8fr_1.2fr] md:p-10" data-reveal>
          <div className="flex flex-col gap-4">
            <h3 className="h3">Answered in writing, before anything is connected.</h3>
            <p className="body">{deployment.honesty}</p>
          </div>
          <ul className="grid gap-3.5 sm:grid-cols-2">
            {deployment.answered.map((a) => (
              <CheckItem key={a}>{a}</CheckItem>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ───────────── CTA band + contact ───────────── */
export function ContactSection({
  title = "Have something worth building?",
  lead = "Tell us which kind of conversation this is. We’ll only ask what makes the first call useful.",
  chip = "Start a conversation",
  initialRoute,
  image = "/img/desk-lamp.jpg",
}: {
  title?: string;
  lead?: string;
  chip?: string;
  initialRoute?: "digital" | "systems" | "unsure";
  image?: string;
}) {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 fade-y">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-bg/35" />
        </div>
        <div className="wrap relative flex flex-col items-center gap-5 pb-20 pt-[calc(var(--section)*1.1)] text-center md:pb-28">
          <span data-reveal>
            <Chip>{chip}</Chip>
          </span>
          <h2 className="h2 max-w-[14ch]" data-reveal>
            {title}
          </h2>
          <p className="max-w-[48ch] text-fg/80" data-reveal>
            {lead}
          </p>
        </div>
      </div>

      <div className="wrap relative grid gap-10 pb-[var(--section)] md:grid-cols-[0.75fr_1.25fr] md:gap-14">
        <div className="flex flex-col gap-6" data-reveal>
          <p className="eyebrow">What happens next</p>
          <ol className="flex flex-col gap-3">
            {[
              ["We read your note", "Every message is read by the founders, and we reply personally."],
              ["A short conversation", "We talk through the business, what you need, and whether we’re the right studio."],
              ["A written proposal", "Scope, deliverables, timeline and price. Nothing starts until you’ve agreed."],
            ].map(([t, b], k) => (
              <li key={t} className="card flex gap-4 rounded-[20px] p-5">
                <Num n={k + 1} className={k === 0 ? "!border-accent !text-accent" : ""} />
                <div>
                  <p className="font-medium tracking-[-0.02em]">{t}</p>
                  <p className="body text-[0.92rem]">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal>
          <ContactForm initialRoute={initialRoute} />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Section wrapper with standard header ───────────── */
export function Block({ id, children, className, tight }: { id?: string; children: ReactNode; className?: string; tight?: boolean }) {
  return (
    <section id={id} className={cx(tight ? "section-tight" : "section", "scroll-mt-20", className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export { SectionHead };
