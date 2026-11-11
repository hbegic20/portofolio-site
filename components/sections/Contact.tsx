import { CornerDownLeft } from "lucide-react";
import { profile } from "@/content/profile";
import { getSection } from "@/content/sections";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const field =
  "w-full rounded-control border border-border bg-surface-sunk px-3 py-2.5 font-mono text-sm placeholder:text-text-subtle";
const label = "font-mono text-sm text-ok";

/** Static form; submission to /api/v1/contact is wired up in step 5. */
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

        <Card className="min-w-0 p-6 md:p-8">
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={label}>
                --name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                maxLength={80}
                autoComplete="name"
                className={field}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className={label}>
                --email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={label}>
                --message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={6}
                className={`${field} resize-y`}
              />
            </div>
            {/* Honeypot: hidden from people, tempting for bots. */}
            <div aria-hidden className="hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-on-accent"
            >
              Execute <CornerDownLeft aria-hidden className="size-4" />
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
