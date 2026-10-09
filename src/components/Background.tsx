import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Ambient background — sparse drifting orbs in screen blend so light
 * bleeds softly into the page. Minimal, quiet, GPU-cheap.
 */
export default function Background() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  const a1x = useTransform(sx, (v) => v * 34);
  const a1y = useTransform(sy, (v) => v * 30);
  const a2x = useTransform(sx, (v) => v * -26);
  const a2y = useTransform(sy, (v) => v * -20);
  const a3x = useTransform(sx, (v) => v * 16);
  const a3y = useTransform(sy, (v) => v * 12);

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* screen-blended aurora orbs → the blur-blend light bleed */}
      <div className="absolute inset-0" style={{ mixBlendMode: 'screen' }}>
        <motion.div style={{ x: a1x, y: a1y }} className="absolute -top-40 left-[8%]">
          <div
            className="drift h-[560px] w-[560px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--aurora-a) 0%, transparent 62%)' }}
          />
        </motion.div>
        <motion.div style={{ x: a2x, y: a2y }} className="absolute right-[-6%] top-[22%]">
          <div
            className="drift h-[480px] w-[480px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--aurora-b) 0%, transparent 62%)', animationDelay: '-6s' }}
          />
        </motion.div>
        <motion.div style={{ x: a3x, y: a3y }} className="absolute bottom-[-12%] left-[30%]">
          <div
            className="drift h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--aurora-c) 0%, transparent 62%)', animationDelay: '-11s' }}
          />
        </motion.div>
      </div>

      {/* vignette keeps edges calm */}
      <div className="vignette absolute inset-0" />
    </div>
  );
}
