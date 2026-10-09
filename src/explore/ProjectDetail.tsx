import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHub } from '../lib/github';
import type { Project } from '../data/projects';
import { projectURL } from '../lib/urlState';

type Density = 'quick' | 'standard' | 'deep';

function Accord({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-3 text-left"
      >
        <span className={`text-[13.5px] font-medium transition-colors ${open ? 'text-ink' : 'text-dim'}`}>
          {q}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`shrink-0 text-faint transition-transform duration-300 ${open ? 'rotate-180 text-glow' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-4 text-[13px] leading-[1.75] text-dim">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectDetail({
  p,
  onClose,
  onPrev,
  onNext,
}: {
  p: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const [openQA, setOpenQA] = React.useState(-1);
  const [density, setDensity] = React.useState<Density>('standard');
  const { repos } = useGitHub();
  const detail = p?.detail;
  const repo = p?.github ? repos.find((r) => r.html_url === p.github) : undefined;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  React.useEffect(() => {
    document.body.style.overflow = p ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [p]);

  const copyLink = async () => {
    if (!p) return;
    try {
      await navigator.clipboard.writeText(projectURL(p.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      window.prompt('Copy the project link', projectURL(p.id));
    }
  };

  if (!p) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[190] bg-black/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${p.name}`}
        className="fixed inset-y-0 right-0 z-[195] w-full max-w-lg overflow-y-auto border-l border-white/[0.06] bg-base shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Close
            <kbd className="hidden rounded border border-white/[0.1] bg-white/[0.04] px-1 text-[9px] sm:inline">esc</kbd>
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              aria-label="Previous project"
              className="flex h-8 w-8 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              ←
            </button>
            <button
              onClick={onNext}
              aria-label="Next project"
              className="flex h-8 w-8 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              →
            </button>
          </div>
        </div>

        <div className="p-5 md:p-6">
          {/* identity strip */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-glow/10 font-mono text-base font-semibold text-glow ring-1 ring-glow/20">
                {p.name.slice(0, 1)}
              </span>
              <div>
                <h2 className="font-display text-[20px] font-semibold text-ink">{p.name}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {p.category} / {p.status} / {p.year}
                </p>
              </div>
            </div>
          </div>

          {/* density control */}
          <div className="mt-5 flex gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
            {(['quick', 'standard', 'deep'] as Density[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDensity(d)}
                aria-pressed={density === d}
                className={`flex-1 rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  density === d ? 'bg-glow/15 text-ink' : 'text-dim hover:text-ink'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* quick tier */}
          <p className="mt-4 text-[14px] leading-[1.8] text-dim">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.technologies.map((t) => (
              <span key={t} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-dim">
                {t}
              </span>
            ))}
          </div>

          {/* actions: always visible in quick */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {repo ? (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-glow px-4 py-2.5 text-sm font-semibold text-oncolor transition-opacity hover:opacity-90"
              >
                <GithubIcon size={14} aria-hidden="true" />
                Open repository
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-glow px-4 py-2.5 text-sm font-semibold text-oncolor transition-opacity hover:opacity-90"
              >
                <GithubIcon size={14} aria-hidden="true" />
                Open repository
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : (
              <span className="font-mono text-[11px] text-faint">Private repository</span>
            )}

            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] text-dim transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {copied ? (
                <>
                  <Check size={13} aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden="true" />
                  Copy link
                </>
              )}
            </button>

            {repo && (
              <span className="ml-auto font-mono text-[11px] text-faint">
                {repo.stargazers_count} ★ &nbsp; {repo.forks_count} ⑂
              </span>
            )}
          </div>

          {/* standard + deep tiers */}
          {density !== 'quick' && detail && (detail.why || detail.qa.length > 0) && (
            <div className="mt-7 border-t border-white/[0.06] pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Want to know more?
              </p>
              <div className="mt-2">
                {detail.qa.map((item, i) => (
                  <Accord
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    open={openQA === i}
                    onToggle={() => setOpenQA((cur) => (cur === i ? -1 : i))}
                  />
                ))}
              </div>

              {density === 'deep' && (
                <div className="mt-6 space-y-4">
                  {detail.why && (
                    <div>
                      <p className="mb-1 text-[13px] font-medium text-ink">Why it was built</p>
                      <p className="text-[13px] leading-[1.8] text-dim">{detail.why}</p>
                    </div>
                  )}
                  {detail.decisions && (
                    <div>
                      <p className="mb-2 text-[13px] font-medium text-ink">Technical decisions</p>
                      <ul className="space-y-2">
                        {detail.decisions.map((d, i) => (
                          <li key={i} className="flex gap-2.5 text-[13px] leading-[1.75] text-dim">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-glow/70" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {detail.learned && (
                    <div>
                      <p className="mb-1 text-[13px] font-medium text-ink">What I learned</p>
                      <p className="text-[13px] leading-[1.8] text-dim">{detail.learned}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {detail?.changelog && (
            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Changelog
              </p>
              <ul className="mt-2.5 space-y-2">
                {detail.changelog.map((c) => (
                  <li key={c.label} className="flex gap-2.5 font-mono text-[12px] text-dim">
                    <span className="shrink-0 rounded bg-white/[0.05] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-glow">
                      {c.label}
                    </span>
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
