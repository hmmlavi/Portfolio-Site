import { useEffect, useRef } from "react";
import { isFinePointer, prefersReducedMotion } from "@/hooks/useInView";

/**
 * Custom cursor — a single fixed-shape dot, nothing follows or lags behind it.
 * Dot + aura positions are coalesced into one style write per frame, so it stays
 * smooth and cheap at any display refresh rate (60 / 120 / 144 / 240Hz).
 * Disabled entirely on touch devices and for reduced-motion users.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot) return;

    document.documentElement.classList.add("has-custom-cursor");
    dot.style.opacity = "1";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dirty = false;
    let raf = 0;
    let running = true;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dirty = true; // rendered on the next frame, never more than once per frame
    };

    const loop = () => {
      if (!running) return;
      if (dirty) {
        dirty = false;
        // both layers move via transform only — no layout, no full-page repaint
        const shift = `translate3d(${mx}px, ${my}px, 0)`;
        dot.style.transform = `${shift} translate(-50%,-50%)`;
        if (aura) aura.style.transform = shift;
      }
      raf = requestAnimationFrame(loop);
    };

    const onLeaveWindow = () => {
      dot.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot opacity-0" aria-hidden="true" />
      <div ref={auraRef} className="aura" aria-hidden="true" />
    </>
  );
}
