import { profile } from "@/content/profile";
import { sections } from "@/content/sections";
import { Container } from "@/components/ui/Container";
import { CommandButton } from "./CommandButton";
import { StickyHeader } from "./StickyHeader";

export function Nav() {
  return (
    <StickyHeader>
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
          <a href="#top" className="shrink-0 font-mono text-sm">
            <span className="text-accent">~/{profile.handle}</span>{" "}
            <span className="text-text-subtle">$</span>
          </a>

          <ul className="hidden items-center gap-6 font-mono text-sm text-text-muted lg:flex">
            {sections
              .filter((s) => s.inNav)
              .map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="transition-colors hover:text-text">
                    ./{s.slug}
                  </a>
                </li>
              ))}
          </ul>

          <CommandButton />
        </nav>
      </Container>
    </StickyHeader>
  );
}
