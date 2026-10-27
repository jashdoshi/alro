import type { Metadata } from "next";
import { JobCards, PilotStepper } from "@/components/ci-parts";
import { Faq } from "@/components/faq";
import { ContactSection, Deployment, PageHero, StatusTiers } from "@/components/sections";
import { Walkthrough } from "@/components/walkthrough";
import { Button, Chip, Photo, SectionHead } from "@/components/ui-legacy";
import { faqCI } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company Intelligence",
  description:
    "A working prototype, offered as a scoped pilot: connect approved company information to find answers, see what was decided, and catch what still needs doing.",
};

export default function CompanyIntelligencePage() {
  return (
    <>
      <PageHero
        chip="Intelligent Systems · Flagship"
        title="Company Intelligence"
        lead="Connect approved company information, so your team can find answers, see what was decided, and catch what still needs doing."
        image="/img/lamp-corner.jpg"
        position="50% 40%"
        actions={
          <>
            <Button href="#contact" arrow>
              Explore a pilot
            </Button>
            <Button href="#walkthrough" variant="ghost">
              Watch the walkthrough
            </Button>
          </>
        }
      >
        <span className="glass pill mt-6 !h-auto min-h-[42px] !whitespace-normal py-[5px] text-left [--blur:12px]" data-reveal style={{ ["--i" as string]: 4 }}>
          <span className="puck">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Working prototype · available as a scoped pilot
        </span>
      </PageHero>

      {/* ── Three jobs ── */}
      <section className="section">
        <div className="wrap flex flex-col gap-14 md:gap-20">
          <SectionHead
            chip="What it does"
            title="Three jobs, each with the evidence attached."
            aside={
              <p className="max-w-[38ch] text-fg-2">
                Decisions sit in meeting notes, context in chat, commitments in email. It brings the approved parts together, so nobody has to piece them back.
              </p>
            }
          />
          <JobCards />
        </div>
      </section>

      {/* ── Walkthrough ── */}
      <section id="walkthrough" className="relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 fade-y">
          <Photo src="/img/amber-curves.jpg" className="h-full w-full opacity-45" />
          <div className="absolute inset-0 bg-bg/40" />
        </div>
        <div className="wrap section relative flex flex-col gap-12 md:gap-16">
          <SectionHead
            chip="Walkthrough"
            title="From a document to an approved action."
            aside={
              <p className="max-w-[38ch] text-fg-2">
                Upload a meeting note, see what it finds, ask it a question, then review the follow-up it drafts. Fictional data, about forty seconds.
              </p>
            }
          />
          <div data-reveal>
            <Walkthrough />
          </div>
        </div>
      </section>

      {/* ── Status ── */}
      <section className="section">
        <div className="wrap flex flex-col gap-16 md:gap-24">
          <SectionHead
            center
            chip="What exists today"
            title="What exists today — and what doesn’t yet."
            lead="Finding, extracting and acting are different capabilities. We keep them apart, and say which is which."
          />
          <StatusTiers />
        </div>
      </section>

      {/* ── How a pilot works ── */}
      <section id="pilot" className="relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Photo src="/img/dunes-wide.jpg" position="50% 60%" className="h-full w-full opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/55 to-bg" />
        </div>
        <div className="wrap section relative flex flex-col gap-12 md:gap-16">
          <SectionHead
            chip="How a pilot works"
            title="Start small. Prove it. Then build."
            aside={
              <p className="max-w-[38ch] text-fg/80">
                One workflow, not a company-wide transformation. Each stage is scoped and priced on its own, and you can stop after any of them.
              </p>
            }
          />
          <PilotStepper />
          <div className="glass grid gap-6 rounded-[26px] p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10" data-reveal>
            <div className="flex flex-col gap-3">
              <span className="tag w-fit">A first pilot includes</span>
              <p className="text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.035em]">
                [One workflow, up to [n] connected sources, [n] weeks, a fixed price, and the criteria it will be judged against.]
              </p>
            </div>
            <Button href="#contact" arrow className="w-full md:w-auto">
              Explore a pilot
            </Button>
          </div>
        </div>
      </section>

      {/* ── Security & deployment ── */}
      <section className="section">
        <div className="wrap flex flex-col gap-14 md:gap-20">
          <SectionHead
            chip="Security & deployment"
            title="Built around your environment."
            aside={
              <p className="max-w-[40ch] text-fg-2">
                Deployment and data handling are agreed in discovery. We’ve built and deployed SaaS and on-premises software before — but for Company Intelligence, no option below counts as proven until it’s validated with you.
              </p>
            }
          />
          <Deployment />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section !pt-0">
        <div className="wrap grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div className="flex flex-col items-start gap-5 md:sticky md:top-28 md:self-start" data-reveal>
            <Chip>Questions</Chip>
            <h2 className="h2 max-w-[12ch]">What teams ask first.</h2>
            <p className="max-w-[36ch] text-fg-2">Straight answers, including the ones that start with “not yet”.</p>
            <Button href="#contact" variant="ghost" size="sm" arrow>
              Ask us something else
            </Button>
            <Photo src="/img/blinds.jpg" className="mt-6 hidden aspect-[4/3] w-full rounded-[24px] opacity-80 md:block" sizes="40vw" />
          </div>
          <div data-reveal style={{ ["--i" as string]: 1 }}>
            <Faq items={faqCI} />
          </div>
        </div>
      </section>

      <ContactSection
        title="Explore a pilot."
        lead="Tell us about the workflow you have in mind. We’ll reply personally, and say so if a pilot isn’t the right next step."
        initialRoute="systems"
      />
    </>
  );
}
