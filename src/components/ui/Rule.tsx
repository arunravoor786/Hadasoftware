import { motion, useReducedMotion } from 'motion/react';
import { ease, gradient } from '../../theme/tokens';

/** A luminous hairline that draws itself from left to right the first time it is seen. */
export function Rule() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 1.2, ease }}
      style={{ height: 1, background: gradient.rule, transformOrigin: '0% 50%' }}
    />
  );
}
