export type SocialLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
};

export const links: SocialLink[] = [
  { id: "github", label: "GitHub", href: "[https://github.com/your-handle]" },
  { id: "linkedin", label: "LinkedIn", href: "[https://linkedin.com/in/your-handle]" },
  { id: "email", label: "Email", href: "mailto:[you@example.com]" },
];
