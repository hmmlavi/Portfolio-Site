import { ArrowLeft } from 'lucide-react';

export type LegalRoute = 'privacy' | 'terms' | 'cookies' | 'refund';

export const LEGAL_ROUTES: LegalRoute[] = ['privacy', 'terms', 'cookies', 'refund'];

const OWNER = 'Lakshit Singh Saini';
const CONTACT = 'lakshitsinghsaini@gmail.com';
const UPDATED = 'January 2026';

interface Section {
  h: string;
  paras?: string[];
  list?: string[];
}

interface Policy {
  route: LegalRoute;
  title: string;
  subtitle: string;
  sections: Section[];
}

/* -- Privacy (DPDP-compliant, individual operator) -------------------- */
const PRIVACY: Policy = {
  route: 'privacy',
  title: 'Privacy Policy',
  subtitle: 'How this portfolio handles data — mostly by not collecting any.',
  sections: [
    {
      h: '1. Who runs this website',
      paras: [
        `This is the personal portfolio of ${OWNER}, an individual developer based in India — not a company. It is not operated for commercial data processing. Any privacy question goes straight to me at ${CONTACT}.`,
        'For the purposes of India’s Digital Personal Data Protection Act, 2023 (“DPDP Act”), I act as the Data Fiduciary for any personal data you send me directly — for example, by email.',
      ],
    },
    {
      h: '2. What this site collects by itself',
      paras: [
        'Nothing, by design. This website does not use analytics, does not set cookies, does not fingerprint, does not run advertising, does not require accounts, and does not store form data on any server.',
        'The contact form has no backend. Submitting it simply opens your own email application with the message pre-filled. You review it and send it yourself; until you press send there, nothing leaves your device.',
      ],
    },
    {
      h: '3. Third parties your browser does contact',
      paras: [
        'A page load makes a handful of necessary requests to deliver content. Only what is required; nothing that tracks you.',
      ],
      list: [
        'GitHub REST API (api.github.com) — shows my live public GitHub stats. GitHub may log your IP under its own policy.',
        'GitHub contributions API (github-contributions-api.jogruber.de) — shows my public yearly contribution counts. Only my public username travels in this request.',
        'Google Fonts (fonts.googleapis.com / fonts.gstatic.com) — loads the Manrope, JetBrains Mono and Instrument Serif typefaces. Requests are logged by Google per its policy.',
        'Hosting provider (e.g. Vercel) — keeps short-lived standard access logs for security and reliability.',
      ],
    },
    {
      h: '4. Emailing me',
      paras: [
        'If you email me, I process your name, address, and message only to reply and manage our conversation. I do not sell, rent, or share it with marketers, and I do not run a newsletter. Correspondence is kept only as long as needed, and you may ask for its deletion at any point.',
      ],
    },
    {
      h: '5. Your rights',
      paras: [
        'Under the DPDP Act, 2023, you may request access to, correction of, or erasure of personal data I hold about you, and you may raise a grievance with me. If you read this from the EU/UK, the GDPR gives you analogous rights. Email me at the address above — I respond quickly.',
      ],
    },
    {
      h: '6. Children',
      paras: [
        'This is a professional portfolio, not directed at children, and I do not knowingly collect data from anyone under 18.',
      ],
    },
    {
      h: '7. Changes & jurisdiction',
      paras: [
        'This policy may be updated as the site evolves; the date below reflects the current version. Concerns about this website are subject to Indian law.',
      ],
    },
  ],
};

/* -- Terms ----------------------------------------------------------- */
const TERMS: Policy = {
  route: 'terms',
  title: 'Terms & Conditions',
  subtitle: 'The short ground rules for browsing this site.',
  sections: [
    {
      h: '1. What this site is',
      paras: [
        `The personal portfolio of ${OWNER}, an individual developer and student in India. It is informational, a portfolio of work, and an invitation to get in touch. It is not a store, and nothing here is a binding offer.`,
      ],
    },
    {
      h: '2. Intellectual property & credits',
      paras: [
        'Site copy and design are mine. Project descriptions point to repositories on GitHub, each under its own license. Built with: React (MIT), Framer Motion (MIT), Tailwind CSS (MIT), Lenis (MIT), Lucide icons (ISC). Fonts are open-source under the SIL OFL (Manrope, JetBrains Mono, Instrument Serif).',
        'You may quote with attribution and a link. Do not clone the whole thing and call it yours.',
      ],
    },
    {
      h: '3. No warranties; accuracy',
      paras: [
        'Provided “as is”, without warranties of any kind. Descriptions and counts are in good faith. Live sections (GitHub stats, contribution data) reflect third-party API responses and may be delayed, cached, or briefly unavailable. Nothing here is professional advice.',
      ],
    },
    {
      h: '4. External links',
      paras: [
        'I link out to GitHub, X, LinkedIn, Instagram, and Discord. I am not responsible for their content or privacy practices — their terms apply there.',
      ],
    },
    {
      h: '5. Acceptable use',
      paras: [
        'Do not scrape at abusive rates, attack or disrupt the site, or misrepresent its content as someone else’s identity or endorsement.',
      ],
    },
    {
      h: '6. Liability · changes · governing law',
      paras: [
        'To the maximum extent permitted, I am not liable for indirect or consequential loss from using this site. Terms may change; continued use is acceptance. Governed by the laws of India.',
      ],
    },
  ],
};

/* -- Cookies (zero cookies) ------------------------------------------- */
const COOKIES: Policy = {
  route: 'cookies',
  title: 'Cookie Policy',
  subtitle: 'Short version: this site sets zero cookies.',
  sections: [
    {
      h: '1. What is actually set',
      paras: [
        'No cookies. No analytics cookies, no preference cookies, no advertising identifiers, no third-party trackers persisting in your browser. No tracking via localStorage or sessionStorage either. Verify any time in DevTools → Application → Cookies — the list is empty.',
        'One exception that is not tracking: your theme preference (dark/light) is kept in localStorage purely so the site loads how you left it. It is your own setting, never read by anyone but your own browser.',
      ],
    },
    {
      h: '2. Do I need a consent banner?',
      paras: [
        'No. A banner is honestly required when non-essential cookies exist. There are none here, so a banner would be decoration pretending to be compliance. If analytics are ever introduced, this page will be updated and a genuine consent choice presented first.',
      ],
    },
    {
      h: '3. Third-party requests',
      paras: [
        'Content is fetched from GitHub’s API, the contributions API, Google Fonts, and the host. Those providers may process connection data under their own policies — see the Privacy Policy for the list.',
      ],
    },
    {
      h: '4. Questions',
      paras: [`Anything unclear? Email ${CONTACT} — happy to walk through exactly what runs on this page.`],
    },
  ],
};

/* -- Refund ----------------------------------------------------------- */
const REFUND: Policy = {
  route: 'refund',
  title: 'Refund Policy',
  subtitle: 'What applies if money is ever involved.',
  sections: [
    {
      h: '1. Nothing is sold here',
      paras: [
        'This website does not sell, invoice, or take payment for anything — no products, subscriptions, or hosted services. As a result there is nothing on this site to refund.',
      ],
    },
    {
      h: '2. Separate engagements',
      paras: [
        'If we work together on something paid, payment, cancellation, and refund terms would be set out in writing beforehand and separately — a proposal, invoice, or contract — not via this site.',
      ],
    },
    {
      h: '3. Questions',
      paras: [`If you believe a payment relates to me by mistake, contact ${CONTACT} with details and we will sort it.`],
    },
  ],
};

export const LEGAL_CONTENT: Record<LegalRoute, Policy> = {
  privacy: PRIVACY,
  terms: TERMS,
  cookies: COOKIES,
  refund: REFUND,
};

export default function LegalPage({ page }: { page: LegalRoute }) {
  const policy = LEGAL_CONTENT[page];
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 pb-28 pt-28 md:pt-32">
      <a
        href="/"
        className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/[0.07]"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back to the portfolio homepage
      </a>

      <header className="mt-10 border-b border-white/[0.06] pb-9">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          {policy.title}
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-dim">{policy.subtitle}</p>
        <p className="mt-5 font-mono text-[11px] leading-6 text-faint">
          last updated — {UPDATED}
          <br />
          operator: {OWNER} · individual · india ·{' '}
          <a href={`mailto:${CONTACT}`} className="text-glow/80 hover:text-glow hover:underline">
            {CONTACT}
          </a>
        </p>
      </header>

      <article className="mt-10 space-y-9">
        {policy.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-base font-semibold text-ink md:text-lg">{s.h}</h2>
            {s.paras?.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-dim">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2.5">
                {s.list.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-dim">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-glow/70" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <nav aria-label="More policies" className="mt-12 border-t border-white/[0.06] pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">related policies</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LEGAL_ROUTES.filter((r) => r !== page).map((r) => (
            <a
              key={r}
              href={`/${r}`}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-[13px] text-dim transition-colors hover:border-glow/30 hover:text-ink"
            >
              {LEGAL_CONTENT[r].title}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
