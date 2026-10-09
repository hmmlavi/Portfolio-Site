import { ArrowUp } from 'lucide-react';

const POLICIES = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/refund', label: 'Refund Policy' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-6 pb-10 pt-4">
      <div className="mx-auto max-w-6xl border-t border-white/[0.06] pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-display text-sm font-semibold text-ink">Lakshit Singh Saini</p>
              <p className="mt-1.5 max-w-xs text-[13px] leading-[1.7] text-faint">
                Web developer and computer science student. Building in public from India.
              </p>
            </div>

          <nav aria-label="Site policies" className="flex flex-wrap gap-x-5 gap-y-2">
            {POLICIES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="font-mono text-[11px] text-faint transition-colors hover:text-glow"
              >
                {p.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-5 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Lakshit Singh Saini. Individual, based in India.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 self-start transition-colors hover:text-glow sm:self-auto"
          >
            Back to top
            <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
