import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorerPage } from './pages/ExplorerPage';
import { DatasetPage } from './pages/DatasetPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { DemoRequestPage } from './pages/DemoRequestPage';
import { ContactPage } from './pages/ContactPage';
import { DataMarocPage } from './pages/seo/DataMarocPage';
import { POIMarocPage } from './pages/seo/POIMarocPage';
import { ScrollToTop } from './components/ScrollToTop';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/dataset/:slug" element={<DatasetPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/demo" element={<DemoRequestPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/data-maroc" element={<DataMarocPage />} />
            <Route path="/poi-maroc" element={<POIMarocPage />} />
            <Route path="/donnees-entreprises-maroc" element={<DataMarocPage />} />
            <Route path="/donnees-meteo-maroc" element={<DataMarocPage />} />
            <Route path="/donnees-football-maroc" element={<DataMarocPage />} />
            <Route path="/donnees-mobilite-maroc" element={<DataMarocPage />} />
            <Route path="/open-data-maroc" element={<DataMarocPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;