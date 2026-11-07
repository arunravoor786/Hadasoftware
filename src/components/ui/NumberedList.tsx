import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useToneColors } from '../../theme/tone';
import { Reveal } from './Reveal';

export interface NumberedItem {
  title: string;
  body: ReactNode;
}

/** Editorial numbered list: hairline, index, heading, body. Replaces icon-card grids. */
export function NumberedList({ items, columns = 3 }: { items: NumberedItem[]; columns?: 2 | 3 | 4 }) {
  const c = useToneColors();
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: `repeat(${columns}, minmax(0, 1fr))`,
        },
        columnGap: { xs: 4, md: 5 },
        rowGap: { xs: 5, md: 7 },
      }}
    >
      {items.map((item, i) => (
        <Box component="li" key={item.title}>
          <Reveal delay={(i % columns) * 0.07}>
            <Box sx={{ borderTop: `1px solid ${c.lineStrong}`, pt: 2.5 }}>
              <Typography variant="mono" sx={{ color: c.fg3 }}>
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h4" component="h3" sx={{ mt: 1.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" component="div" sx={{ mt: 1.25, color: c.fg2 }}>
                {item.body}
              </Typography>
            </Box>
          </Reveal>
        </Box>
      ))}
    </Box>
  );
}
