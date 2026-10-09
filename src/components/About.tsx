import { motion } from 'framer-motion';
import { Globe, Smartphone, Sparkles } from 'lucide-react';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';

const CAPABILITIES = [
  {
    icon: Globe,
    title: 'Web',
    tile: 'bg-sky/10 text-sky ring-sky/20',
    desc: 'React and TypeScript on the front, Node and Express behind it. Fast to load, clear to use, and built to hold up once real people arrive.',
  },
  {
    icon: Sparkles,
    title: 'AI features',
    tile: 'bg-lilac/10 text-lilac ring-lilac/20',
    desc: 'Assistants, planners and quiet automations built on the Gemini API. The AI handles the tedious part and hands the decision back to you.',
  },
  {
    icon: Smartphone,
    title: 'Android',
    tile: 'bg-mist/10 text-mist ring-mist/20',
    desc: 'Kotlin and Jetpack Compose for the ideas that belong on a phone. I reach for it when the device matters, not as a default.',
  },
];

const STATS = [
  { n: '05', l: 'Web projects', c: 'text-sky' },
  { n: '03', l: 'Android projects', c: 'text-mist' },
  { n: '10+', l: 'AI experiments', c: 'text-lilac' },
  { n: '∞', l: 'Ideas queued', c: 'text-peach' },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="About" index="01" accent="text-mist" title="A quiet obsession with building.">
        Who I am, how I got here, and what I keep reaching for when an idea refuses to leave my
        head.
      </SectionHead>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-5 text-[15px] leading-[1.8] text-ink/80"
        >
          <p>
            <span className="text-mist">&ldquo;I like experimenting with things.&rdquo;</span>{' '}
            That line covers most of it. Almost nothing I know came from a tutorial playlist. It
            came from opening a blank project and trying something I did not understand yet.
            Build it, break it, fix it, finally get it.
          </p>
          <p>
            I am a B.Tech computer science student in India, slowly turning into the kind of
            engineer who builds with AI rather than around it. My attention moves between the
            web, AI and Android, basically anywhere a curious idea can become working software.
          </p>
          <p>
            A few of those experiments grew up into real products. Veylo started as a question
            about habit tracking. SaBuddy started as an annoyance with writing social posts.
            Every one of them taught me something a textbook could not.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                className="glass glass-lift rounded-xl px-4 py-4"
              >
                <p className={`tabular font-display text-2xl font-semibold ${s.c}`}>{s.n}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {s.l}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-3">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              className="glass glass-lift flex items-start gap-4 rounded-xl p-5"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ${c.tile}`}>
                <c.icon size={17} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-ink">{c.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-dim">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
