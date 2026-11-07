import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useToneColors } from '../../theme/tone';
import { font } from '../../theme/tokens';

interface FigureProps {
  n?: string;
  caption: ReactNode;
  note?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  /** Draw registration marks at the corners, like a plotted drawing. */
  marks?: boolean;
}

const corner = (v: 'top' | 'bottom', h: 'left' | 'right', color: string) => ({
  position: 'absolute' as const,
  width: 12,
  height: 12,
  [v]: -1,
  [h]: -1,
  [`border${v === 'top' ? 'Top' : 'Bottom'}`]: `1px solid ${color}`,
  [`border${h === 'left' ? 'Left' : 'Right'}`]: `1px solid ${color}`,
  pointerEvents: 'none' as const,
});

export function Figure({ n, caption, note, children, sx, marks = true }: FigureProps) {
  const c = useToneColors();
  return (
    <Box component="figure" sx={[{ m: 0, minWidth: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box sx={{ position: 'relative' }}>
        {marks && (
          <>
            <Box aria-hidden="true" sx={corner('top', 'left', c.lineStrong)} />
            <Box aria-hidden="true" sx={corner('top', 'right', c.lineStrong)} />
            <Box aria-hidden="true" sx={corner('bottom', 'left', c.lineStrong)} />
            <Box aria-hidden="true" sx={corner('bottom', 'right', c.lineStrong)} />
          </>
        )}
        {children}
      </Box>
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
        <span>
          {n && <>Fig. {n} — </>}
          {caption}
        </span>
        {note && <span>{note}</span>}
      </Box>
    </Box>
  );
}
