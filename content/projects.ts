export type ArchNode = {
  label: string;
  highlight?: boolean;
};

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  hash: string;
  name: string;
  oneLiner: string;
  role: string;
  timeline: string;
  team: string;
  stack: string[];
  media: { src: string; alt: string; type: "image" | "video"; mobileSrc?: string } | null;
  overview: { problem: string; built: string; hardPart: string };
  architecture?: { nodes: ArchNode[]; tradeoff: string };
  code?: { filename: string; lang: string; snippet: string };
  results?: { metrics: Metric[]; learned: string };
  links: { demo?: string; source?: string };
};

const placeholderNodes: ArchNode[] = [
  { label: "Web app" },
  { label: "CDN" },
  { label: "API", highlight: true },
  { label: "Postgres + Redis" },
  { label: "Workers" },
];

function placeholder(n: number, hash: string): Project {
  return {
    slug: `project-${n}`,
    hash,
    name: `[Project name ${n}]`,
    oneLiner: "[One line: what it is and who it's for.]",
    role: "[Role]",
    timeline: "[Month YYYY – Month YYYY]",
    team: "[Team size]",
    stack: ["[tech]", "[tech]", "[tech]", "[tech]"],
    media: null,
    overview: {
      problem: "[What problem did users or the business have?]",
      built: "[What did you build, and what was your part?]",
      hardPart: "[The hardest technical challenge and how you solved it.]",
    },
    architecture: {
      nodes: placeholderNodes,
      tradeoff: "[One key architectural trade-off and why you made it.]",
    },
    code: {
      filename: "[path/to/file.ts]",
      lang: "ts",
      snippet: [
        "// [Paste one real, representative snippet here — 10–25 lines]",
        "export async function handler(req: Request): Promise<Response> {",
        '  const data = await fetchSomething("[replace me]");',
        "  return Response.json(data, { status: 200 });",
        "}",
      ].join("\n"),
    },
    links: { demo: "#", source: "#" },
  };
}

const bragg = placeholder(1, "b4a6c19");
const avlija = placeholder(2, "7cfc0cd");
const gymTracker = placeholder(3, "cb0b284");
const juliusBaer = placeholder(4, "e9c41a8");

const avlijaSnippet =
  'import { dayMs } from "@/lib/time/duration";\n\nconst expiringSoonDays = 7;\nconst renewWindowDays = 14;\nexport const maxActiveListings = 10;\n\nexport function daysUntil(isoDate: string | null, now: number): number | null {\n  if (!isoDate) {\n    return null;\n  }\n  return Math.ceil((new Date(isoDate).getTime() - now) / dayMs);\n}\n\nexport function isExpiringSoon(expiresAt: string | null, now: number): boolean {\n  const days = daysUntil(expiresAt, now);\n  return days !== null && days < expiringSoonDays;\n}\n\nexport function canRenew(status: string, expiresAt: string | null, now: number): boolean {\n  if (status === "archived") {\n    return true;\n  }\n  const days = daysUntil(expiresAt, now);\n  return status === "active" && days !== null && days < renewWindowDays;\n}';

const gymTrackerSnippet =
  "const NEW_ROW: SyncState = { version: 1, syncedVersion: 0, deleted: false }\n\nfunction isUnsynced(row: SyncState): boolean {\n  return row.version > row.syncedVersion\n}\n\nasync function markSynced(table: Table<SyncState & { id: string }, string>, snapshot: Array<SyncState & { id: string }>): Promise<void> {\n  for (const row of snapshot) {\n    const current = await table.get(row.id)\n    if (!current || current.version !== row.version) continue\n    if (current.deleted) await table.delete(row.id)\n    else await table.update(row.id, { syncedVersion: row.version })\n  }\n}";

export const projects: Project[] = [
  {
    ...bragg,
    slug: "bragg-gaming",
    name: "Bragg Gaming",
    oneLiner: "Online casino brands across Europe: 711 (NL and BE), MerkurXtip (CZ) and Jacks.nl.",
    role: "Frontend Web Developer",
    timeline: "Jun 2021 – Jun 2026",
    media: {
      type: "image",
      src: "/projects/bragg-711-desktop.jpg",
      mobileSrc: "/projects/bragg-711-mobile.jpg",
      alt: "711.nl casino home page: tournament banner above rows of top game tiles",
    },
    stack: ["PHP", "Laravel", "Blade", "Vue 2", "Next.js", "TypeScript", "SCSS", "Figma"],
    overview: {
      ...bragg.overview,
      built:
        "Frontend for the casino brands on a custom CMS built with PHP, Laravel and Blade: a structured SCSS codebase and atomic components in Vue 2, later built with Next.js and TypeScript with tests, all implemented from Figma designs.",
    },
    architecture: undefined,
    code: undefined,
    links: {},
  },
  {
    ...avlija,
    slug: "avlija",
    name: "Avlija",
    oneLiner: "Real estate listings for Bugojno and Srednjobosanski kanton.",
    media: {
      type: "image",
      src: "/projects/avlija-desktop.png",
      mobileSrc: "/projects/avlija-mobile.png",
      alt: "Avlija home page: listing search by municipality, type and price beside a map of Central Bosnia's municipalities",
    },
    role: "[Your role]",
    timeline: "Oct 2026 – present",
    stack: ["Next.js 16", "Tailwind CSS v4", "Supabase", "Leaflet", "Zod"],
    overview: {
      ...avlija.overview,
      built:
        "A listings site with photo uploads, maps, accounts with email confirmation, favourites and reports, plus an admin area for the reports queue, hiding listings and managing users.",
      hardPart:
        "Locking data down with Postgres Row Level Security: an automated test suite checks the policies against the real project, and admin rights are granted only after an email is confirmed, so registering someone else's address grants nothing.",
    },
    architecture: {
      nodes: [
        { label: "Next.js app" },
        { label: "Vercel" },
        { label: "Supabase Auth" },
        { label: "Postgres + RLS", highlight: true },
        { label: "GitHub Actions" },
      ],
      tradeoff:
        "The database is backed up daily by GitHub Actions, but the dump is only uploaded encrypted (AES-256): artifacts of a public repository can be downloaded by any signed-in GitHub user.",
    },
    code: { filename: "src/lib/listings/expiry.ts", lang: "ts", snippet: avlijaSnippet },
    links: {
      demo: "https://avlija-zeta.vercel.app",
      source: "https://github.com/hbegic20/avlija",
    },
  },
  {
    ...gymTracker,
    slug: "gym-tracker",
    name: "Gym Tracker",
    oneLiner: "Installable, offline-first gym log for logging sets on a phone between sets.",
    role: "Solo developer",
    team: "Just me",
    timeline: "Nov 2026 – present",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Dexie",
      "Supabase",
      "PWA",
      "Vitest",
    ],
    media: {
      type: "image",
      src: "/projects/gym-tracker-overview.jpg",
      mobileSrc: "/projects/gym-tracker-today-mobile.jpg",
      alt: "Gym Tracker overview: next workout A2 Chest + Back with its five exercises, weekly progress and sets per muscle this week",
    },
    overview: {
      problem:
        "Logging sets on an iPhone between sets has to be instant and keep working without a signal.",
      built:
        "A PWA to plan a training rotation, log sets with a rest timer, supersets and plate math, and track progress with estimated 1RM, PRs, weekly volume per muscle and a year heatmap. It has about 900 exercises, CSV import from Strong, Hevy and FitNotes, and English plus Bosnian/Croatian/Serbian.",
      hardPart:
        "Offline-first saving: every set is written to IndexedDB with an id made on the phone and synced with upserts, so retries never duplicate. A row is only marked synced if it didn't change while being sent, and rows the server rejects are set aside without blocking the rest.",
    },
    architecture: {
      nodes: [
        { label: "React PWA" },
        { label: "IndexedDB outbox", highlight: true },
        { label: "Background sync" },
        { label: "Supabase + RLS" },
      ],
      tradeoff:
        "Two save paths: edits to already-saved workouts go straight to Supabase, while anything logged in the gym is written to the phone first and synced later — simple where offline doesn't matter, instant where it does.",
    },
    code: { filename: "src/lib/offline.ts", lang: "ts", snippet: gymTrackerSnippet },
    links: { demo: "https://gym-tracker-delta-livid.vercel.app" },
  },
  {
    ...juliusBaer,
    slug: "julius-baer",
    name: "Julius Baer",
    oneLiner: "Frontend components for the Swiss private bank.",
    media: {
      type: "image",
      src: "/projects/julius-baer-desktop.jpg",
      mobileSrc: "/projects/julius-baer-mobile.jpg",
      alt: 'Julius Bär website: hero image with the headline "Your foray into sustainable investing"',
    },
    role: "Frontend developer",
    timeline: "Jan 2019 – Feb 2020",
    stack: ["Twig", "Fractal", "BEM", "Atomic Design"],
    overview: {
      ...juliusBaer.overview,
      built:
        "Frontend components built with Atomic Design and BEM, documented in a Fractal component library and rendered with the Twig template engine.",
      hardPart: "Meeting strict cross-browser requirements, including IE10 and Safari 11.",
    },
    architecture: undefined,
    code: undefined,
    links: {},
  },
];
