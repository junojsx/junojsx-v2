import { Code, Layers, Wrench, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const categories: {
  Icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
  iconBg: string;
}[] = [
  {
    Icon: Code,
    title: "Languages",
    description:
      "TypeScript & JavaScript — type-safe, modern web development with excellent tooling and ecosystem support.",
    bg: "bg-[#DDD6F0]",
    iconBg: "bg-[#C9BEE8]",
  },
  {
    Icon: Layers,
    title: "Frameworks & Styling",
    description:
      "React, Tailwind CSS, and Vite for component-driven, accessible UI built quickly and maintainably.",
    bg: "bg-[#D4EDD4]",
    iconBg: "bg-[#B8DDB8]",
  },
  {
    Icon: Wrench,
    title: "Dev Tools & Testing",
    description:
      "Git, GitHub, Jest, and Figma to maintain quality and consistency across design and development.",
    bg: "bg-[#F0D8E8]",
    iconBg: "bg-[#E8C4D8]",
  },
  {
    Icon: Database,
    title: "Platforms & Data",
    description:
      "Node.js, PostgreSQL, and Docker for scalable, containerized, production-ready backend services.",
    bg: "bg-[#D4E8F4]",
    iconBg: "bg-[#B8D8EE]",
  },
];

export default function TechStack() {
  return (
    <section
      id="tech"
      aria-labelledby="tech-heading"
      className=" border-t border-solid-black/100bg-white min-h-screen mx-auto flex items-center justify-center py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <span
        className="absolute top-16 left-12 text-3xl text-dark-gray/15 select-none pointer-events-none"
        aria-hidden="true"
      >
        ⚡
      </span>
      <span
        className="absolute top-10 right-16 text-xl text-dark-gray/15 select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="absolute top-20 right-10 text-sm text-dark-gray/10 select-none pointer-events-none"
        aria-hidden="true"
      >
        ✦
      </span>

      <div className="max-w-3xl mx-auto px-4">
        {/* Badge + Heading */}
        <AnimateIn from="bottom" duration={600}>
          <div className="flex justify-center mb-5" aria-hidden="true">
            <div className="inline-flex items-center gap-2 border border-dark-gray/25 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-dark-gray">
              <span className="w-2 h-2 rounded-full bg-soft-teal" />
              My Tech Stack
            </div>
          </div>

          <h2
            id="tech-heading"
            className="text-3xl md:text-4xl font-bold text-dark-gray text-center mb-12 leading-tight"
          >
            The tools I use to build
            <br />
            fast, accessible software.
          </h2>
        </AnimateIn>

        {/* 2×2 category cards */}
        <ul
          role="list"
          aria-label="Technology categories"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {categories.map(({ Icon, title, description, bg, iconBg }, i) => (
            <AnimateIn
              as="li"
              key={title}
              delay={i * 100}
              duration={600}
              className={`${bg} border-t border-solid-black/100 rounded-2xl p-6 flex gap-4 items-start`}
            >
              <div className={`${iconBg} rounded-full p-3 shrink-0 mt-0.5`}>
                <Icon className="w-6 h-6 text-dark-gray" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-dark-gray text-base mb-2">
                  {title}
                </h3>
                {/* /80 on tinted card bg (~#DDD6F0) → ~5.9:1 ✅  (/70 was ~4.4:1 ❌) */}
                <p className="text-dark-gray/80 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </ul>

        {/* CTA */}
        <AnimateIn delay={400} duration={600}>
          <div className="flex justify-center mt-10">
            <a
              href="#projects"
              className="inline-block border-2 border-dark-gray text-dark-gray px-6 py-3
                         rounded-lg font-medium text-sm hover:bg-dark-gray hover:text-white transition-colors"
            >
              Check Projects
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
