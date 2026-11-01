"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

/** Switches light ↔ dark (beige on near-black). Persisted; first visit follows the OS. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const html = document.documentElement;
    html.classList.add("theme-switching");
    html.dataset.theme = next;
    try {
      localStorage.setItem("alro-theme", next);
    } catch {}
    window.setTimeout(() => html.classList.remove("theme-switching"), 700);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`relative grid h-10 w-10 flex-none place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink/40 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
        {/* half-filled disc: reads as "contrast" in both themes; rotates on switch */}
        <g style={{ transform: theme === "dark" ? "rotate(180deg)" : "none", transformOrigin: "12px 12px", transition: "transform .6s var(--flow-ease)" }}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
        </g>
      </svg>
    </button>
  );
}
