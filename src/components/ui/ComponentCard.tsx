import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
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
  const [fullscreen, setFullscreen] = useState(false);
  const expandBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previewId = `tab-preview-${entry.id}`;
  const codeId = `tab-code-${entry.id}`;
  const previewPanelId = `panel-preview-${entry.id}`;
  const codePanelId = `panel-code-${entry.id}`;
  const dialogTitleId = `dialog-title-${entry.id}`;

  // Lock body scroll, focus close button, handle Escape, and restore focus
  useEffect(() => {
    if (!fullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 30);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setFullscreen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
      // Return focus to the trigger that opened the dialog.
      expandBtnRef.current?.focus({ preventScroll: true });
    };
  }, [fullscreen]);

  return (
    <article
      aria-labelledby={`card-title-${entry.id}`}
      className="flex flex-col rounded-2xl border border-[#2C2C2C]/10 bg-white shadow-sm overflow-hidden"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#2C2C2C]/08">
        <h2
          id={`card-title-${entry.id}`}
          className="text-base font-semibold text-[#162B4D] leading-snug"
        >
          {entry.name}
        </h2>
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
            "flex-1 px-4 py-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A288BF]",
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
            "flex-1 px-4 py-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A288BF]",
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
        <button
          ref={expandBtnRef}
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label={`Open ${entry.name} preview in full screen`}
          className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-md border border-[#2C2C2C]/15 bg-white/85 px-2 py-1 text-[10px] font-medium text-[#4E3C51] shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-[#3A2D3B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A288BF] focus-visible:outline-offset-2"
        >
          <Maximize2 className="h-3 w-3" aria-hidden="true" />
          Full screen
        </button>
        <entry.Preview />
      </div>

      {/* Full-screen lightbox dialog */}
      {fullscreen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="fixed inset-0 z-[9999] flex flex-col bg-[#2E2131]/92 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setFullscreen(false);
            }}
          >
            {/* Dialog header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <h2
                id={dialogTitleId}
                className="font-display text-base font-semibold text-white sm:text-lg"
              >
                {entry.name}
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setFullscreen(false)}
                aria-label="Close full-screen preview"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B6A5D0]/60 bg-[#4E3C51] text-white transition-colors hover:bg-[#3A2D3B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E3C16F] focus-visible:outline-offset-2"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Dialog body — preview gets the full stage */}
            <div
              className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8"
              onClick={(e) => {
                if (e.target === e.currentTarget) setFullscreen(false);
              }}
            >
              <div className="w-full max-w-4xl rounded-2xl border border-[#2C2C2C]/10 bg-[#F8F7F5] shadow-2xl">
                <div className="min-h-[60vh] overflow-hidden rounded-2xl">
                  <entry.Preview />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

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
