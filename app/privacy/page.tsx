import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Chip, Num } from "@/components/ui-legacy";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this website collects, why, where it goes, and how to ask us to see, correct or delete it.",
};

const Email = () => (
  <a href={`mailto:${site.email}`} className="text-fg underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent">
    {site.email}
  </a>
);

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <p>
        This website is operated by [legal entity name], [registered address] (“ALRO”, “we”). For anything privacy-related, write to <Email />.
      </p>
    ),
  },
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>When you use the contact form, we receive only what you choose to give us:</p>
        <ul>
          <li>your name and work email address;</li>
          <li>your company or website, if you add it;</li>
          <li>
            the kind of project, your description of it, and any optional details you include, such as audience, launch window, tools in use, data
            sensitivity, deployment needs or a budget range.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and cookies",
    body: (
      <>
        <p>
          We use [Vercel Web Analytics] to count page views and a few anonymous events, such as a contact form being sent. It uses no cookies, doesn’t
          identify you, and doesn’t follow you across other websites. Your form answers are never sent to it.
        </p>
        <p>This site stores nothing in your browser. The analytics above, if enabled, is the only measurement that applies to your visit.</p>
        <p className="placeholder">[Confirm the hosting provider and any server logs it keeps.]</p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use it",
    body: (
      <p>
        Only to reply to your enquiry and, if we go on to work together, to discuss and prepare a proposal. We don’t sell your information, and we
        don’t add you to a mailing list.
      </p>
    ),
  },
  {
    id: "where",
    title: "Where it goes and how long we keep it",
    body: (
      <p>
        Form submissions reach our inbox through [service provider]. We keep enquiries for [period]. If we begin working together, we keep them for
        as long as that work and any legal obligations require.
      </p>
    ),
  },
  {
    id: "choices",
    title: "Your choices",
    body: (
      <p>
        You can ask to see, correct or delete the information we hold about you at any time. Just write to <Email />.
      </p>
    ),
  },
];

const prose =
  "flex flex-col gap-4 text-[1rem] leading-relaxed text-fg-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-accent [&_li]:before:content-[''] [&_.placeholder]:rounded-[14px] [&_.placeholder]:border [&_.placeholder]:border-dashed [&_.placeholder]:border-line-2 [&_.placeholder]:px-4 [&_.placeholder]:py-3 [&_.placeholder]:text-[0.92rem] [&_.placeholder]:text-fg-3";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 fade-b" aria-hidden="true">
          <Image src="/img/blinds.jpg" alt="" fill preload sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 to-bg/20" />
        </div>
        <div className="wrap relative flex flex-col items-start gap-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <span data-reveal>
            <Chip>Privacy</Chip>
          </span>
          <h1 className="display max-w-[14ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Privacy, in plain language.
          </h1>
          <p className="lead max-w-[52ch]" data-reveal style={{ ["--i" as string]: 2 }}>
            What this website collects, why we use it, where it goes, and how to ask us to change or delete it.
          </p>
          <span className="tag neutral" data-reveal style={{ ["--i" as string]: 3 }}>
            Last updated: [date]
          </span>
        </div>
      </section>

      <section className="wrap pb-[var(--section)]">
        <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-14 lg:grid-cols-[260px_minmax(0,720px)]">
          <nav aria-label="On this page" className="hidden md:sticky md:top-28 md:block md:self-start">
            <p className="eyebrow mb-4">On this page</p>
            <ol className="flex flex-col gap-2.5 border-l border-line pl-4">
              {sections.map((s, k) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-[0.92rem] text-fg-2 transition-colors hover:text-fg">
                    <span className="tabular-nums text-fg-3">{String(k + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 flex-col gap-4">
            {sections.map((s, k) => (
              <article
                key={s.id}
                id={s.id}
                className="card scroll-mt-24 flex flex-col gap-5 rounded-[24px] p-6 md:p-8"
                data-reveal
                style={{ ["--i" as string]: Math.min(k, 2) }}
              >
                <div className="flex items-center gap-4">
                  <Num n={k + 1} className={k === 0 ? "!border-accent !text-accent" : ""} />
                  <h2 className="h4 text-[1.35rem]">{s.title}</h2>
                </div>
                <div className={prose}>{s.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
