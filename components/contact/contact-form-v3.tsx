"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { Arrow, Swap } from "@/components/flow/bits";
import { routes } from "@/lib/routes";

export type Topic = "websites" | "company-brain" | "not-sure";

const topics: { id: Topic; title: string; body: string }[] = [
  { id: "websites", title: "Websites", body: "A new site, a redesign or a digital experience that needs to make a better first impression." },
  { id: "company-brain", title: "Company Brain", body: "Company knowledge, AI assistants, automations or integrations for the way your team works." },
  { id: "not-sure", title: "I’m not sure yet", body: "You know what isn’t working, just not yet what the answer is. That’s a fine place to start." },
];


/* Shared field look: soft grey pill, 16px text (no iOS zoom), 48px tall. */
const fieldCls =
  "w-full min-h-12 rounded-full border border-transparent bg-ink/[0.045] px-5 py-3 text-[16px] leading-normal text-ink placeholder:text-ink/40 transition-colors duration-300 hover:bg-ink/[0.07] focus:border-ink/40 focus:bg-white focus-visible:outline-offset-2 aria-[invalid=true]:border-ink";

/**
 * Service-aware qualification form. One choice decides which few questions
 * follow; the common details come last. Posts to the sendContact action.
 */
export function ContactFormV3({ initialTopic }: { initialTopic?: Topic }) {
  const [topic, setTopic] = useState<Topic | undefined>(initialTopic);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const errorId = useId();

  // Submit through a transition so React doesn't reset the fields if the server sends back an error.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const missing = new Set<string>();
    if (!String(data.get("name") ?? "").trim()) missing.add("name");
    const mail = String(data.get("email") ?? "").trim();
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) missing.add("email");
    if (!data.get("route")) missing.add("route");
    setInvalid(missing);
    startTransition(() => formAction(data));
  };

  // Move focus to the error so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (state?.error) errorRef.current?.focus();
  }, [state]);

  if (state?.ok) {
    return (
      <div className="grid gap-6 rounded-[1.5rem] border border-ink/12 bg-white/70 p-[clamp(1.75rem,4vw,3rem)]" role="status" aria-live="polite">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 className="h3">
          Thanks — your note <em>has arrived.</em>
        </h2>
        <p className="lead">We read every message ourselves and will reply personally.</p>
      </div>
    );
  }

  const showError = !!state?.error;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="grid gap-12" aria-describedby={showError ? errorId : undefined}>
      {/* 1 · what it's about */}
      <fieldset className="m-0 grid gap-5 border-0 p-0">
        <legend className="mb-5 grid gap-2 p-0">
          <span className="tiny">Step 01</span>
          <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-tight">What’s it about?</span>
        </legend>
        <div className="grid gap-3 md:grid-cols-3">
          {topics.map((t, k) => {
            const on = topic === t.id;
            return (
              <label
                key={t.id}
                className={`relative flex min-h-11 cursor-pointer flex-col gap-4 rounded-[1.25rem] border p-5 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-ink md:min-h-[13rem] md:p-6 ${
                  on ? "border-ink bg-ink text-paper" : "border-ink/12 bg-white/60 text-ink hover:border-ink/35"
                }`}
              >
                <input type="radio" name="route" value={t.id} checked={on} onChange={() => setTopic(t.id)} className="sr-only" />
                <span className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold tabular-nums tracking-[0.2em] ${on ? "text-mist/60" : "text-ink/45"}`}>{String(k + 1).padStart(2, "0")}</span>
                  <span className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${on ? "border-paper bg-paper text-ink" : "border-ink/25"}`} aria-hidden="true">
                    {on && (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    )}
                  </span>
                </span>
                <span className="font-serif text-[1.6rem] leading-tight md:mt-auto">{t.title}</span>
                <span className={`text-[14px] leading-snug ${on ? "text-mist/75" : "text-ink/60"}`}>{t.body}</span>
              </label>
            );
          })}
        </div>
        {!topic && <p className="tiny">Choose one and we’ll ask a few short questions.</p>}
      </fieldset>

      {/* 2 · a few service-specific questions */}
      {topic && (
        <div className="grid gap-6" key={topic}>
          <p className="grid gap-2">
            <span className="tiny">Step 02</span>
            <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-tight">A few specifics</span>
          </p>
          {topic === "websites" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Area label="What should the site achieve?" name="goals" hint="What it’s for, and what would count as a success. A few sentences is plenty." />
              <Field label="Current site" name="currentSite" optional placeholder="example.com" inputMode="url" autoComplete="url" />
              <Select label="Launch window" name="launch" options={["No date in mind", "Within 2 months", "2 – 4 months", "4 months or more", "Flexible"]} />
            </div>
          )}
          {topic === "company-brain" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Area label="Which workflow or problem should it help with?" name="problem" hint="Where the time goes today, or what’s hard to find. Please leave out anything confidential for now." />
              <Field label="Tools you use today" name="tools" optional placeholder="e.g. Google Drive, Slack, Notion, HubSpot" className="sm:col-span-2" />
              <Select label="How sensitive is the data?" name="sensitivity" options={["Not sure / prefer to discuss", "Mostly public information", "Internal, not sensitive", "Confidential or regulated"]} />
              <Select label="Where must it run?" name="deployment" options={["Not sure / prefer to discuss", "No preference", "In our own cloud account", "On our own hardware"]} />
            </div>
          )}
          {topic === "not-sure" && (
            <div className="grid gap-6">
              <Area
                label="What isn’t working?"
                name="situation"
                hint="In your own words. We’ll help work out whether the answer is a website, a Company Brain, something smaller — or nothing at all."
              />
            </div>
          )}
        </div>
      )}

      {/* 3 · about you */}
      <div className="grid gap-6">
        <p className="grid gap-2">
          <span className="tiny">Step {topic ? "03" : "02"}</span>
          <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-tight">About you</span>
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" name="name" autoComplete="name" required invalid={showError && invalid.has("name")} />
          <Field label="Work email" name="email" type="email" autoComplete="email" inputMode="email" required invalid={showError && invalid.has("email")} />
        </div>
      </div>

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {showError && (
        <p ref={errorRef} id={errorId} tabIndex={-1} role="alert" className="flex items-start gap-3 rounded-2xl border border-ink bg-white px-5 py-4 text-[15px] text-ink">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 flex-none" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5.5M12 16.5h.01" />
          </svg>
          <span>{state.error}</span>
        </p>
      )}

      <div className="flex flex-col items-start gap-6 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-[13px] leading-relaxed text-ink/55">
          We only use what you send to reply to you. See our{" "}
          <Link href={routes.privacy} className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            privacy notice
          </Link>
          .
        </p>
        <button type="submit" className="btn liquid min-h-12" data-magnetic="0.3" disabled={pending} aria-disabled={pending}>
          <Swap>{pending ? "Sending" : "Send your note"}</Swap>
          <Arrow />
        </button>
      </div>
    </form>
  );
}

/* ───────── fields ───────── */

function Label({ htmlFor, children, optional, required }: { htmlFor: string; children: ReactNode; optional?: boolean; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-4 px-1 text-[14px] font-medium text-ink/80">
      <span>
        {children}
        {required && (
          <span className="text-ink/45" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </span>
      {optional && <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink/40">Optional</span>}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  required,
  invalid,
  placeholder,
  autoComplete,
  inputMode,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  required?: boolean;
  invalid?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url";
  className?: string;
}) {
  const id = `cf-${name}`;
  return (
    <div className={`grid content-start gap-2 ${className}`}>
      <Label htmlFor={id} optional={optional} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        className={fieldCls}
      />
    </div>
  );
}

function Area({ label, name, hint }: { label: string; name: string; hint?: string }) {
  const id = `cf-${name}`;
  return (
    <div className="grid gap-2 sm:col-span-2">
      <Label htmlFor={id}>{label}</Label>
      <textarea id={id} name={name} rows={4} aria-describedby={hint ? `${id}-hint` : undefined} className={`${fieldCls} min-h-32 resize-y !rounded-[1.25rem] py-4`} />
      {hint && (
        <p id={`${id}-hint`} className="px-1 text-[13px] leading-relaxed text-ink/50">
          {hint}
        </p>
      )}
    </div>
  );
}

function Select({ label, name, options, optional, className = "" }: { label: string; name: string; options: string[]; optional?: boolean; className?: string }) {
  const id = `cf-${name}`;
  return (
    <div className={`grid content-start gap-2 ${className}`}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select id={id} name={name} defaultValue={options[0]} className={`${fieldCls} cursor-pointer appearance-none pr-12`}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
