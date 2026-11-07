import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CheckIcon } from '../components/ui/icons';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';

const LAYERS = [
  { n: '01', name: 'Data model', meta: 'Schema · migrations' },
  { n: '02', name: 'Engines & APIs', meta: 'FastAPI · typed contracts' },
  { n: '03', name: 'Automations', meta: 'Schedulers · queues · webhooks' },
  { n: '04', name: 'AI layer', meta: 'Vision · scoring · RAG' },
  { n: '05', name: 'Interface', meta: 'React · TypeScript · MUI' },
  { n: '06', name: 'Ship & observe', meta: 'Docker · CI/CD · audit logs' },
];
const TOTAL = LAYERS.length * 2;
const HOLD = 4;

/** "Prove every layer": each layer is built, smoke-tested, then the next goes on top. */
export function LayerStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [step, setStep] = useState(TOTAL);

  useEffect(() => {
    if (!inView || reduce) return;
    let n = 0;
    setStep(0);
    const timer = window.setInterval(() => {
      n = (n + 1) % (TOTAL + HOLD + 1);
      setStep(Math.min(n, TOTAL));
    }, 650);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const s = reduce ? TOTAL : step;
  const built = Math.ceil(s / 2);
  const tested = Math.floor(s / 2);
  const ready = tested === LAYERS.length;

  return (
    <Box
      ref={ref}
      role="img"
      aria-label="A software stack built from the bottom up: data model, engines and APIs, automations, AI layer, interface, then ship and observe. Each layer is smoke-tested before the next is added."
      sx={{ border: `1px solid ${c.lineStrong}`, bgcolor: c.surface, maxWidth: 520, mx: { lg: 'auto' } }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          borderBottom: `1px solid ${c.line}`,
          fontFamily: font.mono,
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          color: c.fg3,
        }}
      >
        <span>BUILD SHEET</span>
        <Box component="span" sx={{ color: ready ? c.teal : c.fg3, transition: 'color .3s' }}>
          {ready ? 'READY TO SHIP' : `LAYER ${String(Math.max(built, 1)).padStart(2, '0')} / 06`}
        </Box>
      </Box>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column-reverse', gap: 1, minHeight: 6 * 58 + 5 * 8 + 32 }}>
        <AnimatePresence initial={false}>
          {LAYERS.slice(0, built).map((layer, i) => {
            const ok = i < tested;
            return (
              <motion.div
                key={layer.n}
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '3ch minmax(0, 1fr) auto',
                    alignItems: 'center',
                    gap: 2,
                    height: 58,
                    px: 2,
                    border: `1px solid ${ok ? c.lineStrong : c.line}`,
                    bgcolor: c.bg,
                    transition: 'border-color .3s',
                  }}
                >
                  <Box sx={{ fontFamily: font.mono, fontSize: '0.72rem', color: c.fg3 }}>{layer.n}</Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.2 }}>{layer.name}</Box>
                    <Box sx={{ fontFamily: font.mono, fontSize: '0.68rem', color: c.fg3, mt: 0.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {layer.meta}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      fontFamily: font.mono,
                      fontSize: '0.64rem',
                      letterSpacing: '0.07em',
                      color: ok ? c.teal : c.fg3,
                    }}
                  >
                    {ok ? <CheckIcon size={14} /> : null}
                    {ok ? 'TESTED' : 'BUILDING'}
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
