import Link from "next/link";
import { Arrow, SectionHead, Swap } from "@/components/flow/bits";
import { BrainDemo } from "@/components/home/brain-demo";
import { Faq } from "@/components/home/faq";
import { HeroWindows } from "@/components/home/hero-windows";
import { Journey } from "@/components/home/journey";
import { LabMedia } from "@/components/home/lab-media";
import { routes } from "@/lib/routes";
import { work } from "@/lib/work";

/* Copy: alro website skeleton (sections 02–09). Footer/CTA (10) lives in the layout. */

const services = [
  {
    n: "01",
    name: "Bespoke websites",
    line: "An introduction worth making.",
    body: "Your first meeting with a potential customer often happens without you in the room. We build distinctive websites that tell your story, earn attention and make that introduction count.",
    chips: ["Strategy", "Design", "Development", "Interactions"],
    cta: "Explore websites",
    href: routes.websites,
  },
  {
    n: "02",
    name: "Company Brain",
    line: "The answer is probably in there somewhere.",
    body: "In a document. A spreadsheet. A conversation from last Tuesday. We connect your company knowledge and build intelligent workflows so your team can spend less time looking for things and more time getting things done.",
    chips: ["Company Knowledge", "AI Assistants", "Automations", "Integrations"],
    cta: "Explore Company Brain",
    href: routes.companyBrain,
  },
];

const pillars = [
  { t: "Connected knowledge", c: "The information your team needs, without the scavenger hunt.", icon: "nodes" },
  { t: "Context-aware assistance", c: "Answers grounded in your business, not just plausible-sounding guesses.", icon: "chat" },
  { t: "Workflow automation", c: "Less copying, chasing and updating. More time for the work that matters.", icon: "loop" },
] as const;

const process = [
  { t: "Figure out the real problem.", c: "We get into your business, audience, existing tools and constraints. The goal is to solve the right problem, not just the most interesting one." },
  { t: "Make the plan make sense.", c: "You’ll know what we’re building, why we’re building it, what it costs and what success should look like." },
  { t: "Build. Test. Refine.", c: "We make the work tangible early, gather feedback and keep improving until it does what it’s supposed to." },
  { t: "Launch isn’t the whole story.", c: "We hand over properly and can continue supporting, maintaining and improving what we’ve built." },
];

const philosophy = [
  { t: "Taste matters.", c: "Especially when everyone has access to the same tools.", icon: "eye" },
  { t: "It has to work.", c: "Beyond the demo and after the launch.", icon: "check" },
  { t: "Keep it useful.", c: "Complexity isn’t the same thing as value.", icon: "minus" },
] as const;

const labKinds = { "company-knowledge-assistant": "assistant", "birthday-website": "story", "founder-one-portfolio": "design", "founder-two-portfolio": "systems" } as const;

export default function Home() {
  return (
    <>
      {/* ═════════ 02 · HERO ═════════ */}
      <section data-hero-root className="relative overflow-x-clip pb-[clamp(2rem,5vh,3.5rem)] pt-[clamp(7.5rem,17vh,10rem)]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{ background: "radial-gradient(55% 85% at 15% 100%, rgb(17 17 17 / .05), transparent 70%), radial-gradient(45% 75% at 85% 100%, rgb(231 229 224 / .9), transparent 72%)" }}
          aria-hidden="true"
        />
        <div className="wrap relative">
          <span className="eyebrow wide" data-hero="kicker">
            Independent creative technology studio
          </span>

          <h1 className="mt-6 flex flex-col font-serif leading-[0.98] tracking-[-0.025em]">
            <span className="block w-fit text-[clamp(2.5rem,7.6vw,8.2rem)] will-change-transform md:whitespace-nowrap" data-hero="top">
              Make a good impression.
            </span>
            <span className="block w-fit self-end text-right text-[clamp(2.5rem,7.6vw,8.2rem)] will-change-transform md:whitespace-nowrap" data-hero="bottom">
              Then make{" "}
              <span className="relative inline-block italic">
                good on it.
                <svg data-hero="underline" className="pointer-events-none absolute -bottom-[0.1em] left-[-3%] h-[0.26em] w-[106%] overflow-visible" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 14 C 60 4, 140 2, 200 8 S 280 16, 296 6" stroke="var(--grey)" strokeWidth="3" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </span>
          </h1>

          <div className="mt-[clamp(2.5rem,6vh,4.5rem)] grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="grid max-w-[30rem] gap-7">
              <p className="text-[1.125rem] font-light leading-[1.625] text-ink/70" data-hero="text">
                We build bespoke websites and AI-powered business systems. One helps your business show up better. The other helps your team work better.
              </p>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href={routes.services} className="btn liquid" data-hero="cta" data-magnetic="0.3">
                  <Swap>Explore what we do</Swap>
                  <Arrow />
                </Link>
                <Link href="#work" className="line-link" data-hero="cta">
                  See our work
                  <Arrow />
                </Link>
              </div>
              <div className="hidden items-center gap-4 pt-6 lg:flex" data-hero="hint">
                <span className="scroll-line" />
                <span className="tiny">Scroll</span>
              </div>
            </div>
            <div data-hero="aside">
              <HeroWindows />
            </div>
          </div>
        </div>
      </section>

      {/* velocity marquee — the two service vocabularies */}
      <div className="marquee" data-marquee aria-hidden="true">
        <div className="mtrack" data-marquee-track data-marquee-speed="70">
          <div className="mgroup">
            {["Strategy", "Design", "Development", "Interactions", "Company Knowledge", "AI Assistants", "Automations", "Integrations"].map((w) => (
              <span key={w} className="contents">
                <span>{w}</span>
                <span className="dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative" data-flow-wrap>
        {/* scroll-drawn line, services → connection */}
        <svg data-flow-line className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block" viewBox="0 0 1440 2400" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M1300 0 C 1420 300, 1100 520, 980 760 S 300 1000, 180 1300 S 420 1900, 760 2050 S 1240 2250, 1180 2400" stroke="var(--grey)" strokeOpacity=".35" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ═════════ 03 · SERVICES ═════════ */}
        <section id="services" className="section relative z-[1] scroll-mt-24">
          <div className="wrap">
            <SectionHead
              eyebrow="Services · Two things, done properly"
              title={
                <>
                  Two very different problems. <em>One place</em> to solve them.
                </>
              }
              lead="Some businesses need a better way to show up. Others need a better way to get things done. We happen to be good at both."
            />
            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 lg:grid-cols-2">
              {services.map((s, k) => (
                <article key={s.n} className="panel glass flex flex-col gap-8" data-reveal="fade">
                  <span className="ghost-num" data-drift aria-hidden="true">
                    {s.n}
                  </span>
                  <div className="relative flex items-center justify-between">
                    <span className="tiny">Service — {s.n}</span>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl" data-clip>
                    {k === 0 ? <WebsiteCraft /> : <BrainFlow />}
                  </div>
                  <div className="relative grid gap-4">
                    <h3 className="h3">{s.name}</h3>
                    <p className="font-serif text-[1.35rem] italic leading-snug text-ink/80">{s.line}</p>
                    <p className="body max-w-[30rem]">{s.body}</p>
                  </div>
                  <div className="relative mt-auto flex flex-wrap items-center justify-between gap-6">
                    <div className="chips">
                      {s.chips.map((c) => (
                        <span key={c} className="chip">
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link href={s.href} className="line-link">
                      {s.cta}
                      <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ 04 · THE CONNECTION ═════════ */}
        <section className="section relative z-[1] !pt-0">
          <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
            <SectionHead
              eyebrow="Why these services belong together"
              title={
                <>
                  The website gets the conversation started. <em>What happens next</em> matters just as much.
                </>
              }
              lead="A great website can bring someone to your door. But someone still has to respond, find the right information, prepare the next step and keep things moving. When it makes sense, we connect those pieces too."
            />
            <div data-reveal="fade">
              <Journey />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between" data-reveal="fade">
              <p className="tiny">Illustrative workflow. Depends on each client’s tools, permissions and processes.</p>
              <p className="font-serif text-[1.25rem] italic">Of course, you can work with us on either side. There’s no compulsory bundle.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ═════════ 05 · COMPANY BRAIN ═════════ */}
      <section id="brain" className="section relative overflow-hidden bg-mist/55">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <SectionHead
            eyebrow="Company Brain · Make it concrete"
            title={
              <>
                Your business knows a lot. <em>Finding it</em> shouldn’t be a full-time job.
              </>
            }
            lead="Company Brain brings approved information from your existing tools into one useful place. Ask questions, find context and move work forward without digging through half your company’s digital history."
          />
          <div data-reveal="fade">
            <BrainDemo />
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ink/12 md:grid-cols-3" data-reveal-group>
            {pillars.map((p) => (
              <div key={p.t} className="grid content-start gap-4 bg-paper p-7">
                <span className="ico">
                  <Icon name={p.icon} />
                </span>
                <h3 className="text-[1.5rem]">{p.t}</h3>
                <p className="body">{p.c}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-start">
            <Link href={routes.companyBrain} className="line-link">
              Explore Company Brain
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════ 06 · SELECTED WORK — from the lab ═════════ */}
      <section id="work" className="section scroll-mt-24">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="From the lab"
              title={
                <>
                  Less talk. <em>More things</em> we’ve actually made.
                </>
              }
              lead="A selection of websites, digital experiences and intelligent systems we’ve worked on."
            />
            <p className="tiny max-w-[22rem] md:text-right" data-reveal="fade">
              Honestly labelled prototypes and the founders’ own work — no invented clients, testimonials or metrics.
            </p>
          </div>
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 md:grid-cols-2 md:[&>*:nth-child(even)]:mt-24">
            {work.map((w) => (
              <Link key={w.slug} href={`/work/${w.slug}`} className="pcard grid gap-4 no-underline" data-cursor-flower>
                <div className="media" data-clip>
                  <LabMedia kind={labKinds[w.slug as keyof typeof labKinds] ?? "design"} />
                </div>
                <div className="flex items-start justify-between gap-6" data-reveal="fade">
                  <div className="grid gap-2">
                    <h3 className="text-[1.6rem] leading-tight">{w.title}</h3>
                    <span className="tiny">{w.label}</span>
                    <p className="body max-w-[34rem]">{w.summary}</p>
                  </div>
                  <span className="mt-1 grid h-11 w-11 flex-none place-items-center rounded-full border border-ink/15">
                    <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 07 · PROCESS ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="Process"
              title={
                <>
                  We like a good idea. <em>We like a working one more.</em>
                </>
              }
              lead="We start by understanding what you’re trying to achieve, not by deciding which technology to throw at it."
            />
          </div>
          <ol className="relative" data-steps>
            <span className="absolute bottom-16 left-[1.625rem] top-2 w-px bg-ink/12" aria-hidden="true">
              <span className="block h-full w-full origin-top bg-ink" data-steps-fill />
            </span>
            {process.map((p, k) => (
              <li key={p.t} className={`step ${k === 0 ? "is-active" : ""}`} data-step>
                <span className="dot">{String(k + 1).padStart(2, "0")}</span>
                <div className="grid gap-3 pt-2.5">
                  <h3 className="title text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{p.t}</h3>
                  <p className="copy body max-w-[32rem]">{p.c}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ 08 · PHILOSOPHY ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <span className="eyebrow" data-reveal="fade">
            Philosophy
          </span>
          <h2 className="manifesto max-w-[24ch]" data-scrub-words>
            Good technology should make things simpler. Not give you another thing to manage.
          </h2>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
            <p className="lead" data-reveal="fade">
              We care about how things look, how they work and whether they’re actually useful. Sometimes that means a custom-built system. Sometimes it means
              making the tools you already have work better together.
            </p>
            <p className="quote" data-reveal="fade">
              We don’t believe every problem needs an AI agent. Or another dashboard.
            </p>
          </div>
          <div className="grid gap-10 border-t border-ink/12 pt-10 md:grid-cols-3" data-reveal-group>
            {philosophy.map((p) => (
              <div key={p.t} className="grid content-start gap-4">
                <span className="ico">
                  <Icon name={p.icon} />
                </span>
                <h3 className="text-[1.6rem]">{p.t}</h3>
                <p className="body">{p.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 09 · FAQ ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          <SectionHead
            eyebrow="FAQ"
            title={
              <>
                Frequently asked <em>questions</em>
              </>
            }
          />
          <div data-reveal="fade">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────── service-card visuals ───────── */

/** Websites: exceptional web craft — a type-led page in a browser frame. */
function WebsiteCraft() {
  return (
    <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,#f1efea,#dedbd4)] p-[6%]" data-clip-img>
      <div className="window h-full">
        <div className="window-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="grid h-[calc(100%-31px)] grid-cols-[1.3fr_1fr] gap-4 p-4">
          <div className="flex flex-col justify-between">
            <p className="tiny !text-[8px]">Studio — since 2014</p>
            <p className="font-serif text-[clamp(1rem,2.2vw,1.6rem)] leading-[1.02]">
              Made for <em>people</em> who notice.
            </p>
            <div className="flex gap-1.5">
              <span className="h-5 w-16 rounded-full bg-ink" />
              <span className="h-5 w-12 rounded-full border border-ink/30" />
            </div>
          </div>
          <div className="rounded-md" style={{ background: "radial-gradient(120% 90% at 30% 15%, #d9d6cf 0%, #a9a59c 45%, #5f5d58 100%)" }} />
        </div>
      </div>
    </div>
  );
}

/** Company Brain: a credible sourced-answer workflow. */
function BrainFlow() {
  return (
    <div className="relative grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,#1a1a1a,#3a3a38)] p-[6%]" data-clip-img>
      <div className="grid w-full max-w-[86%] grid-cols-[auto_1fr] items-center gap-4">
        <div className="grid gap-2">
          {["Drive", "CRM", "Email", "Notes"].map((s) => (
            <span key={s} className="rounded-full border border-mist/25 px-3 py-1 text-center text-[9px] uppercase tracking-[0.15em] text-mist/75">
              {s}
            </span>
          ))}
        </div>
        <div className="rounded-xl bg-white p-3.5 shadow-2xl">
          <p className="ml-auto w-fit rounded-lg bg-ink/5 px-2.5 py-1.5 text-[10px]">Where did we land on the supplier terms?</p>
          <p className="mt-2.5 font-serif text-[clamp(0.85rem,1.6vw,1.05rem)] leading-snug">Net-30 agreed, with a review after the first quarter.</p>
          <div className="mt-2 flex gap-1.5">
            {["Email · 12 Mar", "Contract v2"].map((s) => (
              <span key={s} className="whitespace-nowrap rounded-full border border-ink/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.12em] text-ink/55">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── icons (line, 1.5px) ───────── */
function Icon({ name }: { name: "nodes" | "chat" | "loop" | "eye" | "check" | "minus" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === "nodes" && (
        <g {...p}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7 6h10M6 8l5 8M18 8l-5 8" />
        </g>
      )}
      {name === "chat" && (
        <g {...p}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M9 11l2 2 4-4" />
        </g>
      )}
      {name === "loop" && (
        <g {...p}>
          <path d="M4 12a8 8 0 0 1 14-5.3L20 9" />
          <path d="M20 4v5h-5" />
          <path d="M20 12a8 8 0 0 1-14 5.3L4 15" />
          <path d="M4 20v-5h5" />
        </g>
      )}
      {name === "eye" && (
        <g {...p}>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </g>
      )}
      {name === "check" && (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5L16 9.5" />
        </g>
      )}
      {name === "minus" && (
        <g {...p}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M8 12h8" />
        </g>
      )}
    </svg>
  );
}
