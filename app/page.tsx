import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Ember } from "@/components/glass";
import { Check } from "@/components/icons";
import { FounderStatement, HeroCard, Rail, Rows, type Row } from "@/components/home-parts";
import { GhostButton, GlyphWord, Label, SplitButton, Stagger, cx, st } from "@/components/ui";
import { Walkthrough } from "@/components/walkthrough";
import { ciStatus, faqGeneral, founderNote, founders, process, site } from "@/lib/content";
import { work } from "@/lib/work";

/* ───────────── content arranged for this page ───────────── */

const practices: Row[] = [
  {
    title: "Digital Experiences",
    eyebrow: "Design & development",
    image: "/ref-img/lamp.jpg",
    aside: "From first conversation to a site you own.",
    body: (
      <>
        <p>
          Bespoke websites and digital products that translate a business’s identity into one considered, cohesive experience — designed around your
          audience and your content, never adapted from a template.
        </p>
        <p>Bespoke websites · SaaS marketing sites · Founder and personal-brand sites · Product and interface design · Frontend development.</p>
        <p>Responsive layouts rethought for phones, accessibility built in, restrained scripts, and a documented handover.</p>
      </>
    ),
    cta: { href: "/digital-experiences", label: "Explore the practice" },
  },
  {
    title: "Intelligent Systems",
    eyebrow: "AI & automation",
    image: "/ref-img/visor.jpg",
    aside: "Specific workflows. Bounded systems you can trust.",
    body: (
      <>
        <p>
          We connect tools, information and workflows so knowledge is easier to find and repetitive work gets lighter. Not an autonomous company or a
          flawless “AI brain” — specific systems we can design, test and support.
        </p>
        <p>Custom AI workflows · Tool integrations · Internal tools and reporting.</p>
        <p>Every engagement starts with one workflow, judged against criteria agreed before the build.</p>
      </>
    ),
    cta: { href: "/intelligent-systems", label: "Explore the practice" },
  },
  {
    title: "Company Intelligence",
    eyebrow: "Flagship system · working prototype",
    image: "/ref-img/desk.jpg",
    aside: "Available as a scoped pilot.",
    body: (
      <>
        <p>
          A configurable system that connects approved company information, so people find answers, see what was decided, and notice what still needs
          doing.
        </p>
        <p>Find what the company already knows · Surface what needs attention · Move work forward — once a person has approved it.</p>
      </>
    ),
    cta: { href: "/company-intelligence", label: "See the flagship" },
  },
];

const faqEyebrows = ["Outcomes", "Pricing", "Ownership", "Third-party costs", "Hosting", "After launch", "Integrations", "Fit"];
const faqImages = ["/ref-img/visor.jpg", "/ref-img/lamp.jpg", "/ref-img/hat.jpg", "/ref-img/desk.jpg"];

export default function Home() {
  const [assistant, birthday, founderOne, founderTwo] = [work[0], work[1], work[2], work[3]];

  return (
    <>
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative overflow-hidden ember-tl">
        {/* soft glow behind the figure */}
        <div
          className="pointer-events-none absolute left-1/2 top-[10%] h-[70%] w-[60%] -translate-x-[10%] rounded-full opacity-60 blur-[90px]"
          style={{ background: "radial-gradient(circle, #e83a25 0%, #6a0a02 50%, transparent 72%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1600px]">
          {/* figure */}
          <div className="pointer-events-none absolute left-[2vw] top-[64px] z-[2] w-[150vw] md:left-[22%] md:top-[150px] md:w-[min(66vw,1080px)]">
            <Image
              src="/ref-img/hero-profile.png"
              alt=""
              width={1618}
              height={820}
              preload
              sizes="(min-width:768px) 64vw, 150vw"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%)]"
            />
          </div>

          <div className="wrap relative z-[3] grid gap-10 pt-[64vw] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.85fr)] md:pt-32">
            <div className="flex flex-col gap-6">
              <Label className="text-white/80">Independent · Founder-led studio</Label>
              <h1 className="t-hero max-w-[12ch] md:!text-[clamp(3rem,1.4rem+3.6vw,4.6rem)]" data-reveal>
                Crafted with feeling. Built with purpose.
              </h1>
              <p className="t-justify max-w-[30ch] text-[0.82rem] leading-snug text-white/85 md:ml-[3.2rem]" data-reveal style={st(1)}>
                Digital experiences with feeling and intelligent systems with purpose — designed and built by the founders themselves.
              </p>
              <div className="mt-2 flex flex-wrap gap-3" data-reveal style={st(2)}>
                <SplitButton href="#contact" className="max-sm:w-full max-sm:justify-between">
                  Start a conversation
                </SplitButton>
                <GhostButton href="#work" className="max-sm:hidden">
                  See the work
                </GhostButton>
              </div>
            </div>

            <div className="hidden md:block" />

            <div className="flex flex-col gap-10">
              <div className="w-full max-w-[340px] md:ml-auto" data-reveal style={st(1)}>
                <HeroCard />
              </div>
              <div className="grid grid-cols-2 gap-6 md:ml-auto md:max-w-[340px]">
                <div data-reveal style={st(2)}>
                  <p className="t-stat !text-[clamp(3rem,1.6rem+3.4vw,5rem)]">02</p>
                  <p className="t-justify mt-3 text-[0.72rem] leading-snug text-white/75">Practices. How it looks, and how it works — one studio.</p>
                </div>
                <div data-reveal style={st(3)}>
                  <p className="t-stat !text-[clamp(3rem,1.6rem+3.4vw,5rem)]">01</p>
                  <p className="t-justify mt-3 text-[0.72rem] leading-snug text-white/75">Workflow first. Every system starts with a single one.</p>
                </div>
              </div>
            </div>
          </div>

          {/* giant wordmark (the figure sits in front) */}
          <div className="relative z-[1] mt-12 overflow-hidden md:mt-0">
            <p className="wordmark text-center text-white" aria-hidden="true">
              ALRO
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════ PRACTICES ═════════════ */}
      <section id="practices" className="section">
        <div className="wrap">
          <div className="grid items-end gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Stagger
              className="t-h1"
              lines={["One studio for", <>how it looks, <GlyphWord word="AND" at={2} /></>, "how it works."]}
              indent={["0", "0", "clamp(1rem, 9vw, 8rem)"]}
            />
            <p className="t-body t-justify max-w-[22rem] md:ml-auto" data-reveal style={st(1)}>
              Most studios do one or the other. We do both — because the same care belongs on each side, and the people who notice one usually notice the
              other.
            </p>
          </div>
          <div className="mt-16 md:mt-20">
            <Rows rows={practices} />
          </div>
        </div>
      </section>

      {/* ═════════════ POINT OF VIEW ═════════════ */}
      <section className="section !pt-0">
        <div className="wrap">
          <div className="flex items-start justify-between gap-8">
            <p className="t-quote t-justify max-w-[23em]" data-reveal>
              <span className="text-gray-2">“A business should</span> work as thoughtfully as it presents itself. We design how it looks and build how it
              works <span className="text-gray-2">— because the people who notice one</span> usually notice the other.”
            </p>
            <Label className="hidden whitespace-nowrap md:block">Point of view</Label>
          </div>

          <div className="mt-14 flex items-center gap-4" data-reveal>
            <span className="relative h-16 w-16 overflow-hidden rounded-full" style={{ background: "radial-gradient(circle at 40% 30%, #ff6a1a, #e83a25 45%, #3a0401 90%)" }}>
              <span className="absolute inset-0 grid place-items-center text-[0.7rem] font-semibold tracking-wide">ALRO</span>
            </span>
            <div>
              <p className="text-[1.05rem] font-medium">Two founders</p>
              <p className="text-[0.9rem] text-gray">Design &amp; Development / AI &amp; Systems</p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3 md:ml-[40%]" data-reveal>
            {["Bespoke websites", "Founder sites", "Product design", "AI workflows", "Tool integrations", "Internal tools"].map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {[
              ["How it presents", "The website is often the first thing people see. Too often it is a template that makes a considered business look like everyone else."],
              ["How it works", "Behind it, knowledge sits in meeting notes, threads and documents, and the same updates are pieced together by hand every week."],
              ["Why both", "The same care belongs on each side. One studio, one standard — and you work directly with the people doing the work."],
            ].map(([h, b], k) => (
              <div key={h} data-reveal style={st(k)}>
                <p className="text-[1.15rem] font-medium">{h}</p>
                <p className="t-body t-justify mt-4 max-w-[26rem]">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ SELECTED WORK ═════════════ */}
      <section id="work" className="section relative overflow-hidden scroll-mt-16">
        <div
          className="pointer-events-none absolute -right-[10%] top-0 h-[80%] w-[50%] rounded-full opacity-80 blur-[100px]"
          style={{ background: "radial-gradient(circle, #ff5100 0%, #e83a25 35%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="wrap relative">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] md:gap-10">
            <span className="hidden md:block" />
            <div className="flex items-start justify-between gap-6">
              <div>
                <Stagger className="t-h1" lines={["Proof, labelled", "for what it is."]} indent={["0", "clamp(1rem, 10vw, 9rem)"]} />
                <p className="t-body t-justify mt-6 max-w-[22rem] md:ml-[clamp(1rem,10vw,9rem)]" data-reveal>
                  ALRO is new. Instead of a logo wall, we show the founders’ own work and what we’re building now — who made each piece, and what it does and
                  doesn’t demonstrate.
                </p>
              </div>
              <Label className="hidden whitespace-nowrap md:block">Selected work</Label>
            </div>
          </div>

          <div className="mt-14">
            <Rail label="Craft evidence and capability evidence — never mixed up.">
              <WorkCard href={`/work/${assistant.slug}`} n="01" item={assistant} tone="ember" />
              <WorkCard href={`/work/${birthday.slug}`} n="02" item={birthday} tone="light" />
              <WorkCard href={`/work/${founderOne.slug}`} n="03" item={founderOne} tone="photo" img="/ref-img/hat.jpg" />
              <WorkCard href={`/work/${founderTwo.slug}`} n="04" item={founderTwo} tone="photo" img="/ref-img/visor.jpg" />
            </Rail>
          </div>
          <div className="mt-10 flex md:justify-end">
            <GhostButton href="/work">All work, and how we label it</GhostButton>
          </div>
        </div>
      </section>

      {/* ═════════════ COMPANY INTELLIGENCE ═════════════ */}
      <section id="intelligence" className="section">
        <div className="wrap">
          <div className="flex items-start justify-between gap-8">
            <Stagger
              className="t-h1"
              lines={["Your company’s", <GlyphWord key="k" word="KNOWLEDGE" at={5} />, "connected."]}
              indent={["0", "0", "clamp(1rem, 12vw, 10rem)"]}
            />
            <Label className="hidden whitespace-nowrap text-right md:block">
              Flagship system
              <br />
              Working prototype · scoped pilot
            </Label>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8">
            {/* glass widgets over ember */}
            <div className="relative order-2 flex flex-col justify-end gap-4 md:order-1">
              <Ember className="-inset-6 rounded-[40px]" intensity={0.85} />
              <div className="lg rounded-[20px] p-5" data-reveal>
                <div className="flex items-center justify-between">
                  <p className="t-label text-white/80">Extracted · Supplier review.pdf</p>
                  <span className="pulse h-2 w-2 rounded-full bg-orange" />
                </div>
                <div className="mt-3 flex items-end gap-6">
                  <p className="text-[2.2rem] font-light leading-none">
                    3<span className="ml-1 text-[0.8rem] font-normal text-white/75">decisions</span>
                  </p>
                  <p className="text-[2.2rem] font-light leading-none">
                    4<span className="ml-1 text-[0.8rem] font-normal text-white/75">actions</span>
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-[0.72rem] text-white/80">
                  <span>Read</span>
                  <span>4 / 4 pages</span>
                </div>
                <div className="bars mt-2 h-6">
                  {Array.from({ length: 34 }).map((_, k) => (
                    <i key={k} className={k > 27 ? "off" : ""} style={{ height: "100%" }} />
                  ))}
                </div>
              </div>
              <div className="lg rounded-[20px] p-5" data-reveal style={st(1)}>
                <p className="t-label text-white/80">Needs attention</p>
                <p className="mt-2 text-[1.05rem] font-medium leading-snug">One action from Tuesday’s review has no owner.</p>
                <div className="bars mt-4 h-14">
                  {[40, 70, 35, 90, 55, 100, 30, 65, 80, 45, 95, 60, 38, 85, 50, 72, 28, 88, 42, 100, 58, 33, 76, 92].map((h, k) => (
                    <i key={k} className={k % 5 === 4 ? "off" : ""} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="mt-3 text-[0.68rem] text-white/65">Simulation · fictional data</p>
              </div>
            </div>

            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[22px] md:order-2 md:aspect-auto md:min-h-[560px]" data-reveal>
              <Image src="/ref-img/desk.jpg" alt="" fill sizes="(min-width:768px) 34vw, 100vw" className="object-cover" />
            </div>

            <div className="order-3 flex flex-col justify-between gap-10">
              <div className="t-body t-justify flex flex-col gap-4 text-white/80" data-reveal>
                <p>
                  Decisions sit in meeting notes, context in chat threads, commitments in email. Company Intelligence brings the approved parts together, so people
                  spend less time piecing things back together.
                </p>
                <p>
                  <span className="text-white">Find what the company already knows</span> — with a pointer back to where it came from.{" "}
                  <span className="text-white">Surface what needs attention</span> — actions, owners and deadlines, flagged for a person to review.{" "}
                  <span className="text-white">Move work forward</span> — drafts and tasks that wait for a person’s approval.
                </p>
              </div>
              <SplitButton href="/company-intelligence" className="w-fit">
                Explore Company Intelligence
              </SplitButton>
            </div>
          </div>

          {/* walkthrough on liquid glass */}
          <div id="walkthrough" className="relative mt-24 scroll-mt-20 overflow-hidden rounded-[var(--radius-xl)] bg-black-2 px-3 py-10 sm:px-6 md:px-12 md:py-16">
            <Ember />
            <div className="relative">
              <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <Stagger className="t-h2" lines={["From a document", "to an approved action."]} indent={["0", "clamp(1rem, 8vw, 6rem)"]} />
                <p className="t-body t-justify max-w-[20rem] text-white/85">
                  Five steps, about forty seconds on autoplay — or step through at your own pace. A scripted simulation with a fictional business.
                </p>
              </div>
              <Walkthrough />
            </div>
          </div>

          {/* what exists today — card trio */}
          <div className="mt-24">
            <div className="flex items-start justify-between gap-8">
              <Stagger className="t-h2" lines={["What exists today —", "and what doesn’t yet."]} indent={["0", "clamp(1rem, 10vw, 8rem)"]} />
              <Label className="hidden whitespace-nowrap md:block">What we’re building</Label>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {ciStatus.map((t, k) => {
                const tone = k === 0 ? "light" : k === 1 ? "ember" : "dark";
                return (
                  <article
                    key={t.title}
                    data-reveal
                    style={st(k)}
                    className={cx(
                      "relative flex min-h-[420px] flex-col overflow-hidden rounded-[18px] p-6",
                      tone === "light" && "bg-white text-black",
                      tone === "dark" && "border border-line-2 bg-black-2",
                    )}
                  >
                    {tone === "ember" && (
                      <>
                        <Image src="/ref-img/ember-blur.jpg" alt="" fill sizes="33vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/10" />
                      </>
                    )}
                    <div className="relative flex h-full flex-col">
                      <p className="t-stat !text-[clamp(3rem,2rem+2.6vw,4.6rem)]">{["Today", "Pilot", "Later"][k]}</p>
                      <p className="mt-auto pt-10 text-[1.05rem] font-semibold">{t.title}</p>
                      <p className={cx("t-justify mt-2 text-[0.8rem] leading-snug", tone === "light" ? "text-black/60" : "text-white/80")}>{t.note}</p>
                      <ul className="mt-5 flex flex-col gap-2">
                        {t.items.map((it) => (
                          <li key={it} className="flex gap-2.5 text-[0.8rem] leading-snug">
                            <Check className={cx("mt-[3px] h-3 w-3 flex-none", tone === "light" ? "text-orange-soft" : "text-white")} />
                            <span className={tone === "dark" ? "text-gray" : ""}>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ HOW WE WORK — glass rail on ember ═════════════ */}
      <section className="relative overflow-hidden py-[var(--section)]">
        <Ember intensity={0.9} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />
        <div className="wrap relative">
          <div className="flex items-start justify-between gap-8">
            <Stagger className="t-h1" lines={["Five steps,", "the same every time."]} indent={["0", "clamp(1rem, 10vw, 9rem)"]} />
            <Label className="hidden whitespace-nowrap text-white/85 md:block">How we work</Label>
          </div>
          <ol className="no-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
            {process.map((p, k) => (
              <li key={p.title} className="lg flex min-h-[300px] w-[78vw] flex-none snap-start flex-col rounded-[22px] p-6 sm:w-[46vw] md:w-auto" data-reveal style={st(k)}>
                <span className="t-index text-white/80">[{String(k + 1).padStart(2, "0")}]</span>
                <p className="mt-auto text-[1.25rem] font-medium uppercase">{p.title}</p>
                <p className="t-justify mt-3 text-[0.8rem] leading-snug text-white/85">{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              ["Digital Experiences", "A scoped project, then a handover. Code, files and decisions are yours.", "/digital-experiences"],
              ["Intelligent Systems", "Start small, prove it, then build. Each stage is scoped and priced on its own.", "/intelligent-systems"],
            ].map(([t, b, h]) => (
              <Link key={t} href={h} className="lg lg-dark group flex items-center justify-between gap-6 rounded-full py-3 pl-6 pr-3">
                <span>
                  <span className="block text-[0.72rem] uppercase tracking-[0.04em] text-white/70">{t}</span>
                  <span className="block text-[0.88rem]">{b}</span>
                </span>
                <span className="round round-white flex-none transition-transform group-hover:rotate-45">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ PEOPLE ═════════════ */}
      <section className="section relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-[10%] -top-[10%] h-[60%] w-[45%] rounded-full opacity-90 blur-[90px]"
          style={{ background: "radial-gradient(circle, #ff5100 0%, #e83a25 40%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="wrap relative">
          <Stagger className="t-h1 md:ml-[33%]" lines={["Small by design.", "Thoughtful", "by default."]} indent={["0", "0", "clamp(1rem, 12vw, 10rem)"]} />
          <div className="mt-14">
            <FounderStatement note={founderNote} founders={founders} />
          </div>
        </div>
      </section>

      {/* ═════════════ FAQ ═════════════ */}
      <section className="section !pt-8">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_auto] md:gap-8">
            <Label>FAQ</Label>
            <Stagger className="t-h2" lines={["Questions before", "the first step"]} indent={["0", "clamp(1rem, 9vw, 7rem)"]} />
          </div>
          <div className="mt-14">
            <Rows
              size="md"
              defaultOpen={1}
              rows={faqGeneral.map((f, k) => ({
                title: f.q,
                eyebrow: faqEyebrows[k],
                body: <p>{f.a}</p>,
                image: faqImages[k % faqImages.length],
              }))}
            />
          </div>
        </div>
      </section>

      {/* ═════════════ CONTACT — soft white panel ═════════════ */}
      <section id="contact" className="scroll-mt-20 px-2.5 pb-2.5 md:px-4">
        <div className="panel-light mx-auto max-w-[1600px] px-[var(--gutter)] py-14 md:py-20">
          <div className="mx-auto grid max-w-[var(--max)] gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
            <div className="flex flex-col justify-between gap-14">
              <h2 className="t-h1 !text-[clamp(2rem,1rem+3.3vw,4rem)]">
                Have something
                <br />
                worth building?
              </h2>
              <dl className="grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-5 text-[0.82rem]">
                <dt className="pt-1 text-black/50">Email</dt>
                <dd className="break-all text-[1.25rem]">
                  <a href={`mailto:${site.email}`} className="hover:text-orange-soft">
                    {site.email}
                  </a>
                </dd>
                <dt className="pt-1 text-black/50">Studio</dt>
                <dd className="text-[1.25rem]">Independent · Founder-led</dd>
                <dt className="pt-1 text-black/50">Reply</dt>
                <dd className="text-[1.25rem]">Personally, from the founders</dd>
                <dt className="pt-0.5 text-black/50">Next</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
                  {["A short conversation", "A written proposal"].map((x) => (
                    <span key={x} className="underline underline-offset-4">
                      {x}
                    </span>
                  ))}
                </dd>
              </dl>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[0.82rem] text-black/50">Contact</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────── work card (reference stat-card trio) ───────────── */
function WorkCard({
  href,
  n,
  item,
  tone,
  img,
}: {
  href: string;
  n: string;
  item: (typeof work)[number];
  tone: "ember" | "light" | "photo";
  img?: string;
}) {
  return (
    <Link
      href={href}
      data-card
      className={cx(
        "group relative flex h-[400px] w-[78vw] flex-none snap-start flex-col overflow-hidden rounded-[16px] p-5 sm:w-[46vw] md:h-[420px] md:w-[calc((100%-2rem)/3)]",
        tone === "light" ? "bg-white text-black" : "text-white",
      )}
    >
      {tone === "ember" && <Image src="/ref-img/ember-blur.jpg" alt="" fill sizes="33vw" className="object-cover" />}
      {tone === "photo" && img && (
        <>
          <Image src={img} alt="" fill sizes="33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        </>
      )}
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <p className="t-stat !text-[clamp(3.2rem,2rem+2.8vw,4.8rem)]">{n}</p>
          <span className={cx("round !h-10 !w-10 transition-transform group-hover:rotate-45", tone === "light" ? "!bg-black !text-white" : "round-white")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </div>
        <div className="mt-auto">
          <p className="text-[1rem] font-semibold leading-tight">{item.title}</p>
          <p className={cx("t-justify mt-2 text-[0.78rem] leading-snug", tone === "light" ? "text-black/60" : "text-white/80")}>{item.summary}</p>
          <span className={cx("tag tag-sm mt-4", tone === "light" ? "!border-black/25 !text-black/70" : "!border-white/40 !text-white/85")}>{item.label}</span>
        </div>
      </div>
    </Link>
  );
}
