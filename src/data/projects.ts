export type ProjectCategory = 'ai' | 'web' | 'android' | 'experiment';
export type ProjectPlatform = 'web' | 'android';
export type ProjectStatus = 'shipped' | 'in progress' | 'live';

/** Detail content / answers. Present only where verified facts exist. */
export interface DetailInfo {
  tagline: string;
  why?: string;
  decisions?: string[];
  learned?: string;
  changelog?: { label: string; text: string }[];
  qa: { q: string; a: string }[];
}

export interface Project {
  id: string;
  name: string;
  /** short line used by cards and relationship info */
  tagline: string;
  description: string;
  status: ProjectStatus;
  platform: ProjectPlatform[];
  category: ProjectCategory;
  technologies: string[];
  github: string | null;
  year: number;
  experiment?: boolean;
  detail?: DetailInfo;
}

/**
 * Sourced only from verified facts already present on the site: the Work
 * cards, the Journey timeline, the README of the real repositories, and the
 * site's own live contribution stats. Nothing here is invented.
 */
export const PROJECTS: Project[] = [
  {
    id: 'sabuddy',
    name: 'SaBuddy',
    tagline: 'AI writing help for social posts.',
    description: 'Android app for planning and drafting social content. The AI handles the tedious writing part while you keep the voice.',
    status: 'shipped',
    platform: ['android'],
    category: 'ai',
    technologies: ['Kotlin', 'Android', 'Gemini API'],
    github: 'https://github.com/hmmlavi/SaBuddy',
    year: 2024,
    detail: {
      tagline: 'AI writing help for social posts.',
      why: 'Writing the same kind of post every week got tedious. SaBuddy began as an annoyance I wanted to automate without losing my tone.',
      learned: 'The first prototype was rough and crash-prone, which turned out to be the best teacher. It grew into a shipped app by 2025.',
      qa: [
        {
          q: 'Why did I build this?',
          a: 'Because rewriting the same announcements over and over felt dumb. I wanted the AI to do the boring drafting so the voice could stay mine.',
        },
        {
          q: 'What was difficult?',
          a: 'Getting AI to sound like a person instead of a brand. That took more prompt iterations than code iterations.',
        },
        {
          q: 'What did I learn?',
          a: 'That shipping is the easiest part. The hard part is making it feel calm enough that someone would actually open it again.',
        },
        {
          q: 'What would I improve?',
          a: 'Better stale-context handling and a smoother scheduling flow for the next version.',
        },
      ],
    },
  },
  {
    id: 'veylo',
    name: 'Veylo',
    tagline: 'A habit planner that learns.',
    description: 'A habit planner that notices your patterns and nudges you back when you slip. Gentle rather than naggy.',
    status: 'shipped',
    platform: ['web'],
    category: 'ai',
    technologies: ['TypeScript', 'React', 'JavaScript'],
    github: 'https://github.com/hmmlavi/Veylo',
    year: 2026,
    detail: {
      tagline: 'A habit planner that learns.',
      why: 'Veylo began as a question: why do habit trackers all feel like scolding? I wanted one that noticed patterns instead.',
      decisions: [
        'Keep the AI subtle. It nudges, it never lectures.',
        'React and TypeScript so the state could stay predictable as it grew.',
      ],
      learned: 'Small UI decisions matter more than I expected. The nudge tone changed the whole feel of the product.',
      changelog: [
        { label: 'shipped', text: 'Public release, 2025' },
        { label: 'queued', text: 'A web version is in the lab' },
      ],
      qa: [
        {
          q: 'Why did I choose this stack?',
          a: 'TypeScript and React were the fastest route to a predictable UI state for a product that depends on daily check-ins.',
        },
        {
          q: 'What did I learn?',
          a: 'That habit UX is mostly tone. A tracker that feels like a teacher gets abandoned in a week.',
        },
        {
          q: 'What would I improve?',
          a: 'More context in the nudges, and a web version so the streak follows the person, not the device.',
        },
      ],
    },
  },
  {
    id: 'facilityfix',
    name: 'FacilityFix',
    tagline: 'Campus issue reporting, made visible.',
    description: 'Campus issue tracker. Students report broken things and actually watch them get fixed.',
    status: 'shipped',
    platform: ['web'],
    category: 'web',
    technologies: ['TypeScript', 'React', 'FastAPI'],
    github: 'https://github.com/hmmlavi/FacilityFix',
    year: 2025,
    detail: {
      tagline: 'Campus issue reporting, made visible.',
      why: 'Campus issues lived in a message thread nobody read. FacilityFix gave them a status and a queue people could see.',
      learned: 'The hardest part was not the code. It was designing a status flow both students and staff would trust.',
      changelog: [{ label: 'shipped', text: 'Front-end public, 2025' }],
      qa: [
        {
          q: 'Why did I build this?',
          a: 'To stop repair requests from disappearing into a chat no one reads. If a problem has a status, someone has an owner.',
        },
        {
          q: 'What was difficult?',
          a: 'Defining a status flow simple enough that students and staff both trusted it at first glance.',
        },
        {
          q: 'What did I learn?',
          a: 'That front-end work is only half the product. The trust model under it decides whether anyone uses it.',
        },
      ],
    },
  },
  {
    id: 'lavi',
    name: 'L.A.V.I.',
    tagline: 'One calm place for study life.',
    description: 'A study assistant for students. One calm place for assignments, reminders, and everything that used to live across six apps.',
    status: 'in progress',
    platform: ['web', 'android'],
    category: 'ai',
    technologies: ['Kotlin', 'Android', 'Firebase', 'Gemini API'],
    github: null,
    year: 2026,
    detail: {
      tagline: 'One calm place for study life.',
      why: 'I was juggling assignments, deadlines, and reminders across half a dozen apps. L.A.V.I. is the single calm place trying to replace them.',
      decisions: [
        'Firebase for accounts and sync so the phone and web sides stay in step.',
        'Private preview while the core flows stabilise.',
      ],
      changelog: [{ label: 'wip', text: 'Private preview in active development' }],
      qa: [
        {
          q: 'Is L.A.V.I. real or still an idea?',
          a: 'Real, in active development. The preview is private while the core flows settle.',
        },
        {
          q: 'What did I personally work on?',
          a: 'The product idea, the AI integration, the data model, and both the Android and web front-ends.',
        },
        {
          q: 'What would I improve?',
          a: 'A calmer home screen, and faster resolution when the network drops.',
        },
      ],
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio v2',
    tagline: 'Rebuilt from scratch with quiet intent.',
    description: 'The site you are reading. Same person, calmer paint. Live GitHub data pulls straight into the page.',
    status: 'live',
    platform: ['web'],
    category: 'web',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/hmmlavi/Portfolio-Site',
    year: 2026,
    detail: {
      tagline: 'Rebuilt from scratch with quiet intent.',
      why: 'The first version was loud. I wanted something faster, calmer, and that actually did more under the surface.',
      decisions: [
        'Single-file Vite build with token-driven dark and light themes.',
        'A central token system so every component re-skins from one attribute.',
      ],
      learned: 'Real engineering lives in the parts nobody sees: the contribution tooltip, the memoized grid, the theme applied before first paint.',
      changelog: [{ label: 'v2', text: 'Rebuilt from scratch, early 2026' }],
      qa: [
        {
          q: 'What did I learn?',
          a: 'That restraint is an engineering decision. Fewer effects, better rhythm, and content-visibility made the biggest speed wins.',
        },
        {
          q: 'What would I improve?',
          a: 'Self-hosted fonts and a static OG image for link previews.',
        },
      ],
    },
  },
  {
    id: 'datacom-work',
    name: 'datacom-work',
    tagline: 'Backend experiments for the projects above.',
    description: 'Small Python automation experiments, plus the backend pieces behind the FacilityFix prototype.',
    status: 'shipped',
    platform: ['web'],
    category: 'experiment',
    technologies: ['Python', 'FastAPI'],
    github: 'https://github.com/hmmlavi/datacom-work',
    year: 2025,
    experiment: true,
    detail: {
      tagline: 'Backend experiments for the project above.',
      why: 'To take repetitive data work off my own plate. Small scripts, real time saved.',
      learned: 'FastAPI is genuinely fast to build with, and boring endpoints beat clever ones.',
      qa: [
        {
          q: 'What did I learn?',
          a: 'FastAPI is pleasantly boring for small back-ends, which is exactly what you want.',
        },
      ],
    },
  },
];

export const UI = PROJECTS.filter((p) => !p.experiment);
export const BY_ID = new Map(PROJECTS.map((p) => [p.id, p]));
export const TECHNOLOGIES: string[] = Array.from(new Set(PROJECTS.flatMap((p) => p.technologies))).sort();
export const CATEGORIES: ProjectCategory[] = Array.from(new Set(PROJECTS.map((p) => p.category))).sort();
export const PLATFORMS: ProjectPlatform[] = Array.from(new Set(PROJECTS.flatMap((p) => p.platform))).sort();
export const STATUSES: ProjectStatus[] = Array.from(new Set(PROJECTS.map((p) => p.status))).sort();
