import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router';
import { nav, site } from '../../content/site';
import { mailto } from '../../lib/mailto';
import { color, font, gradient } from '../../theme/tokens';
import { CloseIcon, MailIcon, MenuIcon } from '../ui/icons';
import { Logo } from '../ui/Logo';
import { Wrap } from '../ui/Wrap';
import { useLenis } from './lenis';

const HEADER_HEIGHT = { xs: 60, md: 68 };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const lenis = useLenis();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  // Freeze smooth scrolling while the full-screen menu is open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        color: color.ink,
        bgcolor: alpha(color.paper, scrolled ? 0.78 : 0.4),
        backdropFilter: 'saturate(1.4) blur(14px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? color.line : 'transparent',
        transition: 'border-color .3s ease, background-color .3s ease',
      }}
    >
      <Wrap sx={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
        <Box component={RouterLink} to="/" aria-label="Hadasoft home" sx={{ color: 'inherit', textDecoration: 'none' }}>
          <Logo />
        </Box>

        <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', gap: { md: 0.25, lg: 0.75 } }}>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {({ isActive }) => (
                    <Box
                      component="span"
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        px: { md: 1.5, lg: 2 },
                        py: 1,
                        fontSize: '0.95rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? color.ink : color.ink2,
                        transition: 'color .2s ease',
                        '&:hover': { color: color.ink },
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                          style={{ position: 'absolute', left: 14, right: 14, bottom: 0, height: 2, borderRadius: 2, background: gradient.iris }}
                        />
                      )}
                    </Box>
                  )}
                </NavLink>
              </li>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button href={mailto()} variant="outlined" size="small" startIcon={<MailIcon size={16} />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Email us
          </Button>
          <IconButton
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' }, mr: -1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Wrap>

      {/* Reading progress: an iridescent hairline that fills as you scroll. */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background: gradient.iris,
          scaleX: scrollYProgress,
          transformOrigin: '0% 50%',
        }}
      />

      <Drawer
        id="mobile-menu"
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              height: '100dvh',
              bgcolor: color.paper,
              backgroundImage: 'radial-gradient(80% 50% at 90% 0%, rgba(140,123,255,0.25), transparent 70%), radial-gradient(70% 40% at 0% 100%, rgba(65,240,210,0.14), transparent 70%)',
              color: color.ink,
              boxShadow: 'none',
            },
          },
        }}
      >
        <Wrap sx={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <Logo />
          </Box>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)} sx={{ mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </Wrap>
        <Wrap sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: 5 }}>
          <Box component="nav" aria-label="Mobile">
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: 3 }}>
              {[{ label: 'Home', to: '/' }, ...nav].map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: `1px solid ${color.line}` }}
                >
                  <Box
                    component={RouterLink}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    sx={{
                      display: 'block',
                      py: 1.6,
                      color: 'inherit',
                      textDecoration: 'none',
                      fontSize: '2rem',
                      fontWeight: 560,
                      fontStretch: '110%',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {item.label}
                  </Box>
                </motion.li>
              ))}
            </Box>
          </Box>
          <Box sx={{ borderTop: `1px solid ${color.line}`, pt: 3 }}>
            <Box component="a" href={mailto()} sx={{ display: 'inline-block', fontSize: '1.35rem', fontWeight: 560, color: 'inherit', letterSpacing: '-0.02em' }}>
              {site.email}
            </Box>
            <Box sx={{ mt: 1.5, fontFamily: font.mono, fontSize: '0.75rem', color: color.ink2 }}>
              <Box component="a" href={site.bizwhatsUrl} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit' }}>
                {site.bizwhatsLabel} ↗
              </Box>
            </Box>
          </Box>
        </Wrap>
      </Drawer>
    </Box>
  );
}
