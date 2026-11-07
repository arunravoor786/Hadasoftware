import { createContext, useContext } from 'react';
import { color } from './tokens';

/** The surface a component sits on. Sections provide it; components read it. */
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
  night: boolean;
}

export function toneColors(tone: Tone): ToneColors {
  if (tone === 'night') {
    return {
      bg: color.night,
      fg: color.onNight,
      fg2: color.onNight2,
      fg3: color.onNight3,
      line: color.nightLine,
      lineStrong: color.nightLineStrong,
      surface: color.night2,
      teal: color.tealBright,
      orange: color.signal,
      night: true,
    };
  }
  return {
    bg: tone === 'alt' ? color.paperAlt : color.paper,
    fg: color.ink,
    fg2: color.ink2,
    fg3: color.ink3,
    line: color.line,
    lineStrong: color.lineStrong,
    surface: color.card,
    teal: color.teal,
    orange: color.orange,
    night: false,
  };
}

export const useToneColors = () => toneColors(useTone());
