import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { color, ease, font } from '../theme/tokens';

const EXAMPLES = [
  { v: 0.34, cls: 'LOW', act: 'Log only' },
  { v: 0.52, cls: 'MEDIUM', act: 'Flag on the dashboard' },
  { v: 0.72, cls: 'HIGH', act: 'Notify the safety officer and retrieve the protocol' },
  { v: 0.91, cls: 'CRITICAL', act: 'Executive escalation; possible work stoppage' },
];

const x = (v: number) => 20 + v * 500;

/** Confidence (0.0–1.0) mapped to a decision, with the two real thresholds marked. */
export function RiskGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [i, setI] = useState(2);
  const ex = EXAMPLES[i];

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 2800);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const tint = ex.cls === 'CRITICAL' ? color.critical : ex.cls === 'HIGH' ? color.signal : ex.cls === 'MEDIUM' ? c.fg : c.fg2;

  return (
    <Box ref={ref}>
      <svg viewBox="0 0 540 112" width="100%" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
        <rect x={x(0.6)} y={30} width={x(0.8) - x(0.6)} height={40} fill={color.signal} opacity={0.14} />
        <rect x={x(0.8)} y={30} width={x(1) - x(0.8)} height={40} fill={color.critical} opacity={0.2} />
        <line x1={x(0)} x2={x(1)} y1={70} y2={70} stroke={c.fg2} strokeWidth={1} />
        {Array.from({ length: 11 }, (_, k) => (
          <line key={k} x1={x(k / 10)} x2={x(k / 10)} y1={70} y2={k % 5 === 0 ? 80 : 75} stroke={c.fg2} strokeWidth={1} />
        ))}
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={x(v)} y={96} textAnchor="middle" fontFamily={font.mono} fontSize="11" fill={c.fg3}>
            {v.toFixed(1)}
          </text>
        ))}
        {[
          { v: 0.6, label: 'RETRIEVE PROTOCOL · 0.6', anchor: 'end' as const, dx: -7 },
          { v: 0.8, label: '0.8 · ESCALATE', anchor: 'start' as const, dx: 7 },
        ].map((t) => (
          <g key={t.v}>
            <line x1={x(t.v)} x2={x(t.v)} y1={10} y2={76} stroke={c.fg} strokeWidth={1} strokeDasharray="3 3" />
            <text x={x(t.v) + t.dx} y={20} textAnchor={t.anchor} fontFamily={font.mono} fontSize="12" letterSpacing="0.04em" fill={c.fg}>
              {t.label}
            </text>
          </g>
        ))}
        <motion.g initial={false} animate={{ x: x(ex.v) - x(0) }} transition={{ duration: 0.9, ease }}>
          <line x1={x(0)} x2={x(0)} y1={34} y2={70} stroke={tint} strokeWidth={2.5} />
          <path d={`M${x(0) - 7} 30 h14 l-7 9 z`} fill={tint} />
        </motion.g>
      </svg>

      <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', columnGap: 2.5, alignItems: 'baseline' }}>
        <Box className="tnum" sx={{ fontSize: '2.4rem', fontWeight: 560, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {ex.v.toFixed(2)}
        </Box>
        <Box>
          <Box sx={{ fontFamily: font.mono, fontSize: '0.75rem', letterSpacing: '0.08em', color: tint }}>{ex.cls}</Box>
          <Box sx={{ mt: 0.5, color: c.fg2, fontSize: '0.95rem', lineHeight: 1.45 }}>{ex.act}</Box>
        </Box>
      </Box>
    </Box>
  );
}
