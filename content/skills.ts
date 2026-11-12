export type SkillGroup = {
  title: string;
  path: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    path: "/lang",
    items: ["JavaScript", "TypeScript", "PHP", "HTML5", "CSS3", "SCSS"],
  },
  {
    title: "Frameworks",
    path: "/web",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Laravel"],
  },
  {
    title: "Styling & UI",
    path: "/ui",
    items: ["Tailwind CSS", "BEM", "Atomic Design", "Responsive design", "Cross-browser"],
  },
  {
    title: "Templating & tools",
    path: "/bin",
    items: ["Blade", "Twig", "Mustache", "Fractal", "Figma", "Git", "REST APIs"],
  },
  {
    title: "Practices",
    path: "/practice",
    items: ["Web performance", "Testing", "Code review", "Agile / Scrum"],
  },
];

export const heroBadges: string[] = ["TS", "React", "Vue", "{ }"];
