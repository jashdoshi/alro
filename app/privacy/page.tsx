import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/flow/page-hero";
import { email } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this website collects, why, where it goes, and how to ask us to see, correct or delete it.",
};

const Email = () => (
  <a href={`mailto:${email}`} className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink">
    {email}
  </a>
);

const Placeholder = ({ children }: { children: ReactNode }) => (
  <p className="rounded-2xl border border-dashed border-ink/25 px-5 py-4 text-[15px] text-ink/55">{children}</p>
);

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <p>
        This website is operated by [legal entity name], [registered address] (“alro.”, “we”). For anything privacy-related, write to <Email />.
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
          <li>your current website, if you add it;</li>
          <li>
            what your enquiry is about, your description of it, and any optional details you include, such as a launch window, tools in use, data
            sensitivity or deployment needs.
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
        <p>
          This site sets no cookies of its own. It keeps two small preferences in your browser: a flag in session storage so the opening animation
          plays only once per visit (cleared when you close the tab), and your light or dark theme choice in local storage, if you change it. Neither
          holds personal information or is ever sent to us. The analytics above, if enabled, is the only measurement that applies to your visit.
        </p>
        <Placeholder>[Confirm the hosting provider and any server logs it keeps.]</Placeholder>
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
        Form submissions reach our inbox through [service provider]. We keep enquiries for [period]. If we begin working together, we keep them for as
        long as that work and any legal obligations require.
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
  "grid gap-5 text-[1.0625rem] leading-[1.75] text-ink/75 [&_ul]:m-0 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-3 [&_ul]:p-0 [&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:h-px [&_li]:before:w-4 [&_li]:before:bg-ink/40 [&_li]:before:content-['']";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        size="md"
        eyebrow="Privacy"
        top="Privacy, in"
        bottom={<em>plain language.</em>}
        lead="What this website collects, why we use it, where it goes, and how to ask us to change or delete it."
        actions={<span className="tiny">Last updated: [date]</span>}
      />

      <section className="section !pt-[clamp(1rem,3vw,2rem)]">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,46rem)] lg:justify-between lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <p className="eyebrow mb-5">On this page</p>
            <ol className="m-0 grid list-none gap-3 border-l border-ink/12 p-0 pl-5">
              {sections.map((s, k) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-[14px] text-ink/65 no-underline transition-colors hover:text-ink">
                    <span className="tabular-nums text-ink/35">{String(k + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid min-w-0">
            {sections.map((s, k) => (
              <article key={s.id} id={s.id} className="grid scroll-mt-28 gap-5 border-t border-ink/12 py-10 first:border-t-0 first:pt-0 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-6" data-reveal="fade">
                <span className="font-serif text-[2rem] italic leading-none text-ink/25" aria-hidden="true">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <div className="grid gap-5">
                  <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">{s.title}</h2>
                  <div className={prose}>{s.body}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
