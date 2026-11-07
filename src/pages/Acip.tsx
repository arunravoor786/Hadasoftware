import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CtaSection } from '../components/ui/CtaSection';
import { FeatureList } from '../components/ui/FeatureList';
import { Figure } from '../components/ui/Figure';
import { MailIcon } from '../components/ui/icons';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { SpecTable } from '../components/ui/SpecTable';
import { StatusPill } from '../components/ui/StatusPill';
import { GraphFlow } from '../graphics/GraphFlow';
import { LrieStateMachine } from '../graphics/LrieStateMachine';
import { PhaseExplorer } from '../graphics/PhaseExplorer';
import { RiskFusion } from '../graphics/RiskFusion';
import { SubsurfaceScan } from '../graphics/SubsurfaceScan';
import { mailto } from '../lib/mailto';
import { color } from '../theme/tokens';

const BRIEFING = { subject: 'ACIP briefing request', body: 'Hi Hadasoft team,\n\nI would like a briefing on ACIP.\n\nCompany:\nRole:\nProjects or assets:\n' };

export default function Acip() {
  return (
    <>
      <PageHead
        tone="night"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products/' }, { label: 'ACIP' }]}
        eyebrow="Flagship · In development"
        title="AI that prevents construction incidents."
        lead="LRIE fuses vision, ML and documents to score risk and act in seconds, from planning to maintenance."
        actions={
          <Button variant="contained" size="large" href={mailto(BRIEFING)} startIcon={<MailIcon size={18} />}>
            Request a briefing
          </Button>
        }
        aside={
          <Figure caption="Risk fusion" note="Illustrative">
            <RiskFusion />
          </Figure>
        }
      />

      <Section>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 3, md: 8 }, alignItems: 'center' }}>
          <Reveal>
            <Box
              aria-hidden="true"
              sx={{
                fontSize: 'clamp(5rem, 3rem + 9vw, 11rem)',
                fontWeight: 650,
                fontStretch: '115%',
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                backgroundImage: 'linear-gradient(100deg, #FFB547, #FF7A59 45%, #FF4D6D)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              1 in 5
            </Box>
          </Reveal>
          <Reveal delay={0.08}>
            <Typography variant="h2">workplace deaths happen on construction sites.</Typography>
            <Typography variant="lead" sx={{ mt: 2, color: color.ink2 }}>
              ACIP is built to prevent them, not report them.
            </Typography>
            <Typography variant="caption" component="p" sx={{ mt: 2, color: color.ink3 }}>
              Source: US OSHA, private-industry fatality data.
            </Typography>
          </Reveal>
        </Box>
      </Section>

      <Section tone="alt">
        <SectionHead label="Why ACIP" title="Three advantages." />
        <FeatureList
          items={[
            { title: 'Closed loop', body: 'Detect, decide and escalate in seconds.' },
            { title: 'Risk fusion', body: 'Hard hat + height + wind + history = critical.' },
            { title: 'Institutional memory', body: 'Every project teaches the next.' },
          ]}
        />
      </Section>

      <Section>
        <SectionHead label="Lifecycle" title="Planning to maintenance." lead="One platform across the asset's whole life." />
        <PhaseExplorer />
      </Section>

      <Section tone="night">
        <SectionHead label="LRIE" title="A deterministic decision engine." lead="Seven typed, logged states behind every decision." />
        <LrieStateMachine />
      </Section>

      <Section tone="alt">
        <SectionHead label="Below ground" title="Sees what cameras can't." lead="Old drawings reveal what surveys miss." />
        <SubsurfaceScan />
      </Section>

      <Section tone="night">
        <SectionHead label="Orchestration" title="A graph, not a chain." lead="Retrieve at 0.6. Escalate at 0.8." />
        <Figure caption="LRIE as a LangGraph StateGraph">
          <Box sx={{ borderRadius: '20px', border: `1px solid ${color.line}`, bgcolor: color.night2, p: { xs: 2, md: 3 } }}>
            <GraphFlow />
          </Box>
        </Figure>
      </Section>

      <Section>
        <SectionHead label="Enterprise" title="Audit-ready by design." />
        <FeatureList
          items={[
            { title: 'Full audit trail', body: 'Every decision logged, end to end.' },
            { title: 'Role-based escalation', body: 'Site worker to CXO, auto-escalating.' },
            { title: 'Integrations', body: 'Procore, Autodesk, Box, SharePoint, Teams, Slack, IoT.' },
            { title: 'Security', body: 'JWT auth, role-based access, encryption.' },
            { title: 'Compliance', body: 'OSHA 1926 and ISO 45001 support.' },
            { title: 'Executive view', body: 'Trends, site comparisons, decision trails.' },
          ]}
        />
      </Section>

      <Section tone="alt">
        <SectionHead label="Status" title="Where it stands." />
        <Reveal>
          <SpecTable
            caption="ACIP development status"
            rows={[
              { label: 'Architecture', cells: [<StatusPill key="s" status="production" />] },
              { label: 'Frontend', cells: [<StatusPill key="s" status="active" />] },
              { label: 'Decision engine', cells: [<StatusPill key="s" status="development" />] },
              { label: 'Next', cells: ['Vision → documents → agents → full LRIE → production'] },
              { label: 'Stack', cells: ['LangGraph · YOLOv8 · XGBoost · FastAPI · React · PostgreSQL'] },
            ]}
          />
        </Reveal>
      </Section>

      <CtaSection
        tone="night"
        label="Request a briefing"
        title="Bring ACIP to your projects."
        lead="Partnering with builders, asset owners and insurers."
        subject={BRIEFING.subject}
        body={BRIEFING.body}
      />
    </>
  );
}
