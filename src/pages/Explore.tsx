import * as React from 'react';
import { ArrowLeft, Dices, Search, Settings2, User } from 'lucide-react';
import { SectionHead } from '../components/ui';
import { BY_ID, PROJECTS, UI, type Project } from '../data/projects';
import {
  EMPTY,
  applyFilters,
  relatedProjects,
  techCounts,
  type ExplorerFilters,
} from '../lib/projectFilters';
import { stateFromLocation, stateToURL, type ExplorerState } from '../lib/urlState';
import { attachExplorerKeyboard } from '../lib/exploreKeyboard';
import Filters from '../explore/Filters';
import Network from '../explore/Network';
import ProjectCard from '../explore/ProjectCard';
import ProjectDetail from '../explore/ProjectDetail';

export default function Explore() {
  const [filters, setFilters] = React.useState<ExplorerFilters>(EMPTY);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = React.useState(0);
  const [tab, setTab] = React.useState<'overview' | 'dev'>('overview');
  const [recruiter, setRecruiter] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const state = React.useRef({ filters, selectedId, tab, recruiter });
  state.current = { filters, selectedId, tab, recruiter };

  const restore = React.useCallback(() => {
    const s = stateFromLocation();
    setFilters({
      tech: s.tech ?? null,
      category: (s.category as ExplorerFilters['category']) ?? null,
      platform: (s.platform as ExplorerFilters['platform']) ?? null,
      status: (s.status as ExplorerFilters['status']) ?? null,
      q: s.q ?? '',
    });
    setTab(s.mode === 'dev' ? 'dev' : 'overview');
    setRecruiter(s.mode === 'recruiter');
    setSelectedId(s.project ?? null);
  }, []);

  React.useEffect(() => {
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [restore]);

  const sync = React.useCallback(
    (f: ExplorerFilters, sel: string | null, t: 'overview' | 'dev', r: boolean, push: boolean) => {
      const next: ExplorerState = {
        tech: f.tech ?? undefined,
        category: f.category ?? undefined,
        platform: f.platform ?? undefined,
        status: f.status ?? undefined,
        q: f.q || undefined,
        project: sel ?? undefined,
        mode: t === 'dev' ? 'dev' : r ? 'recruiter' : undefined,
      };
      const url = stateToURL(next, sel ?? undefined);
      if (push) window.history.pushState({}, '', url);
      else window.history.replaceState({}, '', url);
    },
    [],
  );

  const setFilter = React.useCallback(
    (partial: Partial<ExplorerFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...partial };
        sync(next, null, state.current.tab, state.current.recruiter, true);
        setHighlightIndex(0);
        setSelectedId(null);
        return next;
      });
    },
    [sync],
  );

  const selectProject = React.useCallback(
    (id: string, push: boolean) => {
      setSelectedId(id);
      const idx = applyFilters(PROJECTS, filters).findIndex((p) => p.id === id);
      if (idx >= 0) setHighlightIndex(idx);
      sync(filters, id, state.current.tab, state.current.recruiter, push);
    },
    [filters, sync],
  );

  const items = React.useMemo(() => {
    let list = UI.slice();
    if (recruiter) {
      list = list.filter((p) => !p.experiment);
    }
    return applyFilters(list, filters);
  }, [filters, recruiter]);

  const counts = React.useMemo(
    () => techCounts(recruiter ? UI.filter((p) => !p.experiment) : UI),
    [recruiter],
  );

  const selected = selectedId ? BY_ID.get(selectedId) ?? null : null;
  const currentIdx = selectedId ? items.findIndex((p) => p.id === selectedId) : -1;

  const openDetail = React.useCallback(
    (dir: -1 | 1) => {
      if (!items.length) return;
      const base = currentIdx >= 0 ? currentIdx : highlightIndex;
      const next = (base + dir + items.length) % items.length;
      selectProject(items[next].id, true);
    },
    [items, currentIdx, highlightIndex, selectProject],
  );

  const surprise = React.useCallback(() => {
    const pool = applyFilters(UI, filters);
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    selectProject(pick.id, true);
  }, [filters, selectProject]);

  React.useEffect(() => {
    return attachExplorerKeyboard((i) => {
      switch (i.action) {
        case 'focus-search':
          searchRef.current?.focus();
          return;
        case 'escape':
          if (state.current.selectedId) {
            setSelectedId(null);
            sync(state.current.filters, null, state.current.tab, state.current.recruiter, false);
          } else {
            searchRef.current?.blur();
          }
          return;
        case 'enter':
          if (items[highlightIndex] && !state.current.selectedId) {
            selectProject(items[highlightIndex].id, true);
          }
          return;
        case 'move-next':
          setHighlightIndex((h) => ((h + 1) % (items.length || 1)) || 0);
          return;
        case 'move-prev':
          setHighlightIndex((h) => (((h - 1 + (items.length || 1)) % (items.length || 1)) || 0));
          return;
        case 'nav-next':
          openDetail(1);
          return;
        case 'nav-prev':
          openDetail(-1);
          return;
      }
    });
  }, [items, highlightIndex, openDetail, selectProject, sync]);

  const setMode = (m: typeof tab) => {
    setTab(m);
    setRecruiter(false);
    sync(filters, selectedId, m, false, true);
  };
  const setShortlist = (r: boolean) => {
    setRecruiter(r);
    sync(filters, selectedId, tab === 'dev' ? 'dev' : 'overview', r, true);
  };

  const cl = (active: boolean, accent?: string) =>
    `flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
      accent ?? (active ? 'border-glow/50 bg-glow/10 text-ink' : 'border-white/[0.07] bg-white/[0.03] text-dim hover:border-white/20 hover:text-ink')
    }`;

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          className="glass glass-lift inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-[11px] text-dim transition-colors hover:text-ink"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to portfolio
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={surprise}
            aria-label="Open a random project"
            className="glass glass-lift flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[11px] text-dim transition-colors hover:text-ink"
          >
            <Dices size={13} aria-hidden="true" />
            Surprise me
          </button>
          <div className="glass glass-lift flex items-center rounded-lg p-0.5" role="tablist" aria-label="View mode">
            <button
              role="tab"
              aria-selected={!recruiter && tab === 'overview'}
              onClick={() => { setShortlist(false); setMode('overview'); }}
              className={cl(!recruiter && tab === 'overview')}
            >
              Overview
            </button>
            <button
              role="tab"
              aria-selected={tab === 'dev'}
              onClick={() => { setShortlist(false); setMode('dev'); }}
              className={cl(tab === 'dev', tab === 'dev' ? 'border-lilac/50 bg-lilac/10 text-lilac' : undefined)}
            >
              <Settings2 size={12} aria-hidden="true" />
              Developer
            </button>
            <button
              role="tab"
              aria-selected={recruiter}
              onClick={() => setShortlist(true)}
              className={cl(recruiter, recruiter ? 'border-peach/50 bg-peach/10 text-peach' : undefined)}
            >
              <User size={12} aria-hidden="true" />
              Recruiter
            </button>
          </div>
        </div>
      </div>

      <div className="mt-9 border-b border-white/[0.06] pb-7">
        <SectionHead kicker="Project Explorer" index="02" accent="text-sky/80" title="Explore the work.">
          Deeper than the cards. Filter by technology, platform and status, follow the link graph
          between tech and projects, or inspect a build piece by piece.
        </SectionHead>
      </div>

      <div className="mt-8">
        <div className="relative max-w-md">
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            ref={searchRef}
            type="search"
            value={filters.q}
            onChange={(e) => setFilter({ q: e.target.value })}
            placeholder="Search projects, technologies, words…  press / to focus"
            aria-label="Search projects"
            className="glass w-full rounded-lg border-white/[0.07] py-2.5 pl-10 pr-10 font-mono text-[12.5px] text-ink placeholder:text-faint focus:border-glow/50 focus:outline-none"
          />
          {items.length > 0 && (
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-faint">
              {items.length}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[290px_1fr]">
        <Filters value={filters} counts={counts} onChange={setFilter} />

        <main className="min-w-0">
          {tab === 'dev' && (
            <div className="glass mb-6 rounded-xl p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                How the tech connects
              </p>
              <Network
                tech={filters.tech}
                project={selectedId}
                onProject={(id) => selectProject(id, true)}
              />
            </div>
          )}

          {items.length > 0 ? (
            <ul
              role="listbox"
              aria-label="Projects"
              aria-activedescendant={items[highlightIndex]?.id ? `pc-${items[highlightIndex].id}` : undefined}
              className="grid gap-3 sm:grid-cols-2"
            >
              {items.map((p: Project, i: number) => {
                const dimmed = hasDim(filters, p);
                return (
                  <li key={p.id} id={`pc-${p.id}`} role="option" aria-selected={i === highlightIndex} className="contents">
                    <ProjectCard
                      p={p}
                      active={i === highlightIndex}
                      dimmed={dimmed}
                      onOpen={() => selectProject(p.id, true)}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="glass rounded-xl p-8 text-center">
              <p className="font-mono text-[13px] text-dim">Nothing matches that combination.</p>
              <p className="mt-2 font-mono text-[11px] text-faint">
                Try clearing a filter or two.
              </p>
              <button
                type="button"
                onClick={() => setFilter(EMPTY)}
                className="glass glass-lift mt-5 rounded-lg px-4 py-2 font-mono text-[11px] text-dim transition-colors hover:text-ink"
              >
                Reset all filters
              </button>
            </div>
          )}

          {(filters.tech || filters.q) && (
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                {filters.tech ? `${filters.tech} appears in` : 'Matches'}
              </p>
              <ul className="mt-2 space-y-1.5">
                {(filters.tech ? relatedProjects(filters.tech) : items).map((p: Project) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => selectProject(p.id, true)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-left font-mono text-[12px] text-dim transition-colors hover:text-ink ${
                        selectedId === p.id ? 'border-glow/40 text-ink' : ''
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-[10px] text-faint">{p.year}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      <ProjectDetail
        p={selected}
        onClose={() => {
          setSelectedId(null);
          sync(filters, null, state.current.tab, state.current.recruiter, false);
        }}
        onPrev={() => openDetail(-1)}
        onNext={() => openDetail(1)}
      />
    </div>
  );
}

function hasDim(f: ExplorerFilters, p: Project): boolean {
  if (f.tech && !p.technologies.includes(f.tech)) return true;
  if (f.category && p.category !== f.category) return true;
  if (f.platform && !p.platform.includes(f.platform)) return true;
  if (f.status && p.status !== f.status) return true;
  return false;
}
