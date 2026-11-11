import { Fragment, type ReactNode } from "react";
import type { Section } from "@/content/sections";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  section: Section;
  /** Overrides `section.title` (e.g. About uses the profile headline). */
  title?: ReactNode;
  className?: string;
};

/** Command-style titles (`git log --author=me`) must not wrap at a hyphen. */
function NoBreakWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="whitespace-nowrap">{word}</span>
    </Fragment>
  ));
}

export function SectionHeading({ section, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {section.index && (
        <p className="font-mono text-xs text-text-subtle">
          {`// ${section.index} — ${section.slug}`}
        </p>
      )}
      <h2
        id={`${section.id}-heading`}
        className="text-h2 leading-[1.05] font-semibold tracking-heading text-balance"
      >
        {title ?? <NoBreakWords text={section.title ?? ""} />}
      </h2>
    </div>
  );
}
