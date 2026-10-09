import * as React from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#·01';

/**
 * Scramble-decrypt text effect, terminal-aesthetic.
 * Store the plain target; on hover each glyph cycles random characters
 * then locks left-to-right. Zero layout shift — string length is fixed.
 */
export function useScramble(text: string) {
  const [display, setDisplay] = React.useState(text);
  const ticking = React.useRef(false);

  const start = React.useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    let frame = 0;
    const total = Math.max(14, Math.min(30, text.length + 8));

    const step = () => {
      frame++;
      const progress = frame / total;
      const cut = Math.floor(progress * text.length);

      let out = text.slice(0, cut);
      for (let i = cut; i < text.length; i++) {
        const ch = text[i];
        out += ch === ' ' || ch === '/' || ch === '~' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);

      if (frame < total) {
        requestAnimationFrame(step);
      } else {
        setDisplay(text);
        ticking.current = false;
      }
    };
    requestAnimationFrame(step);
  }, [text]);

  return { display, start };
}
