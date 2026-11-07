import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { maxWidth } from '../../theme/tokens';

interface WrapProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  component?: ElementType;
}

/** Centred column. Horizontal padding only, so it never fights section rhythm. */
export function Wrap({ children, sx, component = 'div' }: WrapProps) {
  return (
    <Box
      component={component}
      sx={[
        { width: '100%', maxWidth, mx: 'auto', px: { xs: '20px', sm: '32px', md: '48px' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
