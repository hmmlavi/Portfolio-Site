import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isFinePointer, prefersReducedMotion, useInView } from "@/hooks/useInView";

/** Scroll-triggered reveal wrapper (opacity + translate), once. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Magnetic hover — element gently follows the cursor on desktop. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ ok: false });

  const init = () => {
    state.current.ok = isFinePointer() && !prefersReducedMotion();
  };

  const onMove = (e: React.MouseEvent) => {
    if (!state.current.ok) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transition = "transform 0.12s ease-out";
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate(0px, 0px)";
  };

  const style: CSSProperties = { display: "inline-block" };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        init();
      }}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
