import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// The site is now a single scrolling home page (with anchor sections)
// plus the SkyWrite case study as the one remaining standalone route.
// Old URLs (/about, /projects, etc.) 301-redirect via next.config.mjs
// and are intentionally NOT listed here — a sitemap should only list
// canonical URLs, not ones that immediately redirect elsewhere.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects/skywrite"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
