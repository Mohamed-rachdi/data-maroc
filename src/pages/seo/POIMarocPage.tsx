import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Download, Database } from 'lucide-react';
import { supabase, Dataset } from '../../lib/supabase';
import { SEO } from '../../components/SEO';

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
        ]}
        canonical="https://datamaroc.ma/poi-maroc"
      />

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

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Contenu de la Base POI Maroc
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations Incluses</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Nom de l'établissement</strong> : Appellation officielle
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Catégorie</strong> : Restaurant, hôtel, commerce, service...
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Adresse complète</strong> : Rue, quartier, ville
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Coordonnées GPS</strong> : Latitude et longitude précises
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Note Google</strong> : Évaluation moyenne (0-5 étoiles)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Contact</strong> : Téléphone et site web quand disponibles
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Couverture Géographique</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Casablanca</span>
                    <span className="text-red-600 font-semibold">125K+ POI</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Rabat</span>
                    <span className="text-red-600 font-semibold">85K+ POI</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-4/5"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Marrakech</span>
                    <span className="text-red-600 font-semibold">72K+ POI</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Fès</span>
                    <span className="text-red-600 font-semibold">48K+ POI</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Autres villes</span>
                    <span className="text-red-600 font-semibold">215K+ POI</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cas d'Usage POI Maroc</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <Database className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Applications de Livraison
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Intégrez les POI dans votre app de livraison pour localiser restaurants, commerces
                et adresses clients avec précision.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <Database className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Études de Marché</h3>
              <p className="text-gray-600 leading-relaxed">
                Analysez la densité commerciale, identifiez les zones à fort potentiel et étudiez
                la concurrence par secteur et localisation.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <Database className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Navigation & Tourisme</h3>
              <p className="text-gray-600 leading-relaxed">
                Enrichissez vos applications de navigation avec des POI touristiques, restaurants,
                hôtels et attractions du Maroc.
              </p>
            </div>
          </div>
        </section>

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
