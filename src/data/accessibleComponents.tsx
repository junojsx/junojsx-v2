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

// ─── 7. Floating Label Input ─────────────────────────────────────────────────

function FloatingLabelPreview() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div
      className="flex items-center justify-center h-full"
      style={{ backgroundColor: "#060b23", padding: "2rem" }}
    >
      <div style={{ position: "relative", width: "280px" }}>
        <input
          type="text"
          id="preview-floating-email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          spellCheck={false}
          style={{
            width: "100%",
            height: "56px",
            borderRadius: "6px",
            fontSize: "16px",
            padding: "0 15px",
            border: `2px solid ${focused ? "#18ffff" : "#fff"}`,
            background: "transparent",
            color: "#fff",
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
        <label
          htmlFor="preview-floating-email"
          style={{
            position: "absolute",
            top: floated ? "0" : "50%",
            left: "15px",
            transform: floated ? "translateY(-50%)" : "translateY(-50%)",
            color: focused ? "#18ffff" : "#fff",
            fontSize: floated ? "13px" : "17px",
            padding: floated ? "0 2px" : "0",
            background: floated ? "#060b23" : "transparent",
            transition: "top 0.3s, font-size 0.3s, color 0.3s",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          Enter email
        </label>
      </div>
    </div>
  );
}

// ─── 8. Accessible Name Comparison ──────────────────────────────────────────

function AccessibleNamePreview() {
  const [ariaLabelText, setAriaLabelText] = useState<"cat" | "dog">("cat");
  const [liveText, setLiveText] = useState<"cat" | "dog">("cat");
  const [selfRefText, setSelfRefText] = useState<"cat" | "dog">("cat");

  const toggle = (val: "cat" | "dog"): "cat" | "dog" => val === "cat" ? "dog" : "cat";

  const sectionStyle: React.CSSProperties = {
    marginBottom: "1rem",
  };
  const headingStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#B6A5D0",
    marginBottom: "0.4rem",
  };
  const btnStyle: React.CSSProperties = {
    padding: "0.4rem 1.2rem",
    borderRadius: "6px",
    border: "2px solid #4E3C51",
    background: "#1e1828",
    color: "#fff",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    outline: "none",
  };

  return (
    <div
      className="flex flex-col justify-center h-full px-6 py-5"
      style={{ background: "#13101f" }}
    >
      <div style={sectionStyle}>
        <p style={headingStyle}>aria-label (overrides text content)</p>
        <button
          aria-label={ariaLabelText}
          style={btnStyle}
          onClick={() => setAriaLabelText(toggle(ariaLabelText))}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#B6A5D0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#4E3C51"; }}
        >
          {ariaLabelText}
        </button>
        <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.3rem" }}>
          Accessible name: "{ariaLabelText}" — from <code style={{ color: "#B6A5D0" }}>aria-label</code>
        </p>
      </div>

      <div style={sectionStyle}>
        <p style={headingStyle}>aria-live (announces text changes)</p>
        <button
          aria-live="polite"
          style={btnStyle}
          onClick={() => setLiveText(toggle(liveText))}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#B6A5D0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#4E3C51"; }}
        >
          {liveText}
        </button>
        <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.3rem" }}>
          Accessible name: "{liveText}" — from text content; change is announced
        </p>
      </div>

      <div style={{ ...sectionStyle, marginBottom: 0 }}>
        <p style={headingStyle}>aria-labelledby targeting itself</p>
        <button
          id="self-ref-btn"
          aria-labelledby="self-ref-btn"
          style={btnStyle}
          onClick={() => setSelfRefText(toggle(selfRefText))}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#B6A5D0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#4E3C51"; }}
        >
          {selfRefText}
        </button>
        <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.3rem" }}>
          Accessible name: "{selfRefText}" — from its own text via <code style={{ color: "#B6A5D0" }}>aria-labelledby</code>
        </p>
      </div>
    </div>
  );
}

// ─── 9. Accessible Progress Bar ──────────────────────────────────────────────

const SHIPPING_STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

function ProgressBarPreview() {
  const [currentStep, setCurrentStep] = useState(1);

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, SHIPPING_STEPS.length));
  }

  const pct = Math.round((currentStep / SHIPPING_STEPS.length) * 100);

  return (
    <div className="flex flex-col justify-center h-full px-5 py-6" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={SHIPPING_STEPS.length}
        aria-label="Shipping Progress"
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          marginBottom: "14px",
          height: "18px",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#4caf50",
            width: `${pct}%`,
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Steps */}
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          listStyle: "none",
          padding: 0,
          margin: "0 0 16px",
          gap: "6px",
        }}
      >
        {SHIPPING_STEPS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep - 1;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 4px",
                borderRadius: "5px",
                fontSize: "0.72rem",
                fontWeight: done ? 600 : 400,
                backgroundColor: done ? "#4caf50" : "#f0f0f0",
                color: done ? "#fff" : "#333",
                transition: "background-color 0.3s",
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>

      {/* Button */}
      <button
        type="button"
        onClick={nextStep}
        disabled={currentStep >= SHIPPING_STEPS.length}
        style={{
          alignSelf: "flex-start",
          padding: "0.45rem 1.1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: currentStep >= SHIPPING_STEPS.length ? "#ccc" : "#4E3C51",
          color: "#fff",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: currentStep >= SHIPPING_STEPS.length ? "default" : "pointer",
          outline: "none",
          transition: "background-color 0.2s",
        }}
        className="focus-visible:ring-2 focus-visible:ring-[#A288BF] focus-visible:ring-offset-2"
      >
        {currentStep >= SHIPPING_STEPS.length ? "Delivered!" : "Next Step"}
      </button>
    </div>
  );
}

// ─── 10. Third-Party Disclaimer Toggletip ────────────────────────────────────

const DISCLAIMER_TEXT =
  "Please note that while we make every effort to ensure our own content is accessible, some pages on WEBSITE NAME may contain third-party content or links to third-party websites that are not fully accessible. We strive to work with our third-party providers to encourage improvements. Contact us at ###-###-#### for more assistance.";

function ToggletipPreview() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Control") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col justify-center h-full px-6 py-5 gap-4" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Trigger row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", position: "relative" }}>
        <button
          ref={btnRef}
          id="preview-toggleBtn"
          type="button"
          aria-describedby="preview-toggletip-content"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            border: "1px solid #4E3C51",
            borderRadius: "100%",
            width: "22px",
            height: "22px",
            padding: 0,
            cursor: "pointer",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            outline: "none",
          }}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A288BF]"
        >
          <img
            src="https://www.html5accessibility.com/tests/i.png"
            width="11"
            alt="information tooltip"
          />
        </button>

        <h2 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#162B4D", margin: 0 }}>
          Third-Party Disclaimer
        </h2>

        {/* Toggletip content — only rendered when open, so only then in tab order */}
        <aside
          id="preview-toggletip-content"
          style={{
            display: open ? "block" : "none",
            position: "absolute",
            top: "28px",
            left: 0,
            zIndex: 99,
            background: "#eee",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
            fontSize: "0.75rem",
            width: "240px",
            lineHeight: 1.5,
          }}
        >
          {open && (
            <span role="group" aria-live="polite">
              {DISCLAIMER_TEXT}{" "}
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  display: "inline",
                  border: "none",
                  background: "none",
                  color: "#4E3C51",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "0.75rem",
                  textDecoration: "underline",
                }}
              >
                Close
              </button>
            </span>
          )}
        </aside>
      </div>

      {/* Key notes */}
      <dl style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.6 }}>
        <dt style={{ fontWeight: 700, color: "#162B4D" }}>Key patterns:</dt>
        <dd>• Content injected into DOM only when expanded → only then readable/focusable</dd>
        <dd>• <code>aria-expanded</code> communicates open/closed state</dd>
        <dd>• <code>aria-live="polite"</code> announces content on expand</dd>
        <dd>• Escape / Ctrl dismiss without toggling back open</dd>
      </dl>
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
  {
    id: "floating-label",
    name: "Floating Label Input",
    description:
      "A real <label> that animates above the field on focus or when filled — unlike placeholder text, it stays visible and maintains its programmatic association with the input.",
    category: "forms",
    tags: ["floating-label", "CSS", "label"],
    Preview: FloatingLabelPreview,
    code: `<!-- HTML -->
<!-- Uses a real <label> with for="email", NOT placeholder.
     The label stays visible after the user types — placeholder disappears. -->
<div class="input-field">
  <input type="text" id="email" required spellcheck="false">
  <label for="email">Enter email</label>
</div>

/* CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #060b23;
}

.input-field {
  position: relative;
}

.input-field input {
  width: 350px;
  height: 60px;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  outline: none;
}

/* Float the label up on focus or when the input has a valid value.
   :valid works here because the input has the required attribute —
   a non-empty required field is considered valid. */
.input-field label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 19px;
  pointer-events: none;
  transition: 0.3s;
}

input:focus {
  border: 2px solid #18ffff;
}

input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 16px;
  padding: 0 2px;
  /* background matches page bg to "cut out" the border behind the label */
  background: #060b23;
}`,
  },
  {
    id: "accessible-name-comparison",
    name: "Accessible Name: Three Techniques",
    description:
      "Compares aria-label, aria-live, and aria-labelledby (self-referencing) on buttons that toggle their text — showing how each technique affects what a screen reader announces.",
    category: "forms",
    tags: ["aria-label", "aria-live", "aria-labelledby"],
    Preview: AccessibleNamePreview,
    code: `<!-- HTML -->
<!-- Click each button — it toggles between "cat" and "dog".
     Each uses a different ARIA technique for the accessible name. -->

<!-- 1. aria-label: overrides the accessible name entirely.
        Must be updated manually in JS when text changes. -->
<h2>Labelled by aria-label</h2>
<button aria-label="cat">cat</button>

<!-- 2. aria-live: accessible name comes from text content (default).
        aria-live="polite" additionally announces the text change
        to screen readers as a live region update. -->
<h2>Labelled by contents + aria-live</h2>
<button aria-live="polite">cat</button>

<!-- 3. aria-labelledby pointing at itself: explicitly derives the
        accessible name from the element's own text content.
        Updates automatically when text changes — no JS needed. -->
<h2>Labelled by aria-labelledby (self)</h2>
<button id="ex" aria-labelledby="ex">cat</button>

/* CSS */
h2 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #B6A5D0;
  margin: 1.25rem 0 0.4rem;
}

button {
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  border: 2px solid #4E3C51;
  background: #1e1828;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s;
}

button:hover {
  border-color: #B6A5D0;
}

/* Never suppress focus — keep visible for keyboard users */
button:focus-visible {
  outline: 3px solid #B6A5D0;
  outline-offset: 3px;
}

// JavaScript
for (let btn of document.querySelectorAll('button')) {
  btn.addEventListener('click', () => {
    const newText = btn.textContent === 'cat' ? 'dog' : 'cat';

    // Only update aria-label if the button uses one —
    // otherwise the accessible name drifts out of sync with the text
    if (btn.hasAttribute('aria-label')) {
      btn.setAttribute('aria-label', newText);
    }

    btn.textContent = newText;
  });
}`,
  },
  {
    id: "progress-bar",
    name: "Accessible Progress Bar",
    description:
      "A shipping progress tracker using role=\"progressbar\" with aria-valuenow, aria-valuemin, and aria-valuemax — updated via JS so screen readers announce the current step.",
    category: "feedback",
    tags: ["role=progressbar", "aria-valuenow", "aria-current"],
    Preview: ProgressBarPreview,
    code: `<!-- HTML -->
<div
  class="progress-container"
  role="progressbar"
  aria-valuenow="1"
  aria-valuemin="0"
  aria-valuemax="4"
  aria-label="Shipping Progress"
>
  <div class="progress-bar" id="progress-bar"></div>
</div>

<ul class="shipping-steps">
  <!-- aria-current="step" marks the active step for screen readers -->
  <li class="step completed" aria-current="step">Order Placed</li>
  <li class="step">Processing</li>
  <li class="step">Shipped</li>
  <li class="step">Delivered</li>
</ul>

<button onclick="nextStep()">Next Step</button>

/* CSS */
.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 20px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  width: 0;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.shipping-steps {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  gap: 8px;
}

.shipping-steps .step {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.shipping-steps .step.completed {
  background-color: #4caf50;
  color: white;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #4E3C51;
  color: #fff;
  cursor: pointer;
}

button:focus-visible {
  outline: 3px solid #A288BF;
  outline-offset: 3px;
}

// JavaScript
let currentStep = 1;

function nextStep() {
  const steps = document.querySelectorAll('.shipping-steps .step');
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.querySelector('.progress-container');

  if (currentStep < steps.length) {
    // Remove aria-current from previous step
    steps[currentStep - 1].removeAttribute('aria-current');

    steps[currentStep].classList.add('completed');
    steps[currentStep].setAttribute('aria-current', 'step');
    currentStep++;

    progressBar.style.width = \`\${(currentStep / steps.length) * 100}%\`;

    // Update aria-valuenow so screen readers announce the new value
    progressContainer.setAttribute('aria-valuenow', currentStep);
  }
}`,
  },
  {
    id: "toggletip",
    name: "Third-Party Disclaimer Toggletip",
    description:
      "A toggletip that injects disclaimer content into the DOM only when expanded — keeping it out of the tab order when hidden. Uses aria-expanded, aria-describedby, and aria-live for full screen reader support.",
    category: "disclosure",
    tags: ["aria-expanded", "aria-live", "toggletip", "WCAG 1.4.13"],
    Preview: ToggletipPreview,
    code: `<!-- HTML -->
<!-- aria-describedby links the button to the aside.
     aria-expanded communicates open/closed state.
     Content is injected via JS only when open — so it's only
     in the tab order when the toggletip is expanded. -->
<button
  id="toggleBtn"
  aria-describedby="content"
  aria-expanded="false"
>
  <img src="i.png" width="15" alt="information tooltip" />
</button>

<aside id="content">
  <!-- Empty until opened — injected by JS below -->
</aside>

/* CSS */
button {
  border: 1px solid black;
  border-radius: 100%;
  width: 19px;
  height: 19px;
  padding: 0;
  cursor: pointer;
}

button:focus-visible {
  outline: 2px solid black;
  outline-offset: 3px;
}

#content {
  display: none;
  position: absolute;
  z-index: 99;
  background: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  font-size: 0.8em;
}

// JavaScript
const btn = document.getElementById("toggleBtn");
const content = document.getElementById("content");

function showToggletip() {
  btn.setAttribute("aria-expanded", "true");

  // Inject content only on open — aria-live announces it to screen readers.
  // When closed, the empty aside is ignored by assistive tech.
  content.innerHTML = \`
    <span role="group" aria-live="polite">
      Please note that while we make every effort to ensure our own
      content is accessible, some pages on
      <a href="#">WEBSITE NAME HERE</a>
      may contain third-party content that is not fully accessible.
      Contact us at ###-###-#### for more assistance.
    </span>
  \`;
  content.style.display = "block";
}

function hideToggletip() {
  btn.setAttribute("aria-expanded", "false");
  content.innerHTML = "";
  content.style.display = "none";
}

function toggleToggletip() {
  const isHidden =
    window.getComputedStyle(content).getPropertyValue("display") === "none";
  isHidden ? showToggletip() : hideToggletip();
}

btn.addEventListener("click", toggleToggletip);

// Escape and Ctrl dismiss only — they do not re-open
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Control") {
    hideToggletip();
  }
});`,
  },
];

export const ALL_CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Forms", value: "forms" },
  { label: "Navigation", value: "navigation" },
  { label: "Disclosure", value: "disclosure" },
  { label: "Feedback", value: "feedback" },
];
