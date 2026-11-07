import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useToneColors } from '../../theme/tone';
import { Reveal } from './Reveal';
import { Rule } from './Rule';

interface SectionHeadProps {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Rendered under the lead, inside the content column. */
  children?: ReactNode;
}

/**
 * The spine of every section: a hairline, a mono label in the left margin
 * (§ index · label) and the heading in the content column.
 */
export function SectionHead({ index, label, title, lead, id, children }: SectionHeadProps) {
  const c = useToneColors();
  return (
    <Box sx={{ mb: children ? 0 : { xs: 6, md: 9 } }}>
      <Rule />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: { md: 4 },
          rowGap: 2.5,
          pt: { xs: 2.5, md: 3 },
        }}
      >
        <Box sx={{ gridColumn: { md: 'span 3' } }}>
          <Typography variant="mono" component="p" sx={{ color: c.fg3, display: 'flex', gap: 1.5 }}>
            {index && <span>§ {index}</span>}
            <span>{label}</span>
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
              <Typography variant="lead" sx={{ mt: 2.5, color: c.fg2, maxWidth: '60ch' }}>
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
