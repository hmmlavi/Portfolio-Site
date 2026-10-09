import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { SectionHead } from './ui';
import { EASE } from '../lib/anim';
import { scrollToId } from '../lib/scroll';

const QA = [
  {
    q: 'So who is Lakshit, exactly?',
    a: 'A B.Tech computer science student in India who builds for the web, usually with some AI involved. I publish the work as @hmmlavi on GitHub, and older projects carry my builder name, LAVI.',
  },
  {
    q: 'What do you actually build day to day?',
    a: 'Web tools, small AI powered apps, and a steady stream of experiments in between. Occasionally an Android app, when an idea genuinely wants to live on a phone. If something will not leave my head, it usually becomes a repository within the week.',
  },
  {
    q: 'What is usually in your stack?',
    a: 'The classics first: C, C++, Python, HTML, CSS and JavaScript. Then React and TypeScript on top. Firebase or MongoDB when something needs to remember things, and Kotlin with Compose when the idea calls for it.',
  },
  {
    q: 'Is L.A.V.I. a real project or vapourware?',
    a: 'Real, and in active development. It is a study assistant for students, backed by Firebase, meant to be one calm place for assignments and reminders. Public builds will land once it stops embarrassing me.',
  },
  {
    q: 'Are you open to internships or collaborations?',
    a: 'Yes. Internships, collaborations, or just an interesting problem in web, AI or Android. If you are building something real, my inbox is the fastest way to reach me.',
  },
  {
    q: 'What is the fastest way to reach you?',
    a: 'Email, honestly. lakshitsinghsaini@gmail.com. I read everything and reply quickly.',
  },
];

export default function Faq() {
  const [open, setOpen] = React.useState(-1);

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead kicker="FAQ" index="08" accent="text-peach" title="Questions I get asked a lot.">
        The quick answers. Anything deeper, send me an email and I will happily get into detail.
      </SectionHead>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-xl p-5">
            <Mail size={16} className="text-peach" aria-hidden="true" />
            <p className="mt-3 text-[13px] leading-[1.7] text-dim">
              Not covered here? Ask me directly. I read everything and usually reply the same
              day.
            </p>
            <button
              onClick={() => scrollToId('contact')}
              className="mt-4 font-mono text-[12px] text-peach transition-opacity hover:opacity-80"
            >
              Go to the contact form
            </button>
          </div>
        </div>

        <div>
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/[0.06] first:border-t">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-base font-medium transition-colors md:text-[17px] ${
                        isOpen ? 'text-ink' : 'text-dim hover:text-ink'
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`shrink-0 text-faint transition-transform duration-300 ${isOpen ? 'rotate-180 text-peach' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-10 text-[14px] leading-[1.8] text-dim">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
