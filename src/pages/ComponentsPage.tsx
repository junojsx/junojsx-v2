import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import AccessibleComponents from "@/components/sections/AccessibleComponents";

export default function ComponentsPage() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <AccessibleComponents standalone />
    </main>
  );
}
