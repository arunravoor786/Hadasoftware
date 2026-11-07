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
    title: 'Risk baselines',
    items: ['Flood, seismic and underground factors', 'Contractor safety history', 'Seasonal risk windows'],
    how: 'XGBoost on past incidents and site data.',
  },
  {
    n: '02',
    name: 'Design',
    title: 'Hazards in the drawings',
    items: ['Confined spaces, edges, crane radii', 'Clashing architectural and structural specs', 'Missing temporary-works safety'],
    how: 'NLP + RAG over BIM, structural and MEP plans.',
  },
  {
    n: '03',
    name: 'Procurement',
    title: 'Trade partner checks',
    items: ['Incident rates and expired certifications', 'Training gaps by scope', 'Insurance gaps for high-risk work'],
    how: 'Extracted from procurement documents.',
  },
  {
    n: '04',
    name: 'Pre-construction',
    title: 'Below-ground risk',
    items: ['Unmarked utilities', 'Asbestos, lead, contaminated soil', 'Urban traffic control'],
    how: 'As-builts, surveys and geotech reports, cross-referenced.',
  },
  {
    n: '05',
    name: 'Execution',
    primary: true,
    title: 'Live site monitoring',
    items: ['PPE violations in real time', 'Unprotected edges, scaffolds, zone breaches', 'Compounding-risk alerts'],
    how: 'Vision → risk score → RAG → escalation.',
  },
  {
    n: '06',
    name: 'Closeout',
    title: 'Lessons captured',
    items: ['Recurring issues for future plans', 'Documentation gaps', 'Near-miss patterns'],
    how: 'Audit logs mined; lessons stored for retrieval.',
  },
  {
    n: '07',
    name: 'Maintenance',
    isNew: true,
    title: 'After handover',
    items: ['Failures flagged before they happen', 'Deterioration tracked: cracks, corrosion, leaks, settlement', 'As-builts, warranties and inspections, searchable'],
    how: 'LRIE keeps scoring after handover: inspections and building-system feeds become signals.',
  },
];

/** Seven lifecycle phases as tabs, from planning to maintenance; execution is selected first. */
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
        aria-label="Lifecycle phases"
        sx={{
          borderBottom: `1px solid ${c.line}`,
          '& .MuiTabs-indicator': { background: 'linear-gradient(90deg, #FF7A59, #FFB547)', height: 2 },
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
                <Box sx={{ fontFamily: font.mono, fontSize: '0.62rem', letterSpacing: '0.08em', color: c.orange, minHeight: '1em' }}>
                  {ph.primary ? 'FOCUS' : ph.isNew ? 'NEW' : ' '}
                </Box>
                <Box sx={{ mt: 0.5, fontSize: '1rem', fontWeight: 560 }}>{ph.name}</Box>
              </Box>
            }
            sx={{
              alignItems: 'flex-start',
              px: { xs: 2, md: 2.5 },
              py: 2,
              color: c.fg3,
              opacity: 1,
              '&.Mui-selected': { color: c.fg },
              '&:hover': { color: c.fg },
            }}
          />
        ))}
      </Tabs>

      <Box role="tabpanel" id="phase-panel" aria-labelledby={`phase-tab-${i}`} sx={{ pt: { xs: 4, md: 5 }, minHeight: { md: 250 } }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 6 } }}>
              <Box>
                <Typography variant="mono" component="p" sx={{ color: c.orange }}>
                  {p.name}
                  {p.primary ? ' · focus' : p.isNew ? ' · new' : ''}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1.5 }}>
                  {p.title}
                </Typography>
              </Box>
              <Box>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {p.items.map((item) => (
                    <Box component="li" key={item} sx={{ display: 'grid', gridTemplateColumns: '1.6rem minmax(0, 1fr)', py: 1.4, borderTop: `1px solid ${c.line}` }}>
                      <Box component="span" aria-hidden="true" sx={{ color: c.orange }}>
                        —
                      </Box>
                      {item}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 2.5, px: 2, py: 1.5, borderRadius: '12px', bgcolor: c.surface, border: `1px solid ${c.line}`, fontFamily: font.mono, fontSize: '0.8rem', lineHeight: 1.65, color: c.fg2 }}>
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
