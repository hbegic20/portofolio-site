import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";
import { DeviceMockup } from "./project/DeviceMockup";
import { ProjectPanel, panels } from "./project/ProjectPanel";

type ProjectBlockProps = {
  project: Project;
  index: number;
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectBlock({ project, index, total }: ProjectBlockProps) {
  const flip = index % 2 === 1;
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn("min-w-0 lg:sticky lg:top-24", flip && "lg:order-2")}>
        <p className="mb-4 font-mono text-xs text-text-subtle">
          {pad(index + 1)} / {pad(total)} · <span className="text-accent">{project.hash}</span>
        </p>
        <DeviceMockup media={project.media} name={project.name} flip={flip} />
      </div>

      <div className="flex min-w-0 flex-col gap-7">
        <div>
          <h3 id={headingId} className="text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-3 text-lg text-text-muted">{project.oneLiner}</p>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-y border-border py-5">
          {(
            [
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Team", project.team],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[11px] text-text-subtle">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <ul aria-label="Stack" className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <li key={`${tech}-${i}`}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>

        {/* Becomes an accessible tablist in step 4; static stack for now. */}
        <div className="flex flex-col gap-8">
          {panels.map((p) => (
            <div key={p.key}>
              <h4 className="mb-3 font-mono text-xs text-text-subtle">{`// ${p.label.toLowerCase()}`}</h4>
              <ProjectPanel project={project} panel={p.key} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links.demo && (
            <Button href={project.links.demo} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight aria-hidden className="size-4" />
            </Button>
          )}
          {project.links.source && (
            <Button href={project.links.source} variant="outline" target="_blank" rel="noreferrer">
              Source on GitHub <ArrowUpRight aria-hidden className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
