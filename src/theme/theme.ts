import type { CSSProperties } from 'react';
import { createTheme } from '@mui/material/styles';
import { color, font } from './tokens';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    display: CSSProperties;
    lead: CSSProperties;
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: CSSProperties;
    lead?: CSSProperties;
    mono?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    lead: true;
    mono: true;
  }
}

const heading: CSSProperties = { fontFamily: font.sans, textWrap: 'balance' };
const monoBase: CSSProperties = { fontFamily: font.mono, fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.45 };

/** A tiny tileable noise texture for film grain (static, no animation cost). */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: color.ink, contrastText: color.paper },
    secondary: { main: color.violet, contrastText: '#ffffff' },
    background: { default: color.paper, paper: color.card },
    text: { primary: color.ink, secondary: color.ink2 },
    divider: color.line,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: font.sans,
    display: {
      ...heading,
      fontSize: 'clamp(2.6rem, 1.3rem + 3.9vw, 4.6rem)',
      fontWeight: 600,
      fontStretch: '112%',
      letterSpacing: '-0.038em',
      lineHeight: 0.98,
    },
    h1: {
      ...heading,
      fontSize: 'clamp(2.3rem, 1.3rem + 3.1vw, 4rem)',
      fontWeight: 580,
      fontStretch: '110%',
      letterSpacing: '-0.034em',
      lineHeight: 1.02,
    },
    h2: {
      ...heading,
      fontSize: 'clamp(1.9rem, 1.25rem + 2vw, 3rem)',
      fontWeight: 580,
      fontStretch: '108%',
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
    },
    h3: {
      ...heading,
      fontSize: 'clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem)',
      fontWeight: 590,
      fontStretch: '104%',
      letterSpacing: '-0.018em',
      lineHeight: 1.16,
    },
    h4: { ...heading, fontSize: '1.15rem', fontWeight: 610, fontStretch: '102%', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h5: { ...heading, fontSize: '1rem', fontWeight: 620, letterSpacing: '-0.004em', lineHeight: 1.35 },
    h6: { ...heading, fontSize: '0.95rem', fontWeight: 620, lineHeight: 1.35 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.62 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    lead: {
      fontFamily: font.sans,
      fontSize: 'clamp(1.08rem, 0.98rem + 0.35vw, 1.28rem)',
      fontWeight: 400,
      lineHeight: 1.55,
      letterSpacing: '-0.004em',
    },
    mono: { ...monoBase, letterSpacing: '0.08em', textTransform: 'uppercase' },
    overline: { ...monoBase, letterSpacing: '0.08em' },
    caption: { ...monoBase, fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.55 },
    button: { fontFamily: font.sans, fontWeight: 600, fontSize: '0.95rem', textTransform: 'none', letterSpacing: '-0.005em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': { colorScheme: 'dark' },
        html: { scrollPaddingTop: '96px', WebkitTextSizeAdjust: '100%' },
        body: {
          backgroundColor: color.paper,
          color: color.ink,
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        // Film grain over everything, very faint; it gives the dark surfaces depth.
        'body::after': {
          content: '""',
          position: 'fixed',
          inset: 0,
          zIndex: 3000,
          pointerEvents: 'none',
          backgroundImage: GRAIN,
          opacity: 0.045,
        },
        '::selection': { backgroundColor: color.violet, color: '#ffffff' },
        a: { color: 'inherit' },
        ':focus-visible': { outline: `2px solid ${color.teal}`, outlineOffset: '3px' },
        '.tnum': { fontVariantNumeric: 'tabular-nums' },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: { display: 'h1', lead: 'p', mono: 'span' },
      },
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '11px 20px',
          gap: 2,
          transition: 'background-color .25s ease, color .25s ease, border-color .25s ease, box-shadow .3s ease, transform .3s cubic-bezier(.22,1,.36,1)',
          '& .MuiButton-endIcon, & .MuiButton-startIcon': { transition: 'transform .25s cubic-bezier(.22,1,.36,1)' },
          '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
        },
      },
      variants: [
        { props: { size: 'large' }, style: { padding: '14px 26px', fontSize: '1rem' } },
        { props: { size: 'small' }, style: { padding: '7px 14px', fontSize: '0.875rem' } },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: color.ink,
            color: color.paper,
            boxShadow: '0 0 0 0 rgba(140,123,255,0)',
            '&:hover': {
              backgroundColor: '#ffffff',
              boxShadow: '0 0 0 6px rgba(140,123,255,0.18), 0 12px 40px -10px rgba(140,123,255,0.65)',
              transform: 'translateY(-1px)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderColor: 'rgba(180,187,221,0.32)',
            color: 'inherit',
            backgroundColor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(6px)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(180,187,221,0.6)' },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 999, color: 'inherit' } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { fontFamily: font.mono, fontSize: '0.72rem', backgroundColor: color.card, borderRadius: 8 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontFamily: font.sans, minHeight: 0 },
      },
    },
  },
});
