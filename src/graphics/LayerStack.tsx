import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CheckIcon } from '../components/ui/icons';
import { color, ease, font, gradient } from '../theme/tokens';

const LAYERS = [
  { name: 'Data model', meta: 'Schema · migrations', tint: '#5CE1E6' },
  { name: 'Engines & APIs', meta: 'FastAPI · typed contracts', tint: '#78A9FF' },
  { name: 'Automations', meta: 'Schedulers · queues · webhooks', tint: '#8C7BFF' },
  { name: 'AI layer', meta: 'Vision · scoring · RAG', tint: '#C27CFF' },
  { name: 'Interface', meta: 'React · TypeScript · MUI', tint: '#FF7AB6' },
  { name: 'Ship & observe', meta: 'Docker · CI/CD · audit logs', tint: '#FFB547' },
];
const TOTAL = LAYERS.length * 2;
const HOLD = 4;

/** "Prove every layer": each layer is built, tested, then the next goes on top. */
export function LayerStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
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
      aria-label="A software stack built from the bottom up: data model, engines and APIs, automations, AI layer, interface, then ship and observe. Each layer is tested before the next is added."
      sx={{
        borderRadius: '22px',
        p: '1px',
        background: gradient.violet,
        maxWidth: 520,
        mx: { lg: 'auto' },
        boxShadow: '0 40px 100px -50px rgba(140,123,255,0.8)',
      }}
    >
      <Box sx={{ borderRadius: '21px', bgcolor: color.card, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2.5, py: 1.5, borderBottom: `1px solid ${color.line}`, fontFamily: font.mono, fontSize: '0.68rem', letterSpacing: '0.08em', color: color.ink3 }}>
          <span>BUILD SHEET</span>
          <Box component="span" sx={{ color: ready ? color.teal : color.ink3, transition: 'color .3s' }}>
            {ready ? 'READY TO SHIP' : 'BUILDING'}
          </Box>
        </Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column-reverse', gap: 1, minHeight: 6 * 58 + 5 * 8 + 32 }}>
          <AnimatePresence initial={false}>
            {LAYERS.slice(0, built).map((layer, i) => {
              const ok = i < tested;
              return (
                <motion.div key={layer.name} initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '10px minmax(0, 1fr) auto',
                      alignItems: 'center',
                      gap: 2,
                      height: 58,
                      px: 2,
                      borderRadius: '12px',
                      border: `1px solid ${ok ? 'rgba(180,187,221,0.24)' : color.line}`,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      transition: 'border-color .3s',
                    }}
                  >
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: layer.tint, boxShadow: `0 0 12px ${layer.tint}` }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Box sx={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.2 }}>{layer.name}</Box>
                      <Box sx={{ fontFamily: font.mono, fontSize: '0.68rem', color: color.ink3, mt: 0.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{layer.meta}</Box>
                    </Box>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, fontFamily: font.mono, fontSize: '0.64rem', letterSpacing: '0.07em', color: ok ? color.teal : color.ink3 }}>
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
    </Box>
  );
}
