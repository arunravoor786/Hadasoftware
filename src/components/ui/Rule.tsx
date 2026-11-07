import { motion, useReducedMotion } from 'motion/react';
import { useToneColors } from '../../theme/tone';
import { ease } from '../../theme/tokens';

/** A hairline that draws itself from left to right the first time it is seen. */
export function Rule({ strong = false }: { strong?: boolean }) {
  const c = useToneColors();
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 1.2, ease }}
      style={{ height: 1, background: strong ? c.lineStrong : c.line, transformOrigin: '0% 50%' }}
    />
  );
}
