import "server-only";
import { cacheLife } from "next/cache";
import { createHighlighter, type BundledLanguage, type ThemeRegistration } from "shiki";

/** Colours are CSS variables, so code follows the @theme tokens in globals.css. */
const theme: ThemeRegistration = {
  name: "dev-room",
  type: "dark",
  colors: {
    "editor.background": "var(--color-surface-sunk)",
    "editor.foreground": "var(--color-text-muted)",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--color-text-subtle)", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.operator.new",
        "keyword.control",
      ],
      settings: { foreground: "var(--color-code-kw)" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
      ],
      settings: { foreground: "var(--color-code-fn)" },
    },
    {
      scope: ["string", "string.template", "punctuation.definition.string"],
      settings: { foreground: "var(--color-code-str)" },
    },
    {
      scope: ["constant.numeric", "constant.language", "support.constant"],
      settings: { foreground: "var(--color-accent)" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "entity.name.class",
        "entity.other.inherited-class",
      ],
      settings: { foreground: "var(--color-ok)" },
    },
    {
      scope: ["variable", "variable.other", "meta.object-literal.key"],
      settings: { foreground: "var(--color-text)" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator"],
      settings: { foreground: "var(--color-text-subtle)" },
    },
  ],
};

const langs = [
  "ts",
  "tsx",
  "js",
  "go",
  "sql",
  "json",
  "bash",
  "python",
  "rust",
] as const satisfies BundledLanguage[];
export type CodeLang = (typeof langs)[number];

const highlighter = createHighlighter({ themes: [theme], langs: [...langs] });

function isCodeLang(lang: string): lang is CodeLang {
  return (langs as readonly string[]).includes(lang);
}

/** Highlights at build time; cached so each snippet is processed once. */
export async function highlight(code: string, lang: string): Promise<string> {
  "use cache";
  cacheLife("max");
  const h = await highlighter;
  return h.codeToHtml(code.trimEnd(), {
    lang: isCodeLang(lang) ? lang : "text",
    theme: "dev-room",
  });
}
