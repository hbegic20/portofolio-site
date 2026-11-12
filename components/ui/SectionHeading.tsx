import { Fragment, type ReactNode } from "react";
import type { Section } from "@/content/sections";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  section: Section;
  title?: ReactNode;
  className?: string;
};

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
        <p data-reveal="item" className="font-mono text-xs text-text-subtle">
          {`// ${section.index} — ${section.slug}`}
        </p>
      )}
      <h2
        id={`${section.id}-heading`}
        className="text-h2 leading-[1.05] font-semibold tracking-heading text-balance"
      >
        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span data-reveal="heading" className="block">
            {title ?? <NoBreakWords text={section.title ?? ""} />}
          </span>
        </span>
      </h2>
    </div>
  );
}
