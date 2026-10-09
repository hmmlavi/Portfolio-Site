import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { scrollToId } from '../lib/scroll';
import ThemeToggle from './ThemeToggle';

const PRIMARY = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const MORE = [
  { id: 'github', label: 'GitHub' },
  { id: 'stack', label: 'Stack' },
  { id: 'faq', label: 'FAQ' },
  { id: 'domains', label: 'Domains' },
  { href: '/explore', label: 'Project Explorer' },
  { href: '/resume', label: 'Résumé' },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  const go = (target: string) => {
    setMenuOpen(false);
    setMoreOpen(false);
    if (target.startsWith('/')) {
      window.location.href = target;
      return;
    }
    setTimeout(() => scrollToId(target), 50);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className="glass flex h-11 items-center gap-3 rounded-full border-white/[0.08] bg-solid/85 px-4 shadow-[0_10px_36px_-14px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          <button onClick={() => go('hero')} className="flex items-center gap-2" aria-label="Go to the top">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(150,167,255,0.9)]" />
            <span className="text-[13px] font-semibold tracking-wide text-ink">lakshit</span>
          </button>

          <span className="hidden h-4 w-px bg-white/10 md:block" aria-hidden="true" />

          {/* desktop primary links */}
          <div className="hidden items-center gap-4 md:flex">
            {PRIMARY.slice(1).map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-[12.5px] font-medium text-dim transition-colors hover:text-ink"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go('github')}
              className="text-[12.5px] font-medium text-dim transition-colors hover:text-ink"
            >
              GitHub
            </button>
          </div>

          <span className="hidden h-4 w-px bg-white/10 md:block" aria-hidden="true" />

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
            className="hidden h-8 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 font-mono text-[10px] text-faint transition-colors hover:border-white/20 hover:text-ink sm:flex"
          >
            ⌘K
          </button>

          <ThemeToggle />

          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-dim transition-colors hover:text-ink md:hidden"
            onClick={() => { setMenuOpen((o) => !o); setMoreOpen(false); }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </motion.header>

      {/* mobile menu: compact sheet, closes on interaction */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col px-4 pb-6 pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass flex flex-col gap-0.5 rounded-2xl border-white/[0.08] bg-solid/95 p-3 backdrop-blur-md" role="dialog" aria-label="Menu">
              {PRIMARY.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-xl px-4 py-3.5 text-left text-[15px] font-medium text-ink transition-colors hover:bg-white/[0.05]"
                  style={{ transitionDelay: `${i * 10}ms` }}
                >
                  {l.label}
                </button>
              ))}

              <button
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-[13px] font-medium text-dim transition-colors hover:bg-white/[0.05] hover:text-ink"
              >
                More
                <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {moreOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden border-t border-white/[0.06]"
                  >
                    <div className="flex flex-col gap-0.5 pt-1">
                      {MORE.map((l) => (
                        <button
                          key={l.label}
                          onClick={() => { if ('href' in l && l.href) { window.location.href = l.href; } else { go((l as { id: string }).id); } }}
                          className="rounded-xl px-4 py-3 text-left text-[14px] text-dim transition-colors hover:bg-white/[0.04] hover:text-ink"
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="mt-3 rounded-full bg-glow px-5 py-2.5 font-mono text-[11px] font-semibold text-oncolor"
            >
              Close menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
