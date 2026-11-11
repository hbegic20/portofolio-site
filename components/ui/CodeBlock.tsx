import { highlight } from "@/lib/shiki";

type CodeBlockProps = {
  filename: string;
  code: string;
  lang: string;
};

/** Server component: Shiki output is static HTML, no client JS. */
export async function CodeBlock({ filename, code, lang }: CodeBlockProps) {
  const html = await highlight(code, lang);

  return (
    <figure className="overflow-hidden rounded-control border border-border bg-surface-sunk">
      <figcaption className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-text-subtle">
        <span>{filename}</span>
        <span>{lang}</span>
      </figcaption>
      <div
        className="overflow-x-auto font-mono text-[13px] leading-6 [&_pre]:w-fit [&_pre]:min-w-full [&_pre]:!bg-transparent [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
