export type PinnedRepo = {
  name: string;
  description: string;
  language: string;
  stars?: string;
  href: string;
};

export const githubLogin = "hbegic20";

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "avlija",
    description:
      "Real estate listings for Bugojno and Srednjobosanski kanton — Next.js 16, Tailwind v4, Supabase.",
    language: "TypeScript",
    href: "https://github.com/hbegic20/avlija",
  },
  {
    name: "dzbugojno.ba",
    description: "Website for Dom zdravlja Bugojno, the town's public health centre.",
    language: "Website",
    href: "https://dzbugojno.ba",
  },
  {
    name: "fermented.film",
    description:
      "Website for Fermented Film, a film production services company working with international clients.",
    language: "Website",
    href: "https://www.fermented.film",
  },
];
