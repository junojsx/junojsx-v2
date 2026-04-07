import { Component, type ReactNode } from "react";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Blog from "@/components/sections/Blog";

class BlogErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: "red", fontSize: 18 }}>
          <strong>Blog crashed:</strong> {this.state.error.message}
          <pre style={{ fontSize: 12, marginTop: 8 }}>
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function BlogPage() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start" });
  }, [location.pathname, location.hash]);

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <BlogErrorBoundary>
        <Blog standalone />
      </BlogErrorBoundary>
    </main>
  );
}
