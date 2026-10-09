import * as React from 'react';
import { motion } from 'framer-motion';

export default function Boot({ onDone }: { onDone: () => void }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      document.body.style.overflow = '';
      onDone();
    };
    const t = window.setTimeout(finish, 1300);
    window.addEventListener('keydown', finish);
    window.addEventListener('click', finish);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('click', finish);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-base will-change-transform"
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-glow/25"
          animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="breathe h-2 w-2 rounded-full bg-glow" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="font-mono text-[10px] uppercase tracking-[0.45em] text-faint"
      >
        Lakshit Singh Saini
      </motion.p>
    </motion.div>
  );
}
