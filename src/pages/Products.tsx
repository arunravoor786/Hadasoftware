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

export default function Products() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        eyebrow="Products"
        title="Two platforms, built for very different industries."
        lead="BizWhats is in production today; ACIP is in active development. Explore what they do, who they serve, and the technology behind them."
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
        <SectionHead index="01" label="Comparison" title="Different problems, one engineering standard." />
        <Reveal>
          <SpecTable
            caption="BizWhats and ACIP compared"
            head={['BizWhats', 'ACIP']}
            rows={[
              { label: 'Category', cells: ['Customer retention', 'Construction risk intelligence'] },
              { label: 'Customer', cells: ['SMBs and any repeat-customer business', 'Construction enterprises and insurers'] },
              { label: 'Core engine', cells: ['Six-stage retention pipeline', 'Live Risk Intelligence Engine (LRIE)'] },
              { label: 'Frontend', cells: ['Web dashboard and WhatsApp', 'React + TypeScript'] },
              { label: 'Backend', cells: ['Python · FastAPI', 'Python · FastAPI · LangGraph'] },
              { label: 'Database', cells: ['Supabase Postgres', 'PostgreSQL'] },
              { label: 'Status', cells: [<StatusPill key="b" status="production" />, <StatusPill key="a" status="development" />] },
              {
                label: 'Product site',
                cells: [
                  <ArrowLink key="b" href={site.bizwhatsUrl} external>
                    {site.bizwhatsLabel}
                  </ArrowLink>,
                  <Box key="a" component="span">
                    On this site: <ArrowLink to="/acip/">ACIP</ArrowLink>
                  </Box>,
                ],
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="alt">
        <SectionHead
          index="02"
          label="BizWhats"
          title="BizWhats has its own home."
          lead="The product site covers everything BizWhats in detail. Questions, demos and support go straight to the BizWhats team."
        >
          <Box sx={{ mt: { xs: 5, md: 6 }, display: 'grid', gap: 4 }}>
            <Box>
              <Typography variant="mono" component="p" sx={{ mb: 1.5, opacity: 0.7 }}>
                Product site
              </Typography>
              <ArrowLink href={site.bizwhatsUrl} external sx={{ fontSize: 'clamp(1.4rem, 1rem + 1.6vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                {site.bizwhatsLabel}
              </ArrowLink>
            </Box>
            <Box>
              <Typography variant="mono" component="p" sx={{ mb: 1.5, opacity: 0.7 }}>
                BizWhats team
              </Typography>
              <EmailBlock email={site.supportEmail} subject="BizWhats enquiry" size="md" />
            </Box>
          </Box>
        </SectionHead>
      </Section>

      <CtaSection
        index="03"
        title="Not sure which fits your business?"
        lead="Tell us what you're trying to solve and we'll point you to the right product, or build toward it."
        subject="Which product fits us?"
      />
    </>
  );
}
