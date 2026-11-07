import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CtaSection } from '../components/ui/CtaSection';
import { Figure } from '../components/ui/Figure';
import { MailIcon } from '../components/ui/icons';
import { NumberedList } from '../components/ui/NumberedList';
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
import { color, font } from '../theme/tokens';

const BRIEFING = { subject: 'ACIP briefing request', body: 'Hi Hadasoft team,\n\nI would like a briefing on ACIP.\n\nCompany:\nRole:\nProject types:\n' };

function Prediction({ tag, title, items, how, tint }: { tag: string; title: string; items: string[]; how: string; tint: string }) {
  return (
    <Box sx={{ borderTop: `1px solid ${color.lineStrong}`, pt: 2.5 }}>
      <Typography variant="mono" component="p" sx={{ color: tint }}>
        {tag}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1.5 }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2 }}>
        {items.map((it) => (
          <Box component="li" key={it} sx={{ display: 'grid', gridTemplateColumns: '1.5rem minmax(0, 1fr)', py: 1.25, borderTop: `1px solid ${color.line}` }}>
            <Box component="span" aria-hidden="true" sx={{ color: tint }}>
              —
            </Box>
            {it}
          </Box>
        ))}
      </Box>
      <Typography variant="body2" sx={{ mt: 2, color: color.ink2, fontFamily: font.mono, fontSize: '0.8rem', lineHeight: 1.7 }}>
        {how}
      </Typography>
    </Box>
  );
}

export default function Acip() {
  return (
    <>
      <PageHead
        tone="night"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products/' }, { label: 'ACIP' }]}
        eyebrow="Flagship platform · In development"
        title="AI that prevents construction incidents — not just reports them."
        lead="ACIP is a full-stack intelligence platform for construction safety, powered by the Live Risk Intelligence Engine (LRIE). It fuses computer vision, machine learning, document intelligence, and multi-agent orchestration into one deterministic decision engine that observes, scores, decides, and escalates, closing the loop from detection to action without a human bottleneck."
        actions={
          <Button variant="outlined" size="large" href={mailto(BRIEFING)} startIcon={<MailIcon size={18} />} sx={{ color: color.onNight }}>
            Request a briefing
          </Button>
        }
        aside={
          <Figure n="1" caption="Multi-modal risk fusion" note="Illustrative scenario">
            <RiskFusion />
          </Figure>
        }
      />

      <Section>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' }, gap: { xs: 4, md: 8 }, alignItems: 'center' }}>
          <Reveal>
            <Box
              aria-hidden="true"
              sx={{ fontSize: 'clamp(5rem, 3rem + 9vw, 11rem)', fontWeight: 560, fontStretch: '112%', letterSpacing: '-0.05em', lineHeight: 0.9 }}
            >
              1<Box component="span" sx={{ color: color.signal, mx: '0.12em' }}>in</Box>5
            </Box>
          </Reveal>
          <Reveal delay={0.08}>
            <Typography variant="mono" component="p" sx={{ color: color.ink3 }}>
              § 01 · Why it matters
            </Typography>
            <Typography variant="h2" sx={{ mt: 2 }}>
              Pioneering safety intelligence at a magnitude the industry hasn't seen.
            </Typography>
            <Typography variant="lead" sx={{ mt: 2.5, color: color.ink2 }}>
              Construction is the most dangerous major industry: one in five workplace fatalities happens on a site. Today's tools
              either report incidents after they happen or display yesterday's data in dashboards. ACIP is built to span every phase
              of construction, fuse every signal, and act in seconds, preventing the incident instead of documenting it.
            </Typography>
            <Typography variant="caption" component="p" sx={{ mt: 2, color: color.ink3 }}>
              Statistic: US OSHA data on worker fatalities in private industry.
            </Typography>
          </Reveal>
        </Box>
      </Section>

      <Section tone="alt">
        <SectionHead index="02" label="Why ACIP is different" title="Three structural advantages, one closed loop." />
        <NumberedList
          items={[
            {
              title: 'Closed-loop intelligence',
              body: 'Detection to action with no human in the bottleneck. LRIE detects, scores compounding risk, retrieves the right protocol, decides, and escalates to the right person in seconds, with every step logged.',
            },
            {
              title: 'Multi-modal risk fusion',
              body: 'Not “missing hard hat = HIGH”. Instead: missing hard hat + 12th floor + 20 mph wind + this trade’s three violations this week + a crane pick in 30 minutes = CRITICAL, with specific mitigation steps.',
            },
            {
              title: 'Institutional memory',
              body: "Projects are temporary; their lessons usually leave with the people. ACIP's vector store and trained models turn every project's learnings into persistent organisational memory, applied to the next site automatically.",
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead
          index="03"
          label="Full lifecycle coverage"
          title="Intelligence across every phase of construction."
          lead="ACIP's deepest capability is live execution monitoring, but its document and predictive modules extend risk intelligence upstream to planning and downstream to closeout."
        />
        <PhaseExplorer />
      </Section>

      <Section tone="night">
        <SectionHead
          index="04"
          label="Live Risk Intelligence Engine"
          title="A deterministic brain behind every decision."
          lead="Every AI output, whether vision, ML, or document, passes through LRIE's state machine before any action is taken. Each transition is typed, logged, and auditable for OSHA compliance and insurance."
        />
        <LrieStateMachine />
      </Section>

      <Section>
        <SectionHead
          index="05"
          label="Learning from history"
          title="Stopping the next incident, based on the last one."
          lead="ACIP doesn't just detect current hazards; it learns from every project. Patterns invisible in spreadsheet reviews are surfaced by the model and applied predictively to new sites."
        />
        <NumberedList
          items={[
            {
              title: 'Portfolio pattern mining',
              body: 'XGBoost finds multi-factor correlations humans miss. For example, new subcontractor mobilisation plus a concrete pour plus temperatures above 90°F correlating with a sharp rise in heat incidents.',
            },
            {
              title: 'Pre-construction profiling',
              body: 'A new high-rise in a hot climate automatically inherits risk patterns from comparable past projects: seasonal curves, trade violation profiles, critical-activity windows.',
            },
            {
              title: 'Continuous refinement',
              body: 'A pattern detected on Project A, such as scaffold violations spiking in week 3 of envelope work, is encoded into the model and applied predictively on Project B at the same phase.',
            },
            {
              title: 'Near-miss amplification',
              body: 'Near-misses reveal failure modes without injury. ACIP treats them with the same rigour as incidents, vectorising the narratives for semantic retrieval when similar conditions recur.',
            },
            {
              title: 'Environmental correlation',
              body: 'Weather, temperature, and wind are correlated with incident timing so risk scores rise before conditions turn dangerous, not after.',
            },
            {
              title: 'Persistent memory',
              body: 'Trained models and the vector store keep safety knowledge after a project ends: institutional memory that no longer walks out the door with the team.',
            },
          ]}
        />
      </Section>

      <Section tone="alt">
        <SectionHead
          index="06"
          label="Beyond what a camera can see"
          title="Visual prediction, and under-the-ground prediction."
          lead="Cameras catch what's visible. ACIP's Document Intelligence infers what's hidden below ground (utilities, soil conditions, abandoned infrastructure) by correlating decades of plans, surveys, and reports before a single shovel breaks ground."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 5, md: 6 }, mb: { xs: 8, md: 10 } }}>
          <Reveal>
            <Prediction
              tag="Visual prediction"
              title="What ACIP sees"
              tint={color.teal}
              items={[
                'PPE compliance: helmets, vests, glasses, gloves, harnesses, boots',
                'Unsafe conditions: unguarded openings, missing guardrails, unsafe scaffolds',
                'Zone violations: crane swing radius, active vehicle routes, overhead work',
                'Equipment status and per-zone headcount for mustering and overcrowding',
              ]}
              how="YOLOv8n (6 MB, CPU-capable) fine-tuned on construction data. Standard YOLO doesn't know what a fall-protection harness looks like."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Prediction
              tag="Non-visual prediction"
              title="What ACIP infers below ground"
              tint={color.orange}
              items={[
                'Underground utilities: from as-builts, municipal maps, geotech logs, GPR reports',
                'Hidden structural conditions: corroded rebar, abandoned post-tension cables',
                'Environmental hazards: asbestos, lead, contaminated soil probability',
                'Foundation risk: settlement, heave, lateral pressure from adjacent structures',
              ]}
              how="Every inference carries a confidence score and recommends physical verification when below threshold. ACIP supplements, never replaces, investigation."
            />
          </Reveal>
        </Box>
        <SubsurfaceScan />
      </Section>

      <Section tone="night">
        <SectionHead
          index="07"
          label="Inside the engine"
          title="LangGraph orchestration, not a linear pipeline."
          lead="Construction risk decisions branch. Should we retrieve safety protocols? Should we escalate? That requires a graph, not a chain. LRIE is built as a LangGraph StateGraph: each node a pure, typed, logged function."
        />
        <Figure n="6" caption="LRIE as a StateGraph" note="Conditional edges shown with thresholds">
          <Box sx={{ border: `1px solid ${color.nightLine}`, bgcolor: color.night2, p: { xs: 2, md: 3 } }}>
            <GraphFlow />
          </Box>
        </Figure>
        <Box sx={{ mt: { xs: 6, md: 8 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 5, md: 6 } }}>
          {[
            {
              tag: 'LangGraph',
              title: 'Deterministic orchestration',
              body: "A StateGraph lets LRIE branch, merge, and retry without losing state. Conditional edges decide whether to retrieve protocols (risk > 0.6) and whether to escalate (risk > 0.8 or a critical violation). Every node's input and output is typed with Pydantic, and the full execution trace is logged.",
            },
            {
              tag: 'LangChain',
              title: 'The RAG pipeline',
              body: 'LangChain loads documents, splits them with RecursiveCharacterTextSplitter, embeds chunks via all-MiniLM-L6-v2 into ChromaDB, and runs the retrieval chain that feeds the Groq LLM. Prompt templates keep every interaction structured and consistent.',
            },
          ].map((b, i) => (
            <Reveal key={b.tag} delay={i * 0.08}>
              <Box sx={{ borderTop: `1px solid ${color.nightLineStrong}`, pt: 2.5 }}>
                <Typography variant="mono" component="p" sx={{ color: color.signal }}>
                  {b.tag}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1.5 }}>
                  {b.title}
                </Typography>
                <Typography sx={{ mt: 1.5, color: color.onNight2 }}>{b.body}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      <Section>
        <SectionHead
          index="08"
          label="Technology"
          title="An enterprise AI stack, end to end."
          lead="ACIP unifies modern computer vision, gradient-boosted ML, retrieval-augmented generation, and multi-agent orchestration, every layer chosen for production reliability and auditability."
        />
        <Reveal>
          <SpecTable
            caption="ACIP technology stack"
            rows={[
              { label: 'GenAI & agents', cells: ['LangGraph · LangChain · Groq (Llama 3.3 70B) · ChromaDB · RAG pipeline'] },
              { label: 'Vision & ML', cells: ['YOLOv8 · XGBoost · PyTorch · OpenCV · scikit-learn · sentence-transformers · NumPy · Pandas'] },
              { label: 'Backend', cells: ['Python 3.13 · FastAPI · Pydantic v2 · SQLAlchemy 2 · Alembic · Uvicorn'] },
              { label: 'Frontend', cells: ['React 18 · TypeScript 5 · MUI v5 · Recharts · React Router 6 · Vite'] },
              { label: 'Infra & MLOps', cells: ['PostgreSQL · Docker · MLflow · GitHub Actions · Cloudflare R2 · Supabase Auth'] },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="alt">
        <SectionHead index="09" label="Enterprise-ready" title="Built for audit, compliance, and integration." />
        <NumberedList
          items={[
            {
              title: 'Full audit trail',
              body: 'Every decision logged with input provenance, processing chain, model metadata, confidence rationale, action taken, and resolution. Designed for OSHA, insurance, and litigation defence.',
            },
            {
              title: 'Role-based escalation',
              body: 'Configurable hierarchies from site worker to CXO. Unacknowledged HIGH alerts auto-escalate after a configurable window; CRITICAL findings bypass the queue.',
            },
            {
              title: 'Ecosystem integration',
              body: 'Box, SharePoint, Procore, Autodesk Construction Cloud, Revit/Navisworks, Teams, Slack, and IoT sensor feeds. ACIP fits existing construction stacks.',
            },
            {
              title: 'Security & access',
              body: 'JWT auth via Supabase, role-based access at site, project and portfolio level, TLS in transit, encryption at rest, configurable data residency.',
            },
            {
              title: 'Regulatory alignment',
              body: 'Designed to support OSHA 1926 documentation, ISO 45001 safety-management requirements, and client-specific EHS reporting.',
            },
            {
              title: 'Executive intelligence',
              body: 'CXO-ready dashboards with trend analysis, site comparison, and audit-ready decision trails, built on React, MUI, and Recharts.',
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHead
          index="10"
          label="Development status"
          title="In active development, built in the open, with discipline."
          lead="ACIP is being engineered progressively, from foundational architecture to a deployed, industry-ready platform. We're transparent about where it stands."
        />
        <Reveal>
          <SpecTable
            caption="ACIP development status"
            head={['Status', 'Detail']}
            rows={[
              {
                label: 'Architecture',
                cells: [<StatusPill key="s" status="production" />, 'Complete: system design, LRIE state machine, LangGraph orchestration, API contracts, folder structure'],
              },
              {
                label: 'Frontend',
                cells: [<StatusPill key="s" status="active" />, 'Initialised: React + TypeScript + MUI; nine screens designed (Executive Dashboard, Live Risk Monitor, Vision AI, Document Intelligence, and more)'],
              },
              { label: 'In development', cells: [<StatusPill key="s" status="development" />, 'LRIE state modelling, decision and confidence engines'] },
              {
                label: 'Roadmap',
                cells: [<StatusPill key="s" status="rolling" />, 'ML risk scoring → computer vision → document intelligence → agent orchestration → full LRIE assembly → production deployment'],
              },
              { label: 'Deployment target', cells: ['—', 'Containerised (Docker), CI/CD via GitHub Actions, cloud-native'] },
            ]}
          />
        </Reveal>
      </Section>

      <CtaSection
        index="11"
        tone="night"
        label="Request a briefing"
        title="Bring incident prevention to your projects."
        lead="We're partnering selectively with forward-looking construction teams and insurers to shape ACIP around real jobsite needs."
        subject={BRIEFING.subject}
        body={BRIEFING.body}
      />
    </>
  );
}
