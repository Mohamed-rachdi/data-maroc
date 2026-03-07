import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database as DatabaseIcon, ArrowLeft } from 'lucide-react';
import { supabase, Category, Dataset } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (categoryData) {
      setCategory(categoryData);

      const { data: datasetsData } = await supabase
        .from('datasets')
        .select('*')
        .eq('category_id', categoryData.id);

      if (datasetsData) setDatasets(datasetsData);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Catégorie introuvable</h1>
        <Link to="/categories" className="text-red-600 hover:text-red-700">
          Retour aux catégories
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={category.name}
        description={category.description}
        keywords={[category.name.toLowerCase(), 'données maroc', 'datasets maroc']}
      />

      <div className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Toutes les catégories
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <DatabaseIcon className="w-8 h-8" style={{ color: category.color }} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {datasets.length === 0 ? (
          <div className="text-center py-12">
            <DatabaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun dataset disponible</h3>
            <p className="text-gray-600">Cette catégorie sera bientôt enrichie de nouveaux datasets</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{datasets.length}</span> dataset
                {datasets.length > 1 ? 's' : ''} disponible{datasets.length > 1 ? 's' : ''}
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
