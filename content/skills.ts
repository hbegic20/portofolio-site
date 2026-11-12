export type SkillGroup = {
  title: string;
  path: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", path: "/web", items: ["[skill]", "[skill]", "[skill]", "[skill]"] },
  { title: "Backend", path: "/api", items: ["[skill]", "[skill]", "[skill]", "[skill]"] },
  { title: "Data", path: "/db", items: ["[skill]", "[skill]", "[skill]"] },
  { title: "DevOps & Cloud", path: "/infra", items: ["[skill]", "[skill]", "[skill]"] },
  { title: "Tools", path: "/bin", items: ["[skill]", "[skill]", "[skill]"] },
];

export const heroBadges: string[] = ["TS", "Go", "PG", "{ }"];
