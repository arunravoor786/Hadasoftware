import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { site } from '../../content/site';
import { mailto } from '../../lib/mailto';
import { ToneContext } from '../../theme/tone';
import { color, font, rhythm } from '../../theme/tokens';
import { ArrowUp, ArrowUpRight } from '../ui/icons';
import { Logo } from '../ui/Logo';
import { Wrap } from '../ui/Wrap';
import { scrollToY, useLenis } from './lenis';

interface FooterLink {
  label: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
}

const linkSx = {
  color: color.onNight,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  py: 0.5,
  '&:hover': { color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' },
};

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <Box>
      <Typography variant="mono" component="h2" sx={{ color: color.onNight3, mb: 2 }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 0.75 }}>
        {links.map((link, i) => (
          <li key={i}>
            {link.to ? (
              <Box component={RouterLink} to={link.to} sx={linkSx}>
                {link.label}
              </Box>
            ) : (
              <Box
                component="a"
                href={link.href}
                sx={linkSx}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                {link.external && <ArrowUpRight size={14} />}
              </Box>
            )}
          </li>
        ))}
      </Box>
    </Box>
  );
}

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  const lenis = useLenis();
  const year = YEAR;

  return (
    <ToneContext value="night">
      <Box component="footer" sx={{ bgcolor: color.night, color: color.onNight, pt: rhythm, pb: 4 }}>
        <Wrap>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: '5fr 2fr 2fr 3fr' },
              gap: { xs: 6, md: 4 },
            }}
          >
            <Box sx={{ gridColumn: { sm: '1 / -1', md: 'auto' } }}>
              <Box component={RouterLink} to="/" aria-label="Hadasoft home" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <Logo />
              </Box>
              <Typography sx={{ mt: 3, color: color.onNight2, maxWidth: '30ch' }}>
                Product engineering from Hyderabad.
              </Typography>
              <Box
                component="address"
                sx={{ mt: 2.5, fontStyle: 'normal', fontFamily: font.mono, fontSize: '0.72rem', lineHeight: 1.7, color: color.onNight3 }}
              >
                {site.addressLines.map((line) => (
                  <Box component="span" key={line} sx={{ display: 'block' }}>
                    {line}
                  </Box>
                ))}
              </Box>
            </Box>
            <Column
              title="Products"
              links={[
                { label: 'BizWhats', to: '/bizwhats/' },
                { label: 'ACIP', to: '/acip/' },
                { label: 'All products', to: '/products/' },
                { label: site.bizwhatsLabel, href: site.bizwhatsUrl, external: true },
              ]}
            />
            <Column
              title="Company"
              links={[
                { label: 'Services', to: '/services/' },
                { label: 'About us', to: '/company/' },
                { label: 'Leadership', to: '/company/#leadership' },
                { label: 'Contact', to: '/contact/' },
              ]}
            />
            <Column
              title="Write to us"
              links={[
                {
                  label: (
                    <span>
                      {site.email}
                      <Box component="span" sx={{ display: 'block', fontFamily: font.mono, fontSize: '0.68rem', color: color.onNight3 }}>
                        Projects, partnerships, ACIP
                      </Box>
                    </span>
                  ),
                  href: mailto(),
                },
                {
                  label: (
                    <span>
                      {site.supportEmail}
                      <Box component="span" sx={{ display: 'block', fontFamily: font.mono, fontSize: '0.68rem', color: color.onNight3 }}>
                        BizWhats demos and support
                      </Box>
                    </span>
                  ),
                  href: mailto({ to: site.supportEmail }),
                },
              ]}
            />
          </Box>

          <Box
            sx={{
              mt: { xs: 8, md: 12 },
              pt: 3,
              borderTop: `1px solid ${color.nightLine}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              fontFamily: font.mono,
              fontSize: '0.72rem',
              letterSpacing: '0.02em',
              color: color.onNight3,
            }}
          >
            <span>
              © {year} {site.legalName} · {site.locationShort}, India
            </span>
            <span>Set in Archivo and IBM Plex Mono · Built with React, MUI and Motion</span>
            <Box
              component="button"
              type="button"
              onClick={() => scrollToY(lenis, 0, false)}
              sx={{
                all: 'unset',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: color.onNight2,
                '&:hover': { color: '#fff' },
                '&:focus-visible': { outline: `2px solid ${color.tealBright}`, outlineOffset: '3px' },
              }}
            >
              Back to top <ArrowUp size={14} />
            </Box>
          </Box>
        </Wrap>
      </Box>
    </ToneContext>
  );
}
