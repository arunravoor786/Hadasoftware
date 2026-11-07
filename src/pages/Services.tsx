import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ArrowLink } from '../components/ui/ArrowLink';
import { CtaSection } from '../components/ui/CtaSection';
import { Figure } from '../components/ui/Figure';
import { MailIcon } from '../components/ui/icons';
import { NumberedList } from '../components/ui/NumberedList';
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

const PROJECT_BODY =
  'Hi Hadasoft team,\n\nWhat we are trying to solve:\n\nWho handles it today, and how:\n\nWhat it costs us today:\n\nTimeline:\n\nCompany and website:\n';

export default function Services() {
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Services · Client projects"
        title="Custom software, built the way we build our own."
        lead="Most of what we know, we learned shipping BizWhats and ACIP. We bring the same engineering to client work: production-grade platforms, AI systems and automation that keep working long after launch."
        actions={
          <>
            <Button variant="contained" size="large" href={mailto({ subject: 'New project enquiry', body: PROJECT_BODY })} startIcon={<MailIcon size={18} />}>
              Start a project
            </Button>
            <ArrowLink to="/products/">See what we have built</ArrowLink>
          </>
        }
        aside={
          <Figure n="1" caption="Prove every layer" note="Illustrative build">
            <LayerStack />
          </Figure>
        }
      />

      <Section tone="alt">
        <SectionHead
          index="01"
          label="What we build"
          title="Six things we do well, because we have done them for ourselves."
          lead="We take on work where our own products have already taught us the hard lessons."
        />
        <NumberedList items={services} />
      </Section>

      <Section>
        <SectionHead
          index="02"
          label="How we work"
          title="Four steps, the same on every project."
          lead="The principles we use on BizWhats and ACIP, applied to yours."
        />
        <NumberedList items={process} columns={4} />
      </Section>

      <Section tone="alt">
        <SectionHead index="03" label="Technology" title="A stack we run in production every day." lead="Every choice is one we would defend years from now." />
        <Reveal>
          <SpecTable
            caption="Technology Hadasoft uses on client projects"
            rows={[
              { label: 'Backend', cells: ['Python · FastAPI · Pydantic v2 · SQLAlchemy 2 · Alembic'] },
              { label: 'Frontend', cells: ['React · TypeScript · MUI · Next.js · Vite'] },
              { label: 'AI & ML', cells: ['LangGraph · LangChain · YOLOv8 · XGBoost · PyTorch · OpenCV · scikit-learn · RAG with ChromaDB'] },
              { label: 'Data', cells: ['PostgreSQL · Supabase'] },
              { label: 'Messaging & payments', cells: ['WhatsApp Business Cloud API · Razorpay'] },
              { label: 'Infrastructure', cells: ['Docker · GitHub Actions · MLflow · Cloudflare R2'] },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <SectionHead index="04" label="Client work" title="Delivered for clients." lead="Our first client engagement, live today." />
        <Box sx={{ display: 'grid', gap: 3 }}>
          {work.map((item, i) => (
            <Reveal key={item.domain}>
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <CtaSection
        index="05"
        label="Start a project"
        title="Tell us the problem, not the feature list."
        lead="A short email is enough: what you are trying to solve, who handles it today and how, what it costs you, and your timeline. We reply within one working day."
        subject="New project enquiry"
        body={PROJECT_BODY}
      />
    </>
  );
}
