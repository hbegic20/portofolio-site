import { ArrowDown } from "lucide-react";
import { credentials, jobs } from "@/content/experience";
import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section id="experience">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
        <div className="flex min-w-0 flex-col items-start gap-8 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading section={getSection("experience")} />
          <Button href={profile.cvUrl} variant="outline" download data-reveal="item">
            Full CV (PDF) <ArrowDown aria-hidden className="size-4" />
          </Button>
        </div>

        <div className="flex min-w-0 flex-col gap-12">
          <ol className="relative flex flex-col gap-10 border-l border-border pl-8">
            {jobs.map((job, i) => {
              const current = i === 0 && !job.end;
              return (
                <li key={job.hash} data-reveal="item" className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 -left-[38px] size-3 rounded-full border-2 border-bg",
                      current
                        ? "bg-accent shadow-[0_0_0_4px] shadow-accent/25"
                        : "bg-border-strong",
                    )}
                  />
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-subtle">
                    <span className="text-code-str">{job.hash}</span>
                    {current && (
                      <span className="rounded-full border border-accent/50 px-2 py-0.5 text-accent">
                        HEAD
                      </span>
                    )}
                    <span>
                      {job.start} — {job.end ?? "present"}
                    </span>
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {job.role} <span className="text-text-subtle">@</span> {job.company}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-text-muted">{job.impact}</p>
                  <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((tech, j) => (
                      <li key={`${tech}-${j}`}>
                        <Chip>{tech}</Chip>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>

          <div
            data-reveal="item"
            className="rounded-card border border-dashed border-border-strong p-6"
          >
            <h3 className="font-mono text-xs text-text-subtle">
              {"// education & certifications"}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {credentials.map((c, i) => (
                <li key={i} className="flex flex-wrap items-baseline justify-between gap-2">
                  <span>
                    {c.title} <span className="text-text-subtle">· {c.issuer}</span>
                  </span>
                  <span className="font-mono text-xs text-text-subtle">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
