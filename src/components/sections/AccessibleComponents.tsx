import { useState } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ComponentCard } from "@/components/ui/ComponentCard";
import { cn } from "@/lib/utils";
import {
  accessibleComponents,
  ALL_CATEGORIES,
  type Category,
} from "@/data/accessibleComponents";

type Props = {
  standalone?: boolean;
};

export default function AccessibleComponents({ standalone = false }: Props) {
  const HeadingTag = standalone ? "h1" : "h2";
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered =
    activeCategory === "all"
      ? accessibleComponents
      : accessibleComponents.filter((c) => c.category === activeCategory);

  return (
    <section
      id="components"
      aria-labelledby="components-heading"
      className="relative min-h-[calc(100vh-8rem)] bg-[#F5F3EF] text-dark-gray"
    >
      {/* Decorative grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
        aria-hidden="true"
      />
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute top-0 right-[-8%] h-72 w-72 rounded-full bg-soft-teal/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-soft-lavender/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20 lg:py-24">
        {/* Header */}
        <AnimateIn from="bottom" duration={500}>
          <header className="mb-10 sm:mb-12 max-w-2xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-soft-teal"
              aria-hidden="true"
            >
              Snippet library
            </p>
            <HeadingTag
              id="components-heading"
              className="font-display text-3xl font-bold tracking-tight text-deep-purple sm:text-4xl lg:text-[2.6rem]"
            >
              Accessible Components
            </HeadingTag>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-gray/70">
              Copy-paste patterns for building interfaces that work with keyboards,
              screen readers, and every input modality. Each snippet demonstrates
              a specific ARIA or HTML technique.
            </p>
          </header>
        </AnimateIn>

        {/* Category filter */}
        <AnimateIn from="bottom" duration={500} delay={80}>
          <div
            role="group"
            aria-label="Filter by category"
            className="mb-8 flex flex-wrap gap-2"
          >
            {ALL_CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                aria-pressed={activeCategory === value}
                onClick={() => setActiveCategory(value)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2",
                  activeCategory === value
                    ? "border-deep-purple bg-deep-purple text-white"
                    : "border-[#2C2C2C]/20 bg-white text-dark-gray hover:border-deep-purple/50 hover:text-deep-purple",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Component grid */}
        <div
          role="list"
          aria-label="Component examples"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7"
        >
          {filtered.map((entry, i) => (
            <AnimateIn
              key={entry.id}
              as="div"
              role="listitem"
              from="bottom"
              duration={500}
              delay={100 + i * 80}
            >
              <ComponentCard entry={entry} />
            </AnimateIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-dark-gray/50">
            No components in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
