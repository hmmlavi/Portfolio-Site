import { CATEGORIES, PLATFORMS, STATUSES, TECHNOLOGIES } from '../data/projects';
import type { ExplorerFilters } from '../lib/projectFilters';
import { techCounts } from '../lib/projectFilters';

const chip = (active: boolean) =>
  `rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
    active
      ? 'border-glow/50 bg-glow/10 text-ink'
      : 'border-white/[0.07] bg-white/[0.03] text-dim hover:border-white/20 hover:text-ink'
  }`;

const groupCls = 'mt-5';
const labelCls = 'font-mono text-[10px] uppercase tracking-[0.25em] text-faint';

export default function Filters({
  value,
  counts,
  onChange,
}: {
  value: ExplorerFilters;
  counts: Map<string, number>;
  onChange: (f: Partial<ExplorerFilters>) => void;
}) {
  return (
    <fieldset className="md:sticky md:top-24">
      <legend className="sr-only">Filter projects</legend>
      <div>
        <p className={labelCls}>Technology</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {TECHNOLOGIES.map((t) => {
            const active = value.tech === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ tech: active ? null : t })}
                className={chip(active)}
              >
                {t}
                {counts.get(t) ? <span className="ml-1.5 text-faint">·{counts.get(t)}</span> : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className={groupCls}>
        <p className={labelCls}>Type</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const active = value.category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ category: active ? null : c })}
                className={chip(active)}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className={groupCls}>
        <p className={labelCls}>Platform</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => {
            const active = value.platform === p;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ platform: active ? null : p })}
                className={chip(active)}
              >
                {p === 'web' ? 'Web' : 'Android'}
              </button>
            );
          })}
        </div>
      </div>

      <div className={groupCls}>
        <p className={labelCls}>Status</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {STATUSES.map((s) => {
            const active = value.status === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ status: active ? null : s })}
                className={chip(active)}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}

export { techCounts };
