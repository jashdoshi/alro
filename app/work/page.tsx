import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SectionHead } from "@/components/flow/bits";
import { PageHero } from "@/components/flow/page-hero";
import { labKind } from "@/components/work/lab-kind";
import { WorkIndex } from "@/components/work/work-index";
import { routes } from "@/lib/routes";
import { work, workKinds, type WorkKind } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "From the lab: the founders’ earlier work, independent experiments and working AI prototypes, each labelled with what it is and what it does and doesn’t show.",
};

/* Two kinds of proof, never mixed up. Kinds and their labels come from lib/work. */
const evidence: { n: string; title: string; body: string; kinds: WorkKind[] }[] = [
  {
    n: "01",
    title: "Craft evidence",
    body: "Websites, interfaces and technical projects, with each founder’s contribution and the reasoning behind it. Judge the thinking and the finish.",
    kinds: ["portfolio", "experiment"],
  },
  {
    n: "02",
    title: "Capability evidence",
    body: "Working demonstrations built with permitted sample data. They show what we can build, not results a client has achieved.",
    kinds: ["demonstration"],
  },
];

export default function WorkPage() {
  const items = work.map((w) => ({
    slug: w.slug,
    title: w.title,
    label: w.label,
    practice: w.practice,
    year: w.year,
    media: labKind(w),
    externalHref: w.externalLink?.href !== "#" ? w.externalLink?.href : undefined,
  }));

  return (
    <>
      <PageHero
        size="md"
        eyebrow="Work"
        top="Less talk."
        bottom={
          <>
            <em>More things</em> we’ve actually made.
          </>
        }
        lead="We’re a new studio, so we won’t borrow proof. Everything here carries a label saying what it is (a founder’s earlier work, an independent experiment or a working prototype) and what it does and doesn’t show."
        actions={
          <Link href="#labels" className="line-link">
            How we label things
            <Arrow />
          </Link>
        }
      />

      {/* ═════════ index ═════════ */}
      <section className="section !pt-[clamp(1rem,3vw,2rem)]">
        <div className="wrap">
          <WorkIndex items={items} />
        </div>
      </section>

      {/* ═════════ how we label things ═════════ */}
      <section id="labels" className="section scroll-mt-24 bg-mist/55">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="How we label things"
            title={
              <>
                Two kinds of proof. <em>Never</em> mixed up.
              </>
            }
            lead="No logo wall and no borrowed results. Every piece says who made it, in what context, and which kind of evidence it is."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {evidence.map((e) => (
              <article key={e.n} className="panel glass flex flex-col gap-8" data-reveal="fade">
                <span className="ghost-num" data-drift aria-hidden="true">
                  {e.n}
                </span>
                <div className="relative grid gap-4">
                  <span className="tiny">Evidence — {e.n}</span>
                  <h3 className="h3">{e.title}</h3>
                  <p className="body max-w-[32rem]">{e.body}</p>
                </div>
                <dl className="relative m-0 grid gap-6 border-t border-ink/12 pt-6">
                  {e.kinds.map((k) => (
                    <div key={k} className="grid gap-3">
                      <dt className="font-serif text-[1.35rem] leading-snug">{workKinds[k].title}</dt>
                      <dd className="m-0 grid gap-3">
                        <p className="body">{workKinds[k].body}</p>
                        <span className="sr-only">Labels in use:</span>
                        <div className="chips">
                          {[...new Set(work.filter((w) => w.kind === k).map((w) => w.label))].map((label) => (
                            <span key={label} className="chip max-w-full truncate">
                              {label}
                            </span>
                          ))}
                        </div>
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between" data-reveal="fade">
            <p className="tiny max-w-[36rem]">Every label appears in the index above and again at the top of each piece.</p>
            <Link href={routes.contact} className="line-link w-fit">
              Ask us about any piece
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
