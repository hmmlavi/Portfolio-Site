import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LINKS, NAV_ITEMS } from "@/data/content";
import { cn } from "@/utils/cn";
import Magnetic from "@/components/MobileSafeMagnetic";

export default function Navbar({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let ticking = false;
    // state only flips when crossing the threshold — no re-render per scroll event
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled((prev) => {
          const next = window.scrollY > 40;
          return prev === next ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    setActive(id);
    // leaving a legal page: swap back to the portfolio first, then scroll
    if (window.location.hash.startsWith("#/")) {
      onNavigateHome?.();
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  // Escape closes the mobile menu (keyboard friendly)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 transition-all duration-500 border-b opacity-0 animate-fade-in-down",
          scrolled
            ? "py-3 bg-black/85 backdrop-blur-md border-white/10 shadow-xl shadow-black/50"
            : "py-5 bg-transparent border-transparent"
        )}
        aria-label="Primary"
      >
        {/* Brand */}
        <a href="#home" onClick={(e) => go(e, "home")} className="flex items-center gap-3 group" aria-label="LAVI — home">
          <div className="monogram relative w-9 h-9 rounded-xl bg-gradient-to-b from-white/12 to-white/5 border border-white/10 flex items-center justify-center group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300">
            <span className="font-anton text-xl text-white leading-none pt-0.5 select-none group-hover:scale-110 transition-transform duration-300">
              L
            </span>
          </div>
          <span className="text-white font-medium tracking-[0.28em] text-xs uppercase group-hover:text-violet-300 transition-colors duration-300">
            LAVI
          </span>
        </a>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm transition-colors duration-200",
                active === item.id ? "text-white" : "text-white/50 hover:text-white/85"
              )}
            >
              {active === item.id && (
                <span className="absolute inset-0 bg-white/10 rounded-full transition-all duration-300" aria-hidden="true" />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden md:flex glass rounded-full p-2.5 text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden md:flex glass rounded-full p-2.5 text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <Magnetic>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-white text-black text-sm font-medium rounded-full px-5 py-2.5 hover:bg-neutral-100 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse-dot" aria-hidden="true" />
              Resume
            </a>
          </Magnetic>

          {/* Mobile toggle */}
          <button
            className="md:hidden glass rounded-full p-2.5 text-white/70 hover:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
              <span className={cn("block h-px bg-current transition-all duration-300", open && "rotate-45 translate-y-[3.5px]")} />
              <span className={cn("block h-px bg-current transition-all duration-300", open && "opacity-0")} />
              <span className={cn("block h-px bg-current transition-all duration-300", open && "-rotate-45 -translate-y-[3.5px]")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-[68px] left-4 right-4 z-40 glass-dark rounded-2xl p-4 flex flex-col gap-1 md:hidden transition-all duration-300 origin-top",
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.98] -translate-y-2 pointer-events-none"
        )}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => go(e, item.id)}
            className={cn(
              "px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between",
              active === item.id ? "text-white bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            {item.label}
            {active === item.id && <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />}
          </a>
        ))}
        <div className="mt-2 pt-3 border-t border-white/8 grid grid-cols-2 gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl text-sm text-center text-white/80 glass hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl text-sm text-center text-white/80 glass hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 px-4 py-3 rounded-xl text-sm text-center bg-white text-black font-medium flex items-center justify-center gap-1.5"
          >
            Resume <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
