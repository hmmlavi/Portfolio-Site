import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { GithubIcon } from './icons';
import { Chip } from './ui';
import { useGitHub } from '../lib/github';
import { useContributions } from '../lib/contributions';
import { scrollToId } from '../lib/scroll';
import DoodlePad from './DoodlePad';

export const RESUME_URL =
  'https://drive.google.com/drive/folders/1w-3xXPftM9oVKjTJ1_Mkifsh0h4H-3E9';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (d: number) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } },
});

const NOW = [
  { k: 'building', v: 'L.A.V.I., a study assistant', dot: 'bg-mist' },
  { k: 'learning', v: 'how LLMs work internally', dot: 'bg-peach' },
  { k: 'based in', v: 'India. Remote or hybrid', dot: 'bg-sky' },
  { k: 'status', v: 'Open to work', dot: 'bg-leaf', live: true },
];

const LAB = [
  { v: 'L.A.V.I. private preview', dot: 'bg-lilac', tag: 'active' },
  { v: 'SaBuddy v2 planning', dot: 'bg-rose', tag: 'queued' },
  { v: 'Veylo on the web', dot: 'bg-peach', tag: 'queued' },
];

export default function Hero({ started }: { started: boolean }) {
  const { repos, live, loading } = useGitHub();
  const { total } = useContributions();
  const state = started ? 'show' : 'hidden';

  return (
    <section id="hero" className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-20 pt-32 md:pt-36">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
        <div className="lg:pt-2">
          <motion.h1
            aria-label="Lakshit Singh Saini"
            className="whitespace-nowrap font-display text-[clamp(1.75rem,5vw,4.25rem)] font-semibold text-ink"
          >
            {'Lakshit Singh Saini'.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="inline-block will-change-[transform,opacity]"
                initial={{ opacity: 0, y: 14 }}
                animate={started ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.018 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={rise(0.22)}
            initial="hidden"
            animate={state}
            className="mt-3 font-display text-[clamp(1.15rem,2.6vw,1.75rem)] font-normal tracking-[-0.02em] text-dim"
          >
            I like experimenting with things.
          </motion.p>

          <motion.p
            variants={rise(0.3)}
            initial="hidden"
            animate={state}
            className="mt-7 max-w-xl text-[15px] leading-[1.75] text-dim"
          >
            Computer science student in India. I build web apps, add AI where it genuinely earns
            its place, and ship most of the work in public. Right now I am putting together a
            study assistant called L.A.V.I.
          </motion.p>

          <motion.div
            variants={rise(0.38)}
            initial="hidden"
            animate={state}
            className="mt-6 flex flex-wrap gap-2"
          >
            <Chip>Web developer</Chip>
            <Chip className="text-lilac">Builds with AI</Chip>
            <Chip className="text-leaf">Learning in public</Chip>
          </motion.div>

          <motion.div
            variants={rise(0.46)}
            initial="hidden"
            animate={state}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollToId('work')}
              className="group flex items-center gap-2 rounded-lg bg-glow px-5 py-3 text-sm font-semibold text-oncolor transition-opacity duration-300 hover:opacity-90"
            >
              See what I have built
              <ArrowDown size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <a
              href="https://github.com/hmmlavi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-lift flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-ink"
            >
              <GithubIcon size={15} aria-hidden="true" />
              GitHub
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-lift group flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-ink"
            >
              <FileText size={15} aria-hidden="true" />
              Résumé
              <ArrowUpRight size={13} aria-hidden="true" className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p
            variants={rise(0.54)}
            initial="hidden"
            animate={state}
            className="mt-7 font-mono text-[11px] text-faint"
          >
            {loading
              ? 'Syncing with GitHub'
              : `${repos.length} public repositories${live ? ', pulled live from the GitHub API' : ', showing cached data'}`}
          </motion.p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.div variants={rise(0.34)} initial="hidden" animate={state} className="glass rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">Right now</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
              {NOW.map((n) => (
                <div key={n.k}>
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    <span className={`h-1 w-1 rounded-full ${n.dot} ${n.live ? 'pulse-dot' : ''}`} />
                    {n.k}
                  </p>
                  <p className="mt-1 text-[13px] font-medium leading-snug text-ink">{n.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={rise(0.42)} initial="hidden" animate={state} className="glass rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">In the lab</p>
            <div className="mt-4 space-y-3">
              {LAB.map((l) => (
                <div key={l.v} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5 text-[13px] text-dim">
                    <span className={`h-1 w-1 rounded-full ${l.dot}`} />
                    {l.v}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">{l.tag}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={rise(0.5)} initial="hidden" animate={state}>
            <DoodlePad />
          </motion.div>

          <motion.div
            variants={rise(0.58)}
            initial="hidden"
            animate={state}
            className="glass grid grid-cols-2 divide-x divide-white/[0.06] rounded-xl"
          >
            <div className="px-5 py-4">
              <p className="tabular font-display text-2xl font-semibold text-glow">
                {total > 0 ? total.toLocaleString('en-IN') : '0'}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Contributions, 12 mo
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="tabular font-display text-2xl font-semibold text-mist">
                {loading ? '0' : repos.length}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Public repositories
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        variants={rise(0.9)}
        initial="hidden"
        animate={state}
        onClick={() => scrollToId('about')}
        aria-label="Scroll to the about section"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-glow"
      >
        <ArrowDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
