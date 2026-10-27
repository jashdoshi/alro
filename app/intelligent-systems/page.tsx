import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import { ContactSection, PageHero, TrackCard, WorkCard } from "@/components/sections";
import { SystemsDiagram } from "@/components/systems-diagram";
import { TryIt } from "@/components/try-it";
import { Button, Chip, Num, Photo, SectionHead } from "@/components/ui-legacy";
import { faqGeneral } from "@/lib/content";
import { getWork } from "@/lib/work";

export const metadata: Metadata = {
  title: "Intelligent Systems",
  description:
    "Practical AI and automation: we connect your tools, information and workflows, starting with one workflow we can design, test and support.",
};

const offers = [
  {
    title: "Custom AI workflows",
    body: "One defined process, improved from trigger to outcome: mapped, integrated, tested for exceptions, monitored and documented.",
  },
  {
    title: "Tool integrations",
    body: "The tools you already use, connected, so information moves between them without being retyped.",
  },
  {
    title: "Internal tools & reporting",
    body: "Small, focused tools that make information easier to see and act on.",
  },
];

const principles = [
  "One defined workflow first, not a company-wide transformation.",
  "Approved sources only, and the same rules about who can see what.",
  "Consequential actions wait for a person to approve them.",
  "Validated against criteria agreed before the build begins.",
  "If AI isn’t the right tool for the problem, we’ll say so.",
];

const guarantee = faqGeneral[0];

export default function IntelligentSystemsPage() {
  const related = ["company-knowledge-assistant", "founder-two-portfolio"].map((s) => getWork(s)).filter((w) => w !== undefined);

  return (
    <>
      <PageHero
        chip="AI & Automation"
        title="Intelligent Systems"
        lead="We connect your tools, information and workflows, so repetitive work shrinks and the knowledge that matters is easy to find."
        image="/img/light-lines.jpg"
        actions={
          <>
            <Button href="#contact" arrow>
              Start a conversation
            </Button>
            <Button href="/company-intelligence" variant="ghost">
              See the flagship system
            </Button>
          </>
        }
      />

      {/* ── What we build ── */}
      <section className="section">
        <div className="wrap flex flex-col gap-14 md:gap-20">
          <SectionHead
            chip="What we build"
            title="Specific workflows. Bounded systems you can trust."
            aside={
              <p className="max-w-[40ch] text-fg-2">
                We don’t sell an autonomous company or a flawless “AI brain”. We build specific systems we can design, test and support, starting with one workflow.
              </p>
            }
          />

          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            {/* Flagship */}
            <Link
              href="/company-intelligence"
              className="group card-hot relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] md:min-h-[600px]"
              data-reveal
            >
              <Photo src="/img/ember-flow.jpg" className="!absolute inset-0 opacity-60" sizes="(min-width: 1024px) 55vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/30 to-bg" />
              <div className="relative flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="tag">Flagship · working prototype</span>
                  <span className="btn btn-ghost btn-icon !h-11 !w-11 transition-colors group-hover:!border-accent group-hover:!bg-accent">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* mini UI */}
                <div className="flex flex-1 items-center justify-center py-8">
                  <div className="glass w-full max-w-[380px] rounded-[20px] p-4 [--blur:16px]">
                    <div className="flex gap-1.5">
                      {["Ask", "Alert", "Brief", "Act"].map((t, k) => (
                        <span key={t} className={k === 0 ? "rounded-full bg-accent px-3 py-1 text-[0.72rem] text-white" : "rounded-full bg-white/8 px-3 py-1 text-[0.72rem] text-fg-2"}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 rounded-[14px] bg-black/45 p-3.5">
                      <p className="flex items-center gap-1.5 text-[0.68rem] text-fg-3">
                        <Sparkle className="h-2.5 w-2.5 text-accent" />
                        Answer, with sources
                      </p>
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        <span className="h-2 w-[92%] rounded-full bg-white/50" />
                        <span className="h-2 w-[78%] rounded-full bg-white/35" />
                        <span className="h-2 w-[55%] rounded-full bg-white/20" />
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[0.62rem] text-[#ffd5c2]">source 1</span>
                        <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[0.62rem] text-[#ffd5c2]">source 2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="h3">Company Intelligence</h3>
                  <p className="body max-w-[52ch]">
                    Approved company information, connected: find answers, surface what needs attention, and move work forward once a person approves.
                  </p>
                  <span className="mt-1 inline-flex items-center gap-2 text-[0.95rem] text-accent-2">
                    See it, and the walkthrough
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Other offers */}
            <div className="grid gap-4">
              {offers.map((o, k) => (
                <article key={o.title} className="card flex flex-col gap-4 rounded-[24px] p-6 md:p-7" data-reveal style={{ ["--i" as string]: k + 1 }}>
                  <div className="flex items-center justify-between">
                    <Num n={k + 2} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  </div>
                  <h3 className="h4 !text-[1.35rem]">{o.title}</h3>
                  <p className="body">{o.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 fade-y">
          <Photo src="/img/amber-curves.jpg" className="h-full w-full opacity-55" />
          <div className="absolute inset-0 bg-bg/45" />
        </div>
        <div className="wrap section relative flex flex-col gap-12 md:gap-16">
          <SectionHead
            center
            chip="How it works"
            title="Your company’s knowledge, connected."
            lead="Decisions, conversations, documents and tasks live in separate tools. We bring the approved ones into a single searchable layer that answers questions and flags what needs attention."
          />
          <SystemsDiagram />

          <div className="mt-6 flex flex-col gap-8 md:mt-12">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
              <div className="flex flex-col gap-3">
                <span className="tag w-fit">Try it</span>
                <h3 className="h3 max-w-[22ch]">Four things a knowledge system should do well.</h3>
              </div>
            </div>
            <div data-reveal>
              <TryIt />
            </div>
          </div>
        </div>
      </section>

      {/* ── Engagement ── */}
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="flex flex-col items-start gap-5" data-reveal>
            <Chip>How an engagement works</Chip>
            <h2 className="h2 max-w-[12ch]">Start small, prove it, then build.</h2>
            <p className="lead max-w-[38ch]">Each stage is scoped and priced on its own. You can stop after any of them.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["One workflow first", "Written success criteria", "Human approval built in"].map((t) => (
                <li key={t} className="tag neutral">
                  {t}
                </li>
              ))}
            </ul>
            <Photo src="/img/keyboard.jpg" className="mt-6 hidden aspect-[16/10] w-full rounded-[24px] opacity-85 md:block" sizes="40vw" />
          </div>
          <TrackCard which="systems" />
        </div>
      </section>

      {/* ── Technology with intent ── */}
      <section className="section !pt-0">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-[32px] border border-line">
            <Photo src="/img/studio-desk.jpg" position="50% 45%" className="!absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/75 to-bg/30" />
            <div className="relative grid gap-10 p-6 py-10 sm:p-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:p-14">
              <div className="flex flex-col gap-8" data-reveal>
                <div className="flex flex-col items-start gap-5">
                  <Chip>How we keep it practical</Chip>
                  <h2 className="h2">Technology with intent.</h2>
                </div>
                <ol className="flex flex-col">
                  {principles.map((p, k) => (
                    <li key={p} className="flex items-start gap-4 border-t border-line py-4 last:border-b">
                      <span className="pt-0.5 text-[0.8rem] tabular-nums text-accent">{String(k + 1).padStart(2, "0")}</span>
                      <span className="text-[1.02rem] leading-snug tracking-[-0.02em]">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex md:items-end" data-reveal style={{ ["--i" as string]: 1 }}>
                <div className="glass flex flex-col gap-4 rounded-[24px] p-6 md:p-7">
                  <span className="tag w-fit">Asked often</span>
                  <p className="text-[1.2rem] font-medium leading-snug tracking-[-0.03em]">{guarantee.q}</p>
                  <p className="body">{guarantee.a}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related work ── */}
      <section className="section !pt-0">
        <div className="wrap flex flex-col gap-12 md:gap-16">
          <SectionHead
            chip="Related work"
            title="Demonstrations, clearly labelled."
            aside={
              <Button href="/work" variant="ghost" arrow>
                All work
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((w, k) => (
              <WorkCard key={w.slug} item={w} index={k} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection initialRoute="systems" image="/img/lamp-corner.jpg" />
    </>
  );
}
