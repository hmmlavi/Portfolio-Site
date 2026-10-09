import { motion } from 'framer-motion';
import { Blocks, Bot, FlaskConical, Layers, Smartphone, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';

type Tone = 'glow' | 'sky' | 'lilac' | 'peach' | 'mist' | 'rose';

interface Domain {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  blurb: string;
  body: string;
  work: string[];
}

const DOMAINS: Domain[] = [
  {
    icon: Layers,
    tone: 'sky',
    title: 'Web development',
    blurb: 'Interfaces, dashboards, and the logic behind them',
    body: 'React and TypeScript on the front end, Node and Express on the other side. I care about the parts people feel, like fast loads and clear states, and the parts they never see, like sane data flow and routes that behave.',
    work: ['FacilityFix dashboard', 'This portfolio', 'Veylo web build'],
  },
  {
    icon: Bot,
    tone: 'lilac',
    title: 'AI features',
    blurb: 'Intelligence wired into the product, not bolted on',
    body: 'Using the Gemini API and modern language models to build things that actually assist. Assistants that answer in context, planners that read your patterns, and flows where the model does the tedious work.',
    work: ['L.A.V.I. assistant', 'Veylo habit engine', 'SaBuddy writer'],
  },
  {
    icon: Workflow,
    tone: 'peach',
    title: 'Automation',
    blurb: 'Deleting the boring half of the job',
    body: 'Small tools that quietly remove repetition. Python utilities, scrapers that gather what I need, and deploy setups so shipping an update takes one command instead of a ritual.',
    work: ['Python utilities', 'Data scrapers', 'Deploy pipelines'],
  },
  {
    icon: FlaskConical,
    tone: 'glow',
    title: 'Experiments',
    blurb: 'Building the thing to understand the thing',
    body: 'Projects with no deadline and no users, written purely to find out how something works. Prompting strategies, unfamiliar frameworks, animation tricks, API behaviour. Most stay small. A few grow up.',
    work: ['Prompt trials', 'Motion studies', 'API teardowns'],
  },
  {
    icon: Smartphone,
    tone: 'mist',
    title: 'Android',
    blurb: 'Native builds when the phone is the right home',
    body: 'Kotlin and Jetpack Compose for ideas that belong in your pocket rather than a browser tab, with Firebase handling accounts and sync. Used when the device genuinely matters.',
    work: ['SaBuddy', 'L.A.V.I. (in progress)'],
  },
  {
    icon: Blocks,
    tone: 'rose',
    title: 'Shipped products',
    blurb: 'Where an experiment grows up',
    body: 'The real test is taking something that worked on my machine and making it survive actual users. Campus issue reporting, habit tracking people return to, and all the unglamorous edge cases that follow.',
    work: ['FacilityFix', 'Veylo', 'SaBuddy'],
  },
];

const TILE: Record<Tone, string> = {
  glow: 'bg-glow/10 text-glow ring-glow/20',
  sky: 'bg-sky/10 text-sky ring-sky/20',
  lilac: 'bg-lilac/10 text-lilac ring-lilac/20',
  peach: 'bg-peach/10 text-peach ring-peach/20',
  mist: 'bg-mist/10 text-mist ring-mist/20',
  rose: 'bg-rose/10 text-rose ring-rose/20',
};

const TEXT: Record<Tone, string> = {
  glow: 'text-glow',
  sky: 'text-sky',
  lilac: 'text-lilac',
  peach: 'text-peach',
  mist: 'text-mist',
  rose: 'text-rose',
};

const LINE: Record<Tone, string> = {
  glow: 'bg-glow',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
  peach: 'bg-peach',
  mist: 'bg-mist',
  rose: 'bg-rose',
};

export default function Domains() {
  return (
    <section id="domains" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="Domains" index="02" accent="text-peach" title="What I build.">
        Six areas I keep returning to, from shipped products to experiments that exist only
        because I wanted to find something out.
      </SectionHead>

      <div className="grid gap-3 lg:grid-cols-2">
        {DOMAINS.map((d, i) => (
          <motion.article
            key={d.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            custom={i * 0.4}
            className="glass glass-lift group h-full rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition-transform duration-300 group-hover:scale-105 ${TILE[d.tone]}`}>
                <d.icon size={17} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`h-px w-5 opacity-40 ${LINE[d.tone]}`} aria-hidden="true" />
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">{d.title}</h3>
                <p className={`mt-0.5 text-[13px] ${TEXT[d.tone]}`}>{d.blurb}</p>
              </div>
            </div>

            <p className="mt-4 text-[13.5px] leading-[1.75] text-dim">{d.body}</p>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-faint">
              Some of it
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {d.work.map((w) => (
                <span
                  key={w}
                  className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-dim"
                >
                  {w}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
