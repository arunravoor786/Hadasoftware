import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { SITE_URL, metaFor, notFound } from '../../seo/pages';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Keeps title, description, canonical and social tags in sync with the route. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname);
    const missing = meta === notFound;
    const url = `${SITE_URL}${missing ? pathname : meta.path}`;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', missing ? 'noindex' : 'index, follow');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}
