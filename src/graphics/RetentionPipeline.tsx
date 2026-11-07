import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import type { StatusKind } from '../content/site';
import { StatusPill } from '../components/ui/StatusPill';
import { useToneColors } from '../theme/tone';
import { font } from '../theme/tokens';

const ENGINES: Array<{ name: string; body: string; status: StatusKind }> = [
  { name: 'Scout', body: 'Collects leads from Maps, JustDial, IndiaMART and search.', status: 'production' },
  { name: 'Enrich', body: 'Scores intent. Hottest first.', status: 'production' },
  { name: 'Outreach', body: "First message, in the lead's language.", status: 'active' },
  { name: 'Follow-up', body: 'Reads replies. Hands hot leads to a human.', status: 'rolling' },
  { name: 'Close', body: 'Trial to paid, via Razorpay.', status: 'rolling' },
  { name: 'Retain', body: 'Check-ins and churn alerts.', status: 'rolling' },
];

/** Six engines lit in sequence as you scroll, over the database they all share. */
export function RetentionPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const c = useToneColors();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 65%'] });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setReached(v <= 0.01 ? 0 : Math.min(ENGINES.length, Math.floor(v * ENGINES.length) + 1));
  });

  const shown = reduce ? ENGINES.length : reached;

  return (
    <Box ref={ref}>
      <Box aria-hidden="true" sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative', height: 2, borderRadius: 2, bgcolor: c.line, mb: 3 }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #41F0D2, #5CC8FF)',
            boxShadow: '0 0 14px rgba(65,240,210,0.7)',
            scaleX: reduce ? 1 : scrollYProgress,
            transformOrigin: '0% 50%',
          }}
        />
      </Box>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        {ENGINES.map((e, i) => {
          const on = i < shown;
          return (
            <Box
              component="li"
              key={e.name}
              sx={{
                p: 2.5,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                border: `1px ${e.status === 'rolling' ? 'dashed' : 'solid'} ${on ? 'rgba(65,240,210,0.45)' : c.line}`,
                bgcolor: on ? 'rgba(65,240,210,0.06)' : 'transparent',
                boxShadow: on ? '0 20px 50px -30px rgba(65,240,210,0.6)' : 'none',
                opacity: on ? 1 : 0.5,
                transform: on ? 'none' : 'translateY(6px)',
                transition: 'all .6s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: `1.5px solid ${on ? c.teal : c.fg3}`,
                  bgcolor: on && e.status !== 'rolling' ? c.teal : 'transparent',
                  boxShadow: on ? '0 0 12px rgba(65,240,210,0.9)' : 'none',
                  transition: 'all .4s',
                }}
              />
              <Typography variant="h4" component="h3">
                {e.name}
              </Typography>
              <Typography variant="body2" sx={{ color: c.fg2, flex: 1 }}>
                {e.body}
              </Typography>
              <Box>
                <StatusPill status={e.status} />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: 3, pt: 2, borderTop: `1px dashed ${c.lineStrong}`, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.05em', color: c.fg3 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="2.6" />
          <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
          <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" />
        </svg>
        <span>ONE SHARED DATABASE: EACH ENGINE WRITES, THE NEXT READS</span>
      </Box>
    </Box>
  );
}
