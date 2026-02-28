import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import type { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Tech", href: "#tech" },
  { label: "More About Me", href: "#more-about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    // <header> already carries the implicit ARIA "banner" landmark — no role needed
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
      >
        {/* Brand — links to page top */}
        <a
          href="/"
          className="text-dark-gray font-bold text-xl tracking-tight rounded px-1
                     hover:text-deep-purple transition-colors focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-input-focus"
        >
          junojsx
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-controls="nav-menu"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-dark-gray p-2 rounded hover:text-deep-purple transition-colors"
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {/* Nav links */}
        <ul
          id="nav-menu"
          className={[
            "absolute md:static top-full left-0 right-0",
            "bg-white md:bg-transparent border-b border-gray-200 md:border-none",
            "flex-col md:flex-row md:flex gap-1 items-center",
            "px-4 md:px-0 pb-4 md:pb-0",
            menuOpen ? "flex" : "hidden md:flex",
          ].join(" ")}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={
                  activeSection === link.href ? "location" : undefined
                }
                onClick={() => setMenuOpen(false)}
                className={[
                  "block px-3 py-2 rounded text-sm font-medium transition-colors",
                  activeSection === link.href
                    ? "text-deep-purple"
                    : "text-dark-gray hover:text-deep-purple",
                ].join(" ")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
