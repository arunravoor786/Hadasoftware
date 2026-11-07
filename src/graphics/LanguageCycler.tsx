import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';

const GREETINGS = [
  { word: 'नमस्ते', lang: 'Hindi', code: 'hi' },
  { word: 'नमस्कार', lang: 'Marathi', code: 'mr' },
  { word: 'வணக்கம்', lang: 'Tamil', code: 'ta' },
  { word: 'నమస్కారం', lang: 'Telugu', code: 'te' },
  { word: 'Hello', lang: 'English', code: 'en' },
];

/** A greeting that rolls through the five languages BizWhats speaks natively. */
export function LanguageCycler({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-5% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [i, setI] = useState(0);
  const g = GREETINGS[i];

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(() => setI((x) => (x + 1) % GREETINGS.length), 2200);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  return (
    <Box ref={ref}>
      <span className="sr-only">Hello in Hindi, Marathi, Tamil, Telugu and English.</span>
      <Box
        aria-hidden="true"
        sx={{
          position: 'relative',
          height: '1.5em',
          overflow: 'hidden',
          fontSize: size === 'lg' ? 'clamp(3rem, 1.4rem + 6.4vw, 7rem)' : 'clamp(2.1rem, 1.6rem + 1.6vw, 2.8rem)',
          fontWeight: 560,
          lineHeight: 1.45,
          letterSpacing: '-0.02em',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={g.code}
            lang={g.code}
            initial={{ y: '70%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-70%', opacity: 0 }}
            transition={{ duration: 0.65, ease }}
            style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}
          >
            {g.word}
          </motion.span>
        </AnimatePresence>
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          mt: size === 'lg' ? 2 : 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: size === 'lg' ? '8px 20px' : '6px 12px',
          fontFamily: font.mono,
          fontSize: size === 'lg' ? '0.75rem' : '0.66rem',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
        }}
      >
        {GREETINGS.map((x, j) => (
          <Box
            component="span"
            key={x.code}
            sx={{
              color: j === i ? c.fg : c.fg3,
              borderBottom: `1px solid ${j === i ? c.fg : 'transparent'}`,
              pb: '2px',
              transition: 'color .3s, border-color .3s',
            }}
          >
            {x.lang}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
