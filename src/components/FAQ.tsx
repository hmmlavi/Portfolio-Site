import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/content";
import { Reveal } from "@/components/anim";
import { cn } from "@/utils/cn";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-32 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-1/4 w-[460px] h-[260px] rounded-full bg-violet-900/5 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow mb-4">frequently asked questions</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">Common Questions</h2>
          <p className="text-white/60 text-sm md:text-[15px] leading-relaxed max-w-lg">
            Quick answers about who I am, what I build and how to reach me.
          </p>
        </Reveal>

        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-white/5">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span
                      className={cn(
                        "text-base md:text-lg font-medium tracking-tight transition-colors duration-300",
                        isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-400",
                        isOpen
                          ? "rotate-45 border-violet-500/40 text-violet-300"
                          : "text-white/50 group-hover:text-white group-hover:border-white/20"
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  <div className="faq-answer" data-open={isOpen} id={`faq-panel-${i}`} role="region">
                    <div>
                      <p className="pb-7 pr-12 text-sm md:text-[15px] text-white/60 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
