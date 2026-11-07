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

function Pills({ items, tint }: { items: string[]; tint: string }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            px: 2,
            py: 1,
            borderRadius: '999px',
            border: `1px solid ${color.lineStrong}`,
            bgcolor: 'rgba(255,255,255,0.03)',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'border-color .25s, box-shadow .25s',
            '&:hover': { borderColor: tint, boxShadow: `0 0 24px -6px ${tint}` },
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

export default function BizWhats() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products/' }, { label: 'BizWhats' }]}
        eyebrow="Product · Live"
        title="BizWhats keeps your customers coming back."
        lead="WhatsApp-first retention for Indian businesses. Find, reach, convert, retain. Automatically."
        actions={
          <>
            <Button variant="contained" size="large" href={site.bizwhatsUrl} target="_blank" rel="noopener noreferrer" endIcon={<ArrowUpRight size={18} />}>
              Visit {site.bizwhatsLabel}
            </Button>
            <ArrowLink href={mailto({ to: site.supportEmail, subject: 'BizWhats demo request', body: DEMO_BODY })}>Request a demo</ArrowLink>
          </>
        }
        aside={
          <Figure caption="One reminder, five languages" note="Illustrative">
            <ChatThread />
          </Figure>
        }
      />

      <Section tone="alt">
        <SectionHead label="The loop" title="Retention, on autopilot." />
        <RetentionLoop />
      </Section>

      <Section>
        <SectionHead label="Sectors" title="Fits any repeat-customer business." />
        <Reveal>
          <Pills items={sectors} tint={color.teal} />
        </Reveal>
      </Section>

      <Section tone="alt">
        <SectionHead label="How it works" title="Six engines. One pipeline." lead="Each writes to the database. The next reads from it." />
        <RetentionPipeline />
      </Section>

      <Section tone="night">
        <SectionHead label="Languages" title="Speaks your customer's language." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: { xs: 6, lg: 8 }, alignItems: 'end' }}>
          <Reveal>
            <LanguageCycler />
          </Reveal>
          <Box>
            <Typography variant="mono" component="h3" sx={{ color: color.ink3, mb: 2 }}>
              Cities served
            </Typography>
            <Pills items={cities} tint={color.sky} />
          </Box>
        </Box>
      </Section>

      <Section>
        <SectionHead label="Stack" title="Small, stable, proven." />
        <Reveal>
          <SpecTable
            caption="BizWhats technology stack"
            rows={[
              { label: 'Backend', cells: ['Python · FastAPI · APScheduler'] },
              { label: 'Data', cells: ['Supabase Postgres, Mumbai'] },
              { label: 'Messaging', cells: ['WhatsApp Business Cloud API'] },
              { label: 'AI', cells: ['Anthropic SDK for replies'] },
              { label: 'Payments', cells: ['Razorpay'] },
              { label: 'Dashboard', cells: ['Next.js'] },
            ]}
          />
        </Reveal>
      </Section>

      <CtaSection
        label="BizWhats team"
        title="See it on your business."
        lead="A demo in your language, within one working day."
        email={site.supportEmail}
        subject="BizWhats demo request"
        body={DEMO_BODY}
        extra={
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, fontFamily: font.mono, fontSize: '0.75rem', color: color.ink3 }}>
            <span>PRODUCT SITE</span>
            <ArrowLink href={site.bizwhatsUrl} external sx={{ fontFamily: 'inherit', fontSize: '0.95rem', color: color.ink }}>
              {site.bizwhatsLabel}
            </ArrowLink>
          </Box>
        }
      />
    </>
  );
}
