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
  name: "Haris Begić",
  handle: "haris",
  role: "Frontend developer → full-stack",
  available: true,
  status: "open to remote work",
  location: "Bugojno, Bosnia and Herzegovina",
  timezone: "UTC+1",
  yearsShipping: "8+",
  email: "harisbegic38@gmail.com",
  hero: {
    headline: { before: "Fast frontends today — the ", accent: "whole stack", after: " next." },
    intro:
      "Frontend developer with 8+ years building fast, user-friendly web apps for international clients — now growing into the backend.",
    hint: "drag the room to orbit · click the monitor, shelf, rack, poster or window",
    mobileHint: "tap the monitor, shelf, rack, poster or window to explore",
  },
  about: {
    headline: "I care about web performance, clean code and interfaces people enjoy using.",
    bio: "I hold a BTech in Information Technology (Univerzitet \"Vitez\", 2015–2019) and have been building websites and web applications since 2018 — first for local businesses and institutions at MTH IT Solutions, and since 2021 for international products, including five years at Bragg Gaming (iGaming) and client work at Indevitus. I work closely with backend developers, QA and designers, and I'm now extending into the backend myself: this site's API, database and email are my own.",
    facts: [
      { label: "Focus", value: "Web performance, maintainable code and good UX" },
      { label: "Looking for", value: "Remote frontend or full-stack roles" },
      { label: "Languages", value: "Bosnian (native), English" },
    ],
  },
  currentlyLearning: "Next.js route handlers, PostgreSQL + Drizzle, Redis",
  cvUrl: "/cv.pdf",
  bookCallUrl: "[https://cal.com/your-handle]",
};
