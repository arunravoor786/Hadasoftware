import { Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useLocation, useOutlet } from 'react-router';
import { color, ease, font } from '../../theme/tokens';
import { scrollToY, useLenis } from './lenis';
import { ScrollToHash } from './ScrollToHash';
import { Seo } from './Seo';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SmoothScroll } from './SmoothScroll';

/** Holds on to the outlet it was born with, so the old page can animate out. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

function PageFrame() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToY(lenis, 0)}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
      >
        <Suspense fallback={<Box sx={{ minHeight: '100svh' }} />}>
          <FrozenOutlet />
          <ScrollToHash />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export function RootLayout() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Seo />
        <Box
          component="a"
          href="#main"
          sx={{
            position: 'absolute',
            left: 16,
            top: -80,
            zIndex: 2000,
            px: 2,
            py: 1,
            bgcolor: color.ink,
            color: color.paper,
            fontFamily: font.mono,
            fontSize: '0.8rem',
            textDecoration: 'none',
            '&:focus': { top: 12 },
          }}
        >
          Skip to content
        </Box>
        <SiteHeader />
        <Box component="main" id="main" tabIndex={-1} sx={{ outline: 'none' }}>
          <PageFrame />
        </Box>
        <SiteFooter />
      </SmoothScroll>
    </MotionConfig>
  );
}
