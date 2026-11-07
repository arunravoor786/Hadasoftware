import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { motion, useReducedMotion } from 'motion/react';
import { ease } from '../../theme/tokens';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** When given, an outer Box carries these styles (use it for grid placement). */
  sx?: SxProps<Theme>;
}

/** Fades content up into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 18, sx }: RevealProps) {
  const reduce = useReducedMotion();
  const inner = (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
  return sx ? <Box sx={sx}>{inner}</Box> : inner;
}
