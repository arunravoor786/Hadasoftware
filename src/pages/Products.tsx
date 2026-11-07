import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CtaSection } from '../components/ui/CtaSection';
import { EmailBlock } from '../components/ui/EmailBlock';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { SpecTable } from '../components/ui/SpecTable';
import { StatusPill } from '../components/ui/StatusPill';
import { site } from '../content/site';
import { ProductPlate } from '../graphics/ProductPlate';
import { color } from '../theme/tokens';

export default function Products() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        eyebrow="Products"
        title="Our products."
        lead="Two platforms. Two industries. One standard."
      />

      <Section tone="alt">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 } }}>
          <Reveal>
            <ProductPlate productKey="bizwhats" detailed />
          </Reveal>
          <Reveal delay={0.08}>
            <ProductPlate productKey="acip" detailed />
          </Reveal>
        </Box>
      </Section>

      <Section>
        <SectionHead label="Compare" title="Side by side." />
        <Reveal>
          <SpecTable
            caption="BizWhats and ACIP compared"
            head={['BizWhats', 'ACIP']}
            rows={[
              { label: 'For', cells: ['Repeat-customer businesses', 'Builders, asset owners, insurers'] },
              { label: 'Does', cells: ['Customer retention', 'Construction risk intelligence'] },
              { label: 'Covers', cells: ['Find to retain', 'Planning to maintenance'] },
              { label: 'Engine', cells: ['Six-stage pipeline', 'LRIE decision engine'] },
              { label: 'Status', cells: [<StatusPill key="b" status="production" />, <StatusPill key="a" status="development" />] },
              {
                label: 'More',
                cells: [
                  <ArrowLink key="b" href={site.bizwhatsUrl} external>
                    {site.bizwhatsLabel}
                  </ArrowLink>,
                  <ArrowLink key="a" to="/acip/">
                    ACIP
                  </ArrowLink>,
                ],
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="alt">
        <SectionHead label="BizWhats" title="BizWhats has its own home.">
          <Box sx={{ mt: { xs: 4, md: 5 }, display: 'grid', gap: 4 }}>
            <Box>
              <Typography variant="mono" component="p" sx={{ mb: 1.5, color: color.ink3 }}>
                Product site
              </Typography>
              <ArrowLink href={site.bizwhatsUrl} external sx={{ fontSize: 'clamp(1.4rem, 1rem + 1.6vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                {site.bizwhatsLabel}
              </ArrowLink>
            </Box>
            <Box>
              <Typography variant="mono" component="p" sx={{ mb: 1.5, color: color.ink3 }}>
                BizWhats team
              </Typography>
              <EmailBlock email={site.supportEmail} subject="BizWhats enquiry" size="md" />
            </Box>
          </Box>
        </SectionHead>
      </Section>

      <CtaSection label="Next step" title="Not sure which fits?" lead="Tell us the problem. We'll point the way." subject="Which product fits us?" />
    </>
  );
}
