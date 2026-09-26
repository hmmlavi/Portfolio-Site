import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/data/content";
import { GithubIcon } from "@/components/icons";
import { Magnetic, Reveal } from "@/components/anim";

export default function GitHubSection() {
  return (
    <section className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[300px] rounded-full bg-blue-900/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden group">
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center">
              <div className="monogram relative w-16 h-16 rounded-2xl bg-gradient-to-b from-white/12 to-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-violet-500/40 group-hover:shadow-[0_0_28px_rgba(139,92,246,0.3)] transition-all duration-500 mb-6">
                <GithubIcon className="w-7 h-7 text-white" />
              </div>
              <p className="eyebrow mb-4">the work, in the open</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Everything lives on <span className="shimmer-text">GitHub</span>
              </h2>
              <p className="text-white/60 text-sm md:text-[15px] leading-relaxed max-w-md mb-8">
                Experiments, Android apps, web builds and learning-in-public — explore the repositories to see
                how I work and what ships next.
              </p>
              <Magnetic>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-100 transition-colors inline-flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  View GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
              <p className="mt-6 font-mono text-xs text-white/50">github.com/hmmlavi</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
