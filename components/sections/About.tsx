import { Calendar, Download } from "lucide-react";
import Image from "next/image";
import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const chip =
  "absolute rounded-full border border-border-strong bg-surface px-3 py-1.5 font-mono text-xs text-text-muted shadow-lg shadow-black/30";

export function About() {
  const { about } = profile;

  return (
    <Section id="about" alt>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <div data-reveal="item" className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-surface-sunk">
            {about.photo ? (
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs text-text-subtle">
                [photo or low-poly avatar]
              </div>
            )}
          </div>
          <span className={`${chip} -top-3 left-4`}>{profile.yearsShipping} years shipping</span>
          <span className={`${chip} right-4 -bottom-3`}>
            {profile.location} · {profile.timezone}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          <SectionHeading section={getSection("about")} title={about.headline} />
          <p data-reveal="item" className="max-w-[62ch] text-lg text-text-muted">
            {about.bio}
          </p>

          <dl className="grid gap-4 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <Card key={fact.label} data-reveal="item" className="p-5">
                <dt className="font-mono text-xs text-text-subtle">{fact.label}</dt>
                <dd className="mt-2 text-sm">{fact.value}</dd>
              </Card>
            ))}
          </dl>

          <div data-reveal="item" className="flex flex-wrap gap-3">
            <Button href={profile.cvUrl} download>
              <Download aria-hidden className="size-4" /> Download CV (PDF)
            </Button>
            <Button href={profile.bookCallUrl} variant="outline">
              <Calendar aria-hidden className="size-4" /> Book a call
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
