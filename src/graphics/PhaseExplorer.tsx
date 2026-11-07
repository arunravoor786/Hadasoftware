import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';

const PHASES = [
  {
    n: '01',
    name: 'Planning',
    title: 'Pre-construction risk baselines',
    items: [
      'Geographic risk factors: flood zones, seismic areas, underground infrastructure',
      'Contractor risk profiles from prior safety performance',
      'Seasonal risk windows: heat stress, winter hazards',
    ],
    how: 'The predictive risk module (XGBoost) analyses historical incident data and site metadata.',
  },
  {
    n: '02',
    name: 'Design',
    title: 'Design-stage hazard discovery',
    items: [
      'Design elements that correlate with incidents: confined spaces, elevated platforms, crane swing radii',
      'Conflicting specs between architectural and structural plans',
      'Missing safety provisions in temporary works',
    ],
    how: 'Document Intelligence (NLP + RAG) parses BIM, structural, and MEP plans against safety protocol databases.',
  },
  {
    n: '03',
    name: 'Procurement',
    title: 'Trade partner risk validation',
    items: [
      'Subcontractors with elevated incident rates or expired certifications',
      'Gaps in required safety training for trade scopes',
      'Non-compliant insurance for high-risk activities',
    ],
    how: 'The document pipeline extracts and validates safety data from procurement packages.',
  },
  {
    n: '04',
    name: 'Pre-construction',
    title: 'Subsurface and existing-condition risk',
    items: [
      'Unmarked underground utilities and subsurface infrastructure',
      'Environmental hazards: asbestos, lead, contaminated soil',
      'Inadequate traffic control for urban sites',
    ],
    how: 'Cross-references as-builts, utility surveys, and geotech reports into a subsurface risk map.',
  },
  {
    n: '05',
    name: 'Execution',
    primary: true,
    title: 'Live jobsite monitoring',
    items: [
      'Real-time PPE violations: hard hats, vests, harnesses, glasses, gloves',
      'Unsafe practices: unprotected edges, improper scaffolding, exclusion-zone breaches',
      'Compounding-factor risk escalation and trend-based alerts',
    ],
    how: 'The full LRIE loop: vision (YOLOv8) → risk scoring (XGBoost) → conditional RAG → escalation.',
  },
  {
    n: '06',
    name: 'Closeout',
    title: 'Portfolio learning capture',
    items: [
      'Recurring safety issues that should inform future planning',
      'Incomplete safety documentation creating liability exposure',
      'Near-miss patterns indicating systemic issues',
    ],
    how: 'LRIE audit logs are mined for portfolio insights; lessons are vectorised into ChromaDB for future retrieval.',
  },
];

/** Six construction phases as tabs; execution, the primary focus, is selected first. */
export function PhaseExplorer() {
  const [i, setI] = useState(4);
  const c = useToneColors();
  const p = PHASES[i];

  return (
    <Box>
      <Tabs
        value={i}
        onChange={(_, v: number) => setI(v)}
        variant="scrollable"
        scrollButtons={false}
        aria-label="Construction phases"
        sx={{
          borderBottom: `1px solid ${c.line}`,
          '& .MuiTabs-indicator': { bgcolor: c.fg, height: 2 },
        }}
      >
        {PHASES.map((ph, j) => (
          <Tab
            key={ph.n}
            value={j}
            id={`phase-tab-${j}`}
            aria-controls="phase-panel"
            label={
              <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ fontFamily: font.mono, fontSize: '0.66rem', letterSpacing: '0.07em', color: ph.primary ? c.orange : c.fg3 }}>
                  {ph.n}
                  {ph.primary ? ' · PRIMARY' : ''}
                </Box>
                <Box sx={{ mt: 0.5, fontSize: '1rem', fontWeight: 560 }}>{ph.name}</Box>
              </Box>
            }
            sx={{
              alignItems: 'flex-start',
              px: { xs: 2, md: 3 },
              py: 2,
              color: c.fg3,
              opacity: 1,
              '&.Mui-selected': { color: c.fg },
              '&:hover': { color: c.fg },
            }}
          />
        ))}
      </Tabs>

      <Box role="tabpanel" id="phase-panel" aria-labelledby={`phase-tab-${i}`} sx={{ pt: { xs: 4, md: 5 }, minHeight: { md: 300 } }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 6 } }}>
              <Box>
                <Typography variant="mono" component="p" sx={{ color: p.primary ? c.orange : c.fg3 }}>
                  Phase {p.n} · {p.name}
                  {p.primary ? ' — primary focus' : ''}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1.5 }}>
                  {p.title}
                </Typography>
              </Box>
              <Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {p.items.map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{ display: 'grid', gridTemplateColumns: '1.6rem minmax(0, 1fr)', py: 1.5, borderTop: `1px solid ${c.line}` }}
                    >
                      <Box component="span" aria-hidden="true" sx={{ color: c.orange }}>
                        —
                      </Box>
                      {item}
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    mt: 2.5,
                    p: 2,
                    bgcolor: c.surface,
                    border: `1px solid ${c.line}`,
                    fontFamily: font.mono,
                    fontSize: '0.8rem',
                    lineHeight: 1.65,
                    color: c.fg2,
                  }}
                >
                  <Box component="span" sx={{ color: c.fg }}>
                    How:{' '}
                  </Box>
                  {p.how}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
