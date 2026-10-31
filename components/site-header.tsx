"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { email, routes } from "@/lib/routes";
import { Arrow, Swap } from "./flow/bits";

const links = [
  { href: routes.work, label: "work" },
  { href: routes.services, label: "services" },
  { href: routes.about, label: "about" },
];

/** Floating glass pill: wordmark, three light links with a sliding pill, one black button. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);
  // the motion engine intercepts link clicks for page transitions; close on its signal
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("flow:navigate", close);
    return () => window.removeEventListener("flow:navigate", close);
  }, []);

  return (
    <>
      <header id="siteHeader" className="fixed inset-x-0 top-[calc(16px+env(safe-area-inset-top,0px))] z-50 px-4">
        <nav className="glass mx-auto flex max-w-[46rem] items-center justify-between gap-4 rounded-full py-2.5 pl-6 pr-3" aria-label="Primary">
          <Link href={routes.home} className="text-[1.15rem] font-bold tracking-[-0.03em] no-underline" aria-label="alro. home">
            alro.
          </Link>
          <div className="relative hidden items-center gap-7 text-[13px] font-medium uppercase tracking-[0.1em] text-ink/80 md:flex" data-nav-pill>
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="relative z-[1] no-underline">
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/#contact" className="btn liquid sm hidden md:inline-flex" data-magnetic="0.25">
            <Swap>let’s talk</Swap>
            <Arrow />
          </Link>
          <button type="button" className="ghost-btn md:hidden" aria-expanded={open} aria-controls="mobileMenu" onClick={() => setOpen(true)}>
            menu
          </button>
        </nav>
      </header>

      {/* compact mobile menu */}
      <div
        id="mobileMenu"
        className={`on-dark fixed inset-0 z-[60] flex flex-col px-6 pb-8 pt-6 transition-[opacity,transform] duration-500 md:hidden ${open ? "opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`}
        aria-hidden={!open}
        data-cursor-invert
      >
        <div className="flex items-center justify-between">
          <span className="text-[1.15rem] font-bold tracking-[-0.03em]">alro.</span>
          <button type="button" className="ghost-btn" onClick={() => setOpen(false)}>
            close
          </button>
        </div>
        <nav className="mt-14 grid gap-2" aria-label="Mobile">
          {[{ href: routes.home, label: "home" }, ...links, { href: "/#contact", label: "let’s talk" }].map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-serif text-[2.6rem] leading-tight text-mist no-underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={`mailto:${email}`} className="mt-auto text-[13px] uppercase tracking-[0.2em] text-mist/70">
          {email}
        </a>
      </div>
    </>
  );
}
