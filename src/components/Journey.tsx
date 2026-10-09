import { motion } from 'framer-motion';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';

const STEPS = [
  {
    year: '2022',
    tone: 'mist',
    title: 'First lines of code',
    text: 'It started with HTML and CSS. Plain pages in a text editor, refreshed like they were magic. The itch to make a machine do something never really left after that.',
  },
  {
    year: '2023',
    tone: 'peach',
    title: 'Learning the fundamentals',
    text: 'C, and the basics done properly. Logic, memory, how a machine actually thinks. Not the glamorous part of programming, but everything I have built since rests on it.',
  },
  {
    year: '2024',
    tone: 'sky',
    title: 'Exploring everything',
    text: 'Pushed well past one comfortable stack into JavaScript, TypeScript and Kotlin, plus tools I had not heard of a month earlier. Plenty of rough prototypes came out of this year, and most of them taught me something.',
  },
  {
    year: '2025',
    tone: 'glow',
    title: 'Building in public',
    text: 'The year it stopped feeling like practice. My GitHub went live in September and side experiments started turning into things other people could actually use.',
  },
  {
    year: '2026',
    tone: 'rose',
    title: 'Shipping properly',
    text: 'SaBuddy, Veylo and FacilityFix all shipped this year, L.A.V.I. is in active development, and this portfolio finally looks the way I always pictured it.',
  },
  {
    year: 'Now',
    tone: 'lilac',
    title: 'Bigger swings',
    text: 'FacilityFix is running for campus, L.A.V.I. is in active development, and this portfolio finally looks the way I always pictured it. The experiments have not slowed down, they just got more ambitious.',
  },
];

const DOT: Record<string, string> = {
  mist: 'bg-mist',
  peach: 'bg-peach',
  sky: 'bg-sky',
  glow: 'bg-glow',
  rose: 'bg-rose',
  lilac: 'bg-lilac',
};

const YEAR: Record<string, string> = {
  mist: 'text-mist',
  peach: 'text-peach',
  sky: 'text-sky',
  glow: 'text-glow',
  rose: 'text-rose',
  lilac: 'text-lilac',
};

export default function Journey() {
  return (
    <section id="journey" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="Journey" index="05" accent="text-lilac" title="The road so far.">
        Four years of messing around with code that slowly turned into a direction.
      </SectionHead>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <dl className="space-y-3 font-mono text-[11px] leading-5">
            {[
              ['First code', '2022'],
              ['Fundamentals', '2023'],
              ['Exploring', '2024'],
              ['First public repo', 'Sep 2025'],
              ['Shipped', '2026'],
              ['Current focus', 'L.A.V.I.'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-white/[0.05] pb-2">
                <dt className="text-faint">{k}</dt>
                <dd className="text-dim">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-white/[0.08]" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.year}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              className="group relative flex gap-6 rounded-xl py-5 pl-0 pr-4 transition-colors hover:bg-white/[0.02]"
            >
              <span
                className={`mt-2 h-[11px] w-[11px] shrink-0 rounded-full ring-4 ring-base ${DOT[s.tone]}`}
                aria-hidden="true"
              />
              <div>
                <span className={`font-mono text-[11px] uppercase tracking-[0.3em] ${YEAR[s.tone]}`}>
                  {s.year}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-ink md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-[1.75] text-dim">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
