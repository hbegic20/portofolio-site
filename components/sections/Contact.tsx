import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./contact/ContactForm";

export function Contact() {
  return (
    <Section id="contact" alt>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <div className="flex min-w-0 flex-col gap-6">
          <SectionHeading section={getSection("contact")} />
          <p className="text-text-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {profile.email}
            </a>
          </p>
        </div>

        <Card data-reveal="item" className="min-w-0 p-6 md:p-8">
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
