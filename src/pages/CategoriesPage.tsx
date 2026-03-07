import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Database as DatabaseIcon } from 'lucide-react';
import { supabase, Category } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase.from('categories').select('*').order('display_order');

    if (data) setCategories(data);
    setLoading(false);
  }

  function getIcon(iconName: string) {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <DatabaseIcon className="w-8 h-8" />;
  }

  return (
    <>
      <SEO
        title="Catégories de Datasets"
        description="Explorez nos datasets organisés par catégorie : POI, entreprises, météo, football, télécom, mobilité et bien plus."
        keywords={['catégories données maroc', 'types datasets maroc']}
      />

      <div className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catégories de Datasets</h1>
          <p className="text-lg text-gray-600">
            Parcourez nos données organisées par secteur et thématique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-red-500 hover:shadow-xl transition group"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <div style={{ color: category.color }}>{getIcon(category.icon)}</div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-red-600 transition">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
