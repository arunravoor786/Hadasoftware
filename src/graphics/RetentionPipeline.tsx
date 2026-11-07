import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import type { StatusKind } from '../content/site';
import { StatusPill } from '../components/ui/StatusPill';
import { useToneColors } from '../theme/tone';
import { font } from '../theme/tokens';

const ENGINES: Array<{ n: string; name: string; body: string; status: StatusKind }> = [
  {
    n: '01',
    name: 'Scout',
    body: "Pulls leads from Google Maps, JustDial, IndiaMART, and SerpAPI. Normalises contact data and tags each lead's language.",
    status: 'production',
  },
  { n: '02', name: 'Enrich', body: 'Scores each lead on completeness and intent signals, surfacing the hottest prospects first.', status: 'production' },
  { n: '03', name: 'Outreach', body: "Sends first-touch WhatsApp messages in the lead's native language, with sector-tailored demos.", status: 'active' },
  { n: '04', name: 'Follow-up', body: 'Keeps threads alive, classifies reply intent, and escalates hot conversations to a human inbox.', status: 'rolling' },
  { n: '05', name: 'Close', body: 'Handles the trial-to-paid moment through Razorpay and activates the customer account.', status: 'rolling' },
  { n: '06', name: 'Retain', body: 'Runs periodic check-ins, monitors usage, and flags churn risk before customers leave.', status: 'rolling' },
];

/** Six engines lit in sequence as you scroll; the database rail underneath is the hand-off. */
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
      <Box aria-hidden="true" sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative', height: 2, bgcolor: c.line, mb: 3 }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: c.teal,
            scaleX: reduce ? 1 : scrollYProgress,
            transformOrigin: '0% 50%',
          }}
        />
      </Box>

      <Box
        component="ol"
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
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                border: `1px ${e.status === 'rolling' ? 'dashed' : 'solid'} ${on ? c.lineStrong : c.line}`,
                bgcolor: on ? c.surface : 'transparent',
                opacity: on ? 1 : 0.5,
                transform: on ? 'none' : 'translateY(6px)',
                transition: 'background-color .5s, border-color .5s, opacity .5s, transform .6s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ fontFamily: font.mono, fontSize: '0.75rem', color: on ? c.teal : c.fg3 }}>{e.n}</Box>
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: `1.5px solid ${on ? c.teal : c.fg3}`,
                    bgcolor: on && e.status !== 'rolling' ? c.teal : 'transparent',
                    transition: 'all .4s',
                  }}
                />
              </Box>
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

      <Box
        sx={{
          mt: 3,
          pt: 2,
          borderTop: `1px dashed ${c.lineStrong}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          fontFamily: font.mono,
          fontSize: '0.72rem',
          letterSpacing: '0.05em',
          color: c.fg3,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="2.6" />
          <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
          <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" />
        </svg>
        <span>SUPABASE POSTGRES (MUMBAI): EVERY ENGINE WRITES HERE, THE NEXT ONE READS FROM HERE</span>
      </Box>
    </Box>
  );
}
