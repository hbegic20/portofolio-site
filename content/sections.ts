export type SectionId =
  "top" | "about" | "skills" | "projects" | "experience" | "api" | "oss" | "contact";

export type Section = {
  id: SectionId;
  /** Code-comment label, e.g. "// 01 — about". Absent for the hero. */
  index?: string;
  /** Short slug shown in the label and nav, e.g. "about". */
  slug: string;
  /** Section H2 (the hero owns the page H1). */
  title?: string;
  /** Show in the top nav as `./slug`. */
  inNav: boolean;
};

/** Page sections in render order. Used by page, nav and the ⌘K palette. */
export const sections: readonly Section[] = [
  { id: "top", slug: "top", inNav: false },
  { id: "about", index: "01", slug: "about", inNav: true },
  { id: "skills", index: "02", slug: "skills", title: "ls ~/stack", inNav: true },
  { id: "projects", index: "03", slug: "projects", title: "git log --featured", inNav: true },
  { id: "experience", index: "04", slug: "experience", title: "git log --author=me", inNav: true },
  { id: "api", index: "05", slug: "api", title: "Query me like a backend.", inNav: false },
  { id: "oss", index: "06", slug: "oss", title: "Shipping in public", inNav: false },
  { id: "contact", index: "07", slug: "contact", title: "$ ./say-hello.sh", inNav: true },
];

export function getSection(id: SectionId): Section {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}
