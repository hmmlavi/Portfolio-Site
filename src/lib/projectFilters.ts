import {
  PROJECTS,
  type Project,
  type ProjectCategory,
  type ProjectPlatform,
  type ProjectStatus,
} from '../data/projects';

export interface ExplorerFilters {
  tech: string | null;
  category: ProjectCategory | null;
  platform: ProjectPlatform | null;
  status: ProjectStatus | null;
  q: string;
}

export const EMPTY: ExplorerFilters = {
  tech: null,
  category: null,
  platform: null,
  status: null,
  q: '',
};

export function applyFilters(projects: Project[], f: ExplorerFilters): Project[] {
  const q = f.q.trim().toLowerCase();
  return projects.filter((p) => {
    if (f.tech && !p.technologies.includes(f.tech)) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.platform && !p.platform.includes(f.platform)) return false;
    if (f.status && p.status !== f.status) return false;
    if (q) {
      const hay = [
        p.name,
        p.tagline,
        p.description,
        p.category,
        ...p.platform,
        ...p.technologies,
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function relatedProjects(tech: string): Project[] {
  return PROJECTS.filter((p) => p.technologies.includes(tech));
}

export function techCounts(projects: Project[]): Map<string, number> {
  const m = new Map<string, number>();
  projects.forEach((p) => p.technologies.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
  return m;
}
