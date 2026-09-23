import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Blog from "@/components/sections/Blog";

export default function BlogPage() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Blog standalone />
    </main>
  );
}
