import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase, Dataset } from '../../lib/supabase';
import { SEO } from '../../components/SEO';

export function DataMarocPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    loadDatasets();
  }, []);

  async function loadDatasets() {
    const { data } = await supabase
      .from('datasets')
      .select('*')
      .eq('is_featured', true)
      .limit(6);

    if (data) setDatasets(data);
  }

  return (
    <>
      <SEO
        title="Data Maroc - Télécharger des Données sur le Maroc"
        description="Accédez aux meilleures sources de données sur le Maroc : POI, entreprises, météo, démographie, télécom. Datasets complets et mis à jour régulièrement."
        keywords={[
          'data maroc',
          'données maroc',
          'base de données maroc',
          'télécharger données maroc',
          'dataset maroc',
        ]}
        canonical="https://datamaroc.ma/data-maroc"
      />

      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Data Maroc : La Référence pour les Données Marocaines
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Accédez à la plus grande collection de datasets sur le Maroc. Données géographiques,
              économiques, démographiques et sectorielles pour alimenter vos projets et analyses.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi Choisir Data Maroc ?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Datasets Complets et Vérifiés
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Plus de 3 millions d'enregistrements couvrant tous les secteurs : économie,
                    géographie, sport, météo, télécommunications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mises à Jour Régulières</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nos données sont actualisées quotidiennement, hebdomadairement ou mensuellement
                    selon les sources pour garantir leur pertinence.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Formats Multiples : CSV, JSON, API
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Téléchargez vos données au format qui vous convient le mieux ou utilisez notre
                    API REST pour une intégration directe.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Support et Documentation Complets
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Guides d'utilisation détaillés, exemples de code et support technique pour vous
                    accompagner dans l'exploitation des données.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Types de Données Disponibles
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>POI Maroc :</strong> +500K points d'intérêt géolocalisés
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>Entreprises :</strong> +2M sociétés avec ICE et informations légales
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>Météo :</strong> Historique depuis 1980 pour 45 villes
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>Football :</strong> Résultats et statistiques de la Botola
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>Télécom :</strong> Trafic et couverture par opérateur et ville
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-gray-700">
                  <strong>Démographie :</strong> Population HCP par commune
                </span>
              </li>
            </ul>

            <Link
              to="/demo"
              className="block w-full bg-red-600 text-white text-center px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold mt-8"
            >
              Demander un accès démo
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Datasets Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Link
                key={dataset.id}
                to={`/dataset/${dataset.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-red-500 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-medium">
                    POPULAIRE
                  </div>
                  <Database className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition">
                  {dataset.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {dataset.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {dataset.record_count.toLocaleString()} données
                  </span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Comment Accéder aux Données Maroc ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Explorer le Catalogue</h3>
              <p className="text-gray-600 leading-relaxed">
                Parcourez notre bibliothèque de datasets organisés par catégories. Utilisez la
                recherche pour trouver rapidement ce dont vous avez besoin.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Prévisualiser les Données
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consultez la structure des champs et un échantillon des données avant de demander
                un accès complet. Vérifiez que les données correspondent à vos besoins.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Télécharger ou Intégrer</h3>
              <p className="text-gray-600 leading-relaxed">
                Téléchargez vos datasets en CSV/JSON ou utilisez notre API REST pour une
                intégration automatisée dans vos applications.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/explorer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg"
            >
              Commencer l'exploration
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
