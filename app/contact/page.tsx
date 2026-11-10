import type { Metadata } from "next";
import { ContactFormV3, type Topic } from "@/components/contact/contact-form-v3";
import { PageHero } from "@/components/flow/page-hero";
import { email } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you’re working on. Websites, Company Brain, or not sure yet: every message is read by the founders, and every reply is personal.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const topics: Topic[] = ["websites", "company-brain", "not-sure"];

const next = [
  { t: "We read your note.", c: "The founders read every message themselves. No sales team, no ticket number." },
  { t: "A short conversation.", c: "If it looks like a fit, we’ll suggest a call to understand what you’re trying to achieve, the tools you use and the constraints you’re working with." },
  { t: "A written proposal.", c: "What we’d build, why, what it costs and what success should look like, in writing." },
];

export default async function ContactPage({ searchParams }: Props) {
  const raw = (await searchParams).topic;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const topic = topics.find((t) => t === value);

  return (
    <>
      <PageHero
        eyebrow="Have something in mind?"
        top="Something you want"
        bottom={
          <>
            to make <em>better?</em>
          </>
        }
        lead="Tell us what you’re working on."
      />

      <section className="section !pt-[clamp(1rem,3vw,2rem)]">
        <div className="wrap grid gap-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)]">
          <div className="min-w-0" data-reveal="fade">
            {/* key: the footer's topic links can change ?topic= without leaving the page */}
            <ContactFormV3 key={topic ?? "none"} initialTopic={topic} />
          </div>

          <aside className="grid content-start gap-10 lg:sticky lg:top-32 lg:self-start" aria-labelledby="next-heading">
            <div className="grid gap-4">
              <span className="eyebrow">What happens next</span>
              <h2 id="next-heading" className="font-serif text-[clamp(1.75rem,3vw,2.4rem)] leading-tight">
                Simple, <em>on purpose.</em>
              </h2>
            </div>
            <ol className="m-0 grid list-none gap-0 border-t border-ink/12 p-0" data-reveal-group>
              {next.map((s, k) => (
                <li key={s.t} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-ink/12 py-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/18 text-[11px] font-bold tracking-[0.15em] text-copy/55">{String(k + 1).padStart(2, "0")}</span>
                  <div className="grid gap-1.5 pt-1.5">
                    <h3 className="text-[1.35rem] leading-snug">{s.t}</h3>
                    <p className="body">{s.c}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="font-serif text-[1.25rem] italic leading-snug">Nothing starts until you’ve agreed.</p>
            <div className="grid gap-3">
              <span className="tiny">Prefer email?</span>
              <a href={`mailto:${email}`} className="line-link w-fit !normal-case !tracking-normal text-[15px]">
                {email}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
