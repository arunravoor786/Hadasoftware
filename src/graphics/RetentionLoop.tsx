import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';

const STEPS = [
  { name: 'Find', body: 'Discovers and scores high-intent leads from public sources, ready for outreach.' },
  { name: 'Reach', body: "Sends personalised WhatsApp messages in the customer's native language." },
  { name: 'Convert', body: 'Manages the reply thread and moves prospects from trial to paid via Razorpay.' },
  { name: 'Retain', body: 'Keeps customers engaged with timely, automated re-engagement and check-ins.' },
];

const C = 160;
const R = 118;

function nodePos(i: number): [number, number] {
  const a = ((i * 90 - 90) * Math.PI) / 180;
  return [C + R * Math.cos(a), C + R * Math.sin(a)];
}

function arcTo(i: number) {
  const [x0, y0] = nodePos((i + 3) % 4);
  const [x1, y1] = nodePos(i);
  return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}`;
}

const LABEL_POS: Array<{ dx: number; dy: number; anchor: 'middle' | 'start' | 'end' }> = [
  { dx: 0, dy: -20, anchor: 'middle' },
  { dx: 18, dy: 4, anchor: 'start' },
  { dx: 0, dy: 30, anchor: 'middle' },
  { dx: -18, dy: 4, anchor: 'end' },
];

/** Find → Reach → Convert → Retain, as the loop it is. Click a stage to inspect it. */
export function RetentionLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const rot = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(0);

  useMotionValueEvent(rot, 'change', (v) => {
    const a = ((v % 360) + 360) % 360;
    setActive(Math.floor(((a + 45) % 360) / 90));
  });

  useEffect(() => {
    if (!inView || reduce || hold) return;
    const from = rot.get();
    const controls = animate(rot, from + 360, { duration: 11, ease: 'linear', repeat: Infinity });
    return () => controls.stop();
  }, [inView, reduce, hold, rot]);

  useEffect(() => {
    if (!hold) return;
    const t = window.setTimeout(() => setHold(0), 6000);
    return () => window.clearTimeout(t);
  }, [hold]);

  const select = (i: number) => {
    const current = rot.get();
    const delta = ((((i * 90 - current) % 360) + 540) % 360) - 180;
    setHold((h) => h + 1);
    animate(rot, current + delta, { duration: 0.7, ease });
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
        gap: { xs: 5, md: 8 },
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 400, width: '100%', mx: { xs: 'auto', md: 0 } }}>
        <svg viewBox="-60 -10 440 345" width="100%" aria-hidden="true" style={{ display: 'block' }}>
          <circle cx={C} cy={C} r={R} fill="none" stroke={c.lineStrong} strokeWidth={1} />
          <circle cx={C} cy={C} r={R - 24} fill="none" stroke={c.line} strokeDasharray="2 6" />
          <motion.path
            key={active}
            d={arcTo(active)}
            fill="none"
            stroke={c.teal}
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease }}
          />
          <motion.g style={{ rotate: rot }}>
            <circle cx={C} cy={C} r={R} fill="none" stroke="none" />
            <circle cx={C} cy={C - R} r={5.5} fill={c.teal} />
          </motion.g>
          {STEPS.map((s, i) => {
            const [x, y] = nodePos(i);
            const lp = LABEL_POS[i];
            const on = i === active;
            return (
              <g key={s.name}>
                <circle cx={x} cy={y} r={on ? 9 : 7} fill={on ? c.teal : c.bg} stroke={on ? c.teal : c.fg} strokeWidth={1.5} style={{ transition: 'r .3s, fill .3s' }} />
                <text
                  x={x + lp.dx}
                  y={y + lp.dy}
                  textAnchor={lp.anchor}
                  fontFamily={font.mono}
                  fontSize="12.5"
                  letterSpacing="0.08em"
                  fill={on ? c.fg : c.fg3}
                >
                  {s.name.toUpperCase()}
                </text>
              </g>
            );
          })}
          <text x={C} y={C - 4} textAnchor="middle" fontFamily={font.mono} fontSize="10.5" letterSpacing="0.1em" fill={c.fg3}>
            RETENTION LOOP
          </text>
          <text x={C} y={C + 18} textAnchor="middle" fontSize="15" fontWeight="600" fill={c.fg}>
            runs on its own
          </text>
        </svg>
      </Box>

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <Box component="li" key={s.name} sx={{ borderTop: `1px solid ${c.line}`, '&:last-of-type': { borderBottom: `1px solid ${c.line}` } }}>
              <Box
                component="button"
                type="button"
                onClick={() => select(i)}
                aria-pressed={on}
                sx={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '3ch 8rem minmax(0, 1fr)',
                  alignItems: 'baseline',
                  gap: 2,
                  py: 2.25,
                  pl: 2,
                  borderLeft: `2px solid ${on ? c.teal : 'transparent'}`,
                  transition: 'border-color .3s, background-color .3s',
                  bgcolor: on ? (c.night ? 'rgba(255,255,255,0.03)' : 'rgba(17,20,24,0.03)') : 'transparent',
                  '&:focus-visible': { outline: `2px solid ${c.teal}`, outlineOffset: '-2px' },
                  '@media (max-width: 599.95px)': { gridTemplateColumns: '3ch minmax(0, 1fr)', '& .step-body': { gridColumn: '2' } },
                }}
              >
                <Typography variant="mono" sx={{ color: on ? c.teal : c.fg3 }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography variant="h4" component="span" sx={{ color: on ? c.fg : c.fg2 }}>
                  {s.name}
                </Typography>
                <Typography className="step-body" variant="body2" component="span" sx={{ color: on ? c.fg2 : c.fg3 }}>
                  {s.body}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
