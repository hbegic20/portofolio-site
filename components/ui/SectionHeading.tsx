import type { Section } from "@/content/sections";

type SectionHeadingProps = {
  section: Section;
};

export function SectionHeading({ section }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      {section.index && (
        <p className="font-mono text-xs text-text-subtle">
          {`// ${section.index} — ${section.slug}`}
        </p>
      )}
      <h2
        id={`${section.id}-heading`}
        className="text-h2 leading-[1.05] font-semibold tracking-heading text-balance"
      >
        {section.title}
      </h2>
    </div>
  );
}
