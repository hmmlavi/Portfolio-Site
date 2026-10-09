import * as React from 'react';
import { useContributions, type Contribution } from '../lib/contributions';

const LEVEL_COLORS = [
  'var(--cell-0)',
  'var(--cell-1)',
  'var(--cell-2)',
  'var(--cell-3)',
  'var(--cell-4)',
];

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function labelFor(d: Contribution): string {
  const nice = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return d.count === 0
    ? `No contributions on ${nice}`
    : `${d.count} contribution${d.count === 1 ? '' : 's'} on ${nice}`;
}

/**
 * Interactive contribution heatmap.
 *
 * Built to stay perfectly smooth: the 371-day grid is memoized and rendered
 * exactly once, the tooltip is driven by direct DOM writes (zero React state),
 * and keyboard/roving-tab focus is managed imperatively on the two cells that
 * change. Re-rendering the parent costs nothing here.
 */
export default function ContribGraph() {
  const { total, days, loading, error } = useContributions();
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const tipRef = React.useRef<HTMLDivElement>(null);
  const cellRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const focusRef = React.useRef(-1);

  const { weeks, months, totalCells } = React.useMemo(() => {
    if (!days.length) return { weeks: [] as (Contribution | null)[][], months: [] as { col: number; label: string }[], totalCells: 0 };
    const firstDow = new Date(days[0].date + 'T00:00:00').getDay();
    const padded: (Contribution | null)[] = [...Array<Contribution | null>(firstDow).fill(null), ...days];
    const w: (Contribution | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      const wk = padded.slice(i, i + 7);
      while (wk.length < 7) wk.push(null);
      w.push(wk);
    }
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    w.forEach((week, wi) => {
      const firstDay = week.find(Boolean);
      if (!firstDay) return;
      const m = new Date(firstDay.date + 'T00:00:00').getMonth();
      if (m !== lastMonth) {
        labels.push({ col: wi, label: MONTH_SHORT[m] });
        lastMonth = m;
      }
    });
    return { weeks: w, months: labels, totalCells: w.length * 7 };
  }, [days]);

  const flatRef = React.useRef<(Contribution | null)[]>([]);
  flatRef.current = React.useMemo(() => weeks.flat(), [weeks]);

  /* -- tooltip: pure DOM writes, no React churn ----------------------- */
  const showTip = React.useCallback((idx: number) => {
    const tip = tipRef.current;
    const cell = cellRefs.current[idx];
    const wrap = wrapRef.current;
    const day = flatRef.current[idx];
    if (!tip || !cell || !wrap || !day) return;
    const c = cell.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    tip.style.left = `${c.left - w.left + c.width / 2 + wrap.scrollLeft}px`;
    tip.style.top = `${c.top - w.top - 8}px`;
    tip.style.transform = 'translate(-50%, -110%)';
    tip.textContent = labelFor(day);
    tip.style.opacity = '1';
  }, []);

  const hideTip = React.useCallback(() => {
    const tip = tipRef.current;
    if (tip) tip.style.opacity = '0';
  }, []);

  const moveFocus = React.useCallback(
    (next: number) => {
      const prev = focusRef.current;
      if (prev >= 0 && prev !== next) {
        const p = cellRefs.current[prev];
        if (p) p.tabIndex = -1;
      }
      focusRef.current = next;
      const el = cellRefs.current[next];
      if (el) {
        el.tabIndex = 0;
        el.focus();
      }
      showTip(next);
    },
    [showTip],
  );

  const step = React.useCallback((from: number, dir: number) => {
    let next = from;
    for (let guard = 0; guard < 10; guard++) {
      const cand = next + dir;
      if (cand < 0) return -1;
      next = cand;
      if (cand >= totalCells) return totalCells - 1;
      if (flatRef.current[cand]) return cand;
    }
    return from;
  }, [totalCells]);

  const onGridKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (focusRef.current < 0) return;
      let next = -1;
      if (e.key === 'ArrowRight') next = step(focusRef.current, 1);
      else if (e.key === 'ArrowLeft') next = step(focusRef.current, -1);
      else if (e.key === 'ArrowDown') next = step(focusRef.current, 7);
      else if (e.key === 'ArrowUp') next = step(focusRef.current, -7);
      else if (e.key === 'Home') next = step(-1, 1);
      else if (e.key === 'End') next = step(totalCells, -1);
      if (next < 0) return;
      e.preventDefault();
      moveFocus(next);
    },
    [moveFocus, step, totalCells],
  );

  const onCellActivate = React.useCallback(
    (idx: number) => {
      const prev = focusRef.current;
      if (prev >= 0 && prev !== idx) {
        const p = cellRefs.current[prev];
        if (p) p.tabIndex = -1;
      }
      focusRef.current = idx;
      showTip(idx);
    },
    [showTip],
  );

  /* park the cursor on the latest day once data lands */
  React.useEffect(() => {
    if (!totalCells) return;
    let last = totalCells - 1;
    while (last > 0 && !flatRef.current[last]) last--;
    const prev = focusRef.current;
    if (prev >= 0) {
      const p = cellRefs.current[prev];
      if (p) p.tabIndex = -1;
    }
    focusRef.current = last;
    const el = cellRefs.current[last];
    if (el) el.tabIndex = 0;
  }, [totalCells]);

  /* tap-to-dismiss for touch: any pointerdown outside the area clears the tip */
  React.useEffect(() => {
    const h = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) hideTip();
    };
    document.addEventListener('pointerdown', h, { passive: true });
    return () => document.removeEventListener('pointerdown', h);
  }, [hideTip]);

  /* the expensive part — memoized so hovers never re-render it */
  const grid = React.useMemo(
    () => (
      <div
        role="grid"
        aria-label={`Contribution graph, ${total} contributions in the last year. Use arrow keys to explore days.`}
        onKeyDown={onGridKeyDown}
        className="flex gap-[3px]"
      >
        {weeks.map((week, wi) => (
          <div key={wi} role="presentation" className="flex flex-col gap-[3px]">
            {week.map((day, ri) => {
              const idx = wi * 7 + ri;
              if (!day) return <div key={ri} className="h-[11px] w-[11px]" aria-hidden="true" />;
              return (
                <div
                  key={ri}
                  ref={(el) => {
                    cellRefs.current[idx] = el;
                  }}
                  role="gridcell"
                  aria-label={labelFor(day)}
                  tabIndex={-1}
                  onMouseEnter={() => showTip(idx)}
                  onFocus={() => onCellActivate(idx)}
                  onClick={() => showTip(idx)}
                  className="h-[11px] w-[11px] rounded-[3px] transition-shadow duration-100 hover:shadow-[0_0_0_1.5px_rgba(150,167,255,0.5)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(150,167,255,0.8)]"
                  style={{ background: LEVEL_COLORS[Math.max(0, Math.min(4, day.level))] }}
                />
              );
            })}
          </div>
        ))}
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weeks, total],
  );

  return (
    <div className="glass relative z-30 overflow-visible rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Contribution activity
        </p>
        {!loading && !error && (
          <p className="font-mono text-[11px] text-dim">
            <span className="font-semibold text-glow">{total.toLocaleString('en-IN')}</span>{' '}
            contributions in the last year
          </p>
        )}
      </div>

      {loading && <div className="mt-5 h-[96px] animate-pulse rounded-xl bg-white/[0.03]" />}

      {error && (
        <p className="mt-5 rounded-xl bg-white/[0.03] px-4 py-3 font-mono text-[12px] text-dim">
          Contribution data is unavailable right now. The repository stats above are still live.
        </p>
      )}

      {!loading && !error && (
        <div
          ref={wrapRef}
          className="relative mt-5 overflow-x-auto pb-1"
          onMouseLeave={hideTip}
        >
          {/* month labels */}
          <div className="relative ml-[34px] h-4">
            {months.map((m) => (
              <span
                key={`${m.col}-${m.label}`}
                className="absolute font-mono text-[9px] text-faint"
                style={{ left: m.col * 14 }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* weekday labels */}
            <div className="mr-[6px] flex w-[28px] flex-col gap-[3px]">
              {DAY_LABELS.map((l, i) => (
                <span key={i} className="flex h-[11px] items-center font-mono text-[9px] text-faint">
                  {l}
                </span>
              ))}
            </div>

            {grid}
          </div>

          {/* tooltip — positioned by direct DOM writes */}
          <div
            ref={tipRef}
            role="tooltip"
            className="pointer-events-none absolute z-[130] whitespace-nowrap rounded-lg border border-white/10 bg-solid px-3 py-1.5 font-mono text-[10px] text-ink opacity-0 shadow-lg transition-opacity duration-100"
            style={{ transform: 'translate(-50%, -110%)', left: -9999, top: -9999 }}
          />
        </div>
      )}

      {!loading && !error && (
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-faint">
          <span className="hidden sm:inline">Hover a day, or tab in and use arrow keys</span>
          <span className="flex items-center gap-1.5">
            less
            {LEVEL_COLORS.map((c, i) => (
              <span key={i} className="h-[10px] w-[10px] rounded-[3px]" style={{ background: c }} />
            ))}
            more
          </span>
        </div>
      )}
    </div>
  );
}
