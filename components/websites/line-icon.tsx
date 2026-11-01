/* Line icons (1.5px) in the home page's set, extended for the inner pages. */

export type LineIconName = "eye" | "check" | "minus" | "type" | "motion" | "wrench" | "doc" | "key" | "people" | "compass";

export function LineIcon({ name, className }: { name: LineIconName; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
      {name === "type" && (
        <g {...p}>
          <path d="M5 7V5h14v2" />
          <path d="M12 5v14" />
          <path d="M9 19h6" />
        </g>
      )}
      {name === "motion" && (
        <g {...p}>
          <path d="M3 17c4 0 5-10 9-10s5 10 9 10" />
          <circle cx="12" cy="7" r="1.6" />
        </g>
      )}
      {name === "wrench" && (
        <g {...p}>
          <path d="M14.5 5.5a4 4 0 0 0 5 5L12 18a2.1 2.1 0 0 1-3-3z" />
          <path d="M14.5 5.5L17 3l4 4-2.5 2.5" />
          <path d="M5 21l3-3" />
        </g>
      )}
      {name === "doc" && (
        <g {...p}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4" />
          <path d="M9 12h6M9 16h4" />
        </g>
      )}
      {name === "key" && (
        <g {...p}>
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l9-9" />
          <path d="M17 6l2 2M15 8l2 2" />
        </g>
      )}
      {name === "people" && (
        <g {...p}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5" />
          <path d="M15.5 14.2c2.6-.4 4.8 1 5.5 4.3" />
        </g>
      )}
      {name === "compass" && (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5z" />
        </g>
      )}
    </svg>
  );
}
