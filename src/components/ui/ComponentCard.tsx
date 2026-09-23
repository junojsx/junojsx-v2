import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";
import type { ComponentEntry } from "@/data/accessibleComponents";

interface ComponentCardProps {
  entry: ComponentEntry;
}

type Tab = "preview" | "code";

export function ComponentCard({ entry }: ComponentCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const previewId = `tab-preview-${entry.id}`;
  const codeId = `tab-code-${entry.id}`;
  const previewPanelId = `panel-preview-${entry.id}`;
  const codePanelId = `panel-code-${entry.id}`;

  return (
    <article
      aria-labelledby={`card-title-${entry.id}`}
      className="flex flex-col rounded-2xl border border-[#2C2C2C]/10 bg-white shadow-sm overflow-hidden"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#2C2C2C]/08">
        <div className="flex items-start justify-between gap-3">
          <h2
            id={`card-title-${entry.id}`}
            className="text-base font-semibold text-[#162B4D] leading-snug"
          >
            {entry.name}
          </h2>
          <Link
            to={`/components/${entry.id}`}
            aria-label={`Open ${entry.name} in full view`}
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[#2C2C2C]/15 bg-white px-2 py-1 text-[10px] font-medium text-[#4E3C51] transition-colors hover:bg-[#4E3C51] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5E4080] focus-visible:outline-offset-2"
          >
            Open
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-1.5 text-sm text-[#2C2C2C]/65 leading-relaxed">
          {entry.description}
        </p>
        <ul aria-label="Tags" className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary" className="text-xs font-normal py-0.5">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label={`${entry.name} view options`}
        className="flex border-b border-[#2C2C2C]/08"
      >
        <button
          type="button"
          role="tab"
          id={previewId}
          aria-selected={activeTab === "preview"}
          aria-controls={previewPanelId}
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex-1 px-4 py-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5E4080]",
            activeTab === "preview"
              ? "bg-white text-[#4E3C51] border-b-2 border-[#4E3C51]"
              : "bg-[#F5F5F5]/60 text-[#2C2C2C]/55 hover:text-[#2C2C2C]",
          )}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          id={codeId}
          aria-selected={activeTab === "code"}
          aria-controls={codePanelId}
          onClick={() => setActiveTab("code")}
          className={cn(
            "flex-1 px-4 py-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5E4080]",
            activeTab === "code"
              ? "bg-white text-[#4E3C51] border-b-2 border-[#4E3C51]"
              : "bg-[#F5F5F5]/60 text-[#2C2C2C]/55 hover:text-[#2C2C2C]",
          )}
        >
          Code
        </button>
      </div>

      {/* Preview panel */}
      <div
        id={previewPanelId}
        role="tabpanel"
        aria-labelledby={previewId}
        hidden={activeTab !== "preview"}
        className="relative min-h-[260px] bg-[#F8F7F5]"
      >
        <entry.Preview />
      </div>

      {/* Code panel */}
      <div
        id={codePanelId}
        role="tabpanel"
        aria-labelledby={codeId}
        hidden={activeTab !== "code"}
        className="max-h-[400px] overflow-auto"
      >
        <CodeBlock code={entry.code} language="tsx" />
      </div>
    </article>
  );
}
