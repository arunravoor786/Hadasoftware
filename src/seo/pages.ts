/**
 * Per-page metadata. Used by the app at runtime (document title/meta) and by
 * scripts/postbuild.mjs, which writes a real HTML file per route so titles,
 * descriptions and link previews are correct even before JavaScript runs.
 *
 * Keep this file dependency-free: Node imports it directly.
 */
export const SITE_URL = 'https://hadasoft.in';
export const SITE_NAME = 'Hadasoft';
export const CONTACT_EMAIL = 'contactus@hadasoft.in';

export interface PageMeta {
  path: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
}

export const pages: PageMeta[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Hadasoft — Software built to deliver, not to demo',
    description:
      'Hadasoftware Private Limited is a product-engineering company in Pune. We build custom software, AI systems and automation for clients, and our own platforms: BizWhats and ACIP.',
    h1: 'Software built to deliver, not to demo.',
    summary:
      'We design, build and run production-grade software: our own platforms, BizWhats and ACIP, and custom systems for clients who need software that keeps working long after launch.',
  },
  {
    path: '/services/',
    label: 'Services',
    title: 'Services — Custom software, AI and automation · Hadasoft',
    description:
      'Custom software and SaaS platforms, AI and computer-vision systems, workflow automation, multilingual WhatsApp systems and websites, built by the team behind BizWhats and ACIP.',
    h1: 'Custom software, built the way we build our own.',
    summary:
      'Most of what we know, we learned shipping BizWhats and ACIP. We bring the same engineering to client work: production-grade platforms, AI systems and automation that keep working long after launch.',
  },
  {
    path: '/products/',
    label: 'Products',
    title: 'Products — BizWhats and ACIP · Hadasoft',
    description:
      'BizWhats, a customer retention platform in production, and ACIP, an autonomous construction intelligence platform in active development. Different problems, one engineering standard.',
    h1: 'Two platforms, built for very different industries.',
    summary:
      'BizWhats keeps customers coming back for small and medium businesses. ACIP catches construction risk before it becomes loss.',
  },
  {
    path: '/bizwhats/',
    label: 'BizWhats',
    title: 'BizWhats — Customer retention platform · Hadasoft',
    description:
      'BizWhats is a WhatsApp-first customer retention platform by Hadasoft. It finds, reaches, converts and retains customers automatically, in five Indian languages. Visit www.bizwhats.in.',
    h1: 'BizWhats — the platform that keeps your customers coming back.',
    summary:
      'Six engines, one automated pipeline: Scout, Enrich, Outreach, Follow-up, Close and Retain. Built for Indian SMBs and configurable for any business that depends on repeat customers. Product site: www.bizwhats.in. Support: support@bizwhats.in.',
  },
  {
    path: '/acip/',
    label: 'ACIP',
    title: 'ACIP — Autonomous Construction Intelligence Platform · Hadasoft',
    description:
      'ACIP, powered by the Live Risk Intelligence Engine (LRIE), is AI that prevents construction incidents across every phase, including subsurface risks a camera cannot see.',
    h1: 'AI that prevents construction incidents — not just reports them.',
    summary:
      'ACIP fuses computer vision, machine learning, document intelligence and multi-agent orchestration into one deterministic decision engine that observes, scores, decides and escalates.',
  },
  {
    path: '/company/',
    label: 'Company',
    title: 'Company — Leadership and story · Hadasoft',
    description:
      'Meet the leadership of Hadasoftware Private Limited and how we build software for customer retention, project risk and client projects, from Magarpatta, Pune.',
    h1: 'A software company building platforms that businesses depend on.',
    summary:
      'Hadasoft was founded on a simple conviction: most business software over-promises and under-delivers. We build systems that earn their place by doing real work, every day, reliably.',
  },
  {
    path: '/contact/',
    label: 'Contact',
    title: 'Contact — Hadasoft',
    description:
      'Write to contactus@hadasoft.in for projects, ACIP briefings, partnerships or careers, and to support@bizwhats.in for BizWhats demos and support. We reply within one working day.',
    h1: "Let's talk about what you're building.",
    summary:
      'Email contactus@hadasoft.in for projects, partnerships and ACIP, or support@bizwhats.in for BizWhats. We reply within one working day.',
  },
];

export const notFound: PageMeta = {
  path: '/404',
  label: 'Not found',
  title: 'Page not found — Hadasoft',
  description: 'This page does not exist on hadasoft.in.',
  h1: 'Off the survey.',
  summary: 'This page does not appear on any current plan of hadasoft.in.',
};

export function metaFor(pathname: string): PageMeta {
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return pages.find((p) => p.path === normalised) ?? notFound;
}
