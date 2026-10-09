import { ArrowUpRight, GitFork, Lock as LockIcon, Star } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import type { Project } from '../data/projects';
import { useGitHub } from '../lib/github';

function Gazette({ p, hot, active, onOpen }: { p: Project; hot: boolean; active: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-project-card={p.id}
      aria-pressed={active}
      className={`glass w-full rounded-xl p-4 text-left transition-all duration-300 ${
        active ? 'glass-lift' : ''
      } ${hot ? '' : 'opacity-40'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] font-mono text-[12px] font-semibold text-glow ring-1 ring-white/10">
            {p.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-semibold text-ink">{p.name}</p>
            <p className="font-mono text-[10px] text-faint">{p.year}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          {p.status}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-[1.65] text-dim">{p.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.technologies.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-dim"
          >
            {t}
          </span>
        ))}
        {p.technologies.length > 3 && (
          <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-faint">
            +{p.technologies.length - 3}
          </span>
        )}
      </div>
    </button>
  );
}

export default function ProjectCard({
  p,
  active,
  dimmed,
  onOpen,
}: {
  p: Project;
  active: boolean;
  dimmed: boolean;
  onOpen: () => void;
}) {
  return (
    <Gazette p={p} hot={!dimmed} active={active} onOpen={onOpen} />
  );
}

// live github stat bits for the detail sheet
export function RepoMeta({ url }: { url: string | null }) {
  const { repos } = useGitHub();
  if (!url) return null;
  const repo = repos.find((r) => r.html_url === url);
  if (!repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-faint">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-glow transition-opacity hover:opacity-80"
      >
        <GithubIcon size={12} aria-hidden="true" />
        repository
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>
      <span className="flex items-center gap-1">
        <Star size={11} aria-hidden="true" />
        {repo.stargazers_count}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={11} aria-hidden="true" />
        {repo.forks_count}
      </span>
    </div>
  );
}

export function LockedNote() {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
      <LockIcon size={10} aria-hidden="true" />
      private preview
    </span>
  );
}
