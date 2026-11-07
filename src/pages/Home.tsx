import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CountUp } from '../components/ui/CountUp';
import { CtaSection } from '../components/ui/CtaSection';
import { Figure } from '../components/ui/Figure';
import { ArrowRight, MailIcon } from '../components/ui/icons';
import { Marquee } from '../components/ui/Marquee';
import { NumberedList } from '../components/ui/NumberedList';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { WorkCard } from '../components/WorkCard';
import { services } from '../content/services';
import { site } from '../content/site';
import { work } from '../content/work';
import { LiveLog } from '../graphics/LiveLog';
import { LoopSchematic } from '../graphics/LoopSchematic';
import { ProductPlate } from '../graphics/ProductPlate';
import { mailto } from '../lib/mailto';
import { color, ease, font } from '../theme/tokens';

const PROJECT_BODY =
  'Hi Hadasoft team,\n\nWhat we are trying to solve:\n\nWho handles it today, and how:\n\nTimeline:\n\nCompany and website:\n';

function Headline() {
  const reduce = useReducedMotion();
  return (
    <Typography variant="display" sx={{ maxWidth: '11.5em' }}>
      Software built to{' '}
      <Box component="span" sx={{ position: 'relative', whiteSpace: 'nowrap' }}>
        deliver
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: '0.04em', height: '0.075em', background: color.tealBright, transformOrigin: '0% 50%' }}
        />
      </Box>
      , not to{' '}
      <Box component="span" sx={{ position: 'relative', whiteSpace: 'nowrap', color: color.ink3 }}>
        demo
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.25, duration: 0.55, ease }}
          style={{ position: 'absolute', left: '-0.04em', right: '-0.04em', top: '56%', height: '0.07em', background: color.signal, transformOrigin: '0% 50%' }}
        />
      </Box>
      .
    </Typography>
  );
}

function StatStrip() {
  const stats = [
    { value: <CountUp to={2} />, label: 'Platforms built in-house' },
    { value: <CountUp to={5} />, label: 'Indian languages, natively' },
    { value: <CountUp to={11} suffix="+" />, label: 'Cities served by BizWhats' },
    { value: <span className="tnum">24/7</span>, label: 'Automated pipelines' },
  ];
  return (
    <Box
      component="dl"
      sx={{
        m: 0,
        mt: { xs: 7, lg: 3 },
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
        borderTop: `1px solid ${color.lineStrong}`,
      }}
    >
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: 0.5,
            py: 2.25,
            pl: { xs: i % 2 ? 2 : 0, md: i ? 2.5 : 0 },
            borderLeft: { xs: i % 2 ? `1px solid ${color.line}` : 'none', md: i ? `1px solid ${color.line}` : 'none' },
            borderTop: { xs: i > 1 ? `1px solid ${color.line}` : 'none', md: 'none' },
          }}
        >
          <Box component="dt" sx={{ fontFamily: font.mono, fontSize: '0.7rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: color.ink3 }}>
            {s.label}
          </Box>
          <Box component="dd" sx={{ m: 0, fontSize: 'clamp(1.6rem, 1.2rem + 1vw, 2.2rem)', fontWeight: 560, fontStretch: '108%', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {s.value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Hero() {
  return (
    <Section pad="none" sx={{ pt: { xs: '32px', md: '40px' }, pb: { xs: '56px', md: '48px' } }}>
      <Box
        sx={{
          minHeight: { lg: 'calc(100svh - 68px - 190px)' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 5.3fr) minmax(0, 6.7fr)' },
          alignItems: 'center',
          gap: { xs: 6, lg: 6 },
        }}
      >
        <Box>
          <Reveal>
            <Typography variant="mono" component="p" sx={{ color: color.ink3, mb: 3 }}>
              Product engineering · Magarpatta, Pune
            </Typography>
          </Reveal>
          <Headline />
          <Reveal delay={0.1}>
            <Typography variant="lead" sx={{ mt: 3, color: color.ink2, maxWidth: '44ch' }}>
              We design, build and run production-grade software: our own platforms, BizWhats and ACIP, and custom systems for
              clients who need software that keeps working long after launch.
            </Typography>
          </Reveal>
          <Reveal delay={0.18}>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4.5, gap: 2, alignItems: { xs: 'stretch', sm: 'center' } }}>
              <Button
                variant="contained"
                size="large"
                href={mailto({ subject: 'New project enquiry', body: PROJECT_BODY })}
                startIcon={<MailIcon size={18} />}
              >
                Start a project
              </Button>
              <Button component={RouterLink} to="/products/" variant="outlined" size="large" endIcon={<ArrowRight size={18} />}>
                Explore our products
              </Button>
            </Stack>
          </Reveal>
        </Box>
        <Reveal delay={0.1} sx={{ minWidth: 0 }}>
          <Figure n="1" caption="Two loops, one principle" note="Live diagram · illustrative" sx={{ maxWidth: 640, mx: 'auto' }}>
            <LoopSchematic />
          </Figure>
        </Reveal>
      </Box>
      <StatStrip />
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="services">
        <SectionHead
          index="01"
          label="Services"
          title="We build for clients the way we build for ourselves."
          lead="BizWhats and ACIP are where we earned our skills. Bring us a real problem and we will bring the same engineering to it."
        />
        <NumberedList items={services} />
        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <ArrowLink to="/services/">How we work with clients</ArrowLink>
        </Box>
      </Section>

      <Section tone="alt" id="products">
        <SectionHead
          index="02"
          label="Our products"
          title="One platform in production, one redefining its industry."
          lead="Two platforms we designed, built and run ourselves. BizWhats is serving businesses today; ACIP, our flagship, is in active development, pioneering AI-driven incident prevention for construction."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 } }}>
          <Reveal>
            <ProductPlate productKey="bizwhats" />
          </Reveal>
          <Reveal delay={0.08}>
            <ProductPlate productKey="acip" />
          </Reveal>
        </Box>
      </Section>

      <Section id="work">
        <SectionHead
          index="03"
          label="Client work"
          title="Delivered for clients."
          lead="Our first client engagement, live today. More case studies will join it as projects ship."
        />
        <Box sx={{ display: 'grid', gap: 3 }}>
          {work.map((item, i) => (
            <Reveal key={item.domain}>
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <Section tone="alt" labelledBy="sectors-title">
        <SectionHead index="04" id="sectors-title" label="Who we build for" title="Made for the businesses that keep India running." />
        <Box sx={{ mx: { xs: '-20px', sm: '-32px', md: '-48px' } }}>
          <Marquee
            items={[
              'Salons & Spas',
              'Gyms & Fitness',
              'Coaching Classes',
              'Clinics',
              'Boutiques & Retail',
              'Kirana Stores',
              'Restaurants',
              'Construction & Contracting',
              'Insurers',
              'Service businesses',
            ]}
          />
        </Box>
      </Section>

      <Section>
        <SectionHead
          index="05"
          label="Why Hadasoft"
          title="Engineering discipline you can build a business on."
          lead="We approach every product the way enterprise teams expect: clear contracts, full observability, and systems designed to keep running long after launch."
        />
        <NumberedList
          items={[
            {
              title: 'Storage-mediated architecture',
              body: 'Our systems communicate through a database, not fragile in-memory chains. Every component is independently testable, replayable, and observable.',
            },
            {
              title: 'Multilingual by design',
              body: 'Language is built into the data model, not bolted on as translation. BizWhats speaks English, Hindi, Marathi, Tamil, and Telugu natively.',
            },
            {
              title: 'Automated from day one',
              body: 'The operational pipeline is built before the first customer. We refuse to scale manual processes: the automation is the product.',
            },
            {
              title: 'Enterprise-grade hygiene',
              body: 'Credential rotation, audit trails, idempotency, kill switches. We build with the safeguards large organisations require.',
            },
            {
              title: 'Real problems only',
              body: "Every product solves a problem someone is already paying to handle manually. We're conservative about what's worth automating.",
            },
            {
              title: 'Built to scale',
              body: 'From a single salon to a multi-site enterprise, our platforms are architected to grow without rebuilding the foundation.',
            },
          ]}
        />
      </Section>

      <Section tone="night">
        <SectionHead
          index="06"
          label="Inside the loop"
          title={<>What “automated from day one” looks like.</>}
          lead="Our products run as small engines that hand work to each other through the database, never through fragile in-memory chains. Every step is written down, so it can be tested, replayed and audited."
        />
        <Figure caption="Event stream across BizWhats and LRIE" note="Illustrative · event names mirror real engine stages">
          <Box sx={{ p: { xs: 1.5, md: 2.5 }, border: `1px solid ${color.nightLine}`, bgcolor: color.night2 }}>
            <LiveLog />
          </Box>
        </Figure>
      </Section>

      <CtaSection
        index="07"
        label="Start a project"
        title="Have a project in mind?"
        lead={
          <>
            Whether you run a single shop, a construction enterprise or a product that needs an engineering team, tell us the
            problem. We reply within one working day. For BizWhats, write to{' '}
            <Box component="a" href={mailto({ to: site.supportEmail })} sx={{ color: 'inherit' }}>
              {site.supportEmail}
            </Box>
            .
          </>
        }
        subject="New project enquiry"
        body={PROJECT_BODY}
      />
    </>
  );
}
