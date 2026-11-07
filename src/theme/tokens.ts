/**
 * Design tokens. Every colour here has been checked for WCAG AA contrast on the
 * surface it is meant for (text colours on paper, "bright" accents on night).
 */
export const color = {
  // Surfaces
  paper: '#F3F1EA',
  paperAlt: '#EAE6DB',
  card: '#FAF9F5',
  night: '#0D1013',
  night2: '#14191E',
  night3: '#1B2127',

  // Ink (on paper)
  ink: '#111418',
  ink2: '#454A52',
  ink3: '#62676F',
  line: 'rgba(17, 20, 24, 0.14)',
  lineStrong: 'rgba(17, 20, 24, 0.34)',

  // Ink (on night)
  onNight: '#EDEBE4',
  onNight2: '#A3A7AD',
  onNight3: '#8A8F96',
  nightLine: 'rgba(237, 235, 228, 0.14)',
  nightLineStrong: 'rgba(237, 235, 228, 0.32)',

  // Meaningful accents: teal = retention (BizWhats), orange = risk (ACIP)
  teal: '#0B7A6C', // text-safe on paper
  tealBright: '#1FB89F', // graphics on paper, text on night
  orange: '#B8460B', // text-safe on paper
  signal: '#FF6A1A', // graphics on paper, text on night
  critical: '#FF4F3A', // CRITICAL states on night
} as const;

export const font = {
  sans: '"Archivo Variable", "Nirmala UI", "Noto Sans Devanagari", "Noto Sans Tamil", "Noto Sans Telugu", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
} as const;

/** House easing: fast start, long settle. */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** One vertical rhythm, used at every section seam. */
export const rhythm = 'clamp(56px, 7vw, 104px)';

export const maxWidth = 1320;
