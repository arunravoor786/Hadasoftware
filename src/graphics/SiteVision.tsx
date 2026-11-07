import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { color, ease, font } from '../theme/tokens';

const DETECTIONS = [
  { id: 'ppe', x: 198, y: 88, w: 34, h: 36, label: 'NO HARD HAT · 0.91', lx: 120, ly: 82 },
  { id: 'edge', x: 228, y: 66, w: 52, h: 22, label: 'UNPROTECTED EDGE · 0.77', lx: 150, ly: 58 },
  { id: 'zone', x: 330, y: 104, w: 74, h: 96, label: 'LOAD PATH · 0.64', lx: 330, ly: 98 },
];

/** ACIP product plate: a schematic jobsite with vision detections appearing in turn. */
export function SiteVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [shown, setShown] = useState(DETECTIONS.length);

  useEffect(() => {
    if (!inView || reduce) return;
    let n = 0;
    setShown(0);
    const timer = window.setInterval(() => {
      n = (n + 1) % 7;
      setShown(Math.min(n, DETECTIONS.length));
    }, 1100);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const ink = c.fg3;

  return (
    <Box ref={ref}>
      <svg
        viewBox="0 0 560 230"
        width="100%"
        role="img"
        aria-label="Schematic of a construction site seen by a camera: a building frame, a tower crane and a worker. Vision detections flag a missing hard hat, an unprotected edge and the crane's load path."
        style={{ display: 'block' }}
      >
        <g fontFamily={font.mono} fontSize="10" letterSpacing="0.08em" fill={c.fg3}>
          <text x={14} y={20}>CAM-07 · LEVEL 3</text>
          <text x={546} y={20} textAnchor="end">
            YOLOV8N
          </text>
        </g>

        <line x1={10} x2={550} y1={200} y2={200} stroke={ink} strokeWidth="1.2" />
        {/* Building frame */}
        <g stroke={ink} strokeWidth="1.2" fill="none">
          {[60, 130, 200].map((x) => (
            <line key={x} x1={x} x2={x} y1={200} y2={80} />
          ))}
          <line x1={270} x2={270} y1={200} y2={124} />
          {[160, 124, 88].map((y) => (
            <line key={y} x1={60} x2={y === 88 ? 270 : 270} y1={y} y2={y} />
          ))}
          <line x1={60} x2={230} y1={80} y2={80} />
          {/* guardrail stops short of the edge */}
          <line x1={60} x2={226} y1={70} y2={70} strokeDasharray="3 3" />
        </g>
        {/* Worker on level 3 */}
        <g stroke={c.fg} strokeWidth="1.6" fill="none" strokeLinecap="round">
          <circle cx={215} cy={98} r={5} />
          <line x1={215} y1={103} x2={215} y2={114} />
          <line x1={215} y1={114} x2={210} y2={124} />
          <line x1={215} y1={114} x2={220} y2={124} />
          <line x1={215} y1={107} x2={208} y2={112} />
          <line x1={215} y1={107} x2={222} y2={111} />
        </g>
        {/* Tower crane */}
        <g stroke={ink} strokeWidth="1.2" fill="none">
          <line x1={426} x2={426} y1={200} y2={40} />
          <line x1={436} x2={436} y1={200} y2={40} />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={426} x2={436} y1={200 - i * 20} y2={180 - i * 20} />
          ))}
          <line x1={330} x2={540} y1={40} y2={40} />
          <line x1={330} x2={540} y1={46} y2={46} />
          <line x1={431} x2={380} y1={26} y2={40} />
          <line x1={431} x2={500} y1={26} y2={40} />
          <line x1={366} x2={366} y1={46} y2={112} />
          <rect x={358} y={112} width={16} height={12} />
        </g>

        {/* Scan sweep */}
        {!reduce && inView && (
          <motion.rect
            x={10}
            width={540}
            height={2}
            fill={color.signal}
            opacity={0.35}
            initial={{ y: 30 }}
            animate={{ y: [30, 200, 30] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <AnimatePresence>
          {DETECTIONS.slice(0, shown).map((d) => (
            <motion.g
              key={d.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="none" stroke={color.signal} strokeWidth="1.5" />
              <rect x={d.lx} y={d.ly - 11} width={d.label.length * 6.4 + 10} height={14} fill={color.signal} />
              <text x={d.lx + 5} y={d.ly} fontFamily={font.mono} fontSize="9.5" letterSpacing="0.04em" fill={color.night}>
                {d.label}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
    </Box>
  );
}
