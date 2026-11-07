import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Figure } from '../components/ui/Figure';
import { useToneColors } from '../theme/tone';
import { color, font } from '../theme/tokens';
import { RiskGauge } from './RiskGauge';

const STATES = [
  {
    id: 'DATA_RECEIVED',
    title: 'Observe',
    body: 'Ingests site camera images, inspection photos, PDF reports, CSV logs, IoT streams, and manual entries. Each input is typed and routed to the right AI module.',
  },
  {
    id: 'PREPROCESSING',
    title: 'Validate',
    body: 'Pydantic v2 schema validation, image resolution checks, document completeness verification, and duplicate detection before anything enters the pipeline.',
  },
  {
    id: 'MODEL_EXEC',
    title: 'Execute',
    body: 'YOLOv8 for vision, XGBoost for risk, an LLM for documents: the right model runs for the input type.',
  },
  {
    id: 'CONFIDENCE',
    title: 'Score',
    body: 'A calibrated enterprise confidence score (0.0–1.0), not a raw model output, weighing model confidence, historical accuracy, and context such as time, phase and weather.',
  },
  {
    id: 'DECISION',
    title: 'Decide',
    body: 'Maps the score to a risk class: LOW (log only), MEDIUM (dashboard flag), HIGH (notify the safety officer and retrieve the protocol), CRITICAL (executive escalation and possible work stoppage).',
  },
  {
    id: 'ACTION',
    title: 'Escalate & mitigate',
    body: 'Role-based escalation routes to the right person; RAG retrieves the specific applicable protocol via the Groq LLM for an actionable mitigation, not a generic rule.',
  },
  {
    id: 'LOGGED',
    title: 'Close',
    body: 'The full reasoning chain, from detection to resolution, is preserved in the PostgreSQL audit log with timestamps, responsible parties, and outcome.',
  },
];

/** The seven LRIE states, advanced by scroll, beside a sticky confidence gauge. */
export function LrieStateMachine() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const c = useToneColors();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 60%'] });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v <= 0.005 ? -1 : Math.min(STATES.length - 1, Math.floor(v * STATES.length)));
  });

  const current = reduce ? STATES.length - 1 : active;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' },
        gap: { xs: 8, lg: 8 },
        alignItems: 'start',
      }}
    >
      <Box ref={listRef} sx={{ position: 'relative', pl: '44px' }}>
        <Box aria-hidden="true" sx={{ position: 'absolute', left: '11px', top: 10, bottom: 10, width: 2, bgcolor: c.line }}>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: c.orange,
              scaleY: reduce ? 1 : scrollYProgress,
              transformOrigin: '50% 0%',
            }}
          />
        </Box>
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 4, md: 5 } }}>
          {STATES.map((s, i) => {
            const on = i <= current;
            const now = i === current;
            const tint = s.id === 'ACTION' ? color.critical : c.orange;
            return (
              <Box component="li" key={s.id} sx={{ position: 'relative' }} aria-current={now ? 'step' : undefined}>
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    left: '-40px',
                    top: 3,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: `2px solid ${on ? tint : c.lineStrong}`,
                    bgcolor: now ? tint : c.bg,
                    boxShadow: now ? `0 0 0 6px ${s.id === 'ACTION' ? 'rgba(255,79,58,0.18)' : 'rgba(255,106,26,0.16)'}` : 'none',
                    transition: 'all .35s ease',
                  }}
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: font.mono,
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      px: 1,
                      py: '2px',
                      border: `1px solid ${on ? tint : c.line}`,
                      color: on ? tint : c.fg3,
                      transition: 'all .35s ease',
                    }}
                  >
                    {s.id}
                  </Box>
                  <Typography variant="h4" component="h3" sx={{ color: on ? c.fg : c.fg2, transition: 'color .35s' }}>
                    {s.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, maxWidth: '60ch', color: on ? c.fg2 : c.fg3, transition: 'color .35s' }}>
                  {s.body}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ position: { lg: 'sticky' }, top: { lg: 112 } }}>
        <Figure n="4" caption="Confidence becomes a decision" note="Illustrative values">
          <Box sx={{ p: { xs: 2.5, md: 3.5 }, border: `1px solid ${c.line}`, bgcolor: c.surface }}>
            <RiskGauge />
          </Box>
        </Figure>
      </Box>
    </Box>
  );
}
