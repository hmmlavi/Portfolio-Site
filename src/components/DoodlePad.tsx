import * as React from 'react';
import { Eraser } from 'lucide-react';

/**
 * A tiny glowing scratchpad — draw with a mouse, trackpad, pen or finger.
 *
 * Perf notes: strokes are painted straight onto a 2D canvas inside the
 * pointer event (no React state per point, no rAF queue), the backing store is
 * sized to devicePixelRatio once per resize, and `touch-action: none` stops the
 * browser from fighting the stroke with a scroll gesture.
 */
const COLORS = ['#96a7ff', '#8be3d2', '#ffc58f', '#c4b0ff', '#ffb4c8'];

export default function DoodlePad() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawing = React.useRef(false);
  const last = React.useRef<{ x: number; y: number } | null>(null);
  const colorRef = React.useRef(COLORS[0]);
  const [color, setColor] = React.useState(COLORS[0]);
  const [touched, setTouched] = React.useState(false);

  const setupCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  React.useEffect(() => {
    setupCanvas();
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(setupCanvas, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [setupCanvas]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
    if (!touched) setTouched(true);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    const p = pos(e);
    const l = last.current;
    if (!ctx || !l) return;

    // pressure-aware width where the hardware reports it
    const pressure = e.pressure > 0 && e.pressure !== 0.5 ? e.pressure : 0.5;
    const width = 1.4 + pressure * 3.4;

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = colorRef.current;

    // soft outer glow pass
    ctx.globalAlpha = 0.16;
    ctx.lineWidth = width * 3.4;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    // crisp core pass
    ctx.globalAlpha = 1;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    last.current = p;
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setTouched(false);
  };

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint">
          doodle something
        </p>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear the drawing"
          className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-faint transition-colors hover:bg-white/10 hover:text-ink"
        >
          <Eraser size={10} aria-hidden="true" />
          clear
        </button>
      </div>

      <div className="relative mt-3">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
          aria-label="Drawing canvas — click or touch and drag to draw"
          className="h-[132px] w-full rounded-xl border border-white/[0.07] bg-white/[0.02] [touch-action:none]"
        />
        {!touched && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[11px] text-faint">
            draw here — mouse or finger
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              colorRef.current = c;
              setColor(c);
            }}
            aria-label={`Use this ink colour`}
            aria-pressed={color === c}
            className={`h-4 w-4 rounded-full transition-transform duration-200 ${
              color === c ? 'scale-125 ring-2 ring-white/50' : 'opacity-60 hover:opacity-100'
            }`}
            style={{ background: c, boxShadow: `0 0 10px ${c}80` }}
          />
        ))}
        <span className="ml-auto font-mono text-[9px] text-faint">yes, it actually works</span>
      </div>
    </div>
  );
}
