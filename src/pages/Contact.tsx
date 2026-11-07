import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EmailComposer } from '../components/EmailComposer';
import { ArrowLink } from '../components/ui/ArrowLink';
import { GlowCard } from '../components/ui/GlowCard';
import { PageHead } from '../components/ui/PageHead';
import { Section } from '../components/ui/Section';
import { site } from '../content/site';
import { mailto } from '../lib/mailto';
import { ToneContext } from '../theme/tone';
import { color, font } from '../theme/tokens';

function Details() {
  const rows: Array<[string, ReactNode]> = [
    ['Company', site.legalName],
    [
      'Office',
      <Box component="address" key="office" sx={{ fontStyle: 'normal' }}>
        {site.addressLines.map((line) => (
          <Box component="span" key={line} sx={{ display: 'block' }}>
            {line}
          </Box>
        ))}
      </Box>,
    ],
    ['Hours', site.hours],
    ['Reply', site.response],
    ['Languages', site.languages.join(' · ')],
  ];
  return (
    <ToneContext value="night">
      <GlowCard accent="violet" bg={color.night2} radius={24} component="aside">
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Box component="dl" sx={{ m: 0 }}>
            {rows.map(([k, v], i) => (
              <Box key={k} sx={{ display: 'grid', gridTemplateColumns: '10ch minmax(0, 1fr)', gap: 2, py: 1.5, borderTop: i ? `1px solid ${color.line}` : 'none' }}>
                <Box component="dt" sx={{ fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: color.ink3, pt: '3px' }}>
                  {k}
                </Box>
                <Box component="dd" sx={{ m: 0 }}>
                  {v}
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${color.lineStrong}` }}>
            <Typography variant="mono" component="h2" sx={{ color: color.teal }}>
              BizWhats
            </Typography>
            <Box sx={{ mt: 1.5, display: 'grid', gap: 1.25 }}>
              <Box component="a" href={mailto({ to: site.supportEmail })} sx={{ color: 'inherit', fontWeight: 600, fontSize: '1.1rem' }}>
                {site.supportEmail}
              </Box>
              <Box>
                <ArrowLink href={site.bizwhatsUrl} external>
                  {site.bizwhatsLabel}
                </ArrowLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </GlowCard>
    </ToneContext>
  );
}

export default function Contact() {
  return (
    <>
      <PageHead crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} eyebrow="Contact" title="Let's talk." lead="Email only. We reply within one working day." />

      <Section tone="alt">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: { xs: 6, lg: 8 }, alignItems: 'start' }}>
          <Box>
            <EmailComposer />
            <Typography variant="body2" sx={{ mt: 4, color: color.ink2 }}>
              Or write to{' '}
              <Box component="a" href={mailto()} sx={{ color: color.ink, fontWeight: 600 }}>
                {site.email}
              </Box>
            </Typography>
          </Box>
          <Details />
        </Box>
      </Section>
    </>
  );
}
