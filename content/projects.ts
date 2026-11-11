export type ArchNode = {
  label: string;
  /** Highlighted with the accent colour (usually the API). */
  highlight?: boolean;
};

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  /** Short commit-style hash shown in the label. */
  hash: string;
  name: string;
  oneLiner: string;
  role: string;
  timeline: string;
  team: string;
  stack: string[];
  media: { src: string; alt: string; type: "image" | "video" } | null;
  overview: { problem: string; built: string; hardPart: string };
  architecture: { nodes: ArchNode[]; tradeoff: string };
  code: { filename: string; lang: string; snippet: string };
  results: { metrics: Metric[]; learned: string };
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
    results: {
      metrics: [
        { value: "[—]", label: "[metric]" },
        { value: "[—]", label: "[metric]" },
        { value: "[—]", label: "[metric]" },
      ],
      learned: "[One thing you learned building it.]",
    },
    links: { demo: "#", source: "#" },
  };
}

export const projects: Project[] = [
  placeholder(1, "a1f3c9e"),
  placeholder(2, "7b2d0e4"),
  placeholder(3, "e9c41a8"),
];
