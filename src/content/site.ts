/**
 * Single source of truth for company facts.
 * Contact is email only, by design: no phone numbers anywhere on the site.
 * `npm run check:contact` fails the build if one ever slips back in.
 */
export const site = {
  name: 'Hadasoft',
  legalName: 'Hadasoftware Private Limited',
  url: 'https://hadasoft.in',
  /** Company, client projects, ACIP, partnerships, careers. */
  email: 'contactus@hadasoft.in',
  /** Everything BizWhats: demos, onboarding, product support. */
  supportEmail: 'support@bizwhats.in',
  bizwhatsUrl: 'https://www.bizwhats.in/',
  bizwhatsLabel: 'www.bizwhats.in',
  location: 'Magarpatta, Pune, Maharashtra, India',
  locationShort: 'Magarpatta, Pune',
  hours: 'Mon–Fri · 10:00–19:00 IST',
  response: 'Within one working day',
  languages: ['English', 'हिन्दी', 'मराठी', 'தமிழ்', 'తెలుగు'],
} as const;

export interface NavItem {
  index: string;
  label: string;
  to: string;
}

export const nav: NavItem[] = [
  { index: '01', label: 'Services', to: '/services/' },
  { index: '02', label: 'Products', to: '/products/' },
  { index: '03', label: 'BizWhats', to: '/bizwhats/' },
  { index: '04', label: 'ACIP', to: '/acip/' },
  { index: '05', label: 'Company', to: '/company/' },
  { index: '06', label: 'Contact', to: '/contact/' },
];

export type StatusKind = 'production' | 'active' | 'rolling' | 'development';

export interface Product {
  key: 'bizwhats' | 'acip';
  name: string;
  category: string;
  status: StatusKind;
  summary: string;
  features: string[];
  stack: string[];
  to: string;
}

export const products: Record<Product['key'], Product> = {
  bizwhats: {
    key: 'bizwhats',
    name: 'BizWhats',
    category: 'Customer retention platform',
    status: 'production',
    summary:
      'A WhatsApp-first platform that helps businesses find, win, and keep customers automatically. Built for Indian SMBs, and adaptable to any business that runs on repeat customers.',
    features: [
      'Automated lead discovery, enrichment, and scoring',
      'Multilingual outreach in five Indian languages',
      'Reply management and trial-to-paid conversion',
      'Retention and re-engagement workflows',
      'Configurable for any repeat-customer sector',
    ],
    stack: ['Python 3.12', 'FastAPI', 'Supabase', 'WhatsApp Cloud API', 'Anthropic AI', 'Razorpay'],
    to: '/bizwhats/',
  },
  acip: {
    key: 'acip',
    name: 'ACIP',
    category: 'Autonomous Construction Intelligence Platform',
    status: 'development',
    summary:
      'AI that prevents construction incidents, not just reports them. The Live Risk Intelligence Engine (LRIE) fuses computer vision, machine learning, and document intelligence into one closed-loop decision engine.',
    features: [
      'Closed-loop risk detection across all six construction phases',
      'Accident prevention learned from historical project data',
      'Subsurface prediction: hidden utilities found before excavation',
      'Multi-agent LangGraph orchestration with a full audit trail',
      'Enterprise-ready: OSHA, ISO 45001, role-based escalation',
    ],
    stack: ['LangGraph', 'LangChain', 'YOLOv8', 'XGBoost', 'Groq LLM', 'FastAPI', 'React + MUI'],
    to: '/acip/',
  },
};

export const sectors = [
  'Salons & Spas',
  'Gyms & Fitness',
  'Coaching Classes',
  'Clinics & Healthcare',
  'Boutiques & Retail',
  'Kirana Stores',
  'Restaurants',
  'Service businesses',
];

export const cities = [
  'Pune',
  'Mumbai',
  'Nashik',
  'Nagpur',
  'Chennai',
  'Coimbatore',
  'Hyderabad',
  'Bangalore',
  'Delhi',
  'Jaipur',
  'Lucknow',
];
