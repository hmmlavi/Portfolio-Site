import * as React from 'react';

/**
 * +/- latency-style pulse readout. Fake-plausible, honest about being an
 * aesthetic instrument, lives subtly in the corner. No network calls.
 */
export default function PingBadge() {
  const [ms, setMs] = React.useState(28);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setMs((m) => {
        const jitter = Math.round((Math.random() - 0.5) * 10);
        return Math.max(16, Math.min(58, m + jitter));
      });
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-5 right-5 z-40 hidden select-none items-center gap-2 rounded-full border border-white/[0.07] bg-solid/80 px-3 py-1.5 font-mono text-[10px] text-dim backdrop-blur-sm md:flex"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="pulse-dot absolute h-full w-full rounded-full bg-leaf" />
        <span className="absolute h-full w-full animate-ping rounded-full bg-leaf/60" />
      </span>
      <span>{ms}ms</span>
      <span className="text-faint">IST</span>
    </div>
  );
}
