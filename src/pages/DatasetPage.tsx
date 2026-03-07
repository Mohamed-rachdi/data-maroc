import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database, MapPin, Clock, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase, Dataset, DemoRequest } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function DatasetPage() {
  const { slug } = useParams();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDataset();
  }, [slug]);

  async function loadDataset() {
    const { data } = await supabase.from('datasets').select('*').eq('slug', slug).maybeSingle();

    if (data) {
      setDataset(data);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const request: DemoRequest = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      dataset_requested: dataset?.name || '',
      message: formData.message,
      dataset_id: dataset?.id,
    };

    const { error } = await supabase.from('demo_requests').insert([request]);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', message: '' });
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dataset introuvable</h1>
        <Link to="/explorer" className="text-red-600 hover:text-red-700">
          Retour à l'explorateur
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={dataset.name}
        description={dataset.description}
        keywords={[
          'data maroc',
          dataset.name.toLowerCase(),
          dataset.geographic_coverage.toLowerCase(),
        ]}
        canonical={`https://datamaroc.ma/dataset/${dataset.slug}`}
      />

      <div className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/explorer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'explorateur
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Database className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{dataset.name}</h1>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">{dataset.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <Database className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-gray-900">
                    {dataset.record_count.toLocaleString()} enregistrements
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-gray-900">{dataset.geographic_coverage}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-gray-900">{dataset.update_frequency}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-600 rounded-xl p-6 md:w-80">
              <h3 className="font-semibold text-lg mb-4">Formats disponibles</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {dataset.data_format.map((format) => (
                  <span
                    key={format}
                    className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {format}
                  </span>
                ))}
              </div>
              <a
                href="#demo-form"
                className="block w-full bg-red-600 text-white text-center px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Recevoir un aperçu
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description détaillée</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {dataset.long_description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Structure des champs</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Champ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dataset.fields_structure.map((field, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {field.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {field.type}
                            </code>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Aperçu des données</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {dataset.sample_data.length > 0 &&
                          Object.keys(dataset.sample_data[0]).map((key) => (
                            <th
                              key={key}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                            >
                              {key}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dataset.sample_data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500">
                  Aperçu limité aux 3 premières lignes. Demandez un accès complet pour voir
                  l'intégralité des données.
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div id="demo-form" className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
                  <p className="text-gray-600">
                    Nous vous contacterons sous 24h avec un aperçu des données.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-gray-900">Demander un accès</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Mohamed Alami"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Votre entreprise"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="email@exemple.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (optionnel)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Décrivez votre cas d'usage..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Envoi en cours...' : 'Recevoir un aperçu des données'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
