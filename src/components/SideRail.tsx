import * as React from 'react';
import { scrollToId } from '../lib/scroll';

const SECTIONS = [
  { id: 'hero', label: 'start' },
  { id: 'about', label: 'about' },
  { id: 'domains', label: 'domains' },
  { id: 'work', label: 'work' },
  { id: 'github', label: 'github' },
  { id: 'journey', label: 'journey' },
  { id: 'stack', label: 'stack' },
  { id: 'terminal', label: 'shell' },
  { id: 'faq', label: 'faq' },
  { id: 'contact', label: 'contact' },
];

/** Fixed left-edge section navigator — fills the wide-screen margin. */
export default function SideRail() {
  const [active, setActive] = React.useState('hero');

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollToId(s.id)}
            aria-label={`Jump to ${s.label}`}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isActive
                ? 'scale-125 bg-rose shadow-[0_0_10px_rgba(255,180,200,0.9)]'
                : 'bg-white/20 group-hover:bg-white/50'
              }`}
            />
            <span
              className={`font-mono text-[10px] tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? 'translate-x-0 text-dim opacity-100'
                  : '-translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-80'
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
