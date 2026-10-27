import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CodeWidget, DevicePairWidget, ScreenFlowWidget, TypeSpecimenWidget, WireframeWidget } from "@/components/de-widgets";
import { ProcessCarousel } from "@/components/process-carousel";
import { ContactSection, PageHero, TrackCard, WorkCard } from "@/components/sections";
import { Button, CheckItem, Chip, Num, Photo, SectionHead, cx } from "@/components/ui-legacy";
import { getWork } from "@/lib/work";

export const metadata: Metadata = {
  title: "Digital Experiences",
  description:
    "Bespoke websites and digital products, designed and built around your business — not adapted from a template.",
};

const offers: { title: string; body: string; img: string; pos?: string; widget: ReactNode }[] = [
  {
    title: "Bespoke websites",
    body: "Designed and built around your business, your audience and your content. Never adapted from a theme.",
    img: "/img/dunes.jpg",
    widget: <WireframeWidget />,
  },
  {
    title: "SaaS marketing sites",
    body: "Sites that explain a product clearly to the people who need to get it, and that your team can keep current.",
    img: "/img/light-lines.jpg",
    widget: <DevicePairWidget />,
  },
  {
    title: "Founder & personal-brand sites",
    body: "A considered home for a founder’s work, writing and point of view.",
    img: "/img/portrait.jpg",
    pos: "60% 30%",
    widget: <TypeSpecimenWidget />,
  },
  {
    title: "Product & interface design",
    body: "Interfaces for digital products, from flows and structure to finished visual design.",
    img: "/img/amber-curves.jpg",
    widget: <ScreenFlowWidget />,
  },
  {
    title: "Frontend development",
    body: "Accessible, fast, maintainable frontends, built with the same care as the design.",
    img: "/img/keyboard.jpg",
    widget: <CodeWidget />,
  },
];

const includes = [
  "Discovery and positioning",
  "Messaging structure and page plan",
  "Art direction",
  "Responsive design for every screen size",
  "Production-ready development",
  "Analytics setup",
  "A documented handover",
];

const details = [
  "Layouts rethought for phones, not just shrunk",
  "Accessibility: keyboard support, contrast and reduced motion",
  "Performance: compressed media and restrained scripts",
  "Documented code, so the site stays easy to maintain",
];

function OfferCard({ o, k, wide }: { o: (typeof offers)[number]; k: number; wide?: boolean }) {
  return (
    <article
      className={cx(
        "relative flex flex-col overflow-hidden rounded-[26px]",
        wide ? "min-h-[460px] md:min-h-[420px]" : "min-h-[520px] md:min-h-[580px]",
        k === 1 ? "card-hot" : "card",
      )}
      data-reveal
      style={{ ["--i" as string]: k }}
    >
      <Photo src={o.img} position={o.pos} className="!absolute inset-0 opacity-65" sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/25 to-bg" />
      <div className={cx("relative flex flex-1 flex-col p-5 md:p-6", wide && "lg:flex-row lg:items-stretch lg:gap-8")}>
        <div className={cx("flex flex-1 items-center justify-center pb-6 pt-12", wide && "lg:order-2 lg:py-6")}>{o.widget}</div>
        <div className={cx("flex flex-col gap-2.5", wide && "lg:w-[42%] lg:justify-end")}>
          <Num n={k + 1} className="mb-1 bg-black/30" />
          <h3 className="h4 !text-[1.35rem]">{o.title}</h3>
          <p className="body">{o.body}</p>
        </div>
      </div>
    </article>
  );
}

export default function DigitalExperiencesPage() {
  const related = ["birthday-website", "founder-one-portfolio"].map((s) => getWork(s)).filter((w) => w !== undefined);

  return (
    <>
      <PageHero
        chip="Design & Development"
        title="Digital Experiences"
        lead="Bespoke websites and digital products that turn a business’s identity into one considered, coherent experience."
        image="/img/studio-desk.jpg"
        position="50% 55%"
        actions={
          <>
            <Button href="#contact" arrow>
              Start a conversation
            </Button>
            <Button href="#work" variant="ghost">
              See related work
            </Button>
          </>
        }
      />

      {/* ── What we make ── */}
      <section className="section">
        <div className="wrap flex flex-col gap-14 md:gap-20">
          <SectionHead
            chip="What we make"
            title="Made for the context, not from a template."
            aside={
              <>
                <p className="max-w-[36ch] text-fg-2">Every project starts from your business, your audience and your content. That’s why none of them look alike.</p>
                <Button href="#contact" variant="ghost">
                  Start a project
                </Button>
              </>
            }
          />
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              {offers.slice(0, 3).map((o, k) => (
                <OfferCard key={o.title} o={o} k={k} />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {offers.slice(3).map((o, k) => (
                <OfferCard key={o.title} o={o} k={k + 3} wide />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 fade-y">
          <Photo src="/img/candle-desk.jpg" position="30% 70%" className="h-full w-full opacity-80" />
          <div className="absolute inset-0 bg-bg/30" />
        </div>
        <div className="wrap section relative flex flex-col gap-12 md:gap-16">
          <SectionHead
            center
            chip="What you get"
            title="The obvious things, and the quiet ones."
            lead="Everything a project needs to launch well, plus the details people feel before they notice them."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass flex flex-col gap-6 rounded-[26px] p-7 md:p-9" data-reveal>
              <div className="flex items-center justify-between gap-4">
                <h3 className="h3">What a project includes</h3>
                <span className="tag neutral">Every project</span>
              </div>
              <div className="hairline" />
              <ul className="flex flex-col gap-3.5">
                {includes.map((t) => (
                  <CheckItem key={t}>{t}</CheckItem>
                ))}
              </ul>
            </div>
            <div className="glass-dark flex flex-col gap-6 rounded-[26px] !border-accent/30 p-7 md:p-9" data-reveal style={{ ["--i" as string]: 1 }}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="h3">The details people notice without noticing</h3>
              </div>
              <div className="hairline" />
              <ul className="flex flex-col gap-3.5">
                {details.map((t) => (
                  <CheckItem key={t} tone="hot">
                    {t}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProcessCarousel
        chip="How a project runs"
        title="From first conversation to a site you own."
        lead="One method, every project. Timelines are agreed in the written proposal, never promised before scoping."
        image="/img/woman-laptop.jpg"
      />

      {/* ── How you buy it ── */}
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
          <div className="flex flex-col items-start gap-5" data-reveal>
            <Chip>How you buy it</Chip>
            <h2 className="h2 max-w-[12ch]">A scoped project, then a handover.</h2>
            <p className="lead max-w-[40ch]">
              A written proposal before anything starts. At the end, the design files, source code and documentation are yours.
            </p>
            <Button href="#contact" arrow className="mt-2">
              Ask for a proposal
            </Button>
          </div>
          <TrackCard which="digital" />
        </div>
      </section>

      {/* ── Related work ── */}
      <section id="work" className="section !pt-0 scroll-mt-20">
        <div className="wrap flex flex-col gap-12 md:gap-16">
          <SectionHead
            chip="Related work"
            title="Work that shows how we think."
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

      <ContactSection initialRoute="digital" />
    </>
  );
}
