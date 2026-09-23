export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
}

/** Placeholder entries — swap for CMS or MDX later */
export const blogPosts: BlogPost[] = [
  {
    slug: "semantic-html-is-a-feature",
    title: "Semantic HTML is a product feature",
    excerpt:
      "Landmarks, headings, and predictable structure aren't extras — they are how assistive tech users navigate your UI as confidently as anyone else.",
    date: "2026-03-18",
    readMinutes: 6,
    tags: ["a11y", "HTML"],
  },
  {
    slug: "focus-rings-that-dont-apologize",
    title: "Focus rings that don't apologize",
    excerpt:
      "Visible focus is not a styling bug. Here's a pattern library approach to consistent, on-brand focus styles that pass audits without feeling bolted on.",
    date: "2026-02-04",
    readMinutes: 8,
    tags: ["CSS", "WCAG"],
  },
  {
    slug: "testing-with-real-tools",
    title: "Keyboard first, then the rest",
    excerpt:
      "Before you reach for automated scanners, tab through the flow, watch where focus lands, and fix the traps. The boring stuff catches the expensive bugs.",
    date: "2026-01-12",
    readMinutes: 5,
    tags: ["testing", "workflow"],
  },
];
