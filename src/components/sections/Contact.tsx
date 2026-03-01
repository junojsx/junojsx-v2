import { useState, type FormEvent } from "react";
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

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
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
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

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
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                placeholder="Your full name"
                className="border-input-focus/40 focus:border-input-focus"
              />
            </div>

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
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                placeholder="you@example.com"
                className="border-input-focus/40 focus:border-input-focus"
              />
            </div>

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
                id="contact-message"
                name="message"
                required
                aria-required="true"
                rows={5}
                placeholder="Tell me what you're working on…"
                className="border-input-focus/40 focus:border-input-focus resize-none"
              />
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
