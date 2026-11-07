import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import type { StatusKind } from '../../content/site';
import { useToneColors } from '../../theme/tone';
import { font } from '../../theme/tokens';

const pulse = keyframes`
  0% { transform: scale(1); opacity: .75; }
  100% { transform: scale(2.8); opacity: 0; }
`;

const LABELS: Record<StatusKind, string> = {
  production: 'In production',
  active: 'Active',
  rolling: 'Rolling out',
  development: 'In development',
};

/** Honest status: solid pulsing dot when running, hollow when rolling out. */
export function StatusPill({ status }: { status: StatusKind }) {
  const c = useToneColors();
  const tint = status === 'development' ? c.orange : status === 'rolling' ? c.fg3 : c.teal;
  const live = status === 'production' || status === 'active';
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: font.mono,
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: c.fg2,
        border: `1px solid ${c.line}`,
        borderRadius: '999px',
        px: '10px',
        py: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          position: 'relative',
          width: 7,
          height: 7,
          borderRadius: '50%',
          bgcolor: status === 'rolling' ? 'transparent' : tint,
          border: `1.5px solid ${tint}`,
          ...(live
            ? {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: '-1.5px',
                  borderRadius: '50%',
                  border: `1.5px solid ${tint}`,
                  animation: `${pulse} 2.4s ease-out infinite`,
                },
                '@media (prefers-reduced-motion: reduce)': { '&::after': { animation: 'none', opacity: 0 } },
              }
            : {}),
        }}
      />
      {LABELS[status]}
    </Box>
  );
}
