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
    role: "[Role]",
    company: "[Company]",
    start: "[YYYY]",
    impact: "[One line on the impact you had.]",
    stack: ["[tech]", "[tech]", "[tech]"],
  },
  {
    hash: "9c0b2d4",
    role: "[Role]",
    company: "[Company]",
    start: "[YYYY]",
    end: "[YYYY]",
    impact: "[One line on the impact you had.]",
    stack: ["[tech]", "[tech]", "[tech]"],
  },
  {
    hash: "51d8e6a",
    role: "[Role]",
    company: "[Company]",
    start: "[YYYY]",
    end: "[YYYY]",
    impact: "[One line on the impact you had.]",
    stack: ["[tech]", "[tech]"],
  },
];

export const credentials: Credential[] = [
  { title: "[Degree / certification]", issuer: "[Institution]", year: "[YYYY]" },
  { title: "[Certification]", issuer: "[Issuer]", year: "[YYYY]" },
];
