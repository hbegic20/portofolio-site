export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "CTO @ Company" */
  title: string;
};

/**
 * Real quotes only — the section is hidden while this is empty.
 * Example: { quote: "…", name: "…", title: "Engineering Manager @ …" }
 */
export const testimonials: Testimonial[] = [];
