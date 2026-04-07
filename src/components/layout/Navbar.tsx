import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import type { NavLink } from "@/types";
import { blogPosts } from "@/data/blogPosts";

const navLinksBeforeBlog: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Tech", href: "#tech" },
  { label: "More About Me", href: "#more-about" },
  { label: "Projects", href: "#projects" },
];

const navLinksAfterBlog: NavLink[] = [{ label: "Contact", href: "#contact" }];

const BLOG_FLYOUT_ID = "nav-blog-flyout";

function homeHashPath(hash: string) {
  return `/${hash}`;
}

export default function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogNavOpen, setBlogNavOpen] = useState(false);
  const blogNavRef = useRef<HTMLLIElement>(null);

  const onHomePage = location.pathname === "/";
  const onBlogPage = location.pathname === "/blog";

  useEffect(() => {
    if (!blogNavOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const el = blogNavRef.current;
      if (el && !el.contains(e.target as Node)) setBlogNavOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [blogNavOpen]);

  useEffect(() => {
    if (!onHomePage) return;
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
  }, [onHomePage, location.pathname]);

  useEffect(() => {
    if (!menuOpen && !blogNavOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setBlogNavOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, blogNavOpen]);

  return (
    // <header> already carries the implicit ARIA "banner" landmark — no role needed
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setMenuOpen(false);
        }
      }}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
      >
        <Link
          to="/"
          className="text-dark-gray font-bold text-xl tracking-tight rounded px-1
                     hover:text-deep-purple transition-colors focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-input-focus"
        >
          junojsx
        </Link>

        <button
          type="button"
          aria-controls="nav-menu"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() =>
            setMenuOpen((open) => {
              if (open) {
                setBlogNavOpen(false);
                return false;
              }
              return true;
            })
          }
          className="md:hidden text-dark-gray p-2 rounded hover:text-deep-purple transition-colors"
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <ul
          id="nav-menu"
          className={[
            "absolute md:static top-full left-0 right-0",
            "bg-white md:bg-transparent border-b border-gray-200 md:border-none",
            "flex flex-col md:flex-row gap-1 items-center",
            "px-4 md:px-0 pb-4 md:pb-0",
            "transition-all duration-200 ease-in-out",
            menuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-1 invisible md:opacity-100 md:translate-y-0 md:visible",
          ].join(" ")}
        >
          {navLinksBeforeBlog.map((link) => (
            <li key={link.href}>
              <Link
                to={homeHashPath(link.href)}
                aria-current={
                  onHomePage && activeSection === link.href
                    ? "location"
                    : undefined
                }
                onClick={() => {
                  setMenuOpen(false);
                  setBlogNavOpen(false);
                }}
                className={[
                  "block px-3 py-2 rounded text-sm font-medium transition-colors",
                  onHomePage && activeSection === link.href
                    ? "text-deep-purple"
                    : "text-dark-gray hover:text-deep-purple",
                ].join(" ")}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li ref={blogNavRef} className="relative w-full md:w-auto">
            <div
              className={[
                "flex flex-col md:block rounded-lg md:rounded-none",
                blogNavOpen ? "bg-light-gray/80 md:bg-transparent" : "",
              ].join(" ")}
            >
              <button
                type="button"
                aria-expanded={blogNavOpen}
                aria-controls={BLOG_FLYOUT_ID}
                aria-haspopup="true"
                id="nav-blog-trigger"
                onClick={() => setBlogNavOpen((v) => !v)}
                className={[
                  "flex w-full md:w-auto items-center justify-between gap-1 px-3 py-2 rounded text-sm font-medium transition-colors",
                  onBlogPage || blogNavOpen
                    ? "text-deep-purple"
                    : "text-dark-gray hover:text-deep-purple",
                ].join(" ")}
              >
                Blog
                <ChevronDown
                  className={[
                    "h-4 w-4 shrink-0 transition-transform",
                    blogNavOpen ? "rotate-180" : "",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </button>

              <ul
                id={BLOG_FLYOUT_ID}
                role="list"
                hidden={!blogNavOpen}
                aria-labelledby="nav-blog-trigger"
                className={[
                  "md:absolute md:left-0 md:top-full md:mt-1 md:min-w-[14rem]",
                  "flex flex-col gap-0.5 py-1 md:py-2 md:rounded-lg md:border md:border-gray-200 md:bg-white md:shadow-md",
                  "pl-3 md:pl-2 pr-3 md:pr-2 pb-2 md:pb-2 mx-0",
                ].join(" ")}
              >
                <li>
                  <Link
                    to="/blog"
                    aria-current={
                      onBlogPage && !location.hash ? "page" : undefined
                    }
                    onClick={() => {
                      setBlogNavOpen(false);
                      setMenuOpen(false);
                    }}
                    className={[
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      onBlogPage && !location.hash
                        ? "bg-deep-purple/10 text-deep-purple font-medium"
                        : "text-dark-gray hover:bg-light-gray hover:text-deep-purple",
                    ].join(" ")}
                  >
                    All posts
                  </Link>
                </li>
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog#${post.slug}`}
                      aria-current={
                        onBlogPage && location.hash === `#${post.slug}`
                          ? "page"
                          : undefined
                      }
                      onClick={() => {
                        setBlogNavOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-dark-gray/90 hover:bg-light-gray hover:text-deep-purple transition-colors leading-snug"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {navLinksAfterBlog.map((link) => (
            <li key={link.href}>
              <Link
                to={homeHashPath(link.href)}
                aria-current={
                  onHomePage && activeSection === link.href
                    ? "location"
                    : undefined
                }
                onClick={() => {
                  setMenuOpen(false);
                  setBlogNavOpen(false);
                }}
                className={[
                  "block px-3 py-2 rounded text-sm font-medium transition-colors",
                  onHomePage && activeSection === link.href
                    ? "text-deep-purple"
                    : "text-dark-gray hover:text-deep-purple",
                ].join(" ")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
