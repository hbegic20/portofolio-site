import { Command } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/content/sections";
import { Container } from "@/components/ui/Container";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
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

          {/* Opens the cmdk palette in step 3. */}
          <button
            type="button"
            className="flex min-h-11 items-center gap-3 rounded-control border border-border-strong px-3 font-mono text-xs text-text-subtle transition-colors hover:text-text"
          >
            <span className="hidden sm:inline">Search or run a command</span>
            <span className="sm:hidden">Menu</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[11px]">
              <Command aria-hidden className="size-3" />K
            </kbd>
          </button>
        </nav>
      </Container>
    </header>
  );
}
