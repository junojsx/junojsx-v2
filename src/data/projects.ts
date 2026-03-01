import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    name: "A11y-Ledger",
    description:
      "A dashboard tool that audits web pages for WCAG compliance and generates actionable accessibility reports.",
    techTags: ["NextJS", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    liveUrl: "https://a11y-ledger.vercel.app/",
    repoUrl: "https://github.com/junojsx/a11y-ledger",
  },
  {
    id: "project-2",
    name: "DupeFlix",
    description:
      "A full-stack Netflix clone that replicates the core streaming experience with authentication, dynamic content browsing, and a responsive, modern UI. Built to showcase real-world frontend architecture, API integration, and scalable design.",
    techTags: ["React", "TypeScript", "Storybook", "Radix UI"],
    liveUrl: "https://dupeflix.vercel.app/",
    repoUrl: "https://github.com/junojsx/dupeflix",
  },
  {
    id: "project-3",
    name: "For Yohan",
    description:
      "A text to speech app I created for my non-verbal little cousin, Yohan. The reason why I built it was to help her communicate more effectively and express her thoughts and feelings in a way that was accessible to her. I saw how much she struggled to communicate with others and wanted to create something that could help her connect with the world around her. She is why I pursued a career in tech.",
    techTags: ["React", "Bootstrap", "Speech Synthesis API"],
    liveUrl: "https://tangerine-syrniki-087126.netlify.app/",
    repoUrl: "https://github.com/junojsx/for-Yohan",
  },
  {
    id: "project-4",
    name: "CPACC Flashcards",
    description:
      "A full-stack Netflix clone that replicates the core streaming experience with authentication, dynamic content browsing, and a responsive, modern UI. Built to showcase real-world frontend architecture, API integration, and scalable design.",
    techTags: ["React", "TypeScript", "Storybook", "Radix UI"],
    liveUrl:
      "https://app.netlify.com/projects/gleeful-hummingbird-1d3528/overview",
    repoUrl: "https://github.com/junojsx/cpacc-flashcards",
  },
  {
    id: "project-5",
    name: "Keylometer",
    description:
      "For my first project in this course, I decided to build my version of a speed typing challenge. As a novice mechanical keyboard enthusiast, I enjoy building keyboards using different switches depending on what sound profile and feel I am looking for at certain times. And to test out the build, I always use websites like monkeytype and kbsim.",
    techTags: ["JavaScript", "Chrome Extension API", "CSS"],
    liveUrl: "https://junojsx.github.io/speed-typer/",
    repoUrl: "https://github.com/junojsx/speed-typer",
  },
];
