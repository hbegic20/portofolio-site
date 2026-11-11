import { Mail } from "lucide-react";
import { links, type SocialLink } from "@/content/links";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const icons: Record<SocialLink["id"], typeof Mail | typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

const buildSha = process.env.BUILD_SHA ?? "local";
const buildDate = process.env.BUILD_DATE ?? "";

export function Footer() {
  const year = buildDate.slice(0, 4);

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 font-mono text-xs text-text-subtle md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {profile.name} · built with Next.js, R3F & Blender
        </p>
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const Icon = icons[link.id];
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="flex size-11 items-center justify-center rounded-control transition-colors hover:bg-surface hover:text-text"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          last deploy: <span className="text-text-muted">{buildSha}</span> ·{" "}
          <time dateTime={buildDate}>{buildDate.slice(0, 10)}</time>
        </p>
      </Container>
    </footer>
  );
}
