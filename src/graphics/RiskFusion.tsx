import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { color, ease, font } from '../theme/tokens';

const FACTORS = [
  { k: 'PPE', v: 'Missing hard hat', score: 0.62 },
  { k: 'Height', v: 'Working on the 12th floor', score: 0.69 },
  { k: 'Weather', v: '20 mph wind', score: 0.76 },
  { k: 'History', v: "This trade's 3rd violation this week", score: 0.85 },
  { k: 'Schedule', v: 'Crane pick in 30 minutes', score: 0.94 },
];
const VERDICT = FACTORS.length + 1;
const HOLD_TICKS = 4;

/** ACIP hero: compounding factors fuse into one calibrated score, HIGH becomes CRITICAL. */
export function RiskFusion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [step, setStep] = useState(VERDICT);
  const score = useMotionValue(FACTORS[FACTORS.length - 1].score);
  const scoreText = useTransform(score, (v) => v.toFixed(2));
  const barWidth = useTransform(score, (v) => `${(v * 100).toFixed(1)}%`);

  useEffect(() => {
    if (!inView || reduce) return;
    let n = 0;
    setStep(0);
    const timer = window.setInterval(() => {
      n = (n + 1) % (VERDICT + HOLD_TICKS + 1);
      setStep(Math.min(n, VERDICT));
    }, 1150);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const current = step === 0 ? 0 : FACTORS[Math.min(step, FACTORS.length) - 1].score;

  useEffect(() => {
    if (reduce) {
      score.set(current);
      return;
    }
    const controls = animate(score, current, { duration: 0.7, ease });
    return () => controls.stop();
  }, [current, reduce, score]);

  const cls = current >= 0.8 ? 'CRITICAL' : current >= 0.6 ? 'HIGH' : '—';
  const clsColor = cls === 'CRITICAL' ? color.critical : cls === 'HIGH' ? color.signal : c.fg3;
  const done = step === VERDICT;

  return (
    <Box
      ref={ref}
      role="img"
      aria-label="Illustration of risk fusion. A missing hard hat on its own is rated HIGH by a simple rule. Combined with working on the 12th floor, 20 mph wind, the trade's third violation this week and a crane pick in 30 minutes, LRIE scores the situation 0.94, CRITICAL, and escalates with specific mitigation steps."
      sx={{
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid rgba(255,122,89,0.38)',
        bgcolor: c.surface,
        boxShadow: '0 50px 110px -50px rgba(255,122,89,0.6)',
        fontFamily: font.mono,
        fontSize: '0.8rem',
        maxWidth: 540,
        mx: { lg: 'auto' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          px: 2.5,
          py: 1.5,
          borderBottom: `1px solid ${c.line}`,
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          color: c.fg3,
        }}
      >
        <span>LRIE · RISK FUSION</span>
        <span>ZONE C · LEVEL 12</span>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline', color: c.fg3, mb: 2 }}>
          <Box component="span" sx={{ fontSize: '0.66rem', letterSpacing: '0.08em' }}>
            RULE-BASED
          </Box>
          <Box component="span" sx={{ position: 'relative', color: c.fg2 }}>
            missing hard hat = HIGH
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ scaleX: done ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
              style={{ position: 'absolute', left: -2, right: -2, top: '52%', height: 1.5, background: color.critical, transformOrigin: '0% 50%' }}
            />
          </Box>
        </Box>

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {FACTORS.map((f, i) => {
            const on = step > i;
            return (
              <motion.li
                key={f.k}
                initial={false}
                animate={{ opacity: on ? 1 : 0.16, x: on ? 0 : -6 }}
                transition={{ duration: 0.45, ease }}
                style={{ display: 'grid', gridTemplateColumns: '1.4ch 9ch minmax(0,1fr)', gap: 10, padding: '7px 0', borderTop: `1px solid ${c.line}` }}
              >
                <span style={{ color: color.signal }}>+</span>
                <span style={{ color: c.fg3, letterSpacing: '0.06em' }}>{f.k.toUpperCase()}</span>
                <span style={{ color: c.fg, fontFamily: font.sans, fontSize: '0.92rem' }}>{f.v}</span>
              </motion.li>
            );
          })}
        </Box>

        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${c.lineStrong}` }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
            <Box component="span" sx={{ fontSize: '0.66rem', letterSpacing: '0.08em', color: c.fg3 }}>
              FUSED RISK
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
              <motion.span className="tnum" style={{ fontFamily: font.sans, fontSize: '2rem', fontWeight: 560, color: c.fg, letterSpacing: '-0.02em' }}>
                {scoreText}
              </motion.span>
              <Box component="span" sx={{ color: clsColor, letterSpacing: '0.08em', fontWeight: 500, minWidth: '9ch', textAlign: 'right' }}>
                {cls}
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', height: 8, mt: 1.5, bgcolor: c.line }}>
            <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: barWidth, background: cls === 'CRITICAL' ? color.critical : color.signal }} />
            {[0.6, 0.8].map((t) => (
              <Box key={t} sx={{ position: 'absolute', left: `${t * 100}%`, top: -4, bottom: -4, width: '1px', bgcolor: c.fg }} />
            ))}
          </Box>
          <Box sx={{ position: 'relative', height: 16, mt: 0.5, fontSize: '0.62rem', color: c.fg3 }}>
            <Box component="span" sx={{ position: 'absolute', left: '60%', transform: 'translateX(-50%)' }}>0.6</Box>
            <Box component="span" sx={{ position: 'absolute', left: '80%', transform: 'translateX(-50%)' }}>0.8</Box>
          </Box>
          <motion.div
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
            transition={{ duration: 0.5, ease }}
            style={{ marginTop: 10, color: c.fg, fontFamily: font.sans, fontSize: '0.95rem', lineHeight: 1.45 }}
          >
            <span style={{ color: color.critical, fontFamily: font.mono, fontSize: '0.75rem', letterSpacing: '0.06em' }}>→ CRITICAL </span>
            executive escalation, with specific mitigation steps retrieved for this exact situation.
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
