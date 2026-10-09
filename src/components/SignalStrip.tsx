const SIGNALS = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'Tailwind CSS',
  'Gemini API',
  'Python',
  'C / C++',
  'Kotlin',
  'Firebase',
  'MongoDB',
  'Git',
  'Open source',
  'Shipped from India',
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {SIGNALS.map((s) => (
        <span key={s} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
            {s}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-glow/40" />
        </span>
      ))}
    </div>
  );
}

export default function SignalStrip() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/[0.05] bg-white/[0.012] py-3.5">
      <div className="signal-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
