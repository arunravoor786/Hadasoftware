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
    description: 'Product engineering from Pune. Custom platforms, AI systems and automation, plus our own products: BizWhats and ACIP.',
    h1: 'Software built to deliver, not to demo.',
    summary: 'Products, AI systems and automation that keep working after launch.',
  },
  {
    path: '/services/',
    label: 'Services',
    title: 'Services — Custom software, AI and automation · Hadasoft',
    description: 'Custom platforms, AI and computer vision, automation, multilingual messaging and websites, from the team behind BizWhats and ACIP.',
    h1: 'Custom software, built like our own.',
    summary: 'Platforms, AI and automation from the team behind BizWhats and ACIP.',
  },
  {
    path: '/products/',
    label: 'Products',
    title: 'Products — BizWhats and ACIP · Hadasoft',
    description: 'BizWhats, customer retention for Indian businesses, and ACIP, AI that prevents construction incidents from planning to maintenance.',
    h1: 'Our products.',
    summary: 'Two platforms. Two industries. One standard.',
  },
  {
    path: '/bizwhats/',
    label: 'BizWhats',
    title: 'BizWhats — WhatsApp-first customer retention · Hadasoft',
    description: 'BizWhats finds, reaches, converts and retains customers automatically, in five Indian languages. Visit www.bizwhats.in or write to support@bizwhats.in.',
    h1: 'BizWhats keeps your customers coming back.',
    summary: 'WhatsApp-first retention for Indian businesses. Product site: www.bizwhats.in. Support: support@bizwhats.in.',
  },
  {
    path: '/acip/',
    label: 'ACIP',
    title: 'ACIP — AI that prevents construction incidents · Hadasoft',
    description: 'ACIP and its Live Risk Intelligence Engine score and act on construction risk in seconds, across the whole lifecycle, from planning to maintenance after handover.',
    h1: 'AI that prevents construction incidents.',
    summary: 'LRIE fuses vision, ML and documents to score risk and act in seconds, from planning to maintenance.',
  },
  {
    path: '/company/',
    label: 'Company',
    title: 'Company — Hadasoftware Private Limited',
    description: 'Hadasoftware Private Limited: product engineering from Magarpatta, Pune. Meet the team behind BizWhats and ACIP.',
    h1: 'A small team that ships.',
    summary: 'Hadasoftware Private Limited. Product engineering from Magarpatta, Pune.',
  },
  {
    path: '/contact/',
    label: 'Contact',
    title: 'Contact — Hadasoft',
    description: 'Email contactus@hadasoft.in for projects and ACIP, or support@bizwhats.in for BizWhats. We reply within one working day.',
    h1: "Let's talk.",
    summary: 'Email only. We reply within one working day.',
  },
];

export const notFound: PageMeta = {
  path: '/404',
  label: 'Not found',
  title: 'Page not found — Hadasoft',
  description: 'This page does not exist on hadasoft.in.',
  h1: 'Off the map.',
  summary: 'This page does not exist.',
};

export function metaFor(pathname: string): PageMeta {
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return pages.find((p) => p.path === normalised) ?? notFound;
}
