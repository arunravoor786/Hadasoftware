import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Tone } from '../../theme/tone';
import { color } from '../../theme/tokens';
import { EmailBlock } from './EmailBlock';
import { GlowCard } from './GlowCard';
import { Reveal } from './Reveal';
import { Section } from './Section';

interface CtaSectionProps {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  email?: string;
  subject?: string;
  body?: string;
  extra?: ReactNode;
  tone?: Tone;
  id?: string;
}

/** Every page ends the same way: one luminous panel, one next step, and it is an email. */
export function CtaSection({ label = "Let's talk", title, lead, email, subject, body, extra, tone = 'paper', id }: CtaSectionProps) {
  return (
    <Section tone={tone} id={id}>
      <Reveal>
        <GlowCard accent="iris" bg={color.paperAlt} radius={28}>
          <Box sx={{ position: 'relative', overflow: 'hidden', px: { xs: 3, sm: 5, md: 8 }, py: { xs: 6, md: 9 } }}>
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                right: '-12%',
                top: '-55%',
                width: '62%',
                aspectRatio: '1',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(140,123,255,0.38), transparent 65%)',
              }}
            />
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: '-14%',
                bottom: '-60%',
                width: '52%',
                aspectRatio: '1',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(65,240,210,0.2), transparent 65%)',
              }}
            />
            <Box sx={{ position: 'relative' }}>
              <Typography variant="mono" component="p" sx={{ color: color.ink2 }}>
                {label}
              </Typography>
              <Typography variant="h2" sx={{ mt: 2, fontSize: 'clamp(2.2rem, 1.3rem + 3.2vw, 4.2rem)' }}>
                {title}
              </Typography>
              {lead && (
                <Typography variant="lead" sx={{ mt: 2, color: color.ink2, maxWidth: '46ch' }}>
                  {lead}
                </Typography>
              )}
              <Box sx={{ mt: { xs: 4, md: 5 } }}>
                <EmailBlock email={email} subject={subject} body={body} />
              </Box>
              {extra && <Box sx={{ mt: 3 }}>{extra}</Box>}
            </Box>
          </Box>
        </GlowCard>
      </Reveal>
    </Section>
  );
}
