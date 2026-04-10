import { useLayoutEffect, useState } from "react";
import { Link, Navigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";
import { accessibleComponents } from "@/data/accessibleComponents";

type Tab = "preview" | "code";

export default function ComponentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("preview");

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const entry = accessibleComponents.find((c) => c.id === id);
  if (!entry) return <Navigate to="/components" replace />;

  const previewTabId = `detail-tab-preview-${entry.id}`;
  const codeTabId = `detail-tab-code-${entry.id}`;
  const previewPanelId = `detail-panel-preview-${entry.id}`;
  const codePanelId = `detail-panel-code-${entry.id}`;

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="relative min-h-screen bg-[#F5F3EF] text-dark-gray">
        {/* Decorative blobs — match the components section vibe */}
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-soft-lavender/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-[-15%] h-80 w-80 rounded-full bg-warm-gold/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <Link
            to="/components"
            className="inline-flex items-center gap-2 text-sm font-medium text-deep-purple/70 hover:text-soft-teal transition-colors mb-10
                       rounded-md outline-none focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all components
          </Link>

          {/* Header */}
          <header className="mb-10">
            <p className="text-xs font-medium uppercase tracking-wider text-soft-teal mb-3">
              {entry.category}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold text-deep-purple leading-[1.08] tracking-tight mb-5">
              {entry.name}
            </h1>
            <p className="text-lg text-dark-gray/75 leading-relaxed max-w-3xl">
              {entry.description}
            </p>
            <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="text-xs font-normal py-0.5">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </header>

          {/* Card with bigger preview / code */}
          <article className="rounded-2xl border border-dark-gray/10 bg-white shadow-sm overflow-hidden">
            {/* Tab bar */}
            <div
              role="tablist"
              aria-label={`${entry.name} view options`}
              className="flex border-b border-dark-gray/10"
            >
              <button
                type="button"
                role="tab"
                id={previewTabId}
                aria-selected={activeTab === "preview"}
                aria-controls={previewPanelId}
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex-1 px-6 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-input-focus",
                  activeTab === "preview"
                    ? "bg-white text-deep-purple border-b-2 border-deep-purple"
                    : "bg-light-gray/60 text-dark-gray/55 hover:text-dark-gray",
                )}
              >
                Preview
              </button>
              <button
                type="button"
                role="tab"
                id={codeTabId}
                aria-selected={activeTab === "code"}
                aria-controls={codePanelId}
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex-1 px-6 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-input-focus",
                  activeTab === "code"
                    ? "bg-white text-deep-purple border-b-2 border-deep-purple"
                    : "bg-light-gray/60 text-dark-gray/55 hover:text-dark-gray",
                )}
              >
                Code
              </button>
            </div>

            {/* Preview panel — large stage */}
            <div
              id={previewPanelId}
              role="tabpanel"
              aria-labelledby={previewTabId}
              hidden={activeTab !== "preview"}
              className="relative min-h-[70vh] bg-[#F8F7F5]"
            >
              <entry.Preview />
            </div>

            {/* Code panel — full height, no inner scroll cap */}
            <div
              id={codePanelId}
              role="tabpanel"
              aria-labelledby={codeTabId}
              hidden={activeTab !== "code"}
            >
              <CodeBlock code={entry.code} language="tsx" />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
