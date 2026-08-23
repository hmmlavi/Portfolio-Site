import { useEffect, useRef } from "react";
import { TECHS } from "@/data/content";
import { Reveal } from "@/components/anim";
import { prefersReducedMotion } from "@/hooks/useInView";

type Node = {
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bx: number;
  by: number;
  r: number;
  scale: number;
  phase: number;
};

export default function Constellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    // inner containment box — nodes stay fully inside the bordered panel
    let padX = 44;
    let padY = 30;
    let padTop = 48;
    let raf = 0;
    let visible = true;
    let hovered: Node | null = null;
    const mouse = { x: -9999, y: -9999, on: false };
    const rand = mulberry(42);

    const nodes: Node[] = TECHS.map((t) => ({
      name: t.name,
      color: t.color,
      x: 0,
      y: 0,
      vx: (rand() - 0.5) * 0.26,
      vy: (rand() - 0.5) * 0.26,
      bx: 0,
      by: 0,
      r: 2.1 + rand() * 1.3,
      scale: 1,
      phase: rand() * Math.PI * 2,
    }));

    function mulberry(seed: number) {
      let a = seed;
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.46;
      const golden = Math.PI * (3 - Math.sqrt(5));
      // containment box: side padding + extra headroom on top for node labels
      padX = Math.min(Math.max(w * 0.05, 34), 60);
      padY = Math.min(Math.max(h * 0.06, 28), 50);
      padTop = padY + 16;
      nodes.forEach((n, i) => {
        const frac = Math.sqrt((i + 0.7) / nodes.length);
        const angle = i * golden + 0.6;
        const ex = Math.cos(angle) * frac * maxR * (w / Math.max(h, 1)) * 0.94;
        const ey = Math.sin(angle) * frac * maxR * 0.86;
        const jx = (rand() - 0.5) * 26;
        const jy = (rand() - 0.5) * 26;
        n.x = Math.min(Math.max(cx + ex * 1.02 + jx, padX), w - padX);
        n.y = Math.min(Math.max(cy + ey + jy, padTop), h - padY);
      });
    };

    const step = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = Math.min(Math.min(w, h) * 0.34, 190);
      const linkDist2 = linkDist * linkDist;

      // physics
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          // damping back to a gentle base drift
          n.vx = n.vx * 0.985 + Math.sign(n.vx || 1) * 0.0012;
          n.vy = n.vy * 0.985 + Math.sign(n.vy || 1) * 0.0012;
          const sp = Math.hypot(n.vx, n.vy);
          const max = 0.55;
          if (sp > max) {
            n.vx = (n.vx / sp) * max;
            n.vy = (n.vy / sp) * max;
          }
          // soft mouse repulsion
          if (mouse.on) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 150 && d > 0.01) {
              const f = ((150 - d) / 150) * 0.34;
              n.vx += (dx / d) * f;
              n.vy += (dy / d) * f;
            }
          }
          // containment: steer inward near walls, reflect as a hard backstop
          const L = padX;
          const R = w - padX;
          const T = padTop;
          const B = h - padY;
          const soft = 34;
          if (n.x < L + soft) n.vx += ((L + soft - n.x) / soft) * 0.055;
          if (n.x > R - soft) n.vx -= ((n.x - (R - soft)) / soft) * 0.055;
          if (n.y < T + soft) n.vy += ((T + soft - n.y) / soft) * 0.055;
          if (n.y > B - soft) n.vy -= ((n.y - (B - soft)) / soft) * 0.055;
          if (n.x < L) {
            n.x = L;
            n.vx = Math.abs(n.vx) * 0.85 + 0.04;
          }
          if (n.x > R) {
            n.x = R;
            n.vx = -Math.abs(n.vx) * 0.85 - 0.04;
          }
          if (n.y < T) {
            n.y = T;
            n.vy = Math.abs(n.vy) * 0.85 + 0.04;
          }
          if (n.y > B) {
            n.y = B;
            n.vy = -Math.abs(n.vy) * 0.85 - 0.04;
          }
        }
        const target = n === hovered ? 1.9 : 1;
        n.scale += (target - n.scale) * 0.16;
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist2) continue;
          const d = Math.sqrt(d2);
          const k = 1 - d / linkDist;
          const hot = a === hovered || b === hovered;
          ctx.strokeStyle = hot
            ? `rgba(167,139,250,${0.12 + k * 0.45})`
            : `rgba(255,255,255,${0.02 + k * 0.09})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes + labels
      const showLabels = w >= 560;
      ctx.textAlign = "center";
      for (const n of nodes) {
        const isHot = n === hovered;
        const pulse = reduced ? 1 : 1 + 0.16 * Math.sin(t / 900 + n.phase);
        const r = n.r * pulse * n.scale;

        ctx.shadowBlur = isHot ? 22 : 7;
        ctx.shadowColor = n.color;
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isHot ? 1 : 0.82;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (isHot) {
          ctx.strokeStyle = `${hexToRgba(n.color, 0.55)}`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 9, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (showLabels || isHot) {
          ctx.font = `${isHot ? 600 : 400} ${isHot ? 11 : 10}px "JetBrains Mono", monospace`;
          ctx.fillStyle = isHot ? hexToRgba(n.color, 0.98) : "rgba(255,255,255,0.38)";
          // keep the label fully inside the panel, even for nodes near walls
          const half = ctx.measureText(n.name).width / 2;
          const lx = Math.min(Math.max(n.x, half + 8), w - half - 8);
          const ly = Math.max(n.y - r - 8, 14);
          ctx.fillText(n.name, lx, ly);
        }
      }
    };

    const loop = (t: number) => {
      step(t);
      if (!reduced && visible) raf = requestAnimationFrame(loop);
    };

    const hexToRgba = (hex: string, alpha: number) => {
      const v = hex.replace("#", "");
      const r = parseInt(v.substring(0, 2), 16);
      const g = parseInt(v.substring(2, 4), 16);
      const b = parseInt(v.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    layout();
    if (reduced) {
      step(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.on = true;
      let best: Node | null = null;
      let bestD = 42;
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      hovered = best;
    };
    const onLeave = () => {
      mouse.on = false;
      mouse.x = -9999;
      mouse.y = -9999;
      hovered = null;
    };

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) step(0);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? true;
        if (nowVisible && !visible && !reduced) {
          visible = true;
          raf = requestAnimationFrame(loop);
        }
        visible = nowVisible;
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="constellation"
      className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden"
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-violet-900/6 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-4">the stack</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Tech <span className="shimmer-text">Constellation</span>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className="glass rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              {TECHS.length} technologies · explored by building
            </span>
            <p className="text-xs text-white/30 max-w-xs sm:text-right leading-relaxed">
              Tools I reach for when turning experiments into shipped software. Hover the nodes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            ref={wrapRef}
            className="relative h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.025] to-transparent overflow-hidden"
            data-cursor
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(124,58,237,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
            <span className="sr-only">
              Interactive map of technologies: {TECHS.map((t) => t.name).join(", ")}
            </span>
          </div>
        </Reveal>

        {/* Accessible legend */}
        <Reveal delay={200}>
          <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Technologies list">
            {TECHS.map((t) => (
              <li
                key={t.name}
                className="glass rounded-full px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: t.color, boxShadow: `0 0 8px ${t.color}66` }}
                  aria-hidden="true"
                />
                {t.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
