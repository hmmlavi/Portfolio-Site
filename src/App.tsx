import { useEffect, useState } from "react";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Constellation from "@/components/Constellation";
import Projects from "@/components/Projects";
import GitHubSection from "@/components/GitHubSection";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LegalPage from "@/pages/LegalPage";
import { LEGAL_DOCS } from "@/data/legal";

/**
 * Tiny hash router. Legal pages live at #/privacy, #/terms, #/cookies, #/refunds
 * (slash-prefixed), while in-page sections keep plain anchors like #projects.
 * Hash routing means the pages work on any static host — no server rewrites.
 */
const isLegalHash = (hash: string) => hash.startsWith("#/");

export default function App() {
  const [route, setRoute] = useState<string>(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const activeDoc = isLegalHash(route)
    ? LEGAL_DOCS.find((d) => `#/${d.slug}` === route) ?? null
    : null;

  const navigate = (slug: string | null) => {
    window.location.hash = slug ? `/${slug}` : "";
    if (!slug) {
      // returning to the portfolio — land at the top, then the nav can scroll
      setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "auto" }), 60);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-violet-600/50">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Cursor />
      <div className="noise" aria-hidden="true" />
      <Navbar onNavigateHome={() => navigate(null)} />

      {activeDoc ? (
        <LegalPage key={activeDoc.id} doc={activeDoc} onNavigate={navigate} />
      ) : (
        <main>
          <Hero />
          <About />
          <Capabilities />
          <Constellation />
          <div className="defer-paint">
            <Projects />
          </div>
          <div className="defer-paint">
            <GitHubSection />
            <FAQ />
          </div>
          <Contact />
        </main>
      )}
      <Footer onNavigate={navigate} />
    </div>
  );
}
