import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Figure } from '../components/ui/Figure';
import { AlertIcon, ReplayIcon } from '../components/ui/icons';
import { useToneColors } from '../theme/tone';
import { color, ease, font } from '../theme/tokens';

// Plan geometry: columns A–F (100 units), rows 1–6 (60 units), origin (60, 40).
const GX = 60;
const GY = 40;
const CW = 100;
const RH = 60;
const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
const PIPE = { x1: 105, y1: 130, x2: 307.5, y2: 400 };
const POTHOLE = { x: 232.5, y: 300 };
const T = { survey: 0.2, zone: 0.9, scan: 1.7, scanDur: 2.4, marker: 4.2, alert: 4.6 };

/**
 * The worked example from the ACIP brief: a 1962 drawing reveals an abandoned
 * water line that no current survey shows, inside the planned excavation.
 */
export function SubsurfaceScan() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [run, setRun] = useState(0);
  const play = Boolean(inView || reduce);
  const d = (s: number) => (reduce ? 0 : s);
  const dur = (s: number) => (reduce ? 0 : s);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' },
        gap: { xs: 4, lg: 6 },
        alignItems: 'center',
      }}
    >
      <Figure caption="Excavation plan with the 1962 mechanical layer" note="Illustrative plan">
        <Box key={run} sx={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${c.lineStrong}`, bgcolor: c.surface }}>
          <svg
            viewBox="0 0 720 460"
            width="100%"
            role="img"
            aria-label="Plan view of a site grid A to F by 1 to 6. The planned excavation zone covers B4 to C6. The 2024 utility survey shows a storm drain and a gas main elsewhere. A scan of the 1962 mechanical drawing reveals a 6-inch cast-iron water line crossing the excavation zone diagonally. A pothole is recommended at grid B5."
            style={{ display: 'block' }}
          >
            <defs>
              <pattern id={`hatch-${run}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="9" stroke={color.signal} strokeWidth="1.2" opacity="0.45" />
              </pattern>
              <clipPath id={`reveal-${run}`}>
                <motion.rect
                  x={GX}
                  y={GY - 10}
                  height={RH * 6 + 20}
                  initial={{ width: reduce ? CW * 6 : 0 }}
                  animate={play ? { width: CW * 6 } : undefined}
                  transition={{ delay: d(T.scan), duration: dur(T.scanDur), ease: 'linear' }}
                />
              </clipPath>
            </defs>

            {/* Grid and references */}
            <g stroke={c.line} strokeWidth="1">
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`v${i}`} x1={GX + i * CW} x2={GX + i * CW} y1={GY} y2={GY + RH * 6} />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`h${i}`} y1={GY + i * RH} y2={GY + i * RH} x1={GX} x2={GX + CW * 6} />
              ))}
            </g>
            <g fontFamily={font.mono} fontSize="12" fill={c.fg3} textAnchor="middle">
              {COLS.map((l, i) => (
                <text key={l} x={GX + i * CW + CW / 2} y={GY - 12}>
                  {l}
                </text>
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <text key={i} x={GX - 20} y={GY + i * RH + RH / 2 + 4}>
                  {i + 1}
                </text>
              ))}
            </g>

            {/* 2024 utility survey: what everyone can already see */}
            <motion.g
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: d(T.survey), duration: dur(0.6) }}
              fontFamily={font.mono}
              fontSize="10.5"
              letterSpacing="0.05em"
              fill={c.fg2}
            >
              <line x1={GX} x2={GX + CW * 6} y1={112} y2={112} stroke={c.fg2} strokeWidth="2.5" />
              <text x={GX + CW * 5 - 14} y={104} textAnchor="end">
                STORM DRAIN · 2024 SURVEY
              </text>
              <line x1={590} x2={590} y1={GY} y2={GY + RH * 6} stroke={c.fg2} strokeWidth="2.5" />
              <text x={600} y={GY + RH * 6 - 8} transform={`rotate(-90 600 ${GY + RH * 6 - 8})`}>
                GAS MAIN · 2024 SURVEY
              </text>
            </motion.g>

            {/* Planned excavation zone B4–C6 */}
            <motion.g
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: d(T.zone), duration: dur(0.6) }}
            >
              <rect x={GX + CW} y={GY + RH * 3} width={CW * 2} height={RH * 3} fill={`url(#hatch-${run})`} stroke={color.signal} strokeWidth="1.5" strokeDasharray="6 4" />
              <rect x={GX + CW * 3 + 8} y={GY + RH * 3 + 8} width={150} height={38} fill={c.surface} />
              <text x={GX + CW * 3 + 14} y={GY + RH * 3 + 23} fontFamily={font.mono} fontSize="10.5" letterSpacing="0.05em" fill={c.fg}>
                ← EXCAVATION ZONE
              </text>
              <text x={GX + CW * 3 + 14} y={GY + RH * 3 + 39} fontFamily={font.mono} fontSize="10.5" letterSpacing="0.05em" fill={c.fg3}>
                GRID B4–C6
              </text>
            </motion.g>

            {/* 1962 mechanical layer, revealed by the scan */}
            <g clipPath={`url(#reveal-${run})`}>
              <line {...PIPE} stroke={color.signal} strokeWidth="5" strokeDasharray="12 7" strokeLinecap="round" />
              {/* Callout with a leader line, kept in the empty A1 cell */}
              <rect x={GX + 6} y={GY + 8} width={232} height={40} fill={c.surface} />
              <text x={GX + 12} y={GY + 23} fontFamily={font.mono} fontSize="10.5" letterSpacing="0.05em" fill={color.orange}>
                6&quot; CI DOMESTIC WATER · 1962
              </text>
              <text x={GX + 12} y={GY + 39} fontFamily={font.mono} fontSize="10.5" letterSpacing="0.05em" fill={c.fg3}>
                SHEET M-3 · CAPPED 1990s
              </text>
              <polyline points={`${GX + 30},${GY + 50} ${GX + 30},${GY + 70} 113,141`} fill="none" stroke={color.orange} strokeWidth="1" />
              <circle cx={113} cy={141} r={2.5} fill={color.orange} />
            </g>

            {/* Scan line */}
            {!reduce && (
              <motion.g
                initial={{ x: 0, opacity: 0 }}
                animate={play ? { x: CW * 6, opacity: [0, 1, 1, 0] } : undefined}
                transition={{ delay: T.scan, duration: T.scanDur, ease: 'linear', opacity: { delay: T.scan, duration: T.scanDur, times: [0, 0.05, 0.9, 1] } }}
              >
                <rect x={GX - 14} y={GY} width={14} height={RH * 6} fill={color.signal} opacity="0.12" />
                <line x1={GX} x2={GX} y1={GY - 6} y2={GY + RH * 6 + 6} stroke={color.signal} strokeWidth="1.5" />
              </motion.g>
            )}

            {/* Recommended pothole at B5 */}
            <motion.g
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
              animate={play ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: d(T.marker), duration: dur(0.5), ease }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <circle cx={POTHOLE.x} cy={POTHOLE.y} r={8} fill={color.signal} stroke={c.surface} strokeWidth="2" />
            </motion.g>
            {!reduce && play && (
              <motion.circle
                cx={POTHOLE.x}
                cy={POTHOLE.y}
                r={8}
                fill="none"
                stroke={color.signal}
                strokeWidth="1.5"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                transition={{ delay: T.marker + 0.3, duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            )}
            <motion.text
              x={GX + CW + 8}
              y={GY + RH * 5 + 36}
              fontFamily={font.mono}
              fontSize="10.5"
              letterSpacing="0.05em"
              fill={c.fg}
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: d(T.marker + 0.2), duration: dur(0.4) }}
            >
              POTHOLE AT B5
            </motion.text>
          </svg>
        </Box>
      </Figure>

      <Box>
        <motion.div
          key={run}
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: d(T.alert), duration: dur(0.6), ease }}
        >
          <Box sx={{ borderRadius: '18px', bgcolor: c.surface, p: { xs: 2.5, md: 3 }, border: '1px solid rgba(255,122,89,0.4)', boxShadow: '0 30px 80px -40px rgba(255,122,89,0.55)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: color.orange, fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              <AlertIcon size={16} /> CRITICAL
            </Box>
            <Typography variant="h4" component="p" sx={{ mt: 1.5 }}>
              Potential abandoned water line in the excavation zone.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1.5, color: c.fg2 }}>
              Source: 1962 mechanical plan, Sheet M-3, grid B4–C6. Shown as 6-inch cast-iron domestic water. Not present on
              the current utility survey (2024). Recommend potholing at grid B5 before excavation.
            </Typography>
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${c.line}`, fontFamily: font.mono, fontSize: '0.75rem', color: c.fg2 }}>
              Confidence 0.72 · source more than 50 years old, no corroborating survey
            </Box>
          </Box>
        </motion.div>
        <Typography variant="body2" sx={{ mt: 3, color: c.fg2 }}>
          A 1960s building needs new foundations. Its 1962 drawings show a water line no current survey has.
        </Typography>
        {!reduce && (
          <Button
            variant="text"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={() => setRun((r) => r + 1)}
            sx={{ mt: 2, color: c.fg2, px: 0 }}
          >
            Replay the scan
          </Button>
        )}
      </Box>
    </Box>
  );
}
