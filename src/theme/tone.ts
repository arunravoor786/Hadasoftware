import { createContext, useContext } from 'react';
import { color } from './tokens';

/** The surface a component sits on: base canvas, lifted band, or deepest band. */
export type Tone = 'paper' | 'alt' | 'night';

export const ToneContext = createContext<Tone>('paper');

export const useTone = () => useContext(ToneContext);

export interface ToneColors {
  bg: string;
  fg: string;
  fg2: string;
  fg3: string;
  line: string;
  lineStrong: string;
  surface: string;
  teal: string;
  orange: string;
  /** Every surface is dark in this theme; kept for components that tint hovers. */
  night: boolean;
}

export function toneColors(tone: Tone): ToneColors {
  return {
    bg: tone === 'night' ? color.night : tone === 'alt' ? color.paperAlt : color.paper,
    fg: color.ink,
    fg2: color.ink2,
    fg3: color.ink3,
    line: color.line,
    lineStrong: color.lineStrong,
    surface: tone === 'night' ? color.night2 : color.card,
    teal: color.teal,
    orange: color.orange,
    night: true,
  };
}

export const useToneColors = () => toneColors(useTone());
