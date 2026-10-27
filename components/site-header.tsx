"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { Close } from "./icons";
import { Logo, cx } from "./ui";

const left = [
  { href: "/work", label: "Work" },
  { href: "/digital-experiences", label: "Digital Experiences" },
  { href: "/intelligent-systems", label: "Intelligent Systems" },
];
const right = [
  { href: "/company-intelligence", label: "Company Intelligence" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const item = (href: string) =>
    cx("t-nav transition-colors hover:text-white", pathname === href || pathname.startsWith(href + "/") ? "text-white" : "text-white/80");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 md:px-4 md:pt-3">
        <div
          className={cx(
            "mx-auto flex h-[58px] max-w-[1440px] items-center justify-between rounded-full px-5 transition-[background,box-shadow,backdrop-filter] duration-500 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8",
            scrolled && "lg lg-dark lg-refract",
          )}
        >
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {left.map((l) => (
              <Link key={l.href} href={l.href} className={item(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/" aria-label="ALRO — home" className="justify-self-center">
            <Logo size={19} />
          </Link>
          <nav className="hidden items-center justify-end gap-9 lg:flex" aria-label="Secondary">
            {right.map((l) => (
              <Link key={l.href} href={l.href} className={item(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span className="flex w-6 flex-col gap-[5px]">
              <span className="h-[1.5px] bg-white" />
              <span className="h-[1.5px] bg-white" />
              <span className="h-[1.5px] bg-white" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu: black into ember, as in the phone reference */}
      <div
        className={cx("fixed inset-0 z-[60] flex flex-col px-6 pb-8 pt-5 transition-[opacity,transform] duration-500 lg:hidden", open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0")}
        style={{ background: "radial-gradient(120% 60% at 50% 115%, #ff6a1a 0%, #e83a25 30%, #5a0802 58%, #100101 80%)" }}
        aria-hidden={!open}
      >
        <div className="flex h-[48px] items-center justify-between">
          <Logo size={18} />
          <button type="button" className="-mr-2 grid h-11 w-11 place-items-center" aria-label="Close menu" onClick={() => setOpen(false)}>
            <Close className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
          {[{ href: "/", label: "Home" }, ...left, ...right].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cx("py-1.5 text-[1.55rem] uppercase leading-tight", pathname === l.href ? "text-white" : "text-white/55")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <p className="t-label text-white/70">Write to us</p>
          <a href={`mailto:${site.email}`} className="w-fit border-b border-white/70 text-[1.1rem]">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
