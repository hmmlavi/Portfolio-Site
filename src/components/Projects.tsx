import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { PROJECTS } from "@/data/content";
import { Reveal } from "@/components/anim";
import { cn } from "@/utils/cn";

/* ---------- abstract product visuals (pure CSS, no stock imagery) ---------- */

function SocialVisual({ accent }: { accent: string }) {
  return (
    <div className="relative w-[190px] h-[370px] rounded-[2.2rem] border border-white/15 bg-black/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] p-2.5 -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-b from-white/[0.06] to-transparent border border-white/8 overflow-hidden relative flex flex-col p-3.5 gap-3">
        {/* status bar */}
        <div className="flex justify-between items-center px-1">
          <span className="w-8 h-1.5 rounded-full bg-white/15" />
          <span className="w-12 h-3.5 rounded-full bg-black border border-white/10" />
        </div>
        {/* profile row */}
        <div className="flex items-center gap-2.5 mt-1">
          <div
            className="w-9 h-9 rounded-full shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent}, transparent)` }}
          />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 rounded-full bg-white/20 w-2/3" />
            <div className="h-1.5 rounded-full bg-white/10 w-1/3" />
          </div>
          <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
        </div>
        {/* feed cards */}
        <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5 space-y-2">
          <div
            className="h-16 rounded-lg"
            style={{
              background: `linear-gradient(120deg, ${accent}26, rgba(96,165,250,0.14) 60%, transparent)`,
            }}
          />
          <div className="h-1.5 rounded-full bg-white/15 w-4/5" />
          <div className="h-1.5 rounded-full bg-white/10 w-3/5" />
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5 space-y-2">
          <div className="flex gap-1.5 items-end h-10 px-1">
            {[0.4, 0.7, 0.55, 0.9, 0.65, 1, 0.8].map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${v * 100}%`, background: `${accent}${i === 5 ? "" : "59"}` }}
              />
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-white/15 w-1/2" />
        </div>
        {/* tab bar */}
        <div className="mt-auto flex justify-around px-3 pb-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-5 h-1.5 rounded-full"
              style={{ background: i === 0 ? accent : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantVisual({ accent }: { accent: string }) {
  return (
    <div className="relative w-[190px] h-[370px] rounded-[2.2rem] border border-white/15 bg-black/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] p-2.5 rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-b from-white/[0.06] to-transparent border border-white/8 overflow-hidden relative flex flex-col p-3.5 gap-3">
        <div className="flex justify-between items-center px-1">
          <span className="w-8 h-1.5 rounded-full bg-white/15" />
          <span className="w-12 h-3.5 rounded-full bg-black border border-white/10" />
        </div>
        {/* assistant orb */}
        <div className="flex items-center justify-center py-4 relative">
          <div
            className="absolute w-20 h-20 rounded-full blur-2xl opacity-50"
            style={{ background: accent }}
            aria-hidden="true"
          />
          <div
            className="relative w-16 h-16 rounded-full border border-white/20"
            style={{
              background: `conic-gradient(from 140deg, ${accent}, rgba(96,165,250,0.6), transparent 70%, ${accent})`,
            }}
          >
            <div className="absolute inset-[5px] rounded-full bg-black/85 flex items-center justify-center">
              <span className="font-anton text-sm text-white leading-none">L</span>
            </div>
          </div>
        </div>
        {/* chat bubbles */}
        <div className="self-start max-w-[85%] rounded-2xl rounded-bl-sm border border-white/8 bg-white/[0.05] p-2.5 space-y-1.5">
          <div className="h-1.5 rounded-full bg-white/20 w-28" />
          <div className="h-1.5 rounded-full bg-white/10 w-20" />
        </div>
        <div
          className="self-end max-w-[85%] rounded-2xl rounded-br-sm p-2.5 space-y-1.5 border"
          style={{ background: `${accent}14`, borderColor: `${accent}30` }}
        >
          <div className="h-1.5 rounded-full w-24" style={{ background: `${accent}73` }} />
          <div className="h-1.5 rounded-full bg-white/10 w-16" />
        </div>
        {/* typing */}
        <div className="self-start flex gap-1 px-2 py-1.5 rounded-full border border-white/8 bg-white/[0.04]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
              style={{ background: accent, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
        {/* input bar */}
        <div className="mt-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="flex-1 h-1.5 rounded-full bg-white/15" />
          <span className="w-6 h-6 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({
  accent,
  children,
  tilt,
}: {
  accent: string;
  children: React.ReactNode;
  tilt: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[300px] sm:w-[340px] rounded-xl border border-white/15 bg-black/90 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0",
        tilt
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/8 bg-white/[0.03]">
        <span className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="w-2 h-2 rounded-full opacity-60" style={{ background: c }} />
          ))}
        </span>
        <span className="flex-1 h-3.5 rounded-full bg-white/[0.06] border border-white/8 ml-1.5" />
        <span className="w-2.5 h-2.5 rounded-sm border border-white/15" style={{ borderColor: `${accent}55` }} />
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

function PortfolioVisual({ accent }: { accent: string }) {
  return (
    <BrowserFrame accent={accent} tilt="-rotate-3">
      <div className="space-y-3">
        {/* nav row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-md bg-white/12 border border-white/15 flex items-center justify-center">
              <span className="font-anton text-[7px] leading-none text-white">L</span>
            </span>
            <span className="h-1 w-8 rounded-full bg-white/20" />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 w-4 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
        {/* hero block */}
        <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3 space-y-2 relative overflow-hidden">
          <div
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-40"
            style={{ background: accent }}
          />
          <div className="h-2 rounded-full bg-white/25 w-3/4" />
          <div className="h-2 rounded-full w-1/2" style={{ background: `${accent}99` }} />
          <div className="h-1.5 rounded-full bg-white/10 w-full mt-1" />
          <div className="h-1.5 rounded-full bg-white/10 w-4/5" />
          <div className="flex gap-1.5 pt-1.5">
            <span className="h-3.5 w-14 rounded-full bg-white/85" />
            <span className="h-3.5 w-16 rounded-full border border-white/15" />
          </div>
        </div>
        {/* constellation mini */}
        <div className="rounded-lg border border-white/8 bg-white/[0.02] h-16 relative overflow-hidden">
          <svg viewBox="0 0 120 50" className="w-full h-full">
            <line x1="20" y1="30" x2="45" y2="14" stroke="rgba(255,255,255,0.14)" />
            <line x1="45" y1="14" x2="72" y2="32" stroke="rgba(255,255,255,0.14)" />
            <line x1="72" y1="32" x2="98" y2="18" stroke="rgba(255,255,255,0.14)" />
            <line x1="20" y1="30" x2="72" y2="32" stroke="rgba(255,255,255,0.08)" />
            {[
              [20, 30],
              [45, 14],
              [72, 32],
              [98, 18],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.6" fill={accent} opacity={0.9} />
            ))}
          </svg>
        </div>
      </div>
    </BrowserFrame>
  );
}

function DecisionVisual({ accent }: { accent: string }) {
  const rows = [
    { w: "70%", score: 0.92, top: true },
    { w: "55%", score: 0.68, top: false },
    { w: "40%", score: 0.44, top: false },
  ];
  return (
    <BrowserFrame accent={accent} tilt="rotate-3">
      <div className="space-y-3">
        {/* criteria weights */}
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-16 rounded-full bg-white/20" />
          <span
            className="rounded-full px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest border"
            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
          >
            weights
          </span>
        </div>
        <div className="flex gap-1.5">
          {[0.9, 0.6, 0.75, 0.35].map((v, i) => (
            <div key={i} className="flex-1 space-y-1">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${v * 100}%`, background: `${accent}bb` }} />
              </div>
              <span className="block h-1 rounded-full bg-white/8" />
            </div>
          ))}
        </div>
        {/* option rows with scores */}
        <div className="space-y-2 pt-0.5">
          {rows.map((r, i) => (
            <div
              key={i}
              className="rounded-lg border p-2.5 flex items-center gap-2.5"
              style={{
                borderColor: r.top ? `${accent}45` : "rgba(255,255,255,0.08)",
                background: r.top ? `${accent}10` : "rgba(255,255,255,0.02)",
              }}
            >
              <span
                className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center font-mono text-[7px]"
                style={{
                  background: r.top ? accent : "rgba(255,255,255,0.08)",
                  color: r.top ? "#000" : "rgba(255,255,255,0.5)",
                }}
              >
                {i + 1}
              </span>
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 rounded-full bg-white/18" style={{ width: r.w }} />
                <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.score * 100}%`, background: r.top ? accent : "rgba(255,255,255,0.25)" }}
                  />
                </div>
              </div>
              <span
                className="font-mono text-[9px] shrink-0"
                style={{ color: r.top ? accent : "rgba(255,255,255,0.35)" }}
              >
                {(r.score * 10).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---------- project card ---------- */

function ProjectCard({ project, flip }: { project: (typeof PROJECTS)[number]; flip: boolean }) {
  const visualWrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = visualWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
  };
  const onLeave = () => {
    const el = visualWrapRef.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <Reveal>
      <article
        className={cn(
          "group relative glass rounded-3xl overflow-hidden transition-all duration-500",
          "hover:border-white/20 hover:shadow-[0_0_50px_rgba(124,58,237,0.12)]"
        )}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* ghost index */}
        <span
          className="absolute -top-7 right-4 font-anton text-[9rem] leading-none text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.07] transition-colors duration-700"
          aria-hidden="true"
        >
          {project.index}
        </span>

        <div className={cn("grid grid-cols-1 lg:grid-cols-2")}>
          {/* visual */}
          <div
            className={cn(
              "relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 border-white/5",
              flip ? "lg:order-2 lg:border-l" : "lg:border-r"
            )}
            style={{ background: `radial-gradient(ellipse 75% 65% at 50% 55%, ${project.accentSoft}, transparent 72%)` }}
          >
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
              aria-hidden="true"
            />
            <div
              ref={visualWrapRef}
              className="relative transition-transform duration-300 ease-out will-change-transform"
            >
              {project.variant === "social" && <SocialVisual accent={project.accent} />}
              {project.variant === "assistant" && <AssistantVisual accent={project.accent} />}
              {project.variant === "portfolio" && <PortfolioVisual accent={project.accent} />}
              {project.variant === "decision" && <DecisionVisual accent={project.accent} />}
              {/* floating chip */}
              <div
                className="absolute -right-6 top-10 glass-dark rounded-full pl-2 pr-3.5 py-1.5 flex items-center gap-2 animate-badge-float"
                style={{ animationDelay: "0.4s" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-dot"
                  style={{ background: project.accent }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">AI core</span>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.35em] text-white/25">{project.index}</span>
              <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
              {project.status === "ready" ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-emerald-300/90">Ready</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" aria-hidden="true" />
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-amber-300/90">
                    In Development
                  </span>
                </span>
              )}
            </div>

            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight group-hover:text-white transition-colors">
              {project.name}
            </h3>
            <p className="text-lg md:text-xl font-medium tracking-tight" style={{ color: project.accent }}>
              {project.tagline}
            </p>
            <p className="text-sm md:text-[15px] text-white/45 leading-relaxed max-w-md">{project.desc}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 group-hover:border-white/20 transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="pt-3 text-xs text-white/25 font-mono tracking-wide">{project.note}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute top-40 -left-32 w-[500px] h-[300px] rounded-full bg-violet-900/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="eyebrow mb-4">selected work</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Projects</h2>
          </div>
          <p className="text-xs md:text-sm text-white/30 max-w-xs leading-relaxed md:text-right">
            Android apps and web builds — designed carefully, built patiently, revealed gradually.
          </p>
        </Reveal>

        <div className="flex flex-col gap-10 md:gap-14">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
