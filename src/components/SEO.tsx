import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

export function SEO({ title, description, keywords = [], canonical, ogImage, structuredData }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Geo Data Maroc`;
    document.title = fullTitle;

    const setMeta = (selector: string, attrName: string, attrValue: string, contentValue: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentValue);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords.length > 0) setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    if (ogImage) setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    if (structuredData) {
      let script = document.querySelector('script[data-seo="true"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonical, ogImage, structuredData]);

  return null;
}
