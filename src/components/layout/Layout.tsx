import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <Outlet />

      <footer className="bg-deep-purple text-white text-center py-6 text-sm">
        <p className="text-white/80">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">junojsx</span> — Built with
          React, Vite & TailwindCSS
        </p>
        <p className="mt-1 text-white/70 text-xs">
          Designed and built with accessibility in mind · WCAG AA compliant
        </p>
      </footer>
    </>
  );
}
