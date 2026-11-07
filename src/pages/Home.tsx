import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CountUp } from '../components/ui/CountUp';
import { CtaSection } from '../components/ui/CtaSection';
import { FeatureList } from '../components/ui/FeatureList';
import { Figure } from '../components/ui/Figure';
import { ArrowRight, MailIcon } from '../components/ui/icons';
import { Marquee } from '../components/ui/Marquee';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { WorkCard } from '../components/WorkCard';
import { services } from '../content/services';
import { site } from '../content/site';
import { work } from '../content/work';
import { LiveLog } from '../graphics/LiveLog';
import { ParticleCore, type ShapeKey } from '../graphics/ParticleCore';
import { ProductPlate } from '../graphics/ProductPlate';
import { mailto } from '../lib/mailto';
import { color, ease, font, gradient } from '../theme/tokens';

const PROJECT_BODY = 'Hi Hadasoft team,\n\nWhat we want to solve:\n\nWho handles it today:\n\nTimeline:\n';

const shimmer = keyframes`
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
`;
const drift = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(4%, -5%, 0) scale(1.08); }
  100% { transform: translate3d(-3%, 4%, 0) scale(0.95); }
`;

const SHAPE_LABEL: Record<ShapeKey, string> = {
  core: 'The core',
  mark: 'Hadasoft',
  link: 'BizWhats × ACIP',
};

function Aurora() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        // Fade the whole glow layer out at the top and bottom so it never shows a seam.
        maskImage: 'linear-gradient(to bottom, transparent 0%, #000 14%, #000 72%, transparent 100%)',
        '& .blob': { position: 'absolute', borderRadius: '50%', animation: `${drift} 20s ease-in-out infinite alternate` },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(180,187,221,0.16) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 70% at 72% 45%, #000 10%, transparent 75%)',
        },
        '@media (prefers-reduced-motion: reduce)': { '& .blob': { animation: 'none' } },
      }}
    >
      <Box className="blob" sx={{ width: '62vw', height: '62vw', right: '-16vw', top: '-12vw', background: 'radial-gradient(circle, rgba(140,123,255,0.42), transparent 62%)' }} />
      <Box className="blob" sx={{ width: '48vw', height: '48vw', left: '-20vw', bottom: '-30vw', background: 'radial-gradient(circle, rgba(65,240,210,0.22), transparent 62%)', animationDelay: '-7s' }} />
      <Box className="blob" sx={{ width: '36vw', height: '36vw', right: '10vw', bottom: '-22vw', background: 'radial-gradient(circle, rgba(255,122,182,0.22), transparent 62%)', animationDelay: '-13s' }} />
    </Box>
  );
}

function Headline() {
  const reduce = useReducedMotion();
  return (
    <Typography variant="display" sx={{ maxWidth: '11em' }}>
      Software built to{' '}
      <Box
        component="span"
        sx={{
          backgroundImage: gradient.iris,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: `${shimmer} 6s ease-in-out infinite alternate`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        deliver
      </Box>
      , not to{' '}
      <Box component="span" sx={{ position: 'relative', whiteSpace: 'nowrap', color: color.ink3 }}>
        demo
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease }}
          style={{ position: 'absolute', left: '-0.04em', right: '-0.04em', top: '54%', height: '0.07em', borderRadius: 4, background: color.signal, transformOrigin: '0% 50%' }}
        />
      </Box>
      .
    </Typography>
  );
}

function StatStrip() {
  const stats = [
    { value: <CountUp to={2} />, label: 'Products built' },
    { value: <CountUp to={5} />, label: 'Indian languages' },
    { value: <CountUp to={11} suffix="+" />, label: 'Cities served' },
    { value: <span className="tnum">24/7</span>, label: 'Always-on pipelines' },
  ];
  return (
    <Box
      component="dl"
      sx={{
        position: 'relative',
        m: 0,
        mt: { xs: 5, lg: 2 },
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
        borderRadius: '20px',
        border: `1px solid ${color.line}`,
        bgcolor: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: 0.5,
            px: { xs: 2.5, md: 3 },
            py: 2.5,
            borderLeft: { xs: i % 2 ? `1px solid ${color.line}` : 'none', md: i ? `1px solid ${color.line}` : 'none' },
            borderTop: { xs: i > 1 ? `1px solid ${color.line}` : 'none', md: 'none' },
          }}
        >
          <Box component="dt" sx={{ fontFamily: font.mono, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: color.ink3 }}>
            {s.label}
          </Box>
          <Box component="dd" sx={{ m: 0, fontSize: 'clamp(1.7rem, 1.2rem + 1.2vw, 2.4rem)', fontWeight: 600, fontStretch: '110%', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {s.value}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Hero() {
  const [shape, setShape] = useState<ShapeKey>('core');
  return (
    <Section pad="none" sx={{ pt: { xs: '20px', md: '16px' }, pb: { xs: '56px', md: '44px' }, overflow: 'hidden' }}>
      <Aurora />
      <Box
        sx={{
          position: 'relative',
          minHeight: { lg: 'calc(100svh - 68px - 140px)' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 5.4fr) minmax(0, 6.6fr)' },
          alignItems: 'center',
          gap: { xs: 1, lg: 2 },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 3, lg: 0 } }}>
          <Reveal>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.75,
                py: 0.75,
                mb: 3.5,
                borderRadius: '999px',
                border: `1px solid ${color.lineStrong}`,
                bgcolor: 'rgba(255,255,255,0.04)',
                fontFamily: font.mono,
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: color.ink2,
              }}
            >
              <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', background: gradient.iris, boxShadow: '0 0 10px rgba(140,123,255,0.9)' }} />
              Product engineering · Pune
            </Box>
          </Reveal>
          <Headline />
          <Reveal delay={0.1}>
            <Typography variant="lead" sx={{ mt: 3, color: color.ink2, maxWidth: '36ch' }}>
              Products, AI systems and automation that keep working after launch.
            </Typography>
          </Reveal>
          <Reveal delay={0.18}>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 4.5, gap: 2, alignItems: { xs: 'stretch', sm: 'center' } }}>
              <Button variant="contained" size="large" href={mailto({ subject: 'New project enquiry', body: PROJECT_BODY })} startIcon={<MailIcon size={18} />}>
                Start a project
              </Button>
              <Button component={RouterLink} to="/products/" variant="outlined" size="large" endIcon={<ArrowRight size={18} />}>
                Our products
              </Button>
            </Stack>
          </Reveal>
        </Box>

        <Box sx={{ position: 'relative', height: { xs: 380, sm: 480, lg: 'min(660px, calc(100svh - 200px))' }, mx: { xs: '-20px', sm: 0 } }}>
          <ParticleCore onShapeChange={setShape} sx={{ height: '100%' }} />
          <Box
            aria-live="off"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: { xs: 4, lg: 16 },
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={shape} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }}>
                <Box sx={{ fontFamily: font.mono, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: color.ink2 }}>
                  {SHAPE_LABEL[shape]}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
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
        <SectionHead label="Services" title="What we build." lead="For clients, the way we build for ourselves." />
        <FeatureList items={services} />
        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <ArrowLink to="/services/">How we work</ArrowLink>
        </Box>
      </Section>

      <Section tone="alt" id="products">
        <SectionHead label="Products" title="Our products." lead="Built, shipped and run in-house." />
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
        <SectionHead label="Client work" title="Delivered." lead="Live and in use." />
        <Box sx={{ display: 'grid', gap: 3 }}>
          {work.map((item, i) => (
            <Reveal key={item.domain}>
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <Section tone="alt" labelledBy="sectors-title">
        <SectionHead id="sectors-title" label="Who we build for" title="For the businesses that keep India running." />
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
              'Construction',
              'Asset owners',
              'Insurers',
            ]}
          />
        </Box>
      </Section>

      <Section>
        <SectionHead label="How we build" title="Discipline you can build on." />
        <FeatureList
          items={[
            { title: 'Storage-mediated', body: 'Components talk through the database. Testable and replayable.' },
            { title: 'Multilingual by design', body: 'Language lives in the data model.' },
            { title: 'Automated from day one', body: 'The automation is the product.' },
            { title: 'Enterprise hygiene', body: 'Audit trails, credential rotation, kill switches.' },
            { title: 'Real problems only', body: 'We automate what someone already pays to do.' },
            { title: 'Built to scale', body: 'One shop to many sites, same foundation.' },
          ]}
        />
      </Section>

      <Section tone="night">
        <SectionHead label="Inside the loop" title="Automated, end to end." lead="Small engines, one database, every step logged." />
        <Figure caption="Live event stream" note="Illustrative">
          <Box sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: '20px', border: `1px solid ${color.line}`, bgcolor: color.night2, boxShadow: '0 40px 100px -60px rgba(140,123,255,0.7)' }}>
            <LiveLog />
          </Box>
        </Figure>
      </Section>

      <CtaSection
        label="Start a project"
        title="Have a project?"
        lead="Tell us the problem. We reply within one working day."
        subject="New project enquiry"
        body={PROJECT_BODY}
        extra={
          <Typography variant="body2" sx={{ color: color.ink2 }}>
            BizWhats?{' '}
            <Box component="a" href={mailto({ to: site.supportEmail })} sx={{ color: color.teal }}>
              {site.supportEmail}
            </Box>
          </Typography>
        }
      />
    </>
  );
}
