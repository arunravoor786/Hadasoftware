import { useRef, type ElementType, type PointerEvent, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { gradient } from '../../theme/tokens';

export type GlowAccent = 'aqua' | 'coral' | 'violet' | 'iris';

const BORDER: Record<GlowAccent, string> = {
  aqua: gradient.aqua,
  coral: gradient.coral,
  violet: gradient.violet,
  iris: gradient.iris,
};
const SPOT: Record<GlowAccent, string> = {
  aqua: '65,240,210',
  coral: '255,122,89',
  violet: '140,123,255',
  iris: '140,123,255',
};

interface GlowCardProps {
  children: ReactNode;
  accent?: GlowAccent;
  radius?: number;
  bg: string;
  component?: ElementType;
  sx?: SxProps<Theme>;
  labelledBy?: string;
}

/**
 * A glass card with a luminous gradient border and a soft spotlight that follows
 * the cursor (pointer devices only; touch gets the static card).
 */
export function GlowCard({ children, accent = 'violet', radius = 20, bg, component = 'div', sx, labelledBy }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Box
      ref={ref}
      component={component}
      aria-labelledby={labelledBy}
      onPointerMove={onMove}
      sx={[
        {
          '--mx': '50%',
          '--my': '0%',
          position: 'relative',
          height: '100%',
          borderRadius: `${radius}px`,
          p: '1px',
          background: BORDER[accent],
          transition: 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s ease',
          '@media (hover: hover)': {
            '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 30px 80px -40px rgba(${SPOT[accent]},0.55)` },
            '&:hover .glow-spot': { opacity: 1 },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ position: 'relative', height: '100%', borderRadius: `${radius - 1}px`, bgcolor: bg, overflow: 'hidden' }}>
        <Box
          className="glow-spot"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity .35s ease',
            background: `radial-gradient(520px circle at var(--mx) var(--my), rgba(${SPOT[accent]},0.14), transparent 45%)`,
          }}
        />
        <Box sx={{ position: 'relative', height: '100%' }}>{children}</Box>
      </Box>
    </Box>
  );
}
