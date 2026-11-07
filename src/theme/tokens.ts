/**
 * Design tokens: "Iridescent Midnight".
 * A deep indigo canvas (evolved from the original brand navy) with luminous
 * accents. Token names are semantic roles: `paper` is the default page surface,
 * `ink` the primary text. Every text colour passes WCAG AA on the surfaces it sits on.
 */
export const color = {
  // Surfaces
  paper: '#070A1D', // base canvas
  paperAlt: '#0B0F2A', // lifted band
  card: '#11163A', // raised surface
  night: '#04050F', // deepest band, footer
  night2: '#0E1233',
  night3: '#151B45',

  // Text and lines
  ink: '#F3F5FF',
  ink2: '#B4BBDD',
  ink3: '#8089B3',
  line: 'rgba(180, 187, 221, 0.13)',
  lineStrong: 'rgba(180, 187, 221, 0.28)',
  onNight: '#F3F5FF',
  onNight2: '#B4BBDD',
  onNight3: '#8089B3',
  nightLine: 'rgba(180, 187, 221, 0.13)',
  nightLineStrong: 'rgba(180, 187, 221, 0.28)',

  // Meaningful accents: aqua = retention (BizWhats), coral = risk (ACIP), violet = Hadasoft
  teal: '#41F0D2',
  tealBright: '#41F0D2',
  orange: '#FF8A5B',
  signal: '#FF7A59',
  critical: '#FF4D6D',
  violet: '#8C7BFF',
  sky: '#5CC8FF',
  pink: '#FF7AB6',
  amber: '#FFB547',
  glass: 'rgba(255, 255, 255, 0.045)',
  glassStrong: 'rgba(255, 255, 255, 0.08)',
} as const;

export const gradient = {
  /** The signature: aqua → violet → pink → amber. Use sparingly. */
  iris: 'linear-gradient(100deg, #5CE1E6 0%, #8C7BFF 40%, #FF7AB6 72%, #FFB547 100%)',
  rule: 'linear-gradient(90deg, rgba(92,225,230,0.6), rgba(140,123,255,0.4) 35%, rgba(180,187,221,0.12) 70%, rgba(180,187,221,0.08))',
  aqua: 'linear-gradient(135deg, rgba(65,240,210,0.55), rgba(92,200,255,0.25) 40%, rgba(180,187,221,0.08) 70%)',
  coral: 'linear-gradient(135deg, rgba(255,122,89,0.6), rgba(255,122,182,0.25) 40%, rgba(180,187,221,0.08) 70%)',
  violet: 'linear-gradient(135deg, rgba(140,123,255,0.6), rgba(92,225,230,0.22) 45%, rgba(180,187,221,0.08) 72%)',
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
