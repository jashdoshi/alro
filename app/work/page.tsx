import type { Metadata } from "next";
import Image from "next/image";
import { Block, PageHero } from "@/components/sections";
import { Button, SectionHead } from "@/components/ui-legacy";
import { CtaBand, EvidenceCard, WorkGroup } from "@/components/work-bits";
import { work, workKinds, type WorkKind } from "@/lib/work";
import { Sparkle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "The founders’ own work, independent experiments and working AI demonstrations — each labelled with what it is, who made it, and what it does and doesn’t prove.",
};

const of = (kind: WorkKind) => work.filter((w) => w.kind === kind);

export default function WorkPage() {
  return (
    <>
      <PageHero
        chip="Selected work"
        title="Proof, labelled for what it is."
        lead="ALRO is a new studio, and we won’t borrow proof. Every piece says what it is, who made it, and what it does — and doesn’t — demonstrate."
        image="/img/light-lines.jpg"
        actions={
          <>
            <Button href="#portfolio" arrow>
              Browse the work
            </Button>
            <Button href="#evidence" variant="ghost">
              How to read it
            </Button>
          </>
        }
      />

      {/* ───── Two kinds of proof ───── */}
      <section id="evidence" className="relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 fade-y" aria-hidden="true">
          <Image src="/img/amber-curves.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-bg/40" />
        </div>
        <div className="wrap section relative">
          <SectionHead
            chip="How to read this page"
            title="Two kinds of proof. Never mixed up."
            aside={<p className="body max-w-[36ch]">No logo wall. Just the founders’ own work and what we’re building now, each with an honest label.</p>}
          />
          <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
            <EvidenceCard
              i={0}
              title="Craft evidence"
              image="/img/sketch.jpg"
              body="Websites, interfaces and technical projects, with each founder’s contribution and the reasoning behind it."
              groups={[
                { href: "#portfolio", label: workKinds.portfolio.title },
                { href: "#experiment", label: workKinds.experiment.title },
              ]}
            />
            <EvidenceCard
              i={1}
              hot
              title="Capability evidence"
              image="/img/laptop-night.jpg"
              body="Working demonstrations and walkthroughs. They show what we can build, not results a client has achieved."
              groups={[{ href: "#demonstration", label: workKinds.demonstration.title }]}
            />
          </div>

          <div className="glass-dark mt-4 flex flex-col gap-4 rounded-[24px] p-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7" data-reveal>
            <p className="max-w-[38ch] text-[0.95rem] text-fg-2">Every piece carries its label on the card and at the top of its page. These are the ones in use today:</p>
            <ul className="flex flex-wrap gap-2 md:justify-end">
              {work.map((w) => (
                <li key={w.slug} className="tag max-w-full">
                  <Sparkle className="h-2.5 w-2.5 flex-none" />
                  <span className="min-w-0 truncate">{w.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── Groups ───── */}
      <Block>
        <WorkGroup kind="portfolio" items={of("portfolio")} />
        <div className="hairline my-16 md:my-24" />
        <div className="grid gap-16 md:grid-cols-2 md:gap-5">
          <WorkGroup kind="experiment" items={of("experiment")} layout="stack" />
          <WorkGroup kind="demonstration" items={of("demonstration")} layout="stack" />
        </div>
      </Block>

      <CtaBand
        chip="Ask about any piece"
        title="Judge the thinking, not the logo wall."
        lead="Ask us about anything here: what we did, what we’d change, and what it doesn’t prove. Then tell us what you’re trying to build."
        image="/img/candle-desk.jpg"
        actions={
          <>
            <Button href="/contact" arrow>
              Start a conversation
            </Button>
            <Button href="/studio" variant="ghost">
              Meet the founders
            </Button>
          </>
        }
      />
    </>
  );
}
