/**
 * Destinations used by the new navigation and home page.
 * The sitemap (skeleton doc) is /websites, /company-brain, /work, /about,
 * /contact. Until those pages are rebuilt, point at the closest existing page
 * so nothing 404s — change these when each page lands.
 */
export const routes = {
  home: "/",
  work: "/work",
  services: "/#services",
  about: "/studio", // → /about
  websites: "/digital-experiences", // → /websites
  companyBrain: "/company-intelligence", // → /company-brain
  contact: "/contact",
  privacy: "/privacy",
};

export const email = "hello@alro.studio";
