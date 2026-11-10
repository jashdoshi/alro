"use client";

import gsap from "gsap";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { Arrow } from "@/components/flow/bits";
import { LabMedia } from "@/components/home/lab-media";
import type { LabKind } from "./lab-kind";

export type IndexItem = {
  slug: string;
  title: string;
  label: string;
  practice: "Websites" | "Intelligent systems";
  year: string;
  media: LabKind;
  externalHref?: string;
};

type Filter = "all" | IndexItem["practice"];

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Websites", label: "Websites & experiences" },
  { id: "Intelligent systems", label: "Intelligent systems" },
];

/* The pointer-following preview only exists for a fine pointer with motion allowed. */
const PREVIEW_Q = "(hover: hover) and (pointer: fine)";
const REDUCE_Q = "(prefers-reduced-motion: reduce)";
function subscribe(cb: () => void) {
  const a = matchMedia(PREVIEW_Q);
  const b = matchMedia(REDUCE_Q);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}
const canPreview = () => matchMedia(PREVIEW_Q).matches && !matchMedia(REDUCE_Q).matches;

/**
 * Work index in the teardown's pattern: rows whose ink fill wipes up from
 * below, titles that slide 14px, and a preview that follows the pointer
 * (x free, y locked to the hovered row) with a fresh small tilt per row.
 */
export function WorkIndex({ items }: { items: IndexItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<string | null>(null);
  const preview = useSyncExternalStore(subscribe, canPreview, () => false);

  const list = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<{ move: (x: number, row: HTMLElement) => void; hide: () => void } | null>(null);

  const shown = filter === "all" ? items : items.filter((i) => i.practice === filter);

  useEffect(() => {
    const el = box.current;
    const root = list.current;
    if (!preview || !el || !root) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.85, autoAlpha: 0, rotation: 0 });
    const qx = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let current: string | null = null;
    let visible = false;
    let px = 0;
    let py = 0;

    const centre = (row: HTMLElement) => {
      const r = row.getBoundingClientRect();
      return r.top + r.height / 2;
    };
    const move = (x: number, row: HTMLElement) => {
      const slug = row.dataset.row ?? null;
      const y = centre(row);
      if (!visible) {
        gsap.set(el, { x, y });
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        visible = true;
      }
      if (slug !== current) {
        current = slug;
        setActive(slug);
        gsap.to(el, { rotation: gsap.utils.random(-2, 2), duration: 0.6, ease: "power3.out" });
      }
      qx(x);
      qy(y);
    };
    const hide = () => {
      if (!visible) return;
      visible = false;
      current = null;
      gsap.to(el, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    api.current = { move, hide };

    const track = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    // Scrolling can carry a row out from under a still pointer: follow it or hide.
    const onScroll = () => {
      if (!visible) return;
      const under = document.elementFromPoint(px, py)?.closest<HTMLElement>("[data-row]");
      if (under && root.contains(under)) move(px, under);
      else hide();
    };
    addEventListener("pointermove", track, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("pointermove", track);
      removeEventListener("scroll", onScroll);
      api.current = null;
      gsap.killTweensOf(el);
    };
  }, [preview]);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const row = (e.target as Element).closest<HTMLElement>("[data-row]");
    if (row) api.current?.move(e.clientX, row);
    else api.current?.hide();
  };

  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter the work" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.id === "all" ? items.length : items.filter((i) => i.practice === f.id).length;
            return (
              <button key={f.id} type="button" className="ghost-btn min-h-11" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
                <span className="ml-2 opacity-50" aria-hidden="true">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
        <p className="tiny" aria-live="polite">
          {shown.length === 1 ? "1 piece" : `${shown.length} pieces`} · each one labelled
        </p>
      </div>

      <div ref={list} onPointerMove={onMove} onPointerLeave={() => api.current?.hide()}>
        {shown.length === 0 ? (
          <p className="body border-t border-ink/12 py-10">Nothing here yet. We’d rather leave it empty than fill it with filler.</p>
        ) : (
          <ul className="m-0 list-none border-t border-ink/12 p-0">
            {shown.map((w, k) => {
              const isExternal = Boolean(w.externalHref);
              const RowLink = isExternal ? "a" : Link;

              return (
                <li key={w.slug} className="border-b border-ink/12">
                  <RowLink
                    href={w.externalHref ?? `/work/${w.slug}`}
                    data-row={w.slug}
                    data-cursor-invert
                    className="group relative block overflow-hidden text-copy no-underline"
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${w.title} — opens external portfolio in a new tab` }
                      : {})}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[600ms] ease-[var(--flow-ease)] group-hover:scale-y-100"
                    />
                    <div className="relative grid gap-5 py-7 md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:items-center md:gap-6 md:px-4 md:py-9">
                      {/* small-screen / touch stand-in for the pointer preview */}
                      <div className="pcard hidden max-w-[30rem] max-md:block md:col-span-3 [@media(hover:none)]:block" aria-hidden="true">
                        <div className="media">
                          <LabMedia kind={w.media} />
                        </div>
                      </div>
                      <span className="tiny tabular-nums transition-colors duration-500 group-hover:text-mist/60">{String(k + 1).padStart(2, "0")}</span>
                      <div className="grid min-w-0 gap-2 transition-transform duration-[600ms] ease-[var(--flow-ease)] group-hover:translate-x-[14px]">
                        <h3 className="text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] transition-colors duration-500 group-hover:text-paper">{w.title}</h3>
                        <span className="tiny transition-colors duration-500 group-hover:text-mist/70">{w.label}</span>
                      </div>
                      <div className="flex items-center justify-between gap-6 md:justify-end">
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-copy/55 transition-colors duration-500 group-hover:text-mist/70">
                          {w.practice} · {w.year}
                        </span>
                        <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:border-mist/30 group-hover:text-paper">
                          <Arrow className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </RowLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* portalled: a transformed ancestor would break position: fixed */}
      {preview &&
        createPortal(
          <div ref={box} className="pointer-events-none fixed left-0 top-0 z-[60] w-[clamp(16rem,24vw,22rem)] invisible" aria-hidden="true">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.75rem] shadow-[0_30px_60px_-15px_rgb(var(--shadow-rgb)/0.35)]">
              {items.map((w) => (
                <div key={w.slug} className={`pcard absolute inset-0 transition-opacity duration-300 ${active === w.slug ? "opacity-100" : "opacity-0"}`}>
                  <div className="media !rounded-none">
                    <LabMedia kind={w.media} />
                  </div>
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
