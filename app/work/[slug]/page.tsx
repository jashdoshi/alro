import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Arrow } from "@/components/flow/bits";
import { PageHero } from "@/components/flow/page-hero";
import { LabMedia } from "@/components/home/lab-media";
import { labKind } from "@/components/work/lab-kind";
import { routes } from "@/lib/routes";
import { getWork, nextWork, work, workKinds, type WorkItem } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };
type Section = WorkItem["sections"][number];

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: "Work not found" };
  return {
    title: item.title,
    description: `${item.summary} ${item.label}.`,
    openGraph: { title: item.title, description: item.summary },
  };
}

/* The skeleton's case-study shape: problem, approach, delivery, results. */
const shape: { label: string; heading: ReactNode; from: string[] }[] = [
  {
    label: "Problem",
    heading: (
      <>
        What needed <em>solving</em>
      </>
    ),
    from: ["Context", "The challenge"],
  },
  {
    label: "Approach",
    heading: (
      <>
        How we <em>went about it</em>
      </>
    ),
    from: ["Role", "The approach"],
  },
  {
    label: "Delivery",
    heading: (
      <>
        What was <em>made</em>
      </>
    ),
    from: ["The work"],
  },
  {
    label: "Results",
    heading: (
      <>
        What it <em>demonstrates</em>
      </>
    ),
    from: ["What it demonstrates"],
  },
];

function group(sections: Section[]) {
  const used = new Set<string>(["Limitations"]);
  const groups = shape
    .map((g) => {
      const list = g.from.map((t) => sections.find((s) => s.title === t)).filter((s): s is Section => !!s);
      list.forEach((s) => used.add(s.title));
      return { ...g, sections: list };
    })
    .filter((g) => g.sections.length > 0);
  const rest = sections.filter((s) => !used.has(s.title));
  if (rest.length) groups.push({ label: "Notes", heading: <>And <em>also</em></>, from: [], sections: rest });
  return { groups, limitations: sections.find((s) => s.title === "Limitations") };
}

/** Two balanced lines for the hero, with the closing phrase in italic. */
function splitTitle(title: string): [ReactNode, ReactNode] {
  const words = title.split(" ");
  if (words.length < 2) return [title, null];
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < diff) [best, diff] = [i, d];
  }
  const bottom = words.slice(best).join(" ");
  const bracket = bottom.match(/\[[^\]]+\]$/);
  const tail = bracket ? bracket[0] : words[words.length - 1];
  const head = bottom.slice(0, bottom.length - tail.length);
  return [
    words.slice(0, best).join(" "),
    <>
      {head}
      <em>{tail}</em>
    </>,
  ];
}

const isPlaceholder = (s?: string) => !!s && s.trim().startsWith("[");

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const next = nextWork(item.slug);
  const [top, bottom] = splitTitle(item.title);
  const { groups, limitations } = group(item.sections);
  const external = item.externalLink;

  return (
    <>
      <PageHero
        size="md"
        eyebrow={`Work · ${item.practice}`}
        top={top}
        bottom={bottom}
        lead={item.summary}
        actions={
          <Link href={routes.work} className="line-link">
            All work
            <Arrow />
          </Link>
        }
        aside={
          <aside className="glass grid gap-4 rounded-[1.5rem] p-6 md:p-8" aria-label="How to read this">
            <span className="eyebrow">How to read this</span>
            <span className="chip w-fit max-w-full truncate">{item.label}</span>
            <p className="font-serif text-[1.25rem] leading-snug">{item.readingNote}</p>
            <p className="tiny">{workKinds[item.kind].title}</p>
          </aside>
        }
      />

      {/* ═════════ large media ═════════ */}
      <section className="wrap">
        <div className="overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,var(--scene-a),var(--scene-b))]" data-clip>
          <div className="grid place-items-center p-[clamp(0.75rem,5vw,4.5rem)]" data-clip-img>
            <div className="window w-full max-w-[60rem]">
              <div className="window-bar">
                <i />
                <i />
                <i />
                <span className="tiny ml-3 min-w-0 truncate">{item.title}</span>
              </div>
              <div className="pcard">
                <div className="media !rounded-none">
                  <LabMedia kind={labKind(item)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="tiny mt-4">Interface illustration drawn for this page. Not a screenshot of a client deployment.</p>
      </section>

      {/* ═════════ meta ═════════ */}
      <section className="wrap mt-[clamp(3rem,6vw,5rem)]">
        <dl className="m-0 grid border-y border-ink/12 sm:grid-cols-[1.4fr_1fr_0.6fr]" data-reveal-group>
          {[
            ["Type", item.label],
            ["Practice", item.practice],
            ["Year", item.year],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-2 border-ink/12 py-6 max-sm:[&:not(:last-child)]:border-b sm:px-6 sm:first:pl-0 sm:[&:not(:last-child)]:border-r">
              <dt className="tiny">{k}</dt>
              <dd className="m-0 font-serif text-[1.35rem] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ═════════ case study ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(4rem,8vw,7rem)]">
          {groups.map((g, k) => (
            <article key={g.label} className="grid gap-8 border-t border-ink/12 pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
              <header className="grid content-start gap-4 lg:sticky lg:top-32 lg:self-start">
                <span className="font-serif text-[clamp(3rem,6vw,5rem)] italic leading-none text-copy/15" aria-hidden="true">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">{g.label}</span>
                <h2 className="h3" data-reveal="lines">
                  {g.heading}
                </h2>
              </header>
              <div className="grid content-start gap-10">
                {g.sections.map((s) => (
                  <div key={s.title} className="grid gap-4" data-reveal="fade">
                    <h3 className="tiny !text-copy/60">{s.title}</h3>
                    <SectionBody section={s} />
                  </div>
                ))}
                {g.label === "Results" && <p className="tiny">Capabilities shown, not outcomes measured. We don’t claim results we haven’t got.</p>}
              </div>
            </article>
          ))}

          {limitations && (
            <aside
              className="grid gap-6 rounded-[1.5rem] border border-dashed border-ink/30 bg-mist/50 p-[clamp(1.5rem,4vw,3.5rem)] md:grid-cols-[auto_minmax(0,1fr)] md:gap-10"
              aria-labelledby="limits"
              data-reveal="fade"
            >
              <span className="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5v5.5M12 16.5h.01" />
                </svg>
              </span>
              <div className="grid gap-4">
                <span className="eyebrow">Limitations</span>
                <h2 id="limits" className="h3">
                  What this <em>doesn’t</em> show
                </h2>
                <p className="lead max-w-[44rem]">{limitations.body}</p>
              </div>
            </aside>
          )}

          {external && (
            <div className="flex flex-col items-start gap-4 border-t border-ink/12 pt-10 md:flex-row md:items-center md:justify-between">
              <span className="eyebrow">Continue elsewhere</span>
              {external.href === "#" ? (
                <span className="tiny rounded-full border border-dashed border-ink/30 px-4 py-3">[Link to the full portfolio]</span>
              ) : (
                <a href={external.href} className="line-link" target="_blank" rel="noopener noreferrer">
                  {external.label}
                  <Arrow />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═════════ next ═════════ */}
      <section className="pb-[clamp(4.5rem,10vw,8rem)]">
        <div className="wrap">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <span className="eyebrow">Next piece</span>
            <Link href={routes.work} className="line-link">
              All work
              <Arrow />
            </Link>
          </div>
          <Link href={`/work/${next.slug}`} data-cursor-invert className="group relative block overflow-hidden border-y border-ink/12 text-copy no-underline">
            <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[600ms] ease-[var(--flow-ease)] group-hover:scale-y-100" />
            <span className="relative grid gap-6 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-6 md:py-14">
              <span className="grid min-w-0 gap-3 transition-transform duration-[600ms] ease-[var(--flow-ease)] group-hover:translate-x-[14px]">
                <span className="tiny transition-colors duration-500 group-hover:text-mist/70">{next.label}</span>
                <span className="font-serif text-[clamp(2rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] transition-colors duration-500 group-hover:text-paper">{next.title}</span>
              </span>
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:border-mist/30 group-hover:text-paper">
                <Arrow className="h-5 w-5" />
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionBody({ section }: { section: Section }) {
  if (section.list) {
    return (
      <ul className="m-0 grid list-none gap-3 p-0">
        {section.list.map((li) => (
          <li key={li} className="flex gap-4 border-b border-ink/10 pb-3 font-serif text-[clamp(1.15rem,2vw,1.4rem)] leading-snug">
            <span className="mt-[0.7em] h-px w-5 flex-none bg-ink/40" aria-hidden="true" />
            {li}
          </li>
        ))}
      </ul>
    );
  }
  if (isPlaceholder(section.body)) {
    return <p className="rounded-2xl border border-dashed border-ink/25 px-5 py-4 text-[15px] leading-relaxed text-copy/55">{section.body}</p>;
  }
  return <p className="lead">{section.body}</p>;
}
