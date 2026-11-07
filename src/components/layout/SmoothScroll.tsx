import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
import { LenisContext } from './lenis';

/**
 * Inertial scrolling via Lenis. Skipped for reduced-motion users and for
 * automated browsers (screenshots, tests), which get native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduce || navigator.webdriver) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.12, smoothWheel: true });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext value={lenis}>{children}</LenisContext>;
}
