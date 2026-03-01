import {
  type ElementType,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useRef,
  useState,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

type AnimateInProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** Delay before the entrance transition starts (ms). Use for staggering siblings. */
  delay?: number;
  /** Duration of the transition (ms). */
  duration?: number;
  /** Direction the element slides in from. "fade" is opacity-only. */
  from?: "bottom" | "fade";
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function AnimateIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 600,
  from = "bottom",
  className,
  style,
  ...rest
}: AnimateInProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<Element>(null);

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const hiddenTransform = from === "bottom" ? "translateY(2rem)" : "translateY(0)";

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : hiddenTransform,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        ...(style as object),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
