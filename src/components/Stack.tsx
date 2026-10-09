import { motion } from 'framer-motion';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';

const GROUPS: { label: string; accent: string; items: string[] }[] = [
  {
    label: 'Languages',
    accent: 'text-mist',
    items: ['C', 'C++', 'Python', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    label: 'Web',
    accent: 'text-sky',
    items: ['React', 'Express', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vite', 'REST APIs'],
  },
  {
    label: 'AI and data',
    accent: 'text-lilac',
    items: [
      'Claude',
      'ChatGPT',
      'Prompt engineering',
      'AI assisted development',
      'Gemini API',
      'Google AI Studio',
      'Firebase',
      'MongoDB',
      'PostgreSQL',
    ],
  },
  {
    label: 'Tooling and mobile',
    accent: 'text-peach',
    items: ['Git', 'GitHub', 'Postman', 'Figma', 'Vercel', 'Kotlin', 'Jetpack Compose', 'Android Studio'],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="Stack" index="06" accent="text-glow" title="Tools of the trade.">
        Everything here was picked up by building something with it, not by watching someone else
        build at 1.5x speed.
      </SectionHead>

      <div className="grid gap-3 md:grid-cols-2">
        {GROUPS.map((g, gi) => (
          <motion.div
            key={g.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            custom={gi}
            className="glass glass-lift rounded-xl p-5"
          >
            <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${g.accent}`}>
              {g.label}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[13px] text-dim transition-colors duration-200 hover:border-white/20 hover:text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-6 font-mono text-[11px] text-faint"
      >
        32 tools and counting. There is usually one more installed by the end of the month.
      </motion.p>
    </section>
  );
}
