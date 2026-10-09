import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/icons';

const DESTINATIONS = [
  { href: '/#work', label: 'Selected builds', note: 'The projects I have shipped' },
  { href: '/#github', label: 'Live GitHub activity', note: 'Repositories and contributions' },
  { href: '/#stack', label: 'Tools of the trade', note: 'The languages I work in' },
  { href: '/#contact', label: 'Get in touch', note: 'Email and social profiles' },
];

const POLICIES = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/refund', label: 'Refund Policy' },
];

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-glow">Error 404</p>

      <h1 className="mt-5 font-display text-4xl font-semibold text-ink md:text-6xl">
        This page does not exist.
      </h1>

      <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-dim">
        Either the link was wrong, or I moved something and forgot to leave a forwarding address.
        Both are genuinely possible. Here is the way back.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg bg-glow px-5 py-3 text-sm font-semibold text-oncolor transition-opacity duration-300 hover:opacity-90"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to the homepage
        </a>
        <a
          href="https://github.com/hmmlavi"
          target="_blank"
          rel="noopener noreferrer"
          className="glass glass-lift flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-ink"
        >
          <GithubIcon size={15} aria-hidden="true" />
          Browse my GitHub
        </a>
      </div>

      <div className="mt-12 border-t border-white/[0.06] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          Or jump straight to
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="glass glass-lift group flex items-center justify-between rounded-lg px-4 py-3"
            >
              <span>
                <span className="block text-[14px] font-medium text-ink">{d.label}</span>
                <span className="block text-[12px] text-faint">{d.note}</span>
              </span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="shrink-0 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          Site policies
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {POLICIES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-dim transition-colors hover:border-glow/30 hover:text-ink"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
