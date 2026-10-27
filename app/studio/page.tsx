import type { Metadata } from "next";
import Image from "next/image";
import { ProcessCarousel } from "@/components/process-carousel";
import { Block, ContactSection, PageHero } from "@/components/sections";
import { AboutRow, CommitmentMasonry, FadeQuote, FounderCard, NoItem, Principles, stagger } from "@/components/studio-bits";
import { Button, CheckItem, Chip, SectionHead } from "@/components/ui-legacy";
import { founderNote, founders } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "ALRO is a small, founder-led studio for bespoke websites and practical AI systems. Meet the founders, how we work, and what you can hold us to.",
};

const principles = [
  { title: "Designed for the context", body: "We start from the business and its audience. Never from a template." },
  { title: "Craft without excess", body: "Every visual and every interaction has to earn its place." },
  { title: "Technology with intent", body: "AI where it solves a real problem, not where it’s fashionable." },
  { title: "Built to be understood", body: "Maintainable code, documented decisions, and a clean handover." },
];

const commitments = [
  { title: "A written proposal first", body: "Scope, deliverables, timeline and price, on paper. Nothing starts until you’ve agreed to it." },
  { title: "You own the work", body: "Design files, source code and documentation are handed to you at the end of the project." },
  { title: "Direct access", body: "You work with the founders from the first call to handover. No account manager in between." },
  { title: "Honest advice", body: "If AI isn’t the right tool, or we aren’t the right studio, we’ll tell you." },
];

const fit = [
  "Founders and small teams who care how their business presents itself.",
  "Businesses with one specific, repetitive workflow worth doing better.",
  "People who want to work directly with whoever is doing the work.",
];

const notFit = [
  "A templated site that has to launch this week.",
  "“AI everything”, without a defined problem to solve.",
  "Procurement that requires an established vendor with a large team.",
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        chip="The studio"
        title="Small by design. Thoughtful by default."
        lead="Two founders, two complementary strengths: digital craft and intelligent systems. You work with us directly, and we stay close to the work."
        image="/img/studio-desk.jpg"
        position="center 40%"
        actions={
          <>
            <Button href="/contact" arrow>
              Start a conversation
            </Button>
            <Button href="#founders" variant="ghost">
              Meet the founders
            </Button>
          </>
        }
      />

      {/* ───── Founders ───── */}
      <Block id="founders">
        <SectionHead
          chip="The founders"
          title="The people you meet are the people doing the work."
          aside={<p className="body max-w-[34ch]">No account managers and no hand-offs. You talk to the founders, and the founders do the work.</p>}
        />
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {founders.map((f, k) => (
            <FounderCard key={f.name} founder={f} index={k} />
          ))}
        </div>
      </Block>

      {/* ───── Founders' note ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 fade-y" aria-hidden="true">
          <Image src="/img/amber-curves.jpg" alt="" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
        </div>
        <div className="wrap section relative">
          <div className="mb-10" data-reveal>
            <Chip>A note from the founders</Chip>
          </div>
          <FadeQuote
            cite={
              <>
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                {founders.map((f) => f.name).join(" & ")}
              </>
            }
          >
            {founderNote}
          </FadeQuote>
        </div>
      </section>

      {/* ───── Shared philosophy ───── */}
      <Block id="philosophy">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end" data-reveal>
          <div className="flex flex-col items-start gap-5">
            <Chip>Point of view</Chip>
            <h2 className="h2 max-w-[17ch]">
              A business should work as thoughtfully <span className="text-fg/40">as it presents itself.</span>
            </h2>
          </div>
          <p className="body max-w-[44ch] md:justify-self-end md:text-right">
            Your website shapes the first impression. Your internal systems shape everything behind it. We work on both, so the business feels as considered
            on the inside as it looks from the outside.
          </p>
        </div>

        <div className="hairline mt-14 md:mt-20" />

        <div className="mt-14 md:mt-20">
          <AboutRow
            circleImage="/img/candle-desk.jpg"
            capsuleImage="/img/woman-laptop.jpg"
            statImage="/img/lamp-corner.jpg"
            capsule="Sites that carry a business’s character. Systems that give its people back time for the work that matters."
            stat="2"
            statLabel="Practices, one method"
            href="/work"
            hrefLabel="See selected work"
          />
        </div>

        <div className="mt-16 md:mt-24">
          <Principles items={principles} />
        </div>
      </Block>

      {/* ───── Process ───── */}
      <ProcessCarousel image="/img/reading.jpg" />

      {/* ───── Commitments ───── */}
      <Block id="commitments">
        <SectionHead
          chip="Commitments"
          title="What you can hold us to."
          center
          lead="Four promises that apply to every project, whichever practice it sits in."
        />
        <div className="mt-14 md:mt-16">
          <CommitmentMasonry items={commitments} />
        </div>
      </Block>

      {/* ───── Fit ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 fade-y" aria-hidden="true">
          <Image src="/img/blinds.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-bg/40" />
        </div>
        <div className="wrap section relative">
          <SectionHead
            chip="Fit"
            title="Better to know now than three weeks in."
            aside={<p className="body max-w-[34ch]">We’d rather be clear about fit than win the wrong project.</p>}
          />
          <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
            <article className="card-hot flex flex-col gap-7 rounded-[26px] p-7 md:p-10" data-reveal style={stagger(0)}>
              <span className="tag w-fit">A good fit</span>
              <h3 className="h3">You’ll probably enjoy working with us if you are…</h3>
              <div className="hairline" />
              <ul className="flex flex-col gap-4">
                {fit.map((t) => (
                  <CheckItem key={t} tone="hot">
                    {t}
                  </CheckItem>
                ))}
              </ul>
            </article>
            <article className="glass-dark flex flex-col gap-7 rounded-[26px] p-7 md:p-10" data-reveal style={stagger(1)}>
              <span className="tag neutral w-fit">Probably not the right studio</span>
              <h3 className="h3 text-fg/85">We’re likely the wrong choice for…</h3>
              <div className="hairline" />
              <ul className="flex flex-col gap-4">
                {notFit.map((t) => (
                  <NoItem key={t}>{t}</NoItem>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
