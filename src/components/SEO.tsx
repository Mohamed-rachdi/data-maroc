// src/components/SEO.tsx
// CORRECTION CRITIQUE : utilise react-helmet-async au lieu de useEffect
// Le useEffect injectait les meta APRÈS le rendu → Google voyait un HTML vide
// react-helmet-async injecte les meta dans le <head> avant le rendu côté serveur/prerender

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = 'https://geodatamaroc.com/og-default.jpg',
  ogType = 'website',
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | Geo Data Maroc`;
  const siteUrl = 'https://geodatamaroc.com';

  return (
    <Helmet>
      {/* ── Balises de base ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ── Open Graph (Facebook / LinkedIn / WhatsApp) ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Geo Data Maroc" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Données structurées Schema.org (JSON-LD) ── */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
