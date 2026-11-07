import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EmailComposer } from '../components/EmailComposer';
import { ArrowLink } from '../components/ui/ArrowLink';
import { NumberedList } from '../components/ui/NumberedList';
import { PageHead } from '../components/ui/PageHead';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { site } from '../content/site';
import { mailto } from '../lib/mailto';
import { ToneContext } from '../theme/tone';
import { color, font } from '../theme/tokens';

function Details() {
  const rows: Array<[string, ReactNode]> = [
    ['Company', site.legalName],
    ['Office', site.location],
    ['Hours', site.hours],
    ['Response', site.response],
    ['Languages', site.languages.join(' · ')],
  ];
  return (
    <ToneContext value="night">
      <Box component="aside" aria-label="Company details" sx={{ bgcolor: color.night, color: color.onNight, p: { xs: 3, md: 4 } }}>
        <Typography variant="h3" component="h2">
          Hadasoft
        </Typography>
        <Box component="dl" sx={{ m: 0, mt: 3 }}>
          {rows.map(([k, v]) => (
            <Box key={k} sx={{ display: 'grid', gridTemplateColumns: '10ch minmax(0, 1fr)', gap: 2, py: 1.5, borderTop: `1px solid ${color.nightLine}` }}>
              <Box component="dt" sx={{ fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: color.onNight3, pt: '3px' }}>
                {k}
              </Box>
              <Box component="dd" sx={{ m: 0 }}>
                {v}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${color.nightLineStrong}` }}>
          <Typography variant="mono" component="h3" sx={{ color: color.onNight3 }}>
            BizWhats
          </Typography>
          <Box sx={{ mt: 1.5, display: 'grid', gap: 1.25 }}>
            <Box component="a" href={mailto({ to: site.supportEmail })} sx={{ color: 'inherit', fontWeight: 560, fontSize: '1.1rem' }}>
              {site.supportEmail}
            </Box>
            <Typography sx={{ color: color.onNight2, fontSize: '0.92rem' }}>Demos, onboarding and product support.</Typography>
            <Box>
              <ArrowLink href={site.bizwhatsUrl} external>
                {site.bizwhatsLabel}
              </ArrowLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </ToneContext>
  );
}

export default function Contact() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact · Email only"
        title="Let's talk about what you're building."
        lead="Projects, product enquiries, partnerships, support, or a sharp question about software. We respond to every serious message within one working day."
      />

      <Section tone="alt">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: { xs: 6, lg: 8 }, alignItems: 'start' }}>
          <Box>
            <SectionHead index="01" label="Write to us" title="Pick a topic. We'll fill in the rest." />
            <EmailComposer />
            <Typography variant="body2" sx={{ mt: 4, color: color.ink2 }}>
              Prefer your own words? Write to{' '}
              <Box component="a" href={mailto()} sx={{ color: 'inherit', fontWeight: 600 }}>
                {site.email}
              </Box>{' '}
              and we'll point you to the right person.
            </Typography>
          </Box>
          <Details />
        </Box>
      </Section>

      <Section>
        <SectionHead index="02" label="What to write about" title="A few good reasons to get in touch." />
        <NumberedList
          items={[
            { title: 'You have a project', body: 'Custom software, automation, an AI system or a website. Tell us the problem and who handles it today.' },
            { title: 'You run a business', body: `See if BizWhats can keep your customers coming back. Write to ${site.supportEmail} for a demo in your language.` },
            { title: 'You build in construction', body: 'Interested in ACIP for project risk intelligence? Email us to request a briefing.' },
            { title: "You're a partner", body: 'You see a distribution, integration, or joint-product opportunity. We would like to hear it.' },
            { title: 'You want to join', body: "You're an engineer or designer who likes how we build. Send a short note and a link to your work." },
            { title: "You're a BizWhats customer", body: `Product support lives at ${site.supportEmail}, staffed by the people who build it.` },
          ]}
        />
      </Section>
    </>
  );
}
