import type { FeatureItem } from '../components/ui/FeatureList';

/** What Hadasoft builds for clients. Each line is backed by something we have shipped. */
export const services: FeatureItem[] = [
  { title: 'Custom platforms', body: 'SaaS, dashboards and APIs, built for production.' },
  { title: 'AI & computer vision', body: 'Detection, scoring and RAG, with audit trails.' },
  { title: 'Automation', body: 'Pipelines that replace manual work.' },
  { title: 'Multilingual messaging', body: 'WhatsApp journeys in five Indian languages.' },
  { title: 'Websites & web apps', body: 'Fast, accessible, mobile-first.' },
  { title: 'Long-term partnership', body: 'We stay after launch.' },
];

export const process: FeatureItem[] = [
  { title: 'Understand', body: 'Start from what the problem costs today.' },
  { title: 'Architect', body: 'Data model and contracts first.' },
  { title: 'Build in layers', body: 'Each layer tested before the next.' },
  { title: 'Ship & improve', body: 'Deploy, monitor, iterate.' },
];
