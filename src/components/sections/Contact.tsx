import { useState, useRef, type FormEvent, type FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const socialLinks = [
  {
    href: "mailto:junojsx@gmail.com",
    label: "Send email to junojsx@gmail.com",
    Icon: Mail,
    external: false,
  },
  {
    href: "https://github.com/junojsx",
    label: "GitHub profile (opens in new tab)",
    Icon: Github,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/justinaquino-dev/",
    label: "LinkedIn profile (opens in new tab)",
    Icon: Linkedin,
    external: true,
  },
];

type Fields = { name: string; email: string; message: string };
type FieldErrors = Partial<Fields>;

function validateField(field: keyof Fields, value: string): string | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      break;
    case "email":
      if (!value.trim()) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Enter a valid email address (e.g. you@example.com).";
      break;
    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters.";
      break;
  }
}

function validateAll(fields: Fields): FieldErrors {
  return Object.fromEntries(
    (Object.keys(fields) as (keyof Fields)[])
      .map((k) => [k, validateField(k, fields[k])])
      .filter(([, v]) => v !== undefined),
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  // Track which fields the user has interacted with so errors show on blur
  const [touched, setTouched] = useState<
    Partial<Record<keyof Fields, boolean>>
  >({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as keyof Fields;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, e.target.value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data: Fields = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const newErrors = validateAll(data);

    // Mark all fields as touched so all errors become visible
    setTouched({ name: true, email: true, message: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Move focus to the first invalid field (WCAG 3.3.1)
      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.message) messageRef.current?.focus();
      return;
    }

    setSubmitting(true);

    // Netlify Forms only handles POST / on the deployed site.
    // In local dev the endpoint doesn't exist, so we skip the fetch.
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      form.reset();
      setTouched({});
      setErrors({});
      setSubmitting(false);
      return;
    }

    const body = new URLSearchParams(
      new FormData(form) as unknown as Record<string, string>,
    ).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus("success");
      form.reset();
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  // Only show an error if the field has been touched or a submit was attempted
  const visibleError = (field: keyof Fields) =>
    touched[field] ? errors[field] : undefined;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-solid-black/100 bg-light-gray min-h-screen py-16 sm:py-24 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto pt-4 sm:pt-16 px-4">
        {/* Heading + social links */}
        <AnimateIn from="bottom" duration={600}>
          {/* Decorative label — aria-hidden since heading already describes the section */}
          <p
            className="text-soft-teal font-semibold uppercase tracking-widest text-sm text-center mb-3"
            aria-hidden="true"
          >
            Let's connect
          </p>
          <h2
            id="contact-heading"
            className="text-3xl font-bold text-dark-gray text-center mb-4"
          >
            Get in Touch
          </h2>
          <p className="text-center text-dark-gray/70 mb-10 max-w-md mx-auto">
            Available for full-time roles, freelance work, and accessibility
            consulting. I'd love to hear about what you're building.
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map(({ href, label, Icon, external }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full bg-deep-purple text-white
                           hover:bg-hover-active transition-colors"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </AnimateIn>

        {/* Contact form */}
        <AnimateIn from="bottom" delay={150} duration={650}>
          <form
            name="contact"
            onSubmit={handleSubmit}
            aria-label="Contact form"
            noValidate
            data-netlify="true"
            className="space-y-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm"
          >
            {/* Required by Netlify for JS-submitted forms */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-name"
                className="text-dark-gray font-medium"
              >
                Name
                <span aria-hidden="true" className="text-deep-purple ml-0.5">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </Label>
              <Input
                ref={nameRef}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={visibleError("name") ? "true" : "false"}
                aria-describedby={
                  visibleError("name") ? "contact-name-error" : undefined
                }
                placeholder="Your full name"
                onBlur={handleBlur}
                className={[
                  "border-input-focus/40 focus:border-input-focus",
                  visibleError("name")
                    ? "border-red-500 focus:border-red-500"
                    : "",
                ].join(" ")}
              />
              {visibleError("name") && (
                <p
                  id="contact-name-error"
                  role="alert"
                  className="text-red-600 text-xs flex items-center gap-1 mt-1"
                >
                  <span aria-hidden="true">❌</span>
                  {visibleError("name")}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-email"
                className="text-dark-gray font-medium"
              >
                Email
                <span aria-hidden="true" className="text-deep-purple ml-0.5">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </Label>
              <Input
                ref={emailRef}
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={visibleError("email") ? "true" : "false"}
                aria-describedby={
                  visibleError("email") ? "contact-email-error" : undefined
                }
                placeholder="you@example.com"
                onBlur={handleBlur}
                className={[
                  "border-input-focus/40 focus:border-input-focus",
                  visibleError("email")
                    ? "border-red-500 focus:border-red-500"
                    : "",
                ].join(" ")}
              />
              {visibleError("email") && (
                <p
                  id="contact-email-error"
                  role="alert"
                  className="text-red-600 text-xs flex items-center gap-1 mt-1"
                >
                  <span aria-hidden="true">❌</span>
                  {visibleError("email")}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label
                htmlFor="contact-message"
                className="text-dark-gray font-medium"
              >
                Message
                <span aria-hidden="true" className="text-deep-purple ml-0.5">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </Label>
              <Textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                required
                aria-required="true"
                aria-invalid={visibleError("message") ? "true" : "false"}
                aria-describedby={
                  visibleError("message") ? "contact-message-error" : undefined
                }
                rows={5}
                placeholder="Tell me what you're working on…"
                onBlur={handleBlur}
                className={[
                  "border-input-focus/40 focus:border-input-focus resize-none",
                  visibleError("message")
                    ? "border-red-500 focus:border-red-500"
                    : "",
                ].join(" ")}
              />
              {visibleError("message") && (
                <p
                  id="contact-message-error"
                  role="alert"
                  className="text-red-600 text-xs flex items-center gap-1 mt-1"
                >
                  <span aria-hidden="true">❌</span>
                  {visibleError("message")}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting || status === "success"}
              className="w-full bg-deep-purple hover:bg-hover-active text-white
                         disabled:opacity-60"
            >
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              {submitting
                ? "Sending…"
                : status === "success"
                  ? "Sent!"
                  : "Send Message"}
            </Button>

            {/* Live region — announced by screen readers on state change */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="text-center text-sm min-h-5"
            >
              {status === "success" && (
                <p className="text-soft-teal font-medium">
                  ✔️ Message sent! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 font-medium" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </form>
        </AnimateIn>
      </div>
    </section>
  );
}
