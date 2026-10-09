import { motion } from 'framer-motion';
import { ArrowUpRight, GitFork, RefreshCw, Star } from 'lucide-react';
import { LANG_COLORS, topLanguages, useGitHub } from '../lib/github';
import { timeAgo } from '../lib/utils';
import { fadeUp } from '../lib/anim';
import { SectionHead } from './ui';
import { GithubIcon } from './icons';
import ContribGraph from './ContribGraph';

export default function GitHubSection() {
  const { user, repos, syncedAt, live, loading, refresh } = useGitHub();
  const langs = topLanguages(repos);
  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);

  return (
    <section id="github" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="GitHub" index="04" accent="text-mist" title="Open source, live.">
        Everything I ship ends up here in the open. These numbers come straight from the GitHub
        API, so they are always current.
      </SectionHead>

      {/* profile + stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="glass rounded-3xl p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-glow/10 font-mono text-lg font-semibold text-glow ring-1 ring-glow/30 shadow-[0_0_40px_-6px_rgba(150,167,255,0.45)]"
              aria-hidden="true"
            >
              hm
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink">{user.name || 'lakshit'}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-glow/80 transition-colors hover:text-glow"
              >
                @{user.login}
                <span className="sr-only"> (opens my GitHub profile in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] ${live ? 'text-emerald-200/80' : 'text-sky-200/80'}`}
              role="status"
            >
              <span className={`pulse-dot h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-300' : 'bg-sky-300'}`} />
              {loading
                ? 'syncing…'
                : live
                  ? `synced ${syncedAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                  : 'offline cache'}
            </span>
            <button
              onClick={refresh}
              aria-label="Refresh GitHub data"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-dim transition-colors hover:bg-white/10 hover:text-glow"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { n: user.public_repos, l: 'repositories' },
            { n: user.followers, l: 'followers' },
            { n: user.following, l: 'following' },
            { n: totalStars, l: 'stars earned' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/[0.05]">
              <p className="font-display text-2xl font-semibold text-ink tabular-nums">{s.n}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* interactive contribution heatmap */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-4"
      >
        <ContribGraph />
      </motion.div>

      {/* languages + browse */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="glass flex flex-col justify-between rounded-3xl p-6"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              languages · computed live
            </p>
            <div className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-white/[0.04]" role="img"
              aria-label={langs.map((l) => `${l.name} ${l.pct}%`).join(', ') || 'loading languages'}
            >
              {(langs.length ? langs : [{ name: 'TypeScript', pct: 100, color: LANG_COLORS.TypeScript }]).map((l) => (
                <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} className="h-full opacity-70" />
              ))}
            </div>
            <div className="mt-4 space-y-2.5">
              {(langs.length ? langs : []).map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-[13px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                  <span className="text-ink">{l.name}</span>
                  <span className="ml-auto font-mono text-[11px] text-faint">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://github.com/hmmlavi?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-1.5 font-mono text-[12px] text-glow/90 transition-colors hover:text-glow"
          >
            <GithubIcon size={13} aria-hidden="true" />
            browse all repositories
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          custom={1}
          className="glass flex flex-col justify-between rounded-3xl p-6"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              read it, fork it, steal the good parts
            </p>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              Web builds, AI experiments, a few Android apps, and a lot of learning in public.
              All of it is open, so you can see exactly how it was made, including the mistakes.
              Those are usually the interesting half.
            </p>
          </div>
            <a
            href={`${user.html_url}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 rounded-full bg-glow/10 px-5 py-2.5 font-mono text-[12px] text-glow ring-1 ring-glow/25 transition-colors hover:bg-glow/20"
          >
            <GithubIcon size={13} aria-hidden="true" />
            open github.com/hmmlavi
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* repos */}
      <div className="mt-10">
        <p className="mb-4 font-mono text-[11px] text-faint">
          ~/repos — everything public, newest first
        </p>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-[92px] animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, 6).map((r, i) => (
              <motion.div
                key={r.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20px' }}
                custom={i * 0.4}
              >
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View the ${r.name} repository on GitHub`}
                  className="glass glass-lift group block rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate font-mono text-[13px] font-medium text-ink transition-colors group-hover:text-glow">
                      {r.name}
                    </p>
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="shrink-0 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-glow group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1 line-clamp-1 text-[13px] text-dim">
                    {r.description || 'experiment in progress — description soon.'}
                  </p>
                  <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-faint">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: LANG_COLORS[r.language] ?? '#96a7ff' }}
                          aria-hidden="true"
                        />
                        {r.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={10} aria-hidden="true" /> {r.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={10} aria-hidden="true" /> {r.forks_count}
                    </span>
                    <span className="ml-auto">{timeAgo(r.pushed_at)}</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
