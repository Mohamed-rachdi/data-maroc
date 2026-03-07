import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  async function loadPost() {
    const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();

    if (data) setPost(data);
    setLoading(false);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article introuvable</h1>
        <Link to="/blog" className="text-red-600 hover:text-red-700">
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        canonical={`https://datamaroc.ma/blog/${post.slug}`}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(post.published_at)}</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="h-px bg-gray-200 mb-8"></div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Besoin de données pour votre projet ?</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Découvrez notre catalogue complet de datasets sur le Maroc
          </p>
          <Link
            to="/explorer"
            className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Explorer les datasets
          </Link>
        </div>
      </article>
    </>
  );
}
