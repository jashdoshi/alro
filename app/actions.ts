"use server";

export type ContactState = { ok: boolean; error?: string } | null;

/** What the enquiry is about: the three choices on /contact. */
const topics = ["websites", "company-brain", "not-sure"] as const;
type Topic = (typeof topics)[number];

/** Values posted by the older form (still mounted on legacy pages), mapped onto the new topics. */
const legacy: Record<string, Topic> = { digital: "websites", systems: "company-brain", unsure: "not-sure" };

function toTopic(value: string): Topic | null {
  if ((topics as readonly string[]).includes(value)) return value as Topic;
  return legacy[value] ?? null;
}

/**
 * Contact form handler. Delivery is not wired up yet — connect it to the
 * email/inbox provider named in the privacy notice before launch.
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden field, people don't.
  if (String(form.get("website_url") ?? "").trim()) return { ok: true };

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const route = toTopic(String(form.get("route") ?? ""));
  if (!name || !email || !route) return { ok: false, error: "Please add your name, a work email, and what you’d like to talk about." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "That email address doesn’t look quite right." };

  const entries = Object.fromEntries(
    Array.from(form.entries())
      .filter(([k]) => !k.startsWith("$") && k !== "website_url")
      .map(([k, v]) => [k, typeof v === "string" ? v.trim().slice(0, 4000) : "[file]"]),
  );
  console.info("[contact] new enquiry", { ...entries, route });
  return { ok: true };
}
