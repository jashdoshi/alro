"use client";

import { useState } from "react";
import type { Faq as FaqItem } from "@/lib/content";
import { Minus, Plus } from "./icons";
import { cx } from "./ui-legacy";

export function Faq({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className={cx("rounded-[22px] transition-colors", isOpen ? "card-hot" : "card")}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7 md:py-6"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-[1.08rem] font-medium tracking-[-0.03em] md:text-[1.2rem]">{it.q}</span>
              <span className={cx("grid h-9 w-9 flex-none place-items-center rounded-full border transition-colors", isOpen ? "border-accent bg-accent text-white" : "border-line-2 text-fg-2")}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div className={cx("grid transition-[grid-template-rows] duration-500 ease-out-soft", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="body max-w-[62ch] px-5 pb-6 md:px-7">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
