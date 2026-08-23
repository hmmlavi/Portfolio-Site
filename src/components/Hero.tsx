import { useEffect, useMemo, useRef } from "react";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { HERO_STATS, ORBIT_BADGES } from "@/data/content";
import { Magnetic } from "@/components/anim";
import { prefersReducedMotion } from "@/hooks/useInView";

const ease = "cubic-bezier(0.16,1,0.3,1)";

export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onMove = (e: MouseEvent) => {
      const el = spotlightRef.current;
      if (el) {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        bottom: "-8px",
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        background:
          i % 3 === 0
            ? "rgba(124,58,237,0.7)"
            : i % 3 === 1
              ? "rgba(96,165,250,0.5)"
              : "rgba(255,255,255,0.3)",
        animationDuration: `${5 + Math.random() * 7}s`,
        animationDelay: `${Math.random() * 7}s`,
      })),
    []
  );

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black flex items-center">
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={p} />
        ))}
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — identity */}
          <div>
            <div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-7 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "60ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                Computer Science Engineer
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] mb-6">
              <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: "140ms" }}>
                Lakshit Singh Saini,
              </span>
              <span className="block shimmer-text opacity-0 animate-fade-in-up" style={{ animationDelay: "220ms" }}>
                AI Software Engineer
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-white/55 leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              Hi, I'm Lakshit — a B.Tech CSE student who learns best by{" "}
              <strong className="text-white/80 font-medium">building and experimenting</strong>. I build AI-powered
              software, Android apps and web experiences, always picking up new technologies along the way. The goal:
              software that's genuinely useful — and a little <span className="text-white/80">extraordinary</span>.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => go(e, "projects")}
                  className="px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-100 transition-colors flex items-center gap-2"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => go(e, "contact")}
                  className="px-7 py-3.5 rounded-full border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  Open to Opportunities
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </a>
              </Magnetic>
            </div>

            <div
              className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-8 border-t border-white/8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "620ms" }}
            >
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                  <div className="text-xs text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — orbit constellation */}
          <div className="relative hidden lg:flex items-center justify-center opacity-0 animate-scale-up" style={{ animationDelay: "280ms" }}>
            <div className="relative w-80 h-80">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-transparent blur-2xl"
                aria-hidden="true"
              />
              {/* orbit rings */}
              <div className="absolute -inset-9 rounded-full border border-white/5" aria-hidden="true" />
              <div className="absolute -inset-24 rounded-full border border-white/[0.04]" aria-hidden="true" />
              <div className="absolute -inset-9 rounded-full animate-spin-slower" aria-hidden="true">
                <span className="absolute -top-[2.5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-violet-400/80 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
              </div>

              {/* center monogram */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer">
                <div className="monogram relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white/12 to-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500">
                  <span className="font-anton text-4xl text-white leading-none pt-1 select-none group-hover:scale-110 transition-transform duration-500">
                    L
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-white font-medium tracking-[0.28em] text-sm uppercase group-hover:text-violet-300 transition-colors duration-300">
                    LAVI
                  </span>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase font-medium">
                    AI · Android · Web
                  </span>
                </div>
              </div>

              {/* orbiting tech badges */}
              {ORBIT_BADGES.map((b, i) => {
                const angle = (i / ORBIT_BADGES.length) * Math.PI * 2 - Math.PI / 2;
                const r = 168;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={b.label}
                    className="absolute glass rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap hover:scale-110 transition-transform"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                      color: b.color,
                      border: `1px solid ${b.color}30`,
                      animation: `fade-in 0.8s ${ease} forwards, badge-float ${3 + i * 0.35}s ease-in-out infinite`,
                      animationDelay: `${450 + i * 90}ms, ${i * 0.25}s`,
                    }}
                  >
                    {b.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "900ms" }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 text-white/25">
          <Sparkles className="w-3 h-3" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase">scroll</span>
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent overflow-hidden">
          <div className="w-full h-3 bg-violet-400/80 animate-scroll-hint" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
    </section>
  );
}
