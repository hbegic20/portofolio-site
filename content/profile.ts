export type Fact = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  handle: string;
  role: string;
  available: boolean;
  status: string;
  location: string;
  timezone: string;
  yearsShipping: string;
  email: string;
  hero: {
    headline: { before: string; accent: string; after: string };
    intro: string;
    hint: string;
    mobileHint: string;
  };
  about: {
    headline: string;
    bio: string;
    facts: Fact[];
    photo?: { src: string; alt: string };
  };
  currentlyLearning: string;
  cvUrl: string;
  bookCallUrl: string;
};

export const profile: Profile = {
  name: "[Name]",
  handle: "[name]",
  role: "Full-stack engineer",
  available: true,
  status: "open to full-time & freelance",
  location: "[City, Country]",
  timezone: "[UTC±X]",
  yearsShipping: "[X]",
  email: "[you@example.com]",
  hero: {
    headline: { before: "I build the ", accent: "whole stack", after: " — and make it feel fast." },
    intro: "[One-line intro: what you build, for whom, and what you care about.]",
    hint: "drag the room to orbit · click the monitor to enter the terminal",
    mobileHint: "tap the monitor to enter the terminal",
  },
  about: {
    headline: "[About headline — one sentence about how you work.]",
    bio: "[2–3 sentence bio. Where you've worked, what you're best at, what you enjoy shipping.]",
    facts: [
      { label: "Focus", value: "[e.g. product engineering, APIs, performance]" },
      { label: "Looking for", value: "[e.g. full-time senior role or freelance projects]" },
      { label: "Languages", value: "[e.g. English, …]" },
    ],
  },
  currentlyLearning: "[topic], [topic]",
  cvUrl: "/cv.pdf",
  bookCallUrl: "[https://cal.com/your-handle]",
};
