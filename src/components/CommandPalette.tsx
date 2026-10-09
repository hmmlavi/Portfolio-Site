import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CornerDownLeft,
  FileText,
  Mail,
  Sun,
  Terminal,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { scrollToId, scrollToTopImmediate } from '../lib/scroll';
import { openExternal } from '../lib/open';

export const EMAIL = 'lakshitsinghsaini@gmail.com';

interface Item {
  id: string;
  group: 'pages' | 'actions' | 'links';
  icon?: React.ElementType;
  label: string;
  hint?: string;
  run: () => void;
}

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const nav = React.useCallback(
    (path: string) => {
      const [, hash] = path.split('#');
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      if (hash) {
        requestAnimationFrame(() => scrollToId(hash));
      } else {
        scrollToTopImmediate();
      }
      onClose();
    },
    [onClose],
  );

  const go = React.useCallback(
    (id: string) => {
      onClose();
      setTimeout(() => scrollToId(id), 60);
    },
    [onClose],
  );

  const items = React.useMemo<Item[]>(() => {
    const page = (id: string, label: string, hint = 'Go to') => ({
      id,
      group: 'pages' as const,
      label,
      icon: ArrowRight,
      hint,
      run: () => go(id),
    });
    return [
      page('hero', 'Start'),
      page('about', 'About'),
      page('domains', 'Domains'),
      page('work', 'Work'),
      page('github', 'GitHub'),
      page('journey', 'Journey'),
      page('stack', 'Stack'),
      page('terminal', 'Shell'),
      page('faq', 'FAQ'),
      page('contact', 'Contact'),
      {
        id: 'theme',
        group: 'actions',
        icon: Sun,
        label: 'Toggle theme',
        hint: 'dark / light',
        run: () => {
          const root = document.documentElement;
          const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          root.setAttribute('data-theme', next);
          try {
            localStorage.setItem('theme', next);
          } catch {}
          onClose();
        },
      },
      {
        id: 'copy-email',
        group: 'actions',
        icon: Mail,
        label: 'Copy my email address',
        hint: EMAIL,
        run: () => {
          void navigator.clipboard?.writeText(EMAIL).catch(() => {});
          onClose();
        },
      },
      {
        id: 'terminal-help',
        group: 'actions',
        icon: Terminal,
        label: 'Open the terminal and run help',
        hint: 'lakshit@portfolio',
        run: () => {
          go('terminal');
        },
      },
      { id: 'l-github', group: 'links', icon: GithubIcon, label: 'Open GitHub', hint: 'hmmlavi', run: () => { openExternal('https://github.com/hmmlavi'); onClose(); } },
      { id: 'l-linkedin', group: 'links', icon: LinkedinIcon, label: 'Open LinkedIn', hint: 'lakshitsinghsaini', run: () => { openExternal('https://www.linkedin.com/in/lakshitsinghsaini/'); onClose(); } },
      { id: 'l-resume', group: 'links', icon: FileText, label: 'Open my résumé', hint: 'Drive', run: () => { openExternal('https://drive.google.com/drive/folders/1w-3xXPftM9oVKjTJ1_Mkifsh0h4H-3E9'); onClose(); } },
      { id: 'l-mail', group: 'links', icon: Mail, label: 'Email me', hint: EMAIL, run: () => { window.location.href = `mailto:${EMAIL}`; onClose(); } },
      { id: 'p-privacy', group: 'links', icon: ArrowUpRight, label: 'Privacy Policy', hint: '/privacy', run: () => nav('/privacy') },
      { id: 'p-terms', group: 'links', icon: ArrowUpRight, label: 'Terms & Conditions', hint: '/terms', run: () => nav('/terms') },
    ];
  }, [go, nav, onClose]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.includes(q) ||
        (i.hint ?? '').toLowerCase().includes(q),
    );
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  React.useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)));
  }, [filtered]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filtered[index]?.run();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, index, onClose]);

  const groupLabel: Record<Item['group'], string> = {
    pages: 'Jump to',
    actions: 'Actions',
    links: 'Links',
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[18px] backdrop-saturate-150" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-xl"
          >
            <div className="glass overflow-hidden rounded-xl border-white/[0.09] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
                <Terminal size={14} className="shrink-0 text-faint" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="term-input flex-1 bg-transparent font-mono text-[13px] text-ink placeholder:text-faint"
                  placeholder="Type a command or search…"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Search commands"
                />
                <kbd className="hidden rounded-md border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
                  esc
                </kbd>
              </div>

              <div className="max-h-[46vh] overflow-y-auto p-2" role="listbox">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center font-mono text-[12px] text-faint">
                    Nothing found for “{query}”
                  </p>
                )}

                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon ?? ArrowRight;
                  const active = i === index;
                  return (
                    <React.Fragment key={item.id}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                          {groupLabel[item.group]}
                        </p>
                      )}
                      <button
                        role="option"
                        aria-selected={active}
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => item.run()}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          active ? 'bg-white/[0.06] text-ink' : 'text-dim hover:text-ink'
                        }`}
                      >
                        <Icon size={14} className={`shrink-0 ${active ? 'text-glow' : 'text-faint'}`} aria-hidden="true" />
                        <span className="text-[13.5px] font-medium">{item.label}</span>
                        {item.hint && (
                          <span className="ml-auto truncate font-mono text-[11px] text-faint">
                            {item.hint}
                          </span>
                        )}
                        {active && <CornerDownLeft size={12} className="ml-2 shrink-0 text-faint" aria-hidden="true" />}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10px] text-faint">
                ↑↓ navigate &nbsp;·&nbsp; enter select &nbsp;·&nbsp; esc close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
