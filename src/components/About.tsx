import { ArrowUpRight, FlaskConical, Hammer, Radar } from "lucide-react";
import { LINKS } from "@/data/content";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/anim";

const FACTS = [
  { icon: FlaskConical, label: "approach", value: "build → test → learn" },
  { icon: Hammer, label: "currently", value: "building L.A.V.I. & AI experiments" },
  { icon: Radar, label: "open to", value: "opportunities & collabs" },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[260px] rounded-full bg-blue-900/5 blur-[110px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">who i am</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">About Me</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Identity card */}
          <Reveal className="lg:col-span-5" delay={80}>
            <div className="glass rounded-3xl p-8 relative overflow-hidden group">
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-600/10 blur-3xl pointer-events-none group-hover:bg-violet-600/15 transition-colors duration-700"
                aria-hidden="true"
              />
              <div className="flex items-center gap-5">
                <div className="monogram relative w-16 h-16 rounded-2xl bg-gradient-to-b from-white/12 to-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-violet-500/40 group-hover:shadow-[0_0_28px_rgba(139,92,246,0.28)] transition-all duration-500 shrink-0">
                  <span className="font-anton text-3xl text-white leading-none pt-0.5 select-none">L</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-[0.22em] uppercase">LAVI</h3>
                  <p className="text-sm text-white/60 mt-1">AI Software · Android · Web</p>
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-white/8 flex flex-col">
                {FACTS.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-4 py-3.5 border-b border-white/5 last:border-0 group/row"
                  >
                    <f.icon className="w-4 h-4 text-violet-300/70 shrink-0 group-hover/row:text-violet-300 transition-colors" />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 w-24 shrink-0">
                      {f.label}
                    </span>
                    <span className="text-sm text-white/70">{f.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group/link"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="link-sweep">github.com/hmmlavi</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-7">
            <Reveal delay={140}>
              <p className="text-2xl md:text-[2rem] font-semibold tracking-tight leading-snug text-white/90">
                “I like <span className="shimmer-text">experimenting</span> with things.”
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-7 space-y-5 text-white/55 leading-relaxed text-[15px] md:text-base max-w-2xl">
                <p>
                  That one line explains most of what I do. Almost everything I know started the same way — not in a
                  tutorial playlist, but by opening a blank project and trying something I didn't fully understand
                  yet. Build it, break it, fix it, understand it.
                </p>
                <p>
                  I'm <span className="text-white/80">Lakshit</span> — a B.Tech Computer Science student working
                  toward becoming an AI software engineer. My attention moves between{" "}
                  <span className="text-white/80">AI, Android and the web</span> — anywhere I can turn a curious idea
                  into real, working software. When a new technology looks interesting, I don't just read about it; I
                  build something small with it and see what survives.
                </p>
                <p>
                  Some experiments grow up into real projects — like{" "}
                  <span className="text-white/80">SaBuddy</span> and <span className="text-white/80">L.A.V.I.</span> —
                  and every one of them teaches me something the theory alone never could. The long-term goal is
                  simple: build software that feels extraordinary and proves genuinely useful.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {["learns by building", "experiments first", "AI-curious", "student & builder"].map((t) => (
                  <span
                    key={t}
                    className="chip rounded-full px-3.5 py-1.5 text-xs text-white/55 hover:text-white hover:border-violet-500/30 transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
