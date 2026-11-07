import { site } from '../content/site';

interface MailtoOptions {
  to?: string;
  subject?: string;
  body?: string;
}

/** Builds a mailto: link. Uses encodeURIComponent so spaces stay spaces in every mail client. */
export function mailto({ to = site.email, subject, body }: MailtoOptions = {}): string {
  const query: string[] = [];
  if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${to}${query.length ? `?${query.join('&')}` : ''}`;
}
