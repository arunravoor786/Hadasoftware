import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useToneColors } from '../../theme/tone';
import { font } from '../../theme/tokens';

interface FigureProps {
  caption: ReactNode;
  note?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/** A figure with a quiet mono caption underneath. */
export function Figure({ caption, note, children, sx }: FigureProps) {
  const c = useToneColors();
  return (
    <Box component="figure" sx={[{ m: 0, minWidth: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
      <Box
        component="figcaption"
        sx={{
          mt: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '4px 16px',
          fontFamily: font.mono,
          fontSize: '0.72rem',
          letterSpacing: '0.02em',
          color: c.fg3,
        }}
      >
        <span>{caption}</span>
        {note && <span>{note}</span>}
      </Box>
    </Box>
  );
}
