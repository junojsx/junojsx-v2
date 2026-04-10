import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "@/components/sections/Home";
import TechStack from "@/components/sections/TechStack";
import MoreAboutMe from "@/components/sections/MoreAboutMe";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const location = useLocation();

  // React Router updates the URL hash but does not natively scroll the
  // target element into view, so the in-page nav links need a hand.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      // Wait one frame so any newly mounted sections are in the DOM.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash, location.key]);

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Home />
      <TechStack />
      <MoreAboutMe />
      <Projects />
      <Contact />
    </main>
  );
}
