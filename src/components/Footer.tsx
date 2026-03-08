import { Link } from 'react-router-dom';
import { Database, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Database className="w-6 h-6 text-red-600" />
              <span>Geo Data Maroc</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plus grande plateforme de données sur le Maroc. Explorez, téléchargez et analysez
              des datasets exclusifs.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explorer</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explorer" className="hover:text-red-500 transition">
                  Tous les datasets
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-red-500 transition">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/poi-maroc" className="hover:text-red-500 transition">
                  POI Maroc
                </Link>
              </li>
              <li>
                <Link to="/donnees-entreprises-maroc" className="hover:text-red-500 transition">
                  Entreprises Maroc
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="hover:text-red-500 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/open-data-maroc" className="hover:text-red-500 transition">
                  Open Data Maroc
                </Link>
              </li>
              <li>
                <Link to="/data-maroc" className="hover:text-red-500 transition">
                  Geo Data Maroc
                </Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-red-500 transition">
                  Demander un dataset
                </Link>
              </li>
              <li>
              <Link to="/privacy-policy">
                Privacy Policy
              </Link>

              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <a href="mailto:contact@geodatamaroc.com" className="hover:text-red-500 transition">
                  contact@geodatamaroc.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>&copy; 2026 Geo Data Maroc . Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
