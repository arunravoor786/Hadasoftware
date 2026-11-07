import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { mulberry32 } from '../lib/prng';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';

interface LogLine {
  id: number;
  time: string;
  system: 'BizWhats' | 'LRIE';
  event: string;
  detail: string;
}

type Entry = Omit<LogLine, 'id' | 'time'>;

/** An illustrative event stream. Event names mirror the real engine stages; values are simulated. */
function createFeed(seed = 11) {
  const rand = mulberry32(seed);
  const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(rand() * xs.length)];
  const two = (n: number) => n.toFixed(2);
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  const langs = ['mr', 'hi', 'ta', 'te', 'en'] as const;
  let id = 0;
  let ms = ((9 * 60 + 41) * 60 + 7) * 1000 + 231;
  let lead = 48213;
  let thread = 9120;
  let acct = 1307;
  let frame = 88412;
  let decision = 5521;

  const gens: Array<() => Entry> = [
    () => ({ system: 'BizWhats', event: 'scout.write', detail: `lead#${++lead} · src=${pick(['maps', 'justdial', 'indiamart', 'serp'] as const)} · lang=${pick(langs)}` }),
    () => ({ system: 'LRIE', event: 'DATA_RECEIVED', detail: `cam-${pad(2 + Math.floor(rand() * 10))} · frame ${++frame}` }),
    () => ({ system: 'BizWhats', event: 'enrich.score', detail: `lead#${lead} · intent ${two(0.42 + rand() * 0.5)}` }),
    () => ({ system: 'LRIE', event: 'CONFIDENCE', detail: `zone ${pick(['A', 'B', 'C', 'D'] as const)}${1 + Math.floor(rand() * 6)} · ${two(0.3 + rand() * 0.62)}` }),
    () => ({ system: 'BizWhats', event: 'outreach.send', detail: `lead#${lead} · ${pick(['salon', 'gym', 'clinic', 'coaching', 'retail'] as const)}_${pick(langs)}` }),
    () => {
      const [cls, action] = pick([
        ['LOW', 'log only'],
        ['MEDIUM', 'dashboard flag'],
        ['HIGH', 'notify safety officer'],
        ['HIGH', 'retrieve protocol'],
      ] as const);
      return { system: 'LRIE', event: 'DECISION', detail: `${cls} → ${action}` };
    },
    () => ({ system: 'BizWhats', event: 'followup.classify', detail: `thread#${++thread} · ${pick(['interested', 'question', 'later'] as const)}` }),
    () => ({ system: 'LRIE', event: 'LOGGED', detail: `decision#${++decision} · audit ok` }),
    () => ({ system: 'BizWhats', event: 'close.convert', detail: `acct#${++acct} · trial → paid` }),
    () => ({ system: 'BizWhats', event: 'retain.checkin', detail: `acct#${acct} · churn risk ${pick(['low', 'low', 'medium'] as const)}` }),
  ];

  let g = 0;
  return (): LogLine => {
    ms += 280 + Math.floor(rand() * 1300);
    const d = new Date(ms);
    const time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}.${pad(d.getUTCMilliseconds(), 3)}`;
    const entry = gens[g % gens.length]();
    g += 1;
    return { id: id++, time, ...entry };
  };
}

export function LiveLog({ rows = 8 }: { rows?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [feed] = useState(() => createFeed());
  const [lines, setLines] = useState<LogLine[]>(() => Array.from({ length: rows }, () => feed()));

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(() => {
      const next = feed();
      setLines((prev) => [...prev.slice(1), next]);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [inView, reduce, feed]);

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      sx={{
        fontFamily: font.mono,
        fontSize: { xs: '0.7rem', sm: '0.78rem' },
        lineHeight: 2.1,
        overflow: 'hidden',
        borderBottom: `1px solid ${c.line}`,
        '& .detail': { display: { xs: 'none', sm: 'block' } },
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{
              display: 'grid',
              gridTemplateColumns: '12.5ch 8.5ch 17ch minmax(0, 1fr)',
              columnGap: 16,
              whiteSpace: 'nowrap',
              borderTop: `1px solid ${c.line}`,
            }}
          >
            <span style={{ color: c.fg3 }}>{line.time}</span>
            <span style={{ color: line.system === 'LRIE' ? c.orange : c.teal }}>{line.system}</span>
            <span style={{ color: c.fg }}>{line.event}</span>
            <span className="detail" style={{ color: c.fg2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {line.detail}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
