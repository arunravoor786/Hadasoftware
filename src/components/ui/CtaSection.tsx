import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { Tone } from '../../theme/tone';
import { EmailBlock } from './EmailBlock';
import { Section } from './Section';
import { SectionHead } from './SectionHead';

interface CtaSectionProps {
  index?: string;
  label?: string;
  title: ReactNode;
  lead: ReactNode;
  email?: string;
  subject?: string;
  body?: string;
  extra?: ReactNode;
  tone?: Tone;
  id?: string;
}

/** Every page ends the same way: one clear next step, and it is an email. */
export function CtaSection({ index, label = 'Next step', title, lead, email, subject, body, extra, tone = 'alt', id }: CtaSectionProps) {
  return (
    <Section tone={tone} id={id}>
      <SectionHead index={index} label={label} title={title} lead={lead}>
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <EmailBlock email={email} subject={subject} body={body} />
          {extra && <Box sx={{ mt: 4 }}>{extra}</Box>}
        </Box>
      </SectionHead>
    </Section>
  );
}
