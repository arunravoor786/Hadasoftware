import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useToneColors } from '../../theme/tone';
import { gradient } from '../../theme/tokens';
import { Reveal } from './Reveal';
import { Rule } from './Rule';

interface SectionHeadProps {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Rendered under the lead, inside the content column. */
  children?: ReactNode;
}

/** Section opening: a gradient hairline, a small label, the heading and one line of lead. */
export function SectionHead({ label, title, lead, id, children }: SectionHeadProps) {
  const c = useToneColors();
  return (
    <Box sx={{ mb: children ? 0 : { xs: 5, md: 7 } }}>
      <Rule />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: { md: 4 },
          rowGap: 2,
          pt: { xs: 2.5, md: 3 },
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 3' } }}>
          <Typography variant="mono" component="p" sx={{ color: c.fg2, display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              component="span"
              aria-hidden="true"
              sx={{ width: 7, height: 7, borderRadius: '50%', background: gradient.iris, boxShadow: '0 0 12px rgba(140,123,255,0.9)' }}
            />
            {label}
          </Typography>
        </Box>
        <Box sx={{ gridColumn: { md: '4 / span 9', lg: '4 / span 8' } }}>
          <Reveal>
            <Typography variant="h2" id={id}>
              {title}
            </Typography>
          </Reveal>
          {lead && (
            <Reveal delay={0.08}>
              <Typography variant="lead" sx={{ mt: 2, color: c.fg2, maxWidth: '52ch' }}>
                {lead}
              </Typography>
            </Reveal>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
