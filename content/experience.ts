export type Job = {
  hash: string;
  role: string;
  company: string;
  start: string;
  end?: string;
  impact: string;
  stack: string[];
};

export type Credential = {
  title: string;
  issuer: string;
  year: string;
};

export const jobs: Job[] = [
  {
    hash: "3e7a1f0",
    role: "Frontend Web Developer",
    company: "Indevitus d.o.o",
    start: "Oct 2021",
    impact:
      "Build frontend features for international client products; work closely with backend, QA and design and take part in code reviews.",
    stack: ["[React]", "[Next.js]", "[TypeScript]"],
  },
  {
    hash: "b4a6c19",
    role: "Frontend Web Developer",
    company: "Bragg Gaming",
    start: "Jun 2021",
    end: "Jun 2026",
    impact:
      "Built the frontend for casino brands (711, MerkurXtip, Jacks.nl) on a custom Laravel and Blade CMS: atomic components in Vue 2, later Next.js and TypeScript with tests.",
    stack: ["Laravel", "Blade", "Vue 2", "Next.js", "TypeScript", "SCSS"],
  },
  {
    hash: "9c0b2d4",
    role: "Frontend Web Developer",
    company: "MTH IT Solutions",
    start: "Sep 2018",
    end: "Oct 2021",
    impact:
      "Built websites and web applications for local businesses and institutions, including DZ Bugojno.",
    stack: ["[tech]", "[tech]", "[tech]"],
  },
];

export const credentials: Credential[] = [
  {
    title: "BTech, Information Technology",
    issuer: 'Sveučilište/Univerzitet "Vitez"',
    year: "2015 – 2019",
  },
  { title: "Skill Assessment: Front-End Development", issuer: "LinkedIn", year: "[YYYY]" },
];
