import * as React from 'react';

/**
 * The signature LAVI cursor — exact replica of the old site:
 *   • 6px white dot (mix-blend difference), near-instant follow
 *   • 300px violet/blue aura, dreamy trail
 *   • 520px spotlight glow, slowest drift
 *
 * Performance notes — built for 240Hz:
 *   • single requestAnimationFrame loop, nothing else
 *   • delta-time-corrected lerp → identical motion at 60 or 240fps
 *   • direct style.transform writes only (translate3d → GPU composited)
 *   • zero React state during the loop, zero layout reads per frame
 *   • passive listeners; hover scale lerped in-frame, not CSS-transitioned
 */
const LERP = { dot: 0.55, aura: 0.12, spot: 0.075 };

export default function CursorFX() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const auraRef = React.useRef<HTMLDivElement>(null);
  const spotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const aura = auraRef.current;
    const spot = spotRef.current;
    if (!fine || reduced || !dot || !aura || !spot) return;

    const html = document.documentElement;
    html.classList.add('has-custom-cursor');

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let dx = tx, dy = ty, ax = tx, ay = ty, sx = tx, sy = ty;
    let dScale = 1, dScaleT = 1, aScale = 1, aScaleT = 1;
    let started = false;
    let raf = 0;
    let last = performance.now();

    const damp = (cur: number, tgt: number, base: number, dt: number) =>
      cur + (tgt - cur) * (1 - Math.pow(1 - base, dt / 16.667));

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      dx = damp(dx, tx, LERP.dot, dt);
      dy = damp(dy, ty, LERP.dot, dt);
      ax = damp(ax, tx, LERP.aura, dt);
      ay = damp(ay, ty, LERP.aura, dt);
      sx = damp(sx, tx, LERP.spot, dt);
      sy = damp(sy, ty, LERP.spot, dt);
      dScale = damp(dScale, dScaleT, 0.18, dt);
      aScale = damp(aScale, aScaleT, 0.1, dt);

      dot.style.transform = `translate3d(${dx}px,${dy}px,0) scale(${dScale})`;
      aura.style.transform = `translate3d(${ax}px,${ay}px,0) scale(${aScale})`;
      spot.style.transform = `translate3d(${sx}px,${sy}px,0)`;

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!started) {
        started = true;
        dx = ax = sx = tx;
        dy = ay = sy = ty;
      }
      html.classList.remove('cursor-off');
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target instanceof Element ? e.target : null;
      const interactive = !!t?.closest?.('a, button, [role="button"], input, textarea, select, label');
      dScaleT = interactive ? 2.4 : 1;
      aScaleT = interactive ? 1.28 : 1;
    };

    const onLeave = () => html.classList.add('cursor-off');

    html.classList.add('cursor-off');
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      html.classList.remove('has-custom-cursor', 'cursor-off');
    };
  }, []);

  return (
    <>
      <div ref={spotRef} className="spotlight" aria-hidden="true" />
      <div ref={auraRef} className="aura" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
