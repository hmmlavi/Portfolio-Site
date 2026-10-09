import type { Project } from '../data/projects';

export interface ExplorerState {
  tech?: string;
  category?: string;
  platform?: string;
  status?: string;
  project?: string;
  q?: string;
  mode?: 'dev' | 'recruiter';
}

const PARAMS: Record<keyof ExplorerState, string> = {
  tech: 'tech',
  category: 'cat',
  platform: 'plat',
  status: 'st',
  project: 'p',
  q: 'q',
  mode: 'mode',
};

const BASE = '/explore';

export function stateFromLocation(loc: Location = window.location): ExplorerState {
  const sp = new URLSearchParams(loc.search);
  const out: ExplorerState = {};
  (Object.keys(PARAMS) as (keyof ExplorerState)[]).forEach((k) => {
    const v = sp.get(PARAMS[k]);
    if (v) {
      if (k === 'mode' && v !== 'dev' && v !== 'recruiter') return;
      (out as Record<string, string>)[k] = decodeURIComponent(v);
    }
  });
  return out;
}

export function stateToURL(state: ExplorerState, projectId?: string): string {
  const sp = new URLSearchParams();
  (Object.keys(PARAMS) as (keyof ExplorerState)[]).forEach((k) => {
    const v = state[k];
    if (v) sp.set(PARAMS[k], v);
  });
  if (projectId) sp.set('p', projectId);
  const qs = sp.toString();
  return qs ? `${BASE}?${qs}` : BASE;
}

/* Replace the url without pushing history, for fluid in-page navigation */
export function replaceUrl(state: ExplorerState, projectId?: string) {
  const url = stateToURL(state, projectId);
  window.history.replaceState({}, '', url);
}

/* Push a new entry so back/forward works through selections */
export function pushUrl(state: ExplorerState, projectId?: string) {
  const url = stateToURL(state, projectId);
  window.history.pushState({}, '', url);
}

export function projectURL(id: string): string {
  return `${location.origin}${BASE}?p=${encodeURIComponent(id)}`;
}

export function isExploreRoute(pathname: string): boolean {
  return pathname === BASE || pathname.startsWith(BASE + '/');
}

export function stateForProject(p: Project): ExplorerState {
  return { project: p.id };
}
