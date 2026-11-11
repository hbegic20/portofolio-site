type CodeBlockProps = {
  filename: string;
  code: string;
};

/** Plain code block; Shiki highlighting is added in step 4. */
export function CodeBlock({ filename, code }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-control border border-border bg-surface-sunk">
      <figcaption className="border-b border-border px-4 py-2 font-mono text-xs text-text-subtle">
        {filename}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-text-muted">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
