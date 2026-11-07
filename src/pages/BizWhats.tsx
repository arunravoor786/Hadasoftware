import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CtaSection } from '../components/ui/CtaSection';
import { Figure } from '../components/ui/Figure';
import { ArrowUpRight } from '../components/ui/icons';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { SpecTable } from '../components/ui/SpecTable';
import { cities, sectors, site } from '../content/site';
import { ChatThread } from '../graphics/ChatThread';
import { LanguageCycler } from '../graphics/LanguageCycler';
import { RetentionLoop } from '../graphics/RetentionLoop';
import { RetentionPipeline } from '../graphics/RetentionPipeline';
import { mailto } from '../lib/mailto';
import { color, font } from '../theme/tokens';

const DEMO_BODY = 'Hi BizWhats team,\n\nI would like a demo.\n\nBusiness type:\nCity:\nPreferred language:\n';

export default function BizWhats() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products/' }, { label: 'BizWhats' }]}
        eyebrow="Product · In production"
        title="BizWhats — the platform that keeps your customers coming back."
        lead="A WhatsApp-first customer retention platform. BizWhats finds the right customers, reaches them in their own language, converts them, and keeps them engaged, automatically. Built for Indian SMBs, and configurable for any business that depends on repeat customers."
        actions={
          <>
            <Button
              variant="contained"
              size="large"
              href={site.bizwhatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowUpRight size={18} />}
            >
              Visit {site.bizwhatsLabel}
            </Button>
            <ArrowLink href={mailto({ to: site.supportEmail, subject: 'BizWhats demo request', body: DEMO_BODY })}>Request a demo</ArrowLink>
          </>
        }
        aside={
          <Figure n="1" caption="One reminder, five languages" note="Illustrative threads">
            <ChatThread />
          </Figure>
        }
      />

      <Section tone="alt">
        <SectionHead
          index="01"
          label="What BizWhats does"
          title="Retention is the whole product."
          lead="Acquiring a customer is expensive. Keeping one is where the profit is. BizWhats runs the entire retention loop so business owners don't have to."
        />
        <RetentionLoop />
      </Section>

      <Section>
        <SectionHead
          index="02"
          label="Built once, fits everywhere"
          title="A retention engine that adapts to any business."
          lead="BizWhats was built first for Indian small and medium businesses: salons, gyms, coaching classes, clinics, boutiques, kirana stores. The engine underneath is sector-agnostic. Any business that depends on customers returning can run on BizWhats."
        />
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
            borderTop: `1px solid ${color.lineStrong}`,
          }}
        >
          {sectors.map((s, i) => (
            <Box
              component="li"
              key={s}
              sx={{
                py: 2.5,
                pr: 2,
                borderBottom: `1px solid ${color.line}`,
                display: 'flex',
                gap: 2,
                alignItems: 'baseline',
                fontSize: '1.15rem',
                fontWeight: 540,
                letterSpacing: '-0.01em',
              }}
            >
              <Box component="span" sx={{ fontFamily: font.mono, fontSize: '0.7rem', color: color.ink3 }}>
                {String(i + 1).padStart(2, '0')}
              </Box>
              {s}
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="alt">
        <SectionHead
          index="03"
          label="How it works"
          title="Six engines. One automated pipeline."
          lead="Every engine writes to the database; the next reads from it. No fragile chains: each stage is independently testable, replayable, and observable."
        />
        <RetentionPipeline />
      </Section>

      <Section tone="night">
        <SectionHead
          index="04"
          label="Built for India"
          title="Speaks your customer's language, literally."
          lead="Language is part of every lead's identity from the moment it enters the system. Templates, prompts, and replies are all selected from that tag: multilingual at the schema, not as an afterthought."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: { xs: 7, lg: 8 }, alignItems: 'end' }}>
          <Reveal>
            <LanguageCycler />
          </Reveal>
          <Box>
            <Typography variant="mono" component="h3" sx={{ color: color.onNight3, mb: 2 }}>
              Coverage · 11 cities
            </Typography>
            <Box
              component="ol"
              sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 3 }}
            >
              {cities.map((city, i) => (
                <Box
                  component="li"
                  key={city}
                  sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline', py: 1, borderTop: `1px solid ${color.nightLine}` }}
                >
                  <Box component="span" sx={{ fontFamily: font.mono, fontSize: '0.68rem', color: color.onNight3 }}>
                    {String(i + 1).padStart(2, '0')}
                  </Box>
                  {city}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Section>

      <Section>
        <SectionHead
          index="05"
          label="Technology"
          title="The stack behind BizWhats."
          lead="A deliberately small, deliberately stable set of tools: every choice one we'd defend years from now."
        />
        <Reveal>
          <SpecTable
            caption="BizWhats technology stack"
            rows={[
              { label: 'Backend', cells: ['Python 3.12 · FastAPI · SQLAlchemy 2.0 (psycopg3) · APScheduler'] },
              { label: 'Database', cells: ['Supabase Postgres (Mumbai region)'] },
              { label: 'Messaging', cells: ['WhatsApp Business Cloud API'] },
              { label: 'AI layer', cells: ['Anthropic SDK for reply intelligence'] },
              { label: 'Payments', cells: ['Razorpay (trial-to-paid)'] },
              { label: 'Lead sources', cells: ['Google Places · SerpAPI · Playwright · JustDial · IndiaMART'] },
              { label: 'Frontend', cells: ['Next.js dashboard'] },
            ]}
          />
        </Reveal>
      </Section>

      <CtaSection
        index="06"
        label="BizWhats team"
        tone="night"
        title="See BizWhats running on your business."
        lead="Write to the BizWhats team and we'll send a demo in your preferred language within one working day. Already a customer? The same address reaches support."
        email={site.supportEmail}
        subject="BizWhats demo request"
        body={DEMO_BODY}
        extra={
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
            <Typography variant="mono" component="span" sx={{ color: color.onNight3 }}>
              BizWhats has its own home
            </Typography>
            <ArrowLink href={site.bizwhatsUrl} external>
              {site.bizwhatsLabel}
            </ArrowLink>
          </Box>
        }
      />
    </>
  );
}
