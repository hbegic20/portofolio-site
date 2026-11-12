import { links } from "@/content/links";
import { profile } from "@/content/profile";

/** Absolute site origin: explicit env, else Vercel's production domain, else localhost. */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

/** Content placeholders look like `[Project name]`; they must never reach metadata. */
export const isPlaceholder = (value: string) => /\[.*\]/.test(value);

export const siteTitle = `${profile.name} — ${profile.role}`;
export const siteDescription = profile.hero.intro;

/** Real profile URLs only (GitHub, LinkedIn) — for JSON-LD `sameAs`. */
export const sameAs = links
  .filter((l) => l.id !== "email" && !isPlaceholder(l.href))
  .map((l) => l.href);
