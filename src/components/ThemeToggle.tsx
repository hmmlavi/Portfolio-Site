import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

function current(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(current);

  React.useEffect(() => {
    setTheme(current());
  }, []);

  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked — applies for this visit */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`theme: ${theme}`}
      className="relative flex h-8 w-14 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-1 transition-colors"
    >
      <span
        aria-hidden="true"
        className={`absolute h-6 w-6 rounded-full bg-glow/90 transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <Sun size={12} aria-hidden="true" className={`relative z-10 mx-auto transition-opacity ${theme === 'light' ? 'opacity-0' : 'opacity-70'}`} />
      <Moon size={12} aria-hidden="true" className={`relative z-10 mx-auto transition-opacity ${theme === 'dark' ? 'text-oncolor' : 'opacity-70'}`} />
    </button>
  );
}

