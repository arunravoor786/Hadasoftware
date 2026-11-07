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

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: color.ink, contrastText: color.paper },
    secondary: { main: color.teal, contrastText: '#ffffff' },
    background: { default: color.paper, paper: color.card },
    text: { primary: color.ink, secondary: color.ink2 },
    divider: color.line,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: font.sans,
    display: {
      ...heading,
      fontSize: 'clamp(2.3rem, 1.25rem + 3.1vw, 3.7rem)',
      fontWeight: 560,
      fontStretch: '110%',
      letterSpacing: '-0.032em',
      lineHeight: 1.02,
    },
    h1: {
      ...heading,
      fontSize: 'clamp(2.2rem, 1.3rem + 2.9vw, 3.8rem)',
      fontWeight: 560,
      fontStretch: '110%',
      letterSpacing: '-0.03em',
      lineHeight: 1.03,
    },
    h2: {
      ...heading,
      fontSize: 'clamp(1.85rem, 1.25rem + 1.9vw, 2.85rem)',
      fontWeight: 560,
      fontStretch: '108%',
      letterSpacing: '-0.026em',
      lineHeight: 1.07,
    },
    h3: {
      ...heading,
      fontSize: 'clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem)',
      fontWeight: 580,
      fontStretch: '104%',
      letterSpacing: '-0.016em',
      lineHeight: 1.16,
    },
    h4: { ...heading, fontSize: '1.15rem', fontWeight: 600, fontStretch: '102%', letterSpacing: '-0.008em', lineHeight: 1.3 },
    h5: { ...heading, fontSize: '1rem', fontWeight: 620, letterSpacing: '-0.004em', lineHeight: 1.35 },
    h6: { ...heading, fontSize: '0.95rem', fontWeight: 620, lineHeight: 1.35 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.62 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    lead: {
      fontFamily: font.sans,
      fontSize: 'clamp(1.08rem, 0.98rem + 0.35vw, 1.28rem)',
      fontWeight: 400,
      lineHeight: 1.52,
      letterSpacing: '-0.004em',
    },
    mono: { ...monoBase, letterSpacing: '0.07em', textTransform: 'uppercase' },
    overline: { ...monoBase, letterSpacing: '0.07em' },
    caption: { ...monoBase, fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.55 },
    button: { fontFamily: font.sans, fontWeight: 580, fontSize: '0.95rem', textTransform: 'none', letterSpacing: '-0.005em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': { colorScheme: 'light' },
        html: { scrollPaddingTop: '96px', WebkitTextSizeAdjust: '100%' },
        body: {
          backgroundColor: color.paper,
          color: color.ink,
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': { backgroundColor: color.ink, color: color.paper },
        a: { color: 'inherit' },
        ':focus-visible': { outline: `2px solid ${color.tealBright}`, outlineOffset: '3px' },
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
          borderRadius: 2,
          padding: '11px 18px',
          gap: 2,
          transition: 'background-color .2s ease, color .2s ease, border-color .2s ease',
          '& .MuiButton-endIcon, & .MuiButton-startIcon': { transition: 'transform .25s cubic-bezier(.22,1,.36,1)' },
          '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
        },
      },
      variants: [
        { props: { size: 'large' }, style: { padding: '14px 22px', fontSize: '1rem' } },
        { props: { size: 'small' }, style: { padding: '7px 12px', fontSize: '0.875rem' } },
        {
          props: { variant: 'contained', color: 'primary' },
          style: { backgroundColor: color.ink, color: color.paper, '&:hover': { backgroundColor: '#000' } },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderColor: 'currentColor',
            color: 'inherit',
            borderWidth: 1,
            '&:hover': { backgroundColor: 'rgba(127,127,127,0.08)', borderColor: 'currentColor' },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 2, color: 'inherit' } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { fontFamily: font.mono, fontSize: '0.72rem', backgroundColor: color.ink, borderRadius: 2 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontFamily: font.sans, minHeight: 0 },
      },
    },
  },
});
