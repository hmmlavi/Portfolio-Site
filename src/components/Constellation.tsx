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
  /** roaming heading — rotates slowly, so paths curve instead of straight lines */
  dir: number;
  wf: number;
  wp: number;
  r: number;
  scale: number;
};

type Link = { a: Node; b: Node; d: number };

export default function Constellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let hovered: Node | null = null;
    let links: Link[] = [];
    const mouse = { x: -9999, y: -9999, on: false };

    const rand = mulberry(21);
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

    const nodes: Node[] = TECHS.map((t) => ({
      name: t.name,
      color: t.color,
      x: 0,
      y: 0,
      vx: (rand() - 0.5) * 0.3,
      vy: (rand() - 0.5) * 0.3,
      dir: rand() * Math.PI * 2,
      wf: 0.05 + rand() * 0.09,
      wp: rand() * Math.PI * 2,
      r: 2.4 + rand() * 1.1,
      scale: 1,
    }));

    let minX = 14;
    let maxX = 100;
    let minY = 24;
    let maxY = 100;
    let REP = 100;
    let LINK = 140;

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      // cap at 1.5 — beyond this, extra pixels aren't visible but cost fill rate
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // boundary box (top has headroom so labels never clip)
      minX = 14;
      maxX = w - 14;
      minY = 24;
      maxY = h - 14;
      // radii scale with the panel, and with how crowded it is
      const area = Math.max(w * h, 1);
      const crowd = Math.sqrt(area / nodes.length);
      REP = Math.min(Math.max(crowd * 0.55, 58), 110);
      LINK = Math.min(Math.max(crowd * 0.8, 80), 165);

      // golden-spiral spread: nicely distributed starting positions
      const padX = Math.min(Math.max(w * 0.06, 28), 70);
      const padY = Math.min(Math.max(h * 0.07, 26), 56);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w - padX * 2, h - padY * 2) / 2;
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const frac = Math.sqrt((i + 0.6) / nodes.length);
        const ang = i * golden + 0.6;
        const x = cx + Math.cos(ang) * frac * maxR * 1.04;
        const y = cy + Math.sin(ang) * frac * maxR;
        n.x = Math.min(Math.max(x, minX), maxX);
        n.y = Math.min(Math.max(y, minY), maxY);
      }
    };

    const hexToRgba = (hex: string, alpha: number) => {
      const v = hex.replace("#", "");
      return `rgba(${parseInt(v.substring(0, 2), 16)},${parseInt(v.substring(2, 4), 16)},${parseInt(
        v.substring(4, 6),
        16
      )},${alpha})`;
    };

    const BASE_FONT = '400 10px "JetBrains Mono", monospace';
    const HOT_FONT = '600 11px "JetBrains Mono", monospace';

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const showLabels = w >= 560;
      const ease = 1 - Math.pow(0.82, dt);
      const ts = time * 0.001;

      // ---- one pairwise pass: collect links + repel anything too close ----
      const found: Link[] = [];
      const link2 = LINK * LINK;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link2) continue;
          const d = Math.sqrt(d2) || 0.001;
          if (found.length < 64) found.push({ a, b, d });
          // mutual repulsion — only kicks in when they get too close,
          // so spacing stays natural and uneven rather than fixed
          if (!reduced && d < REP) {
            const f = (1 - d / REP) * 0.09 * dt;
            const ux = dx / d;
            const uy = dy / d;
            a.vx -= ux * f;
            a.vy -= uy * f;
            b.vx += ux * f;
            b.vy += uy * f;
          }
        }
      }
      links = found;

      // ---- per-node: wander, cursor push, walls, integrate ----
      if (!reduced) {
        const SPEED_MAX = 0.42; // slow, ambient drift
        const SPEED_MIN = 0.14; // never fully stops
        const TURN = 0.022;
        const damp = Math.pow(0.985, dt);
        const SOFT = 58;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          // heading rotates slowly → curving, free-roaming paths
          n.dir += Math.sin(ts * n.wf + n.wp) * 0.02 * dt;
          // steer gently toward the heading
          n.vx += (Math.cos(n.dir) * SPEED_MAX - n.vx) * TURN * dt;
          n.vy += (Math.sin(n.dir) * SPEED_MAX - n.vy) * TURN * dt;

          // cursor repulsion
          if (mouse.on) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 150 && d > 0.01) {
              const f = (1 - d / 150) * 0.6 * dt;
              n.vx += (dx / d) * f;
              n.vy += (dy / d) * f;
            }
          }

          // soft steer away from the walls
          if (n.x < minX + SOFT) n.vx += ((minX + SOFT - n.x) / SOFT) * 0.05 * dt;
          if (n.x > maxX - SOFT) n.vx -= ((n.x - (maxX - SOFT)) / SOFT) * 0.05 * dt;
          if (n.y < minY + SOFT) n.vy += ((minY + SOFT - n.y) / SOFT) * 0.05 * dt;
          if (n.y > maxY - SOFT) n.vy -= ((n.y - (maxY - SOFT)) / SOFT) * 0.05 * dt;

          n.vx *= damp;
          n.vy *= damp;

          // keep drifting: clamp speed to a slow band
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > 0.001) {
            const cl = sp > SPEED_MAX ? SPEED_MAX : sp < SPEED_MIN ? SPEED_MIN : sp;
            n.vx = (n.vx / sp) * cl;
            n.vy = (n.vy / sp) * cl;
            n.dir = Math.atan2(n.vy, n.vx); // heading follows real motion
          }

          n.x += n.vx * dt;
          n.y += n.vy * dt;

          // hard backstop — a node can never leave the panel
          if (n.x < minX) {
            n.x = minX;
            n.vx = Math.abs(n.vx);
            n.dir = Math.atan2(n.vy, n.vx);
          } else if (n.x > maxX) {
            n.x = maxX;
            n.vx = -Math.abs(n.vx);
            n.dir = Math.atan2(n.vy, n.vx);
          }
          if (n.y < minY) {
            n.y = minY;
            n.vy = Math.abs(n.vy);
            n.dir = Math.atan2(n.vy, n.vx);
          } else if (n.y > maxY) {
            n.y = maxY;
            n.vy = -Math.abs(n.vy);
            n.dir = Math.atan2(n.vy, n.vx);
          }
        }
      }

      // hover scale easing
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.scale += ((n === hovered ? 1.75 : 1) - n.scale) * ease;
      }

      // ---- links (proximity based, so they follow the roaming nodes) ----
      ctx.lineWidth = 1;
      for (let i = 0; i < links.length; i++) {
        const { a, b, d } = links[i];
        const k = 1 - d / LINK;
        const hot = a === hovered || b === hovered;
        ctx.strokeStyle = hot
          ? `rgba(167,139,250,${0.2 + k * 0.4})`
          : `rgba(255,255,255,${0.03 + k * 0.07})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // ---- nodes: halo as a plain arc (no shadowBlur = no blur pass) ----
      ctx.textAlign = "center";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isHot = n === hovered;
        const r = n.r * n.scale;

        ctx.fillStyle = n.color;
        ctx.globalAlpha = isHot ? 0.28 : 0.12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (isHot ? 3.6 : 2.9), 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = isHot ? 1 : 0.85;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isHot) {
          ctx.strokeStyle = hexToRgba(n.color, 0.5);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 9, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (showLabels || isHot) {
          const font = isHot ? HOT_FONT : BASE_FONT;
          if (ctx.font !== font) ctx.font = font;
          ctx.fillStyle = isHot ? hexToRgba(n.color, 0.98) : "rgba(255,255,255,0.4)";
          const half = ctx.measureText(n.name).width / 2;
          const lx = Math.min(Math.max(n.x, half + 8), w - half - 8);
          const ly = Math.max(n.y - r - 9, 13);
          ctx.fillText(n.name, lx, ly);
        }
      }
    };

    let last = 0;
    const loop = (t: number) => {
      const dt = last === 0 ? 1 : Math.min((t - last) / 16.6667, 3);
      last = t;
      draw(t, dt);
      if (!reduced && visible) raf = requestAnimationFrame(loop);
    };

    layout();
    if (reduced) {
      draw(0, 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    // cursor position + hover target, read only on pointer move (never per frame)
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouse.x = mx;
      mouse.y = my;
      mouse.on = mx > -20 && my > -20 && mx < w + 20 && my < h + 20;
      let best: Node | null = null;
      let bestD = 46;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const d = Math.hypot(n.x - mx, n.y - my);
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
    canvas.addEventListener("pointerleave", onLeave, { passive: true });

    let resizeT = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        layout();
        if (reduced) draw(0, 0);
      }, 100);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? true;
        if (nowVisible && !visible && !reduced) {
          visible = true;
          last = 0;
          raf = requestAnimationFrame(loop);
        } else if (!nowVisible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeT);
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
            <span className="chip rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              {TECHS.length} technologies · explored by building
            </span>
            <p className="text-xs text-white/30 max-w-xs sm:text-right leading-relaxed">
              Tools I reach for when turning experiments into shipped software. Move your cursor through them.
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

        <Reveal delay={200}>
          <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Technologies list">
            {TECHS.map((t) => (
              <li
                key={t.name}
                className="chip rounded-full px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/20 transition-colors duration-300 flex items-center gap-2"
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
