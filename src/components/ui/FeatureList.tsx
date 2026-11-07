import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useToneColors } from '../../theme/tone';
import { gradient } from '../../theme/tokens';
import { Reveal } from './Reveal';

export interface FeatureItem {
  title: string;
  body: ReactNode;
}

/** A short list: hairline with a gradient tick, a title, one line. */
export function FeatureList({ items, columns = 3 }: { items: FeatureItem[]; columns?: 2 | 3 | 4 }) {
  const c = useToneColors();
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: `repeat(${columns}, minmax(0, 1fr))` },
        columnGap: { xs: 3, md: 4 },
        rowGap: { xs: 4, md: 5 },
      }}
    >
      {items.map((item, i) => (
        <Box component="li" key={item.title}>
          <Reveal delay={(i % columns) * 0.07}>
            <Box
              sx={{
                position: 'relative',
                pt: 2.5,
                borderTop: `1px solid ${c.line}`,
                '&::before': { content: '""', position: 'absolute', top: -1, left: 0, width: 44, height: 2, background: gradient.iris },
              }}
            >
              <Typography variant="h4" component="h3">
                {item.title}
              </Typography>
              <Typography variant="body2" component="div" sx={{ mt: 1, color: c.fg2 }}>
                {item.body}
              </Typography>
            </Box>
          </Reveal>
        </Box>
      ))}
    </Box>
  );
}
