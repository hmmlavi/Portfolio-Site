import { useEffect } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { LEGAL_DOCS, type LegalDoc } from "@/data/legal";
import { LINKS } from "@/data/content";
import { MailIcon } from "@/components/icons";

/** One rendered legal document (privacy / terms / cookies / refunds). */
export default function LegalPage({ doc, onNavigate }: { doc: LegalDoc; onNavigate: (slug: string | null) => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${doc.title} — Lakshit Singh Saini`;
    return () => {
      document.title = "LAVI — Lakshit Singh Saini · AI Software Engineer";
    };
  }, [doc]);

  const others = LEGAL_DOCS.filter((d) => d.id !== doc.id);

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* back */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(null);
          }}
          className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors link-sweep"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </a>

        {/* header */}
        <header className="mt-8 pb-8 border-b border-white/8">
          <p className="eyebrow mb-4">{doc.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{doc.title}</h1>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
            Last updated {doc.updated}
          </p>
        </header>

        {/* intro */}
        <p className="mt-8 text-base md:text-lg text-white/65 leading-relaxed">{doc.intro}</p>

        {/* sections */}
        <div className="mt-12 flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg md:text-xl font-medium text-white/90 tracking-tight mb-3.5">{s.heading}</h2>
              {s.body && (
                <div className="flex flex-col gap-3.5">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-sm md:text-[15px] text-white/60 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}
              {s.list && (
                <ul className="mt-1 flex flex-col gap-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-[15px] text-white/60">
                      <span className="mt-2 w-1 h-1 rounded-full bg-violet-400/70 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* contact card */}
        <div className="mt-14 glass rounded-2xl p-6 md:p-7">
          <h2 className="text-base font-medium text-white/90 tracking-tight mb-2.5">Questions about this page?</h2>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            I'm happy to clarify anything here. Email me and I'll get back to you.
          </p>
          <a
            href={`mailto:${LINKS.email}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <MailIcon className="w-4 h-4 text-violet-300" />
            {LINKS.email}
          </a>
        </div>

        {/* cross links */}
        <nav className="mt-12 pt-8 border-t border-white/8" aria-label="Legal pages">
          <p className="eyebrow mb-4">also available</p>
          <ul className="flex flex-wrap gap-2.5">
            {others.map((d) => (
              <li key={d.id}>
                <a
                  href={`#/${d.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(d.slug);
                  }}
                  className="chip inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white/65 hover:text-white hover:border-white/25 transition-colors duration-300"
                >
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
