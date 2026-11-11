export type PinnedRepo = {
  name: string;
  description: string;
  language: string;
  stars: string;
  href: string;
};

/** Fallback pinned repos; replaced by GitHub GraphQL data once GITHUB_TOKEN is wired up. */
export const pinnedRepos: PinnedRepo[] = [
  {
    name: "[repo-name]",
    description: "[What it does.]",
    language: "[Lang]",
    stars: "[—]",
    href: "#",
  },
  {
    name: "[repo-name]",
    description: "[What it does.]",
    language: "[Lang]",
    stars: "[—]",
    href: "#",
  },
  {
    name: "[repo-name]",
    description: "[What it does.]",
    language: "[Lang]",
    stars: "[—]",
    href: "#",
  },
];
