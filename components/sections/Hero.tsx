import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { Button } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Container } from "@/components/ui/Container";
import { Terminal, type TerminalLine } from "@/components/ui/Terminal";

const stackJson = [
  "{",
  ...skillGroups
    .slice(0, 3)
    .map(
      (g, i, all) =>
        `  "${g.path.slice(1)}": ${JSON.stringify(g.items.slice(0, 2))}${i < all.length - 1 ? "," : ""}`,
    ),
  "}",
].join("\n");

const lines: TerminalLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${profile.name} — ${profile.role.toLowerCase()}` },
  { kind: "cmd", text: "cat stack.json" },
  { kind: "out", text: stackJson },
];

export function Hero() {
  const { headline, intro, hint } = profile.hero;

  return (
    <section id="top" aria-labelledby="top-heading" className="overflow-hidden py-12 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex min-w-0 flex-col items-start gap-7">
          {profile.available && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-text-muted">
              <span aria-hidden className="size-2 rounded-full bg-ok" />
              status: {profile.status}
            </p>
          )}

          <h1
            id="top-heading"
            className="text-h1 leading-[0.95] font-semibold tracking-[-0.045em] text-balance"
          >
            {headline.before}
            <span className="text-accent">{headline.accent}</span>
            {headline.after}
          </h1>

          <p className="max-w-[52ch] text-lg text-text-muted">{intro}</p>

          <div className="flex flex-wrap gap-3">
            <Button href="#projects">
              View projects <ArrowDown aria-hidden className="size-4" />
            </Button>
            <Button href="#contact" variant="outline" mono>
              $ npx hire-{profile.handle}
            </Button>
            <Button href={profile.cvUrl} variant="outline" download>
              <Download aria-hidden className="size-4" /> Download CV
            </Button>
          </div>

          <p className="hidden font-mono text-xs text-text-subtle lg:block">{hint}</p>
        </div>

        <div className="relative min-w-0">
          <HeroCanvas />
          <Terminal
            title="~/zsh"
            lines={lines}
            className="relative -mt-16 ml-auto w-[min(100%,330px)] sm:absolute sm:right-[-16px] sm:bottom-[-44px] sm:mt-0"
          />
        </div>
      </Container>
    </section>
  );
}
