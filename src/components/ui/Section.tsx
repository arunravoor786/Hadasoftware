import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { ToneContext, toneColors, type Tone } from '../../theme/tone';
import { rhythm } from '../../theme/tokens';
import { Wrap } from './Wrap';

interface SectionProps {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  sx?: SxProps<Theme>;
  /** `none` lets the caller set its own vertical padding (used by page heads). */
  pad?: 'normal' | 'none';
  labelledBy?: string;
}

export function Section({ id, tone = 'paper', children, sx, pad = 'normal', labelledBy }: SectionProps) {
  const c = toneColors(tone);
  return (
    <ToneContext value={tone}>
      <Box
        component="section"
        id={id}
        aria-labelledby={labelledBy}
        data-tone={tone}
        sx={[
          { bgcolor: c.bg, color: c.fg, position: 'relative', py: pad === 'none' ? 0 : rhythm },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Wrap>{children}</Wrap>
      </Box>
    </ToneContext>
  );
}
