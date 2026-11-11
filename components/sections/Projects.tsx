import { projects } from "@/content/projects";
import { getSection } from "@/content/sections";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectBlock } from "./ProjectBlock";

export function Projects() {
  return (
    <Section id="projects" alt>
      <SectionHeading section={getSection("projects")} />
      <div className="mt-16 flex flex-col gap-24 md:gap-32">
        {projects.map((project, i) => (
          <ProjectBlock key={project.slug} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </Section>
  );
}
