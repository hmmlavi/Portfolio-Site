```ts
export const SITE_NAME = 'Lakshit Singh Saini';
export const SITE_URL = 'https://lakshitss.vercel.app';

export type RouteId =
  | 'home'
  | 'explore'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'refund'
  | 'notfound';

export interface RouteMeta {
  id: RouteId;
  path: string;
  title: string;
  description: string;
  /** false = keep out of sitemap and discourage indexing */
  indexable: boolean;
}

export const ROUTES: Record<RouteId, RouteMeta> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Lakshit - Portfolio',
    description:
      'Lakshit Singh Saini is a computer science student and web developer in India building React apps with AI features. See his projects, live GitHub activity, and how to get in touch.',
    indexable: true,
  },

  explore: {
    id: 'explore',
    path: '/explore',
    title: `Project Explorer | ${SITE_NAME}`,
    description:
      'A deeper look at Lakshit’s work. Filter projects by technology, platform and status, explore how technologies connect across builds, and inspect what each project is made of.',
    indexable: true,
  },

  privacy: {
    id: 'privacy',
    path: '/privacy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How this portfolio handles personal data: no analytics, no tracking, and no cookies. Explains the few third-party requests the site makes and your rights under India’s DPDP Act.',
    indexable: true,
  },

  terms: {
    id: 'terms',
    path: '/terms',
    title: `Terms & Conditions | ${SITE_NAME}`,
    description:
      'The ground rules for using this portfolio site, covering intellectual property, open-source credits, external links, acceptable use, and limits of liability.',
    indexable: true,
  },

  cookies: {
    id: 'cookies',
    path: '/cookies',
    title: `Cookie Policy | ${SITE_NAME}`,
    description:
      'This site sets zero tracking cookies. Explains why no consent banner is shown and what the single theme-preference setting stored in your browser actually does.',
    indexable: true,
  },

  refund: {
    id: 'refund',
    path: '/refund',
    title: `Refund Policy | ${SITE_NAME}`,
    description:
      'Nothing is sold through this website, so there is nothing to refund. Explains how payment terms would work for a separate paid engagement.',
    indexable: true,
  },

  notfound: {
    id: 'notfound',
    path: '/404',
    title: `Page Not Found | ${SITE_NAME}`,
    description:
      'That page does not exist. Use the links here to get back to the homepage, the project work, or the contact details.',
    indexable: false,
  },
};

/** Pages that belong in sitemap.xml — public, real, indexable. */
export const SITEMAP_ROUTES: RouteMeta[] = Object.values(ROUTES).filter(
  (route) => route.indexable,
);

function setMeta(
  selector: string,
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/** Apply a route's title, description, canonical and social tags. */
export function applySeo(meta: RouteMeta) {
  document.title = meta.title;

  setMeta(
    'meta[name="description"]',
    'name',
    'description',
    meta.description,
  );

  setMeta(
    'meta[property="og:title"]',
    'property',
    'og:title',
    meta.title,
  );

  setMeta(
    'meta[property="og:description"]',
    'property',
    'og:description',
    meta.description,
  );

  setMeta(
    'meta[property="og:url"]',
    'property',
    'og:url',
    `${SITE_URL}${meta.path}`,
  );

  setMeta(
    'meta[name="twitter:title"]',
    'name',
    'twitter:title',
    meta.title,
  );

  setMeta(
    'meta[name="twitter:description"]',
    'name',
    'twitter:description',
    meta.description,
  );

  setLink(
    'canonical',
    `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`,
  );

  setMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    meta.indexable ? 'index, follow' : 'noindex, follow',
  );
}
```
