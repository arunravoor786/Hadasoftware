import { useEffect, useRef, type CSSProperties } from 'react';
import Box from '@mui/material/Box';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { color, font } from '../theme/tokens';

/*
 * Fig. 1: a lemniscate (figure-eight). Left lobe = BizWhats retention loop,
 * right lobe = ACIP risk loop, crossing point = the database both rely on.
 * Particles are moved imperatively (refs + rAF) so React never re-renders per frame.
 */

const W = 640;
const H = 500;
const CX = W / 2;
const CY = H / 2;
const A = 250;
const YS = 1.42;
const TAU = Math.PI * 2;
const PARTICLES = 6;
const TRAIL = 5;
const SPEED = 0.36; // radians per second
const START_CLOCK = 2.4;

function point(t: number): [number, number] {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return [CX + (A * c) / d, CY + (YS * A * s * c) / d];
}

function wrapAngle(a: number) {
  return ((((a + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
}

const particleT = (i: number, clock: number) => (i / PARTICLES) * TAU + clock * SPEED;

const LOOP_PATH = (() => {
  const parts: string[] = [];
  const n = 360;
  for (let i = 0; i <= n; i++) {
    const [x, y] = point((i / n) * TAU);
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(' ');
})();

interface Stage {
  t: number;
  label: string;
  risk: boolean;
  above: boolean;
}

// Listed in travel order around each lobe.
const STAGES: Stage[] = [
  { t: -1.0, label: 'Observe', risk: true, above: true },
  { t: -0.33, label: 'Score', risk: true, above: true },
  { t: 0.33, label: 'Decide', risk: true, above: false },
  { t: 1.0, label: 'Escalate', risk: true, above: false },
  { t: Math.PI - 1.0, label: 'Find', risk: false, above: true },
  { t: Math.PI - 0.33, label: 'Reach', risk: false, above: true },
  { t: Math.PI + 0.33, label: 'Convert', risk: false, above: false },
  { t: Math.PI + 1.0, label: 'Retain', risk: false, above: false },
];

const INITIAL = Array.from({ length: PARTICLES * TRAIL }, (_, idx) => {
  const i = Math.floor(idx / TRAIL);
  const k = idx % TRAIL;
  return point(particleT(i, START_CLOCK) - k * 0.05);
});

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROWS = ['1', '2', '3', '4', '5'];

export function LoopSchematic() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const nodes = useRef<(SVGGElement | null)[]>([]);
  const ring = useRef<SVGCircleElement>(null);
  const clock = useRef(START_CLOCK);
  const signs = useRef<number[]>(new Array<number>(PARTICLES).fill(0));
  const inView = useInView(svgRef, { margin: '120px 0px 120px 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const draw = (dt: number) => {
      clock.current += dt;
      const activation = new Array<number>(STAGES.length).fill(0);
      let crossed = false;
      for (let i = 0; i < PARTICLES; i++) {
        const t = particleT(i, clock.current);
        for (let k = 0; k < TRAIL; k++) {
          const el = dots.current[i * TRAIL + k];
          if (!el) continue;
          const [x, y] = point(t - k * 0.05);
          el.setAttribute('cx', x.toFixed(1));
          el.setAttribute('cy', y.toFixed(1));
          el.setAttribute('fill', x < CX ? color.tealBright : color.signal);
        }
        for (let j = 0; j < STAGES.length; j++) {
          const d = Math.abs(wrapAngle(t - STAGES[j].t));
          if (d < 0.22) activation[j] = Math.max(activation[j], 1 - d / 0.22);
        }
        const sign = Math.sign(Math.cos(t));
        if (signs.current[i] !== 0 && sign !== signs.current[i]) crossed = true;
        signs.current[i] = sign;
      }
      nodes.current.forEach((g, j) => g?.style.setProperty('--a', activation[j].toFixed(3)));
      if (crossed && dt > 0) {
        ring.current?.animate(
          [
            { transform: 'scale(1)', opacity: 0.7 },
            { transform: 'scale(2.6)', opacity: 0 },
          ],
          { duration: 1100, easing: 'cubic-bezier(.22,1,.36,1)' },
        );
      }
    };

    if (reduce || !inView) {
      draw(0);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const mono: CSSProperties = { fontFamily: font.mono };

  return (
    <Box sx={{ width: '100%', '& .minor': { display: { xs: 'none', sm: 'inline' } } }}>
      <svg
        ref={svgRef}
        viewBox="-30 -30 700 560"
        width="100%"
        role="img"
        aria-labelledby="loop-title loop-desc"
        style={{ display: 'block' }}
      >
        <title id="loop-title">Two closed loops sharing one database</title>
        <desc id="loop-desc">
          A figure-eight diagram. The left loop is BizWhats customer retention: find, reach, convert, retain. The right
          loop is ACIP risk intelligence: observe, score, decide, escalate. Both pass through a database at the centre;
          every engine writes to it and the next one reads from it.
        </desc>

        <defs>
          <pattern id="loop-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill={color.ink} opacity="0.16" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#loop-dots)" />

        {/* Rulers: grid references along the top and left edges, like a plotted sheet. */}
        <g className="minor" stroke={color.ink3} strokeWidth="1" opacity="0.7">
          {Array.from({ length: W / 20 + 1 }, (_, i) => (
            <line key={`tx${i}`} x1={i * 20} x2={i * 20} y1={i % 4 === 0 ? -9 : -5} y2={0} />
          ))}
          {Array.from({ length: H / 20 + 1 }, (_, i) => (
            <line key={`ty${i}`} y1={i * 20} y2={i * 20} x1={i % 5 === 0 ? -9 : -5} x2={0} />
          ))}
        </g>
        <g className="minor" style={mono} fontSize="10" fill={color.ink3} letterSpacing="0.08em">
          {COLS.map((l, i) => (
            <text key={l} x={i * 80 + 40} y={-14} textAnchor="middle">
              {l}
            </text>
          ))}
          {ROWS.map((r, i) => (
            <text key={r} x={-16} y={i * 100 + 54} textAnchor="middle">
              {r}
            </text>
          ))}
        </g>

        {/* Lobe titles */}
        <g style={mono} textAnchor="middle">
          <text x={176} y={226} fontSize="10" letterSpacing="0.12em" fill={color.ink3}>
            LOOP A
          </text>
          <text x={176} y={252} fontSize="23" fontWeight="600" fill={color.ink} style={{ fontFamily: font.sans, letterSpacing: '-0.02em' }}>
            Retention
          </text>
          <text x={176} y={273} fontSize="11" letterSpacing="0.08em" fill={color.teal}>
            BIZWHATS
          </text>
          <text x={464} y={226} fontSize="10" letterSpacing="0.12em" fill={color.ink3}>
            LOOP B
          </text>
          <text x={464} y={252} fontSize="23" fontWeight="600" fill={color.ink} style={{ fontFamily: font.sans, letterSpacing: '-0.02em' }}>
            Risk
          </text>
          <text x={464} y={273} fontSize="11" letterSpacing="0.08em" fill={color.orange}>
            ACIP · LRIE
          </text>
        </g>

        {/* The loop itself: a soft underlay and a crisp line that draws itself in. */}
        <path d={LOOP_PATH} fill="none" stroke={color.ink} strokeOpacity="0.05" strokeWidth="14" />
        <motion.path
          d={LOOP_PATH}
          fill="none"
          stroke={color.ink}
          strokeWidth="1.4"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* Direction of travel at each extreme. */}
        <path d={`M${CX + A - 6} ${CY - 4} L${CX + A} ${CY + 6} L${CX + A + 6} ${CY - 4}`} fill="none" stroke={color.ink} strokeWidth="1.4" />
        <path d={`M${CX - A - 6} ${CY - 4} L${CX - A} ${CY + 6} L${CX - A + 6} ${CY - 4}`} fill="none" stroke={color.ink} strokeWidth="1.4" />

        {/* Stage nodes, lit by passing particles through the --a custom property. */}
        {STAGES.map((s, j) => {
          const [x, y] = point(s.t);
          const accent = s.risk ? color.signal : color.tealBright;
          return (
            <g
              key={s.label}
              ref={(el) => {
                nodes.current[j] = el;
              }}
              style={{ '--a': 0 } as CSSProperties}
            >
              <circle
                cx={x}
                cy={y}
                r={9}
                fill={color.paper}
                stroke={accent}
                strokeWidth={1.6}
                style={{ transformBox: 'fill-box', transformOrigin: 'center', transform: 'scale(calc(1 + var(--a) * 0.45))' }}
              />
              <circle cx={x} cy={y} r={3.4} fill={accent} style={{ opacity: 'calc(0.35 + var(--a) * 0.65)' }} />
              <text
                x={x}
                y={s.above ? y - 21 : y + 31}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="500"
                letterSpacing="0.07em"
                fill={color.ink}
                style={{ ...mono, opacity: 'calc(0.55 + var(--a) * 0.45)' }}
              >
                {s.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Database at the crossing point. */}
        <circle
          ref={ring}
          cx={CX}
          cy={CY}
          r={20}
          fill="none"
          stroke={color.ink}
          strokeWidth={1}
          style={{ transformBox: 'fill-box', transformOrigin: 'center', opacity: 0 }}
        />
        <circle cx={CX} cy={CY} r={20} fill={color.paper} stroke={color.ink} strokeWidth={1.5} />
        <g fill="none" stroke={color.ink} strokeWidth={1.4}>
          <ellipse cx={CX} cy={CY - 6} rx={8} ry={3} />
          <path d={`M${CX - 8} ${CY - 6} v11 a8 3 0 0 0 16 0 v-11`} />
          <path d={`M${CX - 8} ${CY - 0.5} a8 3 0 0 0 16 0`} strokeOpacity={0.55} />
        </g>
        <line x1={CX} x2={CX} y1={CY + 26} y2={430} stroke={color.ink} strokeWidth={1} strokeDasharray="2 4" />
        <g style={mono} textAnchor="middle">
          <text x={CX} y={452} fontSize="11.5" letterSpacing="0.06em" fill={color.ink}>
            DATABASE — EVERY ENGINE WRITES, THE NEXT ONE READS
          </text>
          <text className="minor" x={CX} y={470} fontSize="10" letterSpacing="0.08em" fill={color.ink3}>
            STORAGE-MEDIATED ARCHITECTURE
          </text>
        </g>

        {/* Particles with short trails. */}
        {INITIAL.map(([x, y], idx) => {
          const k = idx % TRAIL;
          return (
            <circle
              key={idx}
              ref={(el) => {
                dots.current[idx] = el;
              }}
              cx={x}
              cy={y}
              r={k === 0 ? 4.2 : 3.6 - k * 0.55}
              opacity={k === 0 ? 1 : 0.55 - k * 0.1}
              fill={x < CX ? color.tealBright : color.signal}
            />
          );
        })}

        {/* Registration marks. */}
        <g stroke={color.ink} strokeWidth="1" opacity="0.5" className="minor">
          {[
            [0, 0],
            [W, 0],
            [0, H],
            [W, H],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 7} x2={x + 7} y1={y} y2={y} />
              <line x1={x} x2={x} y1={y - 7} y2={y + 7} />
              <circle cx={x} cy={y} r={3.5} fill="none" />
            </g>
          ))}
        </g>
      </svg>
    </Box>
  );
}
