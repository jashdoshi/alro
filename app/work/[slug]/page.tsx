import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkle } from "@/components/icons";
import { PageHero } from "@/components/sections";
import { Button } from "@/components/ui-legacy";
import { DetailSection, MetaCell, NextProject } from "@/components/work-bits";
import { getWork, nextWork, work } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

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
    openGraph: { title: item.title, description: item.summary, images: [item.image] },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  const next = nextWork(item.slug);

  return (
    <>
      <PageHero chip={item.practice} title={item.title} lead={item.summary} image={item.image}>
        <aside
          className="glass mt-6 flex w-full max-w-[640px] flex-col items-start gap-3 rounded-[22px] p-5 text-left md:flex-row md:gap-5 md:p-6"
          data-reveal
          style={{ ["--i" as string]: 3 }}
          aria-label="How to read this"
        >
          <span className="eyebrow flex-none pt-1">How to read this</span>
          <div className="flex flex-col gap-2">
            <span className="tag w-fit max-w-full">
              <Sparkle className="h-2.5 w-2.5 flex-none" />
              <span className="min-w-0 truncate">{item.label}</span>
            </span>
            <p className="text-[0.95rem] leading-relaxed text-fg-2">{item.readingNote}</p>
          </div>
        </aside>
      </PageHero>

      {/* ───── Meta ───── */}
      <div className="wrap relative -mt-10 md:-mt-14">
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_0.7fr]">
          <MetaCell label="Type" value={item.label} i={0} />
          <MetaCell label="Practice" value={item.practice} i={1} />
          <MetaCell label="Year" value={item.year} i={2} />
        </div>
      </div>

      {/* ───── Sections 01–07 ───── */}
      <div className="wrap section-tight">
        {item.sections.map((s, k) => (
          <DetailSection key={s.title} n={k + 1} section={s} />
        ))}

        {item.externalLink && (
          <div className="flex flex-col items-start gap-4 border-t border-line pt-10 md:flex-row md:items-center md:justify-between" data-reveal>
            <p className="eyebrow">Continue elsewhere</p>
            <Button href={item.externalLink.href} variant="ghost" arrow target="_blank" rel="noopener noreferrer">
              {item.externalLink.label}
            </Button>
          </div>
        )}
      </div>

      {/* ───── Next ───── */}
      <section className="wrap pb-[var(--section)]">
        <NextProject item={next} />
        <div className="mt-6 flex flex-wrap gap-3" data-reveal>
          <Button href="/contact" arrow>
            Start a conversation
          </Button>
          <Button href="/work" variant="ghost">
            All work
          </Button>
        </div>
      </section>
    </>
  );
}
