export type PinnedRepo = {
  name: string;
  description: string;
  language: string;
  stars: string;
  href: string;
};

export const githubLogin = "hbegic20";

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "avlija",
    description:
      "Real estate listings for Bugojno and Srednjobosanski kanton — Next.js 16, Tailwind v4, Supabase.",
    language: "TypeScript",
    stars: "0",
    href: "https://github.com/hbegic20/avlija",
  },
  {
    name: "tabla-app",
    description:
      "Two-sided learning app with an AI tutor, flashcards and quizzes — React + Vite on Supabase.",
    language: "TypeScript",
    stars: "0",
    href: "https://github.com/hbegic20/tabla-app",
  },
  {
    name: "marketplace-agent",
    description:
      "NestJS + Prisma API behind an AI-powered local services marketplace, with public and admin search.",
    language: "TypeScript",
    stars: "0",
    href: "https://github.com/hbegic20/marketplace-agent",
  },
];
