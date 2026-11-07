import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { ease } from '../../theme/tokens';

/** Counts up to `to` once, when first visible. */
export function CountUp({ to, pad = 0, suffix = '' }: { to: number; pad?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tnum">
      {String(value).padStart(pad, '0')}
      {suffix}
    </span>
  );
}
