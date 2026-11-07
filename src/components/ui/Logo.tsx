import Box from '@mui/material/Box';

/**
 * The Hadasoft mark: an H whose crossbar is a node, two systems joined by a
 * closed loop. Drawn in currentColor so it works on paper and on night.
 */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
      <rect x="3.5" y="3" width="4.6" height="22" rx="1" fill="currentColor" />
      <rect x="19.9" y="3" width="4.6" height="22" rx="1" fill="currentColor" />
      <path d="M8.1 14h2.5M17.4 14h2.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="3.3" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'inherit' }}>
      <LogoMark size={size} />
      <Box
        component="span"
        sx={{ fontWeight: 640, fontStretch: '112%', fontSize: '1.2rem', letterSpacing: '-0.035em', lineHeight: 1 }}
      >
        Hadasoft
      </Box>
    </Box>
  );
}
