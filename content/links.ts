export type SocialLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
};

export const links: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/hbegic20" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/haris-begi%C4%87-2b73531a9/",
  },
  { id: "email", label: "Email", href: "mailto:harisbegic38@gmail.com" },
];
