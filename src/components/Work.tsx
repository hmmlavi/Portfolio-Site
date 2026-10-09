import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, CalendarCheck, Globe, MessagesSquare, Sparkles } from 'lucide-react';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';

type Status = 'shipped' | 'in progress' | 'live';
type Accent = 'mist' | 'peach' | 'lilac' | 'sky' | 'rose';

interface Project {
  id: string;
  icon: typeof Sparkles;
  title: string;
  desc: string;
  stack: string[];
  status: Status;
  accent: Accent;
  href: string | null;
}

const PROJECTS: Project[] = [
  {
    id: 'sabuddy',
    icon: MessagesSquare,
    title: 'SaBuddy',
    desc: 'Android app for planning and drafting social content. The AI handles the tedious writing part while you keep the voice.',
    stack: ['Kotlin', 'Gemini API'],
    status: 'shipped',
    accent: 'mist',
    href: 'https://github.com/hmmlavi/SaBuddy',
  },
  {
    id: 'veylo',
    icon: CalendarCheck,
    title: 'Veylo',
    desc: 'A habit planner that quietly learns your patterns and nudges you back when you slip. Gentle rather than naggy.',
    stack: ['TypeScript', 'React', 'AI'],
    status: 'shipped',
    accent: 'peach',
    href: 'https://github.com/hmmlavi/Veylo',
  },
  {
    id: 'lavi',
    icon: Sparkles,
    title: 'L.A.V.I.',
    desc: 'A study assistant for students. One calm place for assignments, reminders, and appointments that used to live in six apps.',
    stack: ['Kotlin', 'Firebase', 'AI'],
    status: 'in progress',
    accent: 'lilac',
    href: null,
  },
  {
    id: 'facilityfix',
    icon: Building2,
    title: 'FacilityFix',
    desc: 'Campus issue tracker where students report broken things and actually watch them get fixed.',
    stack: ['TypeScript', 'Web'],
    status: 'shipped',
    accent: 'sky',
    href: 'https://github.com/hmmlavi/FacilityFix',
  },
  {
    id: 'portfolio',
    icon: Globe,
    title: 'Portfolio v2',
    desc: 'The site you are reading. Calmer than the first one, does more under the surface.',
    stack: ['React', 'Tailwind', 'Framer Motion'],
    status: 'live',
    accent: 'rose',
    href: 'https://github.com/hmmlavi/Portfolio-Site',
  },
];

const TILE: Record<Accent, string> = {
  mist: 'bg-mist/10 text-mist ring-mist/20',
  peach: 'bg-peach/10 text-peach ring-peach/20',
  lilac: 'bg-lilac/10 text-lilac ring-lilac/20',
  sky: 'bg-sky/10 text-sky ring-sky/20',
  rose: 'bg-rose/10 text-rose ring-rose/20',
};

const LINK: Record<Accent, string> = {
  mist: 'text-mist',
  peach: 'text-peach',
  lilac: 'text-lilac',
  sky: 'text-sky',
  rose: 'text-rose',
};

function StatusLabel({ s }: { s: Status }) {
  const m: Record<Status, { dot: string; text: string }> = {
    shipped: { dot: 'bg-leaf', text: 'text-leaf' },
    'in progress': { dot: 'bg-sky', text: 'text-sky' },
    live: { dot: 'bg-rose', text: 'text-rose' },
  };
  const c = m[s];
  return (
    <span className={`flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${c.text}`}>
      <span className={`pulse-dot h-1 w-1 rounded-full ${c.dot}`} />
      {s}
    </span>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="Projects" title="Selected builds.">
        A few things I have shipped, plus one still quietly cooking. The deeper breakdown of
        each build lives in the Project Explorer.
      </SectionHead>

      <div className="grid gap-3 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            custom={i * 0.5}
            className="glass glass-lift group h-full rounded-xl"
          >
            <div className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition-transform duration-300 group-hover:scale-105 ${TILE[p.accent]}`}>
                  <p.icon size={17} aria-hidden="true" />
                </span>
                <StatusLabel s={p.status} />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.75] text-dim">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 pt-1">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 font-mono text-[11px] ${LINK[p.accent]} transition-colors hover:bg-white/[0.06]`}
                  >
                    GitHub
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}
                {p.id && (
                  <a
                    href={`/explore?p=${p.id}`}
                    className="flex items-center gap-1.5 rounded-md bg-glow/15 px-3.5 py-2 font-mono text-[11px] font-semibold text-glow ring-1 ring-glow/25 transition-colors hover:bg-glow/25"
                  >
                    Inspect
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <a
          href="/explore"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-glow transition-opacity hover:opacity-80"
        >
          Open the Project Explorer
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
