import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  // Lower lerp → more immediate response. 0.09 felt like wading through water.
  lenis = new Lenis({ lerp: 0.15, smoothWheel: true, wheelMultiplier: 1.05 });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -64,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToTopImmediate() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
