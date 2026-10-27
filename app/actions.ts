"use server";

export type ContactState = { ok: boolean; error?: string } | null;

/**
 * Contact form handler. Delivery is not wired up yet — connect it to the
 * email/inbox provider named in the privacy notice before launch.
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden field, people don't.
  if (String(form.get("website_url") ?? "").trim()) return { ok: true };

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const route = String(form.get("route") ?? "");
  if (!name || !email || !route) return { ok: false, error: "Please add your name, a work email, and what you’re looking to build." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "That email address doesn’t look quite right." };

  const entries = Object.fromEntries(Array.from(form.entries()).filter(([k]) => !k.startsWith("$")));
  console.info("[contact] new enquiry", entries);
  return { ok: true };
}
