import { ArrowUp, FileText } from "lucide-react";
import { LINKS, NAV_ITEMS } from "@/data/content";
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, XIcon } from "@/components/icons";
import { Magnetic } from "@/components/anim";

const SOCIALS = [
  { label: "GitHub", href: LINKS.github, Icon: GithubIcon },
  { label: "LinkedIn", href: LINKS.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: LINKS.instagram, Icon: InstagramIcon },
  { label: "X", href: LINKS.x, Icon: XIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-black px-6 md:px-10 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/5">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="monogram relative w-10 h-10 rounded-xl bg-gradient-to-b from-white/12 to-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-anton text-xl text-white leading-none pt-0.5 select-none">L</span>
              </div>
              <span className="text-white font-medium tracking-[0.28em] text-sm uppercase">LAVI</span>
            </div>
            <p className="text-sm text-white/70 font-medium">Lakshit Singh Saini</p>
            <p className="text-sm text-white/35 mt-1 leading-relaxed max-w-xs">
              Computer Science Engineer · AI Software Engineer — building useful things by experimenting.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => go(e, n.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors link-sweep inline-block"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">Connect</p>
            <div className="flex gap-2 mb-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass rounded-full p-2.5 text-white/55 hover:text-white hover:border-violet-500/40 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${LINKS.email}`}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-3 break-all"
            >
              <MailIcon className="w-4 h-4 shrink-0" />
              <span className="link-sweep">{LINKS.email}</span>
            </a>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="link-sweep">Resume</span>
            </a>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {year} Lakshit Singh Saini. All experiments reserved.</p>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25">
            designed & built by Lakshit
          </p>
          <Magnetic>
            <a
              href="#home"
              onClick={(e) => go(e, "home")}
              aria-label="Back to top"
              className="glass rounded-full p-2.5 text-white/55 hover:text-white hover:border-violet-500/40 transition-all duration-300 inline-flex"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
