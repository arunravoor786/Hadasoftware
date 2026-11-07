import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Jump (or glide) to a y position, with or without smooth scrolling active. */
export function scrollToY(lenis: Lenis | null, y: number, immediate = true) {
  if (lenis) lenis.scrollTo(y, { immediate, force: true });
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}
