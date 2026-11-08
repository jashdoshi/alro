import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, SectionHead, Swap } from "@/components/flow/bits";
import { PageHero, Underlined } from "@/components/flow/page-hero";
import { LabMedia } from "@/components/home/lab-media";
import { LineIcon, type LineIconName } from "@/components/websites/line-icon";
import { OfferIndex, type Offer } from "@/components/websites/offer-index";
import { routes } from "@/lib/routes";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Bespoke websites",
  description:
    "Your first meeting with a potential customer often happens without you in the room. alro builds distinctive websites that tell your story, earn attention and make that introduction count.",
};

const enquire = `${routes.contact}?topic=websites`;

const offers: Offer[] = [
  { title: "Company and studio sites", line: "For businesses whose work is better than their website currently suggests." },
  { title: "Founder and personal-brand sites", line: "For people whose name is the business. Personal and considered, never a CV with a gradient." },
  { title: "SaaS marketing sites", line: "Explain the product clearly, show it honestly and make the next step obvious." },
  { title: "Landing pages", line: "One page, one job. A launch, a campaign or an offer that deserves its own room." },
  { title: "Interface design", line: "Product screens and design systems that look like they belong to the same company as the website." },
  { title: "Frontend build", line: "Already have a design? We build it properly: responsive, accessible and quick to load." },
];

const principles: { t: string; c: string; icon: LineIconName }[] = [
  { t: "Type first.", c: "Words and typography carry most of a website. We get them right before we decorate anything.", icon: "type" },
  { t: "Motion with purpose.", c: "Movement should guide attention, not compete for it. And it steps aside for anyone who prefers less.", icon: "motion" },
  { t: "Built to be maintained.", c: "Clean code, sensible structure and documentation, so changing a headline doesn’t need a phone call to us.", icon: "wrench" },
];

const deliverables = [
  { t: "Discovery and positioning", c: "Who it’s for, what they need to believe and what makes you the obvious choice." },
  { t: "Messaging and page plan", c: "What each page says, in what order, and what it asks the visitor to do next." },
  { t: "Art direction", c: "Type, colour, imagery and tone, set once so every page feels like the same company." },
  { t: "Responsive design", c: "Layouts rethought for phones, not just shrunk. That’s usually where people meet you first." },
  { t: "Production development", c: "Hand-built, versioned code on a managed platform, in your name where possible." },
  { t: "Accessibility", c: "Contrast, keyboard navigation, labelled controls and reduced-motion support, built in from the start." },
  { t: "Performance", c: "Fast loading, sensible images and nothing heavy that hasn’t earned its place." },
  { t: "Analytics setup", c: "Measurement that answers real questions, set up before launch rather than after." },
  { t: "Documented handover", c: "Code, design files and decisions written down, so the site stays yours." },
];

/* Skeleton section 07 headings and copy, with what each stage means on a website project. */
const process = [
  {
    t: "Figure out the real problem.",
    c: "We get into your business, audience, existing tools and constraints. The goal is to solve the right problem, not just the most interesting one.",
    site: ["Audience", "Positioning", "Current site review"],
  },
  {
    t: "Make the plan make sense.",
    c: "You’ll know what we’re building, why we’re building it, what it costs and what success should look like.",
    site: ["Written proposal", "Page plan", "Timeline"],
  },
  {
    t: "Build. Test. Refine.",
    c: "We make the work tangible early, gather feedback and keep improving until it does what it’s supposed to.",
    site: ["Art direction", "Design", "Development", "Real-device testing"],
  },
  {
    t: "Launch isn’t the whole story.",
    c: "We hand over properly and can continue supporting, maintaining and improving what we’ve built.",
    site: ["Launch", "Analytics", "Handover", "Optional care"],
  },
];

const siteWork = work.filter((w) => w.slug === "birthday-website" || w.slug === "founder-one-portfolio");
const labKinds = { "birthday-website": "story", "founder-one-portfolio": "design" } as const;

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Bespoke websites"
        top="An introduction"
        bottom={<Underlined>worth making.</Underlined>}
        lead="Your first meeting with a potential customer often happens without you in the room. We build distinctive websites that tell your story, earn attention and make that introduction count."
        actions={
          <>
            <Link href={enquire} className="btn liquid min-h-11" data-magnetic="0.3">
              <Swap>Start a project</Swap>
              <Arrow />
            </Link>
            <Link href="#work" className="line-link relative after:absolute after:inset-x-0 after:-inset-y-3">
              See the work
              <Arrow />
            </Link>
          </>
        }
        aside={<SiteCraft />}
      />

      {/* velocity marquee: the skeleton's website vocabulary */}
      <div className="marquee" data-marquee aria-hidden="true">
        <div className="mtrack" data-marquee-track data-marquee-speed="70">
          <div className="mgroup">
            {["Strategy", "Design", "Development", "Interactions", "Typography", "Accessibility", "Performance", "Handover"].map((w) => (
              <span key={w} className="contents">
                <span>{w}</span>
                <span className="dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═════════ WHAT WE MAKE ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="What we make"
              title={
                <>
                  Different shapes. <em>Same standard.</em>
                </>
              }
              lead="One page or fifty, the brief doesn’t really change: tell your story clearly, earn attention and make the next step obvious."
            />
            <p className="tiny max-w-[18rem] md:text-right" data-reveal="fade">
              Strategy · Design · Development · Interactions
            </p>
          </div>
          <OfferIndex offers={offers} href={enquire} />
        </div>
      </section>

      {/* ═════════ DESIGN PHILOSOPHY ═════════ */}
      <section className="section bg-white/60">
        <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
          <span className="eyebrow" data-reveal="fade">
            Design philosophy
          </span>
          <h2 className="manifesto max-w-[26ch]" data-scrub-words>
            Most websites say the right things. Very few say them in a way anyone remembers.
          </h2>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
            <p className="lead" data-reveal="fade">
              We care about how a site looks, how it works and whether it actually helps someone decide to get in touch. Every visual and every interaction
              has to earn its place.
            </p>
            <p className="quote" data-reveal="fade">
              A template can get you online. It can’t make anyone remember you.
            </p>
          </div>
          <div className="grid gap-10 border-t border-ink/12 pt-10 md:grid-cols-3" data-reveal-group>
            {principles.map((p) => (
              <div key={p.t} className="grid content-start gap-4">
                <span className="ico">
                  <LineIcon name={p.icon} />
                </span>
                <h3 className="text-[1.6rem]">{p.t}</h3>
                <p className="body">{p.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ DELIVERABLES ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)]">
          <div className="grid content-start gap-8 lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="Deliverables"
              title={
                <>
                  What a project <em>actually</em> includes.
                </>
              }
              lead="Every project is scoped in writing, but most websites we make include all of this. Nothing here is an optional extra you discover later."
            />
            <p className="tiny max-w-[24rem]" data-reveal="fade">
              Hosting, domains, fonts and subscriptions are listed separately, with accounts opened in your name where we can.
            </p>
          </div>
          <article className="panel glass" data-reveal="fade">
            <span className="ghost-num" data-drift aria-hidden="true">
              09
            </span>
            <ul className="relative grid gap-x-10 sm:grid-cols-2">
              {deliverables.map((d, k) => (
                <li key={d.t} className={`grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 border-ink/12 py-5 ${k > 0 ? "border-t" : ""} ${k === 1 ? "sm:border-t-0" : ""}`}>
                  <LineIcon name="check" className="mt-0.5 h-6 w-6 text-ink/70" />
                  <div className="grid gap-1.5">
                    <h3 className="font-serif text-[1.3rem] leading-snug">{d.t}</h3>
                    <p className="body">{d.c}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ═════════ HOW A WEBSITE PROJECT RUNS ═════════ */}
      <section className="section">
        <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="How a website project runs"
              title={
                <>
                  We like a good idea. <em>We like a working one more.</em>
                </>
              }
              lead="We start by understanding what you’re trying to achieve, not by deciding which technology to throw at it. Then it’s four stages, and you’ll always know which one we’re in."
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
                  <div className="copy chips mt-1">
                    <span className="sr-only">On a website project:</span>
                    {p.site.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ PORTFOLIO ═════════ */}
      <section id="work" className="section scroll-mt-24">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHead
              eyebrow="From the lab · Websites"
              title={
                <>
                  The work, <em>honestly labelled.</em>
                </>
              }
              lead="A personal project and work made by one of the founders before alro. Each one says exactly what it is, and what it isn’t."
            />
            <Link href={routes.work} className="line-link relative after:absolute after:inset-x-0 after:-inset-y-3 self-start md:self-end" data-reveal="fade">
              See all work
              <Arrow />
            </Link>
          </div>
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 md:grid-cols-2 md:[&>*:nth-child(even)]:mt-24">
            {siteWork.map((w) => (
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

      {/* ═════════ ENQUIRY ═════════ */}
      <section className="section !pt-0">
        <div className="wrap">
          <article className="panel glass grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end" data-reveal="fade">
            <div className="relative grid gap-5">
              <span className="eyebrow">Project enquiry</span>
              <h2 className="h2 max-w-[18ch]">
                Got a website that <em>undersells</em> you?
              </h2>
              <p className="lead">
                Tell us what you’re working on, what isn’t working and when you’d like it live. We’ll reply with questions or a next step. Anything we
                propose comes in writing first: deliverables, timeline and price.
              </p>
            </div>
            <div className="relative grid gap-6 lg:justify-items-end">
              <ul className="grid gap-2 lg:text-right">
                {["Your current site, if there is one", "A rough timeline", "A budget range, if you have one"].map((t) => (
                  <li key={t} className="tiny">
                    {t}
                  </li>
                ))}
              </ul>
              <Link href={enquire} className="btn liquid min-h-11 w-fit" data-magnetic="0.3">
                <Swap>Start a project</Swap>
                <Arrow />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

/* ───────── hero aside: a type-led site on desktop and phone ───────── */

function SiteCraft() {
  return (
    <figure className="group relative mx-auto w-full max-w-[640px] pb-10 md:pb-6" role="img" aria-label="Illustration: a bespoke website shown on desktop and on a phone">
      <div aria-hidden="true">
        {/* desktop */}
        <div className="window w-[88%]">
          <div className="window-bar">
            <i />
            <i />
            <i />
            <span className="ml-3 truncate rounded-full bg-ink/[0.05] px-3 py-0.5 text-[9px] tracking-[0.08em] text-ink/45">your-company.com</span>
          </div>
          <div className="grid gap-4 p-[clamp(0.9rem,2.4vw,1.4rem)]">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[12px] font-semibold">your company.</span>
              <span className="flex gap-2">
                <i className="h-1 w-6 rounded-full bg-ink/20" />
                <i className="h-1 w-6 rounded-full bg-ink/20" />
                <i className="hidden h-1 w-6 rounded-full bg-ink/20 sm:block" />
                <i className="h-1 w-8 rounded-full bg-ink" />
              </span>
            </div>
            <div className="grid grid-cols-[1.25fr_1fr] items-end gap-4">
              <div className="grid gap-3">
                <p className="tiny !text-[7px]">Introducing</p>
                <p className="font-serif text-[clamp(1.05rem,2.6vw,1.9rem)] leading-[1.02]">
                  Good work, <em>introduced properly.</em>
                </p>
                <div className="flex gap-1.5">
                  <span className="h-4 w-14 rounded-full bg-ink" />
                  <span className="h-4 w-10 rounded-full border border-ink/30" />
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src="/images/alro-web-craft.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 220px, 34vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--quint)] group-hover:scale-[1.06]"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-ink/10 pt-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="grid gap-1.5">
                  <i className="h-1 w-6 rounded-full bg-ink/30" />
                  <i className="h-1 w-full rounded-full bg-ink/10" />
                  <i className="h-1 w-3/4 rounded-full bg-ink/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* phone */}
        <div className="absolute bottom-0 right-0 w-[27%] min-w-[84px] rounded-[1.4rem] border border-ink/10 bg-white p-1.5 shadow-[0_30px_60px_-20px_rgb(var(--shadow-rgb)/0.3)] transition-transform duration-700 ease-[var(--quint)] group-hover:-translate-y-2">
          <div className="grid aspect-[9/18] content-start gap-2 overflow-hidden rounded-[1.05rem] bg-paper p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-serif text-[7px] font-semibold">your company.</span>
              <span className="grid gap-[2px]">
                <i className="h-px w-2.5 bg-ink" />
                <i className="h-px w-2.5 bg-ink" />
              </span>
            </div>
            <p className="mt-2 font-serif text-[clamp(0.6rem,1.4vw,0.85rem)] leading-[1.05]">
              Good work, <em>introduced properly.</em>
            </p>
            <span className="h-2.5 w-10 rounded-full bg-ink" />
            <div className="relative mt-1 aspect-square overflow-hidden rounded">
              <Image src="/images/alro-web-craft.png" alt="" fill sizes="120px" className="object-cover" />
            </div>
            <i className="h-1 w-full rounded-full bg-ink/10" />
            <i className="h-1 w-2/3 rounded-full bg-ink/10" />
          </div>
        </div>
      </div>
    </figure>
  );
}
