import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { initLenis, scrollToTopImmediate } from './lib/scroll';
import { ROUTES, applySeo, type RouteId } from './lib/seo';
import Background from './components/Background';
import CursorFX from './components/CursorFX';
import PingBadge from './components/PingBadge';
import GlassHalo from './components/GlassHalo';
import CommandPalette from './components/CommandPalette';
import Boot from './components/Boot';
import Nav from './components/Nav';
import SideRail from './components/SideRail';
import Hero from './components/Hero';
import SignalStrip from './components/SignalStrip';
import About from './components/About';
import Domains from './components/Domains';
import Work from './components/Work';
import GitHubSection from './components/GitHubSection';
import Journey from './components/Journey';
import Stack from './components/Stack';
import Terminal from './components/Terminal';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalPage, { type LegalRoute } from './pages/LegalPage';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';

const LEGAL: LegalRoute[] = ['privacy', 'terms', 'cookies', 'refund'];

function resolve(pathname: string): RouteId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return 'home';
  if (clean === '/explore' || clean.startsWith('/explore/')) return 'explore';
  const slug = clean.slice(1);
  if ((LEGAL as string[]).includes(slug)) return slug as RouteId;
  return 'notfound';
}

export default function App() {
  const [booted, setBooted] = React.useState(false);
  const [routeId, setRouteId] = React.useState<RouteId>(() => resolve(window.location.pathname));
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    initLenis();
  }, []);

  /* Anti-copy: block selection via CSS; if anything still fires a copy event,
     swap the clipboard payload for decoy glyphs. Pure deterrent, not DRM. */
  React.useEffect(() => {
    const GLYPHS = '░▒▓█◇◆◎◉';
    const onCopy = (e: ClipboardEvent) => {
      const selected = window.getSelection()?.toString();
      if (!selected) return;
      e.preventDefault();
      const len = Math.min(44, Math.max(10, selected.length));
      const junk = Array.from(
        { length: len },
        () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      ).join('');
      e.clipboardData?.setData('text/plain', `${junk}\n`);
    };
    document.addEventListener('copy', onCopy, true);
    return () => document.removeEventListener('copy', onCopy, true);
  }, []);

  /* keep <head> in sync with the active route */
  React.useEffect(() => {
    applySeo(ROUTES[routeId]);
  }, [routeId]);

  /* intercept same-origin link clicks → client-side navigation */
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || link.hasAttribute('download')) return;

      // absolute external links open through the safety handler
      if (href.startsWith('http')) return;
      // explicit opt-out for native anchor behaviour elsewhere
      if (!href.startsWith('/') || href.startsWith('//')) return;

      // let the browser handle real files (sitemap.xml, robots.txt, favicon…)
      if (/\.[a-z0-9]+$/i.test(href.split('#')[0])) return;

      const [path, hash] = href.split('#');
      if (path.startsWith('/explore')) {
        e.preventDefault();
        setRouteId('explore');
        // Explorer reads its own search string on popstate; keep native URL movement.
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
      e.preventDefault();
      window.history.pushState({}, '', href);
      setRouteId(resolve(path || '/'));
      if (hash) {
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        });
      } else {
        scrollToTopImmediate();
      }
    };

    const onPop = () => {
      setRouteId(resolve(window.location.pathname));
      scrollToTopImmediate();
    };

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  const skipToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('main-content');
    el?.focus();
    el?.scrollIntoView();
  };

  /* Ctrl/Cmd+K opens the command palette. */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isHome = routeId === 'home';

  return (
    <div className="relative min-h-screen bg-base font-display text-ink">
      <Background />
      <CursorFX />
      <GlassHalo />
      <a href="#main-content" className="skip-link" onClick={skipToMain}>
        Skip to content
      </a>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AnimatePresence>{!booted && <Boot key="boot" onDone={() => setBooted(true)} />}</AnimatePresence>

      {routeId === 'explore' ? (
        <>
          <Nav onOpenPalette={() => setPaletteOpen(true)} />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Explore />
          </main>
          <Footer />
        </>
      ) : isHome ? (
        <>
          <PingBadge />
          <Nav onOpenPalette={() => setPaletteOpen(true)} />
          <SideRail />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero started={booted} />
            <SignalStrip />
            <About />
            <Domains />
            <Work />
            <GitHubSection />
            <Journey />
            <Stack />
            <Terminal />
            <Faq />
            <Contact />
          </main>
          <Footer />
        </>
      ) : routeId === 'notfound' ? (
        <>
          <main id="main-content" tabIndex={-1} className="outline-none">
            <NotFound />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main id="main-content" tabIndex={-1} className="outline-none">
            <LegalPage page={routeId as LegalRoute} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
