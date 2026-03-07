import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Database as DatabaseIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, Category, Dataset } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredDatasets, setFeaturedDatasets] = useState<Dataset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [categoriesRes, datasetsRes] = await Promise.all([
      supabase.from('categories').select('*').order('display_order'),
      supabase.from('datasets').select('*').eq('is_featured', true).limit(6),
    ]);

    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (datasetsRes.data) setFeaturedDatasets(datasetsRes.data);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/explorer?q=${encodeURIComponent(searchQuery)}`;
    }
  }

  function getIcon(iconName: string) {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <DatabaseIcon className="w-6 h-6" />;
  }

  return (
    <>
      <SEO
        title="Plateforme de Données sur le Maroc"
        description="Explorez, téléchargez et analysez des datasets exclusifs sur l'économie, les entreprises, la mobilité, le climat et bien plus au Maroc. POI Maroc, données entreprises, météo, football, télécom."
        keywords={[
          'data maroc',
          'open data maroc',
          'poi maroc',
          'télécharger données maroc',
          'données entreprises maroc',
          'données météo maroc',
          'données football',
          'données télécom maroc',
          'données mobilité maroc',
        ]}
        canonical="https://geodatamaroc.com/"
      />

      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Plus de 3 millions de données sur le Maroc</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              La plus grande plateforme de données sur le Maroc
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Explorez, téléchargez et analysez des datasets exclusifs sur l'économie, les
              entreprises, la mobilité, le climat et bien plus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/explorer"
                className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg flex items-center justify-center gap-2"
              >
                Explorer les données
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg hover:bg-red-50 transition font-semibold text-lg"
              >
                Demander un accès démo
              </Link>
            </div>

            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des données (ex: POI Maroc, Entreprises Maroc, météo Maroc)"
                className="w-full pl-14 pr-6 py-5 border-2 border-gray-300 rounded-xl text-lg focus:border-red-500 focus:outline-none shadow-sm"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Catégories de données</h2>
          <Link
            to="/categories"
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <div style={{ color: category.color }}>{getIcon(category.icon)}</div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Datasets populaires</h2>
              <p className="text-gray-600">Les données les plus demandées par nos utilisateurs</p>
            </div>
            <Link
              to="/explorer"
              className="hidden sm:flex text-red-600 hover:text-red-700 font-medium items-center gap-2"
            >
              Voir tous les datasets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDatasets.map((dataset) => (
              <Link
                key={dataset.id}
                to={`/dataset/${dataset.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-red-500 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-medium">
                    POPULAIRE
                  </div>
                  <DatabaseIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition">
                  {dataset.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {dataset.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <DatabaseIcon className="w-4 h-4" />
                    <span>{dataset.record_count.toLocaleString()} enregistrements</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{dataset.geographic_coverage}</span>
                  <span className="text-xs font-medium text-red-600">
                    Mise à jour : {dataset.update_frequency}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/explorer"
              className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-2"
            >
              Voir tous les datasets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'un dataset personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Contactez-nous pour obtenir des données sur mesure adaptées à vos besoins spécifiques.
          </p>
          <Link
            to="/demo"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
          >
            Demander un accès démo
          </Link>
        </div>
      </div>
    </>
  );
}
