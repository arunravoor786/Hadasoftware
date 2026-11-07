import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { motion, useReducedMotion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { color, font } from '../theme/tokens';

const march = keyframes`to { stroke-dashoffset: -20; }`;

type Kind = 'node' | 'cond' | 'end';
const NODES: Array<{ id: string; kind: Kind; x: number }> = [
  { id: 'vision_node', kind: 'node', x: 90 },
  { id: 'risk_scoring_node', kind: 'node', x: 300 },
  { id: 'should_run_rag?', kind: 'cond', x: 510 },
  { id: 'rag_agent_node', kind: 'node', x: 720 },
  { id: 'should_escalate?', kind: 'cond', x: 930 },
  { id: 'escalation_node', kind: 'node', x: 1140 },
  { id: 'END', kind: 'end', x: 1330 },
];
const Y = 130;
const NODE_HALF = 75;
const COND_HALF = 82;
const half = (k: Kind) => (k === 'node' ? NODE_HALF : k === 'cond' ? COND_HALF : 36);
const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** LRIE as a LangGraph StateGraph: branches, not a chain. Desktop diagram, mobile list. */
export function GraphFlow() {
  const c = useToneColors();
  const reduce = useReducedMotion();
  const rag = byId('should_run_rag?');
  const esc = byId('should_escalate?');
  const end = byId('END');
  const label = { fontFamily: font.mono, fontSize: 12 } as const;

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .edge': { strokeDasharray: '6 4', animation: `${march} 1.1s linear infinite` },
          '@media (prefers-reduced-motion: reduce)': { '& .edge': { animation: 'none' } },
        }}
      >
        <svg
          viewBox="0 0 1410 262"
          width="100%"
          role="img"
          aria-label="LangGraph flow: vision node, then risk scoring node, then a condition, should run RAG. If risk is above 0.6 the RAG agent node runs; otherwise it is skipped. Then a condition, should escalate: if risk is above 0.8 or a critical violation is found, the escalation node runs; otherwise the graph ends."
          style={{ display: 'block' }}
        >
          <defs>
            <marker id="gf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill={c.fg2} />
            </marker>
          </defs>

          {/* Main edges */}
          {NODES.slice(0, -1).map((n, i) => {
            const next = NODES[i + 1];
            return (
              <line
                key={n.id}
                className="edge"
                x1={n.x + half(n.kind)}
                x2={next.x - half(next.kind) - 4}
                y1={Y}
                y2={Y}
                stroke={c.fg2}
                strokeWidth="1.5"
                markerEnd="url(#gf-arrow)"
              />
            );
          })}
          <text {...label} x={(rag.x + COND_HALF + 720 - NODE_HALF) / 2} y={Y - 12} textAnchor="middle" fill={color.signal}>
            &gt; 0.6
          </text>
          <text {...label} x={(esc.x + COND_HALF + 1140 - NODE_HALF) / 2} y={Y - 12} textAnchor="middle" fill={color.signal}>
            &gt; 0.8
          </text>

          {/* Conditional bypass edges, with labels kept clear of the curves */}
          <path
            className="edge"
            d={`M${rag.x} ${Y - 42} C ${rag.x + 70} ${Y - 125}, ${esc.x - 70} ${Y - 125}, ${esc.x - 4} ${Y - 46}`}
            fill="none"
            stroke={c.fg3}
            strokeWidth="1.5"
            markerEnd="url(#gf-arrow)"
          />
          <text {...label} x={(rag.x + esc.x) / 2} y={18} textAnchor="middle" fill={c.fg3}>
            risk ≤ 0.6 · skip retrieval
          </text>
          <path
            className="edge"
            d={`M${esc.x} ${Y + 42} C ${esc.x + 80} ${Y + 125}, ${end.x - 80} ${Y + 125}, ${end.x - 6} ${Y + 24}`}
            fill="none"
            stroke={c.fg3}
            strokeWidth="1.5"
            markerEnd="url(#gf-arrow)"
          />
          <text {...label} x={(esc.x + end.x) / 2} y={252} textAnchor="middle" fill={c.fg3}>
            no escalation needed
          </text>

          {/* Travelling token, drawn under the nodes so it enters and leaves them */}
          {!reduce && (
            <motion.circle
              r={6}
              cy={Y}
              fill={color.signal}
              initial={{ cx: NODES[0].x }}
              animate={{ cx: NODES.map((n) => n.x) }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }}
            />
          )}

          {/* Nodes */}
          {NODES.map((n) => (
            <g key={n.id}>
              {n.kind === 'node' && (
                <rect x={n.x - NODE_HALF} y={Y - 23} width={NODE_HALF * 2} height={46} fill={c.surface} stroke={c.fg} strokeWidth="1.2" />
              )}
              {n.kind === 'cond' && (
                <polygon
                  points={`${n.x},${Y - 42} ${n.x + COND_HALF},${Y} ${n.x},${Y + 42} ${n.x - COND_HALF},${Y}`}
                  fill={c.surface}
                  stroke={color.signal}
                  strokeWidth="1.2"
                />
              )}
              {n.kind === 'end' && <rect x={n.x - 36} y={Y - 20} width={72} height={40} rx={20} fill={c.fg} />}
              <text
                x={n.x}
                y={Y + 4.5}
                textAnchor="middle"
                fontFamily={font.mono}
                fontSize={n.kind === 'cond' ? 11.5 : 12.5}
                fill={n.kind === 'end' ? c.bg : c.fg}
              >
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </Box>

      {/* Mobile: the same graph as an ordered list */}
      <Box component="ol" sx={{ display: { xs: 'grid', md: 'none' }, listStyle: 'none', m: 0, p: 0, gap: 1 }}>
        {NODES.map((n, i) => (
          <Box component="li" key={n.id} sx={{ display: 'grid', justifyItems: 'start', gap: 1 }}>
            <Box
              sx={{
                fontFamily: font.mono,
                fontSize: '0.8rem',
                px: 1.5,
                py: 1,
                border: `1px solid ${n.kind === 'cond' ? color.signal : c.fg}`,
                bgcolor: n.kind === 'end' ? c.fg : c.surface,
                color: n.kind === 'end' ? c.bg : c.fg,
                borderRadius: n.kind === 'end' ? '999px' : 0,
              }}
            >
              {n.kind === 'cond' ? `if ${n.id}` : n.id}
            </Box>
            {n.id === 'should_run_rag?' && (
              <Box sx={{ fontFamily: font.mono, fontSize: '0.72rem', color: c.fg3, pl: 1.5 }}>yes if risk &gt; 0.6 · otherwise skip to the next check</Box>
            )}
            {n.id === 'should_escalate?' && (
              <Box sx={{ fontFamily: font.mono, fontSize: '0.72rem', color: c.fg3, pl: 1.5 }}>yes if risk &gt; 0.8 or critical · otherwise END</Box>
            )}
            {i < NODES.length - 1 && (
              <Box aria-hidden="true" sx={{ pl: 2, color: c.fg3, lineHeight: 1 }}>
                ↓
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
