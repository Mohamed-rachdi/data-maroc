import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contactez l'équipe Data Maroc pour toute question sur nos datasets, accès API ou partenariats."
        keywords={['contact data maroc', 'support données maroc']}
      />

      <div className="bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600">
            Une question ? Besoin d'aide ? Notre équipe est là pour vous répondre.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:contact@datamaroc.ma"
                    className="text-red-600 hover:text-red-700"
                  >
                    contact@datamaroc.ma
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Réponse sous 24h en jours ouvrés
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-700">Casablanca, Maroc</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Questions Fréquentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Comment accéder aux datasets ?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Parcourez notre catalogue et demandez un accès démo gratuit pour chaque dataset.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Quels formats sont disponibles ?</h4>
                  <p className="text-sm text-gray-600">
                    Tous nos datasets sont disponibles en CSV, JSON et via API REST.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Les données sont-elles mises à jour ?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Oui, selon le dataset : quotidien, hebdomadaire ou mensuel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Besoin d'un Dataset Personnalisé ?</h3>
              <p className="text-red-100 mb-6 leading-relaxed">
                Nous pouvons créer des datasets sur mesure adaptés à vos besoins spécifiques.
                Collecte, nettoyage et formatage de données selon vos critères.
              </p>
              <Link
                to="/demo"
                className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Faire une Demande
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Partenariats</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Vous êtes une institution, administration ou entreprise souhaitant partager vos
                données ou développer un partenariat ? Contactez-nous pour discuter des
                opportunités de collaboration.
              </p>
              <a
                href="mailto:contact@datamaroc.ma?subject=Partenariat"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Proposer un Partenariat
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
