import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CtaSection } from '../components/ui/CtaSection';
import { FeatureList } from '../components/ui/FeatureList';
import { GlowCard, type GlowAccent } from '../components/ui/GlowCard';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { color, font, gradient } from '../theme/tokens';

interface Person {
  initials: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  accent: GlowAccent;
}

const PEOPLE: Person[] = [
  {
    initials: 'SR',
    name: 'Swathi R',
    role: 'Managing Director',
    bio: 'Leads people, operations and partnerships.',
    tags: ['People', 'Partnerships', 'Operations'],
    accent: 'aqua',
  },
  {
    initials: 'AR',
    name: 'ArunKumar RM',
    role: 'Founder & CTO',
    bio: "Architect of BizWhats and ACIP, from data model to deployment. Shaped by his brother Kalyan Pemmasani's leadership and his father Muthaiyan R's work ethic.",
    tags: ['AI engineering', 'Architecture', 'Product'],
    accent: 'violet',
  },
  {
    initials: 'DT',
    name: 'Dinesh Thummalapenta',
    role: 'Business Development & Automation Lead',
    bio: 'Builds the automation that keeps leads flowing, and finds the markets where our products win.',
    tags: ['Growth', 'Automation', 'Partnerships'],
    accent: 'coral',
  },
];

function PersonCard({ p }: { p: Person }) {
  return (
    <GlowCard accent={p.accent} bg={color.card} radius={22} component="article" labelledBy={`person-${p.initials}`}>
      <Box sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
        <Box
          aria-hidden="true"
          sx={{
            width: 64,
            height: 64,
            borderRadius: '18px',
            display: 'grid',
            placeItems: 'center',
            background: gradient.iris,
            color: color.paper,
            fontWeight: 700,
            fontStretch: '115%',
            fontSize: '1.3rem',
            letterSpacing: '-0.02em',
            boxShadow: '0 16px 40px -16px rgba(140,123,255,0.8)',
          }}
        >
          {p.initials}
        </Box>
        <Box>
          <Typography id={`person-${p.initials}`} variant="h4" component="h3">
            {p.name}
          </Typography>
          <Typography sx={{ color: color.ink2, fontSize: '0.95rem', mt: 0.5 }}>{p.role}</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: color.ink2, flex: 1 }}>
          {p.bio}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {p.tags.map((t) => (
            <Box key={t} component="span" sx={{ fontFamily: font.mono, fontSize: '0.66rem', letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '999px', border: `1px solid ${color.lineStrong}`, px: 1.25, py: 0.5, color: color.ink2 }}>
              {t}
            </Box>
          ))}
        </Box>
      </Box>
    </GlowCard>
  );
}

export default function Company() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Company' }]}
        eyebrow="Company"
        title="A small team that ships."
        lead="Hadasoftware Private Limited. Product engineering from Hyderabad."
      />

      <Section tone="alt">
        <SectionHead label="Who we are" title="Built to deliver, not to demo." lead="Most business software over-promises. We build systems that do real work, every day." />
      </Section>

      <Section id="leadership">
        <SectionHead label="Leadership" title="The people behind Hadasoft." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>
          {PEOPLE.map((p, i) => (
            <Reveal key={p.initials} delay={i * 0.07} sx={{ height: '100%', '& > div': { height: '100%' } }}>
              <PersonCard p={p} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <Section tone="night">
        <SectionHead label="Principles" title="How we work." />
        <FeatureList
          items={[
            { title: 'Solve real problems', body: "If no one does it today, it's a feature, not a product." },
            { title: 'Storage-mediated systems', body: 'Testable, replayable, observable.' },
            { title: 'Prove every layer', body: 'Slow at first, then suddenly fast.' },
            { title: 'De-scope without apology', body: 'Ship the parts that earn trust first.' },
            { title: 'Multilingual at the schema', body: "India's languages, from the database up." },
            { title: 'Security first', body: 'Guardrails from the first commit.' },
          ]}
        />
      </Section>

      <CtaSection label="Work with us" title="Clients, partners, engineers." lead="All welcome. Start with an email." subject="Hello from hadasoft.in" />
    </>
  );
}
