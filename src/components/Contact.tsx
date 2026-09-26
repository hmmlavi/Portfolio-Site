import { ArrowUpRight, FileText } from "lucide-react";
import { LINKS } from "@/data/content";
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, XIcon } from "@/components/icons";
import { Magnetic, Reveal } from "@/components/anim";

const SOCIALS = [
  { label: "GitHub", href: LINKS.github, Icon: GithubIcon },
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: LINKS.instagram, Icon: InstagramIcon },
  { label: "X", href: LINKS.x, Icon: XIcon },
  { label: "Resume", href: LINKS.resume, Icon: FileText },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-44 px-6 md:px-10 bg-black border-t border-white/5 relative overflow-hidden">
      {/* atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[460px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.09), rgba(96,165,250,0.04) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">get in touch</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-7">
            Open to
            <br />
            <span className="shimmer-text">Opportunities.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Internships, collaborations or just an interesting problem in AI, Android or the web — if you're building
            something real, my inbox is open and I reply fast.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-col items-center gap-8">
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${LINKS.email}`}
                className="group inline-flex items-center gap-3.5 glass rounded-full pl-6 pr-7 py-4.5 md:py-5 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.18)] transition-all duration-500"
              >
                <MailIcon className="w-5 h-5 text-violet-300 shrink-0" />
                <span className="font-mono text-sm md:text-base text-white/85 group-hover:text-white transition-colors break-all">
                  {LINKS.email}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            </Magnetic>

            <div className="flex flex-wrap justify-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-full px-4.5 py-2.5 flex items-center gap-2 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>

            {/* data-handling disclosure — this site has no form, cookies or analytics */}
            <p className="max-w-md text-xs leading-relaxed text-white/55 pt-4">
              This website has no contact form, sets no cookies and runs no analytics. Emailing me is entirely
              voluntary — your message goes straight to my inbox and is used only to reply. See the{" "}
              <a
                href="#/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = "/privacy";
                }}
                className="text-white/80 hover:text-white underline decoration-white/25 underline-offset-2 transition-colors"
              >
                privacy policy
              </a>{" "}
              for details.
            </p>

            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/50 pt-2">
              Lakshit Singh Saini
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
