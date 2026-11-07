import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { useToneColors } from '../../theme/tone';

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

/** An endless, pausable ticker. Static and wrapped for reduced-motion users. */
export function Marquee({ items, seconds = 46 }: { items: string[]; seconds?: number }) {
  const c = useToneColors();
  const row = (duplicate: boolean) => (
    <Box
      component="ul"
      aria-hidden={duplicate || undefined}
      sx={{ display: 'flex', flexShrink: 0, alignItems: 'center', listStyle: 'none', m: 0, p: 0 }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(1.7rem, 1rem + 2.6vw, 3.2rem)',
            fontWeight: 520,
            fontStretch: '112%',
            letterSpacing: '-0.035em',
            lineHeight: 1.25,
            '&::after': { content: '"/"', mx: { xs: 2.5, md: 4 }, color: c.fg3, fontWeight: 300 },
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        '&:hover .marquee-track': { animationPlayState: 'paused' },
        '@media (prefers-reduced-motion: reduce)': { maskImage: 'none' },
      }}
    >
      <Box
        className="marquee-track"
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${slide} ${seconds}s linear infinite`,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            width: 'auto',
            px: { xs: '20px', sm: '32px', md: '48px' },
            '& > ul': { flexWrap: 'wrap', flexShrink: 1, rowGap: 1 },
            '& > ul:nth-of-type(2)': { display: 'none' },
          },
        }}
      >
        {row(false)}
        {row(true)}
      </Box>
    </Box>
  );
}
