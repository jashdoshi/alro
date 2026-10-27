"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/lib/content";
import { ArrowUpRight, Check } from "./icons";
import { cx } from "./ui";

type Route = "digital" | "systems" | "unsure";

const routes: { id: Route; title: string; body: string }[] = [
  { id: "digital", title: "A digital experience", body: "A website, landing page, founder site or digital product." },
  { id: "systems", title: "An intelligent system", body: "Company knowledge, AI workflows, integrations or internal tools." },
  { id: "unsure", title: "Not sure yet", body: "You know what isn’t working, but not yet what the answer is." },
];

const budget = ["Prefer not to say", "Under 10k", "10k – 25k", "25k – 50k", "50k +", "Not sure yet"];

export function ContactForm({ initialRoute }: { initialRoute?: Route }) {
  const [route, setRoute] = useState<Route | undefined>(initialRoute);
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-start gap-5 py-6" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-orange-soft text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-[1.6rem] font-medium uppercase leading-tight">Thank you — your note has arrived.</h3>
        <p className="max-w-[46ch] text-[0.95rem] text-black/65">
          We read every message ourselves and will reply personally to the address you gave us, usually with a few times for a first conversation.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-[1rem] font-medium">What are you looking to build?*</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {routes.map((r, i) => (
            <label
              key={r.id}
              className={cx(
                "relative flex cursor-pointer flex-col gap-2 rounded-[22px] p-4 transition-all",
                route === r.id ? "bg-black text-white" : "bg-input text-black hover:bg-[#e6dfdf]",
              )}
            >
              <input type="radio" name="route" value={r.id} checked={route === r.id} onChange={() => setRoute(r.id)} className="sr-only" />
              <span className="flex items-center justify-between">
                <span className="text-[0.78rem] tabular-nums opacity-60">[{String(i + 1).padStart(2, "0")}]</span>
                <span className={cx("grid h-5 w-5 place-items-center rounded-full border transition-colors", route === r.id ? "border-orange-soft bg-orange-soft" : "border-black/30")}>
                  {route === r.id && <Check className="h-3 w-3 text-white" />}
                </span>
              </span>
              <span className="font-semibold uppercase text-[0.9rem]">{r.title}</span>
              <span className="text-[0.8rem] leading-snug opacity-70">{r.body}</span>
            </label>
          ))}
        </div>
        {!route && <p className="text-[0.82rem] text-black/55">Choose one to see a few short questions.</p>}
      </fieldset>

      {route && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" required autoComplete="name" />
          <Field label="Work email" name="email" type="email" required autoComplete="email" />
          <Field label="Company or website" name="company" optional className="sm:col-span-2" />

          {route === "digital" && (
            <>
              <Area label="What should the site achieve?" name="goals" hint="What it’s for, and what would make it a success. A few sentences is plenty." />
              <Field label="Who is it for?" name="audience" optional />
              <Field label="Current site" name="currentSite" optional placeholder="example.com" />
              <Select label="Ideal launch window" name="launch" options={["No date in mind", "Within 2 months", "2 – 4 months", "4 months or more", "Flexible"]} />
              <Select label="Budget range" name="budget" options={budget} />
            </>
          )}

          {route === "systems" && (
            <>
              <Area
                label="Which workflow or problem should it solve?"
                name="problem"
                hint="Where time goes today, or what’s hard to find. Please don’t include confidential details yet."
              />
              <Field label="Tools you use today" name="tools" optional placeholder="e.g. Google Drive, Slack, Notion, HubSpot" className="sm:col-span-2" />
              <Select
                label="How sensitive is the data?"
                name="sensitivity"
                options={["Not sure / prefer to discuss", "Mostly public information", "Internal, not sensitive", "Confidential or regulated"]}
              />
              <Select
                label="Where must it run?"
                name="deployment"
                options={["Not sure / prefer to discuss", "No preference", "Must run in our cloud account", "Must run on our own hardware"]}
              />
              <Select label="Budget range" name="budget" options={budget} className="sm:col-span-2" />
            </>
          )}

          {route === "unsure" && (
            <>
              <Area
                label="What isn’t working, or what would you like to change?"
                name="situation"
                hint="In your own words. We’ll help work out whether the answer is a website, an integration, an AI workflow — or none of these."
              />
              <Select label="Budget range" name="budget" options={budget} className="sm:col-span-2" />
            </>
          )}

          {/* honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Leave this empty
              <input name="website_url" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {state?.error && (
            <p className="rounded-2xl bg-red-soft/10 px-4 py-3 text-[0.9rem] text-red-soft sm:col-span-2" role="alert">
              {state.error}
            </p>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[44ch] text-[0.78rem] text-black/55">
              We use your details only to reply to you. See our{" "}
              <Link href="/privacy" className="text-black underline underline-offset-4">
                privacy notice
              </Link>
              . Prefer email?{" "}
              <a href={`mailto:${site.email}`} className="text-black underline underline-offset-4">
                {site.email}
              </a>
            </p>
            <button type="submit" className="btn btn-dark w-full justify-between sm:w-auto" disabled={pending}>
              <span>{pending ? "Sending…" : "Send message"}</span>
              <span className="puck">
                <ArrowUpRight />
              </span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  required,
  placeholder,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-2 text-[0.9rem]", className)}>
      <label htmlFor={name}>
        {label}
        {required && "*"} {optional && <span className="text-black/45">· Optional</span>}
      </label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className="field-light" />
    </div>
  );
}

function Area({ label, name, hint }: { label: string; name: string; hint: string }) {
  return (
    <div className="flex flex-col gap-2 text-[0.9rem] sm:col-span-2">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} className="field-light" aria-describedby={`${name}-hint`} />
      <p id={`${name}-hint`} className="text-[0.76rem] text-black/50">
        {hint}
      </p>
    </div>
  );
}

function Select({ label, name, options, className }: { label: string; name: string; options: string[]; className?: string }) {
  return (
    <div className={cx("flex flex-col gap-2 text-[0.9rem]", className)}>
      <label htmlFor={name}>
        {label} <span className="text-black/45">· Optional</span>
      </label>
      <select id={name} name={name} className="field-light" defaultValue={options[0]}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
