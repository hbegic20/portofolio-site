import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { skillGroups } from "@/content/skills";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading section={getSection("skills")} />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, i) => (
          <li key={group.path} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
            <Card className="h-full p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
                <span className="font-mono text-xs text-accent">{group.path}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <li key={`${item}-${j}`}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-sm text-text-subtle">
        <span className="text-ok">$</span> currently learning:{" "}
        <span className="text-text-muted">{profile.currentlyLearning}</span>
      </p>
    </Section>
  );
}
