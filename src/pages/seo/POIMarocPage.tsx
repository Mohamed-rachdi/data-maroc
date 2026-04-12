import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Download, Database } from 'lucide-react';
import { supabase, Dataset } from '../../lib/supabase';
import { SEO } from '../../components/SEO';

// ── Schema.org pour Google ───────────────────────────────────────────────────
const buildStructuredData = (dataset: Dataset | null) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://geodatamaroc.com' },
        { '@type': 'ListItem', position: 2, name: 'Data Maroc', item: 'https://geodatamaroc.com/data-maroc' },
        { '@type': 'ListItem', position: 3, name: 'POI Maroc', item: 'https://geodatamaroc.com/poi-maroc' },
      ],
    },
    ...(dataset
      ? [
          {
            '@type': 'Dataset',
            name: 'POI Maroc - Points d\'Intérêt Google Maps',
            description: 'Base de données complète de +500 000 points d\'intérêt géolocalisés au Maroc : restaurants, hôtels, commerces, services publics, pharmacies, banques.',
            url: 'https://geodatamaroc.com/poi-maroc',
            keywords: ['POI Maroc', 'points d\'intérêt', 'Google Maps Maroc', 'géolocalisation', 'commerces Maroc'],
            spatialCoverage: { '@type': 'Place', name: 'Maroc', geo: { '@type': 'GeoShape', addressCountry: 'MA' } },
            variableMeasured: [
              { '@type': 'PropertyValue', name: 'Nombre d\'enregistrements', value: dataset.record_count },
            ],
            distribution: [
              { '@type': 'DataDownload', encodingFormat: 'text/csv', name: 'CSV' },
              { '@type': 'DataDownload', encodingFormat: 'application/json', name: 'JSON' },
            ],
          },
        ]
      : []),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce qu\'un POI (Point of Interest) au Maroc ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Un POI (Point d\'Intérêt) est tout lieu géolocalisé utile aux utilisateurs : restaurants, hôtels, commerces, services publics, stations essence, pharmacies, banques. La base POI Maroc regroupe +500 000 points à travers tout le territoire marocain.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment télécharger la base de données POI Maroc ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vous pouvez télécharger la base POI Maroc en CSV ou JSON depuis la page dataset, ou l\'intégrer directement via notre API REST. Un accès démo est disponible pour tester les données avant l\'achat.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles villes sont couvertes dans la base POI Maroc ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La base POI Maroc couvre l\'ensemble du territoire : Casablanca (125K+ POI), Rabat (85K+), Marrakech (72K+), Fès (48K+) et plus de 215K points dans les autres villes et régions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles informations sont incluses pour chaque POI ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Chaque point d\'intérêt contient : nom de l\'établissement, catégorie, adresse complète, coordonnées GPS (latitude/longitude), note Google (0-5 étoiles), numéro de téléphone et site web quand disponibles.',
          },
        },
      ],
    },
  ],
});

export function POIMarocPage() {
  const [poiDataset, setPoiDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    loadPOIDataset();
  }, []);

  async function loadPOIDataset() {
    const { data } = await supabase
      .from('datasets')
      .select('*')
      .eq('slug', 'poi-maroc-google-maps')
      .maybeSingle();

    if (data) setPoiDataset(data);
  }

  return (
    <>
      <SEO
        title="POI Maroc - Télécharger Points d'Intérêt Google Maps"
        description="Base de données complète de +500K points d'intérêt au Maroc : restaurants, hôtels, commerces, services. Données géolocalisées extraites de Google Maps."
        keywords={[
          'poi maroc',
          'points intérêt maroc',
          'google maps maroc',
          'géolocalisation maroc',
          'adresses maroc',
          'commerces maroc',
          'base données poi maroc',
          'télécharger poi maroc',
        ]}
        canonical="https://geodatamaroc.com/poi-maroc"
        ogImage="https://geodatamaroc.com/og-poi-maroc.jpg"
        structuredData={buildStructuredData(poiDataset)}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-12 h-12 text-red-600" />
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">POI Maroc</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Accédez à la base de données la plus complète de points d'intérêt au Maroc. Plus de
              500 000 établissements géolocalisés avec informations détaillées extraites de Google
              Maps.
            </p>
            <Link
              to={poiDataset ? `/dataset/${poiDataset.slug}` : '/demo'}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg"
            >
              <Download className="w-5 h-5" />
              Télécharger POI Maroc
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Qu'est-ce qu'un POI ──────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Qu'est-ce qu'un POI (Point of Interest) ?
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Un POI (Point d'Intérêt) désigne tout lieu ou établissement géolocalisé pouvant être
              utile aux utilisateurs : restaurants, hôtels, commerces, services publics, stations
              essence, pharmacies, banques, etc. Notre base POI Maroc regroupe l'ensemble de ces
              points à travers tout le territoire marocain.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Les données POI sont essentielles pour les applications de cartographie, navigation GPS,
              livraison à domicile, tourisme, études de marché et analyses de localisation commerciale.
            </p>
          </div>
        </section>

        {/* ── Contenu de la base ───────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Contenu de la Base POI Maroc
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations Incluses</h3>
              <ul className="space-y-3">
                {[
                  ['Nom de l\'établissement', 'Appellation officielle'],
                  ['Catégorie', 'Restaurant, hôtel, commerce, service...'],
                  ['Adresse complète', 'Rue, quartier, ville'],
                  ['Coordonnées GPS', 'Latitude et longitude précises'],
                  ['Note Google', 'Évaluation moyenne (0-5 étoiles)'],
                  ['Contact', 'Téléphone et site web quand disponibles'],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                    <span className="text-gray-700">
                      <strong>{label}</strong> : {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Couverture Géographique</h3>
              <div className="space-y-4">
                {[
                  { city: 'Casablanca', count: '125K+', pct: 'w-full' },
                  { city: 'Rabat', count: '85K+', pct: 'w-4/5' },
                  { city: 'Marrakech', count: '72K+', pct: 'w-3/4' },
                  { city: 'Fès', count: '48K+', pct: 'w-2/3' },
                  { city: 'Autres villes', count: '215K+', pct: 'w-1/2' },
                ].map(({ city, count, pct }) => (
                  <div key={city}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">{city}</span>
                      <span className="text-red-600 font-semibold">{count} POI</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-red-600 ${pct}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cas d'usage ──────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cas d'Usage POI Maroc</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Applications de Livraison',
                desc: "Intégrez les POI dans votre app de livraison pour localiser restaurants, commerces et adresses clients avec précision.",
              },
              {
                title: 'Études de Marché',
                desc: "Analysez la densité commerciale, identifiez les zones à fort potentiel et étudiez la concurrence par secteur et localisation.",
              },
              {
                title: 'Navigation & Tourisme',
                desc: "Enrichissez vos applications de navigation avec des POI touristiques, restaurants, hôtels et attractions du Maroc.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-200 p-6">
                <Database className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Questions Fréquentes sur POI Maroc
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Comment télécharger la base de données POI Maroc ?",
                a: "Depuis la page dataset, vous pouvez télécharger la base en CSV ou JSON. Un accès démo est disponible pour tester avant achat. L'API REST permet aussi une intégration directe dans vos applications.",
              },
              {
                q: "Quelles villes sont couvertes dans la base POI Maroc ?",
                a: "La base couvre tout le territoire marocain : Casablanca (125K+ POI), Rabat (85K+), Marrakech (72K+), Fès (48K+) et plus de 215K points répartis dans les autres villes et régions.",
              },
              {
                q: "Quelles informations sont incluses pour chaque point d'intérêt ?",
                a: "Chaque POI contient : nom, catégorie, adresse complète, coordonnées GPS (latitude/longitude), note Google, téléphone et site web quand disponibles.",
              },
              {
                q: "À quelle fréquence la base POI Maroc est-elle mise à jour ?",
                a: "La base POI Maroc est mise à jour mensuellement pour intégrer les nouveaux établissements, les fermetures et les changements d'informations.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:text-red-600 transition list-none">
                  {q}
                  <span className="text-red-600 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA final ────────────────────────────────────────────────────── */}
        {poiDataset && (
          <section className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à Télécharger POI Maroc ?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              {poiDataset.record_count.toLocaleString()} points d'intérêt disponibles en CSV, JSON
              et via API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/dataset/${poiDataset.slug}`}
                className="bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
              >
                Voir les Détails
              </Link>
              <Link
                to="/demo"
                className="bg-red-800 text-white px-8 py-4 rounded-lg hover:bg-red-900 transition font-semibold text-lg border-2 border-white"
              >
                Demander un Accès
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
