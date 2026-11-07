/** Client work. Add a new entry here and it appears on Home and Services. */
export interface WorkItem {
  client: string;
  url: string;
  domain: string;
  kind: string;
  sector: string;
  summary: string;
  scope: string[];
  /** Optional screenshot in /public/work. Without one, a typographic preview is drawn. */
  image?: string;
}

export const work: WorkItem[] = [
  {
    client: 'Dakshin Projects',
    url: 'https://dakshinprojects.in/',
    domain: 'dakshinprojects.in',
    kind: 'Company website',
    sector: 'Civil & technical contracting · Hyderabad',
    summary:
      'The company website for Dakshin Projects, a civil and technical contracting firm in Hyderabad that builds for water utilities, banks, NBFCs and private clients. Seven pages, a quote-request flow, and an orbitable 3D site model in the hero.',
    scope: ['7-page website', 'Interactive 3D hero', 'Design & build', 'Live'],
    image: '/work/dakshinprojects.jpg',
  },
];
