import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Blog from "@/components/sections/Blog";

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
      <Blog standalone />
    </main>
  );
}
