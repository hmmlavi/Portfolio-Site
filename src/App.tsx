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

export default function App() {
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
      <Navbar />
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
      <Footer />
    </div>
  );
}
