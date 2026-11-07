import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CtaSection } from '../components/ui/CtaSection';
import { NumberedList } from '../components/ui/NumberedList';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { color, font } from '../theme/tokens';

interface Person {
  initials: string;
  name: string;
  role: string;
  focus: string;
  note: string;
  bio: string;
  tags: string[];
}

const PEOPLE: Person[] = [
  {
    initials: 'SR',
    name: 'Swathi R',
    role: 'Managing Director',
    focus: 'Human Resources & Strategic Partnerships',
    note: 'Leads company operations',
    bio: "As Managing Director, Swathi leads Hadasoft's people strategy and the partnerships that open new markets. She has built the operating culture that lets a focused team move quickly without compromising on trust, and she owns the relationships that turn Hadasoft's products into lasting business.",
    tags: ['Human Resources', 'Strategic Partnerships', 'Operations', 'Culture'],
  },
  {
    initials: 'AR',
    name: 'ArunKumar RM',
    role: 'Founder & Chief Technology Officer',
    focus: 'Product Architecture & AI Engineering',
    note: 'Architect of both products',
    bio: 'ArunKumar is the founder and the technical force behind every Hadasoft product. He designed both BizWhats and ACIP from first principles: the data models, the pipelines, the AI layers, and the deployment. His range across the full stack and AI engineering is what lets a focused team ship platforms that compete with far larger ones. He credits his brother, Kalyan Pemmasani, for shaping his approach to leadership, and his father, Muthaiyan R, for the hard work and straightforwardness he brings to every build.',
    tags: ['AI Engineering', 'Full-Stack Architecture', 'Product', 'Systems Design'],
  },
  {
    initials: 'DT',
    name: 'Dinesh Thummalapenta',
    role: 'Business Development & Automation Lead',
    focus: 'Growth & Pipeline Engineering',
    note: 'Built the lead engine',
    bio: "Dinesh turns Hadasoft's products into pipelines of real opportunity. With an instinct for both sales and engineering, he builds the automation that keeps new leads flowing without manual overhead, and identifies the partnerships and markets where Hadasoft's products win. He is always developing the next automation for an ongoing project.",
    tags: ['Business Development', 'Lead Generation', 'Sales Automation', 'Partnerships'],
  },
];

function PersonCard({ p }: { p: Person }) {
  return (
    <Box component="article" aria-labelledby={`person-${p.initials}`} sx={{ border: `1px solid ${color.line}`, bgcolor: color.card, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', p: 3, borderBottom: `1px solid ${color.line}` }}>
        <Box
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: 64,
            height: 64,
            display: 'grid',
            placeItems: 'center',
            bgcolor: color.ink,
            color: color.paper,
            fontWeight: 600,
            fontStretch: '115%',
            fontSize: '1.3rem',
            letterSpacing: '-0.02em',
          }}
        >
          {p.initials}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography id={`person-${p.initials}`} variant="h4" component="h3">
            {p.name}
          </Typography>
          <Typography sx={{ color: color.ink2, fontSize: '0.95rem', lineHeight: 1.35, mt: 0.25 }}>{p.role}</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ fontFamily: font.mono, fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: color.ink3 }}>
          {p.focus}
          <Box component="span" sx={{ display: 'block', color: color.teal, mt: 0.75 }}>
            — {p.note}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: color.ink2 }}>
          {p.bio}
        </Typography>
        <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
          {p.tags.map((t) => (
            <Box key={t} component="span" sx={{ fontFamily: font.mono, fontSize: '0.66rem', letterSpacing: '0.05em', border: `1px solid ${color.line}`, px: 1, py: 0.4, color: color.ink2 }}>
              {t}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function Company() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Company' }]}
        eyebrow="About Hadasoft"
        title="A software company building platforms that businesses depend on."
        lead="Hadasoftware Private Limited engineers production-grade software for two of the hardest problems any business faces, keeping customers and seeing risk before it lands, and builds custom systems for clients who need the same reliability. We pair deep technical capability with the operational discipline to run real products at scale."
      />

      <Section tone="alt">
        <SectionHead index="01" label="Who we are" title="Built to deliver, not to demo.">
          <Box sx={{ mt: { xs: 4, md: 5 }, display: 'grid', gap: 3, maxWidth: '62ch' }}>
            <Reveal>
              <Typography variant="lead" sx={{ color: color.ink2 }}>
                Hadasoft was founded on a simple conviction: most business software over-promises and under-delivers. Companies
                are sold dashboards they never use and automations that quietly break. We build the opposite: systems that earn
                their place by doing real work, every day, reliably.
              </Typography>
            </Reveal>
            <Reveal delay={0.06}>
              <Typography variant="lead" sx={{ color: color.ink2 }}>
                Our products reflect that. BizWhats keeps customers coming back for small and medium businesses. ACIP catches
                risk for construction enterprises before it becomes loss. Our client work, starting with the website we delivered
                for Dakshin Projects, holds to the same standard: software that works in the real world, under real constraints.
              </Typography>
            </Reveal>
          </Box>
        </SectionHead>
      </Section>

      <Section id="leadership">
        <SectionHead
          index="02"
          label="Leadership"
          title="The people behind Hadasoft."
          lead="A leadership team that spans strategy, engineering, and growth."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>
          {PEOPLE.map((p, i) => (
            <Reveal key={p.initials} delay={i * 0.07} sx={{ height: '100%', '& > div': { height: '100%' } }}>
              <PersonCard p={p} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <Section tone="night">
        <SectionHead index="03" label="How we work" title="The principles behind every build." />
        <NumberedList
          items={[
            {
              title: 'Solve a real problem',
              body: "We only automate work that someone is already paying to do manually. If no one does it today, it's a feature, not a product.",
            },
            {
              title: 'Storage-mediated systems',
              body: 'Every component communicates through a database: testable, replayable, observable. This is how software survives past launch.',
            },
            {
              title: 'Prove every layer',
              body: 'We smoke-test and commit a working state before building the next layer on top. Slow at first, then suddenly fast.',
            },
            {
              title: 'De-scope without apology',
              body: 'A focused product that works beats a sketch of everything. We cut to ship the parts that earn trust first.',
            },
            {
              title: 'Multilingual at the schema',
              body: "We build for India's languages from the database up, not as an afterthought translation layer.",
            },
            {
              title: 'Security is non-negotiable',
              body: 'Credential rotation, audit trails, and safety guardrails are built in from the first commit, not added later.',
            },
          ]}
        />
      </Section>

      <CtaSection
        index="04"
        title="Want to work with us or join the team?"
        lead="We're always glad to hear from businesses, partners, and engineers who like the way we build."
        subject="Hello from hadasoft.in"
      />
    </>
  );
}
