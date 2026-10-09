import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../utils/cn';
import { useScramble } from '../hooks/useScramble';

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const { display, start } = useScramble(text);
  return (
    <span className={cn('inline-block', className)} onMouseEnter={start}>
      {display}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  index,
  accent = 'text-glow/80',
  center = false,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  index?: string;
  accent?: string;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className={cn(
        'relative mb-12 md:mb-16',
        center
          ? 'flex flex-col items-center text-center'
          : 'flex flex-col gap-4 border-b border-white/[0.06] pb-7 md:flex-row md:items-end md:justify-between',
      )}
    >
      {index && (
        <span
          aria-hidden="true"
          className="ghost-num pointer-events-none absolute -top-8 right-0 hidden select-none text-[110px] lg:block"
        >
          {index}
        </span>
      )}
      <div className={cn(center && 'flex flex-col items-center')}>
        <p className={cn('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em]', accent)}>
          {index && <span className="text-faint">{index}/</span>}
          <ScrambleText text={kicker} />
        </p>
        <h2 className="mt-3.5 font-display text-[26px] font-semibold tracking-[-0.01em] text-ink md:text-[34px]">
          {title}
        </h2>
      </div>
      {children && (
        <div className={cn('max-w-sm text-sm leading-relaxed text-dim', !center && 'md:pb-0.5 md:text-right')}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

/** Gentle 3D tilt — kept subtle for the quiet aesthetic. */
export function Tilt({
  children,
  className,
  amount = 4,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 170, damping: 20 });
  const sry = useSpring(ry, { stiffness: 170, damping: 20 });

  return (
    <div
      className={cn('[perspective:900px]', className)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -2 * amount);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * amount);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div style={{ rotateX: srx, rotateY: sry }} className="h-full [transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-dim',
        className,
      )}
    >
      {children}
    </span>
  );
}
