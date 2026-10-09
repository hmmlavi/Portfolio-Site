import { useEffect, useState } from 'react';

export interface GHUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
  blog: string;
}

export interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

export const GH_USERNAME = 'hmmlavi';
const API = 'https://api.github.com';

export const LANG_COLORS: Record<string, string> = {
  TypeScript: '#5aa2f0',
  JavaScript: '#f1e05a',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  'C++': '#ffb4c8',
  C: '#9a9aa1',
  HTML: '#e34c26',
  CSS: '#9078e0',
  Dart: '#00B4AB',
};

export const FALLBACK_USER: GHUser = {
  login: GH_USERNAME,
  name: 'lakshit',
  avatar_url: 'https://avatars.githubusercontent.com/u/233410385?v=4',
  html_url: 'https://github.com/hmmlavi',
  public_repos: 9,
  followers: 2,
  following: 2,
  created_at: '2025-09-20T08:12:15Z',
  bio: 'AI software engineer — building software that thinks.',
  blog: 'lakshitss.vercel.app',
};

export const FALLBACK_REPOS: GHRepo[] = [
  {
    id: 101,
    name: 'FacilityFix',
    description: 'FacilityFix — A web-based college facility issue reporting and tracking system.',
    html_url: 'https://github.com/hmmlavi/FacilityFix',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-10-02T07:01:05Z',
    fork: false,
  },
  {
    id: 102,
    name: 'Veylo',
    description: 'Veylo — An AI-based habit tracking app designed for smarter daily routines and personal growth.',
    html_url: 'https://github.com/hmmlavi/Veylo',
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: '2026-09-24T10:00:00Z',
    fork: false,
  },
  {
    id: 103,
    name: 'Portfolio-Site',
    description: 'My personal portfolio website — software projects, technical skills, and professional journey.',
    html_url: 'https://github.com/hmmlavi/Portfolio-Site',
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: '2026-09-18T10:00:00Z',
    fork: false,
  },
  {
    id: 104,
    name: 'SaBuddy',
    description: 'SaBuddy — AI-assisted social workflow manager. Native Android, built in Kotlin.',
    html_url: 'https://github.com/hmmlavi/SaBuddy',
    language: 'Kotlin',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-10T10:00:00Z',
    fork: false,
  },
  {
    id: 105,
    name: 'datacom-work',
    description: null,
    html_url: 'https://github.com/hmmlavi/datacom-work',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-09-02T10:00:00Z',
    fork: false,
  },
  {
    id: 106,
    name: 'hmmlavi',
    description: 'Profile README — the front door to everything I ship.',
    html_url: 'https://github.com/hmmlavi/hmmlavi',
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: '2026-08-28T10:00:00Z',
    fork: false,
  },
];

export interface GHState {
  user: GHUser;
  repos: GHRepo[];
  syncedAt: Date;
  live: boolean;
  loading: boolean;
}

const BOOT_STATE: GHState = {
  user: FALLBACK_USER,
  repos: FALLBACK_REPOS,
  syncedAt: new Date(),
  live: false,
  loading: true,
};

let state: GHState = BOOT_STATE;
let inflight: Promise<void> | null = null;
const subs = new Set<() => void>();

function emit() {
  subs.forEach((fn) => fn());
}

function load(force = false): Promise<void> {
  if (inflight) return inflight;
  if (!force && state !== BOOT_STATE) return Promise.resolve();

  inflight = (async () => {
    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`${API}/users/${GH_USERNAME}`),
        fetch(`${API}/users/${GH_USERNAME}/repos?sort=pushed&per_page=12`),
      ]);
      if (!uRes.ok || !rRes.ok) throw new Error('rate limited');
      const [u, r] = (await Promise.all([uRes.json(), rRes.json()])) as [GHUser, GHRepo[]];
      state = {
        user: u,
        repos: r.filter((repo) => !repo.fork),
        syncedAt: new Date(),
        live: true,
        loading: false,
      };
    } catch {
      state = { ...BOOT_STATE, loading: false };
    }
    inflight = null;
    emit();
  })();
  return inflight;
}

/** Shared live GitHub data — one fetch, every component stays in sync. */
export function useGitHub() {
  const [s, setS] = useState<GHState>(state);

  useEffect(() => {
    const cb = () => setS({ ...state });
    subs.add(cb);
    load();
    return () => {
      subs.delete(cb);
    };
  }, []);

  return {
    ...s,
    refresh: () => {
      setS({ ...state, loading: true });
      load(true);
    },
  };
}

/** Top languages across repos, with share percentage. */
export function topLanguages(repos: GHRepo[], n = 4): { name: string; pct: number; color: string }[] {
  const counts = new Map<string, number>();
  repos.forEach((r) => {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  });
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, c]) => ({
      name,
      pct: Math.round((c / total) * 100),
      color: LANG_COLORS[name] ?? '#b4ff39',
    }));
}
