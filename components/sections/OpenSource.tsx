import { ArrowUpRight, Star } from "lucide-react";
import { githubLogin, pinnedRepos } from "@/content/oss";
import { getSection } from "@/content/sections";
import { testimonials } from "@/content/testimonials";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGitHubActivity } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ContributionGrid } from "./ContributionGrid";

export async function OpenSource() {
  const github = await getGitHubActivity(githubLogin);

  return (
    <Section id="oss">
      <SectionHeading section={getSection("oss")} />
      {github && (
        <div data-reveal="item" className="mt-12">
          <ContributionGrid total={github.total} weeks={github.weeks} />
        </div>
      )}

      <ul className={cn("grid gap-4 md:grid-cols-3", github ? "mt-4" : "mt-12")}>
        {pinnedRepos.map((repo, i) => (
          <li key={i} data-reveal="item">
            <Card className="group relative flex h-full flex-col gap-3 p-6 transition-colors hover:border-border-strong">
              <h3 className="flex items-center justify-between gap-2 font-mono text-sm">
                <a href={repo.href} className="after:absolute after:inset-0">
                  {repo.name}
                </a>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 text-text-subtle transition-colors group-hover:text-accent"
                />
              </h3>
              <p className="flex-1 text-sm text-text-muted">{repo.description}</p>
              <p className="flex items-center gap-4 font-mono text-xs text-text-subtle">
                <span>{repo.language}</span>
                {repo.stars !== undefined && (
                  <span className="flex items-center gap-1">
                    <Star aria-hidden className="size-3.5" />
                    <span className="sr-only">Stars:</span> {repo.stars}
                  </span>
                )}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      {testimonials.length > 0 && (
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} data-reveal="item" className="p-8">
              <figure className="flex h-full flex-col gap-6">
                <blockquote className="flex-1 text-lg text-balance">“{t.quote}”</blockquote>
                <figcaption className="font-mono text-xs text-text-subtle">
                  <span className="text-text">{t.name}</span> · {t.title}
                </figcaption>
              </figure>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
