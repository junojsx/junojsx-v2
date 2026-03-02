import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView] — inView becomes true once the element enters the viewport.
 * Respects prefers-reduced-motion by starting as true (no animation).
 */
export function useInView(threshold = 0.1) {
  const ref = useRef<Element>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return; // skip if reduced motion already set visible

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView] as const;
}
