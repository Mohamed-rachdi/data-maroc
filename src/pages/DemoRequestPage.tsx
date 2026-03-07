import { useState } from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { supabase, DemoRequest } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function DemoRequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    dataset_requested: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const request: DemoRequest = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      dataset_requested: formData.dataset_requested,
      message: formData.message,
    };

    const { error } = await supabase.from('demo_requests').insert([request]);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', dataset_requested: '', message: '' });
    }

    setSubmitting(false);
  }

  return (
    <>
      <SEO
        title="Demander un Accès Démo"
        description="Demandez un accès démo gratuit à nos datasets sur le Maroc. Recevez un aperçu complet des données sous 24h."
        keywords={['demo data maroc', 'accès données maroc', 'essai gratuit']}
      />

      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Demander un Accès Démo
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Remplissez le formulaire ci-dessous pour recevoir un aperçu complet des données qui
              vous intéressent. Nous vous contacterons sous 24 heures.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <div className="bg-white rounded-2xl border-2 border-green-500 p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande Envoyée !</h2>
            <p className="text-lg text-gray-600 mb-6">
              Merci pour votre intérêt. Notre équipe va analyser votre demande et vous contacter
              sous 24 heures avec un aperçu personnalisé des données.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Faire une nouvelle demande
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Formulaire de Demande</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Mohamed Alami"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Votre entreprise"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email professionnel <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="email@entreprise.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dataset souhaité <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={formData.dataset_requested}
                  onChange={(e) => setFormData({ ...formData, dataset_requested: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un dataset</option>
                  <option value="POI Maroc">POI Maroc - Google Maps</option>
                  <option value="Entreprises Maroc">Entreprises Maroc + ICE</option>
                  <option value="Météo Maroc">Données Météo Historiques</option>
                  <option value="Football Botola">Résultats Botola Pro</option>
                  <option value="Télécom Maroc">Trafic Télécom Maroc</option>
                  <option value="Population HCP">Population HCP par Commune</option>
                  <option value="Autre">Autre dataset</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message / Cas d'usage
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Décrivez brièvement votre projet et comment vous comptez utiliser les données..."
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe
                  concernant votre demande de données.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Envoi en cours...' : 'Recevoir un aperçu des données'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Réponse Rapide</h3>
            <p className="text-sm text-gray-600">Retour sous 24 heures maximum</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Aperçu Complet</h3>
            <p className="text-sm text-gray-600">Échantillon représentatif des données</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sans Engagement</h3>
            <p className="text-sm text-gray-600">Aucune obligation d'achat</p>
          </div>
        </div>
      </div>
    </>
  );
}
