import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, FileText, Send } from 'lucide-react';
import { fadeUp } from '../lib/anim';
import { DiscordIcon, GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from './icons';
import { RESUME_URL } from './Hero';

const EMAIL = 'lakshitsinghsaini@gmail.com';

const field =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-glow/60';
const label = 'mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-faint';

const SOCIALS = [
  { label: 'GitHub', handle: '@hmmlavi', href: 'https://github.com/hmmlavi', icon: GithubIcon, tint: 'group-hover:text-glow' },
  { label: 'LinkedIn', handle: 'lakshitsinghsaini', href: 'https://www.linkedin.com/in/lakshitsinghsaini/', icon: LinkedinIcon, tint: 'group-hover:text-sky' },
  { label: 'Instagram', handle: '@lakshitsinghsaini', href: 'https://www.instagram.com/lakshitsinghsaini/', icon: InstagramIcon, tint: 'group-hover:text-rose' },
  { label: 'Discord', handle: 'Join the server', href: 'https://discord.com/invite/28KbZRtt65', icon: DiscordIcon, tint: 'group-hover:text-lilac' },
  { label: 'X', handle: '@lakshits27', href: 'https://x.com/Lakshits27', icon: XIcon, tint: 'group-hover:text-ink' },
];

export default function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus('Copying failed. You can select the address manually.');
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setStatus('Please tick the consent box first so I know you read the note underneath.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus(
      'Your email app should be opening with everything filled in. Nothing was stored here, so review it there and press send when it looks right.',
    );
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="glass overflow-hidden rounded-2xl"
      >
        <div className="grid gap-12 px-6 py-12 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-rose">Contact</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-[42px]">
              Have something in mind?
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-dim">
              An internship, a collaboration, or just a strange idea you wish existed. My inbox
              is open and I genuinely reply fast. This form simply opens your own email app.
            </p>

            <form onSubmit={submit} className="mt-9" aria-describedby="form-note">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={label}>Your name</label>
                  <input
                    id="cf-name" name="name" type="text" autoComplete="name" required
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace" className={field}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className={label}>Your email</label>
                  <input
                    id="cf-email" name="email" type="email" autoComplete="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@example.com" className={field}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="cf-message" className={label}>Message</label>
                <textarea
                  id="cf-message" name="message" rows={4} required
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the project, the role, or the problem."
                  className={`${field} resize-y`}
                />
              </div>

              <div className="mt-4 flex items-start gap-3">
                <input
                  id="cf-consent" name="consent" type="checkbox" required
                  checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.05] accent-[#f5a3bd]"
                />
                <label htmlFor="cf-consent" className="text-[13px] leading-[1.7] text-dim">
                  I understand this form opens my own email app with my message, that{' '}
                  <span className="text-ink">no data is stored or sent by this website</span>,
                  and I have read the{' '}
                  <a href="/privacy" className="text-rose underline underline-offset-2">privacy policy</a>.
                </label>
              </div>

              <p id="form-note" className="mt-3 font-mono text-[11px] leading-[1.7] text-faint">
                Your message goes from your device straight to your email app. I never see it
                until you actually send it.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-rose px-5 py-3 text-sm font-semibold text-oncolor transition-opacity duration-300 hover:opacity-90"
                >
                  <Send size={15} aria-hidden="true" />
                  Compose email
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="glass glass-lift flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-ink"
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  {copied ? 'Address copied' : 'Copy my address'}
                </button>
              </div>

              <div aria-live="polite" role="status" className="mt-4 min-h-[1.5em] text-[13px] text-mist">
                {status}
              </div>
            </form>
          </div>

          <div className="lg:border-l lg:border-white/[0.06] lg:pl-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              Everywhere else
            </p>

            <div className="mt-5 space-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-lift group flex items-center justify-between gap-2 rounded-lg px-4 py-3"
                >
                  <span className={`flex items-center gap-2.5 text-[13px] text-dim transition-colors ${s.tint}`}>
                    <s.icon size={15} aria-hidden="true" />
                    {s.label}
                  </span>
                  <span className="flex items-center gap-1 truncate font-mono text-[11px] text-faint group-hover:text-ink">
                    <span className="truncate">{s.handle}</span>
                    <ArrowUpRight size={12} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-lift group mt-3 flex items-center justify-between rounded-lg px-4 py-4"
            >
              <span className="flex items-center gap-2.5 text-[13px] font-medium text-ink">
                <FileText size={15} className="text-rose" aria-hidden="true" />
                Grab my résumé
              </span>
              <ArrowUpRight size={14} aria-hidden="true" className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <p className="mt-6 break-all font-mono text-[12px] leading-[1.7] text-faint">
              Or the plain way:
              <br />
              <a href={`mailto:${EMAIL}`} className="text-dim transition-colors hover:text-rose">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
