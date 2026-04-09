import { useState, useRef, useEffect, useCallback } from "react";

export type Category = "forms" | "navigation" | "disclosure" | "feedback";

export interface ComponentEntry {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  code: string;
  Preview: React.ComponentType;
}

// ─── 1. Skip Navigation Link ────────────────────────────────────────────────

function SkipNavPreview() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-sm text-center text-[#2C2C2C]/70 max-w-xs">
        Tab into the demo — the skip link appears on focus.
      </p>
      <div className="w-full max-w-xs rounded-lg overflow-hidden border border-[#2C2C2C]/15 bg-[#F5F5F5]">
        <div className="relative">
          {/* Skip link — visible only on focus */}
          <a
            href="#skip-demo-main"
            className="absolute left-2 top-2 z-10 -translate-y-full rounded bg-[#4E3C51] px-3 py-1.5 text-xs font-semibold text-white transition-transform focus:translate-y-0"
          >
            Skip to main content
          </a>
          <div className="flex gap-3 px-4 py-3 bg-white border-b border-[#2C2C2C]/10 text-xs text-[#2C2C2C]/50">
            <span>Logo</span>
            <span>Nav 1</span>
            <span>Nav 2</span>
          </div>
        </div>
        <div id="skip-demo-main" className="px-4 py-6 text-xs text-[#2C2C2C]/60" tabIndex={-1}>
          Main content area
        </div>
      </div>
    </div>
  );
}

// ─── 2. Accessible Icon Button (toggle) ─────────────────────────────────────

function AccessibleButtonPreview() {
  const [liked, setLiked] = useState(false);
  const [announced, setAnnounced] = useState("");

  function toggle() {
    const next = !liked;
    setLiked(next);
    setAnnounced(next ? "Liked" : "Like removed");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full p-4">
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike post" : "Like post"}
        onClick={toggle}
        className="group relative inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
        style={{
          borderColor: liked ? "#1A7A74" : "#2C2C2C33",
          color: liked ? "#1A7A74" : "#2C2C2C",
          background: liked ? "#1A7A7410" : "white",
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 transition-transform group-active:scale-90"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {liked ? "Liked" : "Like"}
      </button>
      {/* Polite live region for assistive tech */}
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {announced}
      </span>
      <p className="text-xs text-[#2C2C2C]/50 text-center">
        <code className="font-mono bg-[#F5F5F5] px-1 rounded">aria-pressed="{String(liked)}"</code>
      </p>
    </div>
  );
}

// ─── 3. Labeled Form Field ───────────────────────────────────────────────────

function LabeledFieldPreview() {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);
  const id = "preview-email";
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasError = showError && value.trim() === "";

  return (
    <div className="flex flex-col justify-center gap-4 h-full p-6 w-full max-w-xs mx-auto">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-[#2C2C2C]">
          Email address <span aria-hidden="true" className="text-red-500 ml-0.5">*</span>
          <span className="sr-only"> (required)</span>
        </label>
        <input
          id={id}
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (e.target.value) setShowError(false);
          }}
          aria-describedby={`${hintId}${hasError ? ` ${errorId}` : ""}`}
          aria-invalid={hasError}
          aria-required="true"
          placeholder="you@example.com"
          className="rounded-lg border px-3 py-2 text-sm outline-none transition-shadow"
          style={{
            borderColor: hasError ? "#ef4444" : "#A288BF",
            boxShadow: hasError ? "0 0 0 2px #ef444433" : undefined,
          }}
        />
        <p id={hintId} className="text-xs text-[#2C2C2C]/55">
          Used only to respond to your message.
        </p>
        {hasError && (
          <p id={errorId} role="alert" className="text-xs text-red-500 font-medium">
            Email is required.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setShowError(true)}
        className="rounded-lg bg-[#4E3C51] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
      >
        Submit
      </button>
    </div>
  );
}

// ─── 4. Focus Trap Modal ─────────────────────────────────────────────────────

const FOCUSABLE = [
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function FocusTrapPreview() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus the first focusable element
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-4">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#4E3C51] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
      >
        Open dialog
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />
          {/* Dialog */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
              <h2 id="modal-title" className="text-base font-semibold text-[#2C2C2C] mb-2">
                Confirm action
              </h2>
              <p className="text-sm text-[#2C2C2C]/70 mb-5">
                Focus is trapped inside. Try tabbing — it wraps. Press Escape to close.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-[#2C2C2C]/20 px-4 py-2 text-sm font-medium text-[#2C2C2C] hover:bg-[#F5F5F5] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg bg-[#4E3C51] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── 5. Disclosure / Accordion ───────────────────────────────────────────────

function DisclosurePreview() {
  const items = [
    {
      id: "q1",
      question: "What makes a button accessible?",
      answer: "Use native <button> elements, provide a descriptive label, ensure visible focus, and communicate state changes via aria-pressed or aria-expanded.",
    },
    {
      id: "q2",
      question: "When should I use aria-label?",
      answer: "When the visible text label is absent or insufficient — for example, an icon-only button. Avoid duplicating visible text.",
    },
  ];
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center gap-2 h-full p-4 w-full max-w-sm mx-auto">
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = `panel-${item.id}`;
        return (
          <div key={item.id} className="rounded-xl border border-[#2C2C2C]/12 overflow-hidden">
            <h3>
              <button
                type="button"
                id={`btn-${item.id}`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenId(expanded ? null : item.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-[#2C2C2C] text-left bg-white hover:bg-[#F5F5F5] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A288BF]"
              >
                {item.question}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className={`h-4 w-4 shrink-0 transition-transform text-[#4E3C51] ${expanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`btn-${item.id}`}
              hidden={!expanded}
              className="px-4 py-3 text-sm text-[#2C2C2C]/70 bg-[#F5F5F5]/60 border-t border-[#2C2C2C]/10"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 6. Live Region / Toast ───────────────────────────────────────────────────

function LiveRegionPreview() {
  const [messages, setMessages] = useState<{ id: number; text: string; type: "polite" | "assertive" }[]>([]);
  const counter = useRef(0);

  const announce = useCallback((text: string, type: "polite" | "assertive") => {
    const id = ++counter.current;
    setMessages((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 4000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-4">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <button
          type="button"
          onClick={() => announce("Settings saved successfully.", "polite")}
          className="rounded-lg bg-[#1A7A74] px-4 py-2 text-sm font-medium text-white hover:bg-[#145f5a] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
        >
          Save (polite)
        </button>
        <button
          type="button"
          onClick={() => announce("Error: Could not complete request.", "assertive")}
          className="rounded-lg bg-[#94632F] px-4 py-2 text-sm font-medium text-white hover:bg-[#7a5126] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
        >
          Error (assertive)
        </button>
      </div>

      {/* Visual toasts */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 flex flex-col gap-2 max-w-[200px]"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg px-3 py-2 text-xs font-medium text-white shadow-md ${m.type === "assertive" ? "bg-[#94632F]" : "bg-[#1A7A74]"}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Hidden live regions — what screen readers actually announce */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {messages.filter((m) => m.type === "polite").at(-1)?.text ?? ""}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {messages.filter((m) => m.type === "assertive").at(-1)?.text ?? ""}
      </div>
    </div>
  );
}

// ─── Data export ─────────────────────────────────────────────────────────────

export const accessibleComponents: ComponentEntry[] = [
  {
    id: "skip-nav",
    name: "Skip Navigation Link",
    description:
      "Lets keyboard users bypass repeated navigation blocks and jump straight to the main content — required for WCAG 2.4.1.",
    category: "navigation",
    tags: ["keyboard", "bypass-blocks", "WCAG 2.4.1"],
    Preview: SkipNavPreview,
    code: `/* index.css */
.skip-link {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 9999;
  transform: translateY(-200%);
  transition: transform 0.2s;
  background: #4E3C51;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
}
.skip-link:focus {
  transform: translateY(0);
}

// Layout.tsx
export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
    </>
  );
}`,
  },
  {
    id: "icon-button",
    name: "Accessible Icon Button",
    description:
      "A toggle button that communicates its pressed state to assistive technology via aria-pressed and a visible label change.",
    category: "forms",
    tags: ["aria-pressed", "toggle", "icon-button"],
    Preview: AccessibleButtonPreview,
    code: `function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [announced, setAnnounced] = useState("");

  function toggle() {
    const next = !liked;
    setLiked(next);
    setAnnounced(next ? "Post liked" : "Like removed");
  }

  return (
    <>
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike post" : "Like post"}
        onClick={toggle}
      >
        <HeartIcon aria-hidden="true" filled={liked} />
        {liked ? "Liked" : "Like"}
      </button>

      {/* Polite announcement for screen readers */}
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {announced}
      </span>
    </>
  );
}`,
  },
  {
    id: "labeled-field",
    name: "Labeled Form Field",
    description:
      "An input with a programmatic label, hint text, and a live error message. Uses aria-describedby and aria-invalid for full screen reader context.",
    category: "forms",
    tags: ["aria-describedby", "aria-invalid", "forms"],
    Preview: LabeledFieldPreview,
    code: `function EmailField() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const id = "email";
  const hintId = \`\${id}-hint\`;
  const errorId = \`\${id}-error\`;

  function validate() {
    if (!value.trim()) setError("Email is required.");
    else if (!value.includes("@")) setError("Enter a valid email.");
    else setError("");
  }

  return (
    <div>
      <label htmlFor={id}>
        Email <span aria-hidden="true">*</span>
        <span className="sr-only"> (required)</span>
      </label>

      <input
        id={id}
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={validate}
        aria-describedby={\`\${hintId}\${error ? \` \${errorId}\` : ""}\`}
        aria-invalid={!!error}
        aria-required="true"
      />

      <p id={hintId}>Used only to respond to you.</p>

      {error && (
        <p id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}`,
  },
  {
    id: "focus-trap-modal",
    name: "Focus Trap Modal",
    description:
      "A dialog that confines keyboard focus within itself, restores focus on close, and supports Escape to dismiss — following the ARIA dialog pattern.",
    category: "disclosure",
    tags: ["dialog", "focus-trap", "aria-modal"],
    Preview: FocusTrapPreview,
    code: `const FOCUSABLE = [
  'button:not([disabled])',
  'input:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function Modal({ open, onClose, title, children }) {
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
    focusable[0]?.focus();

    function trap(e) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <>
      <div aria-hidden="true" onClick={onClose} /* backdrop */ />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}`,
  },
  {
    id: "disclosure",
    name: "Disclosure / Accordion",
    description:
      "Collapsible content sections using aria-expanded and aria-controls to communicate state. Each trigger is a native button inside a heading.",
    category: "disclosure",
    tags: ["aria-expanded", "aria-controls", "accordion"],
    Preview: DisclosurePreview,
    code: `function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = \`panel-\${item.id}\`;
        const btnId = \`btn-\${item.id}\`;

        return (
          <div key={item.id}>
            {/* Heading level matches page hierarchy */}
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenId(expanded ? null : item.id)}
              >
                {item.question}
                <ChevronIcon aria-hidden="true" />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
  },
  {
    id: "live-region",
    name: "Live Region / Toast",
    description:
      "Screen readers announce dynamic changes via aria-live regions. Use polite for non-urgent updates and assertive only for critical errors.",
    category: "feedback",
    tags: ["aria-live", "aria-atomic", "toast"],
    Preview: LiveRegionPreview,
    code: `function ToastSystem() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Polite: announced after the user finishes their current task
  function notifySuccess(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  }

  // Assertive: interrupts the user immediately — use sparingly
  function notifyError(text) {
    setErrorMessage(text);
    setTimeout(() => setErrorMessage(""), 4000);
  }

  return (
    <>
      <button onClick={() => notifySuccess("Saved!")}>Save</button>
      <button onClick={() => notifyError("Error saving.")}>Trigger error</button>

      {/* These live regions are always present in the DOM
          but only announce when their text content changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {errorMessage}
      </div>
    </>
  );
}`,
  },
];

export const ALL_CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Forms", value: "forms" },
  { label: "Navigation", value: "navigation" },
  { label: "Disclosure", value: "disclosure" },
  { label: "Feedback", value: "feedback" },
];
