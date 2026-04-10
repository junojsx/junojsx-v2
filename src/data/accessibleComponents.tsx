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
  const [skipFocused, setSkipFocused] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
      <p className="max-w-xs text-center text-xs text-[#2C2C2C]/70">
        Tab into the demo — the skip link snaps in from off-screen on focus.
      </p>

      {/* Mini browser frame */}
      <div className="w-full max-w-sm overflow-hidden rounded-lg border border-[#2C2C2C]/15 bg-white shadow-sm">
        {/* Header with nav */}
        <header style={{ backgroundColor: "#2f1b47", position: "relative" }}>
          {/* Skip link — off-screen by default, snaps in on focus */}
          <div id="skip">
            <a
              href="#skip-demo-content"
              onFocus={() => setSkipFocused(true)}
              onBlur={() => setSkipFocused(false)}
              style={
                skipFocused
                  ? {
                      position: "static",
                      display: "inline-block",
                      color: "#fff",
                      background: "#7041af",
                      padding: "6px 10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }
                  : {
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                      color: "#fff",
                    }
              }
            >
              Skip to main content &gt;&gt;&gt;
            </a>
          </div>

          <nav id="primary-nav" aria-label="Main">
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: "10px 0",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "14px",
              }}
            >
              {["Introduction", "Tips", "Resources", "Contact"].map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: "#fff", fontSize: "11px", textDecoration: "none" }}
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E3C16F] focus-visible:outline-offset-2 rounded-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main id="skip-demo-content" tabIndex={-1} className="px-4 py-4 outline-none">
          <h2 className="text-sm font-bold text-[#2f1b47]">Recipe for Programming</h2>
          <h3 className="mt-1 text-xs font-semibold text-[#2C2C2C]/80">
            Hello, my name is Justin.
          </h3>
          <p className="mt-1 text-[10px] leading-relaxed text-[#2C2C2C]/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit…
          </p>
        </main>
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
        className="group relative inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
            borderColor: hasError ? "#ef4444" : "#5E4080",
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
        className="rounded-lg bg-[#4E3C51] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
        className="rounded-lg bg-[#4E3C51] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
                  className="rounded-lg border border-[#2C2C2C]/20 px-4 py-2 text-sm font-medium text-[#2C2C2C] hover:bg-[#F5F5F5] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg bg-[#4E3C51] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A2D3B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-[#2C2C2C] text-left bg-white hover:bg-[#F5F5F5] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5E4080]"
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
          className="rounded-lg bg-[#1A7A74] px-4 py-2 text-sm font-medium text-white hover:bg-[#145f5a] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
        >
          Save (polite)
        </button>
        <button
          type="button"
          onClick={() => announce("Error: Could not complete request.", "assertive")}
          className="rounded-lg bg-[#94632F] px-4 py-2 text-sm font-medium text-white hover:bg-[#7a5126] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
        className="focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
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
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E4080]"
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

// ─── 11. Accessible Flip Card ────────────────────────────────────────────────

function FlipCardPreview() {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((v) => !v);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-6"
      style={{ perspective: "1000px" }}>

      {/* Screen-reader instruction — visually hidden */}
      <span id="flip-desc-preview" className="sr-only">
        This is a flip card. Activated by pressing Enter or Space.
      </span>

      <div
        role="button"
        aria-pressed={flipped}
        aria-describedby="flip-desc-preview"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if ((e.code === "Enter" || e.code === "Space") && !e.repeat) {
            e.preventDefault();
            toggle();
          }
        }}
        style={{
          width: "210px",
          height: "280px",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
          outline: "none",
          borderRadius: "16px",
        }}
        className="focus-visible:ring-4 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #4E3C51 0%, #7c5c8a 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow: "0 8px 32px rgba(78,60,81,0.35)",
            color: "#fff",
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={1.5} style={{ width: "40px", opacity: 0.8 }}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.02em" }}>
            Front Content
          </span>
          <span style={{ fontSize: "0.72rem", opacity: 0.65 }}>
            Press Enter or Space to flip
          </span>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #1A7A74 0%, #2aada5 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            boxShadow: "0 8px 32px rgba(26,122,116,0.35)",
            color: "#fff",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "0.9rem", textAlign: "center", lineHeight: 1.6 }}>
            Back with Small Content
          </p>
          <a
            href="#"
            tabIndex={flipped ? 0 : -1}
            onClick={(e) => e.preventDefault()}
            style={{
              color: "#ccff7d",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2C2C2C] focus-visible:outline-offset-2 rounded"
          >
            Homepage
          </a>
        </div>
      </div>

      <p style={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
        <code style={{ color: "#4E3C51" }}>aria-pressed="{String(flipped)}"</code>
        {" · "}back link tabIndex: <code style={{ color: "#4E3C51" }}>{flipped ? 0 : -1}</code>
      </p>
    </div>
  );
}

// ─── 12. Accessible Tabs ─────────────────────────────────────────────────────

function TabsPreview() {
  const tabs = [
    {
      letter: "A",
      title: "Aria",
      body: "ARIA roles like role=\"tablist\", role=\"tab\", and role=\"tabpanel\" tell assistive tech how the widget is wired together.",
    },
    {
      letter: "B",
      title: "Buttons",
      body: "Each tab is a real <button> — keyboard activation, focus styles, and Enter/Space all come for free.",
    },
    {
      letter: "C",
      title: "Controls",
      body: "aria-controls links a tab to its panel; aria-labelledby links the panel back. Both directions matter.",
    },
    {
      letter: "D",
      title: "Direction keys",
      body: "Arrow keys move focus between tabs. Home jumps to the first, End to the last — the WAI-ARIA tabs pattern.",
    },
    {
      letter: "E",
      title: "Elected one",
      body: "Roving tabindex: only the active tab is in the Tab order (tabindex=0); the others are tabindex=-1.",
    },
  ];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="flex h-full flex-col justify-center px-5 py-5">
      <div
        role="tablist"
        aria-label="Alphabet tabs"
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px",
          background: "#EFEAF4",
          borderRadius: "10px",
        }}
      >
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.letter}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`preview-tab-${t.letter}`}
              aria-selected={isActive}
              aria-controls={`preview-panel-${t.letter}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={handleKey}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "0.78rem",
                fontWeight: 700,
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
                background: isActive ? "#4E3C51" : "transparent",
                color: isActive ? "#fff" : "#4E3C51",
                transition: "background 0.18s, color 0.18s",
                outline: "none",
              }}
              className="focus-visible:ring-2 focus-visible:ring-[#5E4080] focus-visible:ring-offset-2"
            >
              {t.letter}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.letter}
          role="tabpanel"
          id={`preview-panel-${t.letter}`}
          aria-labelledby={`preview-tab-${t.letter}`}
          hidden={i !== active}
          tabIndex={0}
          style={{
            marginTop: "12px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "#fff",
            border: "1px solid #E4DEEC",
            outline: "none",
          }}
          className="focus-visible:ring-2 focus-visible:ring-[#5E4080]"
        >
          <h3 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#4E3C51" }}>
            {t.title}
          </h3>
          <p style={{ margin: "6px 0 0", fontSize: "0.72rem", lineHeight: 1.55, color: "#2C2C2C" }}>
            {t.body}
          </p>
        </div>
      ))}

      <p className="mt-3 text-center text-[10px] text-[#2C2C2C]/55">
        ← → Arrow keys · Home / End
      </p>
    </div>
  );
}

// ─── 13. Accessible Image Gallery / Lightbox ────────────────────────────────

function ImageGalleryPreview() {
  const images = [
    { src: "https://placecats.com/neo/600/600", alt: "Kitten Neo" },
    { src: "https://placecats.com/bella/600/600", alt: "Kitten Bella" },
    { src: "https://placecats.com/millie/600/600", alt: "Kitten Millie" },
    { src: "https://placecats.com/louie/600/600", alt: "Kitten Louie" },
  ];
  const [enlarged, setEnlarged] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 30);
      return () => clearTimeout(t);
    } else if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((idx) => (idx === null ? 0 : (idx + 1) % images.length));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex((idx) =>
          idx === null ? 0 : (idx - 1 + images.length) % images.length,
        );
      } else if (e.key === "Tab") {
        const order = [closeBtnRef.current, prevBtnRef.current, nextBtnRef.current].filter(
          Boolean,
        ) as HTMLElement[];
        if (order.length === 0) return;
        const i = order.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        const nextI = e.shiftKey
          ? (i - 1 + order.length) % order.length
          : (i + 1) % order.length;
        order[nextI].focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  function openAt(i: number, trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setLightboxIndex(i);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[260px]">
        {/* Enlarged photo */}
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #E4DEEC",
            background: "#fff",
            marginBottom: "8px",
            boxShadow: "0 2px 8px rgba(78, 60, 81, 0.08)",
          }}
        >
          <img
            src={images[enlarged].src}
            alt={images[enlarged].alt}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "6px" }}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Expand ${img.alt} into lightbox view`}
              onMouseOver={() => setEnlarged(i)}
              onFocus={() => setEnlarged(i)}
              onClick={(e) => openAt(i, e.currentTarget)}
              style={{
                flex: 1,
                padding: 0,
                border:
                  enlarged === i ? "2px solid #4E3C51" : "2px solid #E4DEEC",
                borderRadius: "8px",
                background: "transparent",
                cursor: "pointer",
                overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5E4080] focus-visible:outline-offset-2"
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "42px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            style={{
              position: "absolute",
              inset: "-12px",
              background: "rgba(46, 33, 49, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              borderRadius: "12px",
            }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "28px",
                height: "28px",
                borderRadius: "9999px",
                background: "#4E3C51",
                color: "#fff",
                border: "1px solid #B6A5D0",
                fontSize: "16px",
                lineHeight: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E3C16F] focus-visible:outline-offset-2"
            >
              ×
            </button>
            <div style={{ textAlign: "center" }}>
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                style={{
                  maxWidth: "170px",
                  maxHeight: "130px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #B6A5D0",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <button
                  ref={prevBtnRef}
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setLightboxIndex((idx) =>
                      idx === null ? 0 : (idx - 1 + images.length) % images.length,
                    )
                  }
                  style={{
                    background: "#1A7A74",
                    color: "#fff",
                    border: "none",
                    padding: "5px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E3C16F] focus-visible:outline-offset-2"
                >
                  ‹
                </button>
                <button
                  ref={nextBtnRef}
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setLightboxIndex((idx) =>
                      idx === null ? 0 : (idx + 1) % images.length,
                    )
                  }
                  style={{
                    background: "#1A7A74",
                    color: "#fff",
                    border: "none",
                    padding: "5px 12px",
                    fontSize: "13px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E3C16F] focus-visible:outline-offset-2"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-[10px] text-[#2C2C2C]/55">
        Hover / focus thumbs · Click to open · Esc / ← → in lightbox
      </p>
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
    code: `<!-- HTML -->
<header>
  <div id="skip">
    <!-- Visually hidden until focused — then snaps into view -->
    <a href="#content">Skip to main content &gt;&gt;&gt;</a>
  </div>

  <nav id="primary-nav" aria-label="Main">
    <ul>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#tips">Tips</a></li>
      <li><a href="#resources">Resources</a></li>
      <li><a href="#contact-form">Contact Form</a></li>
    </ul>
  </nav>
</header>

<!-- id="content" matches href="#content" on the skip link -->
<main id="content">
  <h2>Recipe for Programming</h2>
  <section id="introduction">
    <h3>Hello, my name is Justin.</h3>
    <p>Lorem ipsum…</p>
  </section>
</main>

/* CSS */
:root {
  --nav-color: #fff;
  --main-link: #7041af;
  --primary: #2f1b47;
}

header {
  background-color: var(--primary);
}

#primary-nav {
  background-color: var(--primary);
}

#primary-nav ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

#primary-nav ul li {
  display: inline;
  padding: 5%;
}

#primary-nav ul li a {
  color: var(--nav-color);
  font-size: large;
}

/* Focus/hover indicator on nav links */
#primary-nav ul li a:focus,
#primary-nav ul li a:hover {
  outline: 2px solid var(--main-link);
  border-radius: 5px;
}

/* Skip link — off-screen by default */
#skip a {
  position: absolute;
  color: #fff;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Becomes visible when focused by keyboard */
#skip a:focus {
  position: static;
  height: auto;
  width: auto;
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
  outline: 3px solid #5E4080;
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
  {
    id: "flip-card",
    name: "Accessible Flip Card",
    description:
      "A 3D flip card using role=\"button\" and aria-pressed to communicate state. The back-side link is removed from the tab order with tabindex=\"-1\" when hidden, and restored when flipped.",
    category: "disclosure",
    tags: ["aria-pressed", "tabindex", "flip-card"],
    Preview: FlipCardPreview,
    code: `<!-- HTML -->
<!-- role="button" + aria-pressed replaces a native checkbox for a
     custom toggle. aria-describedby points to the sr-only instruction. -->
<div
  class="flip-card"
  role="button"
  aria-pressed="false"
  tabindex="0"
  aria-describedby="flip-desc"
>
  <div class="flip-card-inner">
    <div class="flip-card-front" id="front" aria-hidden="false">
      Front Content
    </div>

    <div class="flip-card-back" aria-hidden="true" id="back">
      <p>Back with Small Content</p>
      <!-- tabindex="-1" removes this from tab order while hidden -->
      <a href="#" tabindex="-1" id="linkRemove">Homepage</a>
    </div>
  </div>
</div>

<!-- Visually hidden instruction for screen readers -->
<span class="sr-only" id="flip-desc">
  This is a flip card. Activated by pressing Enter or Space.
</span>

/* CSS */
.flip-card {
  perspective: 1000px;
  width: 220px;
  height: 300px;
  position: relative;
  cursor: pointer;
  border-radius: 16px;
}

.flip-card:focus-visible {
  outline: 3px solid #5E4080;
  outline-offset: 4px;
}

.flip-card[aria-pressed="true"] .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
  border-radius: 16px;
}

.flip-card-front,
.flip-card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: bold;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.flip-card-front {
  background: linear-gradient(135deg, #4E3C51, #7c5c8a);
  color: #fff;
}

.flip-card-back {
  background: linear-gradient(135deg, #1A7A74, #2aada5);
  color: #fff;
  transform: rotateY(180deg);
  padding: 24px;
  text-align: center;
}

.flip-card-back a {
  color: #ccff7d;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.flip-card-back a:focus-visible {
  outline: 2px solid #ccff7d;
  outline-offset: 3px;
  border-radius: 3px;
}

.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

// JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(function (card) {
    card.addEventListener('click', () => toggle(card));

    card.addEventListener('keydown', function (e) {
      if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
        e.preventDefault();
        toggle(card);
      }
    });
  });

  function toggle(card) {
    const isPressed = card.getAttribute('aria-pressed') === 'true';
    const flipped = !isPressed;

    // Update toggle state
    card.setAttribute('aria-pressed', String(flipped));

    // Swap aria-hidden so SR only reads the visible face
    document.getElementById('front').setAttribute('aria-hidden', String(flipped));
    document.getElementById('back').setAttribute('aria-hidden', String(!flipped));

    // Move the back-side link in/out of tab order
    const link = document.getElementById('linkRemove');
    link.setAttribute('tabindex', flipped ? '0' : '-1');
  }
});`,
  },
  {
    id: "tabs",
    name: "Accessible Tabs",
    description:
      "WAI-ARIA tabs pattern with proper roles, arrow-key navigation, and roving tabindex so screen readers and keyboard users get full first-class support.",
    category: "disclosure",
    tags: ["role=tablist", "arrow-keys", "roving-tabindex", "WAI-ARIA"],
    Preview: TabsPreview,
    code: `<!-- HTML -->
<div class="tabs">
  <div role="tablist" aria-label="Alphabet sections">
    <button role="tab" id="tab-A" aria-selected="true"  aria-controls="panel-A" tabindex="0">A</button>
    <button role="tab" id="tab-B" aria-selected="false" aria-controls="panel-B" tabindex="-1">B</button>
    <button role="tab" id="tab-C" aria-selected="false" aria-controls="panel-C" tabindex="-1">C</button>
    <button role="tab" id="tab-D" aria-selected="false" aria-controls="panel-D" tabindex="-1">D</button>
    <button role="tab" id="tab-E" aria-selected="false" aria-controls="panel-E" tabindex="-1">E</button>
  </div>

  <div role="tabpanel" id="panel-A" aria-labelledby="tab-A" tabindex="0">
    <h3>Aria</h3>
    <p>ARIA roles tell assistive tech how the widget is wired together.</p>
  </div>
  <div role="tabpanel" id="panel-B" aria-labelledby="tab-B" tabindex="0" hidden>
    <h3>Buttons</h3>
    <p>Each tab is a real &lt;button&gt; — Enter / Space activation comes for free.</p>
  </div>
  <div role="tabpanel" id="panel-C" aria-labelledby="tab-C" tabindex="0" hidden>
    <h3>Controls</h3>
    <p>aria-controls links a tab to its panel; aria-labelledby links it back.</p>
  </div>
  <div role="tabpanel" id="panel-D" aria-labelledby="tab-D" tabindex="0" hidden>
    <h3>Direction keys</h3>
    <p>Arrow keys move focus between tabs. Home / End jump to first / last.</p>
  </div>
  <div role="tabpanel" id="panel-E" aria-labelledby="tab-E" tabindex="0" hidden>
    <h3>Elected one</h3>
    <p>Roving tabindex: only the active tab is in the Tab order.</p>
  </div>
</div>

/* CSS */
.tabs [role="tablist"] {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #efeaf4;
  border-radius: 10px;
}

.tabs [role="tab"] {
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: #4e3c51;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}

.tabs [role="tab"][aria-selected="true"] {
  background: #4e3c51;
  color: #fff;
}

.tabs [role="tab"]:focus-visible {
  outline: 2px solid #a288bf;
  outline-offset: 2px;
}

.tabs [role="tabpanel"] {
  margin-top: 12px;
  padding: 16px 18px;
  background: #fff;
  border: 1px solid #e4deec;
  border-radius: 10px;
}

.tabs [role="tabpanel"]:focus-visible {
  outline: 2px solid #a288bf;
  outline-offset: 2px;
}

/* JavaScript */
const tablist = document.querySelector('[role="tablist"]');
const tabs = [...tablist.querySelectorAll('[role="tab"]')];
const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

function activate(index) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
  tabs[index].focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activate(i));

  tab.addEventListener('keydown', (e) => {
    const last = tabs.length - 1;
    let next;
    switch (e.key) {
      case 'ArrowRight': next = i === last ? 0 : i + 1; break;
      case 'ArrowLeft':  next = i === 0 ? last : i - 1; break;
      case 'Home':       next = 0; break;
      case 'End':        next = last; break;
      default: return;
    }
    e.preventDefault();
    activate(next);
  });
});`,
  },
  {
    id: "image-gallery",
    name: "Accessible Image Gallery",
    description:
      "Thumbnail gallery with hover/focus preview and a lightbox modal — focus is trapped inside, Escape closes, and focus returns to the triggering thumbnail on close.",
    category: "navigation",
    tags: ["lightbox", "focus-trap", "return-focus", "keyboard-nav"],
    Preview: ImageGalleryPreview,
    code: `<!-- HTML -->
<div class="image-gallery">
  <!-- Enlarged photo -->
  <div class="enlarged-photo">
    <img decoding="async" src="https://placecats.com/neo/600/600" alt="Kitten Neo">
  </div>

  <!-- Row of thumbnails -->
  <div class="thumbnails">
    <div class="thumbnail-button" role="button" tabindex="0" aria-label="Expand image into lightbox view">
      <img decoding="async" src="https://placecats.com/neo/600/600" alt="Kitten Neo">
    </div>
    <div class="thumbnail-button" role="button" tabindex="0" aria-label="Expand image into lightbox view">
      <img decoding="async" src="https://placecats.com/bella/600/600" alt="Kitten Bella">
    </div>
    <div class="thumbnail-button" role="button" tabindex="0" aria-label="Expand image into lightbox view">
      <img decoding="async" src="https://placecats.com/millie/600/600" alt="Kitten Millie">
    </div>
    <div class="thumbnail-button" role="button" tabindex="0" aria-label="Expand image into lightbox view">
      <img decoding="async" src="https://placecats.com/louie/600/600" alt="Kitten Louie">
    </div>
  </div>
</div>

<!-- Lightbox view (initially hidden) -->
<div class="lightbox-view hidden" role="dialog" aria-modal="true" aria-label="Image lightbox">
  <button class="close-btn" aria-label="Close lightbox">&times;</button>
  <div class="lightbox-content">
    <img decoding="async" src="" alt="Lightbox image">
    <div class="navigation">
      <button class="prev-btn" aria-label="Previous image">&lt;</button>
      <button class="next-btn" aria-label="Next image">&gt;</button>
    </div>
  </div>
</div>

/* CSS — themed with the portfolio palette */
.image-gallery {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Inter", system-ui, sans-serif;
}

/* Enlarged photo */
.enlarged-photo {
  text-align: center;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E4DEEC;
  background: #fff;
  box-shadow: 0 4px 16px rgba(78, 60, 81, 0.08);
}

.enlarged-photo img {
  width: 100%;
  height: auto;
  display: block;
}

/* Thumbnails row */
.thumbnails {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.thumbnail-button {
  flex: 1;
  display: inline-block;
  overflow: hidden;
  border: 2px solid #E4DEEC;
  border-radius: 10px;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.thumbnail-button:hover,
.thumbnail-button:focus-visible {
  border-color: #4E3C51; /* deep-purple */
  transform: translateY(-2px);
}

.thumbnail-button:focus-visible {
  outline: 2px solid #5E4080; /* input-focus */
  outline-offset: 2px;
}

.thumbnail-button img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease-in-out;
}

.thumbnail-button:hover img {
  transform: scale(1.05);
}

/* Lightbox overlay */
.lightbox-view {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background-color: rgba(46, 33, 49, 0.92); /* deep-purple wash */
  z-index: 9999;
  overflow: auto;
}

.lightbox-view.hidden {
  display: none;
}

.lightbox-content {
  position: relative;
  text-align: center;
  color: #fff;
  max-width: 90vw;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 12px;
  border: 2px solid #B6A5D0; /* soft-lavender frame */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

/* Close button */
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  font-size: 22px;
  line-height: 1;
  color: #fff;
  background-color: #4E3C51; /* deep-purple */
  border: 1px solid #B6A5D0;
  border-radius: 9999px;
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.25s ease;
}

.close-btn:hover {
  background-color: #3A2D3B; /* hover-active */
}

.close-btn:focus-visible {
  outline: 2px solid #E3C16F; /* warm-gold */
  outline-offset: 2px;
}

/* Prev / next nav */
.navigation {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.navigation button {
  background: #1A7A74; /* soft-teal */
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.25s ease, transform 0.15s ease;
}

.navigation button:hover {
  background: #155F5A;
  transform: translateY(-1px);
}

.navigation button:focus-visible {
  outline: 2px solid #E3C16F;
  outline-offset: 2px;
}

/* JavaScript */
const thumbnails = document.querySelectorAll(".thumbnails img");
const thumbnailBtns = document.querySelectorAll(".thumbnail-button");
const enlargedPhoto = document.querySelector(".enlarged-photo");
const lightboxView = document.querySelector(".lightbox-view");
const lightboxImage = document.querySelector(".lightbox-view .lightbox-content img");
const closeBtn = document.querySelector(".lightbox-view .close-btn");
const nextBtn = document.querySelector(".lightbox-view .next-btn");
const prevBtn = document.querySelector(".lightbox-view .prev-btn");
let currentImageIndex = 0;
let lastFocusedThumbnail = null;

// Update enlarged photo on hover or focus
function updateEnlargedPhoto(event) {
  const src =
    event.target.tagName === "IMG"
      ? event.target.src
      : event.target.querySelector("img").src;
  enlargedPhoto.innerHTML = \`<img decoding="async" src="\${src}" alt="Enlarged image">\`;
}

// Focus trap inside the lightbox
function manageFocusTrap(event) {
  if (event.key !== "Tab") return;
  const order = [closeBtn, prevBtn, nextBtn];
  const i = order.indexOf(document.activeElement);
  if (i === -1) return;
  event.preventDefault();
  const next = event.shiftKey
    ? (i - 1 + order.length) % order.length
    : (i + 1) % order.length;
  order[next].focus();
}

// Open lightbox
function openLightbox(event) {
  const src =
    event.target.tagName === "IMG"
      ? event.target.src
      : event.target.querySelector("img").src;
  lightboxImage.src = src;
  lightboxView.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  lastFocusedThumbnail = event.currentTarget;
  document.addEventListener("keydown", manageFocusTrap);
  document.addEventListener("keydown", onEscape);
  setTimeout(() => closeBtn.focus(), 50);
}

// Close lightbox + restore focus
function closeLightbox() {
  lightboxView.classList.add("hidden");
  document.body.style.overflow = "auto";
  document.removeEventListener("keydown", manageFocusTrap);
  document.removeEventListener("keydown", onEscape);
  if (lastFocusedThumbnail) lastFocusedThumbnail.focus();
}

function onEscape(event) {
  if (event.key === "Escape") closeLightbox();
}

// Update lightbox to current image
function updateLightboxImage() {
  lightboxImage.src = thumbnails[currentImageIndex].src;
}

function goToNextImage() {
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  updateLightboxImage();
}

function goToPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  updateLightboxImage();
}

// Wire it up
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("mouseover", updateEnlargedPhoto);
});

thumbnailBtns.forEach((thumbnail, i) => {
  thumbnail.addEventListener("focus", updateEnlargedPhoto);
  thumbnail.addEventListener("click", (e) => {
    currentImageIndex = i;
    openLightbox(e);
  });
  thumbnail.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      currentImageIndex = i;
      openLightbox(event);
    }
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", goToNextImage);
prevBtn.addEventListener("click", goToPrevImage);

updateLightboxImage();`,
  },
];

export const ALL_CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Forms", value: "forms" },
  { label: "Navigation", value: "navigation" },
  { label: "Disclosure", value: "disclosure" },
  { label: "Feedback", value: "feedback" },
];
