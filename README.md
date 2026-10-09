<div align="center">

# Lakshit Singh Saini

**Personal portfolio. Built from scratch, shipped in public.**

A calm, dark-first portfolio with live GitHub data, a working terminal,
and a drawing pad nobody asked for.

[Live site](https://lakshitss.vercel.app) &nbsp;·&nbsp;
[GitHub](https://github.com/hmmlavi) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/lakshitsinghsaini/) &nbsp;·&nbsp;
[Email](mailto:lakshitsinghsaini@gmail.com)

![React](https://img.shields.io/badge/React_19-111?style=flat-square&logo=react&logoColor=8b9dff)
![TypeScript](https://img.shields.io/badge/TypeScript-111?style=flat-square&logo=typescript&logoColor=8b9dff)
![Vite](https://img.shields.io/badge/Vite_7-111?style=flat-square&logo=vite&logoColor=8b9dff)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-111?style=flat-square&logo=tailwindcss&logoColor=8b9dff)
![Vercel](https://img.shields.io/badge/Vercel-111?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Contents

1. [About](#about)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Project structure](#project-structure)
5. [Getting started](#getting-started)
6. [Design system](#design-system)
7. [Live data](#live-data)
8. [Routing and SEO](#routing-and-seo)
9. [Accessibility](#accessibility)
10. [Performance notes](#performance-notes)
11. [Privacy](#privacy)
12. [Deployment](#deployment)
13. [Credits](#credits)

---

## About

This is the second version of my portfolio. The first one was loud. This one is quieter,
faster, and does more.

The idea was simple: build something that feels like it was made by a developer rather than
assembled from a template. That meant real live data instead of hardcoded numbers, an
interactive shell instead of a static skills list, and a type system tight enough that
nothing moves when it should not.

Everything here is hand written. No page builder, no UI kit, no component library.

---

## Features

| Feature | What it does |
| :--- | :--- |
| **Project Explorer** | A deeper `/explore` experience with technology / category / platform filtering, an SVG relationship map, timeline view, Developer and Recruiter modes, full keyboard control, and shareable deep-linked URLs. |
| **Live GitHub panel** | Profile, repositories, stars and languages pulled from the GitHub REST API on page load, with a cached fallback if the rate limit is hit. |
| **Contribution heatmap** | A full year of real commit activity. Hover any day for the exact count, or tab in and navigate with arrow keys. |
| **Interactive terminal** | Around 25 working commands with history, click-to-run help, and a few jokes. Try `neofetch`. |
| **Drawing pad** | A pressure-sensitive canvas in the hero. Works with a mouse, stylus or finger. Five ink colours. |
| **Dark and light themes** | Full token-driven theming, applied before first paint so there is no flash. Preference is remembered. |
| **Custom cursor** | A blend-mode dot with a soft aura trail, running on a single rAF loop with delta-time correction. Hidden on touch devices. |
| **Ambient background** | Drifting aurora orbs in screen blend mode that parallax gently against the pointer. |
| **Signal strip** | A slow monospace marquee of the stack, pure CSS, pauses on hover. |
| **Custom 404** | A real page with real links, served with a genuine HTTP 404 status. |
| **Legal pages** | Privacy, terms, cookies and refund policies written for an individual operator under India's DPDP Act. |

---

## Tech stack

**Core**
- React 19 with TypeScript in strict mode
- Vite 7 for the build, output inlined to a single file
- Tailwind CSS v4, configured entirely through CSS tokens

**Libraries**
- `framer-motion` for scroll reveals and layout transitions
- `lenis` for smooth scrolling
- `lucide-react` for icons, with hand-drawn SVGs for brand marks

**Data sources**
- GitHub REST API for profile and repository data
- `github-contributions-api.jogruber.de` for the daily contribution grid

No analytics. No tracking. No cookies.

---

## Project structure

```
.
├── public/
│   ├── 404.html              Standalone 404, self-contained styles
│   ├── favicon.svg           Gradient monogram
│   ├── robots.txt            Allows everything, points to the sitemap
│   └── sitemap.xml           Generated from the route table
├── scripts/
│   └── generate-seo.mjs      Rebuilds sitemap.xml from src/lib/seo.ts
├── src/
│   ├── components/
│   │   ├── Background.tsx    Aurora orbs with pointer parallax
│   │   ├── Boot.tsx          Brief loading state
│   │   ├── ContribGraph.tsx  Contribution heatmap with tooltips
│   │   ├── Contact.tsx       Form plus social links
│   │   ├── CursorFX.tsx      Custom cursor, dot plus aura
│   │   ├── DoodlePad.tsx     Canvas drawing pad
│   │   ├── Domains.tsx       Six areas of work
│   │   ├── Faq.tsx           Accordion
│   │   ├── Footer.tsx        Policy links and site info
│   │   ├── GitHubSection.tsx Live profile and repository data
│   │   ├── Hero.tsx          Landing, now panel, quick stats
│   │   ├── Journey.tsx       Timeline from 2022 onward
│   │   ├── Nav.tsx           Floating pill nav with theme toggle
│   │   ├── PingBadge.tsx     Corner telemetry readout
│   │   ├── SideRail.tsx      Section dots for wide screens
│   │   ├── SignalStrip.tsx   Scrolling stack marquee
│   │   ├── Stack.tsx         Tools, grouped
│   │   ├── Terminal.tsx      The interactive shell
│   │   ├── ThemeToggle.tsx   Dark and light switch
│   │   ├── Work.tsx          Project cards
│   │   ├── icons.tsx         Brand SVGs
│   │   └── ui.tsx            SectionHead, Chip, shared primitives
│   ├── hooks/
│   │   └── useScramble.ts    Text decrypt effect
│   ├── lib/
│   │   ├── anim.ts           Shared easing and variants
│   │   ├── contributions.ts  Contribution data store
│   │   ├── github.ts         GitHub API store with fallbacks
│   │   ├── open.ts           Safe external link opener
│   │   ├── scroll.ts         Lenis setup and helpers
│   │   ├── seo.ts            Route table, titles, descriptions
│   │   └── utils.ts          Clock and relative time
│   ├── pages/
│   │   ├── LegalPage.tsx     All four policies
│   │   └── NotFound.tsx      In-app 404 view
│   ├── App.tsx               Routing and composition
│   ├── index.css             Theme tokens, type, animations
│   └── main.tsx              Entry point
├── index.html                Shell, meta tags, structured data
└── vercel.json               Rewrites, headers, clean URLs
```

---

## Getting started

**Requirements:** Node 18 or newer.

```bash
# install
npm install

# start the dev server
npm run dev

# production build
npm run build

# preview the build locally
npm run preview

# regenerate sitemap.xml after changing routes
node scripts/generate-seo.mjs
```

The dev server runs at `http://localhost:5173`.

---

## Design system

Everything is driven by CSS custom properties, so switching themes updates the entire site
from one attribute on `<html>`.

**Typography**

| Role | Family | Notes |
| :--- | :--- | :--- |
| Display and body | Inter Tight | Tight tracking, variable weight, optical sizing on |
| Code and labels | JetBrains Mono | Slashed zero, used for all metadata |

**Colour**

The base is close to monochrome. One periwinkle accent carries the identity, and each
section gets a single supporting tone so the page reads as organised rather than colourful.

| Token | Dark | Light | Used for |
| :--- | :--- | :--- | :--- |
| `base` | `#08090c` | `#f4f5f7` | Page background |
| `ink` | `#ededf0` | `#13151a` | Primary text |
| `dim` | `#9c9fa9` | `#4e525c` | Body copy |
| `faint` | `#6f737e` | `#6b6f79` | Labels and metadata |
| `glow` | `#8b9dff` | `#4553c9` | Primary accent |
| `mist` | `#76ddc6` | `#0d8872` | About, GitHub |
| `sky` | `#7cc4f5` | `#13679f` | Web, Work |
| `lilac` | `#b9a6f7` | `#6648c4` | AI, Journey |
| `peach` | `#f5b97c` | `#9c5f16` | Domains, FAQ |
| `leaf` | `#86d99b` | `#237a44` | Shell, availability |
| `rose` | `#f5a3bd` | `#bb3660` | Contact |

Light mode works through one trick: `--c-white` is redefined as a dark ink value, which
flips every `white/[0.0x]` tint, border and divider across the whole site automatically.

---

## Live data

Two small stores handle remote data. Both use a subscriber pattern so a single fetch feeds
every component that needs it.

- **`lib/github.ts`** fetches the profile and repositories once, shares the result, and falls
  back to a hardcoded snapshot if the API rate limit is reached. Language percentages are
  computed from the repository list.
- **`lib/contributions.ts`** fetches the daily contribution grid and exposes the total.

Both expose a `loading` flag so the UI can show skeletons instead of layout shift, and the
GitHub panel has a manual refresh button.

---

## Routing and SEO

Routing is plain `history.pushState` with a click interceptor. No router dependency.

| Path | Title | Indexed |
| :--- | :--- | :--- |
| `/` | Web Developer & AI Builder | Yes |
| `/privacy` | Privacy Policy | Yes |
| `/terms` | Terms & Conditions | Yes |
| `/cookies` | Cookie Policy | Yes |
| `/refund` | Refund Policy | Yes |
| anything else | Page Not Found | No |

Each route sets its own title, description, canonical URL, Open Graph and Twitter tags from
the table in `src/lib/seo.ts`. That same file is the source for `sitemap.xml`.

Unknown paths are deliberately not rewritten in `vercel.json`, so the host falls through to
`public/404.html` and returns a real `404` status rather than a `200`.

Verify after deploying:

```bash
curl -I https://lakshitss.vercel.app/does-not-exist   # expect 404
curl -I https://lakshitss.vercel.app/privacy          # expect 200
```

---

## Accessibility

- Skip link to main content as the first focusable element
- Visible focus rings everywhere, never removed
- The contribution heatmap is a real grid with per-cell labels and arrow key navigation
- Accordions use `aria-expanded` and `aria-controls`
- Form fields have real labels, and status messages use a live region
- Decorative icons and graphics are hidden from screen readers
- Contrast tuned for both themes
- Every animation stops under `prefers-reduced-motion`

---

## Performance notes

A few decisions that mattered more than expected:

- **No `backdrop-filter` on panels.** The cursor glow sits above the content, so there was
  nothing to blur. Removing it eliminated dozens of full-screen repaints per frame.
- **The cursor runs on one rAF loop** with delta-time corrected smoothing, writing only
  `translate3d`. It feels identical at 60 Hz and 240 Hz.
- **The heatmap grid is memoised** and the tooltip is positioned with direct DOM writes, so
  hovering 365 cells never triggers a React render.
- **The drawing pad paints inside the pointer event**, with no state per point.
- **Animations are transform and opacity only**, with `contain: strict` on fixed layers.

---

## Privacy

This site collects nothing.

No analytics, no cookies, no fingerprinting, no accounts, no server. The contact form has no
backend. Submitting it opens your own email client with the message prefilled, and nothing
leaves your device until you press send there.

The only thing stored locally is your theme preference, in `localStorage`, read by nothing
but your own browser.

Third-party requests on page load: the GitHub API, the contributions API, Google Fonts, and
the host's own access logs. All of them are listed in the privacy policy.

---

## Deployment

Built for Vercel, but it is a static bundle and will run anywhere.

```bash
npm run build     # outputs to dist/
```

`vercel.json` handles clean URLs, rewrites for the four policy pages, and content type
headers for `sitemap.xml` and `robots.txt`.

On a different host, replicate two things: rewrite `/privacy`, `/terms`, `/cookies` and
`/refund` to the app, and serve `404.html` with a `404` status for everything else.

---

## Credits

Built with [React](https://react.dev), [Vite](https://vite.dev),
[Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://motion.dev),
[Lenis](https://lenis.darkroom.engineering) and [Lucide](https://lucide.dev).
Typefaces are [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) and
[JetBrains Mono](https://www.jetbrains.com/lp/mono/), both open source.

Design and code by me.

---

<div align="center">

**Lakshit Singh Saini** &nbsp;·&nbsp; India

If you are building something interesting, I would like to hear about it.

[lakshitsinghsaini@gmail.com](mailto:lakshitsinghsaini@gmail.com)

</div>
