import Home from "@/components/sections/Home";
import TechStack from "@/components/sections/TechStack";
import MoreAboutMe from "@/components/sections/MoreAboutMe";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
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
