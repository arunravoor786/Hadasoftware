import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CtaSection } from '../components/ui/CtaSection';
import { FeatureList } from '../components/ui/FeatureList';
import { Figure } from '../components/ui/Figure';
import { MailIcon } from '../components/ui/icons';
import { PageHead } from '../components/ui/PageHead';
import { Reveal } from '../components/ui/Reveal';
import { Section } from '../components/ui/Section';
import { SectionHead } from '../components/ui/SectionHead';
import { SpecTable } from '../components/ui/SpecTable';
import { WorkCard } from '../components/WorkCard';
import { process, services } from '../content/services';
import { work } from '../content/work';
import { LayerStack } from '../graphics/LayerStack';
import { mailto } from '../lib/mailto';

const PROJECT_BODY = 'Hi Hadasoft team,\n\nWhat we want to solve:\n\nWho handles it today:\n\nTimeline:\n';

export default function Services() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Services"
        title="Custom software, built like our own."
        lead="Platforms, AI and automation from the team behind BizWhats and ACIP."
        actions={
          <>
            <Button variant="contained" size="large" href={mailto({ subject: 'New project enquiry', body: PROJECT_BODY })} startIcon={<MailIcon size={18} />}>
              Start a project
            </Button>
            <ArrowLink to="/products/">See our work</ArrowLink>
          </>
        }
        aside={
          <Figure caption="Every layer tested before the next" note="Illustrative">
            <LayerStack />
          </Figure>
        }
      />

      <Section tone="alt">
        <SectionHead label="What we build" title="Six things we do well." />
        <FeatureList items={services} />
      </Section>

      <Section>
        <SectionHead label="How we work" title="Four steps. Every project." />
        <FeatureList items={process} columns={4} />
      </Section>

      <Section tone="alt">
        <SectionHead label="Stack" title="Proven in production." />
        <Reveal>
          <SpecTable
            caption="Technology Hadasoft uses on client projects"
            rows={[
              { label: 'Backend', cells: ['Python · FastAPI · SQLAlchemy · PostgreSQL'] },
              { label: 'Frontend', cells: ['React · TypeScript · MUI · Next.js'] },
              { label: 'AI & ML', cells: ['LangGraph · YOLOv8 · XGBoost · PyTorch · RAG'] },
              { label: 'Messaging', cells: ['WhatsApp Cloud API · Razorpay'] },
              { label: 'Infrastructure', cells: ['Docker · GitHub Actions · Supabase'] },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <SectionHead label="Client work" title="Delivered." />
        <Box sx={{ display: 'grid', gap: 3 }}>
          {work.map((item, i) => (
            <Reveal key={item.domain}>
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <CtaSection
        label="Start a project"
        title="Tell us the problem."
        lead="What it is, who handles it today, and your timeline. That's enough."
        subject="New project enquiry"
        body={PROJECT_BODY}
      />
    </>
  );
}
