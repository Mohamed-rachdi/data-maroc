import { Link } from 'react-router-dom';
import { Database, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-red-600 font-bold text-xl">
            <Database className="w-7 h-7" />
            <span>Geo Data Maroc</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/explorer" className="text-gray-700 hover:text-red-600 transition">
              Explorer
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-red-600 transition">
              Catégories
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-red-600 transition">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 transition">
              Contact
            </Link>
            <Link
              to="/demo"
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Demander un accès
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                to="/explorer"
                className="text-gray-700 hover:text-red-600 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorer
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-red-600 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catégories
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-red-600 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-red-600 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/demo"
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demander un accès
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
