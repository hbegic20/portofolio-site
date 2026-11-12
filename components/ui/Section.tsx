import type { ReactNode } from "react";
import type { SectionId } from "@/content/sections";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id: SectionId;
  alt?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, alt, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("py-14 md:py-30", alt && "bg-bg-alt", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
