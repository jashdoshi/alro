import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";
import { Logo } from "./ui";

const menu = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/digital-experiences", label: "Digital Experiences" },
  { href: "/intelligent-systems", label: "Intelligent Systems" },
  { href: "/company-intelligence", label: "Company Intelligence" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

/**
 * Footer after the reference: black rising into ember, a figure standing in
 * front of a full-width ALRO wordmark, the nav spread across the page.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden ember-bottom">
      <div className="wrap relative pt-20 md:pt-28">
        <div className="flex items-start justify-between gap-6">
          <Logo size={22} />
          <p className="t-label max-w-[18ch] text-right text-white/75">Clarity in how it looks, and how it works.</p>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="t-label">Write to us</p>
            <a href={`mailto:${site.email}`} className="w-fit border-b border-white/60 text-[1.15rem] transition-colors hover:border-orange-soft hover:text-orange-soft">
              {site.email}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="t-label">Studio</p>
            <p className="text-[1.15rem]">Independent · Founder-led</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <p className="t-label">Legal</p>
            <Link href="/privacy" className="w-fit border-b border-white/60 text-[1.15rem]">
              Privacy notice
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap relative mt-12 flex flex-col gap-2 text-[0.75rem] text-white/70 sm:flex-row sm:justify-between">
        <p>© 2026 ALRO · {site.descriptor}</p>
        <p>{site.tagline}</p>
      </div>

      {/* Figure in front of the wordmark; both run off the bottom edge */}
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-[2] w-[200vw] -translate-x-1/2 md:w-[min(1700px,104vw)]">
          <Image src="/ref-img/footer-figure.png" alt="" width={1950} height={567} sizes="(min-width:768px) 104vw, 200vw" className="h-auto w-full" />
        </div>
        <nav aria-label="Footer" className="wrap relative z-[3] grid grid-cols-2 gap-x-6 gap-y-3 pb-5 pt-[clamp(9rem,22vw,17rem)] sm:grid-cols-4 lg:flex lg:justify-between">
          {menu.map((l) => (
            <Link key={l.href} href={l.href} className="t-nav text-white hover:text-orange-soft">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="wordmark relative z-[1] -mb-[0.06em] text-center text-white" aria-hidden="true">
          ALRO
        </p>
      </div>
    </footer>
  );
}
