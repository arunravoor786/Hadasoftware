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
  label: string;
  to: string;
}

export const nav: NavItem[] = [
  { label: 'Services', to: '/services/' },
  { label: 'Products', to: '/products/' },
  { label: 'BizWhats', to: '/bizwhats/' },
  { label: 'ACIP', to: '/acip/' },
  { label: 'Company', to: '/company/' },
  { label: 'Contact', to: '/contact/' },
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
    category: 'Customer retention',
    status: 'production',
    summary: 'WhatsApp-first customer retention for Indian businesses.',
    features: [
      'Finds and scores leads',
      'Reaches them in five languages',
      'Converts trials to paid',
      'Keeps customers coming back',
      'Fits any repeat-customer business',
    ],
    stack: ['Python 3.12', 'FastAPI', 'Supabase', 'WhatsApp Cloud API', 'Anthropic AI', 'Razorpay'],
    to: '/bizwhats/',
  },
  acip: {
    key: 'acip',
    name: 'ACIP',
    category: 'Construction intelligence',
    status: 'development',
    summary: 'AI that prevents construction incidents, from planning to maintenance.',
    features: [
      'Live site risk detection',
      'Compounding-risk scoring',
      'Subsurface prediction',
      'Maintenance after handover',
      'Audit-ready decisions',
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
