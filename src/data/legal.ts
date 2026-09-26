/**
 * Legal content for the LAVI portfolio.
 *
 * Every statement below was written against a technical audit of this site
 * (September 2026): no analytics, no cookies, no localStorage/sessionStorage,
 * no iframes, no forms, no backend/database, no raster images, and exactly one
 * third-party request (Google Fonts, which is cookieless).
 *
 * If any of that changes — a contact form, analytics, ads, payments — these
 * documents MUST be updated.
 */

export type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type LegalDoc = {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = "25 September 2026";

const IDENTITY = {
  name: "Lakshit Singh Saini",
  mark: "LAVI",
  role: "Computer Science Engineer · AI Software Engineer",
  country: "India",
  email: "lakshitsinghsaini@gmail.com",
};

export const LEGAL_DOCS: LegalDoc[] = [
  /* ------------------------------------------------------------------ PRIVACY */
  {
    id: "privacy",
    slug: "privacy",
    eyebrow: "legal",
    title: "Privacy Policy",
    updated: UPDATED,
    intro:
      "This is a personal portfolio website. It was built to collect as little as possible — in practice, it collects nothing on its own. This page explains exactly what that means and what happens in the one situation where you might share information with me.",
    sections: [
      {
        heading: "1. Who I am",
        body: [
          `This website is operated by me, ${IDENTITY.name} (also known by my personal mark, ${IDENTITY.mark}), an individual based in ${IDENTITY.country}.`,
          "It is a personal portfolio, not a registered company, firm or commercial service. There is no business entity behind it — just me showing my work.",
          `If you need to reach me about anything on this page, email ${IDENTITY.email}.`,
        ],
      },
      {
        heading: "2. The short version",
        body: ["This website does not run any of the following:"],
        list: [
          "Accounts or sign-ups",
          "Contact forms",
          "Cookies",
          "Analytics or usage tracking",
          "Advertising or ad networks",
          "Tracking pixels or fingerprinting",
          "Mailing lists or newsletters",
          "Any sale or sharing of data",
        ],
      },
      {
        heading: "3. What this website does not collect",
        body: [
          "The site has no backend, no database and no form — so there is nowhere for your data to go. It does not collect names, email addresses, phone numbers, locations, purchase history or behavioural data, and it does not build a profile of you.",
          "Nothing is stored on your device while you browse.",
        ] as string[],
      },
      {
        heading: "4. If you choose to email me",
        body: [
          "The only way I can receive your personal data is if you decide to email me. That choice is entirely yours — the site never sends anything on your behalf.",
          "When you do, I receive whatever you include in that message (typically your name, your email address and your message), delivered through my email provider. I use it only to read your message and reply to you.",
          "I do not sell, rent or share it with anyone for marketing. I do not add you to a mailing list. If you later ask me to delete our email thread, I will.",
        ],
      },
      {
        heading: "5. Third-party services involved",
        body: [
          "Fonts — the typefaces on this site are loaded from Google Fonts so the design renders consistently. These requests do not set cookies and are not used to identify you.",
          "Hosting — the site is served by a static hosting provider. Providers of this kind keep standard technical server logs (see the next section) for security and abuse prevention.",
          "Email — if you contact me, your message passes through my email provider and is handled under that provider's own privacy policy.",
        ],
      },
      {
        heading: "6. Server logs",
        body: [
          "Like almost every website on the internet, the hosting provider may automatically record technical details — such as your IP address, browser type and the time of the request — to keep the service secure and prevent abuse.",
          "These logs are not used to identify or profile you, and I do not have access to them.",
        ],
      },
      {
        heading: "7. How information is protected",
        body: [
          "There is no login, no database and no stored data to breach. The site is a set of static files. Please access it over HTTPS, which the hosting provider enables by default.",
        ],
      },
      {
        heading: "8. Your rights (India)",
        body: [
          "Under India's Digital Personal Data Protection Act, 2023 (the DPDP Act), you have rights over your personal data — including the right to access it, have it corrected or erased, withdraw consent, nominate someone to exercise your rights on your behalf, and raise a grievance.",
          "Because this website does not collect personal data, there is normally nothing to exercise those rights over. If you have emailed me and want your messages corrected or deleted, write to me and I will take care of it, normally within 30 days.",
        ],
      },
      {
        heading: "9. Children",
        body: [
          "This is a professional portfolio and is not directed at children under 18. I do not knowingly collect any data from children.",
        ],
      },
      {
        heading: "10. Transfers outside India",
        body: [
          "Font files are served by Google, and the site may be hosted on servers outside India. Your browser sends them ordinary technical requests. This site does not transfer any personal data about you abroad.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        body: [
          "If I ever add something that changes how data is handled — for example a contact form, newsletter or analytics — I will update this page and the date at the top before it goes live.",
        ],
      },
      {
        heading: "12. Contact",
        body: [
          `Questions about privacy: ${IDENTITY.email}`,
          "This page is plain-language information about how this website works. It is not legal advice.",
        ],
      },
    ],
  },

  /* -------------------------------------------------------------------- TERMS */
  {
    id: "terms",
    slug: "terms",
    eyebrow: "legal",
    title: "Terms & Conditions",
    updated: UPDATED,
    intro:
      "These terms apply to your use of this website. They are deliberately short, because the site is a personal portfolio and nothing is bought, sold or subscribed to here.",
    sections: [
      {
        heading: "1. Using this site",
        body: [
          "By browsing this website you accept these terms. If you do not agree with them, please stop using the site.",
        ],
      },
      {
        heading: "2. What this website is",
        body: [
          "This is a personal portfolio belonging to Lakshit Singh Saini. Its only purpose is to show my projects, skills and contact details.",
          "The site is informational. It has no accounts, no paid features, no subscriptions and no payment processing. Nothing can be purchased through it.",
        ],
      },
      {
        heading: "3. Ownership of content",
        body: [
          "The text, layout, visuals and source code of this website are © 2026 Lakshit Singh Saini. All rights reserved.",
          "The project names SaBuddy, L.A.V.I. and Veylo refer to my own projects.",
          "You are welcome to view the site and share links to it. Please do not copy it wholesale, republish it, or present it as your own work.",
        ],
      },
      {
        heading: "4. Source code on GitHub",
        body: [
          "Where I link to source code, that code is governed by the licence stated inside the relevant repository. If a repository states no licence, all rights are reserved and you may not reuse that code without my written permission.",
        ],
      },
      {
        heading: "5. Project information",
        body: [
          "Status labels such as \u201cIn Development\u201d or \u201cReady\u201d describe the project at the time of publishing and may change at any time.",
          "Project descriptions are intentionally high-level. They are not specifications, promises or commitments to release anything, add any feature, or maintain availability.",
        ],
      },
      {
        heading: "6. External links",
        body: [
          "This site links to third-party services — including GitHub, LinkedIn, Instagram, X and Google Drive — for my profiles, repositories and résumé.",
          "I do not control those services and do not endorse everything on them. Your use of them is governed by their own terms and privacy policies, not these terms.",
        ],
      },
      {
        heading: "7. No professional advice",
        body: [
          "The content here is general information about me and my work. It is not professional, technical, legal, financial or career advice, and it should not be relied on as such.",
        ],
      },
      {
        heading: "8. Availability and accuracy",
        body: [
          "The site is provided \u201cas is\u201d and \u201cas available\u201d, without warranties of any kind. I try to keep it accurate and online, but I make no promise that it will always be available, uninterrupted or error-free, and I may change or remove content at any time without notice.",
        ],
      },
      {
        heading: "9. Limitation of liability",
        body: [
          "To the maximum extent permitted by law, I am not liable for any loss or damage arising from your use of, or inability to use, this website or anything linked from it.",
        ],
      },
      {
        heading: "10. Trademarks",
        body: [
          "Names such as GitHub, LinkedIn, Instagram, X, Google, Google Fonts, Android, Kotlin, React, Firebase, MongoDB, Figma and Postman belong to their respective owners. They are used only to identify the technologies and services I work with, and their use here implies no affiliation, sponsorship or endorsement.",
        ],
      },
      {
        heading: "11. Changes to these terms",
        body: [
          "I may update these terms from time to time. The date at the top shows when they were last revised, and continuing to use the site after a change means you accept the updated terms.",
        ],
      },
      {
        heading: "12. Governing law",
        body: [
          "These terms are governed by the laws of India. Any dispute connected with this website is subject to the exclusive jurisdiction of the courts of competent jurisdiction in India.",
        ],
      },
      {
        heading: "13. Contact",
        body: [`Questions about these terms: ${IDENTITY.email}`],
      },
    ],
  },

  /* ------------------------------------------------------------------ COOKIES */
  {
    id: "cookies",
    slug: "cookies",
    eyebrow: "legal",
    title: "Cookie Policy",
    updated: UPDATED,
    intro:
      "The short answer: this website does not use cookies. There is no consent banner because there is nothing to consent to. The detail is below.",
    sections: [
      {
        heading: "1. What cookies are",
        body: [
          "Cookies are small files a website stores in your browser, usually to remember a login, a preference or a visit. Sites that run analytics, advertising or logins typically set them.",
        ],
      },
      {
        heading: "2. What this website sets",
        body: ["Nothing. Specifically, this site does not use:"],
        list: [
          "Cookies (first-party or third-party)",
          "localStorage or sessionStorage",
          "Tracking pixels",
          "Analytics or measurement tools",
          "Advertising or ad networks",
          "Session or device fingerprinting",
        ],
      },
      {
        heading: "3. Why there is no consent banner",
        body: [
          "India's Digital Personal Data Protection Act, 2023 requires notice and consent where personal data is collected. This website collects no personal data and sets no cookies or trackers, so there is nothing that requires your consent — and a banner asking for it would be misleading.",
        ],
      },
      {
        heading: "4. What about Google Fonts?",
        body: [
          "The typefaces are loaded from Google Fonts. Those requests fetch font files only: they do not set cookies and are not used to identify you.",
        ],
      },
      {
        heading: "5. Controlling cookies in general",
        body: [
          "Every major browser lets you block or delete cookies in its settings, and most offer a private or incognito mode. Since this site sets none, changing those settings will not affect how it looks or works.",
        ],
      },
      {
        heading: "6. If this ever changes",
        body: [
          "If I add anything that stores information on your device — for example saved preferences or analytics — I will update this page, show the date of the change, and ask for consent where the law requires it.",
        ],
      },
      {
        heading: "7. Contact",
        body: [`Questions about cookies: ${IDENTITY.email}`],
      },
    ],
  },

  /* ------------------------------------------------------------------ REFUNDS */
  {
    id: "refunds",
    slug: "refunds",
    eyebrow: "legal",
    title: "Refund Policy",
    updated: UPDATED,
    intro:
      "This page exists for clarity rather than necessity: this website does not sell anything, so there is nothing to refund.",
    sections: [
      {
        heading: "1. Nothing is sold here",
        body: [
          "This is a personal portfolio. It offers no products, services, subscriptions, downloads for sale, donations or paid memberships, and it is not connected to any payment processor or gateway.",
          "No transaction of any kind can take place through this website.",
        ],
      },
      {
        heading: "2. Refunds",
        body: [
          "Because no payments are accepted, no refunds apply. There are no fees, charges or recurring payments that could be returned.",
        ],
      },
      {
        heading: "3. If that changes",
        body: [
          "If I ever offer paid work, products or services, they will be governed by a separate written agreement or updated terms, which will describe pricing, cancellation and refunds — including any statutory rights you may have as a consumer in India. This page will be updated at the same time.",
        ],
      },
      {
        heading: "4. Contact",
        body: [`Questions about billing or refunds: ${IDENTITY.email}`],
      },
    ],
  },
];
