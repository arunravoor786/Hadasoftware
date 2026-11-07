import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { toneColors, type Tone } from '../../theme/tone';
import { font } from '../../theme/tokens';
import { Reveal } from './Reveal';
import { Section } from './Section';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeadProps {
  crumbs: Crumb[];
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: Tone;
}

/** Inner-page opening: breadcrumb, eyebrow, H1, lead and an optional live figure. */
export function PageHead({ crumbs, eyebrow, title, lead, actions, aside, tone = 'paper' }: PageHeadProps) {
  const c = toneColors(tone);
  return (
    <Section tone={tone} pad="none" sx={{ pt: { xs: '36px', md: '56px' }, pb: { xs: '64px', md: '104px' } }}>
      <Box
        component="nav"
        aria-label="Breadcrumb"
        sx={{ fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.05em', color: c.fg3 }}
      >
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {crumbs.map((crumb, i) => (
            <Box component="li" key={crumb.label} sx={{ display: 'flex', gap: 1 }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.to ? (
                <Box component={RouterLink} to={crumb.to} sx={{ color: 'inherit', '&:hover': { color: c.fg } }}>
                  {crumb.label}
                </Box>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: aside ? 'minmax(0, 6.4fr) minmax(0, 5.6fr)' : '1fr' },
          gap: { xs: 7, lg: 8 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Reveal>
            <Typography variant="mono" component="p" sx={{ color: c.fg3, mb: 2.5 }}>
              {eyebrow}
            </Typography>
          </Reveal>
          <Reveal delay={0.05}>
            <Typography variant="h1" sx={{ maxWidth: aside ? '15em' : '17em' }}>
              {title}
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography variant="lead" sx={{ mt: 3, color: c.fg2, maxWidth: '58ch' }}>
              {lead}
            </Typography>
          </Reveal>
          {actions && (
            <Reveal delay={0.15}>
              <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4.5, gap: { xs: 2, sm: 3 }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                {actions}
              </Stack>
            </Reveal>
          )}
        </Box>
        {aside && <Box sx={{ minWidth: 0 }}>{aside}</Box>}
      </Box>
    </Section>
  );
}
