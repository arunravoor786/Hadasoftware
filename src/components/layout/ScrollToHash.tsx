import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToY, useLenis } from './lenis';

/** Scrolls to #fragment targets, waiting briefly for lazily loaded pages to render. */
export function ScrollToHash() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 84;
        scrollToY(lenis, y, false);
        return;
      }
      if (tries++ < 25) timer = window.setTimeout(attempt, 60);
    };
    timer = window.setTimeout(attempt, 60);
    return () => window.clearTimeout(timer);
  }, [hash, lenis]);

  return null;
}
