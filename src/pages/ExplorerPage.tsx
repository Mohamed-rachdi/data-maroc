import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Database as DatabaseIcon } from 'lucide-react';
import { supabase, Dataset } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function ExplorerPage() {
  const [searchParams] = useSearchParams();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDatasets();
  }, [searchQuery]);

  async function loadDatasets() {
    setLoading(true);
    let query = supabase.from('datasets').select('*').order('created_at', { ascending: false });

    if (searchQuery.trim()) {
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,geographic_coverage.ilike.%${searchQuery}%`
      );
    }

    const { data } = await query;
    if (data) setDatasets(data);
    setLoading(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadDatasets();
  }

  return (
    <>
      <SEO
        title="Explorer les Datasets"
        description="Parcourez tous les datasets disponibles sur le Maroc : POI, entreprises, météo, football, télécom, mobilité et bien plus."
        keywords={['explorer data maroc', 'datasets maroc', 'données maroc']}
      />

      <div className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explorer les datasets</h1>
          <p className="text-lg text-gray-600 mb-8">
            Parcourez notre collection complète de données sur le Maroc
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un dataset..."
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:border-red-500 focus:outline-none shadow-sm"
            />
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-12">
            <DatabaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun dataset trouvé</h3>
            <p className="text-gray-600">Essayez de modifier votre recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{datasets.length}</span> dataset
                {datasets.length > 1 ? 's' : ''} trouvé{datasets.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datasets.map((dataset) => (
                <Link
                  key={dataset.id}
                  to={`/dataset/${dataset.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-red-500 transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    {dataset.is_featured && (
                      <div className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-medium">
                        POPULAIRE
                      </div>
                    )}
                    <DatabaseIcon className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition ml-auto" />
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
                      <span>{dataset.record_count.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{dataset.geographic_coverage}</span>
                    <span className="text-xs font-medium text-red-600">
                      {dataset.update_frequency}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
