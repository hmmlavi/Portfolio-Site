import { CAPABILITIES, STATS_BAND } from "@/data/content";
import { Reveal } from "@/components/anim";

export default function Capabilities() {
  return (
    <section id="skills" className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] rounded-full bg-violet-900/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] rounded-full bg-blue-900/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
        {/* Left — heading + stats */}
        <Reveal className="lg:col-span-4 flex flex-col gap-10">
          <div>
            <p className="eyebrow mb-4">what i do</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Capabilities</h2>
            <p className="mt-5 text-sm md:text-[15px] text-white/45 leading-relaxed max-w-xs">
              Not mastery claims — just the areas where I spend my time building, testing and learning by shipping.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-9 pt-8 border-t border-white/5">
            {STATS_BAND.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 group">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-violet-300 transition-colors duration-300">
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/35 font-medium leading-normal">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — capability grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 lg:pl-12 lg:border-l border-white/5">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.index} delay={i * 90} className="group">
              <div className="flex flex-col gap-2 pb-5 border-b border-white/5 mb-5 group-hover:border-white/15 transition-colors duration-500">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-125"
                    style={{ background: c.color, boxShadow: `0 0 10px ${c.color}55` }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">{c.index}</span>
                </div>
                <h3 className="text-lg font-medium text-white/90 tracking-tight group-hover:text-white transition-colors duration-300">
                  {c.title}
                </h3>
              </div>
              <p className="text-sm text-white/40 font-light leading-relaxed">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
